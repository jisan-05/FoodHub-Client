
  
import { createAuthClient } from "better-auth/react";
  
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL
export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : `${API_URL}`,
  fetchOptions: {
    credentials: "include",
  },
});

