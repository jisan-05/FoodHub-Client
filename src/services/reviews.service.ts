const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL; 


export const reviewssService = {
  getReviews: async function () {
    try {
      const res = await fetch(`${API_URL}/api/customer/reviews`);
      const data = await res.json();

      return { data: data, error: null };
    } catch (error) {}
    return { data: null, error: { message: "Something wrong " } };
  },
};
