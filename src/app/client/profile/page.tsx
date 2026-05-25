"use client";

import Link from "next/link";
import NavBar from "@/components/layout/NavBar";
import BottomNav from "@/components/layout/BottomNav";
import AmbientBlobs from "@/components/layout/AmbientBlobs";

const stats = [
  { label: "Commandes actives", value: "2", icon: "work" },
  { label: "Commandes livrées", value: "12", icon: "check_circle" },
  { label: "Total dépensé", value: "340K FCFA", icon: "payments" },
  { label: "Note moyenne donnée", value: "4.9", icon: "star" },
];

export default function ClientProfilePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AmbientBlobs />
      <NavBar role="client" />

      <main className="flex-grow pt-safe-nav-lg pb-28 md:pb-stack-lg">
        <div className="page-container max-w-[720px] mx-auto">

          {/* Profile header */}
          <div className="card flex flex-col md:flex-row items-center md:items-start gap-8 mb-stack-lg animate-fade-in-up">
            <div className="w-24 h-24 rounded-full bg-surface-container flex items-center justify-center shrink-0 ring-4 ring-surface-container-low">
              <span className="material-symbols-outlined text-on-surface-variant text-[48px]">person</span>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-headline-lg font-semibold text-on-surface">Mon profil</h1>
              <p className="text-body-md text-on-surface-variant mt-1">Client · Membre depuis 2024</p>

              <div className="flex items-center justify-center md:justify-start gap-8 mt-gutter">
                {[
                  { label: "Commandes", value: "14", icon: "shopping_bag" },
                  { label: "Freelancers", value: "8", icon: "group" },
                  { label: "Satisfaction", value: "100%", icon: "thumb_up" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-headline-md font-semibold text-on-surface">{s.value}</p>
                    <p className="text-label-md text-on-surface-variant">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              <button className="btn-secondary h-10 px-5 text-label-md">
                Modifier
              </button>
              <Link
                href="/onboarding"
                className="btn-primary h-10 px-5 text-label-md flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">edit_note</span>
                Compléter mon profil
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-gutter mb-stack-md animate-fade-in-up delay-100">
            {stats.map((stat) => (
              <div key={stat.label} className="card">
                <span className="material-symbols-outlined text-primary text-[24px] mb-2">{stat.icon}</span>
                <div className="text-headline-md font-semibold text-on-surface">{stat.value}</div>
                <div className="text-label-md text-on-surface-variant">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Informations */}
          <div className="card mb-stack-md animate-fade-in-up delay-200">
            <h2 className="text-headline-md font-medium text-on-surface mb-4">Informations</h2>
            <div className="space-y-4">
              {[
                { label: "Nom complet", value: "—", icon: "badge" },
                { label: "Email", value: "—", icon: "email" },
                { label: "Pays", value: "—", icon: "public" },
                { label: "Entreprise", value: "—", icon: "business" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-on-surface-variant text-[20px] shrink-0">{item.icon}</span>
                  <div className="flex-1">
                    <p className="text-label-md text-on-surface-variant">{item.label}</p>
                    <p className="text-body-md text-on-surface">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Danger zone */}
          <div className="card animate-fade-in-up delay-300 border border-error/20">
            <h2 className="text-headline-md font-medium text-error mb-2">Zone de danger</h2>
            <p className="text-body-md text-on-surface-variant mb-4">
              La suppression de votre compte est irréversible. Toutes vos données seront perdues.
            </p>
            <button className="h-10 px-5 rounded-xl border border-error text-error text-label-md font-medium hover:bg-error/10 transition-colors">
              Supprimer mon compte
            </button>
          </div>

        </div>
      </main>

      <BottomNav role="client" />
    </div>
  );
}
