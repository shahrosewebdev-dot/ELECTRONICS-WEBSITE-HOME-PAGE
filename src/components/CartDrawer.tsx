import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, ArrowRight, Lock } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}: CartDrawerProps) {
  if (!isOpen) return null;

  // Real-time summary figures
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const totalOriginal = cartItems.reduce((acc, item) => acc + (item.product.originalPrice || item.product.price) * item.quantity, 0);
  const totalSavings = totalOriginal - subtotal;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop glass cover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-secondary-black/60 backdrop-blur-sm"
        />

        {/* Drawer Container Panel */}
        <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="w-screen max-w-md bg-primary-white shadow-2xl flex flex-col"
          >
            {/* Drawer Header */}
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-accent-pink" />
                <h2 className="text-base sm:text-lg font-display font-bold text-secondary-black">
                  Your Shopping Cart
                </h2>
                <span className="text-xs bg-gray-100 text-gray-500 font-mono font-bold px-2 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-gray-100 rounded-full text-gray-400 hover:text-secondary-black transition-colors cursor-pointer"
                aria-label="Close Cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body: Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 border border-gray-100 mb-4 animate-bounce">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="text-sm font-bold text-secondary-black uppercase tracking-wider font-mono">
                    Your Cart is Empty
                  </h3>
                  <p className="text-xs text-gray-400 font-sans mt-2 max-w-xs">
                    Upgrade your home space! Explore our premium selection of certified electronics & appliances and secure the best deals today.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 bg-secondary-black hover:bg-accent-pink text-primary-white text-xs font-semibold py-3 px-6 rounded-xl transition-all duration-300 cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  {cartItems.map((item) => {
                    const originalPrice = item.product.originalPrice || item.product.price;
                    const itemSavings = (originalPrice - item.product.price) * item.quantity;
                    return (
                      <div
                        key={item.product.id}
                        className="flex gap-4 p-3 bg-gray-50 rounded-2xl border border-gray-100/50 group relative"
                      >
                        {/* Remove item absolute button */}
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="absolute -top-1.5 -right-1.5 bg-primary-white hover:bg-red-50 text-gray-400 hover:text-red-500 border border-gray-100 p-1 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        {/* Image stage */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-white border border-gray-100 shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Details and adjusted controls */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between text-left">
                          <div>
                            <span className="text-[9px] font-mono font-bold tracking-widest text-accent-pink uppercase">
                              {item.product.category}
                            </span>
                            <h4 className="text-xs font-bold text-secondary-black truncate">
                              {item.product.name}
                            </h4>
                            {item.product.grade && (
                              <p className="text-[9px] text-amber-600 font-medium font-sans">
                                {item.product.grade}
                              </p>
                            )}
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            {/* Quantity buttons */}
                            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden h-7 bg-white">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, -1)}
                                className="px-2 hover:bg-gray-50 text-gray-400 font-extrabold text-xs transition-colors cursor-pointer"
                              >
                                -
                              </button>
                              <span className="px-2 text-[10px] font-mono font-bold text-secondary-black min-w-[20px] text-center select-none">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, 1)}
                                className="px-2 hover:bg-gray-50 text-gray-400 font-extrabold text-xs transition-colors cursor-pointer"
                              >
                                +
                              </button>
                            </div>

                            {/* Item Price */}
                            <div className="text-right">
                              <p className="text-xs font-bold text-secondary-black">
                                £{item.product.price * item.quantity}
                              </p>
                              {itemSavings > 0 && (
                                <p className="text-[9px] text-accent-pink font-semibold font-sans">
                                  Saved £{itemSavings}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Drawer Footer Summary & Checkout */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-100 px-6 py-5 bg-gray-50 flex flex-col gap-4 text-left">
                <div className="flex flex-col gap-1.5 text-xs font-sans">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span className="font-mono">£{subtotal}</span>
                  </div>
                  {totalSavings > 0 && (
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span>Total Savings</span>
                      <span className="font-mono">-£{totalSavings}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-500">
                    <span>Shipping Delivery</span>
                    <span className="font-bold text-emerald-600 uppercase">FREE (NI WIDE)</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-secondary-black pt-2.5 border-t border-gray-200">
                    <span>Total Amount</span>
                    <span className="text-base font-extrabold text-accent-pink font-mono">£{subtotal}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={onCheckout}
                    className="w-full bg-secondary-black hover:bg-accent-pink text-primary-white text-xs font-bold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow hover:shadow-lg"
                  >
                    Proceed To Checkout
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[9px] text-gray-400 text-center font-sans flex items-center justify-center gap-1">
                    <Lock className="w-3 h-3 text-emerald-500" />
                    Encrypted transactions secured by local Belfast processing.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
