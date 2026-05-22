import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Webey — Digital Services for Africa",
  description: "Premium digital services platform. Tell us what you need, and everything happens smoothly.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
