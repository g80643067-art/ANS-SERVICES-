"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";

// Inline Icons (Zero external dependencies)
const ChevronLeftIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

export interface CarouselItem {
  tag?: string;
  titleLine1?: string;
  titleLine2?: string;
  desc?: string;
  img: string;
  ctaText?: string;
  ctaUrl?: string;
  isBeautyDemo?: boolean;
  isClothesDemo?: boolean;
  isElectronicsDemo?: boolean;
  isBakeryDemo?: boolean;
  isEcommerceDemo?: boolean;
  isLiveDemo?: boolean;
  demoUrl?: string;
  isPureImage?: boolean;
}

export interface CoverFlowCarouselProps {
  items?: CarouselItem[];
  sectionLabel?: string;
  autoplay?: boolean;
  autoplayDelay?: number;
  className?: string;
  onBeautyDemoClick?: (item: CarouselItem) => void;
  onClothesDemoClick?: (item: CarouselItem) => void;
  onElectronicsDemoClick?: (item: CarouselItem) => void;
  onBakeryDemoClick?: (item: CarouselItem) => void;
  onEcommerceDemoClick?: (item: CarouselItem) => void;
  onLiveDemoClick?: (item: CarouselItem) => void;
  onCtaClick?: (item: CarouselItem) => void;
}

export const defaultDishes: CarouselItem[] = [
  {
    tag: "#Signature",
    titleLine1: "BUTTER CHICKEN",
    titleLine2: "– DELHI HERITAGE",
    desc: "Velvety roasted tomato and fenugreek gravy with tender charred chicken",
    img: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=800&auto=format&fit=crop",
    ctaText: "View Menu",
    ctaUrl: "#",
  },
  {
    tag: "#ChefSpecial",
    titleLine1: "TANDOORI CHOPS",
    titleLine2: "– SMOKED SPICE",
    desc: "Grass-fed lamb chops charred in live charcoal tandoor with Kashmiri spices",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop",
    ctaText: "View Menu",
    ctaUrl: "#",
  },
  {
    tag: "#Vegetarian",
    titleLine1: "PANEER TIKKA",
    titleLine2: "– CLAY ROASTED",
    desc: "Artisan cottage cheese marinated in spiced yogurt, bell peppers & saffron",
    img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=800&auto=format&fit=crop",
    ctaText: "View Menu",
    ctaUrl: "#",
  },
  {
    tag: "#CoastalCatch",
    titleLine1: "MALABAR PRAWNS",
    titleLine2: "– COCONUT GRAVY",
    desc: "Jumbo wild tiger prawns simmered in fragrant curry leaves and coconut milk",
    img: "https://images.unsplash.com/photo-1559742811-822873691df8?q=80&w=800&auto=format&fit=crop",
    ctaText: "View Menu",
    ctaUrl: "#",
  },
  {
    tag: "#ArtisanBake",
    titleLine1: "TRUFFLE NAAN",
    titleLine2: "– CHARCOAL OVEN",
    desc: "Crispy puffed leavened bread brushed with pure ghee and black winter truffle",
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop",
    ctaText: "View Menu",
    ctaUrl: "#",
  },
];

