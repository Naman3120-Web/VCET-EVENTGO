import { NextResponse } from "next/server";
import createClient from "@/lib/supabaseServer";

export async function POST(request) {
  const { email, password } = await request.json();

  console.log(`${email}${password}`);
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json(
    { message: "Success", user: data.user },
    { status: 200 },
  );
}

