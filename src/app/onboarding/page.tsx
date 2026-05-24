"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase-browser";

type Role = "client" | "freelancer" | null;

export default function OnboardingPage() {
  const [selected, setSelected] = useState<Role>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;

    const tryPlay = () => { v.play().catch(() => {}); };

    // Tentative immédiate
    tryPlay();

    // iOS PWA : rejouer au premier touch si bloqué
    const onTouch = () => { tryPlay(); document.removeEventListener("touchstart", onTouch); };
    document.addEventListener("touchstart", onTouch);

    // Rejouer si l'app revient au premier plan
    const onVisible = () => { if (!document.hidden) tryPlay(); };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      document.removeEventListener("touchstart", onTouch);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

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

      {/* Hero vidéo */}
      <div className="relative w-full flex-shrink-0" style={{ height: "60vh", minHeight: 340 }}>

        {/* Fallback gradient derrière la vidéo */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d0628] via-[#0a1a6e] to-[#0058bc]" />

        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          {...{ "webkit-playsinline": "true", "x-webkit-airplay": "allow" }}
        >
          <source src="/video/video-hero-chemise-jaune-h264.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
          <source src="/video/video-hero-chemise-jaune-h264.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/65" />

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
          <h1 className="text-white font-bold text-[28px] leading-tight">
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
          <button
            onClick={() => handleSelect("client")}
            disabled={loading}
            className={`relative flex flex-col items-center text-center p-5 rounded-3xl border-2 transition-all duration-200 active:scale-95 ${
              selected === "client"
                ? "border-primary bg-primary/5 shadow-[0_0_0_4px_rgba(0,88,188,0.1)]"
                : "border-surface-container bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
            }`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-all ${selected === "client" ? "bg-primary" : "bg-primary/10"}`}>
              <span className={`material-symbols-outlined text-[28px] ${selected === "client" ? "text-white icon-filled" : "text-primary"}`}>person_search</span>
            </div>
            <p className="text-body-md font-semibold text-on-surface">Client</p>
            <p className="text-label-sm text-on-surface-variant mt-1 leading-snug">Je cherche des talents pour mes projets</p>
            {selected === "client" && (
              <div className="absolute top-3 right-3">
                <span className="material-symbols-outlined icon-filled text-primary text-[18px]">check_circle</span>
              </div>
            )}
          </button>

          <button
            onClick={() => handleSelect("freelancer")}
            disabled={loading}
            className={`relative flex flex-col items-center text-center p-5 rounded-3xl border-2 transition-all duration-200 active:scale-95 ${
              selected === "freelancer"
                ? "border-violet-500 bg-violet-50 shadow-[0_0_0_4px_rgba(139,92,246,0.1)]"
                : "border-surface-container bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
            }`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-all ${selected === "freelancer" ? "bg-violet-500" : "bg-violet-50"}`}>
              <span className={`material-symbols-outlined text-[28px] ${selected === "freelancer" ? "text-white icon-filled" : "text-violet-500"}`}>terminal</span>
            </div>
            <p className="text-body-md font-semibold text-on-surface">Freelancer</p>
            <p className="text-label-sm text-on-surface-variant mt-1 leading-snug">Je propose mes services et compétences</p>
            {selected === "freelancer" && (
              <div className="absolute top-3 right-3">
                <span className="material-symbols-outlined icon-filled text-violet-500 text-[18px]">check_circle</span>
              </div>
            )}
          </button>
        </div>

        {error && <p className="text-label-md text-error text-center mt-4">{error}</p>}
        {loading && (
          <div className="flex justify-center mt-6">
            <span className="material-symbols-outlined animate-spin text-primary text-[28px]">progress_activity</span>
          </div>
        )}
      </div>
    </div>
  );
}
