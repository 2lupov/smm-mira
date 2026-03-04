import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { usePortfolioStore } from '@/store/portfolioStore';

const Works = () => {
  const { works } = usePortfolioStore((s) => s.data);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 px-6" id="works" ref={ref}>
      <div className="container max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-gradient-navy mb-4">Обрані роботи</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Проєкти, якими я пишаюся найбільше
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.map((work, i) => (
            <motion.div
              key={work.id}
              className="group relative rounded-3xl overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, type: "spring", stiffness: 80 }}
              whileHover={{ y: -8 }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={work.imageUrl}
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground w-fit mb-3">
                  {work.category}
                </span>
                <h3 className="text-xl font-bold text-primary-foreground mb-1">{work.title}</h3>
                <p className="text-sm text-primary-foreground/70">{work.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;
