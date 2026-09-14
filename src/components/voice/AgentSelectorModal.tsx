import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, Bot, Code, Palette, ShoppingBag, Check, Shirt, UserCheck, Volume2, ChevronRight, Eye, Zap, Tag } from "lucide-react";

export interface AgentOption {
  id: string;
  name: string;
  role: string;
  specialty: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  accentHex: string;
  icon: any;
  welcomeMessage: string;
  personalityTraits: string[];
  dressUpStyle: {
    themeName: string;
    outfitDescription: string;
    keyItems: string[];
    colorPalette: string[];
    aestheticBadge: string;
  };
  voiceTone: string;
}

export const AGENT_OPTIONS: AgentOption[] = [
  {
    id: "anya",
    name: "Anya",
    role: "Voice & UI Receptionist",
    specialty: "General Inquiries & Navigation",
    description: "Friendly, lively, and super-welcoming AI receptionist with a cute cyber-pop aesthetic.",
    color: "text-purple-400",
    bgColor: "bg-purple-950/40",
    borderColor: "border-purple-500/40",
    accentHex: "#c084fc",
    icon: Sparkles,
    welcomeMessage: "Hi! Main Anya hoon, aapki AI assistant. Main aapki kya madad kar sakti hoon?",
    personalityTraits: ["Welcoming", "Playful", "Empathetic", "Fast Helper"],
    dressUpStyle: {
      themeName: "Cyber-Pop Streetwear",
      outfitDescription: "Glowing lavender hoodie with cat-ear cyber headset, neon trim, and interactive holographic badge.",
      keyItems: ["Neon Cat-Ear Headset", "Pastel Cyber Hoodie", "Hologram Agency Tag", "LED Choker"],
      colorPalette: ["#c084fc", "#e879f9", "#38bdf8"],
      aestheticBadge: "Futuristic Streetwear",
    },
    voiceTone: "Upbeat, warm, and conversational",
  },
  {
    id: "jarvis",
    name: "Jarvis",
    role: "Tech & Architecture Lead",
    specialty: "Full-Stack Systems & Code",
    description: "Sharp, precise engineering genius dressed in a dark cybernetic suit with AR tech optics.",
    color: "text-cyan-400",
    bgColor: "bg-cyan-950/40",
    borderColor: "border-cyan-500/40",
    accentHex: "#22d3ee",
    icon: Code,
    welcomeMessage: "Hello! I am Jarvis, your technical architect. Ready to analyze systems and review code architecture.",
    personalityTraits: ["Analytical", "Methodical", "Direct", "High-Tech Genius"],
    dressUpStyle: {
      themeName: "Neo-Tech Executive",
      outfitDescription: "Tailored charcoal cyber-blazer over a high-neck dark suit with blue circuit-light lapel accents and an AR HUD visor.",
      keyItems: ["AR Tactical HUD Visor", "Circuit-Lined Blazer", "Smart Collar Core", "Holo-Display Cuff"],
      colorPalette: ["#22d3ee", "#0284c7", "#0f172a"],
      aestheticBadge: "Tactical Techwear",
    },
    voiceTone: "Calm, confident, articulate, and authoritative",
  },
  {
    id: "maya",
    name: "Maya",
    role: "Creative Design Specialist",
    specialty: "3D Showcases & UI Layouts",
    description: "Avant-garde visual designer with a chic Parisian-meets-metaverse fashion sense.",
    color: "text-rose-400",
    bgColor: "bg-rose-950/40",
    borderColor: "border-rose-500/40",
    accentHex: "#fb7185",
    icon: Palette,
    welcomeMessage: "Welcome! I'm Maya, your design lead. Let's sculpt vibrant colors and gorgeous 3D layouts together.",
    personalityTraits: ["Artistic", "Perceptive", "Trendsetter", "Detail-Obsessed"],
    dressUpStyle: {
      themeName: "Digital Atelier Fashion",
      outfitDescription: "Coral-rose artist beret, oversized metallic glasses, silk gradient scarf, and a digital color-palette brooch.",
      keyItems: ["Rose Velvet Beret", "Oversized Designer Frames", "Chromatic Silk Scarf", "Interactive Color Stylus"],
      colorPalette: ["#fb7185", "#f43f5e", "#fda4af"],
      aestheticBadge: "Metaverse Chic",
    },
    voiceTone: "Expressive, inspiring, and elegant",
  },
  {
    id: "alex",
    name: "Alex",
    role: "Sales & E-Commerce Advisor",
    specialty: "Catalogs, Packages & Conversion",
    description: "Charismatic business consultant dressed in crisp emerald luxury attire with modern smart accessories.",
    color: "text-emerald-400",
    bgColor: "bg-emerald-950/40",
    borderColor: "border-emerald-500/40",
    accentHex: "#34d399",
    icon: ShoppingBag,
    welcomeMessage: "Hi there! I'm Alex, your sales advisor. Let's explore tailored packages and maximize your store conversions.",
    personalityTraits: ["Charismatic", "Strategic", "Persuasive", "Results-Driven"],
    dressUpStyle: {
      themeName: "Modern Luxury Business",
      outfitDescription: "Slim-fit deep emerald suit, golden agency crest lapel pin, crisp white shirt, and a holographic luxury smartwatch.",
      keyItems: ["Emerald Wool Blazer", "Gold Agency Lapel Pin", "Holographic Smartwatch", "Silk Pocket Square"],
      colorPalette: ["#34d399", "#059669", "#fbbf24"],
      aestheticBadge: "Executive Elegance",
    },
    voiceTone: "Friendly, persuasive, professional, and energetic",
  },
];

