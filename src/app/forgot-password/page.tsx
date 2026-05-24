"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase-browser";
import AmbientBlobs from "@/components/layout/AmbientBlobs";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? window.location.origin}/auth/callback?type=recovery`,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSent(true);
  }

  if (sent) {
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
        <main className="flex-grow flex items-center justify-center pt-safe-nav px-6">
          <div className="w-full max-w-[400px] text-center animate-fade-in-up">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8">
              <span className="material-symbols-outlined text-primary text-[40px]">mark_email_unread</span>
            </div>
            <h2 className="text-headline-lg font-semibold text-on-surface mb-3">
              Email envoyé
            </h2>
            <p className="text-body-md text-on-surface-variant mb-2">
              Un lien de réinitialisation a été envoyé à
            </p>
            <p className="text-body-lg font-medium text-on-surface mb-8">{email}</p>
            <p className="text-label-md text-on-surface-variant mb-6">
              Cliquez sur le lien dans l&apos;email pour créer un nouveau mot de passe.
            </p>
            <Link href="/login" className="text-label-md text-on-surface-variant hover:text-primary transition-colors">
              ← Retour à la connexion
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest text-on-surface flex flex-col min-h-screen">
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

      <main className="flex-grow flex items-center justify-center pt-safe-nav px-6">
        <div className="w-full max-w-[400px] text-center animate-fade-in-up">
          <div className="mb-stack-lg">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-primary text-[32px]">lock_reset</span>
            </div>
            <h2 className="text-headline-lg font-semibold text-on-surface mb-2">
              Mot de passe oublié ?
            </h2>
            <p className="text-body-md text-on-surface-variant">
              Entrez votre email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
            </p>
          </div>

          <form className="space-y-gutter" onSubmit={handleSubmit}>
            <div className="text-left">
              <label className="block text-label-md font-medium mb-2 ml-4 text-on-surface-variant" htmlFor="email">
                Adresse email
              </label>
              <input
                id="email"
                type="email"
                placeholder="vous@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-pill"
              />
            </div>

            {error && (
              <p className="text-label-md text-error text-left ml-4">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || !email.trim()}
              className="btn-primary w-full"
            >
              {loading ? (
                <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
              ) : (
                "Envoyer le lien"
              )}
            </button>
          </form>

          <div className="mt-6">
            <Link href="/login" className="text-label-md text-on-surface-variant hover:text-primary transition-colors">
              ← Retour à la connexion
            </Link>
          </div>
        </div>
      </main>

    </div>
  );
}
