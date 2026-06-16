
ALTER TABLE public.houses
  ADD COLUMN IF NOT EXISTS poster_name text,
  ADD COLUMN IF NOT EXISTS poster_phone text,
  ADD COLUMN IF NOT EXISTS poster_phone_whatsapp boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS poster_school text;
