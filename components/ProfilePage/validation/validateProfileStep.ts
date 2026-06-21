import type { ProfileFormData, ProfileFormErrors } from "../types/profileForm";

export function validateProfileStep(
  step: number,
  data: ProfileFormData,
): ProfileFormErrors {
  const errors: ProfileFormErrors = {};

  if (step === 1) {
    if (!data.firstName.trim()) {
      errors.firstName = "First name is required.";
    } else if (data.firstName.trim().length < 2) {
      errors.firstName = "First name must be at least 2 characters.";
    }

    if (!data.lastName.trim()) {
      errors.lastName = "Last name is required.";
    } else if (data.lastName.trim().length < 2) {
      errors.lastName = "Last name must be at least 2 characters.";
    }
  }

  if (step === 2) {
    const username = data.username.trim();

    if (!username) {
      errors.username = "Username is required.";
    } else if (username.length < 3) {
      errors.username = "Username must be at least 3 characters.";
    } else if (username.length > 20) {
      errors.username = "Username must be 20 characters or fewer.";
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      errors.username = "Use only letters, numbers, and underscores.";
    }
  }

  if (step === 3) {
    const contact = data.contact.trim();

    if (!contact) {
      errors.contact = "Contact number is required.";
    } else if (!/^\+?[\d\s()-]{7,20}$/.test(contact)) {
      errors.contact = "Enter a valid phone number.";
    }
  }

  return errors;
}
