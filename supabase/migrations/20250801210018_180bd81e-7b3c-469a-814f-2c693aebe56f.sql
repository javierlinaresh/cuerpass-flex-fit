-- Fix the handle_new_user function to use fully qualified enum names
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
    COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'customer'::public.user_role),
    CASE 
      WHEN COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'customer'::public.user_role) = 'customer'::public.user_role THEN 10
      ELSE 0
    END
  );
  RETURN NEW;
END;
$function$;