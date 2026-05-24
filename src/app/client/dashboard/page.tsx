"use client";

import NavBar from "@/components/layout/NavBar";
import BottomNav from "@/components/layout/BottomNav";
import AmbientBlobs from "@/components/layout/AmbientBlobs";

const freelancers = [
  {
    id: "1",
    name: "Amara Koné",
    title: "Designer UI/UX",
    location: "Abidjan, Côte d'Ivoire",
    avatar: "AK",
    avatarColor: "from-violet-400 to-purple-600",
    bio: "Je crée des interfaces qui convertissent. 5 ans d'expérience pour des startups africaines primées. Chaque pixel a une intention.",
    skills: ["Figma", "Branding", "Motion"],
    rating: 5.0,
    reviews: 142,
    price: "À partir de 15 000 FCFA",
    available: true,
    portfolio: [
      { color: "from-violet-100 to-purple-200", label: "App Fintech" },
      { color: "from-blue-100 to-indigo-200", label: "Dashboard" },
      { color: "from-pink-100 to-rose-200", label: "Branding" },
    ],
  },
  {
    id: "2",
    name: "Segun Adeyemi",
    title: "Développeur Full-Stack",
    location: "Lagos, Nigeria",
    avatar: "SA",
    avatarColor: "from-emerald-400 to-teal-600",
    bio: "React, Next.js, Node. Je transforme vos idées en produits digitaux robustes. Livraison rapide, code propre, zéro compromis.",
    skills: ["React", "Next.js", "Supabase"],
    rating: 4.9,
    reviews: 87,
    price: "À partir de 40 000 FCFA",
    available: true,
    portfolio: [
      { color: "from-emerald-100 to-teal-200", label: "E-commerce" },
      { color: "from-cyan-100 to-sky-200", label: "SaaS" },
      { color: "from-green-100 to-lime-200", label: "API REST" },
    ],
  },
  {
    id: "3",
    name: "Fatou Diallo",
    title: "Social Media Manager",
    location: "Dakar, Sénégal",
    avatar: "FD",
    avatarColor: "from-amber-400 to-orange-500",
    bio: "Votre marque mérite d'être vue. Je crée du contenu qui engage, des stratégies qui font grandir, des communautés qui restent.",
    skills: ["Instagram", "TikTok", "Copywriting"],
    rating: 4.8,
    reviews: 210,
    price: "À partir de 10 000 FCFA",
    available: false,
    portfolio: [
      { color: "from-amber-100 to-orange-200", label: "Campagne" },
      { color: "from-yellow-100 to-amber-200", label: "Reels" },
      { color: "from-rose-100 to-pink-200", label: "Strategy" },
    ],
  },
  {
    id: "4",
    name: "Kwame Asante",
    title: "Développeur Mobile",
    location: "Accra, Ghana",
    avatar: "KA",
    avatarColor: "from-sky-400 to-blue-600",
    bio: "Flutter & React Native. Des apps mobiles natives, performantes, belles. De l'idée à l'App Store en un temps record.",
    skills: ["Flutter", "Firebase", "iOS/Android"],
    rating: 5.0,
    reviews: 63,
    price: "À partir de 60 000 FCFA",
    available: true,
    portfolio: [
      { color: "from-sky-100 to-blue-200", label: "App iOS" },
      { color: "from-indigo-100 to-violet-200", label: "App Android" },
      { color: "from-blue-100 to-cyan-200", label: "MVP" },
    ],
  },
  {
    id: "5",
    name: "Aïcha Touré",
    title: "Rédactrice & Copywriter",
    location: "Bamako, Mali",
    avatar: "AT",
    avatarColor: "from-rose-400 to-pink-600",
    bio: "Les mots vendent. Je rédige des contenus SEO, landing pages et newsletters qui transforment les visiteurs en clients.",
    skills: ["SEO", "Blog", "Newsletter"],
    rating: 4.9,
    reviews: 178,
    price: "À partir de 8 000 FCFA",
    available: true,
    portfolio: [
      { color: "from-rose-100 to-pink-200", label: "Articles SEO" },
      { color: "from-fuchsia-100 to-purple-200", label: "Landing Page" },
      { color: "from-pink-100 to-rose-200", label: "Newsletter" },
    ],
  },
];

export default function ClientDashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AmbientBlobs />
      <NavBar role="client" />

      <main className="flex-grow pt-24 pb-32">
        <div className="max-w-[480px] mx-auto px-4 space-y-6 pt-4">
          {freelancers.map((f, i) => (
            <div
              key={f.id}
              className={`bg-white rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.07)] animate-fade-in-up`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Portfolio strip */}
              <div className="grid grid-cols-3 h-28">
                {f.portfolio.map((p) => (
                  <div
                    key={p.label}
                    className={`bg-gradient-to-br ${p.color} flex items-end p-2`}
                  >
                    <span className="text-[10px] font-medium text-on-surface/60">{p.label}</span>
                  </div>
                ))}
              </div>

              {/* Content */}
              <div className="px-5 pt-1 pb-5">
                {/* Avatar + identity */}
                <div className="flex items-end gap-3 -mt-8 mb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${f.avatarColor} flex items-center justify-center ring-4 ring-white shrink-0`}>
                    <span className="text-white font-bold text-label-md">{f.avatar}</span>
                  </div>
                  <div className="mb-1">
                    <div className="flex items-center gap-2">
                      <p className="text-body-md font-semibold text-on-surface leading-tight">{f.name}</p>
                      {f.available && (
                        <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" title="Disponible" />
                      )}
                    </div>
                    <p className="text-label-sm text-on-surface-variant">{f.title} · {f.location}</p>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-body-sm text-on-surface/80 leading-relaxed mb-4">{f.bio}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {f.skills.map((skill) => (
                    <span
                      key={skill}
                      className="h-7 px-3 rounded-full bg-surface-container text-label-sm text-on-surface-variant font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Rating + price */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1.5">
                    <div className="flex">
                      {[...Array(5)].map((_, j) => (
                        <span key={j} className="material-symbols-outlined icon-filled text-amber-400 text-[14px]">star</span>
                      ))}
                    </div>
                    <span className="text-label-md font-semibold text-on-surface">{f.rating}</span>
                    <span className="text-label-sm text-on-surface-variant">({f.reviews} avis)</span>
                  </div>
                  <span className="text-label-sm font-medium text-primary">{f.price}</span>
                </div>

                {/* CTA */}
                <button className="w-full h-12 rounded-2xl bg-primary text-on-primary font-semibold text-label-md hover:opacity-90 active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">handshake</span>
                  Engager
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <BottomNav role="client" />
    </div>
  );
}
