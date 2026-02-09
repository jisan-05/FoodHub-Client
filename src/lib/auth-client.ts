import { createAuthClient } from "better-auth/react"
const API_URL = process.env.NEXT_PUBLIC_API_URL
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: `${API_URL}`
    // baseURL: `${API_URL}/api/auth`
})