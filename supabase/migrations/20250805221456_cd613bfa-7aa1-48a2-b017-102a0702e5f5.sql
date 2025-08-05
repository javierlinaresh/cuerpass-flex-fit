-- Fix security issues: Set search_path for functions
CREATE OR REPLACE FUNCTION public.generate_booking_qr()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
BEGIN
  -- Generate a unique QR code using booking ID and timestamp
  NEW.qr_code = 'QR-' || NEW.id || '-' || EXTRACT(epoch FROM NOW())::text;
  -- Set QR expiration to 24 hours from booking creation
  NEW.qr_expires_at = NEW.created_at + INTERVAL '24 hours';
  RETURN NEW;
END;
$$;

-- Fix search_path for validation function
CREATE OR REPLACE FUNCTION public.validate_qr_code(qr_code_input TEXT)
RETURNS TABLE(
  booking_id BIGINT,
  customer_id UUID,
  class_id BIGINT,
  is_valid BOOLEAN,
  error_message TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    b.id,
    b.customer_id,
    b.class_id,
    CASE 
      WHEN b.qr_code IS NULL THEN FALSE
      WHEN b.qr_expires_at < NOW() THEN FALSE
      WHEN b.status != 'confirmed' THEN FALSE
      ELSE TRUE
    END as is_valid,
    CASE 
      WHEN b.qr_code IS NULL THEN 'QR code not found'
      WHEN b.qr_expires_at < NOW() THEN 'QR code expired'
      WHEN b.status != 'confirmed' THEN 'Booking not confirmed'
      ELSE 'Valid'
    END as error_message
  FROM public.bookings b
  WHERE b.qr_code = qr_code_input;
END;
$$;