-- Create enum types for better data integrity
CREATE TYPE public.user_role AS ENUM ('customer', 'partner');
CREATE TYPE public.membership_type AS ENUM ('basic_monthly', 'premium_annual', '10_class_pack', 'unlimited_monthly', 'day_pass');
CREATE TYPE public.booking_status AS ENUM ('confirmed', 'cancelled', 'waitlisted', 'completed');

-- Create profiles table for both customers and partners
CREATE TABLE public.profiles (
  id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  role user_role NOT NULL DEFAULT 'customer',
  phone TEXT,
  avatar_url TEXT,
  
  -- Customer-specific fields
  membership_type membership_type,
  membership_expires_at TIMESTAMP WITH TIME ZONE,
  credits_remaining INTEGER DEFAULT 0,
  
  -- Partner-specific fields
  business_name TEXT,
  business_address TEXT,
  business_description TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create services table
CREATE TABLE public.services (
  id BIGSERIAL PRIMARY KEY,
  partner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  credits_required INTEGER NOT NULL DEFAULT 1,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create classes table
CREATE TABLE public.classes (
  id BIGSERIAL PRIMARY KEY,
  service_id BIGINT NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  capacity INTEGER NOT NULL DEFAULT 20,
  spots_available INTEGER NOT NULL DEFAULT 20,
  instructor_name TEXT,
  special_notes TEXT,
  is_cancelled BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id BIGSERIAL PRIMARY KEY,
  customer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  class_id BIGINT NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  status booking_status NOT NULL DEFAULT 'confirmed',
  credits_used INTEGER NOT NULL DEFAULT 1,
  booking_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  
  -- Prevent double booking same class
  UNIQUE(customer_id, class_id)
);

-- Create check_ins table
CREATE TABLE public.check_ins (
  id BIGSERIAL PRIMARY KEY,
  booking_id BIGINT NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  class_id BIGINT NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  check_in_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  qr_code TEXT,
  verified_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.check_ins ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Partners can view other profiles for bookings" ON public.profiles
  FOR SELECT USING (
    EXISTS(SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'partner')
  );

-- RLS Policies for services
CREATE POLICY "Anyone can view active services" ON public.services
  FOR SELECT USING (is_active = true);

CREATE POLICY "Partners can manage their own services" ON public.services
  FOR ALL USING (partner_id = auth.uid());

-- RLS Policies for classes
CREATE POLICY "Anyone can view non-cancelled classes" ON public.classes
  FOR SELECT USING (is_cancelled = false);

CREATE POLICY "Partners can manage classes for their services" ON public.classes
  FOR ALL USING (
    EXISTS(SELECT 1 FROM public.services WHERE id = service_id AND partner_id = auth.uid())
  );

-- RLS Policies for bookings
CREATE POLICY "Customers can view their own bookings" ON public.bookings
  FOR SELECT USING (customer_id = auth.uid());

CREATE POLICY "Customers can create their own bookings" ON public.bookings
  FOR INSERT WITH CHECK (customer_id = auth.uid());

CREATE POLICY "Customers can update their own bookings" ON public.bookings
  FOR UPDATE USING (customer_id = auth.uid());

CREATE POLICY "Partners can view bookings for their classes" ON public.bookings
  FOR SELECT USING (
    EXISTS(
      SELECT 1 FROM public.classes c
      JOIN public.services s ON c.service_id = s.id
      WHERE c.id = class_id AND s.partner_id = auth.uid()
    )
  );

-- RLS Policies for check_ins
CREATE POLICY "Customers can view their own check-ins" ON public.check_ins
  FOR SELECT USING (customer_id = auth.uid());

CREATE POLICY "Partners can manage check-ins for their classes" ON public.check_ins
  FOR ALL USING (
    EXISTS(
      SELECT 1 FROM public.classes c
      JOIN public.services s ON c.service_id = s.id
      WHERE c.id = class_id AND s.partner_id = auth.uid()
    )
  );

-- Create function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, username, role, credits_remaining)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'username', NEW.email),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'customer'),
    CASE 
      WHEN COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'customer') = 'customer' THEN 10
      ELSE 0
    END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update spots_available when booking is made
CREATE OR REPLACE FUNCTION public.update_spots_available()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.status = 'confirmed' THEN
    UPDATE public.classes 
    SET spots_available = spots_available - 1 
    WHERE id = NEW.class_id AND spots_available > 0;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.status != 'confirmed' AND NEW.status = 'confirmed' THEN
      UPDATE public.classes 
      SET spots_available = spots_available - 1 
      WHERE id = NEW.class_id AND spots_available > 0;
    ELSIF OLD.status = 'confirmed' AND NEW.status != 'confirmed' THEN
      UPDATE public.classes 
      SET spots_available = spots_available + 1 
      WHERE id = NEW.class_id;
    END IF;
  ELSIF TG_OP = 'DELETE' AND OLD.status = 'confirmed' THEN
    UPDATE public.classes 
    SET spots_available = spots_available + 1 
    WHERE id = OLD.class_id;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create trigger for spot management
CREATE TRIGGER manage_spots_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.update_spots_available();

-- Create function to update updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updating timestamps
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_classes_updated_at BEFORE UPDATE ON public.classes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();