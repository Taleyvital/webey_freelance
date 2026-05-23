import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/login", "/register", "/auth/callback"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always allow static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  const isPublic = PUBLIC_ROUTES.some((r) => pathname.startsWith(r)) || pathname === "/";

  // Not authenticated → allow public routes, block the rest
  if (!user) {
    if (isPublic) return response;
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Authenticated → redirect away from login/verify to dashboard
  if (pathname === "/login" || pathname === "/register") {
    const role = user.user_metadata?.role as "client" | "freelancer" | undefined;
    if (role === "client") return NextResponse.redirect(new URL("/client/dashboard", request.url));
    if (role === "freelancer") return NextResponse.redirect(new URL("/freelancer/dashboard", request.url));
    return NextResponse.redirect(new URL("/onboarding", request.url));
  }

  const role = user.user_metadata?.role as "client" | "freelancer" | undefined;

  // Authenticated but no role yet → force onboarding
  if (!role && pathname !== "/onboarding") {
    return NextResponse.redirect(new URL("/onboarding", request.url));
  }

  // Role mismatch — prevent client from accessing freelancer routes and vice versa
  if (role === "client" && pathname.startsWith("/freelancer")) {
    return NextResponse.redirect(new URL("/client/dashboard", request.url));
  }
  if (role === "freelancer" && pathname.startsWith("/client")) {
    return NextResponse.redirect(new URL("/freelancer/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
