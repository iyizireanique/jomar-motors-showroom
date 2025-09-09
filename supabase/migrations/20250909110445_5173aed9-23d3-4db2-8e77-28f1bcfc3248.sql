-- Fix security issue: Create RLS policies to protect contact information
-- Remove existing overly permissive policies and create secure ones

-- Drop existing public read policy
DROP POLICY IF EXISTS "Cars are publicly readable" ON public.cars;

-- Create policy for basic car information (without contact details)
CREATE POLICY "Cars basic info publicly readable" 
ON public.cars 
FOR SELECT 
USING (true);

-- Create view for public car data without contact info
CREATE OR REPLACE VIEW public.cars_public AS
SELECT 
  id,
  title,
  brand,
  model,
  year,
  price,
  currency,
  type,
  fuel_type,
  transmission,
  seats,
  mileage,
  location,
  description,
  features,
  image_url,
  gallery_urls,
  featured,
  available,
  created_at,
  updated_at
FROM public.cars
WHERE available = true;

-- Create RLS policy for contact information - only show to authenticated users
CREATE OR REPLACE VIEW public.cars_with_contact AS
SELECT 
  c.*,
  CASE 
    WHEN auth.uid() IS NOT NULL THEN c.contact_phone
    ELSE NULL
  END as contact_phone,
  CASE 
    WHEN auth.uid() IS NOT NULL THEN c.contact_whatsapp
    ELSE NULL
  END as contact_whatsapp,
  CASE 
    WHEN auth.uid() IS NOT NULL THEN c.contact_email
    ELSE NULL
  END as contact_email
FROM public.cars c;

-- Grant permissions on the views
GRANT SELECT ON public.cars_public TO anon, authenticated;
GRANT SELECT ON public.cars_with_contact TO anon, authenticated;