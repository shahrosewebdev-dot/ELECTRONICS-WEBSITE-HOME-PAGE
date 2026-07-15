import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Mail, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');
    }, 1200);
  };

  return (
    <section id="newsletter" className="py-24 bg-bg-gray border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Newsletter Box Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-primary-white border border-gray-100 rounded-[32px] p-8 sm:p-12 text-center shadow-xl shadow-gray-200/40 relative overflow-hidden"
        >
          {/* Decorative glowing gradient backdrop */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent-pink/5 rounded-full blur-2xl" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent-pink/5 rounded-full blur-2xl" />

          {!isSubscribed ? (
            <div className="max-w-lg mx-auto flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-accent-pink/5 text-accent-pink flex items-center justify-center mb-6">
                <Mail className="w-5 h-5" />
              </div>

              <span className="text-[10px] font-mono font-bold tracking-widest text-accent-pink uppercase bg-accent-pink/5 px-2.5 py-1 rounded-full mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-accent-pink animate-pulse" />
                Drip Central Insider Club
              </span>

              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-secondary-black tracking-tight leading-tight">
                Unlock VIP Appliance Pricing
              </h2>
              
              <p className="text-xs sm:text-sm text-gray-400 mt-2.5 font-sans leading-relaxed">
                Subscribe to receive exclusive local flash sale codes, refurb stock notifications, and energy-saving kitchen tips direct to your inbox. No spam, ever.
              </p>

              {/* Input Form */}
              <form onSubmit={handleSubscribe} className="mt-8 w-full flex flex-col sm:flex-row gap-3 items-stretch">
                <div className="relative flex-1">
                  <input
                    required
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 py-3.5 pl-10 pr-4 rounded-xl text-xs font-sans focus:bg-white focus:ring-1 focus:ring-accent-pink focus:border-accent-pink outline-none transition-all duration-300"
                    disabled={isSubmitting}
                  />
                  <Mail className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-accent-pink hover:bg-hover-pink disabled:bg-gray-400 text-primary-white text-xs font-bold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shrink-0 shadow-lg shadow-accent-pink/15"
                >
                  {isSubmitting ? 'Joining...' : 'Subscribe Now'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          ) : (
            /* SUCCESS CONFIRMED STATE */
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="max-w-md mx-auto py-4 flex flex-col items-center"
            >
              <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mb-4 border border-emerald-100">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-display font-bold text-secondary-black">
                You're On The VIP List!
              </h3>
              <p className="text-xs text-gray-400 font-sans mt-2 leading-relaxed">
                We've sent a 10% discount code to your email. Keep an eye out for our upcoming local stock drops and appliance clearance schedules!
              </p>
              <button
                onClick={() => setIsSubscribed(false)}
                className="mt-6 text-xs font-bold text-accent-pink border-b border-accent-pink pb-0.5 hover:text-hover-pink transition-colors cursor-pointer"
              >
                Subscribe another email
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
