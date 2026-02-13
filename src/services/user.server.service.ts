import { cookies } from "next/headers";

const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL;

export const userServerService = {
  getSession: async () => {
    try {
      const cookieStore = cookies();

      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const session = await res.json();

      if (!session) {
        return { data: null, error: { message: "session missing" } };
      }

      return { data: session, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
