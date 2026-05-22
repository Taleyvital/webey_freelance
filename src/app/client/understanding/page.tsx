"use client";

import Link from "next/link";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import AmbientBlobs from "@/components/layout/AmbientBlobs";

export default function UnderstandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AmbientBlobs />
      <NavBar role="client" />

      <main className="flex-grow pt-[120px] pb-stack-lg px-6">
        <div className="page-container flex flex-col items-center">
          {/* Request display */}
          <div className="w-full text-center mb-stack-lg animate-fade-in-up">
            <div className="inline-block px-6 py-2 rounded-full bg-surface-container-low text-on-surface-variant text-body-md mb-4">
              Your request
            </div>
            <h1 className="text-headline-lg font-semibold text-on-surface max-w-2xl mx-auto leading-tight">
              &ldquo;I need a modern logo for my coffee shop in Dakar.&rdquo;
            </h1>
          </div>

          {/* AI Response card */}
          <div className="w-full max-w-[520px] card animate-fade-in-up delay-200">
            {/* Success indicator */}
            <div className="flex items-center gap-4 mb-stack-md">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined icon-filled text-primary text-[20px]">check_circle</span>
              </div>
              <span className="text-headline-md font-medium text-on-surface">We understood your request</span>
            </div>

            {/* Service details */}
            <div className="space-y-0 mb-stack-lg divide-y divide-surface-variant/30">
              <div className="flex justify-between items-center py-4">
                <span className="text-label-md text-on-surface-variant">Service</span>
                <span className="text-body-md font-medium text-on-surface">Logo Design</span>
              </div>
              <div className="flex justify-between items-center py-4">
                <span className="text-label-md text-on-surface-variant">Estimated Price</span>
                <div className="text-right">
                  <span className="text-body-md font-semibold text-on-surface">15,000 – 45,000 FCFA</span>
                  <p className="text-[10px] text-outline uppercase tracking-wider mt-1">
                    Based on local market rates
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center py-4">
                <span className="text-label-md text-on-surface-variant">Delivery</span>
                <span className="text-body-md font-medium text-on-surface">2 days</span>
              </div>
              <div className="flex justify-between items-center py-4">
                <span className="text-label-md text-on-surface-variant">Category</span>
                <span className="text-body-md font-medium text-on-surface">Branding & Identity</span>
              </div>
            </div>

            {/* CTA */}
            <Link href="/client/orders" className="btn-primary w-full">
              Continue
            </Link>
            <p className="text-center mt-4 text-label-md text-outline">
              You can refine details in the next step.
            </p>
          </div>

          {/* Visual context */}
          <div className="mt-stack-lg w-full max-w-container grid grid-cols-1 md:grid-cols-2 gap-gutter opacity-80 animate-fade-in-up delay-300">
            {[
              { label: "Local Inspiration", bg: "from-amber-100 to-orange-50" },
              { label: "Craftsmanship", bg: "from-blue-50 to-indigo-50" },
            ].map((item) => (
              <div key={item.label} className={`aspect-video rounded-xl bg-gradient-to-br ${item.bg} flex items-end p-4`}>
                <span className="text-label-md font-medium text-on-surface-variant">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
