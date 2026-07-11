import React, { useState } from 'react';
import { Mail, Lock, Phone, User, CheckCircle, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
// @ts-ignore
import bbg from '../assets/images/bittu_yadav_combined_bg_1783781465203.jpg';

interface AuthPageProps {
  onAuthSuccess: (userData: { name: string; email: string; clinicName: string; address: string; phone: string }) => void;
  onSkip: () => void;
}

export default function AuthPage({ onAuthSuccess, onSkip }: AuthPageProps) {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signup');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Sign up fields
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [gmail, setGmail] = useState('');
  const [password, setPassword] = useState('');

  // Sign in fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setErrorMsg('');
    setTimeout(() => {
      setIsLoading(false);
      onAuthSuccess({
        name: 'Bittu Yadav',
        email: 'bittukumarparewa91029@gmail.com',
        clinicName: 'Bittu Yadav Premium Ventures',
        address: 'AT PAREWA PS - SHIKARGANJ, EAST CHAMPARAN MOTIHARI, BIHAR, INDIA',
        phone: '+91 8294903200'
      });
      setSuccessMsg('Successfully Authorized via Google SSO! Welcome to Bittu Yadav Lounge.');
    }, 1200);
  };

  const handleFacebookLogin = () => {
    setIsLoading(true);
    setErrorMsg('');
    setTimeout(() => {
      setIsLoading(false);
      onAuthSuccess({
        name: 'Bittu Parewa',
        email: 'bittu.yadav.fb@gmail.com',
        clinicName: 'Parewa luxury clinic & Green Nursery',
        address: 'AT PAREWA PS - SHIKARGANJ, EAST CHAMPARAN MOTIHARI, BIHAR, INDIA',
        phone: '+91 8294903200'
      });
      setSuccessMsg('Successfully Authorized via Facebook Secure! Welcome to Platinum Lounge.');
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (activeTab === 'signup') {
      if (!firstName || !lastName || !mobileNumber || !gmail || !password) {
        setErrorMsg('Please enter all required fields (First Name, Last Name, Mobile Number, Gmail, and Password).');
        return;
      }
      if (!gmail.includes('@')) {
        setErrorMsg('Please enter a valid Gmail / Email address.');
        return;
      }

      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        const middlePart = middleName.trim() ? ` ${middleName.trim()}` : '';
        const combinedName = `${firstName.trim()}${middlePart} ${lastName.trim()}`;
        
        onAuthSuccess({
          name: combinedName,
          email: gmail,
          clinicName: 'Bittu Yadav Multipurpose Hub',
          address: 'AT PAREWA PS - SHIKARGANJ, EAST CHAMPARAN MOTIHARI, BIHAR, INDIA',
          phone: mobileNumber
        });
        setSuccessMsg(`Welcome, ${combinedName}! Account created successfully. Entering the store...`);
      }, 1500);
    } else {
      if (!loginEmail || !loginPassword) {
        setErrorMsg('Please enter your Registered Gmail and Password.');
        return;
      }
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        onAuthSuccess({
          name: loginEmail.split('@')[0].toUpperCase().replace('.', ' '),
          email: loginEmail,
          clinicName: 'Bittu Yadav Multipurpose Hub',
          address: 'AT PAREWA PS - SHIKARGANJ, EAST CHAMPARAN MOTIHARI, BIHAR, INDIA',
          phone: '+91 8294903200'
        });
        setSuccessMsg('Logged in successfully! Welcome back to the main lobby.');
      }, 1200);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative bg-cover bg-center bg-no-repeat overflow-y-auto"
      style={{ backgroundImage: `url(${bbg})` }}
      id="bittu-yadav-universal-auth-portal"
    >
      {/* Dark overlay backdrop to maintain high contrast */}
      <div className="absolute inset-0 bg-slate-900/75 backdrop-blur-[3px] z-0"></div>

      {/* Floating Skip Option on Top-Right */}
      <button 
        onClick={onSkip}
        className="absolute top-6 right-6 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-5 py-2 rounded-full text-xs font-sans tracking-widest font-extrabold uppercase transition-all shadow-lg cursor-pointer"
        title="Browse the main store directly"
      >
        Skip to Store &rarr;
      </button>

      {/* Auth Main Card */}
      <div className="relative z-10 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 max-w-xl w-full p-6 md:p-8 my-8 flex flex-col justify-between">
        
        {/* Brand Banner */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 py-1 px-3.5 bg-brand-50 border border-brand-100/60 rounded-full mb-3 text-[10px] font-mono tracking-widest text-brand-700 uppercase font-bold animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>BITTU YADAV ALL-IN-ONE PORTAL</span>
          </div>
          <h2 className="font-serif font-black text-2xl md:text-3xl text-gray-900 leading-tight uppercase tracking-tight">
            Welcome to the Hub
          </h2>
          <p className="text-xs text-gray-500 max-w-md mx-auto mt-2 leading-relaxed">
            Authorized access point for **PMU Shop**, **Live Organic Nursery**, and **Swiss Wellness Medicine Labs**.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex border-b border-gray-100 mb-6">
          <button
            onClick={() => {
              setActiveTab('signup');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`flex-1 pb-3 text-xs font-sans font-bold uppercase tracking-widest cursor-pointer transition-all ${
              activeTab === 'signup' 
                ? 'border-b-2 border-brand-800 text-brand-800 font-black' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Create Account (Sign Up)
          </button>
          <button
            onClick={() => {
              setActiveTab('signin');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`flex-1 pb-3 text-xs font-sans font-bold uppercase tracking-widest cursor-pointer transition-all ${
              activeTab === 'signin' 
                ? 'border-b-2 border-brand-800 text-brand-800 font-black' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Registered Sign In
          </button>
        </div>

        {/* Feedback Alert banners */}
        {errorMsg && (
          <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-5 rounded-r-lg text-xs text-red-800 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <p className="font-medium">{errorMsg}</p>
          </div>
        )}

        {successMsg && (
          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-3 mb-5 rounded-r-lg text-xs text-emerald-800 flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <p className="font-medium">{successMsg}</p>
          </div>
        )}

        {/* FORM GRID */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Sign Up Fields */}
          {activeTab === 'signup' ? (
            <div className="space-y-4 text-left">
              {/* Name Fields - Split */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase text-gray-500 font-bold block mb-1">First Name *</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Bittu"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full pl-3 pr-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 bg-gray-50/50"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase text-gray-500 block mb-1">Middle Name (Optional)</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Kumar"
                      value={middleName}
                      onChange={(e) => setMiddleName(e.target.value)}
                      className="w-full pl-3 pr-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 bg-gray-50/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase text-gray-500 font-bold block mb-1">Last Name *</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Yadav"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full pl-3 pr-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 bg-gray-50/50"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Mobile Number & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase text-gray-500 font-bold block mb-1">Mobile Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      placeholder="e.g. +91 8294903200"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 bg-gray-50/50"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase text-gray-500 font-bold block mb-1">Gmail / Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      placeholder="e.g. bittu@gmail.com"
                      value={gmail}
                      onChange={(e) => setGmail(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 bg-gray-50/50"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-[10px] font-mono uppercase text-gray-500 font-bold block mb-1">Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 bg-gray-50/50"
                    required
                  />
                </div>
              </div>
            </div>
          ) : (
            /* Sign In Fields */
            <div className="space-y-4 text-left">
              <div>
                <label className="text-[10px] font-mono uppercase text-gray-500 font-bold block mb-1">Registered Gmail</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    placeholder="name@gmail.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 bg-gray-50/50"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-gray-500 font-bold block mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 bg-gray-50/50"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Create Account Standard Submission Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 py-3 bg-brand-800 hover:bg-brand-700 disabled:bg-gray-400 text-white font-sans font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
          >
            <span>{isLoading ? 'Processing Access...' : activeTab === 'signup' ? 'Create Account & Enter' : 'Authorize & Enter'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Separator */}
        <div className="relative flex py-4 items-center">
          <div className="flex-grow border-t border-gray-100"></div>
          <span className="flex-shrink mx-4 text-[10px] font-mono text-gray-400 uppercase tracking-widest">or Quick Authorization</span>
          <div className="flex-grow border-t border-gray-100"></div>
        </div>

        {/* GOOGLE & FACEBOOK SOCIAL LOGIN */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="social-oauth-container">
          {/* Google Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl text-xs font-sans font-extrabold text-gray-700 transition-colors shadow-sm cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.6c-.3 1.5-1.11 2.76-2.36 3.61v3h3.84c2.25-2.07 3.66-5.12 3.66-8.72z" />
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.84-3c-1.07.72-2.45 1.16-4.09 1.16-3.15 0-5.81-2.13-6.76-5.01H1.32v3.1A12 12 0 0 0 12 24z" />
              <path fill="#FBBC05" d="M5.24 14.24a7.2 7.2 0 0 1 0-4.48V6.66H1.32a12 12 0 0 0 0 10.68l3.92-3.1z" />
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.93 1.19 15.24 0 12 0 7.28 0 3.25 2.72 1.32 6.66l3.92 3.1c.95-2.88 3.61-5.01 6.76-5.01z" />
            </svg>
            <span>Continue with Google Luxury</span>
          </button>

          {/* Facebook Button */}
          <button
            onClick={handleFacebookLogin}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-xl text-xs font-sans font-extrabold text-white transition-colors shadow-sm cursor-pointer"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span>Continue with Facebook Secure</span>
          </button>
        </div>

        {/* Footer Credit */}
        <div className="mt-6 text-center text-[10px] text-gray-400 font-mono tracking-wide leading-relaxed uppercase">
          East Champaran, Motihari • Secure Encryption Active • SSL Certified
        </div>

      </div>
    </div>
  );
}