export function CoverFlowCarousel({
  items = defaultDishes,
  sectionLabel = "BEST SELLERS",
  autoplay = true,
  autoplayDelay = 5000,
  className = "",
  onBeautyDemoClick,
  onClothesDemoClick,
  onElectronicsDemoClick,
  onBakeryDemoClick,
  onEcommerceDemoClick,
  onLiveDemoClick,
  onCtaClick,
}: CoverFlowCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef(0);
  const total = items.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx % total);
  };

  useEffect(() => {
    if (!autoplay || isHovered || total <= 1) return;
    const interval = setInterval(nextSlide, autoplayDelay);
    return () => clearInterval(interval);
  }, [autoplay, autoplayDelay, isHovered, nextSlide, total]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 45) {
      if (diff < 0) nextSlide();
      else prevSlide();
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <section
      className={`relative w-full min-h-[760px] flex items-center justify-center overflow-hidden py-12 select-none ${className}`}
      style={{
        backgroundColor: "#0c0a09",
        color: "#ffffff",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Ambience - Preloaded and mapped for smooth crossfades */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#0c0a09]">
        <div 
          className="absolute inset-0"
          style={{
            filter: "brightness(0.22) blur(32px)",
            transform: "scale(1.15) translateZ(0)",
            willChange: "transform",
          }}
        >
          {items.map((item, idx) => (
            <img
              key={idx}
              src={item.img}
              alt="ambience background"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                willChange: "opacity",
                opacity: idx === currentIndex ? 1 : 0,
                transition: "opacity 1000ms cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
          ))}
        </div>
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at center, rgba(12,10,9,0.3) 0%, rgba(12,10,9,0.92) 100%)",
          }}
        />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-4 z-10 flex flex-col items-center">
        {/* Eyebrow */}
        {sectionLabel && (
          <div className="flex items-center gap-3 mb-8">
            <span style={{ width: "36px", height: "1px", background: "linear-gradient(90deg, transparent, #c5a880)" }} />
            <h3
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#c5a880",
                margin: 0,
              }}
            >
              {sectionLabel}
            </h3>
            <span style={{ width: "36px", height: "1px", background: "linear-gradient(90deg, #c5a880, transparent)" }} />
          </div>
        )}

        {/* 3D Coverflow Stage */}
        <div
          className="relative w-full h-[520px] flex justify-center items-center mb-8"
          style={{ perspective: "1400px" }}
        >
          {items.map((item, idx) => {
            // Symmetric shortest distance calculation for circular carousel
            let signedDiff = idx - currentIndex;
            if (signedDiff > total / 2) {
              signedDiff -= total;
            } else if (signedDiff < -total / 2) {
              signedDiff += total;
            }

            let transform = "translateX(0px) scale(0.4) rotateY(0deg)";
            let opacity = 0;
            let zIndex = 0;
            let filter = "brightness(0.4) blur(2px)";
            let isCenter = false;

            if (signedDiff === 0) {
              isCenter = true;
              transform = "translateX(0px) scale(1) rotateY(0deg)";
              opacity = 1;
              zIndex = 30;
              filter = "brightness(1)";
            } else if (signedDiff === 1) {
              transform = "translateX(285px) scale(0.84) rotateY(-24deg)";
              opacity = 0.65;
              zIndex = 20;
              filter = "brightness(0.75)";
            } else if (signedDiff === -1) {
              transform = "translateX(-285px) scale(0.84) rotateY(24deg)";
              opacity = 0.65;
              zIndex = 20;
              filter = "brightness(0.75)";
            } else if (signedDiff === 2) {
              transform = "translateX(510px) scale(0.68) rotateY(-38deg)";
              opacity = 0.38;
              zIndex = 10;
              filter = "brightness(0.55) blur(1px)";
            } else if (signedDiff === -2) {
              transform = "translateX(-510px) scale(0.68) rotateY(38deg)";
              opacity = 0.38;
              zIndex = 10;
              filter = "brightness(0.55) blur(1px)";
            }

            const isBeautyCard = Boolean(item.isBeautyDemo);
            const isClothesCard = Boolean(item.isClothesDemo);
            const isElectronicsCard = Boolean(item.isElectronicsDemo);
            const isBakeryCard = Boolean(item.isBakeryDemo);
            const isEcommerceCard = Boolean(item.isEcommerceDemo);
            const isLiveDemoCard = Boolean(item.isLiveDemo);

            return (
              <div
                key={idx}
                onClick={() => {
                  if (isBeautyCard) {
                    if (onBeautyDemoClick) {
                      onBeautyDemoClick(item);
                    } else {
                      const destinationUrl = item.demoUrl || "?demo=beauty";
                      if (destinationUrl && destinationUrl !== "#") {
                        window.open(destinationUrl, "_blank", "noopener,noreferrer");
                      }
                    }
                  } else if (isClothesCard) {
                    if (onClothesDemoClick) {
                      onClothesDemoClick(item);
                    } else {
                      const destinationUrl = item.demoUrl && item.demoUrl !== "[PASTE CLOTHES DEMO URL HERE]" && item.demoUrl !== "#"
                        ? item.demoUrl
                        : "https://clothes-store-demo.web.app";
                      if (destinationUrl) {
                        window.open(destinationUrl, "_blank", "noopener,noreferrer");
                      }
                    }
                  } else if (isElectronicsCard) {
                    if (onElectronicsDemoClick) {
                      onElectronicsDemoClick(item);
                    } else {
                      const destinationUrl = item.demoUrl && item.demoUrl !== "[PASTE ELECTRONIC DEVICES DEMO URL HERE]" && item.demoUrl !== "#"
                        ? item.demoUrl
                        : "https://electronic-devices-demo.web.app";
                      if (destinationUrl) {
                        window.open(destinationUrl, "_blank", "noopener,noreferrer");
                      }
                    }
                  } else if (isBakeryCard) {
                    if (onBakeryDemoClick) {
                      onBakeryDemoClick(item);
                    } else {
                      const rawUrl = item.demoUrl || "[PASTE BAKERY DEMO URL HERE]";
                      const destinationUrl =
                        rawUrl && rawUrl !== "[PASTE BAKERY DEMO URL HERE]" && rawUrl !== "#"
                          ? (rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`)
                          : "https://bakery-patisserie-demo.web.app";
                      if (destinationUrl) {
                        window.open(destinationUrl, "_blank", "noopener,noreferrer");
                      }
                    }
                  } else if (isEcommerceCard) {
                    if (onEcommerceDemoClick) {
                      onEcommerceDemoClick(item);
                    } else {
                      const rawUrl = item.demoUrl || "[PASTE E-COMMERCE DEMO URL HERE]";
                      const destinationUrl =
                        rawUrl && rawUrl !== "[PASTE E-COMMERCE DEMO URL HERE]" && rawUrl !== "#"
                          ? (rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`)
                          : "https://ecommerce-store-demo.web.app";
                      if (destinationUrl) {
                        window.open(destinationUrl, "_blank", "noopener,noreferrer");
                      }
                    }
                  } else if (isLiveDemoCard) {
                    if (onLiveDemoClick) {
                      onLiveDemoClick(item);
                    } else if (item.demoUrl && item.demoUrl !== "#") {
                      window.open(item.demoUrl, "_blank", "noopener,noreferrer");
                    }
                  } else if (!isCenter) {
                    goToSlide(idx);
                  }
                }}
                style={{
                  position: "absolute",
                  width: "330px",
                  height: "500px",
                  borderRadius: "18px",
                  overflow: "hidden",
                  backgroundColor: "#171311",
                  border: isBakeryCard
                    ? isCenter
                      ? "1.5px solid rgba(251, 191, 36, 0.85)"
                      : "1.5px solid rgba(251, 191, 36, 0.35)"
                    : isBeautyCard
                    ? isCenter
                      ? "1.5px solid rgba(244, 214, 186, 0.7)"
                      : "1.5px solid rgba(244, 214, 186, 0.35)"
                    : isClothesCard
                    ? isCenter
                      ? "1.5px solid rgba(255, 255, 255, 0.85)"
                      : "1.5px solid rgba(255, 255, 255, 0.35)"
                    : isElectronicsCard
                    ? isCenter
                      ? "1.5px solid rgba(56, 189, 248, 0.85)"
                      : "1.5px solid rgba(56, 189, 248, 0.35)"
                    : isLiveDemoCard
                    ? "1.5px solid rgba(245, 158, 11, 0.45)"
                    : isCenter
                    ? "1px solid rgba(255, 255, 255, 0.28)"
                    : "1px solid rgba(255, 255, 255, 0.12)",
                  transform,
                  opacity,
                  zIndex,
                  filter,
                  transformOrigin: "center center",
                  transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1), opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), filter 700ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 700ms cubic-bezier(0.16, 1, 0.3, 1), border-color 700ms cubic-bezier(0.16, 1, 0.3, 1)",
                  willChange: "transform, opacity, filter, box-shadow",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  boxShadow: isBakeryCard && isCenter
                    ? "0 25px 60px rgba(0,0,0,0.9), 0 0 40px rgba(251,191,36,0.38)"
                    : isBeautyCard && isCenter
                    ? "0 25px 60px rgba(0,0,0,0.9), 0 0 40px rgba(244,214,186,0.35)"
                    : isClothesCard && isCenter
                    ? "0 25px 60px rgba(0,0,0,0.9), 0 0 40px rgba(255,255,255,0.3)"
                    : isElectronicsCard && isCenter
                    ? "0 25px 60px rgba(0,0,0,0.9), 0 0 40px rgba(56,189,248,0.35)"
                    : isLiveDemoCard && isCenter
                    ? "0 25px 60px rgba(0,0,0,0.9), 0 0 40px rgba(245,158,11,0.35)"
                    : isCenter
                    ? "0 25px 60px rgba(0,0,0,0.9), 0 0 35px rgba(197,168,128,0.25)"
                    : "0 15px 35px rgba(0,0,0,0.5)",
                  cursor: isBakeryCard || isBeautyCard || isClothesCard || isElectronicsCard || isLiveDemoCard ? "pointer" : isCenter ? "default" : "pointer",
                }}
              >
                {/* Photo */}
                <img
                  src={item.img}
                  alt={item.titleLine1 || "Preview"}
                  referrerPolicy="no-referrer"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 500ms ease",
                  }}
                />

                {/* CLOTHES DEMO CARD: High-fashion luxury brand aesthetic, clean typography, NO buttons */}
                {isClothesCard ? (
                  <>
                    {/* Luxury Dark Vignette Overlay */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(180deg, rgba(8,8,10,0.3) 0%, rgba(8,8,10,0.04) 28%, rgba(8,8,10,0.65) 60%, rgba(8,8,10,0.97) 100%)",
                        pointerEvents: "none",
                        zIndex: 10,
                      }}
                    />

                    {/* Content Overlay */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "28px",
                        left: "14px",
                        right: "14px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        zIndex: 20,
                        pointerEvents: "none",
                      }}
                    >
                      {/* Top Category Whisper */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          marginBottom: "4px",
                        }}
                      >
                        <span style={{ color: "#E5E7EB", fontWeight: 700, fontSize: "1.1rem", lineHeight: 1 }}>—</span>
                        <span
                          style={{
                            fontSize: "0.78rem",
                            fontWeight: 700,
                            letterSpacing: "0.22em",
                            color: "#E5E7EB",
                            textTransform: "uppercase",
                            textShadow: "0 2px 8px rgba(0,0,0,0.8)",
                          }}
                        >
                          {item.titleLine1 || "HAUTE COUTURE & STREETWEAR"}
                        </span>
                        <span style={{ color: "#E5E7EB", fontWeight: 700, fontSize: "1.1rem", lineHeight: 1 }}>—</span>
                      </div>

                      {/* Elegant CLOTHES DEMO Title */}
                      <h2
                        style={{
                          fontSize: "1.85rem",
                          fontWeight: 900,
                          letterSpacing: "0.08em",
                          color: "#ffffff",
                          margin: "0",
                          lineHeight: 1.1,
                          textTransform: "uppercase",
                          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
                          textShadow: "0 4px 16px rgba(0,0,0,0.95)",
                        }}
                      >
                        CLOTHES DEMO
                      </h2>

                      {/* Delicate accent divider */}
                      <div
                        style={{
                          width: "52px",
                          height: "2px",
                          backgroundColor: "#E5E7EB",
                          borderRadius: "2px",
                          margin: "8px auto 8px",
                          boxShadow: "0 0 10px rgba(255,255,255,0.6)",
                        }}
                      />

                      {/* Subtitle description */}
                      <p
                        style={{
                          fontSize: "0.82rem",
                          fontStyle: "italic",
                          color: "rgba(255,255,255,0.9)",
                          maxWidth: "280px",
                          margin: 0,
                          lineHeight: 1.3,
                          textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                        }}
                      >
                        {item.desc || "Modern Fashion Collection, Lookbook & Designer Apparel"}
                      </p>

                      <div
                        style={{
                          marginTop: "8px",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: "rgba(216, 180, 254, 0.9)",
                          textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                        }}
                        className="transition-all duration-200 hover:text-purple-300"
                      >
                        CLICK HERE TO SEE DEMO
                      </div>
                    </div>
                  </>
                ) : isBeautyCard ? (
                  <>
                    {/* Luxury Dark Vignette Overlay */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(180deg, rgba(14,10,12,0.25) 0%, rgba(14,10,12,0.05) 30%, rgba(14,10,12,0.65) 60%, rgba(14,10,12,0.96) 100%)",
                        pointerEvents: "none",
                        zIndex: 10,
                      }}
                    />

                    {/* Content Overlay */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "28px",
                        left: "14px",
                        right: "14px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        zIndex: 20,
                        pointerEvents: "none",
                      }}
                    >
                      {/* Top Category Whisper */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          marginBottom: "4px",
                        }}
                      >
                        <span style={{ color: "#F4D4BA", fontWeight: 700, fontSize: "1.1rem", lineHeight: 1 }}>—</span>
                        <span
                          style={{
                            fontSize: "0.8rem",
                            fontWeight: 700,
                            letterSpacing: "0.18em",
                            color: "#F4D4BA",
                            textTransform: "uppercase",
                            textShadow: "0 2px 8px rgba(0,0,0,0.8)",
                          }}
                        >
                          {item.titleLine1 || "LUXURY SALON & SPA"}
                        </span>
                        <span style={{ color: "#F4D4BA", fontWeight: 700, fontSize: "1.1rem", lineHeight: 1 }}>—</span>
                      </div>

                      {/* Subtle BEAUTY DEMO Title */}
                      <h2
                        style={{
                          fontSize: "1.85rem",
                          fontWeight: 900,
                          letterSpacing: "0.06em",
                          color: "#ffffff",
                          margin: "0",
                          lineHeight: 1.1,
                          textTransform: "uppercase",
                          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
                          textShadow: "0 4px 16px rgba(0,0,0,0.95)",
                        }}
                      >
                        BEAUTY DEMO
                      </h2>

                      {/* Delicate accent divider */}
                      <div
                        style={{
                          width: "52px",
                          height: "2px",
                          backgroundColor: "#F4D4BA",
                          borderRadius: "2px",
                          margin: "8px auto 8px",
                          boxShadow: "0 0 10px rgba(244,212,186,0.6)",
                        }}
                      />

                      {/* Subtitle description */}
                      <p
                        style={{
                          fontSize: "0.82rem",
                          fontStyle: "italic",
                          color: "rgba(255,255,255,0.88)",
                          maxWidth: "280px",
                          margin: 0,
                          lineHeight: 1.3,
                          textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                        }}
                      >
                        {item.desc || "Aesthetic Treatments & Wellness Experience"}
                      </p>

                      <div
                        style={{
                          marginTop: "8px",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: "rgba(216, 180, 254, 0.9)",
                          textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                        }}
                        className="transition-all duration-200 hover:text-purple-300"
                      >
                        CLICK HERE TO SEE DEMO
                      </div>
                    </div>
                  </>
                ) : isElectronicsCard ? (
                  <>
                    {/* Futuristic Dark Tech Vignette Overlay */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(180deg, rgba(8,12,24,0.3) 0%, rgba(8,12,24,0.05) 28%, rgba(8,16,30,0.66) 60%, rgba(5,10,20,0.97) 100%)",
                        pointerEvents: "none",
                        zIndex: 10,
                      }}
                    />

                    {/* Content Overlay */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "28px",
                        left: "14px",
                        right: "14px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        zIndex: 20,
                        pointerEvents: "none",
                      }}
                    >
                      {/* Top Category Whisper */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          marginBottom: "4px",
                        }}
                      >
                        <span style={{ color: "#38BDF8", fontWeight: 700, fontSize: "1.1rem", lineHeight: 1 }}>—</span>
                        <span
                          style={{
                            fontSize: "0.78rem",
                            fontWeight: 700,
                            letterSpacing: "0.22em",
                            color: "#38BDF8",
                            textTransform: "uppercase",
                            textShadow: "0 2px 8px rgba(0,0,0,0.8)",
                          }}
                        >
                          {item.titleLine1 || "SMART TECH & GADGETS"}
                        </span>
                        <span style={{ color: "#38BDF8", fontWeight: 700, fontSize: "1.1rem", lineHeight: 1 }}>—</span>
                      </div>

                      {/* Clear Label: ELECTRONIC DEVICES */}
                      <h2
                        style={{
                          fontSize: "1.65rem",
                          fontWeight: 900,
                          letterSpacing: "0.05em",
                          color: "#ffffff",
                          margin: "0",
                          lineHeight: 1.1,
                          textTransform: "uppercase",
                          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
                          textShadow: "0 4px 16px rgba(0,0,0,0.95)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        ELECTRONIC DEVICES
                      </h2>

                      {/* Delicate cyan accent divider */}
                      <div
                        style={{
                          width: "52px",
                          height: "2px",
                          backgroundColor: "#38BDF8",
                          borderRadius: "2px",
                          margin: "8px auto 8px",
                          boxShadow: "0 0 10px rgba(56,189,248,0.7)",
                        }}
                      />

                      {/* Subtitle description */}
                      <p
                        style={{
                          fontSize: "0.82rem",
                          fontStyle: "italic",
                          color: "rgba(255,255,255,0.9)",
                          maxWidth: "280px",
                          margin: 0,
                          lineHeight: 1.3,
                          textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                        }}
                      >
                        {item.desc || "Smartphones, Laptops, 4K Smart TVs, Wearables & Audio"}
                      </p>

                      <div
                        style={{
                          marginTop: "8px",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: "rgba(216, 180, 254, 0.9)",
                          textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                        }}
                        className="transition-all duration-200 hover:text-purple-300"
                      >
                        CLICK HERE TO SEE DEMO
                      </div>
                    </div>
                  </>
                ) : isBakeryCard ? (
                  <>
                    {/* Warm Artisan Bakery Dark Vignette Overlay */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(180deg, rgba(22,14,8,0.28) 0%, rgba(22,14,8,0.05) 28%, rgba(20,12,6,0.66) 60%, rgba(12,7,3,0.97) 100%)",
                        pointerEvents: "none",
                        zIndex: 10,
                      }}
                    />

                    {/* Content Overlay */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "28px",
                        left: "14px",
                        right: "14px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        zIndex: 20,
                        pointerEvents: "none",
                      }}
                    >
                      {/* Top Category Whisper */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          marginBottom: "4px",
                        }}
                      >
                        <span style={{ color: "#FBBF24", fontWeight: 700, fontSize: "1.1rem", lineHeight: 1 }}>—</span>
                        <span
                          style={{
                            fontSize: "0.78rem",
                            fontWeight: 700,
                            letterSpacing: "0.22em",
                            color: "#FBBF24",
                            textTransform: "uppercase",
                            textShadow: "0 2px 8px rgba(0,0,0,0.8)",
                          }}
                        >
                          {item.titleLine1 || "ARTISAN PATISSERIE & BAKEHOUSE"}
                        </span>
                        <span style={{ color: "#FBBF24", fontWeight: 700, fontSize: "1.1rem", lineHeight: 1 }}>—</span>
                      </div>

                      {/* Clear Label: BAKERY DEMO */}
                      <h2
                        style={{
                          fontSize: "1.85rem",
                          fontWeight: 900,
                          letterSpacing: "0.06em",
                          color: "#ffffff",
                          margin: "0",
                          lineHeight: 1.1,
                          textTransform: "uppercase",
                          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
                          textShadow: "0 4px 16px rgba(0,0,0,0.95)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        BAKERY DEMO
                      </h2>

                      {/* Warm Amber Accent Divider */}
                      <div
                        style={{
                          width: "52px",
                          height: "2px",
                          backgroundColor: "#FBBF24",
                          borderRadius: "2px",
                          margin: "8px auto 8px",
                          boxShadow: "0 0 10px rgba(251,191,36,0.7)",
                        }}
                      />

                      {/* Subtitle description */}
                      <p
                        style={{
                          fontSize: "0.82rem",
                          fontStyle: "italic",
                          color: "rgba(255,255,255,0.9)",
                          maxWidth: "280px",
                          margin: 0,
                          lineHeight: 1.3,
                          textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                        }}
                      >
                        {item.desc || "Artisan Breads, French Pastries, Gourmet Cakes & Fresh Baked Goods"}
                      </p>

                      <div
                        style={{
                          marginTop: "8px",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: "rgba(216, 180, 254, 0.9)",
                          textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                        }}
                        className="transition-all duration-200 hover:text-purple-300"
                      >
                        CLICK HERE TO SEE DEMO
                      </div>
                    </div>
                  </>
                ) : isEcommerceCard ? (
                  <>
                    {/* Modern E-Commerce Dark Vignette Overlay */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(180deg, rgba(15,10,25,0.3) 0%, rgba(15,10,25,0.05) 28%, rgba(15,10,25,0.66) 60%, rgba(10,5,20,0.97) 100%)",
                        pointerEvents: "none",
                        zIndex: 10,
                      }}
                    />

                    {/* Content Overlay */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "28px",
                        left: "14px",
                        right: "14px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        zIndex: 20,
                        pointerEvents: "none",
                      }}
                    >
                      {/* Top Category Whisper */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          marginBottom: "4px",
                        }}
                      >
                        <span style={{ color: "#C084FC", fontWeight: 700, fontSize: "1.1rem", lineHeight: 1 }}>—</span>
                        <span
                          style={{
                            fontSize: "0.78rem",
                            fontWeight: 700,
                            letterSpacing: "0.22em",
                            color: "#C084FC",
                            textTransform: "uppercase",
                            textShadow: "0 2px 8px rgba(0,0,0,0.8)",
                          }}
                        >
                          {item.titleLine1 || "ONLINE STORE & PRODUCTS"}
                        </span>
                        <span style={{ color: "#C084FC", fontWeight: 700, fontSize: "1.1rem", lineHeight: 1 }}>—</span>
                      </div>

                      {/* Clear Label: E-COMMERCE DEMO */}
                      <h2
                        style={{
                          fontSize: "1.85rem",
                          fontWeight: 900,
                          letterSpacing: "0.06em",
                          color: "#ffffff",
                          margin: "0",
                          lineHeight: 1.1,
                          textTransform: "uppercase",
                          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
                          textShadow: "0 4px 16px rgba(0,0,0,0.95)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        E-COMMERCE DEMO
                      </h2>

                      {/* Electric Purple Accent Divider */}
                      <div
                        style={{
                          width: "52px",
                          height: "2px",
                          backgroundColor: "#C084FC",
                          borderRadius: "2px",
                          margin: "8px auto 8px",
                          boxShadow: "0 0 10px rgba(192,132,252,0.7)",
                        }}
                      />

                      {/* Subtitle description */}
                      <p
                        style={{
                          fontSize: "0.82rem",
                          fontStyle: "italic",
                          color: "rgba(255,255,255,0.9)",
                          maxWidth: "280px",
                          margin: 0,
                          lineHeight: 1.3,
                          textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                        }}
                      >
                        {item.desc || "Modern online shopping interface, product catalog & cart experience"}
                      </p>

                      <div
                        style={{
                          marginTop: "8px",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: "rgba(216, 180, 254, 0.9)",
                          textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                        }}
                        className="transition-all duration-200 hover:text-purple-300"
                      >
                        CLICK HERE TO SEE DEMO
                      </div>
                    </div>
                  </>
                ) : isLiveDemoCard ? (
                  <>
                    {/* Subtle vignette gradient for contrast */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0.96) 100%)",
                        pointerEvents: "none",
                        zIndex: 10,
                      }}
                    />

                    {/* Graphic Elements matching user poster */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "26px",
                        left: "12px",
                        right: "12px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        zIndex: 20,
                        pointerEvents: "none",
                      }}
                    >
                      {/* - RESTAURANT & STREET FOOD - */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "6px",
                          marginBottom: "2px",
                          width: "100%",
                          maxWidth: "100%",
                        }}
                      >
                        <span style={{ color: "#F59E0B", fontWeight: 900, fontSize: "1.2rem", lineHeight: 1, flexShrink: 0 }}>—</span>
                        <h2
                          style={{
                            fontSize: "1.2rem",
                            fontWeight: 900,
                            letterSpacing: "0.01em",
                            color: "#ffffff",
                            margin: 0,
                            lineHeight: 1.1,
                            fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
                            textTransform: "uppercase",
                            textShadow: "0 4px 16px rgba(0,0,0,0.95)",
                            whiteSpace: "nowrap",
                            textAlign: "center",
                          }}
                        >
                          RESTAURANT & STREET FOOD
                        </h2>
                        <span style={{ color: "#F59E0B", fontWeight: 900, fontSize: "1.2rem", lineHeight: 1, flexShrink: 0 }}>—</span>
                      </div>

                      {/* LIVE DEMO */}
                      <div
                        style={{
                          fontSize: "1.6rem",
                          fontWeight: 900,
                          letterSpacing: "0.08em",
                          color: "#F6C15B",
                          textTransform: "uppercase",
                          lineHeight: 1.1,
                          textShadow: "0 3px 12px rgba(0,0,0,0.9)",
                        }}
                      >
                        LIVE DEMO
                      </div>

                      {/* Golden curved brush underline */}
                      <svg width="126" height="12" viewBox="0 0 126 12" fill="none" style={{ margin: "3px 0 14px 0" }}>
                        <path
                          d="M3 4C38 11 88 11 123 4"
                          stroke="#F6C15B"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                        />
                      </svg>

                      {/* Launch Food Demo button badge */}
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          padding: "10px 24px",
                          borderRadius: "9999px",
                          backgroundColor: "#ECC178",
                          color: "#18110D",
                          fontSize: "0.82rem",
                          fontWeight: 800,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          boxShadow: "0 8px 24px rgba(0,0,0,0.7)",
                        }}
                      >
                        <span>LAUNCH FOOD DEMO</span>
                        <span style={{ fontSize: "1.05rem", fontWeight: 900, lineHeight: 1 }}>→</span>
                      </div>

                      <div
                        style={{
                          marginTop: "8px",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: "rgba(216, 180, 254, 0.9)",
                          textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                        }}
                        className="transition-all duration-200 hover:text-purple-300"
                      >
                        CLICK HERE TO SEE DEMO
                      </div>
                    </div>
                  </>
                ) : (
                  /* Standard Non-Clickable Slider Cards (No buttons, no interactive links) */
                  !item.isPureImage && item.titleLine1 && (
                    <>
                      {/* Dark Vignette Overlay */}
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 25%, rgba(0,0,0,0.68) 60%, rgba(0,0,0,0.96) 100%)",
                          pointerEvents: "none",
                          zIndex: 10,
                        }}
                      />

                      {/* Content Overlay */}
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          height: "100%",
                          padding: "20px 18px 26px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          textAlign: "center",
                          zIndex: 20,
                          opacity: isCenter ? 1 : 0,
                          transform: isCenter ? "translateY(0px)" : "translateY(16px)",
                          transition: "opacity 500ms ease, transform 500ms ease",
                          pointerEvents: "none",
                        }}
                      >
                        {/* Tag */}
                        {item.tag && (
                          <div style={{ textAlign: "right", width: "100%", paddingRight: "4px" }}>
                            <span
                              style={{
                                display: "inline-block",
                                fontSize: "0.78rem",
                                fontWeight: 600,
                                letterSpacing: "0.06em",
                                color: "rgba(255,255,255,0.9)",
                                textShadow: "0 2px 6px rgba(0,0,0,0.8)",
                              }}
                            >
                              {item.tag}
                            </span>
                          </div>
                        )}

                        {/* Body Content - purely informative, no buttons */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "3px",
                            marginTop: "auto",
                            paddingBottom: "8px",
                          }}
                        >
                          <h2
                            style={{
                              fontSize: "1.65rem",
                              fontWeight: 900,
                              textTransform: "uppercase",
                              letterSpacing: "0.04em",
                              color: "#ffffff",
                              margin: 0,
                              lineHeight: 1.1,
                              textShadow: "0 3px 12px rgba(0,0,0,0.95)",
                            }}
                          >
                            {item.titleLine1}
                          </h2>

                          {item.titleLine2 && (
                            <span
                              style={{
                                fontSize: "1.1rem",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "0.06em",
                                color: "#f3f0ea",
                                lineHeight: 1.2,
                                textShadow: "0 3px 10px rgba(0,0,0,0.9)",
                              }}
                            >
                              {item.titleLine2}
                            </span>
                          )}

                          <div
                            style={{
                              width: "34px",
                              height: "2px",
                              backgroundColor: "#c5a880",
                              borderRadius: "2px",
                              margin: "6px auto 6px",
                              boxShadow: "0 0 8px rgba(197,168,128,0.7)",
                            }}
                          />

                          {item.desc && (
                            <p
                              style={{
                                fontSize: "0.82rem",
                                fontStyle: "italic",
                                color: "rgba(255,255,255,0.85)",
                                maxWidth: "280px",
                                margin: "0",
                                lineHeight: 1.3,
                                textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                              }}
                            >
                              {item.desc}
                            </p>
                          )}

                          <div
                            style={{
                              marginTop: "8px",
                              fontSize: "0.7rem",
                              fontWeight: 700,
                              letterSpacing: "0.18em",
                              textTransform: "uppercase",
                              color: "rgba(216, 180, 254, 0.9)",
                              textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                            }}
                            className="transition-all duration-200 hover:text-purple-300"
                          >
                            CLICK HERE TO SEE DEMO
                          </div>
                        </div>
                      </div>
                    </>
                  )
                )}
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          style={{
            position: "absolute",
            left: "24px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            backgroundColor: "rgba(0,0,0,0.55)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(8px)",
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            zIndex: 40,
            transition: "all 200ms ease",
          }}
        >
          <ChevronLeftIcon />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next slide"
          style={{
            position: "absolute",
            right: "24px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            backgroundColor: "rgba(0,0,0,0.55)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(8px)",
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            zIndex: 40,
            transition: "all 200ms ease",
          }}
        >
          <ChevronRightIcon />
        </button>

        {/* Pagination Dots */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", zIndex: 30 }}>
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              style={{
                height: "8px",
                width: idx === currentIndex ? "28px" : "8px",
                borderRadius: "9999px",
                backgroundColor: idx === currentIndex ? "#c5a880" : "rgba(255,255,255,0.25)",
                border: "none",
                cursor: "pointer",
                boxShadow: idx === currentIndex ? "0 0 10px rgba(197,168,128,0.7)" : "none",
                transition: "all 300ms ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export const Component = CoverFlowCarousel;
export default CoverFlowCarousel;
