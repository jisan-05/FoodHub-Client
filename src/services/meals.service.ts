const API_URL = process.env.NEXT_PUBLIC_API_URL; 


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
        `${API_URL}/api/meals/${id}`,
        { cache: "no-store" }
      );

      const data = await res.json();

      return { data };
    } catch (error: any) {
      return { error };
    }
  },

   async updateMeal(mealId: string, payload: any, token: string) {
    const res = await fetch(`${API_URL}/api/meals/${mealId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        
      },
      credentials:"include",
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Failed to update meal");
    }

    return res.json();
  },




  async deleteMeal(mealId: string, token: string) {
    const res = await fetch(`${API_URL}/api/meals/${mealId}`, {
      method: "DELETE",
      headers: {
        Authorization: token, // auth() middleware
      },
      credentials:"include"
    });

    if (!res.ok) {
      throw new Error("Failed to delete meal");
    }

    return res.json();
  },



};