interface AgentSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAgentId: string;
  onSelectAgent: (agent: AgentOption) => void;
}

export function AgentSelectorModal({
  isOpen,
  onClose,
  selectedAgentId,
  onSelectAgent,
}: AgentSelectorModalProps) {
  const [inspectedAgentId, setInspectedAgentId] = useState<string | null>(null);

  if (!isOpen) return null;

  const activeInspectedAgent = AGENT_OPTIONS.find((a) => a.id === inspectedAgentId) || null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-[#0b0c10] border border-purple-500/30 rounded-2xl shadow-2xl overflow-hidden p-5 sm:p-6 text-white my-auto max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-900/40 border border-purple-500/40 flex items-center justify-center shadow-lg">
                <Bot className="w-5 h-5 text-purple-300" />
              </div>
              <div>
                <h2 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                  <span>AI Agent Persona & Dress-Up Wardrobe</span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    Fashion & Personality
                  </span>
                </h2>
                <p className="text-xs text-slate-400">
                  Explore personalities, dress-up outfits, key fashion items, and voice archetypes.
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Main Content Area */}
          <div className="py-4 overflow-y-auto space-y-4 pr-1">
            {/* Agent Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {AGENT_OPTIONS.map((agent) => {
                const IconComponent = agent.icon;
                const isSelected = selectedAgentId === agent.id;
                const isInspected = inspectedAgentId === agent.id;

                return (
                  <div
                    key={agent.id}
                    className={`relative p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between group ${
                      isSelected
                        ? `${agent.bgColor} ${agent.borderColor} shadow-[0_0_25px_rgba(168,85,247,0.2)]`
                        : "bg-white/[0.02] border-white/10 hover:border-purple-500/40 hover:bg-white/[0.04]"
                    }`}
                  >
                    {/* Selected Badge */}
                    {isSelected && (
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-purple-600/90 text-white text-[10px] font-bold flex items-center gap-1 shadow-md">
                        <Check className="w-3 h-3" />
                        <span>Active Agent</span>
                      </div>
                    )}

                    <div>
                      {/* Top Row: Icon, Name, Role */}
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`w-11 h-11 rounded-xl ${agent.bgColor} border ${agent.borderColor} flex items-center justify-center shrink-0 shadow-inner`}>
                          <IconComponent className={`w-6 h-6 ${agent.color}`} />
                        </div>
                        <div className="pr-16">
                          <h3 className="font-bold text-base text-white group-hover:text-purple-300 transition-colors flex items-center gap-1.5">
                            <span>{agent.name}</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300">
                              {agent.dressUpStyle.aestheticBadge}
                            </span>
                          </h3>
                          <span className={`text-xs font-semibold ${agent.color}`}>{agent.role}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                        {agent.description}
                      </p>

                      {/* Dress-Up Style Box */}
                      <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-2 mb-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400 font-medium flex items-center gap-1">
                            <Shirt className={`w-3.5 h-3.5 ${agent.color}`} />
                            Dress-Up Style:
                          </span>
                          <span className={`font-bold text-[11px] ${agent.color}`}>
                            {agent.dressUpStyle.themeName}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-normal italic">
                          "{agent.dressUpStyle.outfitDescription}"
                        </p>

                        {/* Color Swatches */}
                        <div className="flex items-center gap-1.5 pt-1">
                          <span className="text-[10px] text-slate-400 mr-1">Palette:</span>
                          {agent.dressUpStyle.colorPalette.map((hex, idx) => (
                            <span
                              key={idx}
                              className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                              style={{ backgroundColor: hex }}
                              title={`Outfit color ${hex}`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Personality Traits Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {agent.personalityTraits.map((trait) => (
                          <span
                            key={trait}
                            className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-slate-300 font-medium flex items-center gap-1"
                          >
                            <Zap className="w-2.5 h-2.5 text-purple-400" />
                            #{trait}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Controls */}
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2 text-xs">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setInspectedAgentId(isInspected ? null : agent.id);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-[11px]"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-400" />
                        <span>{isInspected ? "Hide Details" : "Inspect Outfit"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onSelectAgent(agent);
                          onClose();
                        }}
                        className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1 cursor-pointer text-xs ${
                          isSelected
                            ? "bg-purple-600 text-white shadow-md hover:bg-purple-500"
                            : "bg-white/10 hover:bg-purple-600 text-white"
                        }`}
                      >
                        <span>{isSelected ? "Selected" : "Equip Agent"}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Detailed Inspection Drawer for Active Inspected Agent */}
            <AnimatePresence>
              {activeInspectedAgent && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-purple-500/40 shadow-2xl space-y-4"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: activeInspectedAgent.accentHex }} />
                      <h4 className="font-bold text-sm text-white">
                        {activeInspectedAgent.name} — Full Outfit & Personality Spec
                      </h4>
                    </div>
                    <button
                      onClick={() => setInspectedAgentId(null)}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      Close Breakdown
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    {/* Column 1: Key Fashion Items */}
                    <div className="p-3 rounded-xl bg-black/50 border border-white/5 space-y-2">
                      <span className="font-bold text-slate-300 flex items-center gap-1.5">
                        <Shirt className={`w-4 h-4 ${activeInspectedAgent.color}`} />
                        Key Dress-Up Items:
                      </span>
                      <ul className="space-y-1.5 text-slate-300 pl-2">
                        {activeInspectedAgent.dressUpStyle.keyItems.map((item, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <Tag className="w-3 h-3 text-purple-400" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Column 2: Personality Archetype */}
                    <div className="p-3 rounded-xl bg-black/50 border border-white/5 space-y-2">
                      <span className="font-bold text-slate-300 flex items-center gap-1.5">
                        <UserCheck className={`w-4 h-4 ${activeInspectedAgent.color}`} />
                        Personality Traits:
                      </span>
                      <p className="text-slate-300 leading-relaxed">
                        {activeInspectedAgent.name} communicates with a {activeInspectedAgent.personalityTraits.join(", ").toLowerCase()} approach designed to make interaction frictionless and memorable.
                      </p>
                    </div>

                    {/* Column 3: Voice & Tone Spec */}
                    <div className="p-3 rounded-xl bg-black/50 border border-white/5 space-y-2">
                      <span className="font-bold text-slate-300 flex items-center gap-1.5">
                        <Volume2 className={`w-4 h-4 ${activeInspectedAgent.color}`} />
                        Voice & Acoustic Tone:
                      </span>
                      <p className="text-slate-300 leading-relaxed">
                        {activeInspectedAgent.voiceTone}. Responds instantly with contextual voice playback and mascot animations.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Note */}
          <div className="pt-3 border-t border-white/10 text-center text-xs text-slate-400 shrink-0 flex items-center justify-between">
            <span>Click <strong>Equip Agent</strong> to switch personality and dress-up style on the live assistant.</span>
            <button
              onClick={onClose}
              className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
