"use client";

import { useRouter } from "next/navigation";
import NavBar from "@/components/layout/NavBar";
import BottomNav from "@/components/layout/BottomNav";
import AmbientBlobs from "@/components/layout/AmbientBlobs";
import { getFreelancer } from "@/lib/freelancers";

export default function FreelancerProfilePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const f = getFreelancer(id);

  if (!f) {
    return (
      <div className="flex flex-col min-h-screen bg-background items-center justify-center">
        <p className="text-on-surface-variant">Freelancer introuvable.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AmbientBlobs />
      <NavBar role="client" />

      <main className="flex-grow pt-20 pb-32">
        <div className="max-w-[480px] mx-auto">

          {/* Portfolio strip + back button */}
          <div className="relative grid grid-cols-3 h-40">
            {f.portfolio.map((p) => (
              <div key={p.label} className={`bg-gradient-to-br ${p.color}`} />
            ))}
            <button
              onClick={() => router.back()}
              className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center shadow-sm"
            >
              <span className="material-symbols-outlined text-on-surface text-[20px]">arrow_back</span>
            </button>
          </div>

          <div className="px-5">
            {/* Avatar + identity */}
            <div className="flex items-end gap-3 -mt-9 mb-5">
              <div className={`w-18 h-18 w-[72px] h-[72px] rounded-2xl bg-gradient-to-br ${f.avatarColor} flex items-center justify-center ring-4 ring-white shrink-0`}>
                <span className="text-white font-bold text-headline-sm">{f.avatar}</span>
              </div>
              <div className="mb-1 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-headline-md font-semibold text-on-surface">{f.name}</p>
                  {f.available
                    ? <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Disponible</span>
                    : <span className="text-[10px] font-medium text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full">Indisponible</span>
                  }
                </div>
                <p className="text-label-md text-on-surface-variant">{f.title} · {f.location}</p>
              </div>
            </div>

            {/* Rating row */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined icon-filled text-amber-400 text-[15px]">star</span>
                ))}
                <span className="text-label-md font-semibold text-on-surface ml-1">{f.rating}</span>
              </div>
              <span className="text-label-sm text-on-surface-variant">{f.reviews} avis</span>
              <span className="ml-auto text-label-md font-semibold text-primary">{f.price}</span>
            </div>

            {/* Bio */}
            <div className="mb-6">
              <h2 className="text-label-md font-semibold text-on-surface mb-2">À propos</h2>
              <p className="text-body-sm text-on-surface/80 leading-relaxed">{f.bioLong}</p>
            </div>

            {/* Skills */}
            <div className="mb-6">
              <h2 className="text-label-md font-semibold text-on-surface mb-3">Compétences</h2>
              <div className="flex flex-wrap gap-2">
                {f.skills.map((skill) => (
                  <span key={skill} className="h-7 px-3 rounded-full bg-surface-container text-label-sm text-on-surface-variant font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="mb-6">
              <h2 className="text-label-md font-semibold text-on-surface mb-3">Services proposés</h2>
              <div className="space-y-3">
                {f.services.map((s) => (
                  <div key={s.name} className="flex items-center justify-between bg-surface-container rounded-2xl px-4 py-3">
                    <div>
                      <p className="text-body-sm font-medium text-on-surface">{s.name}</p>
                      <p className="text-label-sm text-on-surface-variant flex items-center gap-1 mt-0.5">
                        <span className="material-symbols-outlined text-[13px]">schedule</span>
                        {s.delay}
                      </p>
                    </div>
                    <span className="text-label-md font-semibold text-primary shrink-0 ml-3">{s.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="mb-8">
              <h2 className="text-label-md font-semibold text-on-surface mb-3">Avis clients</h2>
              <div className="space-y-3">
                {f.testimonials.map((t) => (
                  <div key={t.author} className="bg-surface-container rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary text-[11px] font-semibold">{t.author[0]}</span>
                      </div>
                      <span className="text-label-sm font-medium text-on-surface">{t.author}</span>
                      <div className="flex ml-auto">
                        {[...Array(t.rating)].map((_, i) => (
                          <span key={i} className="material-symbols-outlined icon-filled text-amber-400 text-[13px]">star</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-body-sm text-on-surface/70 italic">&ldquo;{t.text}&rdquo;</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA sticky-like */}
            <button className="w-full h-13 h-[52px] rounded-2xl bg-primary text-on-primary font-semibold text-label-md hover:opacity-90 active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[18px]">handshake</span>
              Engager {f.name.split(" ")[0]}
            </button>
          </div>
        </div>
      </main>

      <BottomNav role="client" />
    </div>
  );
}
