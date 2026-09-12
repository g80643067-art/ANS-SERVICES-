import React from "react";

export const PortfolioSection: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative bg-[#080808]">
      <div className="max-w-2xl mx-auto">
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
            <a
              href="https://www.instagram.com/x.codess?stkn=MWN6MTEwbXBmYnl4dg=="
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 rounded-full overflow-hidden bg-[#151515] border border-[#7C3AED]/40 shadow-[0_0_15px_rgba(124,58,237,0.2)] flex items-center justify-center transition-all duration-300 hover:border-[#7C3AED] hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] block group"
              title="Instagram Member 1"
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop"
                alt="Member 1"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
            </a>
            <span className="mt-3 text-xs sm:text-sm font-bold tracking-wider text-white uppercase">
              MEMBER 1
            </span>
            <span className="mt-1 text-[11px] text-[#A78BFA] font-mono tracking-wide">
              +917348382816
            </span>
          </div>

          {/* Member 2 */}
          <div className="flex flex-col items-center">
            <a
              href="https://www.instagram.com/x.buillds?stkn=M3Ryd2dqaDVoOXg1"
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 rounded-full overflow-hidden bg-[#151515] border border-[#7C3AED]/40 shadow-[0_0_15px_rgba(124,58,237,0.2)] flex items-center justify-center transition-all duration-300 hover:border-[#7C3AED] hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] block group"
              title="Instagram Member 2"
            >
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
                alt="Member 2"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
            </a>
            <span className="mt-3 text-xs sm:text-sm font-bold tracking-wider text-white uppercase">
              MEMBER 2
            </span>
            <span className="mt-1 text-[11px] text-[#A78BFA] font-mono tracking-wide">
              9219694862
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

