import { motion } from 'motion/react';
import { CATEGORIES } from '../data';
import { ArrowUpRight } from 'lucide-react';

interface CategoriesSectionProps {
  onCategorySelect: (slug: string) => void;
  onScrollToSection: (sectionId: string) => void;
  selectedCategory: string;
}

export default function CategoriesSection({
  onCategorySelect,
  onScrollToSection,
  selectedCategory
}: CategoriesSectionProps) {
  const handleCategoryClick = (slug: string) => {
    onCategorySelect(slug);
    onScrollToSection('products');
  };

  return (
    <section id="categories" className="py-24 bg-primary-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="text-left">
            <span className="text-xs font-bold font-mono text-accent-pink tracking-widest uppercase">
              Curated Collections
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-secondary-black mt-2 tracking-tight">
              Shop By Category
            </h2>
            <p className="text-sm text-gray-500 mt-2 max-w-md font-sans">
              Discover the absolute best deals on luxury television screens, cooling storage, and kitchen systems.
            </p>
          </div>
          <button
            onClick={() => handleCategoryClick('All')}
            className="text-xs font-semibold tracking-wider font-mono text-secondary-black hover:text-accent-pink border-b-2 border-secondary-black hover:border-accent-pink pb-1 transition-all duration-300 uppercase shrink-0 self-start md:self-auto cursor-pointer"
          >
            Explore All Categories
          </button>
        </div>

        {/* Categories Grid - Responsive Bento style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((category, index) => {
            const isSelected = selectedCategory === category.slug;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => handleCategoryClick(category.slug)}
                className={`group relative overflow-hidden rounded-[20px] aspect-[4/3] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 border ${
                  isSelected ? 'border-accent-pink ring-2 ring-accent-pink/20' : 'border-gray-100'
                }`}
              >
                {/* Background Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-black/85 via-secondary-black/40 to-transparent transition-opacity duration-300" />

                {/* Card Contents */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-accent-pink font-extrabold bg-accent-pink/10 px-2.5 py-1 rounded-full backdrop-blur-md">
                      NI Drip Selection
                    </span>
                    <div className="w-8 h-8 rounded-full bg-primary-white/10 group-hover:bg-accent-pink group-hover:scale-110 flex items-center justify-center text-primary-white transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-xl font-display font-extrabold text-primary-white mt-3">
                    {category.name}
                  </h3>
                  
                  <p className="text-xs text-gray-300/90 mt-1.5 font-sans line-clamp-2 max-w-xs transition-colors group-hover:text-primary-white">
                    {category.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
