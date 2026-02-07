// src/services/userClient.service.ts
export const userClientService = {
  getSession: async () => {
    const res = await fetch("/api/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // send cookies for auth
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch session");
    }

    return res.json(); // { data: { user: {...} } }
  },

  updateProfile: async (payload: { name: string; image: string }) => {
    const res = await fetch("/api/users/me", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Failed to update profile");
    }

    return res.json();
  },
};
