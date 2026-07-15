import { motion } from 'motion/react';
import { ArrowRight, CheckCircle, Shield, Award, Sparkles } from 'lucide-react';

interface HeroProps {
  onShopNowClick: () => void;
  onExploreClick: () => void;
}

export default function Hero({ onShopNowClick, onExploreClick }: HeroProps) {
  return (
    <section id="hero" className="relative bg-bg-gray overflow-hidden pt-20 md:pt-24 pb-16 md:pb-24">
      {/* Abstract Background Accents */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-accent-pink/5 to-transparent rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 left-10 w-1/4 h-1/4 bg-gray-200/40 rounded-full blur-2xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Copywriting & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-primary-white/80 border border-gray-100 shadow-sm px-3 py-1.5 rounded-full mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-accent-pink animate-pulse" />
              <span className="text-[11px] font-mono font-bold tracking-wider text-secondary-black uppercase">
                Premium Home Redefined
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-secondary-black leading-[1.05]"
            >
              Upgrade Your Home <br />
              With <span className="text-accent-pink relative">Premium</span> Electronics
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-6 text-sm sm:text-base md:text-lg text-gray-500 font-sans font-normal max-w-lg leading-relaxed"
            >
              Quality Appliances at Affordable Prices with Fast Local Delivery Across Northern Ireland. Brand New & Pristine Certified Refurbished.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
            >
              <button
                onClick={onShopNowClick}
                className="bg-secondary-black hover:bg-accent-pink text-primary-white text-xs sm:text-sm font-semibold py-4 px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer group"
              >
                Shop Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
              
              <button
                onClick={onExploreClick}
                className="bg-primary-white hover:bg-gray-50 text-secondary-black border border-gray-200/80 text-xs sm:text-sm font-semibold py-4 px-8 rounded-full transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                View Collection
              </button>
            </motion.div>
          </div>

          {/* Premium Visuals Showcase */}
          <div className="lg:col-span-6 relative mt-6 lg:mt-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative aspect-video lg:aspect-[4/3] rounded-[24px] overflow-hidden shadow-2xl border-4 border-primary-white group"
            >
              <img
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
                alt="Modern Premium Living Room Kitchen with High-End Home Appliances"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary-black/40 via-transparent to-transparent" />
              
              {/* Overlay Interactive Tag */}
              <div className="absolute bottom-6 left-6 glass-panel py-3 px-4 rounded-xl flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-accent-pink animate-pulse" />
                <p className="text-[11px] font-mono text-secondary-black font-semibold">
                  Featured: Neff Slide & Hide Kitchen Showcase
                </p>
              </div>
            </motion.div>

            {/* Accent Highlight Glow behind image */}
            <div className="absolute -inset-4 bg-accent-pink/10 blur-[100px] rounded-[50px] -z-10" />
          </div>

        </div>

        {/* Floating Trust Badges Bento Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 sm:mt-20 bg-primary-white border border-gray-100/80 rounded-[20px] p-6 shadow-xl shadow-gray-200/50 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 relative z-20"
        >
          <div className="flex items-center gap-3.5 px-4 md:border-r border-gray-100 last:border-0 group">
            <div className="w-10 h-10 rounded-xl bg-accent-pink/5 flex items-center justify-center text-accent-pink group-hover:bg-accent-pink group-hover:text-primary-white transition-all duration-300">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-secondary-black uppercase tracking-wider font-mono">Fast Delivery</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">Across Northern Ireland</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 px-4 md:border-r border-gray-100 last:border-0 group">
            <div className="w-10 h-10 rounded-xl bg-accent-pink/5 flex items-center justify-center text-accent-pink group-hover:bg-accent-pink group-hover:text-primary-white transition-all duration-300">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-secondary-black uppercase tracking-wider font-mono">Warranty Included</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">Up to 5 years peace of mind</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 px-4 md:border-r border-gray-100 last:border-0 group">
            <div className="w-10 h-10 rounded-xl bg-accent-pink/5 flex items-center justify-center text-accent-pink group-hover:bg-accent-pink group-hover:text-primary-white transition-all duration-300">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-secondary-black uppercase tracking-wider font-mono">Local Business</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">Proudly NI-owned & operated</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 px-4 group">
            <div className="w-10 h-10 rounded-xl bg-accent-pink/5 flex items-center justify-center text-accent-pink group-hover:bg-accent-pink group-hover:text-primary-white transition-all duration-300">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-xs font-bold text-secondary-black uppercase tracking-wider font-mono">Best Prices</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">Top deals guaranteed</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
