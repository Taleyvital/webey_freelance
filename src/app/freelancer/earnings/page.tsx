"use client";

import NavBar from "@/components/layout/NavBar";
import BottomNav from "@/components/layout/BottomNav";
import AmbientBlobs from "@/components/layout/AmbientBlobs";

const payments = [
  { id: "pay_001", project: "Identité de marque E-commerce", client: "Kofi M.", amount: "720 000 FCFA", date: "20 mai 2025", type: "completed" },
  { id: "pay_002", project: "Design UI App Bien-être", client: "Ngozi A.", amount: "1 680 000 FCFA", date: "15 mai 2025", type: "completed" },
  { id: "pay_003", project: "Site Portfolio", client: "Moussa T.", amount: "570 000 FCFA", date: "10 mai 2025", type: "completed" },
  { id: "pay_004", project: "Set d'illustrations", client: "Fatou D.", amount: "360 000 FCFA", date: "5 mai 2025", type: "completed" },
  { id: "pay_005", project: "UI App Mobile", client: "Amadou B.", amount: "1 080 000 FCFA", date: "28 avr. 2025", type: "completed" },
];

export default function EarningsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AmbientBlobs />
      <NavBar role="freelancer" />

      <main className="flex-grow pt-safe-nav-lg pb-28 md:pb-stack-lg">
        <div className="page-container">
          {/* Hero earnings */}
          <div className="text-center mb-stack-lg animate-fade-in-up">
            <p className="text-label-md text-on-surface-variant mb-2">Total gagné</p>
            <h1 className="text-display-lg-mobile md:text-display-lg font-semibold text-primary tracking-tight">
              25 700 000 FCFA
            </h1>
            <p className="text-body-md text-on-surface-variant mt-2">
              Revenus totaux sur tous les projets
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-stack-lg animate-fade-in-up delay-100">
            {[
              { label: "Ce mois-ci", value: "7 440 000 FCFA", icon: "calendar_month", note: "+18% vs mois dernier" },
              { label: "Cette semaine", value: "1 890 000 FCFA", icon: "today", note: "3 paiements" },
              { label: "Commandes terminées", value: "142", icon: "check_circle", note: "Depuis toujours" },
            ].map((s) => (
              <div key={s.label} className="card">
                <span className="material-symbols-outlined text-primary text-[24px] mb-2">{s.icon}</span>
                <div className="text-headline-md font-semibold text-on-surface mb-1">{s.value}</div>
                <div className="text-label-md text-on-surface-variant">{s.label}</div>
                <div className="text-label-md text-green-600 mt-1">{s.note}</div>
              </div>
            ))}
          </div>

          {/* Withdraw CTA */}
          <div className="card mb-stack-lg bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10 animate-fade-in-up delay-200">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-headline-md font-medium text-on-surface">Disponible au retrait</h3>
                <p className="text-display-lg-mobile font-semibold text-primary mt-1">5 040 000 FCFA</p>
                <p className="text-label-md text-on-surface-variant mt-1">Généralement instantané · Sans frais</p>
              </div>
              <button className="btn-primary gap-2 shrink-0">
                <span className="material-symbols-outlined text-[20px]">account_balance</span>
                Retirer
              </button>
            </div>
          </div>

          {/* Growth message */}
          <div className="text-center mb-stack-lg animate-fade-in-up delay-300">
            <h2 className="text-headline-lg font-semibold text-on-surface mb-2">
              Votre croissance est exponentielle.
            </h2>
            <p className="text-body-md text-on-surface-variant">
              Continuez à livrer un travail exceptionnel pour débloquer les avantages premium.
            </p>
          </div>

          {/* Recent payments */}
          <div className="animate-fade-in-up delay-300">
            <h2 className="text-headline-md font-medium text-on-surface mb-gutter">Paiements récents</h2>
            <div className="space-y-3">
              {payments.map((p) => (
                <div key={p.id} className="card flex items-center justify-between gap-4 py-4">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined icon-filled text-green-600 text-[18px]">check_circle</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-body-md font-medium text-on-surface truncate">{p.project}</p>
                    <p className="text-label-md text-on-surface-variant">{p.client} · {p.date}</p>
                  </div>
                  <span className="text-body-md font-semibold text-on-surface shrink-0">{p.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <BottomNav role="freelancer" />
    </div>
  );
}
