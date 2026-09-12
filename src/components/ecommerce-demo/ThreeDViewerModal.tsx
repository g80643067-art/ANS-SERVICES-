import React, { useState } from 'react';
import { X, RotateCcw, ZoomIn, ZoomOut, Box, Sparkles, CheckCircle2 } from 'lucide-react';
import { Product } from './types';

interface ThreeDViewerModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ThreeDViewerModal: React.FC<ThreeDViewerModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [activeAngle, setActiveAngle] = useState<string>('Front 3D');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white border border-[#E5E5E5] rounded-3xl shadow-2xl overflow-hidden text-black flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#F7F7F7] border-b border-[#E5E5E5]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center shadow-sm">
              <Box className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black tracking-wide text-black uppercase">Interactive 3D Product Viewer</h3>
              <p className="text-[11px] text-[#666666]">{product.name}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white border border-[#E5E5E5] text-black hover:bg-black hover:text-white transition-colors shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3D Stage Viewport */}
        <div className="relative flex-1 min-h-[380px] sm:min-h-[440px] bg-[#F7F7F7] flex items-center justify-center overflow-hidden p-6">
          {/* Grid Background Effect */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:40px_40px] opacity-60 pointer-events-none" />
          
          <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5E5E5] text-black text-xs font-bold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-black animate-spin" />
            <span>3D Model Render Engine Active</span>
          </div>

          {/* Rendered 3D Object Preview with Transform */}
          <div 
            className="relative transition-transform duration-300 ease-out cursor-grab active:cursor-grabbing select-none"
            style={{
              transform: `perspective(1000px) rotateY(${rotationAngle}deg) scale(${zoomLevel})`,
            }}
          >
            <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden border-2 border-black shadow-2xl bg-white p-4 flex items-center justify-center relative group">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-2xl shadow-lg pointer-events-none"
              />
            </div>
          </div>

          {/* On-screen instructions */}
          <div className="absolute bottom-4 text-center text-xs text-[#666666] bg-white/90 px-4 py-1.5 rounded-full backdrop-blur-md border border-[#E5E5E5] shadow-sm">
            Use rotation buttons or presets to inspect product in 360°
          </div>
        </div>

        {/* Controls Bar */}
        <div className="px-6 py-4 bg-[#F7F7F7] border-t border-[#E5E5E5] flex flex-wrap items-center justify-between gap-4">
          
          {/* Angle Presets */}
          <div className="flex items-center gap-2">
            {[
              { label: 'Front 3D', angle: 0 },
              { label: 'Side View', angle: 90 },
              { label: 'Back View', angle: 180 },
              { label: 'Angle ISO', angle: 45 },
            ].map((preset) => (
              <button
                key={preset.label}
                onClick={() => {
                  setRotationAngle(preset.angle);
                  setActiveAngle(preset.label);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  activeAngle === preset.label
                    ? 'bg-black border-black text-white shadow-sm'
                    : 'bg-white border-[#E5E5E5] text-[#666666] hover:text-black hover:border-black'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Zoom & Reset Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoomLevel(Math.max(0.7, zoomLevel - 0.15))}
              className="p-2 rounded-xl bg-white border border-[#E5E5E5] text-black hover:bg-black hover:text-white transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-black px-2">{Math.round(zoomLevel * 100)}%</span>
            <button
              onClick={() => setZoomLevel(Math.min(1.5, zoomLevel + 0.15))}
              className="p-2 rounded-xl bg-white border border-[#E5E5E5] text-black hover:bg-black hover:text-white transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => { setRotationAngle(0); setZoomLevel(1); setActiveAngle('Front 3D'); }}
              className="p-2 rounded-xl bg-white border border-[#E5E5E5] text-black hover:bg-black hover:text-white transition-colors ml-2"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
