import React, { useState } from "react";
import { Sparkles, Send, Check, Phone, Mail, MapPin, MessageCircle, Calendar } from "lucide-react";

export function NovaContactSection() {
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    phone: "",
    serviceType: "Private Atelier Fitting",
    location: "Milan Flagship",
    preferredDate: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({
        fullName: "",
        email: "",
        phone: "",
        serviceType: "Private Atelier Fitting",
        location: "Milan Flagship",
        preferredDate: "",
        message: "",
      });
    }, 4000);
  };

  return (
    <section id="nova-contact" className="py-24 bg-[#09090b] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Boutique Information & Concierge */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold flex items-center gap-1.5 mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                VIP Services
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-wide font-light leading-tight">
                PRIVATE STYLING & <br />
                <span className="italic font-normal text-amber-300">BESPOKE CONCIERGE</span>
              </h2>
              <p className="mt-4 text-zinc-300 text-sm sm:text-base font-light leading-relaxed">
                Whether you desire a private atelier appointment with our head tailor, made-to-measure bridal attire, or personalized wardrobe curation, our concierge team is at your disposal.
              </p>

              {/* Direct Quick WhatsApp Action */}
              <div className="mt-8 p-5 rounded-2xl bg-zinc-950 border border-amber-400/20 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Instant WhatsApp Stylist
                    </h4>
                    <p className="text-[11px] text-zinc-400">
                      Live styling assistance & fit recommendations
                    </p>
                  </div>
                </div>

                <a
                  href="https://wa.me/?text=Hello%20Nova%20Wear%20Concierge%2C%20I%20would%20like%20to%20inquire%20about%20a%20private%20bespoke%20fitting."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat With Atelier Concierge</span>
                </a>
              </div>

              {/* Boutique Locations */}
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                  <div>
                    <h5 className="text-xs font-bold text-white uppercase tracking-wider">Milan Flagship</h5>
                    <p className="text-xs text-zinc-400 font-light">Via Monte Napoleone 14, 20121 Milano, Italy</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                  <div>
                    <h5 className="text-xs font-bold text-white uppercase tracking-wider">New York Showroom</h5>
                    <p className="text-xs text-zinc-400 font-light">740 Fifth Avenue, Manhattan, NY 10019</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                  <div>
                    <h5 className="text-xs font-bold text-white uppercase tracking-wider">New Delhi Atelier</h5>
                    <p className="text-xs text-zinc-400 font-light">The Chanakya, Chanakyapuri, New Delhi 110021</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 mt-8 flex items-center gap-6 text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                concierge@novawear.luxury
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                +1 (800) 840-NOVA
              </span>
            </div>
          </div>

          {/* Right Column: Appointment Form */}
          <div className="lg:col-span-7 bg-zinc-950/80 rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl">
            <h3 className="text-2xl font-serif text-white mb-2">Book a Private Appointment</h3>
            <p className="text-xs sm:text-sm text-zinc-400 mb-8 font-light">
              Fill out the details below and our personal stylist will confirm your private fitting within 4 hours.
            </p>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-500/10 border border-emerald-500/30 rounded-2xl animate-in zoom-in-95 duration-200">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-serif text-white font-medium">
                  Appointment Request Received
                </h4>
                <p className="text-xs text-zinc-300 mt-2 max-w-sm mx-auto leading-relaxed">
                  Thank you, {formState.fullName || "valued client"}. Our senior atelier concierge will reach out via WhatsApp & Email to coordinate your private session.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-zinc-400 font-semibold mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.fullName}
                      onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                      placeholder="Lord / Lady / Mr. / Ms."
                      className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-zinc-400 font-semibold mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="client@domain.com"
                      className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-zinc-400 font-semibold mb-1.5">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-zinc-400 font-semibold mb-1.5">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={formState.preferredDate}
                      onChange={(e) => setFormState({ ...formState, preferredDate: e.target.value })}
                      className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-amber-400 transition-colors cursor-pointer"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-zinc-400 font-semibold mb-1.5">
                      Consultation Service
                    </label>
                    <select
                      value={formState.serviceType}
                      onChange={(e) => setFormState({ ...formState, serviceType: e.target.value })}
                      className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-amber-400 transition-colors cursor-pointer"
                    >
                      <option value="Private Atelier Fitting">Private Atelier Fitting</option>
                      <option value="Bespoke Suit & Sherwani Tailoring">Bespoke Suit & Sherwani Tailoring</option>
                      <option value="Bridal Couture & Saree Consultation">Bridal Couture & Saree Consultation</option>
                      <option value="Personal Stylist Wardrobe Curation">Personal Stylist Wardrobe Curation</option>
                      <option value="Virtual Concierge Consultation">Virtual Concierge Consultation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-zinc-400 font-semibold mb-1.5">
                      Showroom Destination
                    </label>
                    <select
                      value={formState.location}
                      onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                      className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-amber-400 transition-colors cursor-pointer"
                    >
                      <option value="Milan Flagship">Milan Flagship (Via Monte Napoleone)</option>
                      <option value="New York Showroom">New York (Fifth Avenue)</option>
                      <option value="New Delhi Atelier">New Delhi Atelier (The Chanakya)</option>
                      <option value="Virtual Video Consultation">Virtual Video Consultation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-zinc-400 font-semibold mb-1.5">
                    Styling Preferences / Specific Garment IDs
                  </label>
                  <textarea
                    rows={3}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell us about the occasion, sizes, or pieces you wish to try..."
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-amber-400 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(245,158,11,0.3)] flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Confirm Appointment Request</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
