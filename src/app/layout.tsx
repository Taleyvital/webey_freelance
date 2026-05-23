import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Webey — Digital Services for Africa",
  description: "Premium digital services platform. Tell us what you need, and everything happens smoothly.",
  icons: {
    icon: "/webey-black.jpeg",
    shortcut: "/webey-black.jpeg",
    apple: "/webey-black.jpeg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
