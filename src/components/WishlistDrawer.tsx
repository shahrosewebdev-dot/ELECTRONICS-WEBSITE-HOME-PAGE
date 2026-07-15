import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistItems: Product[];
  onRemoveItem: (product: Product) => void;
  onMoveToCart: (product: Product) => void;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlistItems,
  onRemoveItem,
  onMoveToCart
}: WishlistDrawerProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop cover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-secondary-black/60 backdrop-blur-sm"
        />

        {/* Drawer Container */}
        <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="w-screen max-w-md bg-primary-white shadow-2xl flex flex-col animate-in duration-300"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-accent-pink fill-current" />
                <h2 className="text-base sm:text-lg font-display font-bold text-secondary-black">
                  Your Wishlist
                </h2>
                <span className="text-xs bg-gray-100 text-gray-500 font-mono font-bold px-2 py-0.5 rounded-full">
                  {wishlistItems.length}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-gray-100 rounded-full text-gray-400 hover:text-secondary-black transition-colors cursor-pointer"
                aria-label="Close Wishlist"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content list */}
            <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
              {wishlistItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 border border-gray-100 mb-4">
                    <Heart className="w-8 h-8" />
                  </div>
                  <h3 className="text-sm font-bold text-secondary-black uppercase tracking-wider font-mono">
                    Wishlist is Empty
                  </h3>
                  <p className="text-xs text-gray-400 font-sans mt-2 max-w-xs">
                    Found an appliance you love? Save it here while you plan, compare specifications, and build your dream home setup.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 bg-secondary-black hover:bg-accent-pink text-primary-white text-xs font-semibold py-3 px-6 rounded-xl transition-all duration-300 cursor-pointer"
                  >
                    Explore Products
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {wishlistItems.map((product) => (
                    <div
                      key={product.id}
                      className="flex gap-4 p-3 bg-gray-50 rounded-2xl border border-gray-100/50 relative group"
                    >
                      {/* Image stage */}
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-gray-100 shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details and direct Add/Delete controllers */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between text-left">
                        <div>
                          <span className="text-[9px] font-mono font-bold tracking-widest text-accent-pink uppercase">
                            {product.category}
                          </span>
                          <h4 className="text-xs font-bold text-secondary-black truncate">
                            {product.name}
                          </h4>
                          <p className="text-xs font-extrabold text-secondary-black mt-1">
                            £{product.price}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 mt-3">
                          {/* Move to Cart button */}
                          <button
                            onClick={() => onMoveToCart(product)}
                            className="flex-1 bg-secondary-black hover:bg-accent-pink text-primary-white text-[10px] font-bold py-1.5 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            Move to Cart
                          </button>

                          {/* Remove button */}
                          <button
                            onClick={() => onRemoveItem(product)}
                            className="p-1.5 bg-white border border-gray-200 text-gray-400 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
