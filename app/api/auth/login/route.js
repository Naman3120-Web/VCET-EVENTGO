import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request) {
  // --- DEBUGGING STEP ---
  // This will print the keys to your terminal console (where you run npm run dev).
  console.log("Supabase URL loaded:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log("Supabase Anon Key loaded:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  // --------------------

  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    return NextResponse.json({ user: data.user, session: data.session }, { status: 200 });

  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
