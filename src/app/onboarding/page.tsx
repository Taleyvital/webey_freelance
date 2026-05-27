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
    <div className="relative w-full overflow-hidden bg-black" style={{ height: "100vh", minHeight: "-webkit-fill-available", marginTop: "calc(-1 * env(safe-area-inset-top))", paddingTop: "env(safe-area-inset-top)" }}>

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
      <div className="absolute left-0 right-0 px-8 text-left" style={{ bottom: "calc(300px + env(safe-area-inset-bottom))" }}>
        <p className="text-white/60 text-label-md font-medium uppercase tracking-widest mb-2">Plateforme premium</p>
        <h1 className="text-white font-bold text-[28px] leading-tight">
          Les meilleurs talents<br />africains, à portée.
        </h1>
      </div>

      {/* Zone mascotte + boutons */}
      <div
        className="absolute left-0 right-0 bottom-0 flex flex-col items-center"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 1.5rem)" }}
      >
        {/* Titre au-dessus */}
        <div className="text-center mb-2 px-4">
          <h2 className="text-white font-semibold text-[17px]">Qui êtes-vous ?</h2>
          <p className="text-white/60 text-[12px] mt-0.5">Choisissez votre profil pour continuer</p>
        </div>

        {/* Mascotte + boutons superposés */}
        <div className="relative w-full flex justify-center items-end" style={{ height: 220 }}>

          {/* Bouton Client — main gauche de la mascotte */}
          <div className="absolute left-4 bottom-6 z-20">
            <button
              onClick={() => handleSelect("client")}
              disabled={loading}
              className={`flex flex-col items-center text-center px-5 py-3 rounded-2xl border transition-all duration-200 active:scale-95 backdrop-blur-xl shadow-lg ${
                selected === "client"
                  ? "border-white/60 bg-white/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] ring-2 ring-white/40"
                  : "border-white/25 bg-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
              }`}
            >
              <span className={`material-symbols-outlined text-[22px] mb-1 ${selected === "client" ? "text-white icon-filled" : "text-white/80"}`}>person_search</span>
              <p className="text-white font-bold text-[13px]">Client</p>
              <p className="text-white/60 text-[10px] leading-snug max-w-[80px]">Je cherche des talents</p>
              {selected === "client" && (
                <span className="material-symbols-outlined icon-filled text-white text-[14px] mt-1">check_circle</span>
              )}
            </button>
          </div>

          {/* Mascotte centrée */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/mascotte.png"
            alt="Mascotte Webey"
            className="relative z-10 object-contain select-none pointer-events-none"
            style={{ height: 210, width: "auto", marginBottom: 0 }}
            draggable={false}
          />

          {/* Bouton Freelancer — main droite de la mascotte */}
          <div className="absolute right-4 bottom-6 z-20">
            <button
              onClick={() => handleSelect("freelancer")}
              disabled={loading}
              className={`flex flex-col items-center text-center px-5 py-3 rounded-2xl border transition-all duration-200 active:scale-95 backdrop-blur-xl shadow-lg ${
                selected === "freelancer"
                  ? "border-white/60 bg-white/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] ring-2 ring-white/40"
                  : "border-white/25 bg-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
              }`}
            >
              <span className={`material-symbols-outlined text-[22px] mb-1 ${selected === "freelancer" ? "text-white icon-filled" : "text-white/80"}`}>terminal</span>
              <p className="text-white font-bold text-[13px]">Freelancer</p>
              <p className="text-white/60 text-[10px] leading-snug max-w-[80px]">Je propose mes services</p>
              {selected === "freelancer" && (
                <span className="material-symbols-outlined icon-filled text-white text-[14px] mt-1">check_circle</span>
              )}
            </button>
          </div>
        </div>

        {error && <p className="text-[12px] text-red-300 text-center mt-2 px-4">{error}</p>}
        {loading && (
          <div className="flex justify-center mt-2">
            <span className="material-symbols-outlined animate-spin text-white text-[22px]">progress_activity</span>
          </div>
        )}
      </div>
    </div>
  );
}
