import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Sparkles, AlertCircle, Download, FileJson, HelpCircle, X as CloseIcon } from 'lucide-react';

// Sub-components
import Header from './components/Header';
import Hero from './components/Hero';
import CategoriesSection from './components/CategoriesSection';
import ProductsSection from './components/ProductsSection';
import WhyChooseUs from './components/WhyChooseUs';
import SpecialOffers from './components/SpecialOffers';
import TestimonialsSection from './components/TestimonialsSection';
import DeliveryProcess from './components/DeliveryProcess';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';

// Modals & Drawers
import QuickViewModal from './components/QuickViewModal';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import CheckoutModal from './components/CheckoutModal';

// Shared types & raw data
import { Product, CartItem } from './types';
import { ELEMENTOR_TEMPLATE } from './elementorTemplate';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

export default function App() {
  // Store States
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // UI Display Controllers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  // Live Toast Notifications
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

  // Trigger Elementor JSON template download
  const handleDownloadTemplate = () => {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(ELEMENTOR_TEMPLATE, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", "ni-drip-central-elementor.json");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast("Downloaded ni-drip-central-elementor.json!", "success");
    } catch (err) {
      showToast("Could not download template automatically. Please copy the file content.", "error");
    }
  };

  // Smooth scroll helper for navigational anchors
  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Offset for sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Push an animated notification toast onto the screen
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // Add items directly to cart
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        showToast(`Increased ${product.name} quantity to ${existing.quantity + quantity}.`, 'success');
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      showToast(`Added ${product.name} to your shopping cart.`, 'success');
      return [...prev, { product, quantity }];
    });
  };

  // Modify item quantity inside cart drawer
  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove individual items from cart drawer
  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => {
      const target = prev.find((item) => item.product.id === productId);
      if (target) {
        showToast(`Removed ${target.product.name} from shopping cart.`, 'info');
      }
      return prev.filter((item) => item.product.id !== productId);
    });
  };

  // Toggle wishlist state
  const handleToggleWishlist = (product: Product) => {
    setWishlistItems((prev) => {
      const isSaved = prev.some((item) => item.id === product.id);
      if (isSaved) {
        showToast(`Removed ${product.name} from wishlist.`, 'info');
        return prev.filter((item) => item.id !== product.id);
      } else {
        showToast(`Saved ${product.name} to wishlist.`, 'success');
        return [...prev, product];
      }
    });
  };

  // Move product from wishlist directly into cart
  const handleMoveWishlistToCart = (product: Product) => {
    // Add to cart with default qty 1
    handleAddToCart(product, 1);
    // Remove from wishlist
    setWishlistItems((prev) => prev.filter((item) => item.id !== product.id));
  };

  // Trigger Quick View modal
  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  // Finalize order checkout completion
  const handleOrderCompleted = () => {
    setCartItems([]); // Clear cart
    showToast('Your order was processed successfully! Preparing shipping...', 'success');
  };

  const wishlistCount = wishlistItems.length;
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col justify-between font-sans selection:bg-accent-pink/30 selection:text-secondary-black">
      
      {/* Sticky Premium Nav Header */}
      <Header
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        onCartClick={() => setIsCartOpen(true)}
        onWishlistClick={() => setIsWishlistOpen(true)}
        onQuickView={handleQuickView}
        onScrollToSection={handleScrollToSection}
        onCategorySelect={setSelectedCategory}
      />

      {/* Main Page Layout Sections */}
      <main>
        {/* Hero Section */}
        <Hero
          onShopNowClick={() => handleScrollToSection('products')}
          onExploreClick={() => handleScrollToSection('categories')}
        />

        {/* Categories Section */}
        <CategoriesSection
          onCategorySelect={setSelectedCategory}
          onScrollToSection={handleScrollToSection}
          selectedCategory={selectedCategory}
        />

        {/* Products Grid (Best Sellers) */}
        <ProductsSection
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          onQuickView={handleQuickView}
          onAddToCart={(prod) => handleAddToCart(prod, 1)}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistItems.map((item) => item.id)}
          cartIds={cartItems.map((item) => item.product.id)}
        />

        {/* Special Offers Promotional Section */}
        <SpecialOffers
          onShopPromoClick={() => {
            setSelectedCategory('All');
            handleScrollToSection('products');
          }}
        />

        {/* Trust Value Triggers Section */}
        <WhyChooseUs />

        {/* Interactive 4-step Timeline Section */}
        <DeliveryProcess />

        {/* Social Proof Testimonials Grid */}
        <TestimonialsSection />

        {/* Newsletter Subscription Panel */}
        <NewsletterSection />
      </main>

      {/* Footer System */}
      <Footer
        onScrollToSection={handleScrollToSection}
        onCategorySelect={setSelectedCategory}
      />

      {/* DRAWERS & OVERLAYS SYSTEM */}
      
      {/* Quick View Spec Modal */}
      <QuickViewModal
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        wishlistIds={wishlistItems.map((item) => item.id)}
      />

      {/* Cart Slider Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Wishlist Slider Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlistItems}
        onRemoveItem={handleToggleWishlist}
        onMoveToCart={handleMoveWishlistToCart}
      />

      {/* Secure Bank Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* FLOATING MICRO-NOTIFICATION TOASTS OVERLAY */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2.5 max-w-sm w-full">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: -100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.9, transition: { duration: 0.2 } }}
              className="glass-panel-dark text-primary-white py-3 px-4 rounded-xl shadow-2xl flex items-center gap-3 border border-white/10"
            >
              {toast.type === 'success' ? (
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              ) : toast.type === 'error' ? (
                <div className="w-6 h-6 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-4 h-4" />
                </div>
              ) : (
                <div className="w-6 h-6 rounded-lg bg-accent-pink/20 text-accent-pink flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
              )}
              
              <p className="text-xs font-semibold text-gray-200 text-left flex-1 font-sans leading-snug">
                {toast.message}
              </p>
              
              <button
                onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                className="text-[10px] text-gray-500 hover:text-white transition-colors ml-2"
              >
                ✕
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* WordPress Elementor Download Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsTemplateModalOpen(true)}
          className="bg-secondary-black hover:bg-neutral-900 text-white font-sans font-bold text-xs md:text-sm px-4.5 py-3 rounded-full flex items-center gap-2.5 shadow-2xl border border-white/10 hover:border-[#22C55E]/30 transition-all cursor-pointer"
        >
          <div className="w-5 h-5 rounded-full bg-[#22C55E]/20 text-[#22C55E] flex items-center justify-center shrink-0">
            <Download className="w-3 h-3" />
          </div>
          WordPress Elementor Template
        </motion.button>
      </div>

      {/* WordPress Elementor Import Instructions Modal */}
      <AnimatePresence>
        {isTemplateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTemplateModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[#090A0F] text-primary-white max-w-lg w-full rounded-2xl p-6 md:p-8 border border-white/10 shadow-2xl overflow-hidden z-10"
            >
              {/* Corner Accent Glow */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent-pink/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />

              {/* Close Button */}
              <button
                onClick={() => setIsTemplateModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <CloseIcon className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <FileJson className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-lg md:text-xl text-white">
                    WordPress Elementor Template
                  </h3>
                  <p className="text-xs text-gray-400">Import NI Drip Central into your site</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-gray-300 mb-6 leading-relaxed">
                You can download this ready-to-import JSON template of the **Hero & Why Choose Us** sections. It has been pre-coded with fully responsive inline layouts, styling, custom CSS gradient backgrounds, and animations.
              </p>

              {/* Import Steps */}
              <div className="space-y-4 mb-8">
                <div className="flex gap-3 text-left">
                  <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 text-xs text-emerald-400 font-bold flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">Download the JSON file</h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      Click the green button below to save the `ni-drip-central-elementor.json` file to your computer.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 text-left">
                  <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 text-xs text-emerald-400 font-bold flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">Upload to WordPress Templates</h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      In your WordPress dashboard, navigate to **Templates &gt; Saved Templates** (or **Elementor &gt; Submissions**) and click **Import Templates** at the top. Choose your downloaded JSON file and click **Import Now**.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 text-left">
                  <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 text-xs text-emerald-400 font-bold flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">Insert into your page</h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      Open any page with Elementor, click the gray folder icon ("Add Template"), select **My Templates**, find the **NI Drip Central - Premium Home Page Template**, and click **Insert**.
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleDownloadTemplate}
                  className="flex-grow bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-sans font-bold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/15 cursor-pointer transition-all"
                >
                  <Download className="w-4 h-4 text-black" />
                  Download JSON Template
                </button>
                <button
                  onClick={() => setIsTemplateModalOpen(false)}
                  className="bg-white/5 hover:bg-white/10 text-white font-sans font-bold text-xs py-3.5 px-6 rounded-xl border border-white/10 cursor-pointer transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
