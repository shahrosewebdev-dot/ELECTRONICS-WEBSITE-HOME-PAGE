import { motion } from 'motion/react';
import { Star, Quote, ShieldCheck } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-bg-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold font-mono text-accent-pink tracking-widest uppercase">
            Client Voices Across NI
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-secondary-black mt-2 tracking-tight">
            Loved By Northern Irish Homes
          </h2>
          <p className="text-sm text-gray-500 mt-2 font-sans">
            Hear from families and homeowners who upgraded their living spaces with our premium TVs, washers, and refrigeration units.
          </p>
        </div>

        {/* Testimonials Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-primary-white border border-gray-100 rounded-[24px] p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 relative flex flex-col justify-between text-left group"
            >
              <div>
                {/* Quotation icon background */}
                <Quote className="absolute top-6 right-6 w-8 h-8 text-gray-100 group-hover:text-accent-pink/10 transition-colors duration-300" />

                {/* Rating Stars */}
                <div className="flex text-amber-400 gap-0.5 mb-5">
                  {[...Array(testimonial.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-current text-amber-400" />
                  ))}
                </div>

                {/* Verified Tag */}
                <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold py-1 px-2.5 rounded-full mb-4">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Purchase</span>
                </div>

                {/* Testimonial body */}
                <p className="text-xs sm:text-sm text-gray-500 font-sans italic leading-relaxed">
                  "{testimonial.comment}"
                </p>
              </div>

              {/* Customer Avatar & Bio details */}
              <div className="flex items-center gap-3.5 mt-8 pt-6 border-t border-gray-50">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover bg-gray-50 border border-gray-100"
                />
                <div>
                  <h4 className="text-xs font-bold text-secondary-black">
                    {testimonial.name}
                  </h4>
                  <p className="text-[10px] text-gray-400 font-medium font-mono uppercase tracking-wide">
                    {testimonial.location}, NI • {testimonial.date}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
