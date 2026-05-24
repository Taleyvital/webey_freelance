"use client";

import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import AmbientBlobs from "@/components/layout/AmbientBlobs";
import PillBadge from "@/components/ui/PillBadge";

const orders = [
  {
    id: "ord_001",
    service: "Création de logo",
    freelancer: "Amara K.",
    status: "in_progress",
    statusLabel: "En cours",
    price: "25 000 FCFA",
    progress: 60,
    dueDate: "24 mai 2025",
    category: "Branding",
  },
  {
    id: "ord_002",
    service: "Développement Landing Page",
    freelancer: "Segun A.",
    status: "review",
    statusLabel: "En révision",
    price: "85 000 FCFA",
    progress: 90,
    dueDate: "26 mai 2025",
    category: "Développement",
  },
  {
    id: "ord_003",
    service: "Pack Réseaux Sociaux",
    freelancer: "Fatou D.",
    status: "success",
    statusLabel: "Livré",
    price: "15 000 FCFA",
    progress: 100,
    dueDate: "20 mai 2025",
    category: "Design",
  },
];

const badgeVariant: Record<string, "warning" | "primary" | "success"> = {
  in_progress: "warning",
  review: "primary",
  success: "success",
};

export default function OrdersPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AmbientBlobs />
      <NavBar role="client" />

      <main className="flex-grow pt-28 pb-28 md:pb-stack-lg">
        <div className="page-container">
          <div className="mb-stack-lg animate-fade-in-up">
            <h1 className="text-headline-lg font-semibold text-on-surface mb-2">Vos commandes</h1>
            <p className="text-body-md text-on-surface-variant">Suivez chaque service en temps réel.</p>
          </div>

          <div className="space-y-4 animate-fade-in-up delay-100">
            {orders.map((order) => (
              <div key={order.id} className="card">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <PillBadge label={order.category} />
                    </div>
                    <h3 className="text-body-lg font-medium text-on-surface">{order.service}</h3>
                    <p className="text-label-md text-on-surface-variant mt-1">
                      par {order.freelancer} · Livraison le {order.dueDate}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <PillBadge label={order.statusLabel} variant={badgeVariant[order.status]} />
                    <p className="text-label-md font-medium text-on-surface mt-2">{order.price}</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-surface-container-high rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-700 ${
                      order.progress === 100
                        ? "bg-green-500"
                        : order.status === "review"
                        ? "bg-primary"
                        : "bg-amber-400"
                    }`}
                    style={{ width: `${order.progress}%` }}
                  />
                </div>
                <p className="text-label-md text-on-surface-variant mt-2">{order.progress}% terminé</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomNav role="client" />
      <Footer />
    </div>
  );
}
