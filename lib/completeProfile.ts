import type { ProfileFormData } from "@/components/ProfilePage/types/profileForm";
import { submitCurrentUserProfile } from "@/api/auth";
import axios from "axios";

export async function completeProfile(
  data: ProfileFormData,
  token: string,
): Promise<void> {
  const firstName = data.firstName.trim();
  const lastName = data.lastName.trim();

  try {
    await submitCurrentUserProfile(
      {
        firstName,
        lastName,
        username: data.username.trim().toLowerCase(),
        phone_e164: data.phone_e164.trim(),
        displayName: [firstName, lastName].filter(Boolean).join(" "),
      },
      token,
    );
  } catch (error) {
    if (axios.isAxiosError<{ message?: string }>(error)) {
      throw new Error(error.response?.data?.message ?? "Unable to save your profile.");
    }
    throw error;
  }
}
