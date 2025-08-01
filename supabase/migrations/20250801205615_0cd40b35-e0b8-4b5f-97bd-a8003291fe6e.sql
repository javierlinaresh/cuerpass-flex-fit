-- Add RLS policies for Cuerpass Socios table
CREATE POLICY "Enable all access for authenticated users" ON "Cuerpass Socios"
FOR ALL USING (auth.role() = 'authenticated');

-- Update the handle_new_user function to properly handle user_role enum
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
  INSERT INTO public.profiles (id, full_name, username, role, credits_remaining)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'username', NEW.email),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'customer'::user_role),
    CASE 
      WHEN COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'customer'::user_role) = 'customer'::user_role THEN 10
      ELSE 0
    END
  );
  RETURN NEW;
END;
$function$;