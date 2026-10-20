import api from "@/lib/baseApi";

export type IncomingContactRequest = {
  id: string;
  status: "pending";
  createdAt: string;
  user: {
    id: string;
    username: string;
    displayName: string;
    avatarUrl: string | null;
  } | null;
};

export type ContactRequestsPage = {
  data: IncomingContactRequest[];
  nextCursor: string | null;
};

export type CreatedContactRequest = {
  id: string;
  status: "pending";
  createdAt: string;
  recipient: {
    username: string;
    displayName: string;
    avatarUrl: string | null;
  };
};

export type UserSearchProfile = {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
};

export async function searchUsersByUsername(
  token: string,
  username: string,
  signal?: AbortSignal,
): Promise<UserSearchProfile[]> {
  const { data } = await api.get<{ data: UserSearchProfile[]; message: string | null }>(
    "/users/search",
    {
      params: { username },
      headers: { Authorization: `Bearer ${token}` },
      signal,
    },
  );

  return data.data;
}

export async function createContactRequest(
  token: string,
  username: string,
): Promise<CreatedContactRequest> {
  const { data } = await api.post<{ data: CreatedContactRequest }>(
    "/contact-requests",
    { username },
    { headers: { Authorization: `Bearer ${token}` } },
  );

  return data.data;
}

export async function fetchIncomingContactRequests(
  token: string,
): Promise<ContactRequestsPage> {
  const { data } = await api.get<ContactRequestsPage>("/contact-requests/received", {
    params: { limit: 50 },
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
}

export async function fetchSentContactRequests(
  token: string,
  before?: string,
  signal?: AbortSignal,
): Promise<ContactRequestsPage> {
  const { data } = await api.get<ContactRequestsPage>("/contact-requests/sent", {
    params: { limit: 100, ...(before ? { before } : {}) },
    headers: { Authorization: `Bearer ${token}` },
    signal,
  });

  return data;
}

export async function cancelContactRequest(
  token: string,
  requestId: string,
): Promise<void> {
  await api.patch(
    `/contact-requests/${requestId}/cancel`,
    {},
    { headers: { Authorization: `Bearer ${token}` } },
  );
}

export async function respondToContactRequest(
  token: string,
  requestId: string,
  action: "accept" | "reject",
): Promise<void> {
  await api.patch(
    `/contact-requests/${requestId}/${action}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } },
  );
}
