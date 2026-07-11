import React, { useState } from 'react';
import { X, Mail, Lock, User, Briefcase, MapPin, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import { COUNTRIES, CountryConfig } from '../constants/countries';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currencySymbol: string;
  currencyCode: string;
  onAuthSuccess: (userData: { name: string; email: string; clinicName: string; address: string; phone: string }) => void;
  currency: string;
  setCurrency: (currency: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  currencySymbol,
  currencyCode,
  onAuthSuccess,
  currency,
  setCurrency,
  language,
  setLanguage
}: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Sign up fields
  const [fullName, setFullName] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const activeCountry = COUNTRIES.find(c => c.currencyCode === currency && c.languageCode === language)
    || COUNTRIES.find(c => c.currencyCode === currency)
    || COUNTRIES[0];


  const handleOAuthLogin = (provider: 'Google' | 'Facebook') => {
    setIsLoading(true);
    setErrorMessage('');
    setTimeout(() => {
      setIsLoading(false);
      const name = provider === 'Google' ? 'Bittu Yadav' : 'Bittu Parewa';
      const emailAddr = provider === 'Google' ? 'bittukumarparewa91029@gmail.com' : 'bittu.yadav.facebook@gmail.com';
      onAuthSuccess({
        name: name,
        email: emailAddr,
        clinicName: 'Parewa Luxury Beauty Clinic',
        address: 'AT PAREWA PS - SHIKARGANJ, EAST CHAMPARAN MOTIHARI, INDIA',
        phone: '+91 8294903200'
      });
      setSuccessMessage(`Successfully connected via ${provider}! Welcome to Platinum club.`);
      setTimeout(() => {
        setSuccessMessage('');
        onClose();
      }, 1500);
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (activeTab === 'login') {
      if (!email || !password) {
        setErrorMessage('Please fill in both email and password.');
        return;
      }
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        onAuthSuccess({
          name: email.split('@')[0].toUpperCase().replace('.', ' '),
          email: email,
          clinicName: 'Parewa Luxury Beauty Clinic',
          address: 'AT PAREWA PS - SHIKARGANJ, EAST CHAMPARAN MOTIHARI, INDIA',
          phone: '+91 8294903200'
        });
        setSuccessMessage('Authorized successfully! Welcome back.');
        setTimeout(() => {
          setSuccessMessage('');
          onClose();
        }, 1500);
      }, 1000);
    } else {
      if (!fullName || !email || !password || !phone) {
        setErrorMessage('Please fill out all mandatory fields.');
        return;
      }
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        onAuthSuccess({
          name: fullName,
          email: email,
          clinicName: clinicName || 'Professional Studio',
          address: address || 'Motihari, East Champaran, India',
          phone: phone
        });
        setSuccessMessage('Your Platinum Account has been created! Welcome.');
        setTimeout(() => {
          setSuccessMessage('');
          onClose();
        }, 1500);
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/70 backdrop-blur-md" id="luxury-auth-modal">
      {/* Backdrop overlay */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Luxury Gold and Dark-Slate Card Container */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-brand-100 overflow-hidden transform transition-all animate-fade-in-up">
        
        {/* Glamorous Top Bar Accent */}
        <div className="h-1.5 bg-gradient-to-r from-yellow-500 via-amber-600 to-yellow-500"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer z-10"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="pt-8 px-6 text-center">
          <div className="inline-flex items-center justify-center gap-1 bg-amber-50 text-amber-800 text-[10px] font-mono uppercase tracking-widest font-bold px-3 py-1 rounded-full mb-3 border border-amber-200">
            <Sparkles className="w-3 h-3 text-amber-600 animate-pulse" />
            <span>Luxury Premium Lounge</span>
          </div>
          <h2 className="font-serif font-extrabold text-2xl text-gray-900 tracking-tight leading-none">
            {activeTab === 'login' ? 'Welcome to BITTU YADAV Shop' : 'Create Luxury Account'}
          </h2>
          <p className="text-xs text-gray-500 mt-2 font-sans font-light">
            {activeTab === 'login' 
              ? 'Sign in to access your custom clinic wallet and premium discounts.' 
              : 'Join the Platinum Clinic Club for priority global shipping & exclusive rates.'}
          </p>
        </div>

        {/* Auth Tab Selectors */}
        <div className="flex border-b border-gray-100 mt-6">
          <button
            onClick={() => {
              setActiveTab('login');
              setErrorMessage('');
            }}
            className={`flex-1 py-3 text-center text-xs font-sans font-bold uppercase tracking-wider transition-all border-b-2 ${
              activeTab === 'login'
                ? 'border-brand-800 text-brand-800 bg-brand-50/20'
                : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            SIGN IN
          </button>
          <button
            onClick={() => {
              setActiveTab('signup');
              setErrorMessage('');
            }}
            className={`flex-1 py-3 text-center text-xs font-sans font-bold uppercase tracking-wider transition-all border-b-2 ${
              activeTab === 'signup'
                ? 'border-brand-800 text-brand-800 bg-brand-50/20'
                : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            SIGN UP
          </button>
        </div>

        <div className="p-6">
          {/* SUCCESS AND ERROR MESSAGES */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-xs text-red-600 font-sans">
              ⚠️ {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded text-xs text-green-700 font-sans font-semibold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* OAUTH SSO BUTTONS */}
          <div className="space-y-2.5 mb-6">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleOAuthLogin('Google')}
              className="w-full py-2.5 px-4 border border-gray-200 bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-700 font-sans font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-2.5 shadow-sm group cursor-pointer"
            >
              {/* Luxury Google Custom colored logo simulation */}
              <div className="flex items-center justify-center gap-0.5 w-4 h-4 text-[10px] font-sans font-extrabold tracking-tighter select-none">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#34A853]">g</span>
              </div>
              <span className="group-hover:translate-x-0.5 transition-transform">Continue with Google Luxury SSO</span>
            </button>

            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleOAuthLogin('Facebook')}
              className="w-full py-2.5 px-4 bg-[#1877F2] hover:bg-[#1565C0] active:bg-[#0D47A1] text-white font-sans font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg group cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
              </svg>
              <span className="group-hover:translate-x-0.5 transition-transform">Continue with Facebook Secure</span>
            </button>
          </div>

          <div className="relative flex py-2 items-center mb-5">
            <div className="flex-grow border-t border-gray-100"></div>
            <span className="flex-shrink mx-4 text-[10px] font-mono text-gray-400 uppercase tracking-widest bg-white px-1">or use email credentials</span>
            <div className="flex-grow border-t border-gray-100"></div>
          </div>

          {/* MAIN FORM */}
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs text-left">
            
            {/* Interactive Premium Country Selector - Affects Language & Currency globally */}
            <div className="bg-amber-50/40 p-3 rounded-xl border border-amber-200/40 space-y-1">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-amber-900 font-bold">
                Select Country / Region (Mudra & Bhasha)
              </label>
              <div className="relative">
                <select
                  value={activeCountry.code}
                  onChange={(e) => {
                    const found = COUNTRIES.find(c => c.code === e.target.value);
                    if (found) {
                      setCurrency(found.currencyCode);
                      setLanguage(found.languageCode);
                    }
                  }}
                  className="w-full bg-white border border-amber-200 rounded-lg py-2 px-3 text-xs focus:outline-none focus:border-brand-500 text-gray-800 font-medium cursor-pointer"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.name} ({c.currencySymbol} {c.currencyCode} — {c.languageName})
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-[10px] text-amber-800 font-light leading-snug">
                * Your clinic workspace will automatically sync to currency <strong className="font-semibold">{activeCountry.currencyCode} ({activeCountry.currencySymbol})</strong> and language <strong className="font-semibold">{activeCountry.languageName}</strong>.
              </p>
            </div>
            
            {/* SIGN UP ONLY FIELDS */}
            {activeTab === 'signup' && (
              <>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Full Name *</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bittu Yadav"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg p-2.5 pl-8 text-xs focus:outline-none focus:border-brand-500 bg-gray-50/50"
                    />
                    <User className="absolute left-2.5 top-3 w-3.5 h-3.5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Clinic / Studio Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Parewa Beauty Clinic"
                      value={clinicName}
                      onChange={(e) => setClinicName(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg p-2.5 pl-8 text-xs focus:outline-none focus:border-brand-500 bg-gray-50/50"
                    />
                    <Briefcase className="absolute left-2.5 top-3 w-3.5 h-3.5 text-gray-400" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Phone Number *</label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 8294903200"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg p-2.5 pl-8 text-xs font-mono focus:outline-none focus:border-brand-500 bg-gray-50/50"
                      />
                      <Phone className="absolute left-2.5 top-3 w-3.5 h-3.5 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">City / Country</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. Motihari, India"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg p-2.5 pl-8 text-xs focus:outline-none focus:border-brand-500 bg-gray-50/50"
                      />
                      <MapPin className="absolute left-2.5 top-3 w-3.5 h-3.5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* MANDATORY COMMON FIELDS */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Professional Email Address *</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="name@studio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg p-2.5 pl-8 text-xs focus:outline-none focus:border-brand-500 bg-gray-50/50"
                />
                <Mail className="absolute left-2.5 top-3 w-3.5 h-3.5 text-gray-400" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-semibold text-gray-700">Password *</label>
                {activeTab === 'login' && (
                  <button 
                    type="button" 
                    onClick={() => alert('An elegant reset code has been dispatched to your registered address.')}
                    className="text-[10px] text-brand-600 hover:underline"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg p-2.5 pl-8 text-xs focus:outline-none focus:border-brand-500 bg-gray-50/50"
                />
                <Lock className="absolute left-2.5 top-3 w-3.5 h-3.5 text-gray-400" />
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 py-3 bg-brand-800 hover:bg-brand-700 disabled:bg-gray-400 text-white font-sans text-xs tracking-widest font-bold uppercase rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <span>{activeTab === 'login' ? 'AUTHORIZE & ENTER' : 'CREATE PLATINUM ACCOUNT'}</span>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400 mt-4 select-none">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
              <span>clinical-safe SSL encryption protocols active.</span>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
