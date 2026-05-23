"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase-browser";
import AmbientBlobs from "@/components/layout/AmbientBlobs";
import Footer from "@/components/layout/Footer";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
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
    const { error } = await supabase.auth.updateUser({ password });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setDone(true);
    setTimeout(() => router.replace("/"), 2000);
  }

  if (done) {
    return (
      <div className="bg-surface-container-lowest flex flex-col min-h-screen">
        <AmbientBlobs />
        <main className="flex-grow flex items-center justify-center px-6">
          <div className="w-full max-w-[400px] text-center animate-fade-in-up">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-8">
              <span className="material-symbols-outlined icon-filled text-green-600 text-[40px]">check_circle</span>
            </div>
            <h2 className="text-headline-lg font-semibold text-on-surface mb-3">
              Mot de passe mis à jour
            </h2>
            <p className="text-body-md text-on-surface-variant">
              Vous allez être redirigé vers votre espace…
            </p>
          </div>
        </main>
        <Footer />
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
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-primary text-[32px]">lock</span>
            </div>
            <h2 className="text-headline-lg font-semibold text-on-surface mb-2">
              Nouveau mot de passe
            </h2>
            <p className="text-body-md text-on-surface-variant">
              Choisissez un nouveau mot de passe pour votre compte.
            </p>
          </div>

          <form className="space-y-gutter" onSubmit={handleSubmit}>
            <div className="text-left">
              <label className="block text-label-md font-medium mb-2 ml-4 text-on-surface-variant" htmlFor="password">
                Nouveau mot de passe
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
              disabled={loading || !password || !confirm}
              className="btn-primary w-full"
            >
              {loading ? (
                <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
              ) : (
                "Enregistrer le mot de passe"
              )}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
