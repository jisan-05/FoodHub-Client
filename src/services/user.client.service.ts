const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const userClientService = {
  getAllUser: async () => {
    try {
      const res = await fetch(`${API_URL}/api/users`, {
        credentials: "include",
      });
      const data = await res.json();
      return { data, error: null };
    } catch {
      return { data: null, error: { message: "Failed to fetch users" } };
    }
  },

  updateUserStatus: async (payload: {
    userId: string;
    status: "ACTIVATE" | "SUSPENDED";
  }) => {
    const res = await fetch(`${API_URL}/api/users`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Failed to update user status");
    }

    return res.json();
  },
};
