import React from "react";
import { Truck, ShieldCheck, CheckCircle2, RotateCcw, Headphones, Sparkles } from "lucide-react";

export function TechNovaWhyChooseUs() {
  const benefits = [
    {
      icon: <Truck className="w-6 h-6 text-cyan-400" />,
      title: "Fast Delivery",
      desc: "Guaranteed 24-48 hour express dispatch with tracked courier delivery straight to your doorstep.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-cyan-400" />,
      title: "Secure Payments",
      desc: "Bank-grade 256-bit SSL encryption, tokenized cards, and biometrically confirmed checkout protocols.",
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-cyan-400" />,
      title: "Genuine Products",
      desc: "100% authentic manufacturer sealed units with verifiable factory warranties and serial credentials.",
    },
    {
      icon: <RotateCcw className="w-6 h-6 text-cyan-400" />,
      title: "Easy Returns",
      desc: "30-day hassle-free return policy with pre-printed return labels and instant refunds upon inspection.",
    },
    {
      icon: <Headphones className="w-6 h-6 text-cyan-400" />,
      title: "Customer Support",
      desc: "Round-the-clock live technical consultation from certified electronic hardware specialists.",
    },
  ];

  return (
    <section id="why-us" className="py-16 bg-[#080B13] border-b border-cyan-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>The TechNova Standard</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            WHY SHOP WITH TECHNOVA
          </h2>

          <p className="text-slate-400 text-sm">
            We provide an elevated e-commerce experience built on trust, genuine hardware integrity, and customer satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-[#0D1220] border border-slate-800/80 hover:border-cyan-500/40 text-center flex flex-col items-center justify-start space-y-3 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(6,182,212,0.1)] group transform hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                {b.icon}
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                {b.title}
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed">
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
