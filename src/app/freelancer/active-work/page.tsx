"use client";

import { useState } from "react";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import AmbientBlobs from "@/components/layout/AmbientBlobs";
import PillBadge from "@/components/ui/PillBadge";

const projects = [
  {
    id: "proj_001",
    title: "Identité de marque E-commerce",
    client: "Kofi M.",
    description: "Finalisation des guidelines visuelles et du système de logo pour le lancement.",
    timer: "04h 12m",
    progress: 75,
    deadline: "24 mai",
    status: "urgent",
    statusLabel: "Urgent",
    isActive: true,
  },
  {
    id: "proj_002",
    title: "Design UI App Bien-être",
    client: "Ngozi A.",
    description: "Création des prototypes haute-fidélité pour le tableau de bord de suivi patient.",
    timer: "23h 45m",
    progress: 45,
    deadline: "28 mai",
    status: "in_progress",
    statusLabel: "En cours",
    isActive: false,
  },
  {
    id: "proj_003",
    title: "Développement Site Portfolio",
    client: "Moussa T.",
    description: "Création d'un portfolio Next.js avec animations Framer Motion.",
    timer: "—",
    progress: 20,
    deadline: "2 juin",
    status: "pending",
    statusLabel: "Non démarré",
    isActive: false,
  },
  {
    id: "proj_004",
    title: "Set d'illustrations",
    client: "Fatou D.",
    description: "12 illustrations personnalisées pour une app éducative pour enfants.",
    timer: "—",
    progress: 10,
    deadline: "5 juin",
    status: "pending",
    statusLabel: "Non démarré",
    isActive: false,
  },
];

const badgeVariant: Record<string, "error" | "warning" | "primary" | "default"> = {
  urgent: "error",
  in_progress: "warning",
  pending: "default",
};

export default function ActiveWorkPage() {
  const [activeId, setActiveId] = useState<string | null>("proj_001");

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AmbientBlobs />
      <NavBar role="freelancer" />

      <main className="flex-grow pt-28 pb-28 md:pb-stack-lg">
        <div className="page-container">
          {/* Header */}
          <div className="mb-stack-lg animate-fade-in-up">
            <h1 className="text-headline-lg font-semibold text-on-surface mb-2">Charge de travail actuelle</h1>
            <p className="text-body-lg text-on-surface-variant max-w-2xl">
              Vous avez {projects.filter(p => p.isActive || p.status === "in_progress").length} jalons actifs aujourd&apos;hui.
              Concentrez-vous d&apos;abord sur le projet d&apos;identité de marque ; la date limite approche.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-gutter mb-stack-lg animate-fade-in-up delay-100">
            {[
              { value: "2 550 000 FCFA", label: "Gagné", icon: "payments" },
              { value: "98%", label: "Satisfaction", icon: "star" },
              { value: "12", label: "Livrés", icon: "check_circle" },
            ].map((s) => (
              <div key={s.label} className="card text-center">
                <span className="material-symbols-outlined text-primary text-[24px] mb-1">{s.icon}</span>
                <div className="text-headline-md font-semibold text-on-surface">{s.value}</div>
                <div className="text-label-md text-on-surface-variant">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Project cards */}
          <div className="space-y-4 animate-fade-in-up delay-200">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`card transition-all duration-300 ${
                  activeId === project.id ? "ring-2 ring-primary/30" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <PillBadge
                        label={project.statusLabel}
                        variant={badgeVariant[project.status] as "error" | "warning" | "default"}
                      />
                    </div>
                    <h3 className="text-headline-md font-medium text-on-surface">{project.title}</h3>
                    <p className="text-label-md text-on-surface-variant mt-1">
                      {project.client} · Due {project.deadline}
                    </p>
                    <p className="text-body-md text-on-surface-variant mt-2">{project.description}</p>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    {project.timer !== "—" && (
                      <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface-container-low">
                        <span className="material-symbols-outlined text-primary text-[16px]">timer</span>
                        <span className="text-headline-md font-semibold tabular-nums">{project.timer}</span>
                      </div>
                    )}
                    <button
                      onClick={() => setActiveId(activeId === project.id ? null : project.id)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-95 ${
                        activeId === project.id
                          ? "bg-secondary text-on-secondary"
                          : "bg-surface-container text-on-surface-variant"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {activeId === project.id ? "pause" : "play_arrow"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Progress */}
                <div className="mt-4">
                  <div className="flex justify-between text-label-md text-on-surface-variant mb-2">
                    <span>Progression</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-surface-container-high rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-700 ${
                        project.status === "urgent" ? "bg-error" : "bg-primary"
                      }`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                {/* Deliver button for active project */}
                {activeId === project.id && (
                  <div className="mt-4 pt-4 border-t border-surface-container/40">
                    <button className="btn-primary w-full gap-2">
                      <span className="material-symbols-outlined text-[20px]">upload</span>
                      Livrer le travail
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* FAB */}
      <button className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform z-40">
        <span className="material-symbols-outlined text-[24px]">add</span>
      </button>

      <BottomNav role="freelancer" />
      <Footer />
    </div>
  );
}
