import React, { useState } from "react";
import { Cake, Sparkles, Calendar, CheckCircle2, Heart, Award } from "lucide-react";

export function SweetCrustCustomCakes() {
  const [flavor, setFlavor] = useState("Belgian Dark Chocolate Ganache");
  const [size, setSize] = useState("1.0 kg (Serves 8-12)");
  const [dietary, setDietary] = useState("Eggless Available");
  const [occasion, setOccasion] = useState("Birthday Celebration");
  const [message, setMessage] = useState("Happy Birthday Sophia! ✨");
  const [date, setDate] = useState("2026-09-18");
  const [deliveryType, setDeliveryType] = useState<"pickup" | "delivery">("pickup");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const flavorsList = [
    { name: "Belgian Dark Chocolate Ganache", basePrice: 42 },
    { name: "Red Velvet Cream Cheese", basePrice: 40 },
    { name: "Madagascar Vanilla Bean & Fresh Berries", basePrice: 38 },
    { name: "Salted Caramel Speculoos Crunch", basePrice: 44 },
    { name: "Sicilian Pistachio & Raspberry", basePrice: 48 },
    { name: "Mango Passionfruit Summer Gateau", basePrice: 42 },
  ];

  const sizesList = [
    { name: "0.5 kg (Serves 4-6)", multiplier: 0.8 },
    { name: "1.0 kg (Serves 8-12)", multiplier: 1.0 },
    { name: "2.0 kg (2-Tier, Serves 18-24)", multiplier: 1.9 },
    { name: "3.5 kg (3-Tier Grand, Serves 35+)", multiplier: 3.2 },
  ];

  const selectedFlavorObj = flavorsList.find((f) => f.name === flavor) || flavorsList[0];
  const selectedSizeObj = sizesList.find((s) => s.name === size) || sizesList[1];
  const estimatedPrice = Math.round(selectedFlavorObj.basePrice * selectedSizeObj.multiplier);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section id="custom-cakes" className="py-16 bg-[#FFFDF9] border-b border-[#F0E6D8] relative overflow-hidden">
      {/* Ambient background blur */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#C67D34]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#9C4A1A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4E6D6] text-[#9C4A1A] text-xs font-bold uppercase tracking-wider mb-2">
            <Cake className="w-3.5 h-3.5 text-[#C67D34]" />
            <span>BESPOKE PATISSERIE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-[#3C2415]">
            MAKE YOUR CELEBRATION SPECIAL
          </h2>
          <div className="w-20 h-1 bg-[#C67D34] rounded-full mx-auto mt-3 mb-4" />
          <p className="text-sm sm:text-base text-[#6B5341]">
            Custom artisan cakes crafted for birthdays, anniversaries, baby showers, and grand weddings. Hand-decorated by our master cake designers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Live Custom Cake Visualizer Card */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="rounded-3xl overflow-hidden border-2 border-[#EADBCE] bg-white p-6 shadow-xl relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#9C4A1A]">
                  LIVE CAKE PREVIEW
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#FAF3EC] text-[#5A4333] font-semibold border border-[#EADBCE]">
                  {size.split("(")[0].trim()}
                </span>
              </div>

              {/* Visual Cake Canvas Display */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-b from-[#FAF3EC] to-[#F0E6D8] border border-[#E6D8C8] flex flex-col items-center justify-center p-6 shadow-inner">
                {/* Cake Centerpiece Illustration / Image */}
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden shadow-2xl border-4 border-white mb-4 transition-all duration-500 hover:scale-105">
                  <img
                    src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop"
                    alt="Custom Cake Preview"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  
                  {/* Floating Cake Sparkle */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-amber-500 shadow-md">
                    <Sparkles className="w-4 h-4 fill-amber-400" />
                  </div>
                </div>

                {/* Cake Plaque Inscription Preview */}
                <div className="w-full max-w-xs text-center py-2.5 px-4 rounded-xl bg-white/95 border border-[#DFCBB7] shadow-md backdrop-blur-xs">
                  <p className="text-[10px] font-bold text-[#8A7565] uppercase tracking-wider">
                    Piped Plaque Inscription:
                  </p>
                  <p className="font-serif italic text-base sm:text-lg font-bold text-[#9C4A1A] mt-0.5 break-words">
                    "{message || "Your custom message here..."}"
                  </p>
                </div>
              </div>

              {/* Order Summary & Pricing Meter */}
              <div className="mt-5 pt-4 border-t border-[#F0E6D8] space-y-2">
                <div className="flex justify-between text-xs text-[#6B5341]">
                  <span>Flavor Selected:</span>
                  <span className="font-bold text-[#3C2415] text-right">{flavor}</span>
                </div>
                <div className="flex justify-between text-xs text-[#6B5341]">
                  <span>Tier & Servings:</span>
                  <span className="font-semibold text-[#3C2415]">{size}</span>
                </div>
                <div className="flex justify-between text-xs text-[#6B5341]">
                  <span>Dietary Preference:</span>
                  <span className="font-semibold text-[#3C2415]">{dietary}</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-dashed border-[#EADBCE]">
                  <div>
                    <span className="text-xs font-bold text-[#8A7565] block">Estimated Total:</span>
                    <span className="text-[10px] text-emerald-700 font-semibold">Includes handmade decor & candle</span>
                  </div>
                  <div className="text-2xl font-black text-[#9C4A1A]">
                    ${estimatedPrice}.00
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Configuration Form */}
          <div className="lg:col-span-7">
            {isSubmitted ? (
              <div className="rounded-3xl bg-emerald-50 border-2 border-emerald-300 p-8 text-center space-y-4 shadow-lg animate-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-serif font-black text-emerald-950">
                  Custom Cake Inquiry Reserved!
                </h3>
                <p className="text-sm text-emerald-800 max-w-md mx-auto">
                  Thank you, <strong>{customerName || "Friend"}</strong>! Our head cake designer will review your <strong>{flavor}</strong> custom cake for <strong>{date}</strong> and call you within 2 hours to confirm your custom design nuances.
                </p>
                <div className="p-4 rounded-xl bg-white/80 border border-emerald-200 text-xs text-emerald-900 inline-block text-left">
                  <p><strong>Reservation Code:</strong> #SC-CAKE-{Math.floor(10000 + Math.random() * 90000)}</p>
                  <p><strong>Estimated Quote:</strong> ${estimatedPrice}.00</p>
                  <p><strong>Piped Message:</strong> "{message}"</p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2.5 rounded-full bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800 transition-colors cursor-pointer"
                  >
                    Configure Another Cake
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADBCE] shadow-sm space-y-6">
                {/* 1. Flavor Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#3C2415] mb-2.5">
                    1. Select Cake Flavor & Filling
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {flavorsList.map((f) => (
                      <button
                        type="button"
                        key={f.name}
                        onClick={() => setFlavor(f.name)}
                        className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                          flavor === f.name
                            ? "border-[#9C4A1A] bg-[#FAF3EC] text-[#3C2415] ring-1 ring-[#9C4A1A]"
                            : "border-[#EADBCE] text-[#5A4333] hover:border-[#C67D34]"
                        }`}
                      >
                        <p className="text-xs font-bold">{f.name}</p>
                        <p className="text-[10px] text-[#8A7565] mt-0.5">Base from ${f.basePrice}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Size & Tiers */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#3C2415] mb-2.5">
                    2. Select Size & Tiers
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {sizesList.map((s) => (
                      <button
                        type="button"
                        key={s.name}
                        onClick={() => setSize(s.name)}
                        className={`p-2.5 rounded-xl text-center border transition-all cursor-pointer ${
                          size === s.name
                            ? "border-[#9C4A1A] bg-[#FAF3EC] text-[#3C2415] font-bold ring-1 ring-[#9C4A1A]"
                            : "border-[#EADBCE] text-[#5A4333] hover:border-[#C67D34]"
                        }`}
                      >
                        <p className="text-xs font-bold">{s.name.split("(")[0]}</p>
                        <p className="text-[10px] text-[#8A7565]">({s.name.split("(")[1]}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Message on Cake */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#3C2415] mb-1.5">
                    3. Personalized Message On Cake (Live Piped Plaque)
                  </label>
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={50}
                    placeholder="e.g. Happy 30th Birthday Emma!"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DFCBB7] text-sm text-[#3C2415] focus:ring-2 focus:ring-[#C67D34]/20 focus:border-[#C67D34] outline-hidden font-medium"
                  />
                  <p className="text-[11px] text-[#8A7565] mt-1">
                    Up to 50 characters hand-piped in dark chocolate or gold luster.
                  </p>
                </div>

                {/* 4. Dietary & Occasion */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#3C2415] mb-1.5">
                      Dietary Option
                    </label>
                    <select
                      value={dietary}
                      onChange={(e) => setDietary(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#DFCBB7] text-xs font-medium text-[#3C2415] bg-white outline-hidden focus:border-[#C67D34]"
                    >
                      <option>100% Butter Standard</option>
                      <option>Eggless Available</option>
                      <option>Gluten-Free Sponge</option>
                      <option>Vegan Organic</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#3C2415] mb-1.5">
                      Occasion
                    </label>
                    <select
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#DFCBB7] text-xs font-medium text-[#3C2415] bg-white outline-hidden focus:border-[#C67D34]"
                    >
                      <option>Birthday Celebration</option>
                      <option>Wedding & Reception</option>
                      <option>Anniversary Special</option>
                      <option>Baby Shower / Gender Reveal</option>
                      <option>Graduation / Corporate</option>
                    </select>
                  </div>
                </div>

                {/* 5. Date & Contact info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#3C2415] mb-1.5">
                      Required Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-xl border border-[#DFCBB7] text-xs text-[#3C2415] outline-hidden focus:border-[#C67D34]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#3C2415] mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sarah Jenkins"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-xl border border-[#DFCBB7] text-xs text-[#3C2415] outline-hidden focus:border-[#C67D34]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#3C2415] mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. (555) 345-6789"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-xl border border-[#DFCBB7] text-xs text-[#3C2415] outline-hidden focus:border-[#C67D34]"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-[#3C2415] text-[#FFFDF9] font-bold text-sm sm:text-base hover:bg-[#9C4A1A] transition-all shadow-md shadow-[#3C2415]/15 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Cake className="w-5 h-5 text-[#FEE6D0]" />
                  <span>Reserve Custom Cake & Request Quote (${estimatedPrice}.00)</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
