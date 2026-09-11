import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Cake, Sparkles } from "lucide-react";

export function SweetCrustContactSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [orderMessage, setOrderMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-[#FAF3EC]/60 border-b border-[#F0E6D8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Bakehouse Location, Hours & Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4E6D6] text-[#9C4A1A] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#C67D34]" />
              <span>DIRECT BAKEHOUSE COMMISSIONS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-[#3C2415]">
              Get in Touch & Pre-Order
            </h2>

            <p className="text-sm sm:text-base text-[#6B5341] leading-relaxed">
              Have questions about wedding dessert tables, corporate breakfast catering boxes, or specific dietary requests? Send us your message and our pastry chef will respond within hours.
            </p>

            {/* Info Cards */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-[#EADBCE] shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-[#FAF3EC] text-[#9C4A1A] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A7565]">
                    Visit Our Bakehouse & Cafe
                  </h4>
                  <p className="text-sm font-semibold text-[#3C2415] mt-0.5">
                    42 Artisan Way, Historic Quarter
                  </p>
                  <p className="text-xs text-[#705846]">Corner of Old Mill Road, Bakery Row</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-[#EADBCE] shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-[#FAF3EC] text-[#9C4A1A] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A7565]">
                    Direct Phone Orders
                  </h4>
                  <p className="text-sm font-semibold text-[#3C2415] mt-0.5">
                    +1 (555) 234-BAKE / +1 (555) 234-2253
                  </p>
                  <p className="text-xs text-[#705846]">Available during all baking hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-[#EADBCE] shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-[#FAF3EC] text-[#9C4A1A] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A7565]">
                    Bakehouse Opening Hours
                  </h4>
                  <p className="text-sm font-semibold text-[#3C2415] mt-0.5">
                    Monday – Sunday: 7:00 AM – 9:00 PM
                  </p>
                  <p className="text-xs text-[#705846]">Fresh morning batches out by 7:15 AM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact / Order Form as specified */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADBCE] shadow-lg">
              {submitted ? (
                <div className="text-center py-10 space-y-4 animate-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-serif font-black text-2xl text-[#3C2415]">
                    Thank You, {name || "Friend"}!
                  </h3>
                  <p className="text-sm text-[#6B5341] max-w-md mx-auto leading-relaxed">
                    Your inquiry and order notes have been forwarded to our head baker. We will call you at <strong>{phone}</strong> to confirm scheduling for <strong>{date || "your preferred date"}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName("");
                      setPhone("");
                      setDate("");
                      setOrderMessage("");
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#3C2415] text-white text-xs font-bold hover:bg-[#9C4A1A] transition-colors cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="font-serif font-bold text-2xl text-[#3C2415]">
                      Pre-Order & Custom Inquiry
                    </h3>
                    <p className="text-xs text-[#7A6453] mt-1">
                      Fill out your details below to place a custom order or inquiry.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#3C2415] mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Eleanor Vance"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#DFCBB7] text-xs sm:text-sm text-[#3C2415] bg-white focus:border-[#C67D34] focus:ring-2 focus:ring-[#C67D34]/20 outline-hidden"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#3C2415] mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. (555) 234-8910"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#DFCBB7] text-xs sm:text-sm text-[#3C2415] bg-white focus:border-[#C67D34] focus:ring-2 focus:ring-[#C67D34]/20 outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Preferred Pickup/Delivery Date */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#3C2415] mb-1.5">
                      Preferred Pickup / Delivery Date *
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DFCBB7] text-xs sm:text-sm text-[#3C2415] bg-white focus:border-[#C67D34] focus:ring-2 focus:ring-[#C67D34]/20 outline-hidden"
                    />
                  </div>

                  {/* Order / Message */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#3C2415] mb-1.5">
                      Order Details / Message *
                    </label>
                    <textarea
                      rows={4}
                      value={orderMessage}
                      onChange={(e) => setOrderMessage(e.target.value)}
                      placeholder="Please specify your desired pastries, cakes, quantities, dietary needs, or celebration details..."
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DFCBB7] text-xs sm:text-sm text-[#3C2415] bg-white focus:border-[#C67D34] focus:ring-2 focus:ring-[#C67D34]/20 outline-hidden"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-[#3C2415] text-[#FFFDF9] font-bold text-sm sm:text-base hover:bg-[#9C4A1A] transition-all flex items-center justify-center gap-2 shadow-md shadow-[#3C2415]/15 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-[#FEE6D0]" />
                    <span>Send Inquiry & Order Request</span>
                  </button>

                  <p className="text-[11px] text-[#8A7565] text-center">
                    🔒 We respect your privacy. Your information is strictly used for order fulfillment.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
