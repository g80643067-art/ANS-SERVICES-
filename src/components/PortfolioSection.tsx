import React, { useState } from "react";
import { ArrowLeft, Instagram, Phone, Sparkles, Code, Layers, ShieldCheck, ExternalLink, X, User } from "lucide-react";

interface MemberDetails {
  id: number;
  name: string;
  label: string;
  role: string;
  contact: string;
  bio: string;
  skills: string[];
  anxWork: string;
  projects: string[];
  instagram: string;
}

const MEMBERS: Record<number, MemberDetails> = {
  1: {
    id: 1,
    name: "Aditya",
    label: "MEMBER 1",
    role: "Founder, Owner & Tech Developer",
    contact: "+917348382816",
    bio: "Passionate founder, owner and creative tech developer crafting high-performance web experiences, interactive 3D simulations, and immersive digital interfaces at ANX Agency.",
    skills: ["React 18+", "TypeScript", "Tailwind CSS", "Canvas & WebGL", "UI/UX Architecture", "Motion & Animation"],
    anxWork: "Spearheading frontend architecture, interactive topology canvas engines, and high-conversion modern web applications with ultra-responsive layouts.",
    projects: [
      "ANX Mart E-Commerce & Order Tracker",
      "KineticMatrix Interactive Topology Engine",
      "ANX 3D Showcase & Agency Portfolio"
    ],
    instagram: "https://www.instagram.com/x.codess?stkn=MWN6MTEwbXBmYnl4dg=="
  },
  2: {
    id: 2,
    name: "Nikhil",
    label: "MEMBER 2",
    role: "Founder, Owner & Tech Developer",
    contact: "+91 9219694862",
    bio: "Full-stack engineer, founder and tech developer specializing in scalable system architecture, seamless API integrations, robust state management, and lightning-fast web deployments.",
    skills: ["Next.js / Vite", "Node.js & Express", "TypeScript", "State Management", "Database Design", "Performance Optimization"],
    anxWork: "Designing secure backend services, state synchronization engines, client-side routing, and cross-platform responsive business solutions.",
    projects: [
      "TechNova Electronics & Gadget Hub",
      "SweetCrust Artisan Bakery App",
      "ANX Client Demonstration Portal"
    ],
    instagram: "https://www.instagram.com/x.buillds?stkn=M3"
  }
};

