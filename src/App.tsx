import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Eye, RefreshCw, Star, Info, HelpCircle } from 'lucide-react';
import { PRODUCTS, BRANDS, BLOGS } from './data';
import { Product, CartItem } from './types';
import Header from './components/Header';
import HeroCarousel from './components/HeroCarousel';
import InteractiveStudio from './components/InteractiveStudio';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import ChatWidget from './components/ChatWidget';
import Footer from './components/Footer';
import AuthPage from './components/AuthPage';
import GallerySection from './components/GallerySection';
import { 
  NURSERY_PRODUCTS, 
  MEDICINE_PRODUCTS, 
  NURSERY_CATEGORIES, 
  MEDICINE_CATEGORIES,
  NURSERY_HERO,
  MEDICINE_HERO,
  NURSERY_BRANDS,
  MEDICINE_BRANDS,
  NURSERY_BLOGS,
  MEDICINE_BLOGS
} from './constants/storeModesData';

// Currency exchange rates relative to EUR
const CURRENCY_RATES: Record<string, { symbol: string; rate: number }> = {
  INR: { symbol: '₹', rate: 91.5 },
  USD: { symbol: '$', rate: 1.09 },
  EUR: { symbol: '€', rate: 1.0 },
  GBP: { symbol: '£', rate: 0.84 },
  CAD: { symbol: 'C$', rate: 1.48 },
  AUD: { symbol: 'A$', rate: 1.63 },
  JPY: { symbol: '¥', rate: 172.0 },
  AED: { symbol: 'AED ', rate: 4.01 }
};

