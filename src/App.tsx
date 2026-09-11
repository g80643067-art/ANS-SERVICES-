import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ANX3DShowcaseSection } from "./components/ANX3DShowcaseSection";
import { ServicesSection } from "./components/ServicesSection";
import { AboutSection } from "./components/AboutSection";
import { PortfolioSection } from "./components/PortfolioSection";
import { ContactSection } from "./components/ContactSection";
import { DemoModal } from "./components/DemoModal";
import { FloatingActionDock } from "./components/FloatingActionDock";
import { Footer } from "./components/Footer";
import { FoodDemoApp } from "./components/food-demo/FoodDemoApp";
import { BeautyDemoApp } from "./components/beauty-demo/BeautyDemoApp";
import { ClothesDemoApp } from "./components/clothes-demo/ClothesDemoApp";
import { TechNovaDemoApp } from "./components/technova-demo/TechNovaDemoApp";
import { SweetCrustBakeryApp } from "./components/bakery-demo/SweetCrustBakeryApp";

export default function App() {
  const [currentView, setCurrentView] = useState<"agency" | "food-demo" | "beauty-demo" | "clothes-demo" | "electronics-demo" | "bakery-demo">(() => {
    // Check if query params or hash specify a demo directly (useful for standalone tabs)
    if (typeof window !== "undefined") {
      const search = window.location.search.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (search.includes("bakery") || hash.includes("bakery") || search.includes("sweetcrust") || hash.includes("sweetcrust")) {
        return "bakery-demo";
      }
      if (search.includes("electronics") || hash.includes("electronics") || search.includes("technova") || hash.includes("technova")) {
        return "electronics-demo";
      }
      if (search.includes("clothes") || hash.includes("clothes")) {
        return "clothes-demo";
      }
      if (search.includes("beauty") || hash.includes("beauty")) {
        return "beauty-demo";
      }
      if (search.includes("food") || hash.includes("food")) {
        return "food-demo";
      }
    }
    return "agency";
  });

  const [demoOpen, setDemoOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>();

  useEffect(() => {
    // Listen for hash changes or popstate
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (search.includes("bakery") || hash.includes("bakery") || search.includes("sweetcrust") || hash.includes("sweetcrust")) {
        setCurrentView("bakery-demo");
      } else if (search.includes("electronics") || hash.includes("electronics") || search.includes("technova") || hash.includes("technova")) {
        setCurrentView("electronics-demo");
      } else if (search.includes("clothes") || hash.includes("clothes")) {
        setCurrentView("clothes-demo");
      } else if (search.includes("beauty") || hash.includes("beauty")) {
        setCurrentView("beauty-demo");
      } else if (search.includes("food") || hash.includes("food")) {
        setCurrentView("food-demo");
      } else if (!hash || hash === "#home") {
        setCurrentView("agency");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleOpenDemoWithService = (serviceName?: string) => {
    setSelectedService(serviceName);
    setDemoOpen(true);
  };

  const handleLaunchFoodDemo = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentView("food-demo");
    if (window.history.pushState) {
      window.history.pushState(null, "", "?demo=food");
    }
  };

  const handleLaunchBeautyDemo = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentView("beauty-demo");
    if (window.history.pushState) {
      window.history.pushState(null, "", "?demo=beauty");
    }
  };

  const handleLaunchClothesDemo = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentView("clothes-demo");
    if (window.history.pushState) {
      window.history.pushState(null, "", "?demo=clothes");
    }
  };

  const handleLaunchElectronicsDemo = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentView("electronics-demo");
    if (window.history.pushState) {
      window.history.pushState(null, "", "?demo=electronics");
    }
  };

  const handleLaunchBakeryDemo = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentView("bakery-demo");
    if (window.history.pushState) {
      window.history.pushState(null, "", "?demo=bakery");
    }
  };

  const handleBackToAgency = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentView("agency");
    if (window.history.pushState) {
      window.history.pushState(null, "", window.location.pathname);
    }
  };

  const handleScrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // If in Bakery Demo View, render the complete SWEET CRUST bakery store!
  if (currentView === "bakery-demo") {
    return <SweetCrustBakeryApp onBackToAgency={handleBackToAgency} />;
  }

  // If in Electronics Demo View, render the complete TECHNOVA premium electronics store!
  if (currentView === "electronics-demo") {
    return <TechNovaDemoApp onBackToAgency={handleBackToAgency} />;
  }

  // If in Clothes Demo View, render the complete NOVA WEAR luxury fashion store!
  if (currentView === "clothes-demo") {
    return <ClothesDemoApp onBackToAgency={handleBackToAgency} />;
  }

  // If in Beauty Demo View, render the complete Bridal Salon & Spa website!
  if (currentView === "beauty-demo") {
    return <BeautyDemoApp onBackToAgency={handleBackToAgency} />;
  }

  // If in Food Demo View, render the complete working restaurant website!
  if (currentView === "food-demo") {
    return <FoodDemoApp onBackToAgency={handleBackToAgency} />;
  }

  // Otherwise, render the ANX Agency website with the 3D coverflow slider & showcase
  return (
    <div className="relative min-h-screen bg-[#080808] text-white selection:bg-[#7C3AED]/30 selection:text-purple-200 overflow-x-hidden">
      {/* Subtle Dark Ambient Gradients for Depth */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#7C3AED]/10 rounded-full blur-[140px]" />
        <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] bg-[#7C3AED]/5 rounded-full blur-[160px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] bg-[#7C3AED]/10 rounded-full blur-[160px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar
          onOpenDemo={() => handleOpenDemoWithService()}
          onOpenContact={handleScrollToContact}
        />

        <main className="flex-grow">
          <Hero
            onOpenDemo={() => handleOpenDemoWithService()}
            onOpenContact={handleScrollToContact}
            onScrollToServices={handleScrollToServices}
          />

          {/* 3D Coverflow Carousel Section on ANX Frontend */}
          <ANX3DShowcaseSection
            onLaunchFoodDemo={handleLaunchFoodDemo}
            onLaunchBeautyDemo={handleLaunchBeautyDemo}
            onLaunchClothesDemo={handleLaunchClothesDemo}
            onLaunchElectronicsDemo={handleLaunchElectronicsDemo}
            onLaunchBakeryDemo={handleLaunchBakeryDemo}
            onOpenDemoModal={(serviceName) => handleOpenDemoWithService(serviceName)}
          />

          <ServicesSection
            onSelectServiceForDemo={(serviceName) => handleOpenDemoWithService(serviceName)}
          />

          <AboutSection onOpenDemo={() => handleOpenDemoWithService()} />

          <PortfolioSection />

          <ContactSection />
        </main>

        <Footer
          onOpenDemo={() => handleOpenDemoWithService()}
          onScrollToTop={handleScrollToTop}
        />

        <FloatingActionDock onOpenDemo={() => handleOpenDemoWithService()} />
      </div>

      <DemoModal
        isOpen={demoOpen}
        onClose={() => setDemoOpen(false)}
        preselectedService={selectedService}
      />
    </div>
  );
}
