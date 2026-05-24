"use client";

import { useState } from "react";
import NavBar from "@/components/layout/NavBar";
import BottomNav from "@/components/layout/BottomNav";
import AmbientBlobs from "@/components/layout/AmbientBlobs";
import PillBadge from "@/components/ui/PillBadge";

const categories = ["Tous", "Design", "Développement", "Marketing", "Rédaction", "Vidéo"];

const missions = [
  {
    id: "1",
    title: "Création d'identité visuelle pour startup fintech",
    category: "Design",
    budget: "80 000 FCFA",
    duration: "7 jours",
    client: "StartupHub Lagos",
    skills: ["Branding", "Figma", "Logo"],
    posted: "Il y a 2h",
  },
  {
    id: "2",
    title: "Développement d'une application mobile e-commerce",
    category: "Développement",
    budget: "350 000 FCFA",
    duration: "30 jours",
    client: "Afri-Shop",
    skills: ["Flutter", "Firebase", "UX"],
    posted: "Il y a 5h",
  },
  {
    id: "3",
    title: "Gestion réseaux sociaux — 3 mois",
    category: "Marketing",
    budget: "45 000 FCFA / mois",
    duration: "3 mois",
    client: "Beauté Naturelle CI",
    skills: ["Instagram", "Copywriting", "Canva"],
    posted: "Hier",
  },
  {
    id: "4",
    title: "Rédaction de 10 articles SEO",
    category: "Rédaction",
    budget: "30 000 FCFA",
    duration: "14 jours",
    client: "MediaAfrik",
    skills: ["SEO", "Français", "WordPress"],
    posted: "Hier",
  },
];

export default function FreelancerSearchPage() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [query, setQuery] = useState("");

  const filtered = missions.filter((m) => {
    const matchesCategory = activeCategory === "Tous" || m.category === activeCategory;
    const matchesQuery = m.title.toLowerCase().includes(query.toLowerCase()) ||
      m.skills.some((s) => s.toLowerCase().includes(query.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AmbientBlobs />
      <NavBar role="freelancer" />

      <main className="flex-grow pt-safe-nav-lg pb-28 md:pb-stack-lg">
        <div className="page-container max-w-[720px] mx-auto">

          <div className="mb-stack-md animate-fade-in-up">
            <h1 className="text-headline-lg font-semibold text-on-surface">Trouver une mission</h1>
            <p className="text-body-md text-on-surface-variant mt-1">Les meilleures opportunités du moment</p>
          </div>

          {/* Search input */}
          <div className="relative mb-gutter animate-fade-in-up delay-100">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Titre, compétence, mot-clé…"
              className="w-full h-12 pl-11 pr-4 rounded-2xl bg-surface-container border border-surface-container text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
          </div>

          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-stack-md animate-fade-in-up delay-150 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 h-9 px-4 rounded-full text-label-md font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-white"
                    : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results */}
          <div className="space-y-4 animate-fade-in-up delay-200">
            {filtered.map((mission) => (
              <div key={mission.id} className="card cursor-pointer hover:bg-surface-container/60 transition-colors">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <p className="text-body-md font-semibold text-on-surface leading-snug">{mission.title}</p>
                    <p className="text-label-md text-on-surface-variant mt-1">par {mission.client} · {mission.posted}</p>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant text-[20px] shrink-0 mt-0.5">bookmark_add</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {mission.skills.map((skill) => (
                    <PillBadge key={skill} label={skill} variant="primary" />
                  ))}
                </div>
                <div className="flex items-center gap-4 pt-3 border-t border-surface-container">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-[16px]">payments</span>
                    <span className="text-label-md font-semibold text-on-surface">{mission.budget}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-on-surface-variant text-[16px]">schedule</span>
                    <span className="text-label-md text-on-surface-variant">{mission.duration}</span>
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-16 text-on-surface-variant">
                <span className="material-symbols-outlined text-[48px] mb-4 block">search_off</span>
                <p className="text-body-md">Aucune mission trouvée</p>
              </div>
            )}
          </div>

        </div>
      </main>

      <BottomNav role="freelancer" />
    </div>
  );
}
