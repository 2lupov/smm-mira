import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Quote } from 'lucide-react';
import { usePortfolioStore } from '@/store/portfolioStore';

const Testimonials = () => {
  const { testimonials } = usePortfolioStore((s) => s.data);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 px-6" id="testimonials" ref={ref}>
      <div className="container max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-gradient-navy mb-4">Відгуки клієнтів</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Що кажуть ті, з ким я працював
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              className="bento relative"
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6, type: "spring", stiffness: 80 }}
            >
              <Quote className="w-8 h-8 text-sky-mid mb-4" />
              <p className="text-foreground leading-relaxed mb-6 text-base">{t.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-sm font-bold text-navy">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
