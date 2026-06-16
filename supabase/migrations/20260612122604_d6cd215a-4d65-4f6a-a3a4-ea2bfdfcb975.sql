
-- 1. Replace permissive storage SELECT policy with one that mirrors house visibility rules
DROP POLICY IF EXISTS "authenticated read house images" ON storage.objects;

CREATE POLICY "view house images of visible listings"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'house-images'
  AND EXISTS (
    SELECT 1
    FROM public.house_images hi
    JOIN public.houses h ON h.id = hi.house_id
    WHERE hi.storage_path = storage.objects.name
      AND (
        h.status = 'available'::listing_status
        OR h.poster_id = auth.uid()
        OR public.has_role(auth.uid(), 'admin'::app_role)
      )
  )
);

-- 2. Allow house owners to view visit requests for their own listings
CREATE POLICY "owner reads visits for their houses"
ON public.visit_requests
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.houses h
    WHERE h.id = visit_requests.house_id
      AND h.poster_id = auth.uid()
  )
);

-- 3. Restrict EXECUTE on SECURITY DEFINER has_role to authenticated and service_role only
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
