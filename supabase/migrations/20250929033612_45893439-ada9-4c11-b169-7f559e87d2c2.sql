-- Fix security issue: Restrict partner profile access to only users with bookings

-- Drop all existing policies on profiles table first
DROP POLICY IF EXISTS "Partners can view other profiles for bookings" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Partners can update bookings info" ON public.profiles;

-- Create a new, secure policy that only allows partners to see profiles of users who have bookings with them
CREATE POLICY "Partners can only view profiles of their customers" 
ON public.profiles 
FOR SELECT 
TO authenticated 
USING (
  -- Allow users to see their own profile
  auth.uid() = id 
  OR 
  -- Allow partners to see profiles only of users who have bookings with their services
  (
    -- First, verify the current user is a partner
    EXISTS (
      SELECT 1 
      FROM public.profiles partner_profile 
      WHERE partner_profile.id = auth.uid() 
      AND partner_profile.role = 'partner'
    )
    AND
    -- Then check if there's a booking relationship through services and classes
    EXISTS (
      SELECT 1 
      FROM public.bookings b
      INNER JOIN public.classes c ON c.id = b.class_id
      INNER JOIN public.services s ON s.id = c.service_id
      WHERE b.customer_id = profiles.id 
      AND s.partner_id = auth.uid()
    )
  )
);

-- Add a policy to ensure partners can only update their own profiles
CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
TO authenticated 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Add insert policy for profiles
CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = id);

-- Fix the companies table policy as well to prevent contact harvesting
DROP POLICY IF EXISTS "Authenticated users can view companies" ON public.companies;

-- More restrictive policy for companies - only allow viewing if user is a member or has bookings
CREATE POLICY "Users can view companies they interact with" 
ON public.companies 
FOR SELECT 
TO authenticated 
USING (
  -- Allow company members (through company_members table)
  EXISTS (
    SELECT 1 
    FROM public.company_members cm 
    WHERE cm.company_id = companies.id 
    AND cm.user_id = auth.uid()
    AND cm.is_active = true
  )
  OR
  -- Allow users who have bookings with services from partners in this company
  EXISTS (
    SELECT 1 
    FROM public.bookings b
    INNER JOIN public.classes c ON c.id = b.class_id
    INNER JOIN public.services s ON s.id = c.service_id
    INNER JOIN public.profiles p ON p.id = s.partner_id
    WHERE b.customer_id = auth.uid() 
    AND p.business_name = companies.name
  )
);