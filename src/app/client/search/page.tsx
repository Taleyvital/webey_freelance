"use client";

import { useState } from "react";
import NavBar from "@/components/layout/NavBar";
import BottomNav from "@/components/layout/BottomNav";
import AmbientBlobs from "@/components/layout/AmbientBlobs";
import PillBadge from "@/components/ui/PillBadge";

const categories = ["Tous", "Design", "Développement", "Marketing", "Rédaction", "Vidéo"];

const freelancers = [
  {
    id: "1",
    name: "Amara Koné",
    title: "Designer UI/UX · Abidjan",
    skills: ["Figma", "Branding", "Illustration"],
    rating: "5.0",
    orders: 142,
    price: "À partir de 15 000 FCFA",
  },
  {
    id: "2",
    name: "Segun Adeyemi",
    title: "Développeur Frontend · Lagos",
    skills: ["React", "Next.js", "TailwindCSS"],
    rating: "4.9",
    orders: 87,
    price: "À partir de 40 000 FCFA",
  },
  {
    id: "3",
    name: "Fatou Diallo",
    title: "Social Media Manager · Dakar",
    skills: ["Instagram", "Canva", "Copywriting"],
    rating: "4.8",
    orders: 210,
    price: "À partir de 10 000 FCFA",
  },
  {
    id: "4",
    name: "Kwame Asante",
    title: "Développeur Mobile · Accra",
    skills: ["Flutter", "React Native", "Firebase"],
    rating: "5.0",
    orders: 63,
    price: "À partir de 60 000 FCFA",
  },
];

export default function ClientSearchPage() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [query, setQuery] = useState("");

  const filtered = freelancers.filter((f) => {
    const matchesQuery = f.name.toLowerCase().includes(query.toLowerCase()) ||
      f.title.toLowerCase().includes(query.toLowerCase()) ||
      f.skills.some((s) => s.toLowerCase().includes(query.toLowerCase()));
    return matchesQuery;
  });

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AmbientBlobs />
      <NavBar role="client" />

      <main className="flex-grow pt-safe-nav-lg pb-28 md:pb-stack-lg">
        <div className="page-container max-w-[720px] mx-auto">

          <div className="mb-stack-md animate-fade-in-up">
            <h1 className="text-headline-lg font-semibold text-on-surface">Trouver un freelancer</h1>
            <p className="text-body-md text-on-surface-variant mt-1">Les meilleurs talents africains</p>
          </div>

          {/* Search input */}
          <div className="relative mb-gutter animate-fade-in-up delay-100">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Design, développement, marketing…"
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
            {filtered.map((freelancer) => (
              <div key={freelancer.id} className="card flex items-start gap-4 cursor-pointer hover:bg-surface-container/60 transition-colors">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-primary text-label-md font-semibold">{freelancer.name[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-body-md font-semibold text-on-surface">{freelancer.name}</p>
                      <p className="text-label-md text-on-surface-variant">{freelancer.title}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <span className="material-symbols-outlined text-amber-400 text-[16px]">star</span>
                      <span className="text-label-md font-medium text-on-surface">{freelancer.rating}</span>
                      <span className="text-label-sm text-on-surface-variant">({freelancer.orders})</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {freelancer.skills.map((skill) => (
                      <PillBadge key={skill} label={skill} variant="primary" />
                    ))}
                  </div>
                  <p className="text-label-md text-primary font-medium mt-3">{freelancer.price}</p>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-16 text-on-surface-variant">
                <span className="material-symbols-outlined text-[48px] mb-4 block">search_off</span>
                <p className="text-body-md">Aucun freelancer trouvé</p>
              </div>
            )}
          </div>

        </div>
      </main>

      <BottomNav role="client" />
    </div>
  );
}
