"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase-browser";
import AmbientBlobs from "@/components/layout/AmbientBlobs";

export default function VerifyPage() {
  const [email, setEmail] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(60);
  const [resendDone, setResendDone] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const stored = sessionStorage.getItem("webey_magic_email");
    if (!stored) { router.replace("/login"); return; }
    setEmail(stored);
  }, [router]);

  // Countdown
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  async function resend() {
    if (resendCooldown > 0 || !email) return;
    setResendLoading(true);
    const supabase = createClient();
    await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? window.location.origin}/auth/callback` },
    });
    setResendLoading(false);
    setResendDone(true);
    setResendCooldown(60);
  }

  return (
    <div className="bg-surface-container-lowest flex flex-col min-h-screen">
      <AmbientBlobs />

      <header className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <div className="flex items-center justify-center h-20 page-container">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 relative">
              <Image src="/logo-webey.svg" alt="Webey" fill className="object-contain" priority />
            </div>
            <span className="text-headline-md font-semibold text-primary tracking-tighter">Webey</span>
          </Link>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center pt-20 px-6">
        <div className="w-full max-w-[400px] text-center animate-fade-in-up">

          {/* Icon */}
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8">
            <span className="material-symbols-outlined text-primary text-[40px]">mark_email_unread</span>
          </div>

          <h2 className="text-headline-lg font-semibold text-on-surface mb-3">
            Vérifiez votre boîte mail
          </h2>
          <p className="text-body-md text-on-surface-variant mb-2">
            Nous avons envoyé un lien magique à
          </p>
          <p className="text-body-lg font-medium text-on-surface mb-stack-lg">
            {email}
          </p>

          {/* Steps */}
          <div className="card text-left space-y-4 mb-stack-lg">
            {[
              { icon: "inbox", text: "Ouvrez l'email de Webey" },
              { icon: "link", text: "Cliquez sur le lien magique" },
              { icon: "check_circle", text: "Vous êtes connecté — aucun mot de passe requis" },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-[16px]">{step.icon}</span>
                </div>
                <span className="text-body-md text-on-surface">{step.text}</span>
              </div>
            ))}
          </div>

          {/* Resend */}
          {resendDone && (
            <p className="text-label-md text-green-600 mb-4">
              ✓ Nouveau lien envoyé !
            </p>
          )}

          <button
            onClick={resend}
            disabled={resendCooldown > 0 || resendLoading}
            className="text-label-md text-on-surface-variant hover:text-primary transition-colors disabled:opacity-50 mb-6"
          >
            {resendLoading
              ? "Envoi..."
              : resendCooldown > 0
              ? `Renvoyer dans ${resendCooldown}s`
              : "Renvoyer le lien magique"}
          </button>

          <div>
            <Link
              href="/login"
              className="text-label-md text-on-surface-variant hover:text-primary transition-colors"
            >
              ← Utiliser une autre adresse
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
