import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Heart, ShoppingBag, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
}

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onToggleWishlist,
  wishlistIds
}: QuickViewModalProps) {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const isWishlisted = wishlistIds.includes(product.id);
  const saveAmount = product.originalPrice ? product.originalPrice - product.price : 0;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setQuantity(1); // Reset quantity counter
    onClose(); // Close modal on add
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-secondary-black/60 backdrop-blur-sm"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative bg-primary-white rounded-[24px] shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto no-scrollbar border border-gray-100 z-10 p-6 md:p-8 flex flex-col md:flex-row gap-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 bg-gray-100 hover:bg-accent-pink hover:text-primary-white text-gray-500 rounded-full transition-all duration-300 cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Left Column: Image Stage */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <div className="relative aspect-square rounded-[18px] overflow-hidden bg-gray-50 border border-gray-100">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {product.tag && (
                <span className={`absolute top-4 left-4 text-[9px] font-mono font-bold tracking-wider uppercase px-3 py-1 rounded-full text-primary-white ${
                  product.tag === 'New' ? 'bg-emerald-500' : 'bg-amber-500'
                }`}>
                  {product.tag}
                </span>
              )}
            </div>

            {/* Quick Guarantees bar */}
            <div className="bg-gray-50 rounded-xl p-3 grid grid-cols-3 gap-2 text-center border border-gray-100">
              <div className="flex flex-col items-center">
                <Truck className="w-4 h-4 text-accent-pink mb-1" />
                <span className="text-[9px] font-bold text-secondary-black uppercase">Fast NI delivery</span>
              </div>
              <div className="flex flex-col items-center border-x border-gray-200">
                <ShieldCheck className="w-4 h-4 text-accent-pink mb-1" />
                <span className="text-[9px] font-bold text-secondary-black uppercase">Warranty</span>
              </div>
              <div className="flex flex-col items-center">
                <RefreshCw className="w-4 h-4 text-accent-pink mb-1" />
                <span className="text-[9px] font-bold text-secondary-black uppercase">2-Step testing</span>
              </div>
            </div>
          </div>

          {/* Right Column: Copywriting, Specifications & CTAs */}
          <div className="w-full md:w-1/2 flex flex-col justify-between text-left">
            <div>
              {/* Category */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono text-accent-pink font-bold uppercase tracking-wider bg-accent-pink/5 px-2.5 py-1 rounded-full">
                  {product.category}
                </span>
                {product.grade && (
                  <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full">
                    {product.grade}
                  </span>
                )}
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-display font-bold text-secondary-black leading-tight">
                {product.name}
              </h2>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-extrabold text-secondary-black">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-xs text-gray-400 font-mono">
                  ({product.reviewsCount} customer reviews)
                </span>
              </div>

              {/* Pricing banner */}
              <div className="flex items-baseline gap-3 mt-5">
                <span className="text-2xl font-extrabold text-secondary-black">
                  £{product.price}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-sm text-gray-400 line-through font-mono">
                      £{product.originalPrice}
                    </span>
                    <span className="text-xs font-bold text-accent-pink bg-accent-pink/5 px-2 py-0.5 rounded-full font-sans">
                      You save £{saveAmount}
                    </span>
                  </>
                )}
              </div>

              {/* Product description */}
              <p className="text-xs text-gray-500 font-sans leading-relaxed mt-4">
                {product.description}
              </p>

              {/* Technical Specifications Specs Panel */}
              <div className="mt-5">
                <h4 className="text-xs font-extrabold text-secondary-black uppercase tracking-wider font-mono mb-2">
                  Technical Specifications
                </h4>
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 flex flex-col gap-1.5">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="flex justify-between text-[11px] font-sans border-b border-gray-200/50 last:border-b-0 pb-1 last:pb-0">
                      <span className="text-gray-400 font-medium">{key}</span>
                      <span className="text-secondary-black font-semibold text-right">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Buying Controls */}
            <div className="mt-6 pt-5 border-t border-gray-100 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                {/* Quantity adjuster */}
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden h-11 bg-gray-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 hover:bg-gray-100 text-gray-500 font-extrabold transition-colors cursor-pointer h-full"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-mono font-bold text-secondary-black w-8 text-center select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 hover:bg-gray-100 text-gray-500 font-extrabold transition-colors cursor-pointer h-full"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-secondary-black hover:bg-accent-pink text-primary-white text-xs font-bold h-11 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow hover:shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add To Shopping Cart
                </button>

                {/* Wishlist Icon Toggle */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3 rounded-xl border transition-all duration-300 cursor-pointer h-11 flex items-center justify-center ${
                    isWishlisted
                      ? 'bg-accent-pink border-accent-pink text-primary-white'
                      : 'bg-primary-white border-gray-200 text-gray-500 hover:text-accent-pink hover:border-accent-pink'
                  }`}
                  aria-label="Add to Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Delivery notification tag */}
              <div className="text-[10px] text-gray-400 font-sans flex items-center justify-center gap-1.5 bg-gray-100/50 py-1.5 rounded-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Guaranteed safe contactless dispatch from Belfast. Delivery within 2 days.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
