"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase-browser";
import AmbientBlobs from "@/components/layout/AmbientBlobs";

export default function VerifyPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phone, setPhone] = useState<string>("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  useEffect(() => {
    const stored = sessionStorage.getItem("webey_otp_phone");
    if (!stored) { router.replace("/login"); return; }
    setPhone(stored);
    inputRefs.current[0]?.focus();
    setResendCooldown(60);
  }, [router]);

  // Countdown for resend
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  function handleInput(index: number, value: string) {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError(null);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 digits filled
    if (newOtp.every((d) => d !== "") && newOtp.join("").length === 6) {
      verify(newOtp.join(""));
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  async function verify(code: string) {
    setLoading(true);
    setError(null);
    const supabase = createClient();

    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token: code,
      type: "sms",
    });

    setLoading(false);

    if (error) {
      setError("Code incorrect ou expiré. Réessaie.");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
      return;
    }

    sessionStorage.removeItem("webey_otp_phone");

    const role = data.user?.user_metadata?.role;
    if (role === "client") router.replace("/client/dashboard");
    else if (role === "freelancer") router.replace("/freelancer/dashboard");
    else router.replace("/onboarding");
  }

  async function resend() {
    if (resendCooldown > 0) return;
    const supabase = createClient();
    await supabase.auth.signInWithOtp({ phone });
    setResendCooldown(60);
    setError(null);
  }

  const maskedPhone = phone
    ? phone.slice(0, 3) + "****" + phone.slice(-3)
    : "";

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
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-primary text-[32px]">sms</span>
          </div>

          <h2 className="text-headline-lg font-semibold text-on-surface mb-2">
            Check your messages
          </h2>
          <p className="text-body-md text-on-surface-variant mb-stack-lg">
            We sent a 6-digit code to{" "}
            <span className="font-medium text-on-surface">{maskedPhone}</span>
          </p>

          {/* OTP inputs */}
          <div className="flex gap-3 justify-center mb-gutter">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInput(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                disabled={loading}
                className={`w-12 h-14 text-center text-headline-md font-semibold rounded-xl border-2 bg-surface-container-low outline-none transition-all ${
                  error
                    ? "border-error text-error"
                    : digit
                    ? "border-primary text-on-surface"
                    : "border-transparent text-on-surface focus:border-primary/50"
                }`}
              />
            ))}
          </div>

          {error && (
            <p className="text-label-md text-error mb-4">{error}</p>
          )}

          {loading && (
            <div className="flex items-center justify-center gap-2 text-label-md text-on-surface-variant mb-4">
              <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
              Vérification...
            </div>
          )}

          {/* Verify button (if not auto-submitted) */}
          {!loading && otp.some((d) => !d) && (
            <button
              onClick={() => verify(otp.join(""))}
              disabled={otp.some((d) => !d)}
              className="btn-primary w-full mb-4"
            >
              Verify
            </button>
          )}

          {/* Resend */}
          <button
            onClick={resend}
            disabled={resendCooldown > 0}
            className="text-label-md text-on-surface-variant hover:text-primary transition-colors disabled:opacity-50"
          >
            {resendCooldown > 0
              ? `Renvoyer dans ${resendCooldown}s`
              : "Renvoyer le code"}
          </button>

          <div className="mt-6">
            <Link href="/login" className="text-label-md text-on-surface-variant hover:text-primary transition-colors">
              ← Changer de numéro
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
