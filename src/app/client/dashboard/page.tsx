"use client";

import Link from "next/link";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import AmbientBlobs from "@/components/layout/AmbientBlobs";
import PillBadge from "@/components/ui/PillBadge";

const recentOrders = [
  {
    id: "ord_001",
    service: "Logo Design",
    freelancer: "Amara K.",
    status: "in_progress",
    statusLabel: "In Progress",
    price: "25,000 FCFA",
    dueDate: "May 24",
  },
  {
    id: "ord_002",
    service: "Landing Page Dev",
    freelancer: "Segun A.",
    status: "review",
    statusLabel: "In Review",
    price: "85,000 FCFA",
    dueDate: "May 26",
  },
  {
    id: "ord_003",
    service: "Social Media Pack",
    freelancer: "Fatou D.",
    status: "success",
    statusLabel: "Delivered",
    price: "15,000 FCFA",
    dueDate: "May 20",
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

      <main className="flex-grow pt-28 pb-stack-lg">
        <div className="page-container">
          {/* Welcome + CTA */}
          <div className="mb-stack-lg animate-fade-in-up">
            <p className="text-label-md text-on-surface-variant mb-1">Good morning</p>
            <h1 className="text-headline-lg font-semibold text-on-surface mb-gutter">
              What do you need today?
            </h1>
            <Link
              href="/client/request"
              className="btn-primary inline-flex gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
              New Request
            </Link>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter mb-stack-lg animate-fade-in-up delay-100">
            {[
              { label: "Active Orders", value: "2", icon: "work" },
              { label: "Delivered", value: "12", icon: "check_circle" },
              { label: "Spent", value: "340K FCFA", icon: "payments" },
              { label: "Avg. Rating", value: "4.9", icon: "star" },
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
              <h2 className="text-headline-md font-medium text-on-surface">Recent Orders</h2>
              <Link href="/client/orders" className="text-label-md text-primary hover:underline">
                View all
              </Link>
            </div>

            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="card flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-body-md font-medium text-on-surface truncate">{order.service}</p>
                    <p className="text-label-md text-on-surface-variant mt-1">
                      by {order.freelancer} · Due {order.dueDate}
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

      <Footer />
    </div>
  );
}
