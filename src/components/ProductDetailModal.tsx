import React, { useState } from 'react';
import { X, Star, ShoppingCart, ShieldCheck, Truck, RefreshCw, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
  currencySymbol: string;
  currencyRate: number;
}

const SAMPLE_REVIEWS = [
  { name: 'Dr. Evelyn Martinez', rating: 5, comment: 'Absolutely stellar performance! The motor runs completely vibration-free, which is crucial for doing high-precision eyebrows. Highly recommend this brand.', date: '3 days ago' },
  { name: 'Marco Rossi (Milano PMU)', rating: 5, comment: 'Pristine ink flow and low noise. My clients are much calmer now. This is the true meaning of clinical beauty supplies.', date: '1 week ago' },
  { name: 'Surbhi Sharma', rating: 4, comment: 'Exceptional build quality. The battery lasts exactly as advertised, which lets me handle 2 lip shading appointments in a row without plugging in. Delivery was fast too.', date: '2 weeks ago' }
];

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  currencySymbol,
  currencyRate
}: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');

  if (!product) return null;

  const formatPrice = (price: number) => {
    return (price * currencyRate).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const handleQtyChange = (val: number) => {
    if (val >= 1 && val <= 10) {
      setQuantity(val);
    }
  };

  const calculatedRating = product.rating;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-10 z-50 animate-fade-in" id="product-detail-modal">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto flex flex-col md:flex-row relative border border-gray-100 text-left">
        {/* Absolute dismiss button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer z-10"
          title="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Product Image & Rating */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 bg-gray-50/50 flex flex-col justify-center items-center border-r border-gray-100">
          <div className="w-full max-w-[340px] aspect-square rounded-lg overflow-hidden shadow-md border border-white bg-white">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-6 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(calculatedRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`}
                />
              ))}
              <span className="text-sm font-bold text-gray-800 font-mono ml-1">{calculatedRating}</span>
            </div>
            <p className="text-xs text-gray-500">Based on {product.reviewsCount} verified clinic reviews</p>
          </div>

          {/* Quick guarantees badges */}
          <div className="w-full border-t border-gray-200/60 mt-6 pt-4 grid grid-cols-3 gap-3 text-center text-[10px] text-gray-500 font-sans">
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-5 h-5 text-brand-600 mb-1" />
              <span className="font-semibold block">Sterile Safe</span>
              <span>100% Certified</span>
            </div>
            <div className="flex flex-col items-center">
              <Truck className="w-5 h-5 text-brand-600 mb-1" />
              <span className="font-semibold block">Swift Courier</span>
              <span>In-stock priority</span>
            </div>
            <div className="flex flex-col items-center">
              <RefreshCw className="w-5 h-5 text-brand-600 mb-1" />
              <span className="font-semibold block">Easy Returns</span>
              <span>14-day replacement</span>
            </div>
          </div>
        </div>

        {/* Right Column: Descriptions, Specs, Purchasing */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            {/* Brand */}
            <span className="text-[10px] font-mono tracking-widest text-brand-600 uppercase block mb-1">
              {product.brand}
            </span>

            {/* Name */}
            <h2 className="font-serif font-extrabold text-xl sm:text-2xl text-gray-900 leading-tight mb-2 pr-8">
              {product.name}
            </h2>

            {/* Badges */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] bg-brand-100 text-brand-800 font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                {product.category}
              </span>
              {product.isNew && (
                <span className="text-[10px] bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                  New Release
                </span>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-6">
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through font-mono">
                  {currencySymbol}{formatPrice(product.originalPrice)}
                </span>
              )}
              <span className="text-xl font-bold text-brand-800 font-sans">
                {currencySymbol}{formatPrice(product.price)}
              </span>
              {product.discount && (
                <span className="text-xs bg-red-100 text-red-600 font-bold px-1.5 py-0.5 rounded font-mono">
                  Save {product.discount.replace('Sale -', '')}
                </span>
              )}
            </div>

            {/* Product description Tabs */}
            <div className="border-b border-gray-100 flex space-x-6 text-xs mb-4">
              <button
                onClick={() => setActiveTab('desc')}
                className={`pb-2 font-medium cursor-pointer ${activeTab === 'desc' ? 'border-b-2 border-brand-800 text-brand-800 font-semibold' : 'text-gray-500'}`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-2 font-medium cursor-pointer ${activeTab === 'specs' ? 'border-b-2 border-brand-800 text-brand-800 font-semibold' : 'text-gray-500'}`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-2 font-medium cursor-pointer ${activeTab === 'reviews' ? 'border-b-2 border-brand-800 text-brand-800 font-semibold' : 'text-gray-500'}`}
              >
                Clinical Reviews
              </button>
            </div>

            {/* Tab Contents */}
            <div className="min-h-[140px] text-xs text-gray-600 leading-relaxed max-h-[220px] overflow-y-auto mb-6 pr-2">
              {activeTab === 'desc' && (
                <div className="space-y-3">
                  <p>{product.description}</p>
                  {product.features && (
                    <div className="pt-2">
                      <span className="font-semibold block text-brand-800 mb-1.5">Key Highlights:</span>
                      <ul className="list-disc pl-4 space-y-1">
                        {product.features.map((feat, i) => (
                          <li key={i}>{feat}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'specs' && (
                <ul className="space-y-2 font-mono divide-y divide-gray-50">
                  {product.specs.map((spec, i) => (
                    <li key={i} className="py-1.5 flex justify-between gap-4">
                      <span className="text-gray-400">{spec.split(':')[0]}:</span>
                      <span className="text-gray-800 font-medium text-right">{spec.split(':')[1] || 'Yes'}</span>
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  {SAMPLE_REVIEWS.map((rev, i) => (
                    <div key={i} className="border-b border-gray-50 pb-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-gray-800">{rev.name}</span>
                        <span className="text-[10px] text-gray-400">{rev.date}</span>
                      </div>
                      <div className="flex text-yellow-400 mb-1">
                        {[...Array(rev.rating)].map((_, starIdx) => (
                          <Star key={starIdx} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-[11px] text-gray-500 italic">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Controls: Quantity Selector & Add Button */}
          <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
            {!product.isSoldOut ? (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-700">Quantity</span>
                  <div className="flex items-center border border-gray-200 rounded-sm overflow-hidden bg-gray-50">
                    <button
                      onClick={() => handleQtyChange(quantity - 1)}
                      className="px-3 py-1.5 hover:bg-gray-100 font-bold text-gray-600 transition-colors text-sm"
                      title="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-4 font-mono font-bold text-xs text-brand-800">{quantity}</span>
                    <button
                      onClick={() => handleQtyChange(quantity + 1)}
                      className="px-3 py-1.5 hover:bg-gray-100 font-bold text-gray-600 transition-colors text-sm"
                      title="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-2">
                  <button
                    onClick={() => {
                      onAddToCart(product, quantity);
                      onClose();
                    }}
                    className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-sans text-xs tracking-widest font-bold uppercase rounded-sm transition-all shadow flex items-center justify-center gap-2 cursor-pointer text-center"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>ADD TO BAG</span>
                  </button>
                  <button
                    onClick={() => {
                      onBuyNow(product, quantity);
                      onClose();
                    }}
                    className="w-full py-3 bg-brand-800 hover:bg-brand-700 text-white font-sans text-xs tracking-widest font-bold uppercase rounded-sm transition-all shadow hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer text-center"
                  >
                    <span>BUY NOW</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="bg-gray-50 p-4 text-center rounded border border-gray-100">
                <span className="font-mono text-xs font-semibold text-gray-400 block uppercase mb-1">Out of Stock</span>
                <p className="text-[10px] text-gray-400">Leave your email in our floating chat to be alerted when next batch lands!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
