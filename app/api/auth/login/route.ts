import { NextRequest, NextResponse } from "next/server";
import { createServerClient as createSSRClient } from "@supabase/ssr";
import { createServerClient } from "@/lib/supabase-server";
import { loginRatelimit } from "@/lib/ratelimit";

export async function POST(request: NextRequest) {
  try {
    let body: { email?: string; password?: string; mode?: string };
    try { body = await request.json(); }
    catch { return NextResponse.json({ error: "Invalid request" }, { status: 400 }); }

    const { email: rawEmail, password, mode = "client" } = body;
    if (!rawEmail || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const email = rawEmail.toLowerCase().trim();

    const { success: rateLimitOk } = await loginRatelimit.limit(`login:${email}`);
    if (!rateLimitOk) {
      return NextResponse.json(
        { error: "Too many failed attempts. Please try again in 15 minutes." },
        { status: 429 },
      );
    }

    // Collect cookies set by Supabase during signIn so we can apply them to the response
    const cookiesToSet: Array<{ name: string; value: string; options: Record<string, unknown> }> = [];

    const supabase = createSSRClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return request.cookies.getAll(); },
          setAll(cookies) {
            cookies.forEach((c) => cookiesToSet.push(c));
          },
        },
      },
    );

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const service = createServerClient();
    const { data: profile } = await service
      .from("users")
      .select("role, must_change_password")
      .eq("id", user.id)
      .single();

    let redirectTo: string;

    if (mode === "admin") {
      if (profile?.role !== "admin") {
        await supabase.auth.signOut();
        return NextResponse.json(
          { error: "Access denied. This portal is for administrators only." },
          { status: 403 },
        );
      }
      redirectTo = "/admin";
    } else {
      if (profile?.role === "admin") {
        redirectTo = "/admin";
      } else if (profile?.must_change_password) {
        redirectTo = "/portal/set-password";
      } else {
        redirectTo = "/portal/dashboard";
      }
    }

    const response = NextResponse.json({ success: true, redirectTo });
    for (const { name, value, options } of cookiesToSet) {
      response.cookies.set(name, value, options as Parameters<typeof response.cookies.set>[2]);
    }
    return response;

  } catch (err) {
    console.error("[auth:login] unhandled:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
