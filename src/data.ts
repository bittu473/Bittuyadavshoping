import { Product, Hotspot, BlogArticle, Coupon } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'pmu-machine-black',
    name: 'Micromaster Wireless PMU Machine Black',
    brand: 'Kwadron',
    category: 'PMU Supplies',
    categorySlug: 'pmu-supplies',
    price: 227.11,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=600', // high-end beauty pen style
    isNew: true,
    rating: 4.9,
    reviewsCount: 142,
    description: 'The Micromaster Wireless PMU Machine is an ultra-slim, ergonomic pen designed specifically for precision permanent makeup treatments, including eyebrows, lips, and delicate micro-pigmentation. Features advanced motor stability and responsive needle hit feedback.',
    specs: [
      'Weight: 110g',
      'Stroke: 2.5mm / 3.0mm dual-option',
      'Battery Life: 5-6 hours continuous operation',
      'Voltage Range: 4.5V - 11V',
      'Coreless High-Performance Motor'
    ],
    features: [
      'Perfectly balanced ergonomic pen shape reduces hand fatigue',
      'Clear OLED screen displaying active voltage, speed, and battery percentage',
      'Extremely low vibration and silent operation for ultimate patient comfort',
      'Compatible with all major universal PMU needle cartridge brands'
    ]
  },
  {
    id: 'pmu-machine-brown',
    name: 'Micromaster Wireless PMU Machine Brown',
    brand: 'Kwadron',
    category: 'PMU Supplies',
    categorySlug: 'pmu-supplies',
    price: 296.53,
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=600', // luxury beauty device / cosmetic pen style
    isNew: true,
    rating: 5.0,
    reviewsCount: 88,
    description: 'A luxurious chocolate-brown edition of the gold standard Micromaster PMU Pen. Optimized with premium interior components and a micro-textured grip designed for fine strokes, powder brows, and ombre lip shading.',
    specs: [
      'Weight: 112g',
      'Stroke: 2.8mm optimized stroke depth',
      'Battery Life: 6-7 hours with premium battery cells',
      'Voltage Range: 4.0V - 12V',
      'Whisper-quiet medical grade motor'
    ],
    features: [
      'Ultra-fine needle depth adjustment ring with 0.1mm increments',
      'Special edition hard anodized metallic brown colorways',
      'Instant-start mode for powerful cartridge engagement',
      'Includes premium USB-C charging cord and travel leather pouch'
    ]
  },
  {
    id: 'laser-system-yag',
    name: 'GLOVCON® MED Portable Q-Switch Nd:YAG LCD Laser System',
    brand: 'GLOVCON',
    category: 'Tattoo Supplies',
    categorySlug: 'tattoo-supplies',
    price: 6039.67,
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600', // medical laser look
    isNew: true,
    rating: 4.8,
    reviewsCount: 31,
    description: 'The ultimate portable high-end Q-Switch Nd:YAG laser system by GLOVCON. Specifically engineered for highly effective and minimal-scarring removal of PMU pigments, permanent cosmetic shades, and full-color tattoos.',
    specs: [
      'Laser Type: Q-Switch Nd:YAG Solid-state Laser',
      'Wavelengths: 1064nm (dark inks) & 532nm (red/warm inks)',
      'Energy Level: 100 - 1500 mJ',
      'Screen: 8.4-inch HD Interactive Smart LCD Touchscreen',
      'Cooling: Water + Wind + Radiator Closed Circuit'
    ],
    features: [
      'Compact countertop body perfect for mobile artists and luxury clinics',
      'Extremely quick pigment shatter without thermal damage to epidermis',
      'Intuitive user-interface with pre-configured skin-type safety presets',
      'Built-in smart temperature and water flow alarms for secure operation'
    ]
  },
  {
    id: 'ink-rock-lobster',
    name: 'Quantum Tattoo Gold Label Rock Lobster Tattoo Ink 30ml',
    brand: 'Quantum',
    category: 'Tattoo Supplies',
    categorySlug: 'tattoo-supplies',
    price: 21.72,
    image: 'https://images.unsplash.com/photo-1598257006458-087169a1f08d?auto=format&fit=crop&q=80&w=600', // vibrant cosmetic vial/ink
    isSoldOut: true,
    rating: 4.7,
    reviewsCount: 56,
    description: 'Gold Label Rock Lobster is a fully compliant organic high-density tattoo ink by Quantum. Delivers a magnificent, ultra-vibrant, deep crimson-red tone. Fully EU REACH compliant, vegan, and cruelty-free.',
    specs: [
      'Size: 30ml / 1oz bottle',
      'Compliance: Fully EU REACH Compliant & Sterile Certified',
      'Base: Pure Organic pigments with natural botanical binders',
      'Formulated in the USA'
    ],
    features: [
      'Exceptional lightfastness prevents fading or turning orange/gray',
      'Extremely easy skin saturation with high pigment density',
      'Perfect for watercolor realism, traditional roses, and lip blush overlays',
      'Double-sealed airtight dropper cap'
    ]
  },
  {
    id: 'ink-hi-papi',
    name: 'Quantum Tattoo Gold Label Hi Papi Tattoo Ink 30ml',
    brand: 'Quantum',
    category: 'Tattoo Supplies',
    categorySlug: 'tattoo-supplies',
    price: 21.72,
    image: 'https://images.unsplash.com/photo-1620331700435-0f6a27e3ff69?auto=format&fit=crop&q=80&w=600', // ink styling
    rating: 4.9,
    reviewsCount: 94,
    description: 'Gold Label Hi Papi is a spectacular, intense, dark cherry red color that heals beautifully with exceptional clarity. Loved globally by PMU artists for bold cosmetic overlays and geometric linings.',
    specs: [
      'Size: 30ml / 1oz bottle',
      'Compliance: EU REACH Compliant',
      '100% Vegan & Non-Toxic formula',
      'Sterilized using Gamma Rays'
    ],
    features: [
      'High fluid stability keeps ink flowing evenly from the tip',
      'Unmatched color retention for permanent liners and artistic fill-ins',
      'Zero animal by-products used in formulation',
      'Authentic holographic security scratch-card on back of label'
    ]
  },
  {
    id: 'vertix-cartridges-nano',
    name: 'Vertix Cartridges Nano - Fine PMU Membrane Needle Box of 20',
    brand: 'Vertix',
    category: 'PMU Supplies',
    categorySlug: 'pmu-supplies',
    price: 45.00,
    originalPrice: 49.99,
    image: 'https://images.unsplash.com/photo-1597854710119-a5a843614b17?auto=format&fit=crop&q=80&w=600', // high tech beauty needle tips
    discount: 'Sale -10%',
    rating: 4.9,
    reviewsCount: 210,
    description: 'Premium quality micro-needle cartridges designed explicitly for microscopic cosmetic procedures. Incorporates dual tension side membranes that eliminate ink spitting and allow absolute control over ink delivery.',
    specs: [
      'Box of 20 sterile cartridges',
      'Needle Diameter: 0.25mm (Ultra-Fine Nano)',
      'Taper length: Long Taper (6mm)',
      'Safety System: Complete backflow protection silicon membrane'
    ],
    features: [
      'Translucent high-clarity plastic tip allows clear view of the ink reservoir',
      'Elongated tip profile creates a precise path for needle extension',
      'Anti-friction stabilizers keep needle completely centered with zero wobbling',
      'CE certified and individual blister packed for clinical safety'
    ]
  },
  {
    id: 'perma-blend-pigment',
    name: 'Perma Blend Luxe Pigments - Brow Set Core Collection 15ml',
    brand: 'Perma Blend',
    category: 'PMU Supplies',
    categorySlug: 'pmu-supplies',
    price: 36.50,
    originalPrice: 38.42,
    image: 'https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&q=80&w=600', // cosmetics rows
    discount: 'Sale -5%',
    rating: 4.8,
    reviewsCount: 175,
    description: 'Experience Perma Blend’s premium LUXE line—fully REACH compliant pigments for permanent eyebrow shading. Heals as a perfectly balanced cool brown tone, suitable for Fitzpatrick skin types II to IV.',
    specs: [
      'Volume: 15ml bottle',
      'REACH compliant and tested rigorously in German laboratories',
      'Pigment base: Hybrid (organic & inorganic blend)'
    ],
    features: [
      'High concentration of pigment guarantees long-term retention up to 2 years',
      'Optimized formulation stays fluid and resists quick drying during sessions',
      'Perfect for microshading, ombre brows, and pixel brows styles'
    ]
  },
  {
    id: 'furniture-chair-pro',
    name: 'Ergonomic Luxury Treatment Chair Pro',
    brand: 'Beauty Visit',
    category: 'Studio Furniture',
    categorySlug: 'studio-furniture',
    price: 850.00,
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=600', // luxury treatment chair salon chair
    rating: 4.9,
    reviewsCount: 42,
    description: 'An outstanding luxury treatment chair built for high-end PMU, cosmetic, and tattoo studios. Offers full 360-degree rotation, dual gas-lift height adjustments, and independent leg-rest tilt controls.',
    specs: [
      'Maximum Weight Capacity: 220 kg',
      'Height Range: 62cm - 85cm',
      'Premium medical-grade antimicrobial PU leather upholstery',
      'Sturdy heavy-duty steel base'
    ],
    features: [
      'Fully adjustable and removable headrest with face-hole cushion',
      'Dual multi-directional armrests that slide, swivel, and lift',
      'Reinforced high-density memory foam padding for maximum patient luxury during 4-hour sessions',
      'Easy-to-clean chemical resistant surface'
    ]
  },
  {
    id: 'furniture-stool-arm',
    name: 'Medical Artist Stool + Armrest NG-CH049 Black',
    brand: 'Beauty Visit',
    category: 'Studio Furniture',
    categorySlug: 'studio-furniture',
    price: 189.00,
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=600', // designer stool
    rating: 4.7,
    reviewsCount: 29,
    description: 'Advanced anatomical artist stool designed for permanent makeup masters and tattooists. The active spinal support backrest and heavy duty padded armrest help maintain healthy posture during micro-blading.',
    specs: [
      'Base: Solid chromium alloy with rubber wheels',
      'Pneumatic seat adjustment: 50cm to 68cm',
      'Upholstery: Semi-gloss black PU leather'
    ],
    features: [
      'Dual-axis adjustable armrest that can act as a chest support or side-arm support',
      'Fluid polyurethane double-casters slide seamlessly on tiles and wood alike without leaving marks',
      'Thick non-deformable cushion ensures comfort over long working hours'
    ]
  },
  {
    id: 'furniture-cabinet-steel',
    name: 'Black Steel Artist Rolling Cabinet Organizer',
    brand: 'Beauty Visit',
    category: 'Studio Furniture',
    categorySlug: 'studio-furniture',
    price: 340.00,
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=600', // rolling industrial tool cabinet
    rating: 4.8,
    reviewsCount: 15,
    description: 'A heavy-duty, modern matte black steel rolling cabinet designed specifically for the neat organization of PMU ink bottles, hygiene supplies, cables, and machine grips.',
    specs: [
      'Material: Powder-coated industrial carbon steel',
      'Drawers: 5 soft-close fully extending drawers',
      'Top surface: Scratch-proof thick tempered black glass workspace'
    ],
    features: [
      'Integrated lock system to keep expensive machines and lasers secure overnight',
      'Two side organizer bins and hooks for cables or spray bottles',
      'Heavy-duty lockable casters facilitate effortless workspace re-organization'
    ]
  },
  {
    id: 'mast-racer-pro',
    name: 'Mast Racer Pro Armor Special Edition Wireless Pen',
    brand: 'Mast',
    category: 'PMU Supplies',
    categorySlug: 'pmu-supplies',
    price: 310.00,
    originalPrice: 326.31,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=600', // beautiful cosmetic workspace
    discount: 'Sale -5%',
    rating: 4.9,
    reviewsCount: 119,
    description: 'The spectacular Mast Racer Pro Armor wireless pen is designed with an intelligent direct-drive motor structure that delivers outstanding power and consistency for hair-strokes, ombre brows, and thick tattoo linings.',
    specs: [
      'Stroke: 4.0mm professional stroke depth',
      'Weight: 140g with battery pack',
      'Speed: 10,000 RPM at 9V'
    ],
    features: [
      'Advanced smart-chip adjusts motor output instantly when meeting skin resistance',
      'Beautiful futuristic anodized frame with high-end premium finish',
      'Dual magnetic battery cartridges included for 100% continuous runtime'
    ]
  },
  {
    id: 'mast-flip-pro',
    name: 'Mast Flip 4 Pro Adjustable Stroke Rotary Pen',
    brand: 'Mast',
    category: 'PMU Supplies',
    categorySlug: 'pmu-supplies',
    price: 245.00,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600', // beauty tool closeup
    rating: 4.8,
    reviewsCount: 64,
    description: 'The highly popular adjustable stroke rotary pen. Turn the top dial mid-session to instantly change the stroke length from 2.6mm up to 4.0mm. Excellent for hybrid PMU/Tattoo artists.',
    specs: [
      'Stroke adjustment: 2.6, 2.9, 3.2, 3.5, 3.8, 4.0 mm',
      'Weight: 173g',
      'Connector: RCA high-grade gold plated'
    ],
    features: [
      'Unlocks the ability to switch from lip microshading (2.6mm) to deep tattoo lining (4.0mm) in 1 second',
      'Ergonomically carved fat grip helps distribute finger pressure evenly',
      'Extremely durable internal spring system avoids rattling even after thousands of hours'
    ]
  }
];

