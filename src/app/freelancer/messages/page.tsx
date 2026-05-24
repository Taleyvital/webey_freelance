"use client";

import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import AmbientBlobs from "@/components/layout/AmbientBlobs";

const conversations = [
  {
    id: "1",
    name: "Marie Traoré",
    role: "Cliente",
    lastMessage: "Pouvez-vous me livrer avant vendredi ?",
    time: "09:47",
    unread: 1,
    avatar: "M",
  },
  {
    id: "2",
    name: "Ibrahima Sow",
    role: "Client",
    lastMessage: "Parfait, je valide le rendu final !",
    time: "Hier",
    unread: 0,
    avatar: "I",
  },
  {
    id: "3",
    name: "Chioma Obi",
    role: "Cliente",
    lastMessage: "Merci pour les révisions, c'est exactement ça.",
    time: "Mar",
    unread: 0,
    avatar: "C",
  },
];

export default function FreelancerMessagesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AmbientBlobs />
      <NavBar role="freelancer" />

      <main className="flex-grow pt-28 pb-28 md:pb-stack-lg">
        <div className="page-container max-w-[720px] mx-auto">

          <div className="mb-stack-md animate-fade-in-up">
            <h1 className="text-headline-lg font-semibold text-on-surface">Messages</h1>
            <p className="text-body-md text-on-surface-variant mt-1">Vos conversations avec les clients</p>
          </div>

          {/* Search bar */}
          <div className="relative mb-gutter animate-fade-in-up delay-100">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
            <input
              type="text"
              placeholder="Rechercher une conversation…"
              className="w-full h-12 pl-11 pr-4 rounded-2xl bg-surface-container border border-surface-container text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
          </div>

          {/* Conversation list */}
          <div className="space-y-3 animate-fade-in-up delay-200">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                className="card flex items-center gap-4 cursor-pointer hover:bg-surface-container/60 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-primary text-label-md font-semibold">{conv.avatar}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-body-md font-semibold text-on-surface truncate">{conv.name}</p>
                    <span className="text-label-sm text-on-surface-variant shrink-0">{conv.time}</span>
                  </div>
                  <p className="text-label-md text-on-surface-variant">{conv.role}</p>
                  <p className="text-body-sm text-on-surface-variant truncate mt-0.5">{conv.lastMessage}</p>
                </div>

                {conv.unread > 0 && (
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <span className="text-white text-[11px] font-semibold">{conv.unread}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </main>

      <BottomNav role="freelancer" />
      <Footer />
    </div>
  );
}
