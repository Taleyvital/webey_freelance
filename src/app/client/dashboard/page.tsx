"use client";

import { useState } from "react";
import Link from "next/link";
import NavBar from "@/components/layout/NavBar";
import BottomNav from "@/components/layout/BottomNav";
import AmbientBlobs from "@/components/layout/AmbientBlobs";
import { freelancers } from "@/lib/freelancers";

const categories = [
  { label: "Tous", icon: "grid_view", color: "from-slate-400 to-slate-600" },
  { label: "Design", icon: "palette", color: "from-violet-400 to-purple-600" },
  { label: "Dev", icon: "code", color: "from-emerald-400 to-teal-600" },
  { label: "Marketing", icon: "trending_up", color: "from-amber-400 to-orange-500" },
  { label: "Vidéo", icon: "videocam", color: "from-rose-400 to-pink-600" },
  { label: "Rédaction", icon: "edit_note", color: "from-sky-400 to-blue-600" },
  { label: "Mobile", icon: "smartphone", color: "from-indigo-400 to-blue-600" },
  { label: "SEO", icon: "search", color: "from-lime-400 to-green-600" },
];

export default function ClientDashboard() {
  const [activeCategory, setActiveCategory] = useState("Tous");

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AmbientBlobs />
      <NavBar role="client" />

      <main className="flex-grow pt-24 pb-32">
        {/* Category carousel */}
        <div className="max-w-[480px] mx-auto pt-4 mb-6 animate-fade-in-up">
          <div className="flex gap-3 overflow-x-auto px-4 pb-1 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(cat.label)}
                className={`flex flex-col items-center gap-1.5 shrink-0 transition-all duration-200 ${
                  activeCategory === cat.label ? "opacity-100 scale-105" : "opacity-60"
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-sm`}>
                  <span className="material-symbols-outlined text-white text-[24px]">{cat.icon}</span>
                </div>
                <span className={`text-[11px] font-medium ${activeCategory === cat.label ? "text-on-surface" : "text-on-surface-variant"}`}>
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-[480px] mx-auto px-4 space-y-6">
          {freelancers.map((f, i) => (
            <div
              key={f.id}
              className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.07)] animate-fade-in-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Portfolio strip — cliquable */}
              <Link href={`/client/freelancer/${f.id}`} className="grid grid-cols-3 h-28 block">
                {f.portfolio.map((p) => (
                  <div
                    key={p.label}
                    className={`bg-gradient-to-br ${p.color} flex items-end p-2`}
                  >
                    <span className="text-[10px] font-medium text-on-surface/60">{p.label}</span>
                  </div>
                ))}
              </Link>

              <div className="px-5 pt-1 pb-5">
                {/* Avatar + identity — cliquable */}
                <Link href={`/client/freelancer/${f.id}`} className="flex items-end gap-3 -mt-8 mb-4 block">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${f.avatarColor} flex items-center justify-center ring-4 ring-white shrink-0`}>
                    <span className="text-white font-bold text-label-md">{f.avatar}</span>
                  </div>
                  <div className="mb-1">
                    <div className="flex items-center gap-2">
                      <p className="text-body-md font-semibold text-on-surface leading-tight">{f.name}</p>
                      {f.available && (
                        <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                      )}
                    </div>
                    <p className="text-label-sm text-on-surface-variant">{f.title} · {f.location}</p>
                  </div>
                </Link>

                {/* Bio */}
                <p className="text-body-sm text-on-surface/80 leading-relaxed mb-4">{f.bio}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {f.skills.map((skill) => (
                    <span
                      key={skill}
                      className="h-7 px-3 rounded-full bg-surface-container text-label-sm text-on-surface-variant font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Rating + price */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1.5">
                    <div className="flex">
                      {[...Array(5)].map((_, j) => (
                        <span key={j} className="material-symbols-outlined icon-filled text-amber-400 text-[14px]">star</span>
                      ))}
                    </div>
                    <span className="text-label-md font-semibold text-on-surface">{f.rating}</span>
                    <span className="text-label-sm text-on-surface-variant">({f.reviews} avis)</span>
                  </div>
                  <span className="text-label-sm font-medium text-primary">{f.price}</span>
                </div>

                {/* CTA */}
                <Link
                  href={`/client/freelancer/${f.id}`}
                  className="w-full h-12 rounded-2xl bg-primary text-on-primary font-semibold text-label-md hover:opacity-90 active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">handshake</span>
                  Engager
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <BottomNav role="client" />
    </div>
  );
}
