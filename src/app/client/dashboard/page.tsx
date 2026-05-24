"use client";

import Link from "next/link";
import NavBar from "@/components/layout/NavBar";
import BottomNav from "@/components/layout/BottomNav";
import AmbientBlobs from "@/components/layout/AmbientBlobs";
import PillBadge from "@/components/ui/PillBadge";

const recentOrders = [
  {
    id: "ord_001",
    service: "Création de logo",
    freelancer: "Amara K.",
    status: "in_progress",
    statusLabel: "En cours",
    price: "25 000 FCFA",
    dueDate: "24 mai",
  },
  {
    id: "ord_002",
    service: "Développement Landing Page",
    freelancer: "Segun A.",
    status: "review",
    statusLabel: "En révision",
    price: "85 000 FCFA",
    dueDate: "26 mai",
  },
  {
    id: "ord_003",
    service: "Pack Réseaux Sociaux",
    freelancer: "Fatou D.",
    status: "success",
    statusLabel: "Livré",
    price: "15 000 FCFA",
    dueDate: "20 mai",
  },
];

const badgeVariant: Record<string, "warning" | "primary" | "success"> = {
  in_progress: "warning",
  review: "primary",
  success: "success",
};

export default function ClientDashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AmbientBlobs />
      <NavBar role="client" />

      <main className="flex-grow pt-28 pb-28 md:pb-stack-lg">
        <div className="page-container">
          {/* Welcome + CTA */}
          <div className="mb-stack-lg animate-fade-in-up">
            <p className="text-label-md text-on-surface-variant mb-1">Bonjour</p>
            <h1 className="text-headline-lg font-semibold text-on-surface mb-gutter">
              De quoi avez-vous besoin aujourd&apos;hui ?
            </h1>
            <Link
              href="/client/request"
              className="btn-primary inline-flex gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
              Nouvelle demande
            </Link>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter mb-stack-lg animate-fade-in-up delay-100">
            {[
              { label: "Commandes actives", value: "2", icon: "work" },
              { label: "Livrées", value: "12", icon: "check_circle" },
              { label: "Dépensé", value: "340K FCFA", icon: "payments" },
              { label: "Note moyenne", value: "4.9", icon: "star" },
            ].map((stat) => (
              <div key={stat.label} className="card">
                <span className="material-symbols-outlined text-primary text-[24px] mb-2">{stat.icon}</span>
                <div className="text-headline-md font-semibold text-on-surface">{stat.value}</div>
                <div className="text-label-md text-on-surface-variant">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Recent orders */}
          <div className="animate-fade-in-up delay-200">
            <div className="flex items-center justify-between mb-gutter">
              <h2 className="text-headline-md font-medium text-on-surface">Commandes récentes</h2>
              <Link href="/client/orders" className="text-label-md text-primary hover:underline">
                Voir tout
              </Link>
            </div>

            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="card flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-body-md font-medium text-on-surface truncate">{order.service}</p>
                    <p className="text-label-md text-on-surface-variant mt-1">
                      par {order.freelancer} · Rendu le {order.dueDate}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <PillBadge label={order.statusLabel} variant={badgeVariant[order.status]} />
                    <span className="text-label-md font-medium text-on-surface hidden md:block">
                      {order.price}
                    </span>
                    <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                      chevron_right
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <BottomNav role="client" />
    </div>
  );
}
