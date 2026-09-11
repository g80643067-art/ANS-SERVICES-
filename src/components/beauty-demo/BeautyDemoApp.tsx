import React, { useState } from "react";
import { BeautyNavbar } from "./BeautyNavbar";
import { BeautyHero } from "./BeautyHero";
import { BeautyServicesSection } from "./BeautyServicesSection";
import { BeautyPackagesSection } from "./BeautyPackagesSection";
import { BeautyGallerySection } from "./BeautyGallerySection";
import { BeautyWhyChooseUsSection } from "./BeautyWhyChooseUsSection";
import { BeautyTestimonialsSection } from "./BeautyTestimonialsSection";
import { BeautyBookingSection } from "./BeautyBookingSection";
import { BeautyFooter } from "./BeautyFooter";
import { BackToAnxFloatingButton } from "../ui/BackToAnxFloatingButton";
import { MessageCircle, Calendar, Sparkles, X } from "lucide-react";

interface BeautyDemoAppProps {
  onBackToAgency: () => void;
}

export function BeautyDemoApp({ onBackToAgency }: BeautyDemoAppProps) {
  const [preselectedPackage, setPreselectedPackage] = useState<string | undefined>();
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenBooking = (optionName?: string) => {
    if (optionName) {
      setPreselectedPackage(optionName);
    }
    handleScrollToSection("booking");
  };

  return (
    <div className="min-h-screen bg-[#fdfcf9] text-[#231815] selection:bg-[#8f5e3b]/20 selection:text-[#523521] overflow-x-hidden font-sans">
      {/* Navigation */}
      <BeautyNavbar
        onBackToAgency={onBackToAgency}
        onOpenBooking={handleOpenBooking}
        onScrollToSection={handleScrollToSection}
      />

      {/* Main Sections */}
      <main>
        {/* 1. Hero Section */}
        <BeautyHero
          onOpenBooking={() => handleOpenBooking()}
          onScrollToSection={handleScrollToSection}
        />

        {/* 2. Services Section */}
        <BeautyServicesSection
          onSelectServiceForBooking={(serviceTitle) => handleOpenBooking(serviceTitle)}
        />

        {/* 3. Bridal Packages */}
        <BeautyPackagesSection
          onSelectPackageForBooking={(packageName) => handleOpenBooking(packageName)}
        />

        {/* 4. Bridal Gallery with Lightbox */}
        <BeautyGallerySection />

        {/* 5. Why Choose Us */}
        <BeautyWhyChooseUsSection />

        {/* 6. Testimonials */}
        <BeautyTestimonialsSection />

        {/* 7. Booking Consultation Form */}
        <BeautyBookingSection preselectedOption={preselectedPackage} />
      </main>

      {/* 8. Footer */}
      <BeautyFooter
        onScrollToTop={handleScrollToTop}
        onScrollToSection={handleScrollToSection}
        onBackToAgency={onBackToAgency}
      />

      {/* Floating Return to ANX Button */}
      <BackToAnxFloatingButton onBackToAgency={onBackToAgency} theme="luxury" />

      {/* Floating Bottom-Right Quick Action Bar */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* WhatsApp Consultation Button */}
        <a
          href="https://wa.me/?text=Hi%20Beauty%20Demo%2C%20I%20would%20like%20to%20know%20about%20bridal%20makeup%20packages."
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-[0_8px_25px_rgba(37,211,102,0.4)] hover:scale-105 transition-all cursor-pointer group"
          title="WhatsApp Concierge"
        >
          <MessageCircle className="w-6 h-6" />
        </a>

        {/* Quick Book Button */}
        <button
          onClick={() => handleOpenBooking()}
          className="w-13 h-13 rounded-full bg-gradient-to-r from-[#8f5e3b] to-[#b37a51] hover:from-[#7a4e2f] hover:to-[#9c6640] text-white flex items-center justify-center shadow-[0_8px_25px_rgba(143,94,59,0.4)] hover:scale-105 transition-all cursor-pointer"
          title="Book Consultation"
        >
          <Calendar className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
