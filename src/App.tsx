import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ANX3DShowcaseSection } from "./components/ANX3DShowcaseSection";
import { DemoSitesSection } from "./components/DemoSitesSection";
import { ServicesSection } from "./components/ServicesSection";
import { AboutSection } from "./components/AboutSection";
import { PortfolioSection } from "./components/PortfolioSection";
import { ContactSection } from "./components/ContactSection";
import { DemoModal } from "./components/DemoModal";
import { Footer } from "./components/Footer";
import { FoodDemoApp } from "./components/food-demo/FoodDemoApp";
import { BeautyDemoApp } from "./components/beauty-demo/BeautyDemoApp";
import { ClothesDemoApp } from "./components/clothes-demo/ClothesDemoApp";
import { TechNovaDemoApp } from "./components/technova-demo/TechNovaDemoApp";
import { SweetCrustBakeryApp } from "./components/bakery-demo/SweetCrustBakeryApp";
import { AnxMartEcommerceApp } from "./components/ecommerce-demo/AnxMartEcommerceApp";
import { VoiceAgent } from "./components/voice/VoiceAgent";

export default function App() {
  const [currentView, setCurrentView] = useState<"agency" | "food-demo" | "beauty-demo" | "clothes-demo" | "electronics-demo" | "bakery-demo" | "ecommerce-demo">(() => {
    // Check if query params or hash specify a demo directly (useful for standalone tabs)
    if (typeof window !== "undefined") {
      const search = window.location.search.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (search.includes("ecommerce") || hash.includes("ecommerce") || search.includes("e-commerce") || search.includes("anxmart")) {
        return "ecommerce-demo";
      }
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

  const handleLaunchEcommerceDemo = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentView("ecommerce-demo");
    if (window.history.pushState) {
      window.history.pushState(null, "", "?demo=ecommerce");
    }
  };

  const handleVoiceAction = (action: string, payload: string) => {
    // Utility for demo launch
    const openDemo = (demo: string) => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setCurrentView(`${demo}-demo` as any);
      if (window.history.pushState) window.history.pushState(null, "", `?demo=${demo}`);
    };

    // Utility for section navigation
    const navSection = (id: string) => {
      if (currentView !== "agency") {
        setCurrentView("agency");
        if (window.history.pushState) window.history.pushState(null, "", window.location.pathname);
      }
      setTimeout(() => {
        if (id === "top") window.scrollTo({ top: 0, behavior: "smooth" });
        else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    };

    switch(action) {
      case "SHOW_PIZZA_DEMO":
        openDemo("food");
        break;
      case "SHOW_SALON_DEMO":
        openDemo("beauty");
        break;
      case "SHOW_BUSINESS_DEMO":
        openDemo("ecommerce"); // Mapped to ecommerce for now
        break;
      case "SHOW_TUITION_DEMO":
        openDemo("clothes"); // Example map
        break;
      case "SHOW_ELECTRONICS_DEMO":
        openDemo("electronics");
        break;
      case "SHOW_BAKERY_DEMO":
        openDemo("bakery");
        break;
      case "OPEN_HOME":
        navSection("top");
        break;
      case "OPEN_ABOUT":
        navSection("about");
        break;
      case "OPEN_SERVICES":
        navSection("services");
        break;
      case "OPEN_PORTFOLIO":
        navSection("portfolio");
        break;
      case "OPEN_DEMO_SITES":
        navSection("demo-sites");
        break;
      case "SHOW_MEMBER_DEMOS":
        if (payload) {
          window.dispatchEvent(new CustomEvent("FILTER_DEMO_SITES", { detail: { memberId: parseInt(payload) } }));
        } else {
          navSection("demo-sites");
        }
        break;
      case "OPEN_CONTACT":
        navSection("contact");
        break;
      case "NEXT_SECTION":
        // simple scroll to next relevant section logic
        window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" });
        break;
      case "SCROLL_TOP":
        window.scrollTo({ top: 0, behavior: "smooth" });
        break;
      case "SCROLL_DOWN":
        window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" });
        break;
      case "OPEN_MENU":
        window.dispatchEvent(new CustomEvent("ANX_MENU_TOGGLE", { detail: { action: 'OPEN' } }));
        break;
      case "CLOSE_MENU":
        window.dispatchEvent(new CustomEvent("ANX_MENU_TOGGLE", { detail: { action: 'CLOSE' } }));
        break;
      case "OPEN_WHATSAPP":
        window.open("https://wa.me/919219694862?text=Hello%20ANX,%20I%20want%20to%20get%20a%20website", "_blank");
        break;
      case "RETURN_TO_ANX":
        handleBackToAgency();
        break;
      default:
        // Broadcast any unhandled or demo-specific actions globally for demos to pick up
        window.dispatchEvent(new CustomEvent("AGENT_ACTION", { detail: { action, payload } }));
        break;
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

  const renderActiveView = () => {
    if (currentView === "ecommerce-demo") {
      return <AnxMartEcommerceApp onBackToAgency={handleBackToAgency} />;
    }
    if (currentView === "bakery-demo") {
      return <SweetCrustBakeryApp onBackToAgency={handleBackToAgency} />;
    }
    if (currentView === "electronics-demo") {
      return <TechNovaDemoApp onBackToAgency={handleBackToAgency} />;
    }
    if (currentView === "clothes-demo") {
      return <ClothesDemoApp onBackToAgency={handleBackToAgency} />;
    }
    if (currentView === "beauty-demo") {
      return <BeautyDemoApp onBackToAgency={handleBackToAgency} />;
    }
    if (currentView === "food-demo") {
      return <FoodDemoApp onBackToAgency={handleBackToAgency} />;
    }

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
              onLaunchEcommerceDemo={handleLaunchEcommerceDemo}
              onOpenDemoModal={(serviceName) => handleOpenDemoWithService(serviceName)}
            />

            <ServicesSection
              onSelectServiceForDemo={(serviceName) => handleOpenDemoWithService(serviceName)}
            />

            <AboutSection onOpenDemo={() => handleOpenDemoWithService()} />

            <PortfolioSection />

            <DemoSitesSection 
              onLaunchDemoAction={handleVoiceAction} 
            />

            <ContactSection />
          </main>

          <Footer
            onOpenDemo={() => handleOpenDemoWithService()}
            onScrollToTop={handleScrollToTop}
          />
        </div>

        <DemoModal
          isOpen={demoOpen}
          onClose={() => setDemoOpen(false)}
          preselectedService={selectedService}
        />
      </div>
    );
  };

  return (
    <>
      {renderActiveView()}
      <VoiceAgent onAction={handleVoiceAction} />
    </>
  );
}
