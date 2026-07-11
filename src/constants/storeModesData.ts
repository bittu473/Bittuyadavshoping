import { Product, Hotspot, BlogArticle, Coupon } from '../types';

// ==========================================
// 1. NURSERY STORE PRODUCTS (BITTU YADAV NURSERY)
// ==========================================
export const NURSERY_PRODUCTS: Product[] = [
  {
    id: 'nursery-sangu-poo',
    name: 'White Double Petal Sangu Poo - Clitoria Ternatea Live Plant',
    brand: 'Bittu Yadav Nursery',
    category: 'Flower Plants',
    categorySlug: 'flower-plants',
    price: 59.00,
    originalPrice: 199.00,
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&q=80&w=600', // Beautiful white flower
    discount: 'Sale -70%',
    isNew: true,
    rating: 4.8,
    reviewsCount: 142,
    description: 'The spectacular White Double Petal Sangu Poo (Clitoria Ternatea), widely known as butterfly pea. An auspicious, fast-growing climbing vine that bears double-petaled, pristine white blooms. Famous for medicinal, herbal, and aesthetic benefits.',
    specs: [
      'Type: Perennial Climbing Vine',
      'Flower Color: Double Petal White',
      'Watering: Moderate, once a day',
      'Sunlight: Full sun to partial shade',
      'Includes: 1 Healthy Live Plant in nursery grower pot'
    ],
    features: [
      'High germination stability with premium rooted saplings',
      'Ideal for home balconies, terrace gardens, and main gates',
      'Used traditionally in herbal tea and spiritual offerings',
      'Comes with BITTU YADAV organic peat-moss soil mixture'
    ]
  },
  {
    id: 'nursery-goat-manure-1kg',
    name: 'Bittu Yadav Premium Goat Manure Fertilizer - 1kg',
    brand: 'Bittu Yadav Nursery',
    category: 'Organic Bio Fertilizer',
    categorySlug: 'organic-fertilizer',
    price: 176.00,
    originalPrice: 310.00,
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=600', // Organic fertilizer pile/compost
    discount: 'Sale -43%',
    rating: 4.9,
    reviewsCount: 88,
    description: 'Our organic goat manure is thoroughly composted, sun-dried, and pulverized into an odorless, premium soil amendment. Exceptionally rich in Nitrogen, Phosphorus, and Potassium to boost root proliferation and leaf health.',
    specs: [
      'Weight: 1.0 kg',
      'Form: Odorless fine-grain powder',
      'Nutrients: NPK rich organic compost',
      'Shelf Life: 24 Months in airtight storage'
    ],
    features: [
      '100% natural, chemical-free and eco-friendly bio fertilizer',
      'Slow-release formula prevents root burn while nourishing continuously',
      'Improves water retention and soil aeration dramatically',
      'Perfect for flowering plants, indoor bonsais, and kitchen herbs'
    ]
  },
  {
    id: 'nursery-goat-manure-500g',
    name: 'Bittu Yadav Premium Goat Manure Fertilizer - 500g',
    brand: 'Bittu Yadav Nursery',
    category: 'Organic Bio Fertilizer',
    categorySlug: 'organic-fertilizer',
    price: 99.00,
    originalPrice: 310.00,
    image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&q=80&w=600', // potting soil bag
    discount: 'Sale -68%',
    rating: 4.7,
    reviewsCount: 45,
    description: 'A compact 500g edition of our highly sought-after organic goat manure. Specially milled for small apartment balcony pots, money plants, and desk-bound succulents.',
    specs: [
      'Weight: 500 grams',
      'Type: Composted & cured organic manure',
      'Packaging: Zipper lock premium stand-up pouch',
      'Moisture level: Under 12% to prevent mold'
    ],
    features: [
      'Extremely safe and balanced macro and micro-nutrition',
      'Helps retain beneficial soil microorganisms for vibrant growth',
      'Convenient odor-free storage'
    ]
  },
  {
    id: 'nursery-spinach-seeds',
    name: 'Malabar Spinach High-Germination Seeds - Pack of 100',
    brand: 'Bittu Yadav Nursery',
    category: 'Seed Balls',
    categorySlug: 'seed-balls',
    price: 11.00,
    originalPrice: 40.00,
    image: 'https://images.unsplash.com/photo-1533038590840-1cde6b668731?auto=format&fit=crop&q=80&w=600', // green leafy spinach
    discount: 'Sale -72%',
    isNew: true,
    rating: 4.6,
    reviewsCount: 61,
    description: 'Premium, hand-harvested Malabar Spinach seeds (Basella Alba). These seeds boast a 90%+ germination rate, growing into thick, dark green glossy leaves on sturdy vines. Excellent source of iron and vitamins.',
    specs: [
      'Pack Size: 100 Seeds',
      'Germination Rate: > 92%',
      'Maturity: 50-60 Days to harvest',
      'Sowing Depth: 0.5 inches'
    ],
    features: [
      'Highly resistant to tropical pests and high humidity',
      'Vigorous climber that looks magnificent on trellises',
      'Leaves are delicious in salads, curries, and pakoras'
    ]
  },
  {
    id: 'nursery-barbados-cherry',
    name: 'Barbados Cherry Exotic Live Bonsai Plant',
    brand: 'Bittu Yadav Nursery',
    category: 'Flower Plants',
    categorySlug: 'flower-plants',
    price: 40.00,
    originalPrice: 100.00,
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=600', // green plant with cherry red fruit
    discount: 'Sale -60%',
    rating: 4.9,
    reviewsCount: 77,
    description: 'A magnificent dwarf Barbados Cherry (Acerola) plant. Bears gorgeous pinkish-white blossoms followed by juicy, bright red cherries that are exceptionally high in Vitamin C. Excellent for bonsai modeling.',
    specs: [
      'Type: Fruit & Flower Bearing Bonsai',
      'Fruiting Season: Spring to Autumn',
      'Height: 12-18 inches (semi-mature)',
      'Soil requirement: Well-drained sandy loam soil'
    ],
    features: [
      'Provides a stunning contrast of dark green foliage and scarlet red fruits',
      'Perfect addition to a sunny living room window or patio',
      'Shipped securely with hydration gel to survive transit flawlessly'
    ]
  },
  {
    id: 'nursery-hibiscus-pink',
    name: 'Hibiscus Light Pink Desi Flowering Live Plant',
    brand: 'Bittu Yadav Nursery',
    category: 'Flower Plants',
    categorySlug: 'flower-plants',
    price: 39.00,
    originalPrice: 200.00,
    image: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&q=80&w=600', // pink hibiscus
    discount: 'Sale -80%',
    rating: 4.8,
    reviewsCount: 119,
    description: 'An elegant Desi Hibiscus plant carrying large, soft light-pink trumpet blooms with a prominent crimson stamen. It acts as a continuous, robust bloomer all-year round, attracting butterflies and bees.',
    specs: [
      'Type: Hardy Flowering Shrub',
      'Bloom Size: 4-5 inches wide',
      'Soil Type: Rich compost organic soil',
      'Sunlight: Minimum 5 hours of direct sunlight'
    ],
    features: [
      'Incredibly resilient to Indian summers and dry spells',
      'Low maintenance; thrives with standard pruning and weekly fertilization',
      'Shipped in a premium biodegradable nursery bag with moisture retention'
    ]
  },
  {
    id: 'nursery-star-jasmine',
    name: 'Star Jasmine Sweet Scented Live Plant',
    brand: 'Bittu Yadav Nursery',
    category: 'Flower Plants',
    categorySlug: 'flower-plants',
    price: 39.00,
    originalPrice: 100.00,
    image: 'https://images.unsplash.com/photo-1507269837356-602432da2051?auto=format&fit=crop&q=80&w=600', // sweet jasmine star flowers
    discount: 'Sale -61%',
    rating: 4.7,
    reviewsCount: 93,
    description: 'Infuse your home with a divine natural perfume. Star Jasmine is a robust evergreen vine that bursts with thousands of star-shaped, heavenly-scented white blooms during spring and summer.',
    specs: [
      'Type: Evergreen Scented Vine',
      'Bloom Color: Snow White Starry blooms',
      'Fragrance: Intensely sweet and calming',
      'Height: Shipped at 10-15 inches with climber stick'
    ],
    features: [
      'Excellent screen for boundary walls, railings, and pergolas',
      'Foliage turns bronze in winter, adding multi-season beauty',
      'Highly resistant to pests and dry weather conditions'
    ]
  }
];

