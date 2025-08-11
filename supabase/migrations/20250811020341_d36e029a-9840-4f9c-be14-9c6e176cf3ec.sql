-- 0) Roles system (separate from profiles)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_type WHERE typname = 'app_role'
  ) THEN
    CREATE TYPE public.app_role AS ENUM ('admin');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own roles; admins can manage all roles
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='user_roles' AND policyname='Users can view their own roles'
  ) THEN
    CREATE POLICY "Users can view their own roles"
    ON public.user_roles
    FOR SELECT
    USING (user_id = auth.uid());
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='user_roles' AND policyname='Admins can manage all roles'
  ) THEN
    CREATE POLICY "Admins can manage all roles"
    ON public.user_roles
    FOR ALL
    USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'))
    WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));
  END IF;
END $$;

-- Function to check roles (SECURITY DEFINER to bypass RLS safely)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

-- 1) Companies table
CREATE TABLE IF NOT EXISTS public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  contact_name TEXT,
  contact_email TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

-- Companies policies
DO $$ BEGIN
  -- Admins can manage all companies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'companies' AND policyname = 'Admins can manage all companies'
  ) THEN
    CREATE POLICY "Admins can manage all companies"
    ON public.companies
    FOR ALL
    USING (public.has_role(auth.uid(), 'admin'))
    WITH CHECK (public.has_role(auth.uid(), 'admin'));
  END IF;
END $$;

-- 2) Company members table
CREATE TABLE IF NOT EXISTS public.company_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member', -- 'admin' | 'member'
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.company_members ENABLE ROW LEVEL SECURITY;

-- Company members policies
DO $$ BEGIN
  -- Admins can manage all company members
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'company_members' AND policyname = 'Admins can manage all company members'
  ) THEN
    CREATE POLICY "Admins can manage all company members"
    ON public.company_members
    FOR ALL
    USING (public.has_role(auth.uid(), 'admin'))
    WITH CHECK (public.has_role(auth.uid(), 'admin'));
  END IF;

  -- Users can view their own membership rows
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'company_members' AND policyname = 'Users can view their own membership rows'
  ) THEN
    CREATE POLICY "Users can view their own membership rows"
    ON public.company_members
    FOR SELECT
    USING (user_id = auth.uid());
  END IF;

  -- Company admins can manage their company members
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'company_members' AND policyname = 'Company admins can manage their members'
  ) THEN
    CREATE POLICY "Company admins can manage their members"
    ON public.company_members
    FOR ALL
    USING (EXISTS (
      SELECT 1 FROM public.company_members cm
      WHERE cm.company_id = company_members.company_id
        AND cm.user_id = auth.uid()
        AND cm.role = 'admin'
        AND cm.is_active = true
    ))
    WITH CHECK (EXISTS (
      SELECT 1 FROM public.company_members cm
      WHERE cm.company_id = company_members.company_id
        AND cm.user_id = auth.uid()
        AND cm.role = 'admin'
        AND cm.is_active = true
    ));
  END IF;
END $$;

-- Allow company admins to view and update their company rows
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'companies' AND policyname = 'Company admins can view their company'
  ) THEN
    CREATE POLICY "Company admins can view their company"
    ON public.companies
    FOR SELECT
    USING (EXISTS (
      SELECT 1 FROM public.company_members cm
      WHERE cm.company_id = companies.id
        AND cm.user_id = auth.uid()
        AND cm.role = 'admin'
        AND cm.is_active = true
    ));
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'companies' AND policyname = 'Company admins can update their company'
  ) THEN
    CREATE POLICY "Company admins can update their company"
    ON public.companies
    FOR UPDATE
    USING (EXISTS (
      SELECT 1 FROM public.company_members cm
      WHERE cm.company_id = companies.id
        AND cm.user_id = auth.uid()
        AND cm.role = 'admin'
        AND cm.is_active = true
    ))
    WITH CHECK (EXISTS (
      SELECT 1 FROM public.company_members cm
      WHERE cm.company_id = companies.id
        AND cm.user_id = auth.uid()
        AND cm.role = 'admin'
        AND cm.is_active = true
    ));
  END IF;
END $$;

-- 3) Credit ledger for auditing credits movements
CREATE TABLE IF NOT EXISTS public.credit_ledger (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  booking_id BIGINT,
  delta INTEGER NOT NULL, -- negative for debits, positive for credits
  reason TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.credit_ledger ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  -- Users can view their own credit movements
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'credit_ledger' AND policyname = 'Users can view their own credit ledger'
  ) THEN
    CREATE POLICY "Users can view their own credit ledger"
    ON public.credit_ledger
    FOR SELECT
    USING (user_id = auth.uid());
  END IF;
  -- Admins can view all credit movements
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'credit_ledger' AND policyname = 'Admins can view all credit ledger'
  ) THEN
    CREATE POLICY "Admins can view all credit ledger"
    ON public.credit_ledger
    FOR SELECT
    USING (public.has_role(auth.uid(), 'admin'));
  END IF;
END $$;

