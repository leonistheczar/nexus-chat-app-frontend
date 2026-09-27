import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { completeProfile } from "@/lib/completeProfile";
import { useProfileSetupStore } from "../store/profileSetupStore";

export function useCompleteProfile() {
  const formData = useProfileSetupStore((state) => state.formData);
  const setComplete = useProfileSetupStore((state) => state.setComplete);
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async () => {
      const token = await getToken();
      if (!token) {
        throw new Error("Your session has expired. Please sign in again.");
      }
      await completeProfile(formData, token);
    },
    onSuccess: () => setComplete(true),
  });
}
