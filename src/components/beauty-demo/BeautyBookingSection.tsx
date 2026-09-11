import React, { useState, useEffect } from "react";
import { Sparkles, Calendar, Clock, Phone, User, Mail, MapPin, CheckCircle2, Heart, MessageCircle } from "lucide-react";
import { BRIDAL_PACKAGES, BRIDAL_SERVICES } from "@/data/beautyDemoData";

interface BeautyBookingSectionProps {
  preselectedOption?: string;
  onBookingSuccess?: (bookingDetails: any) => void;
}

export function BeautyBookingSection({
  preselectedOption,
  onBookingSuccess,
}: BeautyBookingSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    eventDate: "",
    serviceOrPackage: "Signature Premium Bridal",
    preferredTime: "Morning (6:00 AM - 10:00 AM)",
    venueLocation: "At Venue / Hotel",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  useEffect(() => {
    if (preselectedOption) {
      setFormData((prev) => ({ ...prev, serviceOrPackage: preselectedOption }));
    }
  }, [preselectedOption]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedRef = "BD-" + Math.floor(100000 + Math.random() * 900000);
      setBookingRef(generatedRef);
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (onBookingSuccess) {
        onBookingSuccess({ ...formData, bookingRef: generatedRef });
      }
    }, 800);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: "",
      phone: "",
      email: "",
      eventDate: "",
      serviceOrPackage: "Signature Premium Bridal",
      preferredTime: "Morning (6:00 AM - 10:00 AM)",
      venueLocation: "At Venue / Hotel",
      notes: "",
    });
  };

  return (
    <section id="booking" className="py-20 bg-[#faf6f0] border-t border-[#f0e6dd] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Context & Concierge Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f1dfce] text-[#7d4e32] text-xs font-semibold tracking-widest uppercase">
              <Calendar className="w-3.5 h-3.5 text-[#a8744f]" />
              <span>RESERVE YOUR WEDDING DATE</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-[#231815] font-bold leading-tight">
              Book Your Bridal Consultation
            </h2>

            <p className="text-[#6b5548] text-sm sm:text-base leading-relaxed">
              Dates for the upcoming wedding season fill up quickly. Submit your preferred dates
              below to reserve an exclusive consultation with our Master Bridal Artists.
            </p>

            {/* Quick Benefits */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3 text-xs sm:text-sm text-[#5c473b]">
                <div className="w-5 h-5 rounded-full bg-[#f4e6d8] flex items-center justify-center text-[#8f5e3b] shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>Complimentary 30-minute bridal style & skin assessment</span>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-[#5c473b]">
                <div className="w-5 h-5 rounded-full bg-[#f4e6d8] flex items-center justify-center text-[#8f5e3b] shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>Custom moodboard and lipstick shade matching preview</span>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-[#5c473b]">
                <div className="w-5 h-5 rounded-full bg-[#f4e6d8] flex items-center justify-center text-[#8f5e3b] shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>Dedicated bridal coordinator available via WhatsApp 24/7</span>
              </div>
            </div>

            {/* Concierge Direct Box */}
            <div className="p-6 rounded-2xl bg-white border border-[#ebdcd0] shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#f4e6d8] flex items-center justify-center text-[#8f5e3b]">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#231815] block">
                    Prefer instant chat?
                  </span>
                  <span className="text-xs text-[#7d685b]">
                    WhatsApp our bridal concierge directly:
                  </span>
                </div>
              </div>
              <a
                href="https://wa.me/?text=Hello%20Beauty%20Demo%2C%20I%20would%20like%20to%20inquire%20about%20bridal%20makeup%20packages."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] text-xs font-bold py-2.5 rounded-xl border border-[#25D366]/30 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp (+1 555-382-9000)</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Booking Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#ebdcd0] shadow-[0_10px_40px_rgba(40,25,15,0.06)]">
            {isSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#f4e6d8] text-[#8f5e3b] flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 fill-[#8f5e3b]" />
                </div>

                <span className="inline-block px-3 py-1 rounded-full bg-[#eaf4ea] text-[#2e7d32] text-xs font-bold uppercase tracking-wider">
                  CONSULTATION REQUEST RECEIVED
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#231815]">
                  Thank You, {formData.name || "Lovely Bride"}!
                </h3>

                <p className="text-xs sm:text-sm text-[#614e42] max-w-md mx-auto leading-relaxed">
                  Your bridal consultation request for <strong>{formData.serviceOrPackage}</strong>{" "}
                  has been submitted under Reference #
                  <span className="font-bold text-[#8f5e3b]"> {bookingRef}</span>.
                </p>

                <div className="p-4 rounded-xl bg-[#faf6f0] border border-[#ebdcd0] max-w-sm mx-auto text-left text-xs space-y-1.5 text-[#5e4b40]">
                  <p>
                    <strong>Event Date:</strong> {formData.eventDate || "To be confirmed"}
                  </p>
                  <p>
                    <strong>Slot:</strong> {formData.preferredTime}
                  </p>
                  <p>
                    <strong>Phone:</strong> {formData.phone}
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={`https://wa.me/?text=Hi%20Beauty%20Demo%2C%20my%20consultation%20ref%20is%20${bookingRef}%20for%20${encodeURIComponent(formData.serviceOrPackage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#8f5e3b] hover:bg-[#7a4e2f] text-white text-xs font-bold px-6 py-3 rounded-full shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Confirm via WhatsApp</span>
                  </a>

                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-semibold text-[#664e40] bg-[#f4ebe1] hover:bg-[#ebd8c8]"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#3d2c22] uppercase tracking-wider">
                      Bride's Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#9c8475] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Radhika Verma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#faf6f0] border border-[#ebdcd0] text-sm text-[#231815] focus:outline-none focus:border-[#8f5e3b] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#3d2c22] uppercase tracking-wider">
                      Phone / WhatsApp *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#9c8475] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#faf6f0] border border-[#ebdcd0] text-sm text-[#231815] focus:outline-none focus:border-[#8f5e3b] focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Event Date */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#3d2c22] uppercase tracking-wider">
                      Wedding / Event Date *
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-[#9c8475] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="date"
                        required
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#faf6f0] border border-[#ebdcd0] text-sm text-[#231815] focus:outline-none focus:border-[#8f5e3b] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Service / Package */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#3d2c22] uppercase tracking-wider">
                      Desired Package or Service *
                    </label>
                    <select
                      value={formData.serviceOrPackage}
                      onChange={(e) =>
                        setFormData({ ...formData, serviceOrPackage: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#faf6f0] border border-[#ebdcd0] text-sm text-[#231815] focus:outline-none focus:border-[#8f5e3b] focus:bg-white transition-all"
                    >
                      <optgroup label="Bridal Packages">
                        {BRIDAL_PACKAGES.map((pkg) => (
                          <option key={pkg.id} value={pkg.name}>
                            {pkg.name} ({pkg.price})
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Individual Services">
                        {BRIDAL_SERVICES.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title} ({s.price})
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Preferred Time */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#3d2c22] uppercase tracking-wider">
                      Preferred Ceremony Time *
                    </label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-[#9c8475] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <select
                        value={formData.preferredTime}
                        onChange={(e) =>
                          setFormData({ ...formData, preferredTime: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#faf6f0] border border-[#ebdcd0] text-sm text-[#231815] focus:outline-none focus:border-[#8f5e3b] focus:bg-white transition-all"
                      >
                        <option value="Early Morning (5:00 AM - 8:00 AM)">
                          Early Morning (5:00 AM - 8:00 AM)
                        </option>
                        <option value="Morning (8:00 AM - 12:00 PM)">
                          Morning (8:00 AM - 12:00 PM)
                        </option>
                        <option value="Afternoon (12:00 PM - 4:00 PM)">
                          Afternoon (12:00 PM - 4:00 PM)
                        </option>
                        <option value="Evening (4:00 PM - 8:00 PM)">
                          Evening (4:00 PM - 8:00 PM)
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Venue / Location */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#3d2c22] uppercase tracking-wider">
                      Service Location
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-[#9c8475] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <select
                        value={formData.venueLocation}
                        onChange={(e) =>
                          setFormData({ ...formData, venueLocation: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#faf6f0] border border-[#ebdcd0] text-sm text-[#231815] focus:outline-none focus:border-[#8f5e3b] focus:bg-white transition-all"
                      >
                        <option value="At Venue / Hotel (Travel Team)">
                          On-Venue / Hotel Destination
                        </option>
                        <option value="At Beauty Demo Flagship Studio">
                          At Beauty Demo Flagship Studio
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#3d2c22] uppercase tracking-wider">
                    Additional Details or Outfit Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tell us about your wedding theme, lehenga color, or any skin sensitivities..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-[#faf6f0] border border-[#ebdcd0] text-sm text-[#231815] focus:outline-none focus:border-[#8f5e3b] focus:bg-white transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#8f5e3b] to-[#b37a51] hover:from-[#7a4e2f] hover:to-[#9c6640] text-white font-bold text-xs uppercase tracking-widest shadow-[0_6px_25px_rgba(143,94,59,0.35)] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Confirming Dates...</span>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      <span>Submit Bridal Consultation Request</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
