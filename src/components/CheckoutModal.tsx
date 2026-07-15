import { useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, CreditCard, Sparkles, Truck, CheckCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderCompleted: () => void; // Clears cart and opens notification toast
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  onOrderCompleted
}: CheckoutModalProps) {
  const [formState, setFormState] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Belfast',
    postcode: 'BT',
    cardNum: '',
    cardExp: '',
    cardCvv: '',
    paymentMethod: 'card' // 'card', 'apple', 'google'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate high-end local bank server processing delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsCompleted(true);
      setOrderId('NI-' + Math.floor(100000 + Math.random() * 900000));
    }, 1800);
  };

  const handleCloseSuccess = () => {
    onOrderCompleted(); // Empty cart
    setIsCompleted(false);
    onClose(); // Close modal
  };

  // Get estimated delivery date (2 days from now)
  const getDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    return date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop cover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-secondary-black/60 backdrop-blur-sm"
        />

        {/* Modal Stage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          className="relative bg-primary-white rounded-[24px] shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto no-scrollbar border border-gray-100 z-10 p-6 md:p-8"
        >
          {/* Close button (only visible if not completed) */}
          {!isCompleted && (
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 bg-gray-100 hover:bg-accent-pink hover:text-primary-white text-gray-500 rounded-full transition-all duration-300 cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* CHECKOUT STATE */}
          {!isCompleted ? (
            <div className="text-left">
              <span className="text-[10px] font-mono font-bold tracking-widest text-accent-pink uppercase bg-accent-pink/5 px-2.5 py-1 rounded-full">
                Secure SSL Checkout
              </span>
              <h2 className="text-2xl font-display font-extrabold text-secondary-black mt-3">
                Complete Your Order
              </h2>
              <p className="text-xs text-gray-400 mt-1 mb-6 font-sans">
                Review your items and complete details below to schedule your premium home delivery.
              </p>

              <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Form Inputs (Col 7) */}
                <div className="md:col-span-7 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-secondary-black font-mono border-b border-gray-100 pb-2">
                    1. Shipping & Contact Info
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Full Name</label>
                      <input
                        required
                        type="text"
                        name="fullName"
                        placeholder="John Montgomery"
                        value={formState.fullName}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-xs focus:bg-white focus:ring-1 focus:ring-accent-pink outline-none transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Email Address</label>
                      <input
                        required
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        value={formState.email}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-xs focus:bg-white focus:ring-1 focus:ring-accent-pink outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Contact Phone Number</label>
                      <input
                        required
                        type="tel"
                        name="phone"
                        placeholder="07712 345678"
                        value={formState.phone}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-xs focus:bg-white focus:ring-1 focus:ring-accent-pink outline-none transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">City</label>
                      <select
                        name="city"
                        value={formState.city}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-xs focus:bg-white focus:ring-1 focus:ring-accent-pink outline-none transition-all"
                      >
                        <option value="Belfast">Belfast</option>
                        <option value="Derry">Derry / Londonderry</option>
                        <option value="Lisburn">Lisburn</option>
                        <option value="Newry">Newry</option>
                        <option value="Bangor">Bangor</option>
                        <option value="Ballymena">Ballymena</option>
                        <option value="Coleraine">Coleraine</option>
                        <option value="Omagh">Omagh</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2 flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Delivery Address</label>
                      <input
                        required
                        type="text"
                        name="address"
                        placeholder="45 Malone Road"
                        value={formState.address}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-xs focus:bg-white focus:ring-1 focus:ring-accent-pink outline-none transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Postcode</label>
                      <input
                        required
                        type="text"
                        name="postcode"
                        placeholder="BT9 6RY"
                        value={formState.postcode}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-xs focus:bg-white focus:ring-1 focus:ring-accent-pink outline-none transition-all font-mono"
                      />
                    </div>
                  </div>

                  {/* Payment Method Tabs */}
                  <h3 className="text-xs font-bold uppercase tracking-wider text-secondary-black font-mono border-b border-gray-100 pb-2 pt-4">
                    2. Payment Method
                  </h3>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormState(prev => ({ ...prev, paymentMethod: 'card' }))}
                      className={`py-2 px-2 border rounded-xl text-xs font-semibold flex flex-col items-center gap-1 justify-center transition-all cursor-pointer ${
                        formState.paymentMethod === 'card'
                          ? 'border-accent-pink bg-accent-pink/5 text-accent-pink'
                          : 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-500'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Card</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormState(prev => ({ ...prev, paymentMethod: 'apple' }))}
                      className={`py-2 px-2 border rounded-xl text-xs font-semibold flex flex-col items-center gap-1 justify-center transition-all cursor-pointer ${
                        formState.paymentMethod === 'apple'
                          ? 'border-accent-pink bg-accent-pink/5 text-accent-pink'
                          : 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-500'
                      }`}
                    >
                      <span className="font-mono text-xs font-bold tracking-tight"> Pay</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormState(prev => ({ ...prev, paymentMethod: 'google' }))}
                      className={`py-2 px-2 border rounded-xl text-xs font-semibold flex flex-col items-center gap-1 justify-center transition-all cursor-pointer ${
                        formState.paymentMethod === 'google'
                          ? 'border-accent-pink bg-accent-pink/5 text-accent-pink'
                          : 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-500'
                      }`}
                    >
                      <span className="font-sans text-[10px] font-bold">Google Pay</span>
                    </button>
                  </div>

                  {/* Payment details */}
                  {formState.paymentMethod === 'card' ? (
                    <div className="space-y-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Card Number</label>
                        <div className="relative">
                          <input
                            required={formState.paymentMethod === 'card'}
                            type="text"
                            name="cardNum"
                            placeholder="4000 1234 5678 9010"
                            value={formState.cardNum}
                            onChange={handleInputChange}
                            maxLength={19}
                            className="bg-white border border-gray-200 rounded-lg py-2 pl-9 pr-3 text-xs w-full focus:ring-1 focus:ring-accent-pink outline-none transition-all font-mono"
                          />
                          <CreditCard className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Expiry Date</label>
                          <input
                            required={formState.paymentMethod === 'card'}
                            type="text"
                            name="cardExp"
                            placeholder="MM/YY"
                            maxLength={5}
                            value={formState.cardExp}
                            onChange={handleInputChange}
                            className="bg-white border border-gray-200 rounded-lg py-2 px-3 text-xs focus:ring-1 focus:ring-accent-pink outline-none transition-all font-mono"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">CVV Code</label>
                          <input
                            required={formState.paymentMethod === 'card'}
                            type="text"
                            name="cardCvv"
                            placeholder="123"
                            maxLength={3}
                            value={formState.cardCvv}
                            onChange={handleInputChange}
                            className="bg-white border border-gray-200 rounded-lg py-2 px-3 text-xs focus:ring-1 focus:ring-accent-pink outline-none transition-all font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-xl text-center text-xs font-medium font-sans">
                      Verified express login payment via {formState.paymentMethod === 'apple' ? 'Apple Pay' : 'Google Pay'} will load automatically.
                    </div>
                  )}
                </div>

                {/* Order Summary sidebar (Col 5) */}
                <div className="md:col-span-5 flex flex-col justify-between bg-gray-50 rounded-[20px] p-5 border border-gray-100">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-secondary-black font-mono border-b border-gray-200 pb-2 mb-4">
                      Order Summary
                    </h3>

                    {/* Compact Itemized List */}
                    <div className="max-h-[150px] overflow-y-auto no-scrollbar space-y-3 mb-4">
                      {cartItems.map((item) => (
                        <div key={item.product.id} className="flex justify-between gap-3 text-xs font-sans">
                          <span className="text-gray-500 truncate max-w-[150px]">
                            {item.product.name} <span className="font-bold text-secondary-black">x{item.quantity}</span>
                          </span>
                          <span className="font-semibold text-secondary-black font-mono">£{item.product.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    {/* Price Breakdowns */}
                    <div className="space-y-2 border-t border-gray-200 pt-3 text-xs font-sans">
                      <div className="flex justify-between text-gray-500">
                        <span>Items Subtotal</span>
                        <span className="font-mono">£{subtotal}</span>
                      </div>
                      <div className="flex justify-between text-gray-500">
                        <span>Delivery & Installation</span>
                        <span className="text-emerald-600 font-bold">FREE</span>
                      </div>
                      <div className="flex justify-between text-gray-500">
                        <span>Local NI VAT (20%)</span>
                        <span className="text-gray-400">Included</span>
                      </div>
                      <div className="flex justify-between text-sm font-extrabold text-secondary-black pt-2.5 border-t border-gray-200">
                        <span>Grand Total</span>
                        <span className="text-base font-extrabold text-accent-pink font-mono">£{subtotal}</span>
                      </div>
                    </div>
                  </div>

                  {/* Submission and Safety badges */}
                  <div className="mt-8 space-y-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-secondary-black hover:bg-accent-pink disabled:bg-gray-400 text-primary-white text-xs font-extrabold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Processing Order...
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4 text-emerald-400" />
                          Place Order • £{subtotal}
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-1 text-[9px] text-gray-400 font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Encrypted SSL checkout with local technical backing.
                    </div>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            /* ORDER SUCCESS CONFIRMATION STATE */
            <div className="text-center py-8 max-w-md mx-auto flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.5, rotate: -45, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ type: 'spring', damping: 12, stiffness: 180 }}
                className="w-20 h-20 bg-emerald-50 rounded-full border border-emerald-100 flex items-center justify-center text-emerald-500 mb-6"
              >
                <CheckCircle className="w-12 h-12 stroke-[1.5]" />
              </motion.div>

              <span className="text-[10px] font-mono font-bold tracking-widest text-accent-pink uppercase bg-accent-pink/5 px-2.5 py-1 rounded-full">
                Order Confirmed
              </span>
              
              <h2 className="text-2xl font-display font-extrabold text-secondary-black mt-3">
                Thank You, {formState.fullName || 'Valued Customer'}!
              </h2>
              
              <p className="text-xs text-gray-400 mt-2 font-sans">
                Your premium appliance has been reserved. A receipt was sent to <span className="text-secondary-black font-semibold">{formState.email}</span>.
              </p>

              {/* Delivery tracking panel */}
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 mt-6 w-full text-left space-y-3 font-sans">
                <div className="flex justify-between items-center text-xs pb-2 border-b border-gray-200">
                  <span className="text-gray-400 font-medium">Order ID</span>
                  <span className="font-mono font-bold text-secondary-black">{orderId}</span>
                </div>
                <div className="flex gap-3 items-start text-xs text-gray-600">
                  <Truck className="w-5 h-5 text-accent-pink shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-secondary-black">Scheduled NI Delivery</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">{getDeliveryDate()}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Our Belfast dispatch team will call you 1 hour prior to arrival to coordinate setup.</p>
                  </div>
                </div>
              </div>

              {/* Continue button */}
              <button
                onClick={handleCloseSuccess}
                className="mt-8 w-full bg-secondary-black hover:bg-accent-pink text-primary-white text-xs font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer shadow hover:shadow-lg"
              >
                <ArrowLeft className="w-4 h-4" />
                Return To Storefront
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
