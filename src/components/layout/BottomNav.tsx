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
      <div className="flex items-center gap-1 px-5 py-3 rounded-full bottom-nav-glass">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-label={link.label}
              className={`w-11 h-11 flex items-center justify-center rounded-full transition-all ${
                active
                  ? "bg-primary/10 text-primary"
                  : "text-on-surface hover:text-primary"
              }`}
            >
              <span className="material-symbols-outlined text-[24px]">
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
        className={`w-14 h-14 flex items-center justify-center rounded-full bottom-nav-glass transition-all ${
          pathname === profileHref ? "text-primary" : "text-on-surface"
        }`}
      >
        <span className="material-symbols-outlined text-[26px]">account_circle</span>
      </Link>
    </nav>
  );
}
