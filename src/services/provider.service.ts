const API_URL = process.env.API_URL; 


export const providerService = {
  getProvider: async function () {
    try {
      const res = await fetch(`${API_URL}/api/provider/profile`);
      const data = await res.json();

      return { data: data, error: null };
    } catch (error) {}
    return { data: null, error: { message: "Something wrong " } };
  },
};
