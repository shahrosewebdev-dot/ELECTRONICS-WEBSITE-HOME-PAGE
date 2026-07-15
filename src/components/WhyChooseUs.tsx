import { motion } from 'motion/react';
import { Truck, DollarSign, Store, ShieldCheck, Lock } from 'lucide-react';
import { WHY_CHOOSE_US_CARDS } from '../data';

export default function WhyChooseUs() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Truck':
        return <Truck className="w-6 h-6" />;
      case 'DollarSign':
        return <DollarSign className="w-6 h-6" />;
      case 'Store':
        return <Store className="w-6 h-6" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6" />;
      case 'Lock':
        return <Lock className="w-6 h-6" />;
      default:
        return <Store className="w-6 h-6" />;
    }
  };

  return (
    <section id="why-choose-us" className="py-24 bg-primary-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold font-mono text-accent-pink tracking-widest uppercase">
            Our Guarantee To You
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-secondary-black mt-2 tracking-tight">
            Why Choose NI Drip Central?
          </h2>
          <p className="text-sm text-gray-500 mt-2 font-sans">
            We combine premium appliance standards with responsive local retail support. Shop securely and enjoy worry-free delivery.
          </p>
        </div>

        {/* Bento Grid layout for cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {WHY_CHOOSE_US_CARDS.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-bg-gray border border-gray-100 hover:bg-primary-white hover:border-accent-pink/20 hover:shadow-lg rounded-[20px] p-6 text-left transition-all duration-300 group flex flex-col justify-between h-full"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-accent-pink/5 text-accent-pink flex items-center justify-center group-hover:bg-accent-pink group-hover:text-primary-white transition-all duration-300 mb-6 shadow-sm">
                  {getIcon(card.icon)}
                </div>
                <h3 className="text-sm sm:text-base font-display font-bold text-secondary-black">
                  {card.title}
                </h3>
                <p className="text-xs text-gray-500 mt-2.5 font-sans leading-relaxed">
                  {card.description}
                </p>
              </div>
              
              <div className="mt-6 flex items-center gap-1.5 text-[10px] font-mono text-accent-pink font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Verified Benefit</span>
                <span>•</span>
                <span>Active</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
