"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
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
    <div className="relative w-full h-[100dvh] overflow-hidden bg-black">

      {/* Fallback gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d0628] via-[#0a1a6e] to-[#0058bc]" />

      {/* Vidéo plein écran */}
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

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/75" />

      {/* Texte hero */}
      <div className="absolute left-0 right-0 px-8 text-left" style={{ bottom: "calc(260px + env(safe-area-inset-bottom))" }}>
        <p className="text-white/60 text-label-md font-medium uppercase tracking-widest mb-2">Plateforme premium</p>
        <h1 className="text-white font-bold text-[28px] leading-tight">
          Les meilleurs talents<br />africains, à portée.
        </h1>
      </div>

      {/* Panneau liquid glass bas */}
      <div
        className="absolute left-0 right-0 bottom-0 px-4"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 1.5rem)" }}
      >
        <div className="rounded-3xl backdrop-blur-2xl bg-white/15 border border-white/25 shadow-[0_-1px_0_rgba(255,255,255,0.2),0_20px_60px_rgba(0,0,0,0.3)] p-5">

          <div className="text-center mb-4">
            <h2 className="text-white font-semibold text-[18px]">Qui êtes-vous ?</h2>
            <p className="text-white/60 text-label-md mt-0.5">Choisissez votre profil pour continuer</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleSelect("client")}
              disabled={loading}
              className={`relative flex flex-col items-center text-center p-4 rounded-2xl border transition-all duration-200 active:scale-95 backdrop-blur-xl ${
                selected === "client"
                  ? "border-white/50 bg-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] ring-2 ring-white/40"
                  : "border-white/20 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 transition-all ${selected === "client" ? "bg-white/30" : "bg-white/15"}`}>
                <span className={`material-symbols-outlined text-[24px] ${selected === "client" ? "text-white icon-filled" : "text-white/80"}`}>person_search</span>
              </div>
              <p className="text-white font-semibold text-[14px]">Client</p>
              <p className="text-white/60 text-[11px] mt-0.5 leading-snug">Je cherche des talents pour mes projets</p>
              {selected === "client" && (
                <div className="absolute top-2.5 right-2.5">
                  <span className="material-symbols-outlined icon-filled text-white text-[16px]">check_circle</span>
                </div>
              )}
            </button>

            <button
              onClick={() => handleSelect("freelancer")}
              disabled={loading}
              className={`relative flex flex-col items-center text-center p-4 rounded-2xl border transition-all duration-200 active:scale-95 backdrop-blur-xl ${
                selected === "freelancer"
                  ? "border-white/50 bg-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] ring-2 ring-white/40"
                  : "border-white/20 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 transition-all ${selected === "freelancer" ? "bg-white/30" : "bg-white/15"}`}>
                <span className={`material-symbols-outlined text-[24px] ${selected === "freelancer" ? "text-white icon-filled" : "text-white/80"}`}>terminal</span>
              </div>
              <p className="text-white font-semibold text-[14px]">Freelancer</p>
              <p className="text-white/60 text-[11px] mt-0.5 leading-snug">Je propose mes services et compétences</p>
              {selected === "freelancer" && (
                <div className="absolute top-2.5 right-2.5">
                  <span className="material-symbols-outlined icon-filled text-white text-[16px]">check_circle</span>
                </div>
              )}
            </button>
          </div>

          {error && <p className="text-label-md text-red-300 text-center mt-3">{error}</p>}
          {loading && (
            <div className="flex justify-center mt-4">
              <span className="material-symbols-outlined animate-spin text-white text-[24px]">progress_activity</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
