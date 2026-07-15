import { motion } from 'motion/react';
import { Search, ShoppingBag, Truck, Sparkles } from 'lucide-react';
import { DELIVERY_STEPS } from '../data';

export default function DeliveryProcess() {
  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Search':
        return <Search className="w-5 h-5 text-accent-pink" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-5 h-5 text-accent-pink" />;
      case 'Truck':
        return <Truck className="w-5 h-5 text-accent-pink" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-accent-pink animate-pulse" />;
      default:
        return <Search className="w-5 h-5 text-accent-pink" />;
    }
  };

  return (
    <section id="delivery-process" className="py-24 bg-primary-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-xs font-bold font-mono text-accent-pink tracking-widest uppercase">
            Worry-Free Dispatch Cycle
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-secondary-black mt-2 tracking-tight">
            How It Works
          </h2>
          <p className="text-sm text-gray-500 mt-2 font-sans">
            From checkout to calibration, we make ordering major home systems incredibly streamlined, stress-free, and professional.
          </p>
        </div>

        {/* 4-Step Progressive Timeline Layout */}
        <div className="relative">
          
          {/* Horizontal dotted connector bar (Desktop only) */}
          <div className="hidden lg:block absolute top-[44px] left-[12%] right-[12%] h-0.5 border-t border-dashed border-gray-200 -z-10" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {DELIVERY_STEPS.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="flex flex-col items-center text-center group"
              >
                {/* Numeric Node Label */}
                <span className="text-xs font-bold font-mono text-gray-300 group-hover:text-accent-pink transition-colors duration-300 tracking-wider mb-2">
                  STAGE {item.step}
                </span>

                {/* Circle Icon Node Stage */}
                <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 group-hover:border-accent-pink/30 group-hover:bg-primary-white group-hover:shadow-lg transition-all duration-300 flex items-center justify-center mb-6 relative">
                  {getStepIcon(item.icon)}

                  {/* Progressive indicator dot */}
                  <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary-white border-2 border-accent-pink rounded-full flex items-center justify-center">
                    <span className="w-1 h-1 bg-accent-pink rounded-full" />
                  </span>
                </div>

                {/* Step Copywritings */}
                <h3 className="text-sm sm:text-base font-display font-extrabold text-secondary-black group-hover:text-accent-pink transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-xs text-gray-500 font-sans leading-relaxed mt-2.5 max-w-[220px]">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
