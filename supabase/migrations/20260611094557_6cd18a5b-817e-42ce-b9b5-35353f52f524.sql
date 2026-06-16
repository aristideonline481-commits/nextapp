
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

-- Storage policies for house-images bucket
CREATE POLICY "authenticated read house images" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'house-images');
CREATE POLICY "users upload to own folder" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'house-images' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "users update own images" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'house-images' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "users delete own images" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'house-images' AND ((storage.foldername(name))[1] = auth.uid()::text OR public.has_role(auth.uid(), 'admin')));
