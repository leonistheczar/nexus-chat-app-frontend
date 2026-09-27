import api from "@/lib/baseApi";

export type CreateUserProfilePayload = {
  firstName: string;
  lastName: string;
  username: string;
  phoneE164: string;
  displayName: string;
};

export type CurrentUser = {
  profileStatus?: string;
};
type CurrentUserResponse = CurrentUser | { data: CurrentUser };

export const getCurrentUser = async (token: string): Promise<CurrentUser> => {
  const { data } = await api.get<CurrentUserResponse>("/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Support both a direct user payload and an API response wrapped in `data`.
  return "data" in data ? data.data : data;
};

export const submitCurrentUserProfile = async (
  payload: CreateUserProfilePayload,
  token: string,
) => {
  const { data } = await api.post("/users/me/create", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
