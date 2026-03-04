import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Megaphone, Palette, Video, Target, BarChart3, Users } from 'lucide-react';
import { usePortfolioStore } from '@/store/portfolioStore';

const iconMap: Record<string, React.ElementType> = {
  Megaphone, Palette, Video, Target, BarChart3, Users,
};

const Services = () => {
  const { services } = usePortfolioStore((s) => s.data);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 px-6 bg-gradient-sky" id="services" ref={ref}>
      <div className="container max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-gradient-navy mb-4">Послуги</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Комплексний підхід до вашої присутності в соцмережах
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Megaphone;
            return (
              <motion.div
                key={service.id}
                className="bento-sm glass-strong group cursor-pointer"
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5, type: "spring", stiffness: 100 }}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-5 glow-blue group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-navy" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
