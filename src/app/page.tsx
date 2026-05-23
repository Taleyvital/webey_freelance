import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const role = user.user_metadata?.role;
  if (!role) redirect("/onboarding");
  if (role === "client") redirect("/client/dashboard");
  if (role === "freelancer") redirect("/freelancer/dashboard");

  redirect("/login");
}