export const PortfolioSection: React.FC = () => {
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);

  React.useEffect(() => {
    (window as any).__ANX_ACTIVE_MEMBER_ID__ = selectedMemberId;
  }, [selectedMemberId]);

  React.useEffect(() => {
    const handleOpen = (e: any) => {
      if (e.detail?.memberId) setSelectedMemberId(e.detail.memberId);
    };
    const handleClose = () => setSelectedMemberId(null);

    window.addEventListener("OPEN_MEMBER_MODAL", handleOpen);
    window.addEventListener("CLOSE_MEMBER_MODAL", handleClose);
    return () => {
      window.removeEventListener("OPEN_MEMBER_MODAL", handleOpen);
      window.removeEventListener("CLOSE_MEMBER_MODAL", handleClose);
    };
  }, []);

  const activeMember = selectedMemberId ? MEMBERS[selectedMemberId] : null;

  return (
    <section id="portfolio" className="py-16 px-4 sm:px-6 lg:px-8 relative bg-[#080808]">
      <div className="max-w-3xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase font-sans">
            PORTFOLIO
          </h2>
          <div className="w-12 h-1 bg-[#7C3AED] mx-auto mt-3 rounded-full shadow-[0_0_10px_rgba(124,58,237,0.6)]" />
        </div>

        {/* Two Circles brought closer together */}
        <div className="flex justify-center items-center gap-16 sm:gap-24">
          {/* Member 1 */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => setSelectedMemberId(1)}
              className="w-16 h-16 rounded-full overflow-hidden bg-[#151515] border border-[#7C3AED]/40 shadow-[0_0_15px_rgba(124,58,237,0.2)] flex items-center justify-center transition-all duration-300 hover:border-[#7C3AED] hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:scale-105 cursor-pointer group"
              title="View Member 1 Details"
            >
              <User className="w-8 h-8 text-[#A78BFA] group-hover:scale-110 group-hover:text-white transition-all duration-300" />
            </button>
            <button
              onClick={() => setSelectedMemberId(1)}
              className="mt-3 text-xs sm:text-sm font-bold tracking-wider text-white uppercase hover:text-[#A78BFA] transition-colors cursor-pointer"
            >
              MEMBER 1
            </button>
            <span className="mt-1 text-[11px] text-[#A78BFA] font-mono tracking-wide">
              {MEMBERS[1].contact}
            </span>
          </div>

          {/* Member 2 */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => setSelectedMemberId(2)}
              className="w-16 h-16 rounded-full overflow-hidden bg-[#151515] border border-[#7C3AED]/40 shadow-[0_0_15px_rgba(124,58,237,0.2)] flex items-center justify-center transition-all duration-300 hover:border-[#7C3AED] hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:scale-105 cursor-pointer group"
              title="View Member 2 Details"
            >
              <User className="w-8 h-8 text-[#A78BFA] group-hover:scale-110 group-hover:text-white transition-all duration-300" />
            </button>
            <button
              onClick={() => setSelectedMemberId(2)}
              className="mt-3 text-xs sm:text-sm font-bold tracking-wider text-white uppercase hover:text-[#A78BFA] transition-colors cursor-pointer"
            >
              MEMBER 2
            </button>
            <span className="mt-1 text-[11px] text-[#A78BFA] font-mono tracking-wide">
              {MEMBERS[2].contact}
            </span>
          </div>
        </div>
      </div>

      {/* Member Details Full-Screen Modal / Page */}
      {activeMember && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl animate-fade-in flex flex-col p-4 sm:p-6">
          <div className="relative w-full max-w-2xl bg-[#111113] border border-[#7C3AED]/40 rounded-3xl shadow-[0_0_50px_rgba(124,58,237,0.25)] p-6 sm:p-10 m-auto text-white space-y-6 shrink-0">
            
            {/* Top Navigation / Close */}
            <div className="flex items-center justify-between pb-4 border-b border-[#222226]">
              <button
                onClick={() => setSelectedMemberId(null)}
                className="flex items-center gap-2 text-xs font-bold px-3.5 py-2 rounded-xl bg-[#1F1F23] border border-[#33333A] text-slate-200 hover:text-white hover:bg-[#2A2A31] transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Team</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#7C3AED]/20 border border-[#7C3AED]/40 text-[#A78BFA] text-xs font-mono font-bold">
                  {activeMember.label} PROFILE
                </span>
                <button
                  onClick={() => setSelectedMemberId(null)}
                  className="p-2 rounded-xl bg-[#1F1F23] border border-[#33333A] text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Profile Header Header */}
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-[#7C3AED] shadow-[0_0_30px_rgba(124,58,237,0.4)] shrink-0 bg-[#151515] flex items-center justify-center">
                <User className="w-12 h-12 sm:w-14 sm:h-14 text-[#A78BFA]" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
                  {activeMember.name}
                </h3>
                <p className="text-sm sm:text-base font-semibold text-[#A78BFA] flex items-center justify-center sm:justify-start gap-2">
                  <Sparkles className="w-4 h-4" />
                  {activeMember.role}
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-3 pt-1">
                  <span className="text-xs text-slate-400 font-mono">Contact:</span>
                  <a
                    href={`tel:${activeMember.contact}`}
                    className="text-xs font-mono font-bold text-white bg-black/60 px-3 py-1 rounded-lg border border-[#33333A] hover:border-[#7C3AED] transition-colors"
                  >
                    {activeMember.contact}
                  </a>
                </div>
              </div>
            </div>

            {/* Professional Bio */}
            <div className="space-y-2 bg-[#17171C] p-4 sm:p-5 rounded-2xl border border-[#2A2A33]">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#A78BFA]">
                Professional Bio
              </h4>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {activeMember.bio}
              </p>
            </div>

            {/* Skills Grid */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#A78BFA] flex items-center gap-2">
                <Code className="w-4 h-4" /> Core Skills & Expertise
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeMember.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-xl bg-[#1B1B21] border border-[#33333E] text-xs font-semibold text-slate-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* What they work on at ANX */}
            <div className="space-y-2 bg-[#17171C] p-4 sm:p-5 rounded-2xl border border-[#2A2A33]">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#A78BFA] flex items-center gap-2">
                <Layers className="w-4 h-4" /> ANX Contributions & Responsibilities
              </h4>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {activeMember.anxWork}
              </p>
            </div>

            {/* Projects / Contributions */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#A78BFA] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Key Projects Built
                </h4>
                <button 
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent("FILTER_DEMO_SITES", { detail: { memberId: activeMember.id } }));
                    setSelectedMemberId(null);
                  }}
                  className="text-xs font-bold bg-[#7C3AED]/20 hover:bg-[#7C3AED]/40 text-[#A78BFA] hover:text-white px-3 py-1.5 rounded-lg border border-[#7C3AED]/40 transition-colors"
                >
                  View Demos
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activeMember.projects.map((proj, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#1A1A20] border border-[#2D2D38] text-xs text-slate-200 font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
                    <span>{proj}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instagram Button / Link */}
            <div className="pt-4 border-t border-[#222226] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-400">Connect directly via social profile:</span>
              <a
                href={activeMember.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all hover:scale-105"
              >
                <Instagram className="w-4 h-4" />
                <span>Visit Instagram Profile</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
