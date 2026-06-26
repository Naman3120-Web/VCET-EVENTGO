import { NextResponse } from "next/server";
import createClient from "@/lib/supabaseServer";

export async function POST() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  return NextResponse.json(
    { message: "Successfully logged out" },
    { status: 200 },
  );
}
