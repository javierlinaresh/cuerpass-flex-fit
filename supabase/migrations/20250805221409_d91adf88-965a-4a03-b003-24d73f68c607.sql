-- Add QR code functionality to existing bookings table
ALTER TABLE public.bookings 
ADD COLUMN IF NOT EXISTS qr_code TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS qr_expires_at TIMESTAMP WITH TIME ZONE;

-- Update check_ins table to better support QR validation
ALTER TABLE public.check_ins 
DROP COLUMN IF EXISTS qr_code;

-- Create function to generate QR codes for bookings
CREATE OR REPLACE FUNCTION public.generate_booking_qr()
RETURNS TRIGGER AS $$
BEGIN
  -- Generate a unique QR code using booking ID and timestamp
  NEW.qr_code = 'QR-' || NEW.id || '-' || EXTRACT(epoch FROM NOW())::text;
  -- Set QR expiration to 24 hours from booking creation
  NEW.qr_expires_at = NEW.created_at + INTERVAL '24 hours';
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-generate QR codes for new bookings
DROP TRIGGER IF EXISTS generate_qr_on_booking ON public.bookings;
CREATE TRIGGER generate_qr_on_booking
  BEFORE INSERT ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_booking_qr();

-- Create function to validate QR codes
CREATE OR REPLACE FUNCTION public.validate_qr_code(qr_code_input TEXT)
RETURNS TABLE(
  booking_id BIGINT,
  customer_id UUID,
  class_id BIGINT,
  is_valid BOOLEAN,
  error_message TEXT
) AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add RLS policy for QR validation function access
CREATE POLICY "Partners can validate QR codes" ON public.bookings
  FOR SELECT USING (
    auth.uid() IN (
      SELECT s.partner_id 
      FROM services s 
      JOIN classes c ON c.service_id = s.id 
      WHERE c.id = bookings.class_id
    )
  );

-- Update existing bookings to have QR codes (for testing)
UPDATE public.bookings 
SET qr_code = 'QR-' || id || '-' || EXTRACT(epoch FROM created_at)::text,
    qr_expires_at = created_at + INTERVAL '24 hours'
WHERE qr_code IS NULL;