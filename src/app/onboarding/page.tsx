"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase-browser";
import AmbientBlobs from "@/components/layout/AmbientBlobs";
import Footer from "@/components/layout/Footer";

type Role = "client" | "freelancer" | null;

export default function OnboardingPage() {
  const [selected, setSelected] = useState<Role>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleContinue() {
    if (!selected) return;
    setLoading(true);
    setError(null);

    const supabase = createClient();

    // Save role in Supabase user metadata
    const { error } = await supabase.auth.updateUser({
      data: { role: selected },
    });

    if (error) {
      setError("Une erreur est survenue. Réessaie.");
      setLoading(false);
      return;
    }

    router.replace(
      selected === "client" ? "/client/dashboard" : "/freelancer/dashboard"
    );
  }

  return (
    <div className="bg-background text-on-background flex flex-col min-h-screen">
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

      <main className="flex-grow flex items-center justify-center w-full px-6 md:px-16 pt-28 pb-stack-lg">
        <div className="max-w-[800px] w-full">
          <div className="text-center mb-stack-lg animate-fade-in-up">
            <h1 className="text-headline-lg font-semibold text-on-surface mb-4">
              Qui êtes-vous ?
            </h1>
            <p className="text-body-lg text-on-surface-variant max-w-[500px] mx-auto">
              Choisissez le parcours qui correspond à vos objectifs. Nous adapterons votre expérience en conséquence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter animate-fade-in-up delay-100">
            {/* Client */}
            <button
              onClick={() => setSelected("client")}
              className={`group relative bg-surface-container-lowest p-stack-lg rounded-xl flex flex-col items-center text-center ambient-shadow cursor-pointer hover:bg-surface-container-low border-2 transition-all duration-300 ${
                selected === "client"
                  ? "border-primary scale-[1.02] bg-primary/5"
                  : "border-transparent"
              }`}
            >
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-stack-md transition-transform group-hover:scale-110 ${
                selected === "client" ? "bg-primary/15" : "bg-primary/10"
              }`}>
                <span className="material-symbols-outlined text-primary text-[40px]">person_search</span>
              </div>
              <h3 className="text-headline-md font-medium text-on-surface mb-2">Client</h3>
              <p className="text-body-md text-on-surface-variant">
                Je veux recruter des talents et créer des produits digitaux exceptionnels.
              </p>
              {selected === "client" && (
                <div className="mt-stack-md">
                  <span className="material-symbols-outlined icon-filled text-primary text-[28px]">check_circle</span>
                </div>
              )}
            </button>

            {/* Freelancer */}
            <button
              onClick={() => setSelected("freelancer")}
              className={`group relative bg-surface-container-lowest p-stack-lg rounded-xl flex flex-col items-center text-center ambient-shadow cursor-pointer hover:bg-surface-container-low border-2 transition-all duration-300 ${
                selected === "freelancer"
                  ? "border-secondary scale-[1.02] bg-secondary/5"
                  : "border-transparent"
              }`}
            >
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-stack-md transition-transform group-hover:scale-110 ${
                selected === "freelancer" ? "bg-secondary/15" : "bg-secondary/10"
              }`}>
                <span className="material-symbols-outlined text-secondary text-[40px]">terminal</span>
              </div>
              <h3 className="text-headline-md font-medium text-on-surface mb-2">Freelancer</h3>
              <p className="text-body-md text-on-surface-variant">
                Je suis un artisan digital prêt à contribuer à des projets premium.
              </p>
              {selected === "freelancer" && (
                <div className="mt-stack-md">
                  <span className="material-symbols-outlined icon-filled text-secondary text-[28px]">check_circle</span>
                </div>
              )}
            </button>
          </div>

          {error && (
            <p className="text-label-md text-error text-center mt-4">{error}</p>
          )}

          <div className="mt-stack-lg flex flex-col items-center gap-gutter animate-fade-in-up delay-200">
            <button
              onClick={handleContinue}
              disabled={!selected || loading}
              className="btn-primary px-12 h-14 text-body-md"
            >
              {loading ? (
                <span className="material-symbols-outlined animate-spin text-[20px]">
                  progress_activity
                </span>
              ) : (
                "Continuer"
              )}
            </button>

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <div className="w-2 h-2 rounded-full bg-outline-variant" />
              <div className="w-2 h-2 rounded-full bg-outline-variant" />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
