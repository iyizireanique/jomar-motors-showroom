-- Fix function search path security issue
CREATE OR REPLACE FUNCTION public.get_car_contact_info(car_id UUID)
RETURNS TABLE (
  contact_phone TEXT,
  contact_whatsapp TEXT,
  contact_email TEXT
) 
SECURITY DEFINER
STABLE
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- Return contact info when specifically requested (for interested buyers)
  RETURN QUERY
  SELECT 
    cars.contact_phone,
    cars.contact_whatsapp,
    cars.contact_email
  FROM public.cars
  WHERE cars.id = car_id AND cars.available = true;
END;
$$;