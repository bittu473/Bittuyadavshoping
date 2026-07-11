import React, { useState } from 'react';
import { Facebook, Youtube, Instagram, Twitter, Mail, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-brand-800 text-brand-50 pt-16 pb-8 border-t border-brand-700 font-sans" id="premium-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-left">
        
        {/* Column 1: Brand details & registration */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white text-brand-800 font-serif flex items-center justify-center font-bold text-lg rounded-sm">
              BY
            </div>
            <span className="font-serif font-bold tracking-widest text-base uppercase">BITTU YADAV Shop</span>
          </div>
          <p className="text-xs text-brand-100/80 leading-relaxed font-light">
            BITTU YADAV Shop: Premium Tattoo & PMU supplies. High-quality inks, needles, machines & accessories for medical and aesthetic professionals. Shop now for Top Brands.
          </p>
          <div className="text-[10px] text-brand-100/60 font-mono space-y-1.5 pt-2">
            <p>BV SHOPPING Group</p>
            <p>Registration Code: 457898647</p>
            <p>VAT ID: LT100058875525</p>
            <p>Address: AT PAREWA PS - SHIKARGANJ PIN CODE-845418,EAST CHAMPARAN MOTIHARI, INDIA</p>
            <p>Phone: +918294903200</p>
            <p>E-mail: bittukumarparewa91029@gmail.com</p>
          </div>
          
          {/* Social icons */}
          <div className="flex items-center space-x-3.5 pt-3">
            {[
              { icon: <Facebook className="w-4 h-4" />, url: 'https://facebook.com' },
              { icon: <Youtube className="w-4 h-4" />, url: 'https://youtube.com' },
              { icon: <Instagram className="w-4 h-4" />, url: 'https://instagram.com' },
              { icon: <Twitter className="w-4 h-4" />, url: 'https://twitter.com' }
            ].map((soc, i) => (
              <a
                key={i}
                href={soc.url}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-brand-700 hover:border-brand-100 flex items-center justify-center text-brand-100 hover:text-white transition-all hover:scale-105"
              >
                {soc.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Delivery & Info */}
        <div className="space-y-4">
          <h4 className="font-serif font-bold text-sm tracking-wide border-b border-brand-700/60 pb-2 text-white">
            Delivery & Information
          </h4>
          <ul className="space-y-2.5 text-xs text-brand-100/80 font-light">
            {[
              'Shipping & Delivery Rates',
              'Terms & conditions of Sale',
              'Return and Refund Policy',
              'European REACH Regulation compliance',
              'Order Tracking Status',
              'Grievance Redressal Desk'
            ].map((item, idx) => (
              <li key={idx}>
                <a href="#info" className="hover:text-white hover:underline transition-colors block">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: About & FAQ */}
        <div className="space-y-4">
          <h4 className="font-serif font-bold text-sm tracking-wide border-b border-brand-700/60 pb-2 text-white">
            About BVShop
          </h4>
          <ul className="space-y-2.5 text-xs text-brand-100/80 font-light">
            {[
              'Our Heritage & Vision',
              'Featured Clinic Blog',
              'PMU Shade Matching Guide',
              'Machine Maintenance Support',
              'Authorized Retailer Network',
              'Contact Care Team'
            ].map((item, idx) => (
              <li key={idx}>
                <a href="#about" className="hover:text-white hover:underline transition-colors block">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="space-y-4">
          <h4 className="font-serif font-bold text-sm tracking-wide border-b border-brand-700/60 pb-2 text-white">
            Premium Updates
          </h4>
          <p className="text-xs text-brand-100/80 leading-relaxed font-light">
            Sign up for exclusive offers, pigment shade releases, events and reach regulatory updates directly in your inbox.
          </p>

          {subscribed ? (
            <div className="bg-brand-700 text-brand-100 p-3 rounded text-xs border border-brand-600">
              ✓ Subscribed successfully! Thank you.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-brand-700 border border-brand-600 rounded px-3 py-2 text-xs text-white placeholder-brand-100/40 focus:outline-none focus:border-brand-100"
              />
              <button
                type="submit"
                className="bg-white hover:bg-brand-50 text-brand-800 p-2 rounded transition-colors flex items-center justify-center cursor-pointer"
                title="Subscribe to newsletter"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="pt-2 flex items-center gap-1.5 text-[10px] text-brand-100/50">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>GDPR Guarded. Unsubscribe anytime.</span>
          </div>
        </div>

      </div>

      {/* Under the fold: Payment methods & Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-brand-700/60 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-xs text-brand-100/50 font-light text-center md:text-left">
          &copy; 2026 BITTU YADAV Shop. All Rights Reserved. Sourced & distributed by BV SHOPPING Group.
        </p>
        
        {/* High-fidelity e-commerce payment badges with brand colors */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {/* Apple Pay */}
          <span className="bg-[#000000] text-white border border-neutral-800 hover:bg-neutral-900 px-3 py-1.5 rounded-md text-[10px] font-sans font-extrabold tracking-tight shadow-sm transition-all flex items-center gap-1 select-none">
            <span className="text-xs"></span> Pay
          </span>

          {/* Google Pay */}
          <span className="bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 px-3 py-1.5 rounded-md text-[10px] font-sans font-bold shadow-sm transition-all flex items-center gap-1.5 select-none">
            <span className="flex gap-0.5 font-sans font-extrabold text-[10px]">
              <span className="text-[#4285F4]">G</span>
              <span className="text-[#EA4335]">o</span>
              <span className="text-[#FBBC05]">o</span>
              <span className="text-[#34A853]">g</span>
              <span className="text-[#4285F4]">l</span>
              <span className="text-[#EA4335]">e</span>
            </span>
            <span className="text-gray-500 font-medium">Pay</span>
          </span>

          {/* Visa */}
          <span className="bg-[#1434CB] text-[#F7B614] border border-[#0f289e] hover:bg-[#122eb4] px-3 py-1.5 rounded-md text-[11px] font-serif font-black italic tracking-wider shadow-sm transition-all select-none">
            VISA
          </span>

          {/* Mastercard */}
          <span className="bg-[#212121] text-white border border-neutral-800 hover:bg-neutral-900 px-3 py-1.5 rounded-md text-[10px] font-sans font-bold shadow-sm transition-all flex items-center gap-2 select-none">
            <div className="flex -space-x-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#EB001B]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F00] opacity-90"></div>
            </div>
            <span>mastercard</span>
          </span>

          {/* PayPal */}
          <span className="bg-[#003087] hover:bg-[#002464] text-white border border-[#00205b] px-3 py-1.5 rounded-md text-[10px] font-sans font-black italic tracking-tight shadow-sm transition-all flex items-center gap-1 select-none">
            <span className="text-[#0079C1] not-italic">Pay</span>Pal
          </span>

          {/* Klarna */}
          <span className="bg-[#FFB3C7] text-neutral-950 border border-[#e59fb1] hover:bg-[#ffa1b9] px-3 py-1.5 rounded-md text-[10px] font-sans font-black tracking-tighter shadow-sm transition-all flex items-center gap-0.5 select-none">
            <span>Klarna.</span>
          </span>

          {/* Shop Pay */}
          <span className="bg-[#5629B6] hover:bg-[#4a229e] text-white border border-[#3e1b85] px-3 py-1.5 rounded-md text-[10px] font-sans font-extrabold shadow-sm transition-all flex items-center gap-1 select-none">
            <span className="text-[#96F2D7]">shop</span>Pay
          </span>
        </div>
      </div>
    </footer>
  );
}
