export type ProfileFormData = {
  firstName: string;
  lastName: string;
  username: string;
  phone_e164: string;
};

export type ProfileFormErrors = Partial<Record<keyof ProfileFormData, string>>;
