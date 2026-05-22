"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import AmbientBlobs from "@/components/layout/AmbientBlobs";

const suggestions = [
  "I need a logo for my brand",
  "Build me a landing page",
  "Design my mobile app UI",
  "Create social media content",
];

export default function RequestPage() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    setLoading(true);
    // TODO: send to AI understanding API
    setTimeout(() => {
      router.push("/client/understanding");
    }, 1200);
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AmbientBlobs />
      <NavBar role="client" />

      <main className="flex-grow flex items-center justify-center pt-20 px-6">
        <div className="w-full max-w-[640px] text-center">
          {/* Heading */}
          <div className="mb-stack-lg animate-fade-in-up">
            <h1 className="text-headline-lg font-semibold text-on-surface mb-4">
              Tell us what you need
            </h1>
            <p className="text-body-lg text-on-surface-variant">
              Describe your project in plain language. Our AI will understand and match you with the right talent.
            </p>
          </div>

          {/* Input area */}
          <form onSubmit={handleSubmit} className="animate-fade-in-up delay-100">
            <div className="relative mb-gutter">
              <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="e.g. I need a modern logo for my coffee shop in Dakar..."
                rows={4}
                className="w-full px-6 py-5 bg-surface-container-low border-none rounded-xl text-body-md text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/40 outline-none transition-all resize-none"
              />
              <div className="absolute bottom-4 right-4 text-label-md text-outline">
                {value.length}/500
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !value.trim()}
              className="btn-primary w-full text-body-md gap-2"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                  Understanding your request...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px]">magic_button</span>
                  Understand my request
                </>
              )}
            </button>
          </form>

          {/* Suggestions */}
          <div className="mt-stack-md animate-fade-in-up delay-200">
            <p className="text-label-md text-on-surface-variant mb-3">Quick ideas</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setValue(s)}
                  className="px-4 py-2 rounded-full bg-surface-container-low text-label-md text-on-surface hover:bg-surface-container-high transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
