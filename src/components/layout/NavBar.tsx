"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface NavBarProps {
  role?: "client" | "freelancer" | null;
}

const freelancerLinks = [
  { href: "/freelancer/dashboard", label: "Dashboard" },
  { href: "/freelancer/active-work", label: "Work" },
  { href: "/freelancer/earnings", label: "Earnings" },
];

const clientLinks = [
  { href: "/client/dashboard", label: "Dashboard" },
  { href: "/client/request", label: "New Request" },
  { href: "/client/orders", label: "Orders" },
];

export default function NavBar({ role }: NavBarProps) {
  const pathname = usePathname();
  const links = role === "freelancer" ? freelancerLinks : role === "client" ? clientLinks : [];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-surface-container/40">
      <div className="flex items-center justify-between h-20 w-full max-w-container mx-auto px-6 md:px-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 relative">
            <Image
              src="/logo-webey.svg"
              alt="Webey"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-headline-md font-semibold text-primary tracking-tighter">
            Webey
          </span>
        </Link>

        {/* Nav links */}
        {links.length > 0 && (
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-label-md font-medium transition-opacity hover:opacity-80 ${
                  pathname === link.href ? "text-primary" : "text-on-surface-variant"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Profile avatar placeholder */}
        {role && (
          <Link
            href={role === "freelancer" ? "/freelancer/profile" : "/client/dashboard"}
            className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center overflow-hidden hover:ring-2 hover:ring-primary/30 transition-all"
          >
            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
              person
            </span>
          </Link>
        )}
      </div>
    </header>
  );
}
