"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase-browser";

type Role = "client" | "freelancer" | null;

export default function OnboardingPage() {
  const [selected, setSelected] = useState<Role>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSelect(role: Role) {
    if (!role || loading) return;
    setSelected(role);
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ data: { role } });

    if (error) {
      setError("Une erreur est survenue. Réessaie.");
      setLoading(false);
      return;
    }

    router.replace(role === "client" ? "/client/dashboard" : "/freelancer/dashboard");
  }

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-hidden">

      {/* Hero CSS animé */}
      <div className="relative w-full flex-shrink-0 overflow-hidden" style={{ height: "60vh", minHeight: 340 }}>

        {/* Fond dégradé principal */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(135deg, #0d0628 0%, #0a1a6e 40%, #0058bc 75%, #1a7fe8 100%)"
        }} />

        {/* Blob 1 animé */}
        <div className="absolute rounded-full" style={{
          width: 320, height: 320,
          top: "-60px", left: "-80px",
          background: "radial-gradient(circle, rgba(124,58,237,0.45) 0%, transparent 70%)",
          animation: "blob-drift 8s ease-in-out infinite",
        }} />

        {/* Blob 2 animé */}
        <div className="absolute rounded-full" style={{
          width: 280, height: 280,
          bottom: "20px", right: "-60px",
          background: "radial-gradient(circle, rgba(59,130,246,0.5) 0%, transparent 70%)",
          animation: "blob-drift 10s ease-in-out infinite reverse",
        }} />

        {/* Blob 3 animé */}
        <div className="absolute rounded-full" style={{
          width: 200, height: 200,
          top: "40%", left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)",
          animation: "blob-drift 6s ease-in-out infinite 2s",
        }} />

        {/* Grille de points */}
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />

        {/* Logo */}
        <div className="absolute top-0 left-0 right-0 flex justify-center" style={{ paddingTop: "calc(env(safe-area-inset-top) + 1.5rem)" }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 relative">
              <Image src="/logo-webey.svg" alt="Webey" fill className="object-contain brightness-0 invert" priority />
            </div>
            <span className="text-white font-semibold text-headline-md tracking-tighter">Webey</span>
          </div>
        </div>

        {/* Texte bas */}
        <div className="absolute bottom-12 left-0 right-0 px-8 text-left">
          <p className="text-white/60 text-label-md font-medium uppercase tracking-widest mb-2">Plateforme premium</p>
          <h1 className="text-white font-bold text-[28px] leading-tight mb-2">
            Les meilleurs talents<br />africains, à portée.
          </h1>
        </div>

        {/* Vague */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 390 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
            <path d="M0 48 L0 28 Q97.5 4 195 24 Q292.5 44 390 20 L390 48 Z" fill="#f9f9f9"/>
          </svg>
        </div>
      </div>

      {/* Section choix */}
      <div className="flex-1 flex flex-col px-5 pt-5 pb-10">
        <div className="text-center mb-6">
          <h2 className="text-headline-md font-semibold text-on-surface">Qui êtes-vous ?</h2>
          <p className="text-body-sm text-on-surface-variant mt-1">Choisissez votre profil pour continuer</p>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-[480px] mx-auto w-full">
          {/* Client */}
          <button
            onClick={() => handleSelect("client")}
            disabled={loading}
            className={`relative flex flex-col items-center text-center p-5 rounded-3xl border-2 transition-all duration-200 active:scale-95 ${
              selected === "client"
                ? "border-primary bg-primary/5 shadow-[0_0_0_4px_rgba(0,88,188,0.1)]"
                : "border-surface-container bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
            }`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-all ${
              selected === "client" ? "bg-primary" : "bg-primary/10"
            }`}>
              <span className={`material-symbols-outlined text-[28px] ${selected === "client" ? "text-white icon-filled" : "text-primary"}`}>
                person_search
              </span>
            </div>
            <p className="text-body-md font-semibold text-on-surface">Client</p>
            <p className="text-label-sm text-on-surface-variant mt-1 leading-snug">
              Je cherche des talents pour mes projets
            </p>
            {selected === "client" && (
              <div className="absolute top-3 right-3">
                <span className="material-symbols-outlined icon-filled text-primary text-[18px]">check_circle</span>
              </div>
            )}
          </button>

          {/* Freelancer */}
          <button
            onClick={() => handleSelect("freelancer")}
            disabled={loading}
            className={`relative flex flex-col items-center text-center p-5 rounded-3xl border-2 transition-all duration-200 active:scale-95 ${
              selected === "freelancer"
                ? "border-violet-500 bg-violet-50 shadow-[0_0_0_4px_rgba(139,92,246,0.1)]"
                : "border-surface-container bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
            }`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-all ${
              selected === "freelancer" ? "bg-violet-500" : "bg-violet-50"
            }`}>
              <span className={`material-symbols-outlined text-[28px] ${selected === "freelancer" ? "text-white icon-filled" : "text-violet-500"}`}>
                terminal
              </span>
            </div>
            <p className="text-body-md font-semibold text-on-surface">Freelancer</p>
            <p className="text-label-sm text-on-surface-variant mt-1 leading-snug">
              Je propose mes services et compétences
            </p>
            {selected === "freelancer" && (
              <div className="absolute top-3 right-3">
                <span className="material-symbols-outlined icon-filled text-violet-500 text-[18px]">check_circle</span>
              </div>
            )}
          </button>
        </div>

        {error && (
          <p className="text-label-md text-error text-center mt-4">{error}</p>
        )}

        {loading && (
          <div className="flex justify-center mt-6">
            <span className="material-symbols-outlined animate-spin text-primary text-[28px]">progress_activity</span>
          </div>
        )}
      </div>

      <style>{`
        @keyframes blob-drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, -20px) scale(1.08); }
          66% { transform: translate(-15px, 15px) scale(0.95); }
        }
      `}</style>
    </div>
  );
}
