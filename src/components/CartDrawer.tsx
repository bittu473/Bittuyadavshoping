import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Ticket, 
  Sparkles, 
  CheckCircle, 
  ChevronDown, 
  Search, 
  HelpCircle, 
  Lock, 
  Mail, 
  Globe, 
  CreditCard 
} from 'lucide-react';
import { CartItem, Coupon } from '../types';
import { COUPONS } from '../data';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (productId: string, qty: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  currencySymbol: string;
  currencyRate: number;
  storeMode: 'pmu' | 'nursery' | 'medicine';
  initialStep?: 1 | 2 | 3;
}

const ALL_COUNTRIES = [
  { code: 'AT', name: 'Austria', flag: '🇦🇹', currencyCode: 'EUR' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', currencyCode: 'EUR' },
  { code: 'IN', name: 'India', flag: '🇮🇳', currencyCode: 'INR' },
  { code: 'US', name: 'United States', flag: '🇺🇸', currencyCode: 'USD' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currencyCode: 'GBP' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', currencyCode: 'EUR' },
  { code: 'JM', name: 'Jamaica', flag: '🇯🇲', currencyCode: 'JMD' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', currencyCode: 'JPY' },
  { code: 'JE', name: 'Jersey', flag: '🇯🇪', currencyCode: 'GBP' },
  { code: 'JO', name: 'Jordan', flag: '🇯🇴', currencyCode: 'JOD' },
  { code: 'KZ', name: 'Kazakhstan', flag: '🇰🇿', currencyCode: 'KZT' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪', currencyCode: 'KES' },
  { code: 'KI', name: 'Kiribati', flag: '🇰🇮', currencyCode: 'AUD' },
  { code: 'XK', name: 'Kosovo', flag: '🇽🇰', currencyCode: 'EUR' },
  { code: 'KW', name: 'Kuwait', flag: '🇰🇼', currencyCode: 'KWD' },
  { code: 'KG', name: 'Kyrgyzstan', flag: '🇰🇬', currencyCode: 'KGS' },
  { code: 'LA', name: 'Laos', flag: '🇱🇦', currencyCode: 'LAK' },
  { code: 'LV', name: 'Latvia', flag: '🇱🇻', currencyCode: 'EUR' },
  { code: 'FR', name: 'France', flag: '🇫🇷', currencyCode: 'EUR' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', currencyCode: 'EUR' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', currencyCode: 'CAD' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', currencyCode: 'AUD' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', currencyCode: 'AED' },
  { code: 'HT', name: 'Haiti', flag: '🇭🇹', currencyCode: 'HTG' },
  { code: 'HN', name: 'Honduras', flag: '🇭🇳', currencyCode: 'HNL' },
  { code: 'HK', name: 'Hong Kong SAR', flag: '🇭🇰', currencyCode: 'HKD' },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺', currencyCode: 'HUF' },
  { code: 'IS', name: 'Iceland', flag: '🇮🇸', currencyCode: 'ISK' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩', currencyCode: 'IDR' },
  { code: 'IQ', name: 'Iraq', flag: '🇮🇶', currencyCode: 'IQD' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪', currencyCode: 'EUR' },
  { code: 'IM', name: 'Isle of Man', flag: '🇮🇲', currencyCode: 'GBP' },
  { code: 'IL', name: 'Israel', flag: '🇮🇱', currencyCode: 'ILS' }
];

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  currencySymbol,
  currencyRate,
  storeMode,
  initialStep = 1
}: CartDrawerProps) {
  // checkoutStep: 1: Bag/Cart List, 2: Shopify Checkout form, 3: Celebration
  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3>(initialStep);

  React.useEffect(() => {
    if (isOpen) {
      setCheckoutStep(initialStep);
    }
  }, [isOpen, initialStep]);

  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState('');

  // Order Summary display state for Shopify Mode
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false);

  // Profile data prefill from localStorage
  const savedProfile = React.useMemo(() => {
    const saved = localStorage.getItem('by_user_profile');
    return saved ? JSON.parse(saved) : null;
  }, []);

  // Contact States
  const [email, setEmail] = useState(savedProfile?.email || 'bittukumarparewa91029@gmail.com');
  const [emailNews, setEmailNews] = useState(true);

  // Delivery States
  const [firstName, setFirstName] = useState(() => {
    if (savedProfile?.name) {
      return savedProfile.name.split(' ')[0] || '';
    }
    return 'Bittu';
  });
  
  const [lastName, setLastName] = useState(() => {
    if (savedProfile?.name) {
      const parts = savedProfile.name.split(' ');
      return parts.length > 1 ? parts.slice(1).join(' ') : 'Kumar';
    }
    return 'Parewa';
  });

  const [company, setCompany] = useState(savedProfile?.clinicName || 'Parewa Clinical Lab & Studio');
  const [address, setAddress] = useState(savedProfile?.address || 'AT PAREWA PS - SHIKARGANJ, EAST CHAMPARAN MOTIHARI');
  const [apartment, setApartment] = useState('');
  const [postalCode, setPostalCode] = useState('845418');
  const [city, setCity] = useState('Motihari');
  const [stateName, setStateName] = useState('Bihar');
  const [phone, setPhone] = useState(savedProfile?.phone || '+91 8294903200');

  // Country Picker Modal
  const [isCountryPickerOpen, setIsCountryPickerOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(ALL_COUNTRIES[2]); // Default India 🇮🇳

  // Payment Selection Accordion
  // 'card' | 'paypal' | 'klarna' | 'crypto' | 'popular' | 'bank'
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'klarna' | 'crypto' | 'popular' | 'bank'>('card');
  const [useShippingAsBilling, setUseShippingAsBilling] = useState(true);

  // Simulated Credit Card States
  const [cardNumber, setCardNumber] = useState('4111  2222  3333  9102');
  const [cardExpiry, setCardExpiry] = useState('07 / 30');
  const [cardCvv, setCardCvv] = useState('910');
  const [cardName, setCardName] = useState(`${firstName} ${lastName}`);

  if (!isOpen) return null;

  const formatPrice = (price: number) => {
    return (price * currencyRate).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const rawSubtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  
  // Calculate Coupon Discount
  const discountAmount = appliedCoupon ? (rawSubtotal * appliedCoupon.discountPercent / 100) : 0;
  const subtotalAfterDiscount = rawSubtotal - discountAmount;

  // Shipping threshold (e.g., 290 EUR)
  const shippingThreshold = 290;
  const isFreeShipping = rawSubtotal >= shippingThreshold;
  const shippingCost = isFreeShipping ? 0 : 25; // 25 EUR flat rate shipping if under limit

  const finalTotal = subtotalAfterDiscount + shippingCost;

  const handleApplyCoupon = () => {
    setCouponError('');
    const found = COUPONS.find(c => c.code.toUpperCase() === couponInput.trim().toUpperCase());
    if (found) {
      setAppliedCoupon(found);
      setCouponInput('');
    } else {
      setCouponError('Invalid promo code. Try WELCOME10 or REACHFREE!');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep(3); // Order success celebration
  };

  const handleResetCartAndClose = () => {
    onClearCart();
    setCheckoutStep(1);
    setAppliedCoupon(null);
    onClose();
  };

  // Filter countries for selector sheet
  const filteredCountries = ALL_COUNTRIES.filter(c => 
    c.name.toLowerCase().includes(countrySearch.toLowerCase()) || 
    c.code.toLowerCase().includes(countrySearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="cart-drawer">
      {/* Black Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white flex flex-col shadow-2xl border-l border-gray-100 relative">
          
          {/* Drawer Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white z-10">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-800" />
              <h2 className="font-sans font-bold text-base text-gray-900">
                {checkoutStep === 1 && 'My Shopping Bag'}
                {checkoutStep === 2 && 'Checkout'}
                {checkoutStep === 3 && 'Order Confirmed!'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              title="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto bg-white text-left">
            
            {/* STEP 1: ITEM LIST */}
            {checkoutStep === 1 && (
              <div className="p-5">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col justify-center items-center text-center py-12">
                    <div className="w-16 h-16 bg-gray-50 text-gray-300 flex items-center justify-center rounded-full mb-4">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <p className="font-serif font-bold text-gray-700 text-sm">Your shopping bag is empty</p>
                    <p className="text-xs text-gray-400 mt-1 max-w-[240px]">Browse our premium catalog to add items to your shopping bag!</p>
                    <button
                      onClick={onClose}
                      className="mt-6 px-5 py-2 bg-brand-800 hover:bg-brand-700 text-white font-sans text-xs tracking-wider font-semibold rounded-sm transition-colors cursor-pointer"
                    >
                      CONTINUE SHOPPING
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.product.id} className="flex gap-4 pb-4 border-b border-gray-100 items-start">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded border border-gray-100 bg-gray-50 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest block mb-0.5">
                            {item.product.brand}
                          </span>
                          <h4 className="font-sans font-semibold text-xs text-gray-900 leading-tight truncate">
                            {item.product.name}
                          </h4>
                          <span className="font-mono text-xs font-bold text-brand-800 block mt-1">
                            {currencySymbol}{formatPrice(item.product.price)}
                          </span>

                          {/* Qty & Delete bar */}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center border border-gray-200 rounded overflow-hidden bg-gray-50 text-xs">
                              <button
                                onClick={() => onUpdateQty(item.product.id, item.quantity - 1)}
                                className="px-2 py-0.5 hover:bg-gray-100 font-bold text-gray-500"
                                title="Decrease item quantity"
                              >
                                -
                              </button>
                              <span className="px-2.5 font-mono font-bold text-brand-800 text-[11px]">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQty(item.product.id, item.quantity + 1)}
                                className="px-2 py-0.5 hover:bg-gray-100 font-bold text-gray-500"
                                title="Increase item quantity"
                              >
                                +
                              </button>
                            </div>

                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              className="text-gray-400 hover:text-red-600 transition-colors p-1"
                              title="Delete item from bag"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Promo Code Input section */}
                    <div className="pt-4 pb-2">
                      <span className="text-xs font-semibold text-gray-700 block mb-2">Have a Promotional Code?</span>
                      {appliedCoupon ? (
                        <div className="flex items-center justify-between bg-green-50 text-green-800 p-2.5 rounded text-xs border border-green-200">
                          <div className="flex items-center gap-2">
                            <Ticket className="w-4 h-4" />
                            <span>Promo <b>{appliedCoupon.code}</b> Applied (-{appliedCoupon.discountPercent}%)</span>
                          </div>
                          <button
                            onClick={handleRemoveCoupon}
                            className="text-green-800 font-bold hover:text-red-600 ml-2"
                            title="Remove promo code"
                          >
                            &times;
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="e.g. WELCOME10"
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value)}
                            className="flex-1 border border-gray-200 rounded-sm px-3 py-1.5 text-xs font-mono uppercase focus:outline-none focus:border-brand-500 bg-gray-50"
                          />
                          <button
                            onClick={handleApplyCoupon}
                            className="bg-brand-800 hover:bg-brand-700 text-white font-sans text-xs font-bold tracking-widest px-4 py-1.5 rounded-sm transition-colors cursor-pointer"
                          >
                            APPLY
                          </button>
                        </div>
                      )}
                      {couponError && <p className="text-[10px] text-red-500 mt-1 font-sans">{couponError}</p>}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 2: HIGH-FIDELITY SHOPIFY CHECKOUT */}
            {checkoutStep === 2 && (
              <div className="animate-fade-in pb-12">
                
                {/* 1. ORDER SUMMARY COLLAPSIBLE HEADER (Screenshot 13) */}
                <div className="bg-[#F5F5F5] border-y border-gray-200 text-xs py-3.5 px-4 flex flex-col">
                  <button 
                    type="button"
                    onClick={() => setIsOrderSummaryOpen(!isOrderSummaryOpen)}
                    className="flex justify-between items-center w-full focus:outline-none text-brand-800 font-medium"
                  >
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4" />
                      <span>{isOrderSummaryOpen ? 'Hide order summary' : 'Show order summary'}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-250 ${isOrderSummaryOpen ? 'rotate-180' : ''}`} />
                    </div>
                    <span className="font-bold text-gray-900 font-mono text-sm">
                      {currencySymbol}{formatPrice(finalTotal)}
                    </span>
                  </button>

                  {isOrderSummaryOpen && (
                    <div className="mt-4 pt-4 border-t border-gray-200/60 space-y-3 animate-fade-in">
                      {cart.map((item) => (
                        <div key={item.product.id} className="flex justify-between items-center text-xs">
                          <div className="flex items-center gap-3 relative">
                            <div className="relative">
                              <img 
                                src={item.product.image} 
                                alt={item.product.name} 
                                className="w-12 h-12 object-cover rounded border border-gray-200 bg-white" 
                              />
                              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gray-500 text-white text-[10px] flex items-center justify-center rounded-full font-bold">
                                {item.quantity}
                              </span>
                            </div>
                            <div className="text-left">
                              <p className="font-semibold text-gray-800 max-w-[180px] truncate">{item.product.name}</p>
                              <p className="text-[10px] text-gray-400 uppercase font-mono">{item.product.brand}</p>
                            </div>
                          </div>
                          <span className="font-mono font-semibold text-gray-800">
                            {currencySymbol}{formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      ))}

                      {/* Summary calculations nested */}
                      <div className="border-t border-gray-200/60 pt-3.5 space-y-2 text-gray-600">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span className="font-mono font-medium text-gray-800">{currencySymbol}{formatPrice(rawSubtotal)}</span>
                        </div>
                        {appliedCoupon && (
                          <div className="flex justify-between text-green-700">
                            <span>Discount ({appliedCoupon.code})</span>
                            <span className="font-mono font-bold">-{currencySymbol}{formatPrice(discountAmount)}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>Shipping</span>
                          <span className="font-mono text-gray-800">
                            {shippingCost === 0 ? 'Free' : `${currencySymbol}${formatPrice(shippingCost)}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* CHECKOUT CONTAINER FORM */}
                <form onSubmit={handleCompleteOrder} className="p-4 space-y-6">

                  {/* 2. EXPRESS CHECKOUT SECTION (Screenshot 9) */}
                  <div className="text-center">
                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-2.5">Express checkout</p>
                    <div className="grid grid-cols-3 gap-2">
                      {/* Shop Pay */}
                      <button 
                        type="button"
                        onClick={() => alert('Shop Pay checkout initiated (simulated)')}
                        className="bg-[#5A31F4] hover:bg-[#4a24df] text-white h-[42px] rounded-md flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95 shadow-sm"
                      >
                        <span className="font-sans font-black italic tracking-tighter text-sm">shop</span>
                        <span className="font-sans font-semibold text-xs text-purple-100">pay</span>
                      </button>

                      {/* PayPal */}
                      <button 
                        type="button"
                        onClick={() => alert('PayPal Express checkout initiated (simulated)')}
                        className="bg-[#FFC439] hover:bg-[#ebae1e] h-[42px] rounded-md flex items-center justify-center cursor-pointer transition-all active:scale-95 shadow-sm"
                      >
                        <span className="font-sans font-black italic text-blue-900 text-sm tracking-tight">Pay</span>
                        <span className="font-sans font-black italic text-cyan-600 text-sm tracking-tight">Pal</span>
                      </button>

                      {/* Google Pay */}
                      <button 
                        type="button"
                        onClick={() => alert('Google Pay checkout initiated (simulated)')}
                        className="bg-black hover:bg-neutral-900 text-white h-[42px] rounded-md flex items-center justify-center cursor-pointer transition-all active:scale-95 shadow-sm"
                      >
                        <span className="font-sans font-bold text-xs">G Pay</span>
                      </button>
                    </div>

                    {/* OR Divider (Screenshot 9) */}
                    <div className="relative my-5 text-center">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <span className="relative px-3 bg-white text-[10px] text-gray-400 font-bold uppercase tracking-widest">OR</span>
                    </div>
                  </div>

                  {/* 3. CONTACT INFO (Screenshot 9) */}
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-sm font-bold text-gray-900 tracking-tight">Contact</h3>
                      <button 
                        type="button" 
                        onClick={() => alert('Simulated customer sign-in')}
                        className="text-[11px] text-brand-800 underline font-medium"
                      >
                        Sign in
                      </button>
                    </div>

                    <div className="relative">
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full border border-gray-300 rounded p-3 text-xs outline-none bg-white focus:border-gray-500 focus:ring-1 focus:ring-gray-400 placeholder-gray-400 shadow-sm"
                      />
                    </div>

                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-gray-600 select-none">
                      <input 
                        type="checkbox" 
                        checked={emailNews}
                        onChange={(e) => setEmailNews(e.target.checked)}
                        className="mt-0.5 rounded border-gray-300 text-brand-800 focus:ring-brand-800 w-4 h-4 cursor-pointer"
                      />
                      <span>Email me with news and offers</span>
                    </label>
                  </div>

                  {/* 4. DELIVERY DETAILS (Screenshot 9, 12, 13) */}
                  <div className="space-y-3 pt-2">
                    <h3 className="text-sm font-bold text-gray-900 tracking-tight">Delivery</h3>

                    {/* Country/Region dropdown display (Screenshot 9) */}
                    <div 
                      onClick={() => setIsCountryPickerOpen(true)}
                      className="border border-gray-300 rounded p-2.5 flex justify-between items-center cursor-pointer hover:border-gray-400 bg-white shadow-sm"
                    >
                      <div className="text-left">
                        <span className="block text-[9px] text-gray-400 uppercase font-bold tracking-wider leading-none">Country/Region</span>
                        <span className="text-xs font-semibold text-gray-800 leading-normal">
                          {selectedCountry.flag} {selectedCountry.name}
                        </span>
                      </div>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>

                    {/* First & Last name grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <input 
                        type="text" 
                        required
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="border border-gray-300 rounded p-3 text-xs outline-none bg-white focus:border-gray-500 focus:ring-1 focus:ring-gray-400 placeholder-gray-400 shadow-sm"
                      />
                      <input 
                        type="text" 
                        required
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="border border-gray-300 rounded p-3 text-xs outline-none bg-white focus:border-gray-500 focus:ring-1 focus:ring-gray-400 placeholder-gray-400 shadow-sm"
                      />
                    </div>

                    {/* Company (Optional) */}
                    <input 
                      type="text" 
                      placeholder="Company (optional)"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full border border-gray-300 rounded p-3 text-xs outline-none bg-white focus:border-gray-500 focus:ring-1 focus:ring-gray-400 placeholder-gray-400 shadow-sm"
                    />

                    {/* Address with Search icon (Screenshot 13) */}
                    <div className="relative">
                      <input 
                        type="text" 
                        required
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full border border-gray-300 rounded p-3 pr-10 text-xs outline-none bg-white focus:border-gray-500 focus:ring-1 focus:ring-gray-400 placeholder-gray-400 shadow-sm"
                      />
                      <Search className="absolute right-3.5 top-3.5 w-4 h-4 text-gray-400" />
                    </div>

                    {/* Apartment, suite, etc */}
                    <input 
                      type="text" 
                      placeholder="Apartment, suite, etc. (optional)"
                      value={apartment}
                      onChange={(e) => setApartment(e.target.value)}
                      className="w-full border border-gray-300 rounded p-3 text-xs outline-none bg-white focus:border-gray-500 focus:ring-1 focus:ring-gray-400 placeholder-gray-400 shadow-sm"
                    />

                    {/* Postal code, City, State Name (Screenshot 12) */}
                    <div className="grid grid-cols-3 gap-2">
                      <input 
                        type="text" 
                        required
                        placeholder="Postal code"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="border border-gray-300 rounded p-3 text-xs outline-none bg-white focus:border-gray-500 focus:ring-1 focus:ring-gray-400 placeholder-gray-400 shadow-sm font-mono"
                      />
                      <input 
                        type="text" 
                        required
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="border border-gray-300 rounded p-3 text-xs outline-none bg-white focus:border-gray-500 focus:ring-1 focus:ring-gray-400 placeholder-gray-400 shadow-sm"
                      />
                      <input 
                        type="text" 
                        required
                        placeholder="State"
                        value={stateName}
                        onChange={(e) => setStateName(e.target.value)}
                        className="border border-gray-300 rounded p-3 text-xs outline-none bg-white focus:border-gray-500 focus:ring-1 focus:ring-gray-400 placeholder-gray-400 shadow-sm"
                      />
                    </div>

                    {/* Phone with help (Screenshot 12) */}
                    <div className="relative">
                      <input 
                        type="text" 
                        required
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full border border-gray-300 rounded p-3 pr-10 text-xs outline-none bg-white focus:border-gray-500 focus:ring-1 focus:ring-gray-400 placeholder-gray-400 shadow-sm font-mono"
                      />
                      <HelpCircle className="absolute right-3.5 top-3.5 w-4 h-4 text-gray-400 cursor-help" title="Needed for courier transit updates." />
                    </div>
                  </div>

                  {/* 5. SHIPPING METHOD SECTION (Screenshot 12) */}
                  <div className="space-y-2.5 pt-2">
                    <h3 className="text-sm font-bold text-gray-900 tracking-tight">Shipping method</h3>
                    <div className="bg-[#F8F9FA] border border-gray-200 rounded p-4 text-xs text-gray-500 leading-normal text-left">
                      {address && city && postalCode ? (
                        <div className="flex justify-between items-center font-sans text-gray-700 font-semibold animate-fade-in">
                          <div className="space-y-0.5">
                            <span className="block text-gray-900 font-bold text-xs">Insured Express Courier</span>
                            <span className="text-[10px] text-gray-400 font-normal">Dispatched with security monitoring</span>
                          </div>
                          <span className="font-mono text-xs text-green-700">
                            {shippingCost === 0 ? 'FREE' : `${currencySymbol}${formatPrice(shippingCost)}`}
                          </span>
                        </div>
                      ) : (
                        <span>Enter your shipping address to view available shipping methods.</span>
                      )}
                    </div>
                  </div>

                  {/* 6. PAYMENT OPTIONS WITH COLLAPSIBLE FIELDS (Screenshot 10, 11) */}
                  <div className="space-y-3 pt-2">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 tracking-tight">Payment</h3>
                      <p className="text-[10px] text-gray-400">All transactions are secure and encrypted.</p>
                    </div>

                    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm text-xs">
                      
                      {/* Credit Card radio item */}
                      <div className="border-b border-gray-200">
                        <label className={`p-3.5 flex items-center justify-between cursor-pointer hover:bg-gray-50/50 transition-colors ${paymentMethod === 'card' ? 'bg-[#F9FAFB]' : ''}`}>
                          <div className="flex items-center gap-3">
                            <input 
                              type="radio" 
                              name="checkout_payment"
                              checked={paymentMethod === 'card'}
                              onChange={() => setPaymentMethod('card')}
                              className="accent-brand-800 w-4 h-4 cursor-pointer"
                            />
                            <span className="font-semibold text-gray-800">Credit card</span>
                          </div>
                          {/* Card logos */}
                          <div className="flex gap-1 items-center">
                            <span className="bg-white border border-gray-200 rounded px-1.5 py-0.5 text-[8px] font-bold text-blue-800 tracking-tighter">VISA</span>
                            <span className="bg-white border border-gray-200 rounded px-1.5 py-0.5 text-[8px] font-bold text-red-600 tracking-tighter">MC</span>
                            <span className="text-[9px] text-gray-400 font-medium pl-1">+2</span>
                          </div>
                        </label>

                        {/* Card input nested container (Screenshot 11) */}
                        {paymentMethod === 'card' && (
                          <div className="p-3.5 bg-[#F9FAFB] border-t border-gray-200 space-y-3 animate-fade-in text-left">
                            <div className="relative">
                              <input 
                                type="text" 
                                placeholder="Card number"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                className="w-full border border-gray-300 rounded p-2.5 pr-9 text-xs outline-none bg-white focus:border-gray-500 focus:ring-1 focus:ring-gray-400 font-mono shadow-inner"
                              />
                              <Lock className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <input 
                                type="text" 
                                placeholder="Expiration date (MM / YY)"
                                value={cardExpiry}
                                onChange={(e) => setCardExpiry(e.target.value)}
                                className="border border-gray-300 rounded p-2.5 text-xs outline-none bg-white focus:border-gray-500 focus:ring-1 focus:ring-gray-400 font-mono shadow-inner"
                              />
                              <div className="relative">
                                <input 
                                  type="password" 
                                  placeholder="Security code"
                                  value={cardCvv}
                                  onChange={(e) => setCardCvv(e.target.value)}
                                  className="w-full border border-gray-300 rounded p-2.5 pr-9 text-xs outline-none bg-white focus:border-gray-500 focus:ring-1 focus:ring-gray-400 font-mono shadow-inner"
                                />
                                <HelpCircle className="absolute right-3 top-3 w-4 h-4 text-gray-400 cursor-help" title="3-digit CVV number on reverse." />
                              </div>
                            </div>

                            <input 
                              type="text" 
                              placeholder="Name on card"
                              value={cardName}
                              onChange={(e) => setCardName(e.target.value)}
                              className="w-full border border-gray-300 rounded p-2.5 text-xs outline-none bg-white focus:border-gray-500 focus:ring-1 focus:ring-gray-400 shadow-inner"
                            />
                          </div>
                        )}
                      </div>

                      {/* PayPal option (Screenshot 10) */}
                      <div className="border-b border-gray-200">
                        <label className={`p-3.5 flex items-center justify-between cursor-pointer hover:bg-gray-50/50 transition-colors ${paymentMethod === 'paypal' ? 'bg-[#F9FAFB]' : ''}`}>
                          <div className="flex items-center gap-3">
                            <input 
                              type="radio" 
                              name="checkout_payment"
                              checked={paymentMethod === 'paypal'}
                              onChange={() => setPaymentMethod('paypal')}
                              className="accent-brand-800 w-4 h-4 cursor-pointer"
                            />
                            <span className="font-semibold text-gray-800">PayPal</span>
                          </div>
                          <span className="text-[10px] italic font-black text-blue-900">PayPal</span>
                        </label>
                      </div>

                      {/* Klarna option (Screenshot 10) */}
                      <div className="border-b border-gray-200">
                        <label className={`p-3.5 flex items-center justify-between cursor-pointer hover:bg-gray-50/50 transition-colors ${paymentMethod === 'klarna' ? 'bg-[#F9FAFB]' : ''}`}>
                          <div className="flex items-center gap-3">
                            <input 
                              type="radio" 
                              name="checkout_payment"
                              checked={paymentMethod === 'klarna'}
                              onChange={() => setPaymentMethod('klarna')}
                              className="accent-brand-800 w-4 h-4 cursor-pointer"
                            />
                            <span className="font-semibold text-gray-800">Klarna</span>
                          </div>
                          <span className="bg-[#FFB3C7] text-[#0A0A0A] font-bold px-1.5 py-0.5 rounded text-[8px] font-sans">Klarna.</span>
                        </label>
                      </div>

                      {/* Crypto USDC (Screenshot 10) */}
                      <div className="border-b border-gray-200">
                        <label className={`p-3.5 flex items-center justify-between cursor-pointer hover:bg-gray-50/50 transition-colors ${paymentMethod === 'crypto' ? 'bg-[#F9FAFB]' : ''}`}>
                          <div className="flex items-center gap-3">
                            <input 
                              type="radio" 
                              name="checkout_payment"
                              checked={paymentMethod === 'crypto'}
                              onChange={() => setPaymentMethod('crypto')}
                              className="accent-brand-800 w-4 h-4 cursor-pointer"
                            />
                            <span className="font-semibold text-gray-800">Crypto: USDC</span>
                          </div>
                          <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-sans font-bold flex items-center justify-center text-[10px] shadow-sm">S</span>
                        </label>
                      </div>

                      {/* Popular Methods Option (Screenshot 10) */}
                      <div className="border-b border-gray-200">
                        <label className={`p-3.5 flex items-center justify-between cursor-pointer hover:bg-gray-50/50 transition-colors ${paymentMethod === 'popular' ? 'bg-[#F9FAFB]' : ''}`}>
                          <div className="flex items-center gap-3">
                            <input 
                              type="radio" 
                              name="checkout_payment"
                              checked={paymentMethod === 'popular'}
                              onChange={() => setPaymentMethod('popular')}
                              className="accent-brand-800 w-4 h-4 cursor-pointer"
                            />
                            <span className="font-semibold text-gray-800">All popular payment methods</span>
                          </div>
                          <div className="flex gap-1 items-center">
                            <span className="bg-[#4D63F4] text-white text-[7px] font-bold px-1 rounded-sm">paysera</span>
                            <span className="border border-gray-200 text-blue-900 text-[7px] font-bold px-1 rounded-sm">VISA</span>
                            <span className="text-[9px] text-gray-400 font-medium pl-1">+28</span>
                          </div>
                        </label>
                      </div>

                      {/* Bank Deposit (Screenshot 10) */}
                      <div>
                        <label className={`p-3.5 flex items-center justify-between cursor-pointer hover:bg-gray-50/50 transition-colors ${paymentMethod === 'bank' ? 'bg-[#F9FAFB]' : ''}`}>
                          <div className="flex items-center gap-3">
                            <input 
                              type="radio" 
                              name="checkout_payment"
                              checked={paymentMethod === 'bank'}
                              onChange={() => setPaymentMethod('bank')}
                              className="accent-brand-800 w-4 h-4 cursor-pointer"
                            />
                            <span className="font-semibold text-gray-800">Bank Deposit</span>
                          </div>
                        </label>
                      </div>

                    </div>

                    {/* Billing address selection (Screenshot 10) */}
                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-gray-600 select-none pt-2">
                      <input 
                        type="checkbox" 
                        checked={useShippingAsBilling}
                        onChange={(e) => setUseShippingAsBilling(e.target.checked)}
                        className="mt-0.5 rounded border-gray-300 text-brand-800 focus:ring-brand-800 w-4 h-4 cursor-pointer"
                      />
                      <span>Use shipping address as billing address</span>
                    </label>
                  </div>

                  {/* 7. DISCOUNT CODE SECTION (Screenshot 10) */}
                  <div className="pt-2">
                    <div className="bg-gray-50 p-3 rounded border border-gray-200 flex justify-between items-center text-xs">
                      <span className="text-gray-500 font-medium">Applied code:</span>
                      {appliedCoupon ? (
                        <div className="flex items-center gap-2 font-mono text-green-700 font-bold bg-green-100/50 px-2.5 py-1 rounded">
                          <span>{appliedCoupon.code} (-{appliedCoupon.discountPercent}%)</span>
                          <button type="button" onClick={handleRemoveCoupon} className="text-red-500 text-sm font-bold ml-1 hover:scale-110 transition-transform">&times;</button>
                        </div>
                      ) : (
                        <button 
                          type="button" 
                          onClick={() => {
                            const code = prompt('Enter promotional discount code (e.g. WELCOME10):');
                            if (code) {
                              const found = COUPONS.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
                              if (found) {
                                setAppliedCoupon(found);
                              } else {
                                alert('Invalid discount code.');
                              }
                            }
                          }}
                          className="text-brand-800 font-bold underline hover:text-brand-700"
                        >
                          Add discount
                        </button>
                      )}
                    </div>
                  </div>

                  {/* 8. PAY NOW GREEN BUTTON (Screenshot 10) */}
                  <div className="pt-3">
                    <button 
                      type="submit"
                      className="w-full py-3.5 bg-[#197B30] hover:bg-[#146226] text-white text-sm tracking-wider font-extrabold rounded-md transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                    >
                      <span>Pay now</span>
                    </button>
                  </div>

                  {/* Back button */}
                  <button 
                    type="button"
                    onClick={() => setCheckoutStep(1)}
                    className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-sans font-bold text-center rounded-md transition-colors text-xs"
                  >
                    Back to shopping bag
                  </button>

                  {/* 9. SHOPIFY COUPLING LEGAL FOOTER LINKS (Screenshot 10) */}
                  <div className="flex flex-wrap justify-center gap-x-3 gap-y-2.5 text-[10px] text-gray-400 font-medium underline border-t border-gray-150 pt-5">
                    <a href="#" onClick={(e) => { e.preventDefault(); alert('Refund Policy: 100% money back within 30 days of transit.'); }} className="hover:text-gray-600 transition-colors">Refund policy</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); alert('Shipping Policy: Insured Air dispatch with tracking identifier dispatched within 24 hours.'); }} className="hover:text-gray-600 transition-colors">Shipping policy</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); alert('Privacy Policy: All customer records are clinical protected under local laws.'); }} className="hover:text-gray-600 transition-colors">Privacy policy</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); alert('Terms of Service: By placing transaction you accept clinical terms and conditions.'); }} className="hover:text-gray-600 transition-colors">Terms of service</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); alert('Contact: bittukumarparewa91029@gmail.com'); }} className="hover:text-gray-600 transition-colors">Contact</a>
                  </div>

                </form>
              </div>
            )}

            {/* STEP 3: ORDER SUCCESS CELEBRATION */}
            {checkoutStep === 3 && (
              <div className="h-full flex flex-col justify-center items-center text-center p-6 py-12 animate-fade-in">
                <div className="w-16 h-16 bg-green-50 text-green-600 flex items-center justify-center rounded-full mb-5 border border-green-200 animate-bounce">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="font-serif font-extrabold text-brand-800 text-lg">Transaction Authorized!</h3>
                <p className="text-xs text-gray-500 mt-2">Thank you, {firstName} {lastName}. Your order has been securely simulated!</p>

                <div className="bg-gray-50/85 p-4 border border-gray-200/50 rounded-lg w-full mt-6 text-left space-y-2 text-xs font-sans shadow-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Order ID:</span>
                    <span className="font-mono font-bold text-gray-800">BY-91029-{storeMode.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Store Section:</span>
                    <span className="text-brand-800 font-bold uppercase">{storeMode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Shipment Method:</span>
                    <span className="text-gray-800 font-medium">Insured Priority Courier</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Destination:</span>
                    <span className="text-gray-800 font-medium text-right line-clamp-1 max-w-[200px]">{city}, {selectedCountry.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Estimated Arrival:</span>
                    <span className="text-green-700 font-bold font-sans">July 15, 2026</span>
                  </div>
                </div>

                <div className="mt-6 p-3.5 bg-brand-50 text-brand-800 rounded-md text-[10px] text-left leading-relaxed flex items-start gap-1.5 border border-brand-100">
                  <Sparkles className="w-4 h-4 text-brand-600 flex-shrink-0 animate-pulse" />
                  <span>Your simulated order is placed in our secure database. A tracking code has been prepared and dispatched.</span>
                </div>

                <button
                  onClick={handleResetCartAndClose}
                  className="mt-8 w-full py-3 bg-brand-800 hover:bg-brand-700 text-white font-sans text-xs tracking-widest font-bold uppercase rounded-md transition-all cursor-pointer shadow hover:shadow-md"
                >
                  Return to Storefront
                </button>
              </div>
            )}

          </div>

          {/* Drawer Footer (Summary calculation - Active only for step 1) */}
          {cart.length > 0 && checkoutStep === 1 && (
            <div className="p-4 border-t border-gray-100 bg-gray-50/50 space-y-3.5 text-xs text-gray-600 text-left">
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono font-semibold text-gray-800">{currencySymbol}{formatPrice(rawSubtotal)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-green-700 font-medium">
                    <span>Coupon Discount (-{appliedCoupon.discountPercent}%)</span>
                    <span className="font-mono font-bold">-{currencySymbol}{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5">
                    <span>Insured Air Courier</span>
                    {isFreeShipping && (
                      <span className="text-[9px] bg-green-100 text-green-700 px-1.5 rounded font-bold font-sans">FREE</span>
                    )}
                  </div>
                  <span className="font-mono font-semibold text-gray-800">
                    {shippingCost === 0 ? 'FREE' : `${currencySymbol}${formatPrice(shippingCost)}`}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200/60 pt-3 flex justify-between font-bold text-gray-900 text-sm">
                <span>Total Due</span>
                <span className="font-mono text-brand-800 text-base">{currencySymbol}{formatPrice(finalTotal)}</span>
              </div>

              <button
                onClick={() => setCheckoutStep(2)}
                className="w-full py-3 bg-brand-800 hover:bg-brand-700 text-white font-sans text-xs tracking-widest font-bold uppercase rounded-md transition-all shadow hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-1"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400 mt-2 font-sans select-none">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-500" />
                <span>Simulated secure SSL transactions encrypted under clinical-safe protocols.</span>
              </div>
            </div>
          )}

          {/* 10. COUNTRY SELECTOR SLEEK DARK BOTTOM-SHEET MODAL (Screenshots 1-8) */}
          {isCountryPickerOpen && (
            <div className="absolute inset-0 z-50 flex flex-col justify-end bg-black/70 animate-fade-in" id="shopify-country-picker">
              <div className="absolute inset-0" onClick={() => setIsCountryPickerOpen(false)}></div>
              
              <div className="w-full max-h-[85%] bg-[#242630] rounded-t-2xl shadow-2xl flex flex-col relative z-50 text-white animate-slide-up pb-6">
                
                {/* Header (Screenshot 1-8 look) */}
                <div className="p-4 flex justify-between items-center border-b border-gray-800">
                  <span className="font-sans font-bold text-sm tracking-wide text-gray-200">Country/Region</span>
                  <button 
                    onClick={() => setIsCountryPickerOpen(false)}
                    className="p-1 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Search Bar inside dark sheet */}
                <div className="p-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Search country..."
                      value={countrySearch}
                      onChange={(e) => setCountrySearch(e.target.value)}
                      className="w-full bg-[#1E1F26] border border-gray-700 rounded-lg p-2.5 pl-9 text-xs text-white outline-none focus:border-brand-500 placeholder-gray-500"
                    />
                  </div>
                </div>

                {/* Scrollable list of countries (Screenshot 1-8 look with right circular radio button) */}
                <div className="flex-1 overflow-y-auto px-4 max-h-[400px] text-sm divide-y divide-gray-800">
                  {filteredCountries.map((c) => {
                    const isSelected = selectedCountry.code === c.code;
                    return (
                      <div 
                        key={c.code}
                        onClick={() => {
                          setSelectedCountry(c);
                          setIsCountryPickerOpen(false);
                        }}
                        className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-800/40 rounded px-2 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg select-none">{c.flag}</span>
                          <span className="font-medium text-gray-100">{c.name}</span>
                        </div>
                        {/* Radio indicator (Screenshot 1-8 circular radio outline or filled circle) */}
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'border-brand-500 bg-brand-500/10' : 'border-gray-600'}`}>
                          {isSelected && (
                            <div className="w-2.5 h-2.5 rounded-full bg-brand-500 animate-scale-in"></div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {filteredCountries.length === 0 && (
                    <div className="text-center py-8 text-gray-500 text-xs">
                      No countries found matching "{countrySearch}"
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