export const BRANDS = [
  { name: 'Kwadron', logoText: 'KWADRON®', country: 'Poland' },
  { name: 'Biotek Pigments', logoText: 'BIOTEK® MILANO', country: 'Italy' },
  { name: 'Perma Blend', logoText: 'PERMA BLEND', country: 'USA' },
  { name: 'FK Irons', logoText: 'FK IRONS®', country: 'USA' },
  { name: 'GLOVCON', logoText: 'GLOVCON®', country: 'Germany' },
  { name: 'Quantum Inks', logoText: 'QUANTUM™', country: 'USA' }
];

export const HOTSPOTS: Hotspot[] = [
  {
    id: 'hotspot-chair',
    x: 44,
    y: 56,
    name: 'Ergonomic Luxury Treatment Chair Pro',
    price: 850.00,
    category: 'Studio Furniture',
    description: 'Memory-foam 360-degree rotating clinic bed with dual armrests and chemical-safe PU leather.',
    product: PRODUCTS.find(p => p.id === 'furniture-chair-pro')!
  },
  {
    id: 'hotspot-stool',
    x: 64,
    y: 67,
    name: 'Medical Artist Stool + Armrest',
    price: 189.00,
    category: 'Studio Furniture',
    description: 'Spinal active support saddle seat with multi-angle chest/armrests for micro-blading.',
    product: PRODUCTS.find(p => p.id === 'furniture-stool-arm')!
  },
  {
    id: 'hotspot-cabinet',
    x: 83,
    y: 65,
    name: 'Black Steel Artist Rolling Cabinet',
    price: 340.00,
    category: 'Studio Furniture',
    description: 'Powder-coated lockable carbon steel drawers with tempered glass top panel workspace.',
    product: PRODUCTS.find(p => p.id === 'furniture-cabinet-steel')!
  }
];

