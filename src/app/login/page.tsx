"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AmbientBlobs from "@/components/layout/AmbientBlobs";
import Footer from "@/components/layout/Footer";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // TODO: Supabase phone auth
    setTimeout(() => setLoading(false), 1500);
  }

  return (
    <div className="bg-surface-container-lowest text-on-surface flex flex-col min-h-screen">
      <AmbientBlobs />

      {/* Nav */}
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

      {/* Main */}
      <main className="flex-grow flex items-center justify-center pt-20 px-6">
        <div className="w-full max-w-[400px] text-center animate-fade-in-up">
          {/* Hero text */}
          <div className="mb-stack-lg">
            <h2 className="text-headline-lg font-semibold text-on-surface mb-2">
              Get any digital service instantly
            </h2>
            <p className="text-body-md text-on-surface-variant">
              Africa&apos;s premium digital services platform.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-stack-md">
            <form className="space-y-gutter" onSubmit={handleSubmit}>
              <div className="text-left">
                <label className="block text-label-md font-medium mb-2 ml-4 text-on-surface-variant" htmlFor="phone">
                  Phone number
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+234 800 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="input-pill"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !phone}
                className="btn-primary w-full"
              >
                {loading ? (
                  <span className="material-symbols-outlined animate-spin text-[20px]">
                    progress_activity
                  </span>
                ) : (
                  "Continue"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 py-2">
              <div className="h-px flex-grow bg-surface-container-highest" />
              <span className="text-label-md text-outline">or</span>
              <div className="h-px flex-grow bg-surface-container-highest" />
            </div>

            {/* Google */}
            <button className="btn-secondary w-full gap-3">
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 6.23l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>

            <p className="text-label-md text-on-surface-variant">
              New to Webey?{" "}
              <Link href="/onboarding" className="text-primary hover:underline">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