-- 4) Booking credits handler function and trigger
CREATE OR REPLACE FUNCTION public.booking_credits_handler()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
DECLARE
  current_credits INTEGER;
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.status = 'confirmed' THEN
      SELECT credits_remaining INTO current_credits FROM public.profiles WHERE id = NEW.customer_id FOR UPDATE;
      IF current_credits IS NULL OR current_credits < NEW.credits_used THEN
        RAISE EXCEPTION 'Insufficient credits (have %, need %)', COALESCE(current_credits, 0), NEW.credits_used;
      END IF;
      UPDATE public.profiles
      SET credits_remaining = credits_remaining - NEW.credits_used
      WHERE id = NEW.customer_id;
      INSERT INTO public.credit_ledger(user_id, booking_id, delta, reason)
      VALUES (NEW.customer_id, NEW.id, -NEW.credits_used, 'booking_confirmed');
    END IF;
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.status != 'confirmed' AND NEW.status = 'confirmed' THEN
      SELECT credits_remaining INTO current_credits FROM public.profiles WHERE id = NEW.customer_id FOR UPDATE;
      IF current_credits IS NULL OR current_credits < NEW.credits_used THEN
        RAISE EXCEPTION 'Insufficient credits (have %, need %)', COALESCE(current_credits, 0), NEW.credits_used;
      END IF;
      UPDATE public.profiles
      SET credits_remaining = credits_remaining - NEW.credits_used
      WHERE id = NEW.customer_id;
      INSERT INTO public.credit_ledger(user_id, booking_id, delta, reason)
      VALUES (NEW.customer_id, NEW.id, -NEW.credits_used, 'booking_confirmed');
    ELSIF OLD.status = 'confirmed' AND NEW.status != 'confirmed' THEN
      UPDATE public.profiles
      SET credits_remaining = credits_remaining + OLD.credits_used
      WHERE id = OLD.customer_id;
      INSERT INTO public.credit_ledger(user_id, booking_id, delta, reason)
      VALUES (OLD.customer_id, OLD.id, OLD.credits_used, 'booking_refund');
    ELSIF NEW.status = 'confirmed' AND NEW.credits_used != OLD.credits_used THEN
      -- Adjust difference if credits_used changed while confirmed
      SELECT credits_remaining INTO current_credits FROM public.profiles WHERE id = NEW.customer_id FOR UPDATE;
      IF current_credits + OLD.credits_used < NEW.credits_used THEN
        RAISE EXCEPTION 'Insufficient credits for adjustment';
      END IF;
      UPDATE public.profiles
      SET credits_remaining = credits_remaining + (OLD.credits_used - NEW.credits_used)
      WHERE id = NEW.customer_id;
      INSERT INTO public.credit_ledger(user_id, booking_id, delta, reason)
      VALUES (NEW.customer_id, NEW.id, (OLD.credits_used - NEW.credits_used), 'booking_adjustment');
    END IF;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.status = 'confirmed' THEN
      UPDATE public.profiles
      SET credits_remaining = credits_remaining + OLD.credits_used
      WHERE id = OLD.customer_id;
      INSERT INTO public.credit_ledger(user_id, booking_id, delta, reason)
      VALUES (OLD.customer_id, OLD.id, OLD.credits_used, 'booking_deleted_refund');
    END IF;
    RETURN OLD;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Drop existing trigger if exists to avoid duplicates
DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'tg_bookings_credit_handler'
  ) THEN
    DROP TRIGGER tg_bookings_credit_handler ON public.bookings;
  END IF;
END $$;

CREATE TRIGGER tg_bookings_credit_handler
BEFORE INSERT OR UPDATE OR DELETE ON public.bookings
FOR EACH ROW EXECUTE FUNCTION public.booking_credits_handler();

-- 5) Admin read-all policies for key tables using has_role
DO $$ BEGIN
  -- Profiles
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='profiles' AND policyname='Admins can view all profiles'
  ) THEN
    CREATE POLICY "Admins can view all profiles"
    ON public.profiles
    FOR SELECT
    USING (public.has_role(auth.uid(), 'admin'));
  END IF;

  -- Services
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='services' AND policyname='Admins can view all services'
  ) THEN
    CREATE POLICY "Admins can view all services"
    ON public.services
    FOR SELECT
    USING (public.has_role(auth.uid(), 'admin'));
  END IF;

  -- Classes
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='classes' AND policyname='Admins can view all classes'
  ) THEN
    CREATE POLICY "Admins can view all classes"
    ON public.classes
    FOR SELECT
    USING (public.has_role(auth.uid(), 'admin'));
  END IF;

  -- Bookings
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='bookings' AND policyname='Admins can view all bookings'
  ) THEN
    CREATE POLICY "Admins can view all bookings"
    ON public.bookings
    FOR SELECT
    USING (public.has_role(auth.uid(), 'admin'));
  END IF;

  -- Check-ins
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='check_ins' AND policyname='Admins can view all check-ins'
  ) THEN
    CREATE POLICY "Admins can view all check-ins"
    ON public.check_ins
    FOR SELECT
    USING (public.has_role(auth.uid(), 'admin'));
  END IF;
END $$;

-- 6) updated_at trigger for companies
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_companies_updated_at'
  ) THEN
    CREATE TRIGGER update_companies_updated_at
    BEFORE UPDATE ON public.companies
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END $$;
