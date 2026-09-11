import React from "react";
import { User } from "lucide-react";

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
            <div className="w-16 h-16 rounded-full bg-[#151515] border border-[#7C3AED]/40 shadow-[0_0_15px_rgba(124,58,237,0.2)] flex items-center justify-center text-[#7C3AED] transition-all duration-300 hover:border-[#7C3AED] hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]">
              <User className="w-7 h-7" />
            </div>
            <span className="mt-3 text-xs sm:text-sm font-bold tracking-wider text-white uppercase">
              MEMBER 1
            </span>
          </div>

          {/* Member 2 */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#151515] border border-[#7C3AED]/40 shadow-[0_0_15px_rgba(124,58,237,0.2)] flex items-center justify-center text-[#7C3AED] transition-all duration-300 hover:border-[#7C3AED] hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]">
              <User className="w-7 h-7" />
            </div>
            <span className="mt-3 text-xs sm:text-sm font-bold tracking-wider text-white uppercase">
              MEMBER 2
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
