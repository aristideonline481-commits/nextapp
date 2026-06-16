export function useSignedImage(path: string | null | undefined) {
  return {
    data: path,
    isLoading: false,
  };
}
