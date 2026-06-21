export type ProfileFormData = {
  firstName: string;
  lastName: string;
  username: string;
  contact: string;
};

export type ProfileFormErrors = Partial<Record<keyof ProfileFormData, string>>;
