import React, { useState } from 'react';
import { Search, User, ShoppingBag, Heart, Globe, ChevronDown, Sparkles, LogOut } from 'lucide-react';
import { CartItem } from '../types';
import AuthModal from './AuthModal';
import { COUNTRIES, CountryConfig } from '../constants/countries';

interface HeaderProps {
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currency: string;
  setCurrency: (currency: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
  wishlistCount: number;
  onSelectCategory: (category: string | null) => void;
  activeCategory: string | null;
  storeMode: 'pmu' | 'nursery' | 'medicine';
  setStoreMode: (mode: 'pmu' | 'nursery' | 'medicine') => void;
  user: {
    name: string;
    email: string;
    clinicName: string;
    address: string;
    phone: string;
  } | null;
  setUser: (user: any) => void;
  viewState: 'auth' | 'store' | 'gallery';
  setViewState: (view: 'auth' | 'store' | 'gallery') => void;
}

export default function Header({
  cart,
  setIsCartOpen,
  searchQuery,
  setSearchQuery,
  currency,
  setCurrency,
  language,
  setLanguage,
  wishlistCount,
  onSelectCategory,
  activeCategory,
  storeMode,
  setStoreMode,
  user,
  setUser,
  viewState,
  setViewState
}: HeaderProps) {
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleAuthSuccess = (userData: typeof user) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem('by_user_profile', JSON.stringify(userData));
    } else {
      localStorage.removeItem('by_user_profile');
    }
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('by_user_profile');
    setIsAccountModalOpen(false);
    setViewState('auth');
  };

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Active country is resolved based on currently selected currency and language
  const currentCountry = COUNTRIES.find(c => c.currencyCode === currency && c.languageCode === language)
    || COUNTRIES.find(c => c.currencyCode === currency)
    || COUNTRIES[0];

  const currentCurrencyObj = {
    symbol: currentCountry.currencySymbol,
    code: currentCountry.currencyCode,
    flag: currentCountry.flag,
    name: currentCountry.name
  };


  return (
    <header className="w-full z-40 bg-white border-b border-gray-100 sticky top-0" id="premium-header">
      {/* Dynamic top promo announcement */}
      <div className="bg-brand-800 text-white text-center py-2 px-4 text-xs font-sans tracking-wider flex justify-center items-center gap-2 font-light">
        <span>Free shipping for orders over {currentCurrencyObj.symbol}{currency === 'EUR' ? '290' : currency === 'USD' ? '320' : '25,000'} (Except for studio furniture)</span>
        <span className="hidden md:inline-block">|</span>
        <span className="hidden md:flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-brand-100 animate-pulse" /> Use Code <b>WELCOME10</b> for 10% OFF!
        </span>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => onSelectCategory(null)}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-brand-800 text-white font-serif flex items-center justify-center font-bold text-xl rounded-sm group-hover:bg-brand-700 transition-colors">
              {storeMode === 'nursery' ? 'BYN' : storeMode === 'medicine' ? 'BYM' : 'BY'}
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif font-bold tracking-widest text-lg text-gray-900 leading-tight uppercase">
                {storeMode === 'nursery' ? 'BITTU YADAV NURSERY' : storeMode === 'medicine' ? 'BITTU YADAV MEDICINE' : 'BITTU YADAV'}
              </span>
              <span className="font-mono text-[9px] tracking-[0.25em] text-brand-600 leading-none uppercase">
                {storeMode === 'nursery' ? 'Organic & Live Flora' : storeMode === 'medicine' ? 'Luxury Apothecary' : 'P M U  S H O P'}
              </span>
            </div>
          </button>
        </div>

        {/* Center-Left: Luxury Stacked Switcher (3-line options, circling on tap) */}
        <div className="flex flex-col items-start gap-1 py-1 px-3 border border-brand-100/50 bg-brand-50/20 rounded-xl" id="by-store-mode-switcher">
          <span className="text-[8px] font-mono tracking-widest text-brand-600 uppercase block leading-none mb-1">Select Active Store:</span>
          <div className="flex flex-col gap-1 text-left">
            {[
              { mode: 'pmu' as const, label: 'BITTU YADAV PMU SHOP' },
              { mode: 'nursery' as const, label: 'BITTU YADAV NURSERY' },
              { mode: 'medicine' as const, label: 'BITTU YADAV MEDICINE' }
            ].map((option) => (
              <button
                key={option.mode}
                onClick={() => {
                  setStoreMode(option.mode);
                  localStorage.setItem('by_store_mode', option.mode);
                  onSelectCategory(null);
                }}
                className={`relative px-2.5 py-0.5 text-[9px] font-sans font-extrabold tracking-wider transition-all cursor-pointer text-left flex items-center gap-2 ${
                  storeMode === option.mode
                    ? 'text-brand-800 font-black rounded-full bg-brand-100/60 ring-2 ring-brand-700 ring-offset-1 scale-[1.03]'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full'
                }`}
              >
                {/* Custom Gola (Circle) indicator */}
                <span className={`w-1.5 h-1.5 rounded-full transition-all ${storeMode === option.mode ? 'bg-brand-800 scale-125' : 'bg-gray-300'}`}></span>
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Center: Search input */}
        <div className="flex-1 max-w-md mx-4 hidden sm:block relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Search premium PMU machines, inks, furniture..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 pl-4 pr-10 border border-gray-200 rounded-full text-xs font-sans focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all bg-gray-50/50"
            />
            <Search className="absolute right-3.5 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          {/* Unified Country, Language & Mudra Selector */}
          <div className="relative">
            <button
              onClick={() => {
                setIsCountryDropdownOpen(!isCountryDropdownOpen);
              }}
              className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-brand-800 font-medium py-1 px-2.5 rounded-full border border-gray-200 hover:border-gray-300 bg-gray-50/50 hover:bg-white transition-all cursor-pointer shadow-sm"
              title="Select Country, Language & Currency"
            >
              <span className="text-sm leading-none">{currentCountry.flag}</span>
              <span className="hidden md:inline font-sans text-xs text-gray-700">{currentCountry.name}</span>
              <span className="font-mono text-[10px] text-gray-500">({currentCountry.currencySymbol} {currentCountry.currencyCode} · {currentCountry.languageCode})</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>
            {isCountryDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-100 rounded-xl shadow-2xl py-1.5 z-50 max-h-80 overflow-y-auto" id="unified-country-selector">
                <div className="px-3 py-1 border-b border-gray-50 mb-1">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-gray-400">Select Clinic Region</span>
                </div>
                {COUNTRIES.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      setCurrency(c.currencyCode);
                      setLanguage(c.languageCode);
                      setIsCountryDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex justify-between items-center hover:bg-brand-50 transition-colors ${currentCountry.code === c.code ? 'font-bold text-brand-800 bg-brand-50/40' : 'text-gray-600'}`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-base">{c.flag}</span>
                      <div className="flex flex-col text-left">
                        <span className="font-semibold text-gray-800">{c.name}</span>
                        <span className="text-[10px] text-gray-400 font-light">{c.languageName}</span>
                      </div>
                    </span>
                    <span className="font-mono text-[10px] text-brand-600 font-bold bg-brand-50 px-1.5 py-0.5 rounded">{c.currencySymbol} {c.currencyCode}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Profile */}
          <button
            onClick={() => {
              if (user) {
                setIsAccountModalOpen(true);
              } else {
                setViewState('auth');
              }
            }}
            className="p-1.5 rounded-full text-gray-600 hover:text-brand-800 hover:bg-gray-50 transition-colors relative cursor-pointer"
            title="My Account"
          >
            <User className="w-5 h-5" />
            {user && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white"></span>
            )}
          </button>

          {/* Wishlist */}
          <div className="relative">
            <button
              className="p-1.5 rounded-full text-gray-600 hover:text-brand-800 hover:bg-gray-50 transition-colors cursor-pointer"
              title="My Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-[9px] w-4 h-4 flex items-center justify-center font-bold font-sans">
                  {wishlistCount}
                </span>
              )}
            </button>
          </div>

          {/* Shopping Bag / Cart */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-1.5 bg-brand-100 hover:bg-brand-100/80 text-brand-800 rounded-full transition-all relative flex items-center justify-center cursor-pointer"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-800 text-white rounded-full text-[9px] w-4 h-4 flex items-center justify-center font-bold font-sans">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Sub-bar / Categories navigation */}
      <div className="w-full bg-brand-50/30 border-t border-gray-100 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center space-x-6 text-xs font-sans tracking-wide">
          
          {/* Main View Switchers */}
          <div className="flex items-center space-x-2 border-r border-gray-200/80 pr-6 shrink-0" id="main-view-switcher">
            <button
              onClick={() => {
                setViewState('store');
                onSelectCategory(null);
              }}
              className={`px-3 py-1.5 text-xs font-sans font-extrabold tracking-wider rounded-full transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                viewState === 'store'
                  ? 'bg-brand-800 text-white shadow-sm scale-105'
                  : 'bg-white text-gray-600 border border-gray-200 hover:text-brand-800'
              }`}
            >
              <span>🏪 Shop Store</span>
            </button>
            <button
              onClick={() => {
                setViewState('gallery');
                onSelectCategory(null);
              }}
              className={`px-3 py-1.5 text-xs font-sans font-extrabold tracking-wider rounded-full transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                viewState === 'gallery'
                  ? 'bg-brand-800 text-white shadow-sm scale-105'
                  : 'bg-white text-gray-600 border border-gray-200 hover:text-brand-800'
              }`}
            >
              <span>🎨 Visual Gallery</span>
            </button>
            <button
              onClick={() => {
                setViewState('auth');
              }}
              className={`px-3 py-1.5 text-xs font-sans font-extrabold tracking-wider rounded-full transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                viewState === 'auth'
                  ? 'bg-brand-800 text-white shadow-sm scale-105'
                  : 'bg-white text-gray-600 border border-gray-200 hover:text-brand-800'
              }`}
            >
              <span>🔑 Access Portal</span>
            </button>
          </div>

          <button
            onClick={() => {
              setViewState('store');
              onSelectCategory(null);
            }}
            className={`font-medium py-1 px-2.5 transition-all rounded-md cursor-pointer whitespace-nowrap ${
              activeCategory === null && viewState === 'store'
                ? 'bg-brand-800 text-white font-semibold shadow-sm'
                : 'text-gray-600 hover:text-brand-800 hover:bg-gray-100'
            }`}
          >
            All Products
          </button>
          {(storeMode === 'nursery'
            ? [
                { label: 'Flower Plants', slug: 'flower-plants' },
                { label: 'Organic Bio Fertilizer', slug: 'organic-fertilizer' },
                { label: 'Seed Balls', slug: 'seed-balls' },
                { label: 'Garden Tools', slug: 'accessories' }
              ]
            : storeMode === 'medicine'
              ? [
                  { label: 'Premium Wellness', slug: 'cosmetics' },
                  { label: 'Luxury Clinical Medicine', slug: 'pmu-supplies' },
                  { label: 'Health Accessories', slug: 'accessories' }
                ]
              : [
                  { label: 'PMU Supplies', slug: 'pmu-supplies' },
                  { label: 'Tattoo Supplies', slug: 'tattoo-supplies' },
                  { label: 'Studio Furniture', slug: 'studio-furniture' },
                  { label: 'Accessories', slug: 'accessories' },
                  { label: 'Beauty Cosmetics', slug: 'cosmetics' }
                ]
          ).map((cat) => (
            <button
              key={cat.slug}
              onClick={() => {
                setViewState('store');
                onSelectCategory(cat.slug);
              }}
              className={`font-medium py-1 px-2.5 transition-all rounded-md cursor-pointer whitespace-nowrap ${
                activeCategory === cat.slug && viewState === 'store'
                  ? 'bg-brand-800 text-white font-semibold shadow-sm'
                  : 'text-gray-600 hover:text-brand-800 hover:bg-gray-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="px-4 py-2 sm:hidden bg-gray-50 border-t border-gray-100">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-1.5 pl-3 pr-8 border border-gray-200 rounded-md text-xs font-sans focus:outline-none focus:border-brand-500 bg-white"
          />
          <Search className="absolute right-2.5 top-2 w-3.5 h-3.5 text-gray-400" />
        </div>
      </div>

      {/* Account Info Simulation Modal */}
      {isAccountModalOpen && user && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 text-left border border-amber-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-yellow-500"></div>
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
              <h3 className="font-serif font-extrabold text-lg text-brand-800 tracking-tight flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>My Platinum Lounge</span>
              </h3>
              <button 
                onClick={() => setIsAccountModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold p-1 cursor-pointer"
              >
                &times;
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-50 text-amber-800 border border-amber-200/50 flex items-center justify-center font-bold rounded-full text-base">
                  {user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'BY'}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm tracking-tight">{user.name}</h4>
                  <p className="text-xs text-gray-500 font-mono">{user.email}</p>
                </div>
              </div>
              <div className="bg-brand-50/50 p-3 rounded-lg border border-brand-100/40 text-xs text-brand-800 space-y-1">
                <span className="font-bold text-amber-800 block">👑 Platinum Club Member</span>
                <p className="font-light text-gray-600 leading-relaxed">Enjoying custom clinic wallet discounts, priority global shipping, and direct access to top PMU master technicians.</p>
              </div>
              <div className="border-t border-gray-100 pt-3 space-y-2">
                <div className="flex justify-between text-xs text-gray-600">
                  <span className="font-light">Clinic Affiliate:</span>
                  <span className="font-medium text-gray-800">{user.clinicName}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span className="font-light">Clinic Address:</span>
                  <span className="text-right text-gray-800 max-w-[200px] truncate" title={user.address}>{user.address}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span className="font-light">Phone Contact:</span>
                  <span className="font-mono text-gray-800">{user.phone}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span className="font-light">Simulated Wallet:</span>
                  <span className="font-mono font-bold text-brand-800">
                    {currentCurrencyObj.symbol}
                    {currency === 'EUR' ? '1,540.00' : 
                     currency === 'USD' ? '1,680.00' : 
                     currency === 'INR' ? '1,32,000.00' : 
                     currency === 'GBP' ? '1,310.00' :
                     currency === 'CAD' ? '2,280.00' :
                     currency === 'AUD' ? '2,510.00' :
                     currency === 'JPY' ? '264,000' : '6,170.00'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleSignOut}
                className="flex-1 py-2 border border-red-200 hover:bg-red-50 text-red-600 font-medium rounded-lg text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
              <button
                onClick={() => setIsAccountModalOpen(false)}
                className="flex-1 py-2 bg-brand-800 hover:bg-brand-700 text-white font-medium rounded-lg text-xs transition-colors cursor-pointer"
              >
                Close Panel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Luxury Register & Sign In Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currencyCode={currency}
        currencySymbol={currentCurrencyObj.symbol}
        onAuthSuccess={handleAuthSuccess}
        currency={currency}
        setCurrency={setCurrency}
        language={language}
        setLanguage={setLanguage}
      />
    </header>
  );
}
