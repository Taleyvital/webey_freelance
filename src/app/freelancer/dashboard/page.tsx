"use client";

import Link from "next/link";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import AmbientBlobs from "@/components/layout/AmbientBlobs";
import PillBadge from "@/components/ui/PillBadge";

const incomingRequests = [
  {
    id: "req_001",
    service: "Design UI App Mobile",
    budget: "60 000 – 90 000 FCFA",
    deadline: "3 jours",
    category: "UI/UX",
    client: "Kofi M.",
  },
  {
    id: "req_002",
    service: "Site E-commerce",
    budget: "120 000 – 180 000 FCFA",
    deadline: "7 jours",
    category: "Développement",
    client: "Ngozi A.",
  },
  {
    id: "req_003",
    service: "Pack Identité de marque",
    budget: "45 000 – 75 000 FCFA",
    deadline: "5 jours",
    category: "Branding",
    client: "Moussa T.",
  },
];

export default function FreelancerDashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AmbientBlobs />
      <NavBar role="freelancer" />

      <main className="flex-grow pt-28 pb-28 md:pb-stack-lg">
        <div className="page-container">
          {/* Welcome */}
          <div className="mb-stack-lg animate-fade-in-up">
            <p className="text-label-md text-on-surface-variant mb-1">Bon retour</p>
            <h1 className="text-headline-lg font-semibold text-on-surface">Tableau de bord</h1>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-gutter mb-stack-lg animate-fade-in-up delay-100">
            {[
              { value: "2 550 000 FCFA", label: "Ce mois-ci", icon: "payments", accent: "text-primary" },
              { value: "98%", label: "Satisfaction", icon: "star", accent: "text-amber-500" },
              { value: "12", label: "Projets actifs", icon: "work", accent: "text-secondary" },
            ].map((s) => (
              <div key={s.label} className="card">
                <span className={`material-symbols-outlined ${s.accent} text-[24px] mb-2`}>{s.icon}</span>
                <div className="text-headline-lg font-semibold text-on-surface">{s.value}</div>
                <div className="text-label-md text-on-surface-variant">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Incoming requests */}
          <div className="animate-fade-in-up delay-200">
            <div className="flex items-center justify-between mb-gutter">
              <h2 className="text-headline-md font-medium text-on-surface">Nouvelles demandes</h2>
              <span className="text-label-md text-on-surface-variant">{incomingRequests.length} nouvelles</span>
            </div>

            <div className="space-y-4">
              {incomingRequests.map((req) => (
                <div key={req.id} className="card hover:shadow-ambient-md transition-shadow cursor-pointer group">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="mb-1">
                        <PillBadge label={req.category} />
                      </div>
                      <h3 className="text-body-lg font-medium text-on-surface mt-2">{req.service}</h3>
                      <p className="text-label-md text-on-surface-variant mt-1">
                        de {req.client} · Sous {req.deadline}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-body-md font-semibold text-on-surface">{req.budget}</p>
                      <span className="material-symbols-outlined text-primary text-[20px] mt-2 group-hover:translate-x-1 transition-transform inline-block">
                        arrow_forward
                      </span>
                    </div>
                  </div>

                  {/* Accept/decline */}
                  <div className="flex gap-3 mt-4 pt-4 border-t border-surface-container/40">
                    <button className="btn-primary h-10 px-5 text-label-md flex-1">
                      Accepter
                    </button>
                    <button className="btn-secondary h-10 px-5 text-label-md">
                      Décliner
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-2 gap-gutter mt-stack-lg animate-fade-in-up delay-300">
            <Link href="/freelancer/active-work" className="card hover:shadow-ambient-md transition-shadow flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-[24px]">task_alt</span>
              </div>
              <div>
                <p className="text-body-md font-medium text-on-surface">Travaux en cours</p>
                <p className="text-label-md text-on-surface-variant">4 jalons</p>
              </div>
            </Link>
            <Link href="/freelancer/earnings" className="card hover:shadow-ambient-md transition-shadow flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-secondary text-[24px]">account_balance_wallet</span>
              </div>
              <div>
                <p className="text-body-md font-medium text-on-surface">Revenus</p>
                <p className="text-label-md text-on-surface-variant">25 700 000 FCFA au total</p>
              </div>
            </Link>
          </div>
        </div>
      </main>

      <BottomNav role="freelancer" />
      <Footer />
    </div>
  );
}
