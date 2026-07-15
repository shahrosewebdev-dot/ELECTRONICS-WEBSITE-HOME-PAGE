import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Clock } from 'lucide-react';

interface SpecialOffersProps {
  onShopPromoClick: () => void;
}

export default function SpecialOffers({ onShopPromoClick }: SpecialOffersProps) {
  // Real-time ticking countdown timer states (Starts at 23h 45m 12s)
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 12
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset countdown timer loop for continuous visual FOMO
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Formatter for two-digit numbers
  const formatTime = (num: number) => num.toString().padStart(2, '0');

  return (
    <section id="special-offers" className="py-20 bg-secondary-black relative overflow-hidden">
      {/* Pink Radial Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-pink/10 rounded-full blur-[140px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Details & Copywriting (Col 7) */}
          <div className="lg:col-span-7 text-left z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-accent-pink/10 border border-accent-pink/20 px-3 py-1 rounded-full mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-accent-pink animate-pulse" />
              <span className="text-[10px] font-mono font-bold tracking-wider text-accent-pink uppercase">
                Limited Time Flash Sale
              </span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-primary-white tracking-tight leading-tight">
              Summer Clearance Extravaganza! <br />
              Save Up To <span className="text-accent-pink">40% Off</span> Premium Brands
            </h2>
            
            <p className="text-sm text-gray-400 mt-5 font-sans leading-relaxed max-w-lg">
              Upgrade your home systems now. Explore unbeatable markdowns on Miele washing systems, Samsung OLED screens, and Neff sliding ovens. Includes full local guarantee and free Belfast assembly.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onShopPromoClick}
                className="bg-accent-pink hover:bg-hover-pink text-primary-white text-xs sm:text-sm font-extrabold py-4 px-8 rounded-full transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-accent-pink/25 group"
              >
                Claim This Offer
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
              
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-300 px-4 py-3 bg-white/5 rounded-xl border border-white/10">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                <span>Over 140 shoppers currently viewing deals</span>
              </div>
            </div>
          </div>

          {/* Real-time Ticking Countdown Module (Col 5) */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-panel-dark rounded-[24px] p-6 sm:p-8 text-center border border-white/10 relative"
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <Clock className="w-5 h-5 text-accent-pink animate-pulse" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-300 font-mono">
                  Deal Closes In:
                </h3>
              </div>

              {/* Ticking Clock Panels */}
              <div className="grid grid-cols-3 gap-4">
                {/* Hours */}
                <div className="flex flex-col gap-1 bg-white/5 border border-white/10 rounded-2xl py-4">
                  <span className="text-3xl sm:text-4xl font-display font-extrabold text-primary-white tracking-tight">
                    {formatTime(timeLeft.hours)}
                  </span>
                  <span className="text-[9px] font-bold font-mono text-gray-400 uppercase tracking-widest">
                    Hours
                  </span>
                </div>

                {/* Minutes */}
                <div className="flex flex-col gap-1 bg-white/5 border border-white/10 rounded-2xl py-4">
                  <span className="text-3xl sm:text-4xl font-display font-extrabold text-accent-pink tracking-tight">
                    {formatTime(timeLeft.minutes)}
                  </span>
                  <span className="text-[9px] font-bold font-mono text-gray-400 uppercase tracking-widest">
                    Mins
                  </span>
                </div>

                {/* Seconds */}
                <div className="flex flex-col gap-1 bg-white/5 border border-white/10 rounded-2xl py-4">
                  <span className="text-3xl sm:text-4xl font-display font-extrabold text-primary-white tracking-tight">
                    {formatTime(timeLeft.seconds)}
                  </span>
                  <span className="text-[9px] font-bold font-mono text-gray-400 uppercase tracking-widest">
                    Secs
                  </span>
                </div>
              </div>

              {/* Extra FOMO callout */}
              <p className="text-[10px] text-gray-500 font-sans mt-6">
                *Prices reset automatically once the counter hits zero. Stock is strictly limited on refurbished grades.
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
