// import { createAuthClient } from "better-auth/react"
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL
// export const authClient = createAuthClient({
//     /** The base URL of the server (optional if you're using the same domain) */
//     baseURL: `${API_URL}/api/auth`
//     // baseURL: `${API_URL}/api/auth`
// })

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : `${API_URL}`,
  fetchOptions: {
    credentials: "include",
  },
});

