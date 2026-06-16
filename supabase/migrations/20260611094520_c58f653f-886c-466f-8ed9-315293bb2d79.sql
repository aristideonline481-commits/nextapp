
-- Enums
CREATE TYPE public.app_role AS ENUM ('admin', 'student');
CREATE TYPE public.house_type AS ENUM ('room', 'studio', 'apartment');
CREATE TYPE public.shared_type AS ENUM ('private', 'shared');
CREATE TYPE public.bill_mode AS ENUM ('included', 'fixed', 'tenant');
CREATE TYPE public.listing_status AS ENUM ('pending', 'available', 'matched', 'closed');
CREATE TYPE public.visit_status AS ENUM ('requested', 'scheduled', 'visited', 'closed', 'cancelled');

-- updated_at helper
CREATE OR REPLACE FUNCTION public.update_updated_at_column() RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql SET search_path = public;

-- PROFILES
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users read own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "users update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "users insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- USER ROLES
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- HOUSES
CREATE TABLE public.houses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  poster_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  house_type public.house_type NOT NULL,
  max_occupants INT NOT NULL DEFAULT 1,
  city TEXT NOT NULL,
  neighborhood TEXT NOT NULL,
  rent_fcfa INT NOT NULL,
  available_from DATE,
  -- bathroom
  toilet_type public.shared_type NOT NULL DEFAULT 'private',
  toilet_shared_with INT DEFAULT 0,
  -- kitchen
  kitchen_type public.shared_type NOT NULL DEFAULT 'private',
  kitchen_shared_with INT DEFAULT 0,
  -- bills
  wifi_mode public.bill_mode NOT NULL DEFAULT 'tenant',
  wifi_cost_fcfa INT DEFAULT 0,
  electricity_mode public.bill_mode NOT NULL DEFAULT 'tenant',
  electricity_cost_fcfa INT DEFAULT 0,
  water_mode public.bill_mode NOT NULL DEFAULT 'tenant',
  water_cost_fcfa INT DEFAULT 0,
  status public.listing_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX houses_status_idx ON public.houses(status);
CREATE INDEX houses_poster_idx ON public.houses(poster_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.houses TO authenticated;
GRANT ALL ON public.houses TO service_role;
ALTER TABLE public.houses ENABLE ROW LEVEL SECURITY;
-- Any authenticated student can browse listings (poster identity is in a separate column, never exposed via UI)
CREATE POLICY "authenticated browse available houses" ON public.houses FOR SELECT TO authenticated
  USING (status = 'available' OR poster_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "users insert own houses" ON public.houses FOR INSERT TO authenticated WITH CHECK (poster_id = auth.uid());
CREATE POLICY "users update own houses" ON public.houses FOR UPDATE TO authenticated USING (poster_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "users delete own houses" ON public.houses FOR DELETE TO authenticated USING (poster_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER houses_updated_at BEFORE UPDATE ON public.houses FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- HOUSE IMAGES
CREATE TABLE public.house_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  house_id UUID NOT NULL REFERENCES public.houses(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX house_images_house_idx ON public.house_images(house_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.house_images TO authenticated;
GRANT ALL ON public.house_images TO service_role;
ALTER TABLE public.house_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "view images of visible houses" ON public.house_images FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.houses h WHERE h.id = house_id
    AND (h.status = 'available' OR h.poster_id = auth.uid() OR public.has_role(auth.uid(), 'admin'))));
CREATE POLICY "owner manages images" ON public.house_images FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.houses h WHERE h.id = house_id AND (h.poster_id = auth.uid() OR public.has_role(auth.uid(), 'admin'))))
  WITH CHECK (EXISTS (SELECT 1 FROM public.houses h WHERE h.id = house_id AND (h.poster_id = auth.uid() OR public.has_role(auth.uid(), 'admin'))));

-- VISIT REQUESTS
CREATE TABLE public.visit_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  house_id UUID NOT NULL REFERENCES public.houses(id) ON DELETE CASCADE,
  requester_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  message TEXT,
  status public.visit_status NOT NULL DEFAULT 'requested',
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX visit_house_idx ON public.visit_requests(house_id);
CREATE INDEX visit_requester_idx ON public.visit_requests(requester_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.visit_requests TO authenticated;
GRANT ALL ON public.visit_requests TO service_role;
ALTER TABLE public.visit_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "requester reads own visits" ON public.visit_requests FOR SELECT TO authenticated
  USING (requester_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "requester creates visits" ON public.visit_requests FOR INSERT TO authenticated WITH CHECK (requester_id = auth.uid());
CREATE POLICY "admin updates visits" ON public.visit_requests FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER visits_updated_at BEFORE UPDATE ON public.visit_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile + student role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'phone')
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'student') ON CONFLICT DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
