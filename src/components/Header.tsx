import { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data';
import { Product } from '../types';
import Logo from './Logo';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onCartClick: () => void;
  onWishlistClick: () => void;
  onQuickView: (product: Product) => void;
  onScrollToSection: (sectionId: string) => void;
  onCategorySelect: (category: string) => void;
}

export default function Header({
  cartCount,
  wishlistCount,
  onCartClick,
  onWishlistClick,
  onQuickView,
  onScrollToSection,
  onCategorySelect
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Monitor scroll state for styling sticky navigation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter products based on search input
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }
    const filtered = PRODUCTS.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.grade && product.grade.toLowerCase().includes(searchQuery.toLowerCase()))
    ).slice(0, 5); // Limit to 5 results for sleek dropdown
    setSearchResults(filtered);
  }, [searchQuery]);

  const handleSearchResultClick = (product: Product) => {
    onQuickView(product);
    setSearchQuery('');
    setIsSearchFocused(false);
  };

  const handleNavClick = (sectionId: string, categoryFilter?: string) => {
    setIsMobileMenuOpen(false);
    if (categoryFilter) {
      onCategorySelect(categoryFilter);
    }
    onScrollToSection(sectionId);
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-secondary-black text-primary-white py-2 px-4 text-center text-xs font-medium tracking-wider uppercase transition-all duration-300 relative z-50 flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-accent-pink animate-pulse"></span>
        Free Delivery Across Northern Ireland
        <span className="hidden md:inline-block text-[10px] bg-accent-pink/20 text-accent-pink px-2 py-0.5 rounded-full ml-2">
          NI OWNED
        </span>
      </div>

      {/* Navigation Header */}
      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-primary-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 py-3'
            : 'bg-transparent py-5'
        }`}
        style={{ top: '32px' }} // Positioned below announcement bar
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Logo */}
            <div 
              onClick={() => handleNavClick('hero')} 
              className="cursor-pointer select-none"
            >
              <Logo variant="full" lightMode={true} />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 font-sans font-medium text-sm text-gray-600">
              <button 
                onClick={() => handleNavClick('hero')}
                className="hover:text-accent-pink transition-colors cursor-pointer"
              >
                Home
              </button>
              <button 
                onClick={() => handleNavClick('products')}
                className="hover:text-accent-pink transition-colors cursor-pointer"
              >
                Shop All
              </button>
              <div className="relative group">
                <button 
                  onClick={() => handleNavClick('categories')}
                  className="hover:text-accent-pink transition-colors cursor-pointer flex items-center gap-1"
                >
                  Categories
                </button>
              </div>
              <button 
                onClick={() => handleNavClick('why-choose-us')}
                className="hover:text-accent-pink transition-colors cursor-pointer"
              >
                About
              </button>
              <button 
                onClick={() => handleNavClick('footer')}
                className="hover:text-accent-pink transition-colors cursor-pointer"
              >
                Contact
              </button>
            </nav>

            {/* Live Search and Quick Action Controls */}
            <div className="flex items-center gap-3 sm:gap-4 flex-1 lg:flex-none justify-end">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-[160px] sm:max-w-[240px] md:max-w-xs">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search premium tech..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                    className="w-full bg-gray-100/80 focus:bg-primary-white py-2 pl-9 pr-4 rounded-full text-xs font-sans border border-transparent focus:border-gray-200 focus:ring-1 focus:ring-accent-pink/30 outline-none transition-all duration-300"
                  />
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-secondary-black text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Dropdown Results for Search */}
                {isSearchFocused && (searchQuery.trim() !== '' || searchResults.length > 0) && (
                  <div className="absolute top-full right-0 left-0 mt-2 bg-primary-white/95 backdrop-blur-md border border-gray-100 shadow-xl rounded-2xl p-2 z-50 transition-all duration-300 max-h-[350px] overflow-y-auto no-scrollbar">
                    {searchResults.length > 0 ? (
                      <div className="flex flex-col gap-1">
                        <div className="px-3 py-1.5 text-[10px] font-mono text-gray-400 tracking-wider uppercase border-b border-gray-50">
                          Search Results
                        </div>
                        {searchResults.map((product) => (
                          <div
                            key={product.id}
                            onClick={() => handleSearchResultClick(product)}
                            className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors duration-200"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              referrerPolicy="no-referrer"
                              className="w-10 h-10 object-cover rounded-lg bg-gray-100 border border-gray-100"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-semibold text-secondary-black truncate">
                                {product.name}
                              </h4>
                              <p className="text-[10px] text-gray-500">
                                {product.category} {product.tag ? `• ${product.tag}` : ''}
                              </p>
                            </div>
                            <div className="text-xs font-bold text-accent-pink">
                              £{product.price}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center text-xs text-gray-500">
                        No appliances found for "{searchQuery}"
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={onWishlistClick}
                className="relative p-2 text-gray-700 hover:text-accent-pink hover:scale-105 transition-all duration-200 cursor-pointer"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-accent-pink text-primary-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Button */}
              <button
                onClick={onCartClick}
                className="relative p-2 text-gray-700 hover:text-accent-pink hover:scale-105 transition-all duration-200 cursor-pointer"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-secondary-black text-primary-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Shop Now CTA Button */}
              <button
                onClick={() => handleNavClick('products')}
                className="hidden md:flex items-center gap-1.5 bg-secondary-black hover:bg-accent-pink text-primary-white text-xs font-semibold py-2 px-4 rounded-full transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
              >
                Shop Now
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Mobile Burger Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gray-700 hover:text-secondary-black transition-colors cursor-pointer"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-primary-white border-b border-gray-100 shadow-lg px-4 pt-2 pb-6 space-y-1 z-50">
            <button
              onClick={() => handleNavClick('hero')}
              className="block w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-accent-pink transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('products')}
              className="block w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-accent-pink transition-colors"
            >
              Shop All
            </button>
            <button
              onClick={() => handleNavClick('categories')}
              className="block w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-accent-pink transition-colors"
            >
              Categories
            </button>
            <button
              onClick={() => handleNavClick('why-choose-us')}
              className="block w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-accent-pink transition-colors"
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('footer')}
              className="block w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-accent-pink transition-colors"
            >
              Contact
            </button>
            <div className="pt-4 px-3">
              <button
                onClick={() => handleNavClick('products')}
                className="w-full flex items-center justify-center gap-2 bg-accent-pink hover:bg-hover-pink text-primary-white text-xs font-semibold py-3 rounded-xl transition-all duration-300"
              >
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>
      {/* Elegant spacing from top to accommodate fixed header nicely without overlapping */}
      <div className="h-16"></div>
    </>
  );
}
