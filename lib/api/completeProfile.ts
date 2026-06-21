import type { ProfileFormData } from "@/components/ProfilePage/types/profileForm";

export async function completeProfile(data: ProfileFormData): Promise<void> {
  // TODO: wire to profile completion API when backend is ready
  await new Promise((resolve) => setTimeout(resolve, 800));

  void data;
}