// ==========================================
// 2. MEDICINE STORE PRODUCTS (BITTU YADAV MEDICINE)
// ==========================================
export const MEDICINE_PRODUCTS: Product[] = [
  {
    id: 'med-skin-revitalizer',
    name: 'Bittu Yadav Luxury Skin & Body Revitalizer Elixir',
    brand: 'Bittu Yadav Medicine',
    category: 'Premium Wellness',
    categorySlug: 'cosmetics',
    price: 499.00,
    originalPrice: 599.00,
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=600', // luxury gold beauty vial
    discount: 'Save 17%',
    isNew: true,
    rating: 4.9,
    reviewsCount: 215,
    description: 'A masterpiece of pharmaceutical cosmetics and clinical excellence. Formulated with pure Swiss apple stem cells, premium liposomes, and 24K gold nano-particles. Drastically triggers cellular replication, repairs damaged epidermis, and provides an unparalleled radiant glow.',
    specs: [
      'Volume: 100ml Premium Glass Bottle',
      'Active Ingredients: Swiss Malus Domestica Stem Cells, Gold Peptides',
      'Application: Skin hydration & cell regeneration',
      'Clinically Tested & Dermatologically Certified in Rome'
    ],
    features: [
      'Provides instant deep epidermal repair and structural hydration',
      'Soothes micro-irritations post medical procedures and PMU sessions',
      'Odorless, non-greasy, and fully hypoallergenic formula',
      'Bottled in ultra-violet protective glass with gold-leaf accents'
    ]
  },
  {
    id: 'med-cardio-support',
    name: 'Bittu Yadav Luxury Cardio-Vascular Active Support',
    brand: 'Bittu Yadav Medicine',
    category: 'Luxury Medicine',
    categorySlug: 'pmu-supplies', // Using existing categories to prevent layout issues
    price: 850.00,
    originalPrice: 999.00,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600', // Luxury red medicine capsules
    discount: 'Save 15%',
    isNew: true,
    rating: 5.0,
    reviewsCount: 94,
    description: 'The golden standard of molecular cardiac wellness. Infused with highly bioavailable Ubiquinol CoQ10, organic sea buckthorn lipids, and resveratrol. Specially designed to promote cellular energy in coronary tissue, optimal blood vessel elasticity, and peak daily performance.',
    specs: [
      'Quantity: 60 Liquid Phyto-capsules',
      'Potency: 200mg Ubiquinol per serving',
      'Quality Standard: WHO-GMP and FDA certified',
      'Engineered & Sourced in Switzerland'
    ],
    features: [
      'Enhances oxygen efficiency in muscles and heart cells',
      'Strongly scavenges free-radicals in blood vessels with botanical lipids',
      '100% vegetarian, gluten-free, and heavy-metal filtered'
    ]
  },
  {
    id: 'med-neuro-focus',
    name: 'Bittu Yadav Premium Neurological Focus & Stress Shield',
    brand: 'Bittu Yadav Medicine',
    category: 'Premium Wellness',
    categorySlug: 'accessories',
    price: 340.00,
    originalPrice: 420.00,
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600', // Blue medical style container
    discount: 'Save 19%',
    rating: 4.8,
    reviewsCount: 120,
    description: 'An advanced clinical grade nootropic designed to improve neurotransmitter density, sharpen mental focus, and safeguard neural pathways from oxidative stress and exhaustion. Ideal for high-performance professionals.',
    specs: [
      'Quantity: 90 Vegan Capsules',
      'Key Actives: Lion\'s Mane Extract, Alpha-GPC, Ashwagandha KSM-66',
      'Type: Cognitive optimizer and cortisol balancer',
      'Made in a certified clean-room laboratory'
    ],
    features: [
      'Enhances short-term working memory and fluid decision-making',
      'Reduces physiological stress response and cortisol by up to 30%',
      'Sustained mental stamina with absolutely zero synthetic caffeine jitters'
    ]
  }
];

