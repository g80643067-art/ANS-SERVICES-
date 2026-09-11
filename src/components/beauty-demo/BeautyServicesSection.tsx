import React from "react";
import { Sparkles, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { BRIDAL_SERVICES, BridalService } from "@/data/beautyDemoData";

interface BeautyServicesSectionProps {
  onSelectServiceForBooking: (serviceTitle: string) => void;
}

export function BeautyServicesSection({
  onSelectServiceForBooking,
}: BeautyServicesSectionProps) {
  return (
    <section id="services" className="py-20 bg-[#fdfcf9] border-t border-[#f0e6dd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4e7dc] text-[#855539] text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#b0774c]" />
            <span>EXQUISITE BRIDAL ARTISTRY</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-[#231815] font-bold">
            Curated Services for Every Ceremony
          </h2>

          <p className="text-[#69554a] text-sm sm:text-base leading-relaxed">
            From the sacred morning pheras to the glitz of the evening reception, our signature
            makeover rituals ensure you look radiant, effortless, and timeless at every angle.
          </p>
        </div>

        {/* Services Grid (6 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BRIDAL_SERVICES.map((service: BridalService) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl overflow-hidden border border-[#ebdcd0] shadow-[0_4px_20px_rgba(40,25,15,0.04)] hover:shadow-[0_12px_35px_rgba(143,94,59,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
            >
              {/* Image Container with Tag */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#2d1e17]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#8f5e3b] shadow-sm">
                  {service.category}
                </div>

                <div className="absolute bottom-3 left-3 text-white">
                  <span className="text-[11px] tracking-wider uppercase text-[#f4d4ba] block font-medium">
                    {service.subtitle}
                  </span>
                  <h3 className="font-serif text-lg font-bold drop-shadow-sm text-white">
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#7d685b] pb-2 border-b border-[#f2e6dc]">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#8f5e3b]" />
                      <span>{service.duration}</span>
                    </div>
                    <span className="font-bold text-[#8f5e3b] text-sm">{service.price}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#57443a] leading-relaxed">
                    {service.description}
                  </p>

                  {/* Bullet Highlights */}
                  <div className="space-y-1.5 pt-1">
                    {service.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#6e584b]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#a4704b] shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Booking trigger button */}
                <button
                  onClick={() => onSelectServiceForBooking(service.title)}
                  className="w-full mt-3 inline-flex items-center justify-center gap-2 bg-[#f8f1eb] hover:bg-[#8f5e3b] text-[#784e35] hover:text-white text-xs font-semibold py-2.5 rounded-xl border border-[#e5d2c2] hover:border-[#8f5e3b] transition-all cursor-pointer group/btn"
                >
                  <span>Book Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
