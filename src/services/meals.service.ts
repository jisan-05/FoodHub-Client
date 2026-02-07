const API_URL = process.env.API_URL; // e.g., "http://localhost:5000"


export const mealsService = {
  getMeals: async function () {
    try {
      const res = await fetch(`${API_URL}/api/meals`);
      const data = await res.json();

      return { data: data, error: null };
    } catch (error) {}
    return { data: null, error: { message: "Something wrong " } };
  },
getMealsByProvider: async function ({ id }: { id: string }) {
  try {
    // Correct backend route
    const res = await fetch(`${API_URL}/api/meals/provider/${id}`);
    if (!res.ok) throw new Error("Failed to fetch meals for this provider");
    const data = await res.json();

    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: { message: error.message || "Something went wrong" } };
  }
}

,
  // services/meals.service.ts

  async getMealById(id: string) {
    try {
      const res = await fetch(
        `http://localhost:5000/api/meals/${id}`,
        { cache: "no-store" }
      );

      const data = await res.json();

      return { data };
    } catch (error: any) {
      return { error };
    }
  },


};


