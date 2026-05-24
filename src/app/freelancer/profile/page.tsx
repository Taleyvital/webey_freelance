"use client";

import NavBar from "@/components/layout/NavBar";
import BottomNav from "@/components/layout/BottomNav";
import AmbientBlobs from "@/components/layout/AmbientBlobs";
import PillBadge from "@/components/ui/PillBadge";

const skills = ["UI/UX Design", "Brand Identity", "Figma", "Illustration", "Motion Design", "React", "Webflow"];

const portfolio = [
  { title: "Lumina Dashboard", category: "Design produit", color: "from-blue-50 to-indigo-100" },
  { title: "Core UI 2.0", category: "Système de design", color: "from-purple-50 to-violet-100" },
  { title: "Afri-Shop Brand", category: "Branding", color: "from-amber-50 to-orange-100" },
];

export default function FreelancerProfilePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AmbientBlobs />
      <NavBar role="freelancer" />

      <main className="flex-grow pt-28 pb-28 md:pb-stack-lg">
        <div className="page-container max-w-[720px] mx-auto">
          {/* Profile header */}
          <div className="card flex flex-col md:flex-row items-center md:items-start gap-8 mb-stack-lg animate-fade-in-up">
            <div className="w-24 h-24 rounded-full bg-surface-container flex items-center justify-center shrink-0 ring-4 ring-surface-container-low">
              <span className="material-symbols-outlined text-on-surface-variant text-[48px]">person</span>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-headline-lg font-semibold text-on-surface">Julian Vance</h1>
              <p className="text-body-md text-on-surface-variant mt-1">Designer UI/UX & Stratégiste de marque · Dakar, Sénégal</p>

              <div className="flex items-center justify-center md:justify-start gap-8 mt-gutter">
                {[
                  { label: "Note", value: "5.0", icon: "star" },
                  { label: "Commandes", value: "142", icon: "check_circle" },
                  { label: "Taux de fidélité", value: "99%", icon: "autorenew" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-headline-md font-semibold text-on-surface">{s.value}</p>
                    <p className="text-label-md text-on-surface-variant">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <button className="btn-secondary h-10 px-5 text-label-md shrink-0">
              Modifier le profil
            </button>
          </div>

          {/* About */}
          <div className="card mb-stack-md animate-fade-in-up delay-100">
            <h2 className="text-headline-md font-medium text-on-surface mb-4">À propos</h2>
            <p className="text-body-md text-on-surface-variant leading-relaxed">
              Je crée des expériences digitales premium pour des marques africaines ambitieuses. Plus de 5 ans d&apos;expérience
              en design UI/UX primé, identités de marque et motion design pour des startups
              à Lagos, Dakar et Nairobi. Je crois que le grand design est invisible — il fonctionne, c&apos;est tout.
            </p>
          </div>

          {/* Skills */}
          <div className="card mb-stack-md animate-fade-in-up delay-200">
            <h2 className="text-headline-md font-medium text-on-surface mb-4">Compétences</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <PillBadge key={skill} label={skill} variant="primary" />
              ))}
            </div>
          </div>

          {/* Portfolio */}
          <div className="animate-fade-in-up delay-300">
            <h2 className="text-headline-md font-medium text-on-surface mb-gutter">Travaux en vedette</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {portfolio.map((item) => (
                <div
                  key={item.title}
                  className={`rounded-xl bg-gradient-to-br ${item.color} p-6 aspect-square flex flex-col justify-between ambient-shadow hover:shadow-ambient-md transition-shadow cursor-pointer`}
                >
                  <PillBadge label={item.category} />
                  <div>
                    <h3 className="text-label-md font-semibold text-on-surface">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Availability toggle */}
          <div className="card mt-stack-md animate-fade-in-up delay-400 flex items-center justify-between">
            <div>
              <p className="text-body-md font-medium text-on-surface">Disponible pour de nouveaux projets</p>
              <p className="text-label-md text-on-surface-variant">Les clients peuvent vous envoyer des demandes</p>
            </div>
            <div className="w-12 h-6 rounded-full bg-primary relative cursor-pointer">
              <div className="w-5 h-5 rounded-full bg-white absolute top-0.5 right-0.5 shadow-sm transition-all" />
            </div>
          </div>
        </div>
      </main>

      <BottomNav role="freelancer" />
    </div>
  );
}
