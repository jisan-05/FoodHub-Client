const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Category {
  id: string;
  name: string;
  description: string | null;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export const categoryClientService = {
  getAllCategories: async () => {
    try {
      const res = await fetch(`${API_URL}/api/categories`, {
        credentials: "include",
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to fetch categories");

      const data: Category[] = await res.json();
      return { data, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: { message: "Failed to fetch categories" } };
    }
  },

  updateCategory: async (
    id: string,
    payload: { name: string; image: string }
  ) => {
    const res = await fetch(`${API_URL}/api/categories/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Failed to update category");

    return res.json();
  },

  deleteCategory: async (id: string) => {
    const res = await fetch(`${API_URL}/api/categories/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to delete category");

    return res.json();
  },
};
