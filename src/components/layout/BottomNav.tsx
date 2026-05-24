"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface BottomNavProps {
  role: "client" | "freelancer";
}

const clientNav = [
  { href: "/client/dashboard", icon: "home", label: "Accueil" },
  { href: "/client/messages", icon: "mail", label: "Messages" },
  { href: "/client/search", icon: "search", label: "Recherche" },
  { href: "/client/orders", icon: "orders", label: "Commandes" },
];

const freelancerNav = [
  { href: "/freelancer/dashboard", icon: "home", label: "Accueil" },
  { href: "/freelancer/messages", icon: "mail", label: "Messages" },
  { href: "/freelancer/search", icon: "search", label: "Recherche" },
  { href: "/freelancer/active-work", icon: "orders", label: "Travaux" },
];

const iconMap: Record<string, string> = {
  home: "home",
  mail: "mail",
  search: "search",
  orders: "order_approve",
};

export default function BottomNav({ role }: BottomNavProps) {
  const pathname = usePathname();
  const links = role === "client" ? clientNav : freelancerNav;
  const profileHref = role === "client" ? "/client/profile" : "/freelancer/profile";

  return (
    <nav className="fixed bottom-6 left-0 right-0 z-50 flex items-center justify-center gap-3 px-6 md:hidden">
      {/* Main pill */}
      <div className="relative flex items-center gap-1 px-5 py-3 rounded-full bottom-nav-glass overflow-hidden">
        {/* Noise texture overlay */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "120px",
          }}
        />
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-label={link.label}
              className={`relative w-11 h-11 flex items-center justify-center rounded-full transition-all duration-200 ${
                active
                  ? "bg-white/30 text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
                  : "text-on-surface/80 hover:text-primary hover:bg-white/20"
              }`}
            >
              <span className={`material-symbols-outlined text-[24px] ${active ? "icon-filled" : ""}`}>
                {iconMap[link.icon]}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Profile pill */}
      <Link
        href={profileHref}
        aria-label="Profil"
        className={`relative w-14 h-14 flex items-center justify-center rounded-full bottom-nav-glass overflow-hidden transition-all duration-200 ${
          pathname === profileHref ? "text-primary" : "text-on-surface/80"
        }`}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-full opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "120px",
          }}
        />
        <span className={`material-symbols-outlined text-[26px] ${pathname === profileHref ? "icon-filled" : ""}`}>
          account_circle
        </span>
      </Link>
    </nav>
  );
}
