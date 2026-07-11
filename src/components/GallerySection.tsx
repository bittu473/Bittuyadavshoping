import React, { useState } from 'react';
import { Filter, Maximize2, X, ExternalLink, Sparkles, Image as ImageIcon } from 'lucide-react';

interface GalleryItem {
  id: number;
  title: string;
  category: 'pmu' | 'nursery' | 'medicine';
  categoryLabel: string;
  description: string;
  image: string;
  details: string[];
  specs: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    title: 'Ombre Powder Brows',
    category: 'pmu',
    categoryLabel: 'PMU & Tattoo Artistry',
    description: 'Precision permanent powder shading brows with long-term healed perfection.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800',
    details: [
      'Duration: 2 Hours micro-shading session',
      'Pigments: REACH organic clinical-grade certified',
      'Healing rate: 100% skin retention within 7 days',
      'Technique: Nano airbrush pixelation machine'
    ],
    specs: 'Luxurious brow definition suited for all skin tones.'
  },
  {
    id: 2,
    title: 'Double-Petal White Sangu Poo',
    category: 'nursery',
    categoryLabel: 'Organic Live Flora',
    description: 'Rare exotic white butterfly pea live creepers yielding gorgeous daily white flowers.',
    image: 'https://images.unsplash.com/photo-1507290439931-a8e02da93262?auto=format&fit=crop&q=80&w=800',
    details: [
      'Plant Category: Perennial climbing creeper',
      'Sunlight requirement: Full sun to partial afternoon shade',
      'Watering: Low to moderate, drought-tolerant',
      'Sourced: Hand-propagated at East Champaran Nursery'
    ],
    specs: 'Revered for spiritual pooja and organic wellness blue/white herbal tea infusions.'
  },
  {
    id: 3,
    title: 'Swiss Biotechnology Synthesis',
    category: 'medicine',
    categoryLabel: 'Luxury Clinical Labs',
    description: 'Molecular anti-aging serums formulated in Swiss-partnered WHO-GMP certified facilities.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
    details: [
      'Purity Standard: 99.8% bioactive stabilization',
      'Core Ingredient: Golden plant-cell revitalizer & Ubiquinol',
      'Laboratory certification: ISO-9001 and WHO-GMP registered',
      'Clinical trial: In-vitro testing validated'
    ],
    specs: 'Tested, approved, and fully certified clinical-grade age defense serum.'
  },
  {
    id: 4,
    title: 'Eyeliner Permanent Pigmentation',
    category: 'pmu',
    categoryLabel: 'PMU & Tattoo Artistry',
    description: 'High-density carbon eyeliner pigments offering precise, crisp lashline definition.',
    image: 'https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&q=80&w=800',
    details: [
      'Ink properties: Anti-migration, zero-smudge compound',
      'Operator Care: Zero vibrations motor handpiece',
      'Lashline safety: Clinically ophthalmologist approved',
      'Longevity: 3-5 Years before subtle touch-up'
    ],
    specs: 'Sophisticated look that eliminates daily make-up application fatigue.'
  },
  {
    id: 5,
    title: 'Double-Petal Pink Hibiscus Live',
    category: 'nursery',
    categoryLabel: 'Organic Live Flora',
    description: 'Stunning premium layered hibiscus saplings producing vibrant daily blossoms.',
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&q=80&w=800',
    details: [
      'Size: Shipped as rooted 12-18 inch live potted saplings',
      'Flowering: Continuous multi-tier blooming cycles',
      'Nutritional feeding: Ground pulverized goat compost fed',
      'Grower recommendation: Prune twice annually for maximum bush growth'
    ],
    specs: 'Adds a breathtaking, vibrant splash of premium color to any home garden setup.'
  },
  {
    id: 6,
    title: 'Cognitive Nootropics Lab Compounding',
    category: 'medicine',
    categoryLabel: 'Luxury Clinical Labs',
    description: 'High-purity compounding of Brain health cognitive stress shields.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
    details: [
      'Bioavailability: Micronized delivery system encapsulation',
      'Purity: Chromatographic test validated at 99.4%',
      'Sourcing: Sourced from sustainable herbal extracts',
      'Side effect profile: Hypoallergenic and starch-free'
    ],
    specs: 'Formulated specifically to maximize daily focus and deep mental tranquility.'
  },
  {
    id: 7,
    title: 'Organic Pulverized Goat Compost',
    category: 'nursery',
    categoryLabel: 'Organic Live Flora',
    description: 'Sun-dried, odor-free organic farm manure naturally fortified with micro-nutrients.',
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=800',
    details: [
      'Nitrogen-Phosphorus-Potassium: Optimal organic N-P-K ratios',
      'Composting process: 120 Days aerobic breakdown cycle',
      'Texture: Fine aerated powder structure, zero clumping',
      'Application rate: 200g per potted plant monthly'
    ],
    specs: 'Boosts plant root proliferation, flower sizing, and structural health naturally.'
  },
  {
    id: 8,
    title: 'Precision Needle Cartridges',
    category: 'pmu',
    categoryLabel: 'PMU & Tattoo Artistry',
    description: 'Long taper surgical steel cartridges with elastic safety membranes.',
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=800',
    details: [
      'Metal alloy: 316L medical stainless steel needles',
      'Sterilization: Individual ethylene oxide (EO) gas packed',
      'Vibration reduction: Embedded medical silicone damper',
      'Needle taper: Super fine 0.25mm long taper nano needles'
    ],
    specs: 'Ensures absolute safety, minimal skin trauma, and crystal-clear lining.'
  }
];

