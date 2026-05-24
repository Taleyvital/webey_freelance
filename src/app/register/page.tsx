"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase-browser";
import AmbientBlobs from "@/components/layout/AmbientBlobs";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? window.location.origin}/auth/callback`,
      },
    });

    setLoading(false);

    if (error) {
      if (error.message.includes("already registered")) {
        setError("Un compte existe déjà avec cet email.");
      } else {
        setError(error.message);
      }
      return;
    }

    // Email confirmation required
    if (data.user && !data.session) {
      setEmailSent(true);
      return;
    }

    // Logged in immediately (email confirmation disabled in Supabase)
    router.replace("/onboarding");
    router.refresh();
  }

  async function handleGoogle() {
    setGoogleLoading(true);
    setError(null);
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? window.location.origin}/auth/callback`,
      },
    });
  }

  if (emailSent) {
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
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8">
              <span className="material-symbols-outlined text-primary text-[40px]">mark_email_unread</span>
            </div>
            <h2 className="text-headline-lg font-semibold text-on-surface mb-3">Vérifiez votre boîte mail</h2>
            <p className="text-body-md text-on-surface-variant mb-2">Un lien de confirmation a été envoyé à</p>
            <p className="text-body-lg font-medium text-on-surface mb-8">{email}</p>
            <p className="text-label-md text-on-surface-variant mb-6">
              Cliquez sur le lien dans l&apos;email pour activer votre compte.
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

      <main className="flex-grow flex items-center justify-center pt-20 px-6">
        <div className="w-full max-w-[400px] text-center animate-fade-in-up">
          <div className="mb-stack-lg">
            <h2 className="text-headline-lg font-semibold text-on-surface mb-2">
              Créer un compte
            </h2>
            <p className="text-body-md text-on-surface-variant">
              Rejoignez la plateforme premium africaine.
            </p>
          </div>

          <div className="space-y-stack-md">
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

              <div className="text-left">
                <label className="block text-label-md font-medium mb-2 ml-4 text-on-surface-variant" htmlFor="password">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="6 caractères minimum"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="input-pill pr-14"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              <div className="text-left">
                <label className="block text-label-md font-medium mb-2 ml-4 text-on-surface-variant" htmlFor="confirm">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <input
                    id="confirm"
                    type={showConfirm ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                    className="input-pill pr-14"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showConfirm ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-label-md text-error text-left ml-4">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || !email.trim() || !password || !confirm}
                className="btn-primary w-full"
              >
                {loading ? (
                  <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                ) : (
                  "Créer mon compte"
                )}
              </button>
            </form>

            <div className="flex items-center gap-4 py-2">
              <div className="h-px flex-grow bg-surface-container-highest" />
              <span className="text-label-md text-outline">ou</span>
              <div className="h-px flex-grow bg-surface-container-highest" />
            </div>

            <button
              onClick={handleGoogle}
              disabled={googleLoading}
              className="btn-secondary w-full gap-3"
            >
              {googleLoading ? (
                <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
              ) : (
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 6.23l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
              )}
              Continuer avec Google
            </button>

            <p className="text-label-md text-on-surface-variant pt-2">
              Déjà un compte ?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </main>

    </div>
  );
}