// ==========================================
// 3. SECTIONS DATA FOR TRANSFORMATION
// ==========================================

export const NURSERY_CATEGORIES = [
  { name: 'Flower Plants', slug: 'flower-plants', desc: 'Jasmine, Hibiscus, Sangu Poo and exotic flowering varieties.', image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&q=80&w=600' },
  { name: 'Organic Bio Fertilizer', slug: 'organic-fertilizer', desc: 'Sun-dried compost, pulverized premium goat manure.', image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=600' },
  { name: 'Seed Balls', slug: 'seed-balls', desc: 'Tropical Malabar spinach and organic herbal vegetable seeds.', image: 'https://images.unsplash.com/photo-1533038590840-1cde6b668731?auto=format&fit=crop&q=80&w=600' }
];

export const MEDICINE_CATEGORIES = [
  { name: 'Premium Wellness', slug: 'cosmetics', desc: 'Gold cell revitalizers and clinical anti-aging serums.', image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=600' },
  { name: 'Luxury Medicine', slug: 'pmu-supplies', desc: 'Switzerland engineered Ubiquinol and cardiac support caps.', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600' },
  { name: 'Accessories & Care', slug: 'accessories', desc: 'Advanced cognitive nootropics and premium clinical stress shields.', image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600' }
];

export const NURSERY_HERO = [
  {
    image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&q=80&w=1200', // lush botanical greenhouse
    title: 'BITTU YADAV NURSERY',
    subtitle: 'India\'s Premium Exotic Plant & Organic Fertilizer Hub',
    badge: '100% LIVE PLANT ARRIVAL GUARANTEE',
    linkText: 'Explore Sangu Poo & Hibiscus',
    linkSlug: 'flower-plants'
  },
  {
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=1200', // gardening tools and soil
    title: 'Pulverized Odorless Goat Manure',
    subtitle: 'Triple-sifted, nitrogen-rich premium organic nourishment',
    badge: '40% CASHBACK FESTIVAL SPECIAL',
    linkText: 'Shop Goat Manure Fertilizer',
    linkSlug: 'organic-fertilizer'
  }
];

export const MEDICINE_HERO = [
  {
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=1200', // medical styling background
    title: 'BITTU YADAV MEDICINE',
    subtitle: 'Luxury & Clinical-Grade Formulas Engineered for Vitality',
    badge: 'PREMIUM & EXCLUSIVELY SWISS-FORMULATED',
    linkText: 'Explore Gold Cell Revitalizers',
    linkSlug: 'cosmetics'
  },
  {
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200', // doctor laboratory feel
    title: 'Neurological focus & Stress Shield',
    subtitle: 'Sophisticated cognitive enhancement with Lion\'s Mane & Ashwagandha',
    badge: 'FDA APPROVED & CERTIFIED PURITY',
    linkText: 'Shop Nootropics',
    linkSlug: 'accessories'
  }
];

export const NURSERY_HOTSPOTS: Hotspot[] = [
  {
    id: 'hotspot-sangu-poo',
    x: 35,
    y: 45,
    name: 'White Sangu Poo Vine Stage',
    price: 59.00,
    category: 'Flower Plants',
    description: 'Vibrant double-petaled butterfly pea climber with pre-fertilized compost soil.',
    product: NURSERY_PRODUCTS[0]
  },
  {
    id: 'hotspot-manure',
    x: 75,
    y: 50,
    name: 'Manure Processing Sifter',
    price: 176.00,
    category: 'Organic Bio Fertilizer',
    description: 'Thoroughly sun-cured, pulverized, and double-sifted premium goat compost.',
    product: NURSERY_PRODUCTS[1]
  }
];

export const MEDICINE_HOTSPOTS: Hotspot[] = [
  {
    id: 'hotspot-skin-revitalizer',
    x: 40,
    y: 52,
    name: 'Stem Cell Research Counter',
    price: 499.00,
    category: 'Premium Wellness',
    description: 'Active extraction facility for premium Swiss apple stem cell liposomes.',
    product: MEDICINE_PRODUCTS[0]
  },
  {
    id: 'hotspot-cardio',
    x: 80,
    y: 60,
    name: 'Ubiquinol Encapsulation Dome',
    price: 850.00,
    category: 'Luxury Medicine',
    description: 'Advanced GMP-certified clinical encapsulation system for bioavailable CoQ10.',
    product: MEDICINE_PRODUCTS[1]
  }
];

export const NURSERY_BRANDS = [
  { name: 'Bittu Yadav Organic', logoText: 'BY-ORGANIC™', country: 'India' },
  { name: 'VGR Gardens', logoText: 'VGR GARDENS®', country: 'India' },
  { name: 'Kisan Bio Tech', logoText: 'KISAN BIO®', country: 'India' },
  { name: 'Himalayan Flora', logoText: 'HIMALAYA FLORA', country: 'Nepal' },
  { name: 'Exotic Climbers Ltd', logoText: 'EXOTIC CLIMB', country: 'Netherlands' }
];

export const MEDICINE_BRANDS = [
  { name: 'Bittu Yadav Pharma', logoText: 'BY-PHARMACEUTICALS', country: 'India' },
  { name: 'Swiss BioGen', logoText: 'SWISS BIOGEN®', country: 'Switzerland' },
  { name: 'Roma Medical Lab', logoText: 'ROMA MED® LAB', country: 'Italy' },
  { name: 'Nootropics Core', logoText: 'NEURO CORE™', country: 'USA' },
  { name: 'Kyoto Wellness Co', logoText: 'KYOTO WELLNESS', country: 'Japan' }
];

export const NURSERY_BLOGS: BlogArticle[] = [
  {
    id: 'nursery-blog-1',
    title: 'Double Petal Sangu Poo: Sowing, Shading and Soil secrets',
    excerpt: 'How to trigger continuous double-petaled blooming on your Clitoria Ternatea climber vine. Tips from Bittu Yadav Nursery masters.',
    date: 'July 11, 2026',
    author: 'Kisan Expert Amit',
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&q=80&w=600',
    readTime: '4 min read'
  },
  {
    id: 'nursery-blog-2',
    title: 'Why Premium Pulverized Goat Manure Beats Chemical Fertilizer Every Single Time',
    excerpt: 'The biology of slow-release nitrogen in composted goat manure. Why it increases earthworm counts and protects micro-flora.',
    date: 'June 30, 2026',
    author: 'Organic Farming Lab',
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=600',
    readTime: '6 min read'
  }
];

export const MEDICINE_BLOGS: BlogArticle[] = [
  {
    id: 'med-blog-1',
    title: 'The Science of Apple Stem Cells and Epidermal Layer Proliferation',
    excerpt: 'A cellular review of Malus Domestica stem cells in medical skincare. How liposome delivery triggers fast healing and cellular elasticity.',
    date: 'July 10, 2026',
    author: 'Dr. Stella Bern, Swiss Biotech',
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=600',
    readTime: '5 min read'
  },
  {
    id: 'med-blog-2',
    title: 'Ubiquinol CoQ10 vs Ubiquinone: Optimizing Cellular ATP in Cardiac Tissue',
    excerpt: 'Clinical analysis comparing bioavailability in cardiac patients. Learn why water-soluble CoQ10 phyto-caps are the premium choice.',
    date: 'June 25, 2026',
    author: 'Cardiology Research Journal',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600',
    readTime: '7 min read'
  }
];
