export const lovable = {
  auth: {
    signInWithOAuth: async () => {
      throw new Error("Lovable Auth is not configured for Firebase.");
    },
  },
};
