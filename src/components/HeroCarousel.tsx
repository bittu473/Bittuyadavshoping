import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Shield, Award } from 'lucide-react';
import { NURSERY_HERO, MEDICINE_HERO } from '../constants/storeModesData';

const SLIDES = [
  {
    id: 1,
    tag: 'LIMITED RELEASES',
    title: 'PMU FAVORITES',
    subtitle: 'Machines. Pigments. Cartridges.',
    description: 'Everything selected for artists who demand more. Experience pristine wireless motor stability and exquisite micro-shading pigmentation options.',
    btnText: 'DISCOVER MORE',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1200', // luxurious beige background makeup
    categorySlug: 'pmu-supplies'
  },
  {
    id: 2,
    tag: 'REACH COMPLIANT',
    title: 'THE PIGMENT REVOLUTION',
    subtitle: 'Create without limits.',
    description: 'Introducing ultra-dense color formulations by Perma Blend Luxe and Biotek Milano. Non-shifting brow colors and radiant lip tints that stay true-to-tone.',
    btnText: 'SHOP PIGMENTS',
    image: 'https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&q=80&w=1200', // high end makeup cosmetics bottle row
    categorySlug: 'pmu-supplies'
  },
  {
    id: 3,
    tag: 'ERGONOMIC DESIGN',
    title: 'TATTOO STUDIO COMFORT',
    subtitle: 'Luxury Clinical Furniture.',
    description: 'Adjustable gas-lift treatment chairs, specialized lighting, and lockable carbon steel rolling cabinets constructed for long cosmetic procedures.',
    btnText: 'EXPLORE STUDIO COMFORT',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200', // clean designer salon space
    categorySlug: 'studio-furniture'
  }
];

interface HeroCarouselProps {
  onSelectCategory: (category: string) => void;
  storeMode: 'pmu' | 'nursery' | 'medicine';
}

export default function HeroCarousel({ onSelectCategory, storeMode }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const activeSlides = storeMode === 'nursery'
    ? NURSERY_HERO.map((h, i) => ({
        id: i + 1,
        tag: h.badge,
        title: h.title,
        subtitle: h.subtitle,
        description: 'Bittu Yadav premium quality selection. Secure express delivery and 100% genuine products.',
        btnText: h.linkText,
        image: h.image,
        categorySlug: h.linkSlug
      }))
    : storeMode === 'medicine'
      ? MEDICINE_HERO.map((h, i) => ({
          id: i + 1,
          tag: h.badge,
          title: h.title,
          subtitle: h.subtitle,
          description: 'Bittu Yadav premium quality selection. Secure express delivery and 100% genuine products.',
          btnText: h.linkText,
          image: h.image,
          categorySlug: h.linkSlug
        }))
      : SLIDES;

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  useEffect(() => {
    const timer = setInterval(handleNext, 6000); // auto-rotate every 6s
    return () => clearInterval(timer);
  }, [activeSlides]);

  // Reset slide index when changing mode
  useEffect(() => {
    setCurrentSlide(0);
  }, [storeMode]);

  return (
    <div className="relative w-full overflow-hidden bg-brand-50" id="hero-carousel">
      {/* Slider Container */}
      <div 
        className="flex transition-transform duration-700 ease-out h-[360px] md:h-[500px]"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {activeSlides.map((slide) => (
          <div 
            key={slide.id} 
            className="min-w-full relative h-full flex flex-col md:flex-row items-center justify-between overflow-hidden"
          >
            {/* Background color gradient + Unsplash overlay */}
            <div className="absolute inset-0 z-0">
              <img 
                src={slide.image} 
                alt={slide.title} 
                className="w-full h-full object-cover object-center opacity-35 md:opacity-25 filter grayscale-[20%]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-50 via-brand-50/90 to-transparent"></div>
            </div>

            {/* Content Left */}
            <div className="relative z-10 w-full md:w-1/2 px-6 sm:px-12 md:pl-16 xl:pl-24 text-left flex flex-col justify-center h-full max-w-3xl">
              <div className="flex items-center gap-1.5 mb-2 md:mb-3">
                <span className="bg-brand-100 text-brand-800 font-mono text-[10px] px-2.5 py-0.5 rounded-full tracking-widest font-semibold uppercase">
                  {slide.tag}
                </span>
              </div>
              <h1 className="font-serif font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-brand-800 leading-tight tracking-tight uppercase">
                {slide.title}
              </h1>
              <h2 className="font-serif italic font-light text-xl md:text-2xl lg:text-3xl text-brand-600 mb-3 md:mb-4">
                {slide.subtitle}
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6 max-w-lg font-light">
                {slide.description}
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => onSelectCategory(slide.categorySlug)}
                  className="bg-brand-800 hover:bg-brand-700 text-white px-6 py-3 text-xs tracking-widest font-bold font-sans rounded-sm transition-all duration-300 hover:shadow-lg cursor-pointer inline-flex items-center gap-2"
                >
                  <span>{slide.btnText}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Product Graphic Preview Right (Only on Desktop) */}
            <div className="relative z-10 w-1/2 h-full hidden md:flex items-center justify-center pr-12 xl:pr-24">
              <div className="relative w-72 h-72 xl:w-96 xl:h-96 rounded-full border border-brand-400/20 p-4 animate-spin-slow">
                <div className="absolute inset-2 rounded-full border border-brand-500/10"></div>
                <div className="absolute inset-8 rounded-full border border-brand-500/20"></div>
              </div>
              <div className="absolute w-64 h-64 xl:w-80 xl:h-80 rounded-2xl overflow-hidden shadow-2xl border border-white transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img 
                  src={slide.image} 
                  alt="Product representation" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded shadow-lg border border-brand-100 max-w-[200px]">
                  <p className="font-serif font-bold text-xs text-brand-800">Beauty Visit Exclusive</p>
                  <p className="text-[9px] text-gray-500 mt-1">Sourced from top global PMU suppliers</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Manual Arrow Controls */}
      <button 
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md transition-all border border-gray-100 hover:scale-105 cursor-pointer z-25"
        title="Previous promotion"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button 
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md transition-all border border-gray-100 hover:scale-105 cursor-pointer z-25"
        title="Next promotion"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Progress Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-2.5 z-25">
        {activeSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${currentSlide === idx ? 'w-8 bg-brand-800' : 'bg-brand-300'}`}
            title={`Go to slide ${idx + 1}`}
          ></button>
        ))}
      </div>

      {/* Quick features banner */}
      <div className="w-full bg-white border-t border-b border-gray-100 py-3 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-around text-xs text-gray-500 font-sans tracking-wide">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-brand-600" />
            <span>100% Medical Grade Sterile Packaging</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-brand-600" />
            <span>Official EU REACH Complaint Brands</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <span>Premium Lifetime Support & Waranty</span>
          </div>
        </div>
      </div>
    </div>
  );
}