export const BLOGS: BlogArticle[] = [
  {
    id: 'blog-1',
    title: 'GLOVCON PMU Pigments: New Professional Shades For Brows, Lips And Correction',
    excerpt: 'Discover the new GLOVCON PMU pigments at BVShop — professional REACH compliant shades for brows, lips, freckles, eyeliner work, and color correction.',
    date: 'July 7, 2026',
    author: 'BV Shop Editorial',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600',
    readTime: '4 min read'
  },
  {
    id: 'blog-2',
    title: 'Perma Blend LUXE Lite Pigments: The New Choice for Natural-Looking Brows',
    excerpt: 'Discover Perma Blend LUXE Lite brow pigments for soft, natural-looking PMU results. A smart choice for artists who want buildable colour, subtle saturation, and long-lasting retention.',
    date: 'June 18, 2026',
    author: 'PMU Master Maria',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=600',
    readTime: '6 min read'
  },
  {
    id: 'blog-3',
    title: 'Top 5 Secrets to Maintain Your Wireless PMU Machine Batteries',
    excerpt: 'Avoid mid-session battery drainage! Read our technical clinic guide on maintaining lithium-ion core cells in modern Kwadron and Microbeau pens.',
    date: 'May 24, 2026',
    author: 'Tech Service Lab',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600',
    readTime: '5 min read'
  }
];

export const COUPONS: Coupon[] = [
  { code: 'WELCOME10', discountPercent: 10, description: '10% OFF on your very first order!' },
  { code: 'PREMIUM5', discountPercent: 5, description: 'Extra 5% off on high-end salon furniture!' },
  { code: 'REACHFREE', discountPercent: 15, description: '15% off on all EU-REACH compliant Quantum inks!' }
];
