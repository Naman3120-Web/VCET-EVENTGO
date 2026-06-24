import {createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export default async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToset) {
          cookiesToset.forEach((cookie) => {
            try {
              cookieStore.set(cookie.name, cookie.value, cookie.options);
            } catch {}
          });
        },
      },
    },
  );
}
