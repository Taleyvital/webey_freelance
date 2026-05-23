import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const type = searchParams.get("type");
  const next = searchParams.get("next") ?? "/onboarding";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Password reset flow
      if (type === "recovery") {
        return NextResponse.redirect(`${origin}/reset-password`);
      }

      // Check if user already has a role (returning user)
      const { data: { user } } = await supabase.auth.getUser();
      const role = user?.user_metadata?.role;

      if (role === "client") {
        return NextResponse.redirect(`${origin}/client/dashboard`);
      }
      if (role === "freelancer") {
        return NextResponse.redirect(`${origin}/freelancer/dashboard`);
      }

      // New user — send to onboarding
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}
