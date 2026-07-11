import React, { useState, useEffect } from 'react';
import { Plus, ShoppingCart, Eye, Sparkles } from 'lucide-react';
import { HOTSPOTS } from '../data';
import { Hotspot, Product } from '../types';
import { NURSERY_HOTSPOTS, MEDICINE_HOTSPOTS } from '../constants/storeModesData';

interface InteractiveStudioProps {
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onViewProduct: (product: Product) => void;
  currencySymbol: string;
  currencyRate: number;
  storeMode: 'pmu' | 'nursery' | 'medicine';
}

export default function InteractiveStudio({
  onAddToCart,
  onBuyNow,
  onViewProduct,
  currencySymbol,
  currencyRate,
  storeMode
}: InteractiveStudioProps) {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  // Reset active hotspot when storeMode changes
  useEffect(() => {
    setActiveHotspot(null);
  }, [storeMode]);

  const activeHotspots = storeMode === 'nursery'
    ? NURSERY_HOTSPOTS
    : storeMode === 'medicine'
      ? MEDICINE_HOTSPOTS
      : HOTSPOTS;

  const bgImage = storeMode === 'nursery'
    ? 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&q=80&w=1500' // Gorgeous green greenhouse interior
    : storeMode === 'medicine'
      ? 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1500' // High-tech clinical lab
      : 'https://images.unsplash.com/photo-1621574539437-4b7cb63120b8?auto=format&fit=crop&q=80&w=1500'; // PMU studio clinic interior

  const studioTitle = storeMode === 'nursery'
    ? 'Bittu Yadav Green Nursery Hub'
    : storeMode === 'medicine'
      ? 'Bittu Yadav Advanced Laboratory'
      : 'Tattoo & PMU Studio Furniture';

  const studioDesc = storeMode === 'nursery'
    ? 'Explore our live double-petal Sangu Poo greenhouse staging. Tap hotspots to buy live rooted saplings or organic goat compost direct.'
    : storeMode === 'medicine'
      ? 'Take a virtual tour of our WHO-GMP clinical research labs. Sourced from Swiss biotechnology for premium life wellness.'
      : 'Upgrade your clinic or shop with professional furniture engineered for absolute ergonomics, operator posture care, and client tranquility.';

  const formatPrice = (price: number) => {
    return (price * currencyRate).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <div className="w-full bg-white py-12 md:py-16 px-4 max-w-7xl mx-auto" id="interactive-studio">
      <div className="text-center mb-8">
        <h2 className="font-serif font-bold text-2xl md:text-3xl text-gray-900 tracking-tight">{studioTitle}</h2>
        <p className="text-xs md:text-sm text-gray-500 max-w-xl mx-auto mt-2 font-light">
          {studioDesc}
        </p>
      </div>

      {/* Main Interactive Stage Container */}
      <div className="relative w-full rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-gray-50 aspect-[16/10] md:aspect-[16/9]">
        {/* Background Image dynamically loaded */}
        <img
          src={bgImage}
          alt={studioTitle}
          className="w-full h-full object-cover select-none pointer-events-none"
        />

        {/* Ambient Dark Overlay to enhance readability */}
        <div className="absolute inset-0 bg-black/15"></div>

        {/* Dynamic Instructional Banner */}
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] sm:text-xs py-1.5 px-3 rounded-full flex items-center gap-1.5 z-10 select-none">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
          <span>Tap the <span className="font-bold text-brand-100">+ Hotspots</span> to explore {storeMode === 'nursery' ? 'nursery plants' : storeMode === 'medicine' ? 'premium wellness' : 'professional furniture'} setup</span>
        </div>

        {/* Render Hotspot Plus Nodes */}
        {activeHotspots.map((hotspot) => {
          const isActive = activeHotspot?.id === hotspot.id;

          return (
            <div
              key={hotspot.id}
              className="absolute z-20 transition-all duration-300"
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
            >
              {/* Pulsing trigger ring */}
              <button
                onClick={() => setActiveHotspot(isActive ? null : hotspot)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-lg cursor-pointer ${
                  isActive
                    ? 'bg-brand-100 text-brand-800 scale-125 ring-4 ring-brand-100/40'
                    : 'bg-white text-brand-800 hover:bg-brand-800 hover:text-white hover:scale-110'
                }`}
                title={`Explore ${hotspot.name}`}
              >
                <Plus className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'rotate-45' : ''}`} />
                <span className="absolute -inset-1 rounded-full border-2 border-white animate-ping opacity-60"></span>
              </button>

              {/* Dynamic Popover Card */}
              {isActive && (
                <div 
                  className={`absolute mt-3 w-64 bg-white/95 backdrop-blur-md rounded-lg shadow-2xl border border-brand-100 p-4 text-left z-35 animate-fade-in transition-all ${
                    hotspot.x > 75 
                      ? '-left-56 sm:-left-56' 
                      : hotspot.x < 25 
                        ? 'left-0' 
                        : '-left-28 sm:-left-28'
                  }`}
                  style={{ top: '100%' }}
                >
                  <div className="relative">
                    <span className="text-[9px] font-semibold text-brand-600 font-mono tracking-widest uppercase block mb-1">
                      {hotspot.category}
                    </span>
                    <h3 className="font-serif font-bold text-xs text-gray-900 leading-snug line-clamp-2">
                      {hotspot.name}
                    </h3>
                    <p className="text-[10px] text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                      {hotspot.description}
                    </p>
                    <div className="mt-3 flex items-baseline gap-1.5">
                      <span className="text-sm font-bold text-brand-800 font-sans">
                        {currencySymbol}{formatPrice(hotspot.price)}
                      </span>
                    </div>

                    <div className="mt-3.5 grid grid-cols-3 gap-1 pt-2 border-t border-gray-100">
                      <button
                        onClick={() => {
                          onViewProduct(hotspot.product);
                        }}
                        className="flex items-center justify-center py-1.5 bg-gray-50 hover:bg-gray-100 text-[9px] font-bold text-gray-700 rounded transition-colors cursor-pointer"
                      >
                        <span>Specs</span>
                      </button>
                      <button
                        onClick={() => {
                          onAddToCart(hotspot.product);
                        }}
                        className="flex items-center justify-center py-1.5 bg-gray-100 hover:bg-gray-200 text-brand-800 text-[9px] font-bold rounded transition-colors cursor-pointer"
                      >
                        <span>Add Bag</span>
                      </button>
                      <button
                        onClick={() => {
                          onBuyNow(hotspot.product);
                        }}
                        className="flex items-center justify-center py-1.5 bg-brand-800 hover:bg-brand-700 text-white text-[9px] font-bold rounded transition-colors cursor-pointer shadow-sm hover:shadow"
                      >
                        <span>Buy Now</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Popover dismiss backdrop (active only when a hotspot is open) */}
        {activeHotspot && (
          <div
            className="absolute inset-0 bg-transparent z-10"
            onClick={() => setActiveHotspot(null)}
          ></div>
        )}
      </div>
    </div>
  );
}
