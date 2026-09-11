import React, { useState, useEffect } from "react";
import {
  X,
  Sparkles,
  CheckCircle,
  Phone,
  MessageCircle,
  ArrowRight,
  Shield,
  Layers,
} from "lucide-react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export function DemoModal({ isOpen, onClose, preselectedService }: DemoModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(preselectedService || "Business Websites");
  const [budget, setBudget] = useState("Under ₹15,000 / Flexible");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
    }
  }, [preselectedService]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // WhatsApp auto-dispatch
    const text = `Hi ANX! I requested a Free Demo.\nName: ${name}\nPhone: ${phone}\nService: ${service}\nBudget Range: ${budget}`;
    const waUrl = `https://wa.me/917348382816?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md pointer-events-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl p-6 sm:p-8 bg-slate-950/95 border border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.3)]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-emerald-500 p-0.5 mb-4">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-emerald-400">
                <CheckCircle className="w-8 h-8" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Free Demo Requested!</h3>
            <p className="text-slate-300 text-sm mb-6 max-w-xs">
              Thank you {name || "there"}. We are preparing an interactive live demo concept tailored to your requirements.
            </p>

            <div className="w-full p-4 rounded-2xl bg-slate-900/90 border border-purple-500/20 mb-6 flex flex-col gap-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Direct Call:</span>
                <a href="tel:+917348382816" className="text-purple-300 font-bold">
                  +91 7348382816
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">WhatsApp:</span>
                <span className="text-emerald-400 font-bold">Connected</span>
              </div>
            </div>

            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-blue-600 shadow-md"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-semibold w-fit mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>100% Free & No Commitment</span>
            </div>

            <h3 className="text-2xl font-black text-white mb-1">
              Get Your Free Live Demo
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mb-6">
              Experience your custom website concept before spending a single rupee.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Your Name / Business Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Verma / Apex Solutions"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-purple-500 focus:outline-none text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  WhatsApp / Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-purple-500 focus:outline-none text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Service Needed
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-purple-500 text-white text-xs"
                  >
                    <option value="Business Websites">Business Websites</option>
                    <option value="3D & Premium Websites">3D & Premium Websites</option>
                    <option value="Custom Websites">Custom Websites</option>
                    <option value="Budget Friendly Package">Budget Friendly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Budget Preference
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-purple-500 text-white text-xs"
                  >
                    <option value="Under ₹10,000">Under ₹10,000</option>
                    <option value="₹10,000 - ₹25,000">₹10,000 - ₹25,000</option>
                    <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                    <option value="Custom Enterprise">Custom Enterprise</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-[0_0_25px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Free Demo Request</span>
                </button>
              </div>

              <div className="text-center">
                <span className="text-[11px] text-slate-500">
                  Direct developer call available at +91 7348382816 / +91 219694862
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
