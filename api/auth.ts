import api from "@/lib/baseApi";

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
