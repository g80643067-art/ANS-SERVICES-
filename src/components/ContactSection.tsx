import React, { useState } from "react";
import {
  Phone,
  MessageCircle,
  Instagram,
  Mail,
  Clock,
  MapPin,
  Check,
  Copy,
  Send,
  Sparkles,
  PhoneCall,
  ExternalLink,
} from "lucide-react";

export function ContactSection() {
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phoneOrEmail: "",
    service: "Custom Website",
    message: "",
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedNumber(text);
    setTimeout(() => setCopiedNumber(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    // Also build a WhatsApp link with the submitted details
    const text = `Hi ANX, My name is ${formData.name}. Contact: ${formData.phoneOrEmail}. I am interested in ${formData.service}. Note: ${formData.message}`;
    const waUrl = `https://wa.me/917348382816?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-wider uppercase mb-4">
          <PhoneCall className="w-3.5 h-3.5 text-purple-400" />
          <span>Get In Touch</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-5">
          Let’s Build Something{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-400">
            Extraordinary Together
          </span>
        </h2>
        <p className="text-slate-300 text-base sm:text-lg">
          Reach out directly via phone, WhatsApp, or Instagram. We provide instant quotes and free interactive demo consultations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pointer-events-auto">
        {/* Contact Info & Direct Clickable Channels (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Phone Numbers Card */}
          <div className="rounded-3xl p-6 sm:p-8 bg-slate-950/70 backdrop-blur-2xl border border-purple-500/25 shadow-xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
              <Phone className="w-5 h-5 text-purple-400" />
              <span>Direct Phone Lines</span>
            </h3>

            <div className="space-y-4">
              {/* Number 1 */}
              <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center justify-between gap-3 group hover:border-purple-500/40 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                      Primary Contact
                    </div>
                    <a
                      href="tel:+919219694862"
                      className="text-base font-bold text-white hover:text-purple-300 transition-colors"
                    >
                      +91 9219694862
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => copyToClipboard("+919219694862")}
                    className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
                    title="Copy number"
                  >
                    {copiedNumber === "+919219694862" ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <a
                    href="tel:+919219694862"
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white transition-colors"
                  >
                    Call
                  </a>
                </div>
              </div>

              {/* Number 2 */}
              <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center justify-between gap-3 group hover:border-purple-500/40 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                      Direct / WhatsApp
                    </div>
                    <a
                      href="tel:+917348382816"
                      className="text-base font-bold text-white hover:text-blue-300 transition-colors"
                    >
                      +91 7348382816
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => copyToClipboard("+917348382816")}
                    className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
                    title="Copy number"
                  >
                    {copiedNumber === "+917348382816" ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <a
                    href="tel:+917348382816"
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                  >
                    Call
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Clickable Quick Channels (WhatsApp & Instagram) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* WhatsApp Card */}
            <a
              href="https://wa.me/917348382816?text=Hi%20ANX,%20I%20would%20like%20to%20get%20a%20website%20developed."
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-3xl bg-slate-950/70 backdrop-blur-2xl border border-emerald-500/30 hover:border-emerald-400/60 shadow-lg hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-emerald-300 px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-800">
                  Instant Reply
                </span>
              </div>
              <div>
                <h4 className="font-bold text-white text-base group-hover:text-emerald-300 transition-colors">
                  WhatsApp
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Chat directly with lead engineers
                </p>
              </div>
              <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 group-hover:underline">
                <span>Start Chat</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </a>

            {/* Instagram Card */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-3xl bg-slate-950/70 backdrop-blur-2xl border border-pink-500/30 hover:border-pink-400/60 shadow-lg hover:shadow-[0_0_25px_rgba(236,72,153,0.25)] transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-11 h-11 rounded-xl bg-pink-950/80 border border-pink-500/40 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                  <Instagram className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-pink-300 px-2 py-0.5 rounded-full bg-pink-950 border border-pink-800">
                  Social
                </span>
              </div>
              <div>
                <h4 className="font-bold text-white text-base group-hover:text-pink-300 transition-colors">
                  Instagram
                </h4>
                <p className="text-xs text-slate-400 mt-0.5 font-mono">
                  [MY INSTAGRAM HANDLE]
                </p>
              </div>
              <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-pink-400 group-hover:underline">
                <span>Follow & DM</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </a>
          </div>
        </div>

        {/* Quick Inquiry Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl p-6 sm:p-10 bg-slate-950/75 backdrop-blur-2xl border border-purple-500/25 shadow-2xl">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Send Us A Project Inquiry
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mb-6">
              Fill in your requirements and we will prepare a personalized budget breakdown and free demo concept for you.
            </p>

            {formSubmitted ? (
              <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Inquiry Received!</h4>
                <p className="text-sm text-slate-300 max-w-sm">
                  We have also opened WhatsApp to directly confirm your request. You can also call us directly at{" "}
                  <span className="text-white font-bold">+91 7348382816</span>.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-2 text-xs text-purple-400 hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Nitish Sharma"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700/80 focus:border-purple-500 focus:outline-none text-white text-sm placeholder-slate-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Phone Number / WhatsApp *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.phoneOrEmail}
                      onChange={(e) => setFormData({ ...formData, phoneOrEmail: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700/80 focus:border-purple-500 focus:outline-none text-white text-sm placeholder-slate-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Selected Service
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700/80 focus:border-purple-500 focus:outline-none text-white text-sm transition-colors"
                  >
                    <option value="Business Website">Business Website</option>
                    <option value="3D & Premium Website">3D & Premium Website</option>
                    <option value="Custom Website">Custom Website (According to Needs)</option>
                    <option value="Budget Friendly Package">Budget Friendly Package</option>
                    <option value="Free Demo Consultation">Free Demo Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Tell us about your requirements (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your business, reference websites you like, budget expectations..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700/80 focus:border-purple-500 focus:outline-none text-white text-sm placeholder-slate-500 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.7)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry & Open WhatsApp</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
