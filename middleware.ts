import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);

  let supabaseResponse = NextResponse.next({ request: { headers: requestHeaders } });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request: { headers: requestHeaders } });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const { data: { user } } = await supabase.auth.getUser();

  const pathname          = request.nextUrl.pathname;
  const isSetPasswordPath = pathname === "/portal/set-password";
  const isAdminLoginPath  = pathname === "/admin/login";

  // RULE 1 — Unauthenticated user accessing protected routes
  if (!user && !isSetPasswordPath && !isAdminLoginPath) {
    if (pathname.startsWith("/portal")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // RULE 2 — Authenticated user accessing /portal/*
  if (user && pathname.startsWith("/portal")) {
    const { data } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    if (data?.role === "admin") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    return supabaseResponse;
  }

  // RULE 3 — Authenticated user accessing /admin/* (not /admin/login)
  if (user && pathname.startsWith("/admin") && !isAdminLoginPath) {
    const { data } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    if (data?.role === "client") {
      return NextResponse.redirect(new URL("/portal/dashboard", request.url));
    }

    return supabaseResponse;
  }

  // RULE 4 — Authenticated user at /admin/login → already logged in, skip to admin
  if (user && isAdminLoginPath) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // RULE 5 — Authenticated user accessing /login
  if (user && pathname === "/login") {
    const { data } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    if (data?.role === "admin") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    return NextResponse.redirect(new URL("/portal/dashboard", request.url));
  }

  // RULE 6 — All other routes
  return supabaseResponse;
}

export const config = {
  matcher: ["/portal/:path*", "/admin/:path*", "/login"],
};
