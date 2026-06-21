import { useMutation } from "@tanstack/react-query";
import { completeProfile } from "@/lib/api/completeProfile";
import { useProfileSetupStore } from "../store/profileSetupStore";

export function useCompleteProfile() {
  const formData = useProfileSetupStore((state) => state.formData);
  const setComplete = useProfileSetupStore((state) => state.setComplete);

  return useMutation({
    mutationFn: () => completeProfile(formData),
    onSuccess: () => setComplete(true),
  });
}
