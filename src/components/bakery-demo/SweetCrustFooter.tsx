import React, { useState } from "react";
import { Cake, Heart, Instagram, Facebook, Send, CheckCircle2, ChevronDown, ChevronUp, Shield, Truck, HelpCircle } from "lucide-react";

interface SweetCrustFooterProps {
  onNavigateSection: (id: string) => void;
  onBackToAgency?: () => void;
}

export function SweetCrustFooter({ onNavigateSection, onBackToAgency }: SweetCrustFooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [deliveryModalOpen, setDeliveryModalOpen] = useState(false);

  const faqs = [
    {
      q: "How far in advance should I order custom celebration cakes?",
      a: "We recommend placing custom celebration cake orders at least 48 hours in advance so our head pastry chefs can handcraft decorations, ganache tiers, and personalized inscriptions.",
    },
    {
      q: "Do you offer eggless, gluten-free, or vegan options?",
      a: "Yes! We bake dedicated batches of eggless chocolate truffle cakes, gluten-free almond macarons, and vegan wild sourdough boules daily in separate preparation areas.",
    },
    {
      q: "How does local doorstep delivery work?",
      a: "We deliver across the metropolitan area twice daily (Morning batch 8:00 AM - 10:00 AM and Afternoon batch 2:00 PM - 4:00 PM) in insulated, temperature-controlled cake carriers.",
    },
    {
      q: "What is the shelf life of your sourdough breads and croissants?",
      a: "Because we use zero chemical dough conditioners or preservatives, croissants are best enjoyed on the day of baking (or reheated at 350°F for 3 mins). Our sourdough boules stay fresh for 4–5 days.",
    },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#2D1B10] text-[#D8C7B5] border-t border-[#4A2D19] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Row: Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-[#442918] items-center">
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#E6A15C] to-[#C67D34] text-[#3C2415] flex items-center justify-center shadow-md">
                <Cake className="w-5 h-5" />
              </div>
              <span className="font-serif font-black text-2xl text-white tracking-tight">
                SWEET CRUST
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#B8A392] max-w-md leading-relaxed font-sans">
              Handcrafted artisan patisserie and slow-fermented bakehouse. Freshly baked every day with French Normandy butter, 100% natural stoneground grain, and authentic love.
            </p>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-6 bg-[#20130B] p-6 rounded-3xl border border-[#482B17]">
            <h4 className="font-serif font-bold text-base text-white mb-1">
              Join Our Sweet Circle • Enjoy 15% Off
            </h4>
            <p className="text-xs text-[#A89382] mb-3">
              Receive secret weekend pastry drops, seasonal fruit tart menus, and VIP celebration cake promos.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold py-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>You're subscribed! Use code SWEET20 on your next order.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="w-full bg-[#2D1B10] text-xs text-white placeholder-[#7A6453] px-3.5 py-2.5 rounded-xl border border-[#52331E] outline-hidden focus:border-[#E6A15C]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C67D34] to-[#9C4A1A] text-white font-bold text-xs hover:brightness-110 shrink-0 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>Join</span>
                  <Send className="w-3 h-3" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle Row: Links Columns as specified in prompt */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 text-xs">
          {/* Column 1: Menu */}
          <div>
            <h5 className="font-serif font-bold text-sm text-white uppercase tracking-wider mb-4">
              Bakehouse Menu
            </h5>
            <ul className="space-y-2 text-[#B8A392]">
              <li>
                <button onClick={() => onNavigateSection("best-sellers")} className="hover:text-[#E6A15C] transition-colors cursor-pointer">
                  Chocolate Truffle Cake
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection("best-sellers")} className="hover:text-[#E6A15C] transition-colors cursor-pointer">
                  Red Velvet Cake
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection("best-sellers")} className="hover:text-[#E6A15C] transition-colors cursor-pointer">
                  French Butter Croissant
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection("best-sellers")} className="hover:text-[#E6A15C] transition-colors cursor-pointer">
                  Artisan Sourdough Loaf
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection("best-sellers")} className="hover:text-[#E6A15C] transition-colors cursor-pointer">
                  Blueberry Cheesecake
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection("best-sellers")} className="hover:text-[#E6A15C] transition-colors cursor-pointer">
                  Garlic Confit Bread
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Custom & Special */}
          <div>
            <h5 className="font-serif font-bold text-sm text-white uppercase tracking-wider mb-4">
              Celebrations
            </h5>
            <ul className="space-y-2 text-[#B8A392]">
              <li>
                <button onClick={() => onNavigateSection("custom-cakes")} className="hover:text-[#E6A15C] transition-colors cursor-pointer">
                  Custom Birthday Cakes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection("custom-cakes")} className="hover:text-[#E6A15C] transition-colors cursor-pointer">
                  Tiered Wedding Cakes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection("special-offers")} className="hover:text-[#E6A15C] transition-colors cursor-pointer">
                  Morning Baker's Feast
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection("special-offers")} className="hover:text-[#E6A15C] transition-colors cursor-pointer">
                  Special Daily Offers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection("gallery")} className="hover:text-[#E6A15C] transition-colors cursor-pointer">
                  Bakehouse Visual Gallery
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: About & Story */}
          <div>
            <h5 className="font-serif font-bold text-sm text-white uppercase tracking-wider mb-4">
              About Us
            </h5>
            <ul className="space-y-2 text-[#B8A392]">
              <li>
                <button onClick={() => onNavigateSection("about-us")} className="hover:text-[#E6A15C] transition-colors cursor-pointer">
                  Our Heritage & Bakers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection("about-us")} className="hover:text-[#E6A15C] transition-colors cursor-pointer">
                  100% Normandy Butter
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection("about-us")} className="hover:text-[#E6A15C] transition-colors cursor-pointer">
                  48-Hour Wild Sourdough
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection("contact")} className="hover:text-[#E6A15C] transition-colors cursor-pointer">
                  Store Hours & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Delivery & Policies */}
          <div>
            <h5 className="font-serif font-bold text-sm text-white uppercase tracking-wider mb-4">
              Customer Care
            </h5>
            <ul className="space-y-2 text-[#B8A392]">
              <li>
                <button onClick={() => setDeliveryModalOpen(true)} className="hover:text-[#E6A15C] transition-colors cursor-pointer flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5" />
                  <span>Delivery Information</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection("contact")} className="hover:text-[#E6A15C] transition-colors cursor-pointer">
                  Contact & Pre-Orders
                </button>
              </li>
              <li>
                <button onClick={() => setPrivacyModalOpen(true)} className="hover:text-[#E6A15C] transition-colors cursor-pointer flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Privacy Policy</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Social & Contacts */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-3">
            <h5 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Connect With Us
            </h5>
            <p className="text-xs text-[#A89382]">
              Follow our daily 5:00 AM baking stories on Instagram & Facebook.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#3C2415] hover:bg-[#E6A15C] hover:text-[#3C2415] text-[#D8C7B5] flex items-center justify-center transition-all cursor-pointer shadow-xs"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#3C2415] hover:bg-[#E6A15C] hover:text-[#3C2415] text-[#D8C7B5] flex items-center justify-center transition-all cursor-pointer shadow-xs"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
            <div className="text-[11px] text-[#A89382] pt-2 space-y-1">
              <p>📍 42 Artisan Way, Historic Quarter</p>
              <p>📞 +1 (555) 234-BAKE</p>
            </div>
          </div>
        </div>

        {/* Interactive FAQ Section as requested */}
        <div className="pt-8 border-t border-[#442918]">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="w-4 h-4 text-[#E6A15C]" />
            <h4 className="font-serif font-bold text-base text-white">
              Frequently Asked Questions (FAQ)
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-[#22140B] border border-[#442918] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-3.5 text-left flex items-center justify-between gap-2 text-xs font-semibold text-white hover:text-[#E6A15C] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#E6A15C] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#8A7565] shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-3.5 pb-3.5 text-xs text-[#B8A392] leading-relaxed border-t border-[#331C0E] pt-2">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-[#442918] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8A7565] gap-4">
          <p>© {new Date().getFullYear()} SWEET CRUST Bakehouse & Patisserie. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 text-[#A89382]">
            <button
              onClick={() => {
                if (onBackToAgency) {
                  onBackToAgency();
                } else {
                  window.location.href = window.location.origin + window.location.pathname;
                }
              }}
              className="text-[#E6A15C] hover:text-white font-bold underline transition-colors cursor-pointer"
            >
              ← Back to ANX Site
            </button>
            <span>•</span>
            <button onClick={() => setPrivacyModalOpen(true)} className="hover:text-white">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => setDeliveryModalOpen(true)} className="hover:text-white">
              Delivery Terms
            </button>
            <span>•</span>
            <span className="text-[#E6A15C]">Portfolio Demo Store</span>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      {privacyModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-[#FFFDF9] text-[#3C2415] rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#EADBCE] shadow-2xl space-y-4 max-h-[80vh] overflow-y-auto">
            <h3 className="font-serif font-black text-2xl text-[#3C2415]">
              Privacy & Customer Data Policy
            </h3>
            <div className="text-xs text-[#6B5341] space-y-2 leading-relaxed">
              <p>
                At <strong>Sweet Crust Bakehouse</strong>, customer trust is as fundamental as the quality of our French butter. We are committed to safeguarding your personal information.
              </p>
              <p>
                <strong>Information Collected:</strong> We only collect contact names, delivery addresses, and phone numbers purely for the fulfillment of orders and personalized cake inquiries.
              </p>
              <p>
                <strong>No Third-Party Sharing:</strong> We never sell, rent, or trade customer contact details with external advertisers or third parties.
              </p>
              <p>
                <strong>Demo Store Notice:</strong> This website is an interactive portfolio demo. No live financial transactions are processed.
              </p>
            </div>
            <button
              onClick={() => setPrivacyModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-[#3C2415] text-white font-bold text-xs hover:bg-[#9C4A1A] transition-colors cursor-pointer"
            >
              Understood & Close
            </button>
          </div>
        </div>
      )}

      {/* Delivery Info Modal */}
      {deliveryModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-[#FFFDF9] text-[#3C2415] rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#EADBCE] shadow-2xl space-y-4 max-h-[80vh] overflow-y-auto">
            <h3 className="font-serif font-black text-2xl text-[#3C2415]">
              Fresh Bakehouse Delivery Guidelines
            </h3>
            <div className="text-xs text-[#6B5341] space-y-2.5 leading-relaxed">
              <p>
                <strong>Temperature Controlled Safe Transit:</strong> All tiered celebration cakes and delicate cream pastries are transported in custom shock-absorbing, refrigerated carriers.
              </p>
              <p>
                <strong>Free Delivery:</strong> Orders exceeding $35 qualify for complimentary doorstep delivery within a 12-mile radius of our Historic Quarter bakehouse.
              </p>
              <p>
                <strong>Daily Delivery Windows:</strong>
                <br />• Morning Oven Run: 8:00 AM – 10:00 AM
                <br />• Afternoon Tea Run: 2:00 PM – 4:00 PM
              </p>
            </div>
            <button
              onClick={() => setDeliveryModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-[#3C2415] text-white font-bold text-xs hover:bg-[#9C4A1A] transition-colors cursor-pointer"
            >
              Close Delivery Terms
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
