import React from "react";
import {
  Globe,
  Boxes,
  Sliders,
  BadgePercent,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  MessageSquare,
} from "lucide-react";

interface ServicesSectionProps {
  onSelectServiceForDemo: (serviceName: string) => void;
}

export function ServicesSection({ onSelectServiceForDemo }: ServicesSectionProps) {
  const services = [
    {
      id: "business",
      title: "Business Websites",
      badge: "High Conversion",
      description:
        "Engineered for companies, startups, and agencies. Fast loading, SEO-optimized, clean corporate identity, and lead-generation funnels.",
      features: [
        "Corporate & Enterprise Portals",
        "Lead Generation & Booking Systems",
        "Mobile-First Responsive Layouts",
        "Search Engine Optimization (SEO)",
      ],
      icon: Globe,
      color: "from-blue-600/40 via-indigo-600/30 to-purple-600/40",
      accent: "text-blue-400",
      borderGlow: "group-hover:border-blue-500/50 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]",
    },
    {
      id: "3d-premium",
      title: "3D & Premium Websites",
      badge: "Flagship Luxury",
      description:
        "Captivate your visitors with fluid WebGL shaders, interactive 3D physics, glassmorphic optics, dynamic water ripples, and futuristic motion.",
      features: [
        "Raw WebGL & Three.js Canvas Visuals",
        "Smooth Momentum & Scroll Animations",
        "Luxury Dark & Glassmorphic Themes",
        "Zero-Lag 60fps Interactive Shaders",
      ],
      icon: Boxes,
      color: "from-purple-600/50 via-pink-600/30 to-indigo-600/40",
      accent: "text-purple-400",
      borderGlow: "group-hover:border-purple-500/60 group-hover:shadow-[0_0_35px_rgba(168,85,247,0.3)]",
    },
    {
      id: "custom",
      title: "Custom Websites",
      badge: "Bespoke Engineering",
      description:
        "Tailored from the ground up according to your exact business logic, workflow, custom calculators, dashboards, and unique design systems.",
      features: [
        "100% Tailored to Your Vision",
        "Custom APIs & Third-Party Integrations",
        "Client Dashboards & Portals",
        "Scalable & Secure Architecture",
      ],
      icon: Sliders,
      color: "from-cyan-600/40 via-blue-600/30 to-purple-600/40",
      accent: "text-cyan-400",
      borderGlow: "group-hover:border-cyan-500/50 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]",
    },
    {
      id: "budget-friendly",
      title: "Budget Friendly",
      badge: "Max Value",
      description:
        "Top-tier design quality made accessible for small businesses and founders without astronomical agency price tags or hidden retainers.",
      features: [
        "Transparent & Honest Pricing",
        "No Hidden Maintenance Fees",
        "Fast 3 to 7 Day Turnaround",
        "Full Source Code Ownership",
      ],
      icon: BadgePercent,
      color: "from-emerald-600/40 via-teal-600/30 to-blue-600/40",
      accent: "text-emerald-400",
      borderGlow: "group-hover:border-emerald-500/50 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]",
    },
    {
      id: "free-demo",
      title: "Free Demo",
      badge: "Zero Risk",
      description:
        "See your concept come alive before you invest. We prepare an interactive live preview tailored to your brand with zero upfront commitment.",
      features: [
        "Live Interactive Working Preview",
        "Experience UI & Speed First-Hand",
        "Fast Concept Prototyping",
        "100% Free Consultation & Quote",
      ],
      icon: Sparkles,
      color: "from-purple-600/60 via-indigo-600/40 to-blue-600/50",
      accent: "text-purple-300",
      borderGlow: "group-hover:border-purple-400/70 group-hover:shadow-[0_0_40px_rgba(168,85,247,0.35)]",
    },
  ];

  return (
    <section id="services" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Services & Capabilities</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-5">
          Everything You Need For A{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-400">
            Standout Digital Presence
          </span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg">
          We combine cutting-edge interactive WebGL visuals, bulletproof engineering, and budget-friendly pricing customized to your needs.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pointer-events-auto">
        {services.map((service, index) => {
          const Icon = service.icon;
          const isLarge = index === 4; // Free Demo card emphasized

          return (
            <div
              key={service.id}
              className={`group relative rounded-3xl p-7 bg-slate-950/60 backdrop-blur-2xl border border-purple-500/20 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between ${
                service.borderGlow
              } ${isLarge ? "md:col-span-2 lg:col-span-2 bg-gradient-to-br from-slate-950/90 via-purple-950/30 to-slate-950/90" : ""}`}
            >
              {/* Card Header */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <Icon className={`w-7 h-7 ${service.accent}`} />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wide bg-slate-900/90 border border-slate-700 text-slate-300">
                    {service.badge}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                  {service.title}
                </h3>

                <p className="text-slate-300/90 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features List */}
                <div className={`grid ${isLarge ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"} gap-2.5 mb-8`}>
                  {service.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${service.accent}`} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => onSelectServiceForDemo(service.title)}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-purple-300 hover:text-white transition-colors group/btn cursor-pointer"
                >
                  <span>Request For This</span>
                  <ArrowRight className="w-4 h-4 text-purple-400 group-hover/btn:translate-x-1.5 transition-transform" />
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href="tel:+917348382816"
                    className="p-2 rounded-lg bg-slate-900/80 hover:bg-purple-900/50 text-slate-400 hover:text-purple-300 transition-colors"
                    title="Call Now"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={`https://wa.me/917348382816?text=${encodeURIComponent(
                      `Hi ANX, I want to discuss ${service.title}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-900/80 hover:bg-emerald-900/50 text-slate-400 hover:text-emerald-300 transition-colors"
                    title="WhatsApp"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
