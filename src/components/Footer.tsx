import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, ArrowUp, Sparkles, ShieldAlert, Award } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
  onCategorySelect: (category: string) => void;
}

export default function Footer({ onScrollToSection, onCategorySelect }: FooterProps) {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryLink = (slug: string) => {
    onCategorySelect(slug);
    onScrollToSection('products');
  };

  return (
    <footer id="footer" className="bg-secondary-black text-gray-400 font-sans text-xs pt-20 pb-12 border-t border-white/10 relative z-10">
      
      {/* Upper Footer section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/5">
        
        {/* Brand Column (Col 4) */}
        <div className="lg:col-span-4 flex flex-col items-start text-left">
          <div onClick={handleScrollTop} className="cursor-pointer mb-6 select-none">
            <Logo variant="full" lightMode={false} />
          </div>
          
          <p className="text-xs text-gray-500 font-sans leading-relaxed">
            Northern Ireland’s premium destination for top-tier home electronics and appliances. We provide certified dual-tested stock with solid local warranties and fast, scheduled delivery.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-4 mt-6">
            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-accent-pink hover:text-primary-white transition-all text-gray-400" aria-label="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-accent-pink hover:text-primary-white transition-all text-gray-400" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-accent-pink hover:text-primary-white transition-all text-gray-400" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Categories Link Directory (Col 2.5) */}
        <div className="lg:col-span-2.5 flex flex-col items-start text-left">
          <h3 className="text-xs font-bold uppercase tracking-wider text-primary-white font-mono mb-4">
            Our Categories
          </h3>
          <ul className="space-y-2.5 font-medium">
            <li>
              <button onClick={() => handleCategoryLink('TVs')} className="hover:text-accent-pink transition-colors cursor-pointer text-left">
                TVs & Cinema Screen
              </button>
            </li>
            <li>
              <button onClick={() => handleCategoryLink('Fridges')} className="hover:text-accent-pink transition-colors cursor-pointer text-left">
                Fridges & Coolers
              </button>
            </li>
            <li>
              <button onClick={() => handleCategoryLink('Washing Machines')} className="hover:text-accent-pink transition-colors cursor-pointer text-left">
                Washing Machines
              </button>
            </li>
            <li>
              <button onClick={() => handleCategoryLink('Cookers')} className="hover:text-accent-pink transition-colors cursor-pointer text-left">
                Cookers & Ovens
              </button>
            </li>
            <li>
              <button onClick={() => handleCategoryLink('Dishwashers')} className="hover:text-accent-pink transition-colors cursor-pointer text-left">
                Dishwashers
              </button>
            </li>
            <li>
              <button onClick={() => handleCategoryLink('Kitchen Appliances')} className="hover:text-accent-pink transition-colors cursor-pointer text-left">
                Kitchen Appliances
              </button>
            </li>
          </ul>
        </div>

        {/* Quick links (Col 2) */}
        <div className="lg:col-span-2 flex flex-col items-start text-left">
          <h3 className="text-xs font-bold uppercase tracking-wider text-primary-white font-mono mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2.5 font-medium">
            <li>
              <button onClick={() => onScrollToSection('hero')} className="hover:text-accent-pink transition-colors cursor-pointer text-left">
                Home
              </button>
            </li>
            <li>
              <button onClick={() => onScrollToSection('products')} className="hover:text-accent-pink transition-colors cursor-pointer text-left">
                Shop Inventory
              </button>
            </li>
            <li>
              <button onClick={() => onScrollToSection('categories')} className="hover:text-accent-pink transition-colors cursor-pointer text-left">
                Collections
              </button>
            </li>
            <li>
              <button onClick={() => onScrollToSection('why-choose-us')} className="hover:text-accent-pink transition-colors cursor-pointer text-left">
                About Us
              </button>
            </li>
            <li>
              <button onClick={() => onScrollToSection('testimonials')} className="hover:text-accent-pink transition-colors cursor-pointer text-left">
                Client Reviews
              </button>
            </li>
          </ul>
        </div>

        {/* Contact Information (Col 3.5) */}
        <div className="lg:col-span-3.5 flex flex-col items-start text-left">
          <h3 className="text-xs font-bold uppercase tracking-wider text-primary-white font-mono mb-4">
            Contact Information
          </h3>
          <ul className="space-y-3 font-medium">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-accent-pink shrink-0 mt-0.5" />
              <span>Unit 12, Drip Central Trade Park, Malone Road, Belfast, BT9 6RY</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-accent-pink shrink-0" />
              <a href="tel:02890123456" className="hover:text-primary-white transition-colors">028 9012 3456</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-accent-pink shrink-0" />
              <a href="mailto:support@nidripcentral.co.uk" className="hover:text-primary-white transition-colors">support@nidripcentral.co.uk</a>
            </li>
            <li className="pt-2 text-[11px] text-gray-500 border-t border-white/5 w-full">
              <p className="font-bold text-gray-400">Opening Hours:</p>
              <p className="mt-0.5">Mon - Sat: 9:00 AM - 6:00 PM</p>
              <p>Sunday: Closed</p>
            </li>
          </ul>
        </div>

      </div>

      {/* Lower Footer: Copyrights, payments & Back to top button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Copyright and Federation of Small Businesses NI notation */}
        <div className="text-center md:text-left text-gray-500">
          <p>© 2026 NI Drip Central Electronics & Appliances. All rights reserved.</p>
          <div className="flex items-center justify-center md:justify-start gap-1.5 mt-1.5 text-[10px] text-gray-600 font-mono">
            <Award className="w-3.5 h-3.5" />
            <span>Member of FSB Northern Ireland (Federation of Small Businesses)</span>
          </div>
        </div>

        {/* Center: Pay Secure Vectors with rounded containers */}
        <div className="flex items-center gap-2.5 bg-white/5 py-1.5 px-3.5 rounded-full border border-white/5">
          <span className="text-[10px] font-mono font-bold uppercase text-gray-500 tracking-wide mr-1.5">Secure Pay:</span>
          {/* Apple Pay representation */}
          <span className="font-mono text-[10px] font-bold text-primary-white"> Pay</span>
          <span className="text-gray-600">|</span>
          {/* Google Pay */}
          <span className="font-sans text-[10px] font-bold text-primary-white">G Pay</span>
          <span className="text-gray-600">|</span>
          {/* Visa */}
          <span className="font-sans text-[10px] font-semibold tracking-wider text-indigo-400">VISA</span>
          <span className="text-gray-600">|</span>
          {/* Mastercard */}
          <span className="font-sans text-[10px] font-medium text-amber-500">Mastercard</span>
        </div>

        {/* Right: Scroll to top Button */}
        <button
          onClick={handleScrollTop}
          className="p-3 bg-white/5 hover:bg-accent-pink text-gray-400 hover:text-primary-white rounded-full transition-all duration-300 cursor-pointer shadow border border-white/5 group"
          title="Back to Top"
        >
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
        </button>

      </div>
    </footer>
  );
}
