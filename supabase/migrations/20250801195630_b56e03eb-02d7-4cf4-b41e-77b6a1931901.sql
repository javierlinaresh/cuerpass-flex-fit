-- Create missing enum types if they don't exist
DO $$ BEGIN
    CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE membership_type AS ENUM ('basic', 'premium', 'unlimited');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;