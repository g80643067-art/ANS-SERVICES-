import React from "react";
import {
  Code,
  LayoutTemplate,
  Briefcase,
  CloudUpload,
  ArrowRight,
} from "lucide-react";

interface ServicesSectionProps {
  onSelectServiceForDemo: (serviceName: string) => void;
}

export function ServicesSection({ onSelectServiceForDemo }: ServicesSectionProps) {
  const services = [
    {
      id: "custom-dev",
      title: "Custom Website Development",
      description:
        "Modern, responsive, and fast websites built from the ground up to align perfectly with your unique business requirements.",
      icon: Code,
      color: "from-blue-600/20 to-indigo-600/20",
      accent: "text-blue-400",
    },
    {
      id: "ui-ux",
      title: "Premium UI/UX Design",
      description:
        "Clean, premium interfaces crafted to elevate your brand, improve user experience, and drive higher conversion rates.",
      icon: LayoutTemplate,
      color: "from-purple-600/20 to-pink-600/20",
      accent: "text-purple-400",
    },
    {
      id: "business-portfolio",
      title: "Business & Portfolio Websites",
      description:
        "Professional digital solutions tailored for businesses, creators, shops, services, and personal brands to showcase their work.",
      icon: Briefcase,
      color: "from-cyan-600/20 to-blue-600/20",
      accent: "text-cyan-400",
    },
    {
      id: "deployment-support",
      title: "Deployment & Support",
      description:
        "Comprehensive services including domain setup, reliable hosting, expert deployment, and ongoing website maintenance and support.",
      icon: CloudUpload,
      color: "from-emerald-600/20 to-teal-600/20",
      accent: "text-emerald-400",
    },
  ];

  return (
    <section id="services" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
          ANX PRO – Website Services
        </h2>
        <p className="text-slate-300 text-base sm:text-lg">
          Professional, custom-tailored digital solutions for your business.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pointer-events-auto">
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <div
              key={service.id}
              className="group relative rounded-2xl p-6 bg-slate-900/50 border border-slate-800 transition-all duration-300 hover:border-slate-600 flex flex-col justify-between"
            >
              <div>
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} border border-white/5 flex items-center justify-center mb-4`}
                >
                  <Icon className={`w-6 h-6 ${service.accent}`} />
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  {service.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => onSelectServiceForDemo(service.title)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-purple-300 transition-colors cursor-pointer"
                >
                  <span>Inquire</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
