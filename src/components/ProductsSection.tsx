import { motion, AnimatePresence } from 'motion/react';
import { Star, Heart, Eye, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';

interface ProductsSectionProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  cartIds: string[];
}

export default function ProductsSection({
  selectedCategory,
  onCategorySelect,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  cartIds
}: ProductsSectionProps) {
  // Filter products based on selected category tab
  const filteredProducts = selectedCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(product => product.category === selectedCategory);

  const categoriesList = ['All', 'TVs', 'Fridges', 'Washing Machines', 'Cookers', 'Dishwashers', 'Kitchen Appliances'];

  return (
    <section id="products" className="py-24 bg-bg-gray scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold font-mono text-accent-pink tracking-widest uppercase">
            Best Sellers & Local Favorites
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-secondary-black mt-2 tracking-tight">
            Premium Home Appliances
          </h2>
          <p className="text-sm text-gray-500 mt-2 font-sans">
            Explore our bestselling appliances. Selected from leading premium brands with certified double-testing, full guarantees, and fast local delivery across Northern Ireland.
          </p>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex items-center justify-start lg:justify-center overflow-x-auto pb-4 mb-12 gap-2.5 no-scrollbar scroll-smooth">
          {categoriesList.map((catName) => {
            const isSelected = selectedCategory === catName;
            return (
              <button
                key={catName}
                onClick={() => onCategorySelect(catName)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? 'bg-secondary-black text-primary-white shadow-md shadow-black/15 scale-105'
                    : 'bg-primary-white hover:bg-gray-100 text-gray-600 border border-gray-100'
                }`}
              >
                {catName === 'All' ? 'All Products' : catName}
              </button>
            );
          })}
        </div>

        {/* Products Grid with Entrance Animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, idx) => {
              const isWishlisted = wishlistIds.includes(product.id);
              const isInCart = cartIds.includes(product.id);
              const saveAmount = product.originalPrice ? product.originalPrice - product.price : 0;

              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.45, delay: idx * 0.05 }}
                  className="group bg-primary-white rounded-[20px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full relative"
                >
                  {/* Badge Indicators (e.g. "Refurbished", "New", "Save £300") */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 items-start">
                    {product.tag && (
                      <span className={`text-[9px] font-mono font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full text-primary-white ${
                        product.tag === 'New'
                          ? 'bg-emerald-500'
                          : product.tag === 'Refurbished'
                          ? 'bg-amber-500'
                          : 'bg-accent-pink'
                      }`}>
                        {product.tag}
                      </span>
                    )}
                    {saveAmount > 0 && (
                      <span className="text-[9px] font-mono font-extrabold tracking-wider uppercase bg-accent-pink text-primary-white px-2.5 py-1 rounded-full">
                        Save £{saveAmount}
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button Overlay */}
                  <button
                    onClick={() => onToggleWishlist(product)}
                    className={`absolute top-4 right-4 z-10 p-2.5 rounded-full border shadow-sm transition-all duration-300 cursor-pointer ${
                      isWishlisted
                        ? 'bg-accent-pink border-accent-pink text-primary-white scale-110'
                        : 'bg-primary-white/80 backdrop-blur-md border-gray-100 text-gray-500 hover:text-accent-pink hover:bg-primary-white hover:scale-110'
                    }`}
                    aria-label="Toggle Wishlist"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>

                  {/* Product Image Stage */}
                  <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden cursor-pointer" onClick={() => onQuickView(product)}>
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    
                    {/* Dark Glassmorphism Action Buttons Overlay on Hover */}
                    <div className="absolute inset-0 bg-secondary-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onQuickView(product);
                        }}
                        className="w-10 h-10 rounded-full bg-primary-white text-secondary-black hover:bg-accent-pink hover:text-primary-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer"
                        title="Quick View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(product);
                        }}
                        className="w-10 h-10 rounded-full bg-primary-white text-secondary-black hover:bg-accent-pink hover:text-primary-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer"
                        title="Add to Cart"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Product Details Block */}
                  <div className="p-5 flex-1 flex flex-col justify-between text-left">
                    <div>
                      {/* Category & Grade */}
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider">
                          {product.category}
                        </span>
                        {product.grade && (
                          <span className="text-[9px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md font-sans">
                            {product.grade}
                          </span>
                        )}
                      </div>

                      {/* Product Name */}
                      <h3
                        onClick={() => onQuickView(product)}
                        className="font-display font-bold text-sm sm:text-base text-secondary-black hover:text-accent-pink transition-colors duration-200 cursor-pointer line-clamp-2 min-h-[2.5rem]"
                      >
                        {product.name}
                      </h3>

                      {/* Star Rating */}
                      <div className="flex items-center gap-1.5 mt-2">
                        <div className="flex text-amber-400">
                          <Star className="w-3.5 h-3.5 fill-current" />
                        </div>
                        <span className="text-xs font-bold text-secondary-black">
                          {product.rating.toFixed(1)}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">
                          ({product.reviewsCount} reviews)
                        </span>
                      </div>
                    </div>

                    {/* Footer / Price and Cart Action */}
                    <div className="flex items-end justify-between mt-5 pt-4 border-t border-gray-50">
                      <div className="flex flex-col">
                        {product.originalPrice && (
                          <span className="text-xs text-gray-400 line-through font-mono">
                            £{product.originalPrice}
                          </span>
                        )}
                        <span className="text-base sm:text-lg font-extrabold text-secondary-black tracking-tight">
                          £{product.price}
                        </span>
                      </div>

                      {/* Immediate Add to Cart Action */}
                      <button
                        onClick={() => onAddToCart(product)}
                        className={`py-2 px-3.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                          isInCart
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100'
                            : 'bg-secondary-black text-primary-white hover:bg-accent-pink shadow-sm hover:shadow'
                        }`}
                      >
                        {isInCart ? (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                            Added
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            Add
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