export default function App() {
  // Shopping Cart state with localStorage backing
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('bv_pmu_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Wishlist state with localStorage backing
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('bv_pmu_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // User Profile state
  const [user, setUser] = useState<{
    name: string;
    email: string;
    clinicName: string;
    address: string;
    phone: string;
  } | null>(() => {
    const saved = localStorage.getItem('by_user_profile');
    return saved ? JSON.parse(saved) : null;
  });

  // View state: 'auth' | 'store' | 'gallery'
  const [viewState, setViewState] = useState<'auth' | 'store' | 'gallery'>(() => {
    const savedUser = localStorage.getItem('by_user_profile');
    return savedUser ? 'store' : 'auth';
  });

  // Settings states
  const [storeMode, setStoreMode] = useState<'pmu' | 'nursery' | 'medicine'>(() => {
    const saved = localStorage.getItem('by_store_mode');
    return (saved as any) || 'pmu';
  });
  const [currency, setCurrency] = useState('INR');
  const [language, setLanguage] = useState('EN');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Dialog / Sidebar states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartDrawerInitialStep, setCartDrawerInitialStep] = useState<1 | 2 | 3>(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Toast message state for quick feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('bv_pmu_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('bv_pmu_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Utility toast
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Cart operations
  const handleAddToCart = (product: Product, qty: number = 1) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex((item) => item.product.id === product.id);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += qty;
        return updated;
      }
      return [...prev, { product, quantity: qty }];
    });
    showToast(`Added ${qty}x ${product.name} to your bag!`);
  };

  const handleBuyNow = (product: Product, qty: number = 1) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex((item) => item.product.id === product.id);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity = Math.max(updated[existingIdx].quantity, qty);
        return updated;
      }
      return [...prev, { product, quantity: qty }];
    });
    setCartDrawerInitialStep(2); // Jump straight to Shopify Checkout step
    setIsCartOpen(true);
    showToast(`Proceeding to checkout for ${product.name}!`);
  };

  const handleUpdateQty = (productId: string, qty: number) => {
    if (qty < 1) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity: qty } : item))
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from shopping bag');
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist operation
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      if (prev.includes(product.id)) {
        showToast(`Removed ${product.name} from Wishlist`);
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Saved ${product.name} to Wishlist!`);
        return [...prev, product.id];
      }
    });
  };

  const handleCategorySelect = (categorySlug: string | null) => {
    setActiveCategory(categorySlug);
    setSearchQuery('');
    // Scroll to products grid area
    const element = document.getElementById('products-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Calculations for current currency
  const currSymbol = CURRENCY_RATES[currency]?.symbol || '€';
  const currRate = CURRENCY_RATES[currency]?.rate || 1.0;

  // Determine active products base based on storeMode
  const activeModeProducts = storeMode === 'nursery' 
    ? NURSERY_PRODUCTS 
    : storeMode === 'medicine' 
      ? MEDICINE_PRODUCTS 
      : PRODUCTS;

  // Filter products based on active categories and search query
  const filteredProducts = activeModeProducts.filter((product) => {
    const matchesCategory = activeCategory ? product.categorySlug === activeCategory : true;
    
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesSearch =
      product.name.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.specs.some((spec) => spec.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  // Separate lists for beautiful layout sectioning depending on mode
  const pmuArrivals = storeMode === 'nursery'
    ? NURSERY_PRODUCTS.filter((p) => p.categorySlug === 'flower-plants')
    : storeMode === 'medicine'
      ? MEDICINE_PRODUCTS.filter((p) => p.categorySlug === 'cosmetics')
      : PRODUCTS.filter((p) => p.categorySlug === 'pmu-supplies' && p.isNew);

  const tattooArrivals = storeMode === 'nursery'
    ? NURSERY_PRODUCTS.filter((p) => p.categorySlug === 'organic-fertilizer' || p.categorySlug === 'seed-balls')
    : storeMode === 'medicine'
      ? MEDICINE_PRODUCTS.filter((p) => p.categorySlug === 'pmu-supplies' || p.categorySlug === 'accessories')
      : PRODUCTS.filter((p) => p.categorySlug === 'tattoo-supplies');

  const discountProducts = activeModeProducts.filter((p) => p.discount);

  if (viewState === 'auth') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800 antialiased animate-fade-in" id="beauty-visit-pmu-auth-view">
        {toastMessage && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-brand-800 text-white text-xs py-3 px-5 rounded-full shadow-2xl border border-brand-700/60 flex items-center gap-2 animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-brand-100 animate-spin-slow" />
            <span className="font-medium tracking-wide">{toastMessage}</span>
          </div>
        )}
        <AuthPage
          onAuthSuccess={(userData) => {
            setUser(userData);
            localStorage.setItem('by_user_profile', JSON.stringify(userData));
            setViewState('store');
            showToast(`Successfully Authorized! Welcome, ${userData.name}.`);
          }}
          onSkip={() => {
            setViewState('store');
            showToast('Welcome as Guest! Enjoy browsing Bittu Yadav Ventures.');
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800 antialiased" id="beauty-visit-pmu-app">
      {/* Toast Notification overlay */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-brand-800 text-white text-xs py-3 px-5 rounded-full shadow-2xl border border-brand-700/60 flex items-center gap-2 animate-fade-in-up">
          <Sparkles className="w-4 h-4 text-brand-100 animate-spin-slow" />
          <span className="font-medium tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Header Panel */}
      <Header
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        currency={currency}
        setCurrency={setCurrency}
        language={language}
        setLanguage={setLanguage}
        wishlistCount={wishlist.length}
        onSelectCategory={handleCategorySelect}
        activeCategory={activeCategory}
        storeMode={storeMode}
        setStoreMode={setStoreMode}
        user={user}
        setUser={setUser}
        viewState={viewState}
        setViewState={setViewState}
      />

      {viewState === 'gallery' ? (
        <GallerySection />
      ) : (
        <>
          {/* Hero Showcase (only display when not browsing filtered products) */}
          {!searchQuery && !activeCategory && (
            <HeroCarousel 
              onSelectCategory={handleCategorySelect} 
              storeMode={storeMode}
            />
          )}

          {/* Main E-commerce Stage */}
          <main className="flex-1 pb-16" id="products-section">
        
        {/* IF BROWSING FILTERED RESULTS OR SEARCH RESULTS */}
        {(searchQuery || activeCategory) ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 text-left">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-gray-100 pb-4 mb-6">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-brand-600 uppercase block">Product Catalog</span>
                <h2 className="font-serif font-extrabold text-2xl text-gray-900 mt-1">
                  {searchQuery ? `Search Results for "${searchQuery}"` : activeCategory ? activeCategory.replace('-', ' ').toUpperCase() : 'Catalog'}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 font-mono">{filteredProducts.length} premium matches found</span>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory(null);
                  }}
                  className="text-xs text-brand-700 hover:text-brand-800 font-semibold underline cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg border border-gray-100 p-8 max-w-lg mx-auto mt-6">
                <p className="font-serif font-bold text-gray-700 text-base">No premium matches found</p>
                <p className="text-xs text-gray-400 mt-2">Try searching generic keywords like "machine", "ink", "chair", "perma", or select an official brand category below.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory(null);
                  }}
                  className="mt-6 px-4 py-2 bg-brand-800 hover:bg-brand-700 text-white text-xs font-sans tracking-wide rounded-sm transition-colors cursor-pointer"
                >
                  Reset Catalog Search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onBuyNow={handleBuyNow}
                    onViewProduct={(p) => setSelectedProduct(p)}
                    isWishlisted={wishlist.includes(product.id)}
                    onToggleWishlist={handleToggleWishlist}
                    currencySymbol={currSymbol}
                    currencyRate={currRate}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* DEFAULT LANDING PAGES WITH LUXURIOUS HIGH-FIDELITY BENTO STRUCTURE */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pt-12 text-left">
            
            {/* BEST SELLERS GRID OVERVIEW */}
            <div>
              <div className="text-center mb-10">
                <span className="text-[10px] font-mono tracking-widest text-brand-600 uppercase block mb-1">RECOMMENDED COLLECTIONS</span>
                <h2 className="font-serif font-bold text-2xl md:text-3xl text-gray-900 tracking-tight">Best Sellers Categories</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(storeMode === 'nursery' 
                  ? [
                      {
                        name: 'Flower Plants',
                        slug: 'flower-plants',
                        desc: 'Jasmine, Hibiscus, Sangu Poo and exotic flowering varieties.',
                        image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&q=80&w=600',
                        itemsCount: '4 items'
                      },
                      {
                        name: 'Organic Bio Fertilizer',
                        slug: 'organic-fertilizer',
                        desc: 'Sun-dried compost, pulverized premium goat manure.',
                        image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=600',
                        itemsCount: '2 items'
                      },
                      {
                        name: 'Seed Balls',
                        slug: 'seed-balls',
                        desc: 'Tropical Malabar spinach and organic herbal vegetable seeds.',
                        image: 'https://images.unsplash.com/photo-1533038590840-1cde6b668731?auto=format&fit=crop&q=80&w=600',
                        itemsCount: '1 item'
                      }
                    ]
                  : storeMode === 'medicine'
                    ? [
                        {
                          name: 'Premium Wellness',
                          slug: 'cosmetics',
                          desc: 'Gold cell revitalizers and clinical anti-aging serums.',
                          image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=600',
                          itemsCount: '1 item'
                        },
                        {
                          name: 'Luxury Medicine',
                          slug: 'pmu-supplies',
                          desc: 'Switzerland engineered Ubiquinol and cardiac support caps.',
                          image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600',
                          itemsCount: '1 item'
                        },
                        {
                          name: 'Accessories & Care',
                          slug: 'accessories',
                          desc: 'Advanced cognitive nootropics and premium clinical stress shields.',
                          image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600',
                          itemsCount: '1 item'
                        }
                      ]
                    : [
                        {
                          name: 'Clinical Studio Furniture',
                          slug: 'studio-furniture',
                          desc: 'Ergonomic chairs, medical doctor stools, and rolling carbon drawers.',
                          image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=600',
                          itemsCount: '3 items'
                        },
                        {
                          name: 'Precision PMU Supplies',
                          slug: 'pmu-supplies',
                          desc: 'Wireless machines, long taper nano needle cartridges, and LUXE brow sets.',
                          image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=600',
                          itemsCount: '6 items'
                        },
                        {
                          name: 'Compliant Tattoo Supplies',
                          slug: 'tattoo-supplies',
                          desc: 'Nd:YAG laser removal rigs and EU REACH organic high-density inks.',
                          image: 'https://images.unsplash.com/photo-1598257006458-087169a1f08d?auto=format&fit=crop&q=80&w=600',
                          itemsCount: '3 items'
                        }
                      ]
                ).map((cat, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleCategorySelect(cat.slug)}
                    className="relative rounded-xl overflow-hidden aspect-[16/10] group cursor-pointer shadow-sm border border-gray-100 hover:shadow-lg transition-all"
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[9px] font-mono text-brand-100 tracking-widest uppercase">{cat.itemsCount}</span>
                      <h3 className="font-serif font-bold text-sm mt-0.5">{cat.name}</h3>
                      <p className="text-[10px] text-gray-200/90 leading-tight mt-1 line-clamp-2 font-light">{cat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* NEW PMU ARRIVALS GRID */}
            <div>
              <div className="flex justify-between items-baseline border-b border-gray-100 pb-4 mb-6">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-brand-600 uppercase block">
                    {storeMode === 'nursery' ? 'EXOTIC FLORA' : storeMode === 'medicine' ? 'SWISS APOTHECARY' : 'ADVANCED ENGINEERING'}
                  </span>
                  <h3 className="font-serif font-extrabold text-xl md:text-2xl text-gray-900 mt-1">
                    {storeMode === 'nursery' ? 'Exotic Flower Live Plants' : storeMode === 'medicine' ? 'Premium Clinical Medicine' : 'New PMU Arrivals'}
                  </h3>
                </div>
                <button
                  onClick={() => handleCategorySelect(storeMode === 'nursery' ? 'flower-plants' : storeMode === 'medicine' ? 'cosmetics' : 'pmu-supplies')}
                  className="text-xs text-brand-700 hover:text-brand-800 font-bold underline flex items-center gap-1 cursor-pointer"
                >
                  <span>View All {storeMode === 'nursery' ? 'Flower Plants' : storeMode === 'medicine' ? 'Wellness Serums' : 'PMU Supplies'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {pmuArrivals.slice(0, 4).map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    onAddToCart={handleAddToCart}
                    onBuyNow={handleBuyNow}
                    onViewProduct={(p) => setSelectedProduct(p)}
                    isWishlisted={wishlist.includes(prod.id)}
                    onToggleWishlist={handleToggleWishlist}
                    currencySymbol={currSymbol}
                    currencyRate={currRate}
                  />
                ))}
              </div>
            </div>

            {/* TOP BRANDS SHOWCASE */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 text-center shadow-sm">
              <span className="text-[10px] font-mono tracking-widest text-brand-600 uppercase block mb-1">OFFICIAL GOLD PARTNERS</span>
              <h3 className="font-serif font-bold text-xl text-gray-900">
                {storeMode === 'nursery' ? 'Our Certified Organic Brands' : storeMode === 'medicine' ? 'Global Lab Partners' : 'Shop by Official Brands'}
              </h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto mt-1 mb-6">
                {storeMode === 'nursery' ? 'Tested, composted and fully certified chemical-free growers.' : storeMode === 'medicine' ? 'Tested, approved and fully certified clinical-grade manufacturers.' : 'Tested, approved, and fully certified clinical-grade manufacturers.'}
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
                {(storeMode === 'nursery' ? NURSERY_BRANDS : storeMode === 'medicine' ? MEDICINE_BRANDS : BRANDS).map((br, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSearchQuery(br.name);
                      // Scroll to results
                      const element = document.getElementById('products-section');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="border border-gray-100 p-4 rounded-lg bg-gray-50/50 hover:bg-brand-50 hover:border-brand-100 hover:shadow-md transition-all cursor-pointer text-center flex flex-col justify-center items-center h-20"
                  >
                    <span className="font-serif font-extrabold text-xs tracking-wider text-brand-800 block uppercase">
                      {br.logoText}
                    </span>
                    <span className="text-[8px] text-gray-400 tracking-widest uppercase font-mono block mt-1">
                      {br.country}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* INTERACTIVE TATTOO CLINIC STUDIO MAP (HOTSPOTS) */}
            <InteractiveStudio
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              onViewProduct={(p) => setSelectedProduct(p)}
              currencySymbol={currSymbol}
              currencyRate={currRate}
              storeMode={storeMode}
            />

            {/* NEW TATTOO ARRIVALS GRID */}
            {storeMode === 'pmu' && (
              <div>
                <div className="flex justify-between items-baseline border-b border-gray-100 pb-4 mb-6">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-brand-600 uppercase block">REACH ORGANIC PIGMENTS</span>
                    <h3 className="font-serif font-extrabold text-xl md:text-2xl text-gray-900 mt-1">New Tattoo Ink & Laser Arrivals</h3>
                  </div>
                  <button
                    onClick={() => handleCategorySelect('tattoo-supplies')}
                    className="text-xs text-brand-700 hover:text-brand-800 font-bold underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All Inks & Lasers</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {tattooArrivals.slice(0, 4).map((prod) => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      onAddToCart={handleAddToCart}
                      onBuyNow={handleBuyNow}
                      onViewProduct={(p) => setSelectedProduct(p)}
                      isWishlisted={wishlist.includes(prod.id)}
                      onToggleWishlist={handleToggleWishlist}
                      currencySymbol={currSymbol}
                      currencyRate={currRate}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* HIGH FIDELITY DISCOUNTS BENTO GRID */}
            <div className="bg-brand-50/40 rounded-2xl border border-brand-100/50 p-6 md:p-10">
              <div className="text-center mb-8">
                <span className="text-[10px] font-mono tracking-widest text-brand-600 uppercase block mb-1">
                  {storeMode === 'nursery' ? 'ORGANIC DISCOUNTS' : storeMode === 'medicine' ? 'WELLNESS SPECIALS' : 'EXCLUSIVE CLINIC SPECIALS'}
                </span>
                <h3 className="font-serif font-bold text-xl md:text-2xl text-brand-800">Limited Savings & Deals</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {discountProducts.slice(0, 4).map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    onAddToCart={handleAddToCart}
                    onBuyNow={handleBuyNow}
                    onViewProduct={(p) => setSelectedProduct(p)}
                    isWishlisted={wishlist.includes(prod.id)}
                    onToggleWishlist={handleToggleWishlist}
                    currencySymbol={currSymbol}
                    currencyRate={currRate}
                  />
                ))}
              </div>
            </div>

            {/* FEATURED BLOG READS */}
            <div>
              <div className="text-center mb-8">
                <span className="text-[10px] font-mono tracking-widest text-brand-600 uppercase block mb-1">
                  {storeMode === 'nursery' ? 'ORGANIC FARMING EDITORIALS' : storeMode === 'medicine' ? 'MEDICAL RESEARCH REPORTS' : 'CLINICAL EDITORIALS'}
                </span>
                <h3 className="font-serif font-bold text-xl md:text-2xl text-gray-900">
                  {storeMode === 'nursery' ? 'Bittu Yadav Green Academy' : storeMode === 'medicine' ? 'Scientific Wellness Journal' : 'Featured Academy Blog'}
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(storeMode === 'nursery' ? NURSERY_BLOGS : storeMode === 'medicine' ? MEDICINE_BLOGS : BLOGS).map((blog) => (
                  <article
                    key={blog.id}
                    className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow text-left flex flex-col"
                  >
                    <div className="aspect-[16/10] bg-gray-50 overflow-hidden">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center text-[9px] font-mono text-gray-400 uppercase tracking-widest mb-2">
                          <span>{blog.date}</span>
                          <span>•</span>
                          <span>{blog.readTime}</span>
                        </div>
                        <h4 className="font-serif font-bold text-xs text-gray-900 line-clamp-2 leading-snug mb-2">
                          {blog.title}
                        </h4>
                        <p className="text-[10px] text-gray-500 line-clamp-3 leading-relaxed font-light">
                          {blog.excerpt}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-gray-50 mt-4 flex items-center justify-between text-[10px] text-brand-800">
                        <span className="font-semibold">{blog.author}</span>
                        <a href="#blog" className="underline font-bold hover:text-brand-700">Read Article</a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* INSTAGRAM GALLERY */}
            <div className="text-center pt-4">
              <span className="text-[10px] font-mono tracking-widest text-brand-600 uppercase block mb-1">SOCIAL INSPIRED</span>
              <h3 className="font-serif font-bold text-xl text-gray-900">Follow us on Instagram</h3>
              <p className="text-xs text-gray-500 mt-1 mb-6">Your daily source for PMU & Tattoo clinic inspiration. Over 250k beauty masters.</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                {[
                  'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=200',
                  'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=200',
                  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=200',
                  'https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&q=80&w=200',
                  'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=200',
                  'https://images.unsplash.com/photo-1597854710119-a5a843614b17?auto=format&fit=crop&q=80&w=200'
                ].map((img, i) => (
                  <div key={i} className="aspect-square rounded-lg overflow-hidden border border-gray-100 bg-gray-50 group relative cursor-pointer shadow-sm">
                    <img
                      src={img}
                      alt="Instagram micro pigmentation artwork"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-mono text-[10px]">
                      @beautyvisit
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </main>
    </>
  )}

      {/* Product Detail Modal Dialog */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        currencySymbol={currSymbol}
        currencyRate={currRate}
      />

      {/* Shopping Cart Slider Sidebar */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => {
          setIsCartOpen(false);
          setCartDrawerInitialStep(1); // reset to standard cart view on next open
        }}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        currencySymbol={currSymbol}
        currencyRate={currRate}
        storeMode={storeMode}
        initialStep={cartDrawerInitialStep}
      />

      {/* Floating Chat Assistant widget */}
      <ChatWidget />

      {/* Footer Info & Legal */}
      <Footer />
    </div>
  );
}