export default function GallerySection() {
  const [activeTab, setActiveTab] = useState<'all' | 'pmu' | 'nursery' | 'medicine'>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems = activeTab === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeTab);

  return (
    <div className="bg-gray-50/50 py-12 md:py-20 px-4 max-w-7xl mx-auto w-full" id="bittu-yadav-multipurpose-gallery">
      {/* Gallery Header */}
      <div className="text-center mb-12">
        <span className="text-[10px] font-mono tracking-[0.3em] text-brand-600 uppercase block mb-2">BITTU YADAV EXHIBITION GALLERY</span>
        <h2 className="font-serif font-extrabold text-3xl md:text-4xl text-gray-900 tracking-tight flex items-center justify-center gap-2">
          <ImageIcon className="w-7 h-7 text-brand-700 animate-pulse" />
          <span>Our Visual Masterpieces</span>
        </h2>
        <p className="text-xs md:text-sm text-gray-500 max-w-2xl mx-auto mt-3 font-light leading-relaxed">
          Step into our high-definition portfolio. Explore premium healed micro-pigmentation, certified live nursery saplings thriving in East Champaran, and the clean clinical labs of Bittu Yadav Apothecary.
        </p>

        {/* Categories Tab Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {[
            { id: 'all' as const, label: 'All Portfolios' },
            { id: 'pmu' as const, label: 'PMU & Tattoo Art' },
            { id: 'nursery' as const, label: 'Live Nursery & Composts' },
            { id: 'medicine' as const, label: 'Clinical Medicine Labs' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-xs font-sans font-bold tracking-wider rounded-full border transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-brand-800 text-white border-brand-800 shadow-md ring-2 ring-brand-700 ring-offset-1 scale-105'
                  : 'bg-white text-gray-600 border-gray-200 hover:text-brand-800 hover:border-brand-500'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-2xl overflow-hidden border border-gray-100/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
            onClick={() => setSelectedItem(item)}
          >
            {/* Visual Frame */}
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-[10px] font-sans font-bold tracking-wider text-brand-200 uppercase bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Maximize2 className="w-3 h-3 text-brand-100" /> Hover to expand
                </span>
              </div>
              <span className={`absolute top-3 left-3 text-[9px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-md text-white font-bold shadow-md ${
                item.category === 'pmu'
                  ? 'bg-amber-600'
                  : item.category === 'nursery'
                    ? 'bg-emerald-600'
                    : 'bg-indigo-600'
              }`}>
                {item.categoryLabel}
              </span>
            </div>

            {/* Typography Description */}
            <div className="p-5 flex-1 flex flex-col justify-between text-left">
              <div>
                <h4 className="font-serif font-extrabold text-base text-gray-900 group-hover:text-brand-800 transition-colors tracking-tight">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500 font-light mt-1.5 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>
              <div className="border-t border-gray-50 pt-4 mt-4 flex items-center justify-between text-[11px] font-mono text-brand-700 font-extrabold">
                <span>Explore Technical Specs</span>
                <ExternalLink className="w-3.5 h-3.5 text-brand-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Fullscreen Lightbox Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden border border-gray-100 text-left flex flex-col md:flex-row max-h-[90vh] relative">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 bg-black/80 text-white hover:bg-black p-2 rounded-full cursor-pointer z-50 border border-white/20 transition-all"
              title="Close Panel"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left: Huge High-Def Image */}
            <div className="md:w-1/2 bg-black flex items-center justify-center relative min-h-[300px] md:min-h-0">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover max-h-[40vh] md:max-h-full"
              />
              <span className={`absolute top-4 left-4 text-xs font-mono tracking-widest uppercase px-3 py-1.5 rounded-md text-white font-extrabold shadow-lg ${
                selectedItem.category === 'pmu'
                  ? 'bg-amber-600'
                  : selectedItem.category === 'nursery'
                    ? 'bg-emerald-600'
                    : 'bg-indigo-600'
              }`}>
                {selectedItem.categoryLabel}
              </span>
            </div>

            {/* Right: Technical Specs & Case Study */}
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
              <div>
                <span className="text-[10px] font-mono tracking-[0.2em] text-brand-600 uppercase block mb-1">OFFICIAL VERIFIED CASE STUDY</span>
                <h3 className="font-serif font-extrabold text-2xl text-gray-900 tracking-tight">
                  {selectedItem.title}
                </h3>
                <p className="text-xs text-gray-500 font-light mt-2 leading-relaxed">
                  {selectedItem.description}
                </p>

                {/* Bullet details */}
                <div className="mt-6 space-y-3">
                  <h5 className="text-[10px] font-mono tracking-widest text-gray-400 uppercase font-bold">Scientific & Material Details:</h5>
                  <ul className="space-y-2">
                    {selectedItem.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                        <span className="text-brand-600 font-bold mt-0.5">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom badge */}
              <div className="border-t border-gray-100 pt-6 mt-6">
                <div className="bg-brand-50/60 p-4 rounded-xl border border-brand-100/50 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h6 className="text-xs font-bold text-brand-900">Bittu Yadav Guarantee Tag</h6>
                    <p className="text-[11px] text-gray-600 mt-0.5 font-light leading-relaxed">
                      {selectedItem.specs}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex gap-3">
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="flex-1 py-2.5 px-4 bg-brand-800 text-white font-bold text-xs rounded-xl hover:bg-brand-700 transition-colors text-center cursor-pointer"
                  >
                    Done Exploring
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
