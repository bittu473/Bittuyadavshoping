import React from 'react';
import { Star, ShoppingCart, Eye, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: string | number;
  product: Product;
  onAddToCart: (product: Product, qty?: number) => void;
  onBuyNow: (product: Product, qty?: number) => void;
  onViewProduct: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  currencySymbol: string;
  currencyRate: number;
}

export default function ProductCard({
  product,
  onAddToCart,
  onBuyNow,
  onViewProduct,
  isWishlisted,
  onToggleWishlist,
  currencySymbol,
  currencyRate
}: ProductCardProps) {
  const formatPrice = (price: number) => {
    return (price * currencyRate).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <div 
      className="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group text-left relative"
      id={`product-card-${product.id}`}
    >
      {/* Visual Badge overlay */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
        {product.isNew && (
          <span className="bg-brand-800 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded-sm tracking-wider uppercase">
            New arrival
          </span>
        )}
        {product.isSoldOut && (
          <span className="bg-gray-400 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded-sm tracking-wider uppercase">
            Sold out
          </span>
        )}
        {product.discount && (
          <span className="bg-brand-400 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded-sm tracking-wider uppercase">
            {product.discount}
          </span>
        )}
      </div>

      {/* Wishlist toggle icon */}
      <button
        onClick={() => onToggleWishlist(product)}
        className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/90 hover:bg-white text-gray-500 hover:text-red-500 transition-colors shadow-sm cursor-pointer"
        title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
      </button>

      {/* Product Image Area */}
      <div 
        onClick={() => onViewProduct(product)}
        className="aspect-square bg-gray-50 relative overflow-hidden cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Subtle quick hover actions mask */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="bg-white/95 backdrop-blur-sm text-brand-800 text-[10px] font-bold px-3 py-1.5 rounded shadow tracking-wider uppercase flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <Eye className="w-3.5 h-3.5" /> Quick View
          </span>
        </div>
      </div>

      {/* Details Container */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Brand Label */}
        <span className="text-[10px] text-gray-400 font-mono tracking-widest uppercase mb-1">
          {product.brand}
        </span>

        {/* Product Name */}
        <h3 
          onClick={() => onViewProduct(product)}
          className="font-serif font-bold text-xs text-gray-900 leading-snug group-hover:text-brand-800 transition-colors line-clamp-2 mb-2 cursor-pointer flex-1"
        >
          {product.name}
        </h3>

        {/* Reviews Summary */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} 
              />
            ))}
          </div>
          <span className="text-[10px] text-gray-400 font-medium">({product.reviewsCount})</span>
        </div>

        {/* Pricing & Actions row */}
        <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            {product.originalPrice && (
              <span className="text-[10px] text-gray-400 line-through font-mono leading-none">
                {currencySymbol}{formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-sm font-bold text-brand-800 font-sans leading-none">
              {currencySymbol}{formatPrice(product.price)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 mt-1">
            <button
              onClick={() => {
                if (!product.isSoldOut) {
                  onAddToCart(product);
                }
              }}
              disabled={product.isSoldOut}
              className={`py-1.5 text-[9px] font-bold tracking-wider uppercase rounded-sm flex items-center justify-center gap-1 transition-all cursor-pointer ${
                product.isSoldOut
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-sm'
              }`}
            >
              <ShoppingCart className="w-3 h-3" />
              <span>Add</span>
            </button>
            <button
              onClick={() => {
                if (!product.isSoldOut) {
                  onBuyNow(product);
                }
              }}
              disabled={product.isSoldOut}
              className={`py-1.5 text-[9px] font-bold tracking-wider uppercase rounded-sm flex items-center justify-center gap-1 transition-all cursor-pointer ${
                product.isSoldOut
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-brand-800 hover:bg-brand-700 text-white shadow-sm hover:shadow-md'
              }`}
            >
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
