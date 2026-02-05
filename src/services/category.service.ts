const API_URL = process.env.API_URL; // e.g., "http://localhost:5000"
console.log("API_URL=", API_URL);

export const categoryService = {
  getCategorys: async function () {
    try {
      const res = await fetch(`${API_URL}/api/categories`);
      const data = await res.json();
      console.log("from category service -----", data);
      return { data: data, error: null };
    } catch (error) {}
    return { data: null, error: { message: "Something wrong " } };
  },
};
