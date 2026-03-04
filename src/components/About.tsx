import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Instagram, Send, User } from 'lucide-react';
import { usePortfolioStore } from '@/store/portfolioStore';

const About = () => {
  const { name, photoUrl, aboutTitle, aboutText, aboutSkills, location, instagram, telegram } = usePortfolioStore((s) => s.data);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 px-6" id="about" ref={ref}>
      <div className="container max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          {/* Photo */}
          <motion.div
            className="lg:col-span-2 flex justify-center"
            initial={{ opacity: 0, x: -40, scale: 0.95 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
          >
            <div className="relative">
              <div className="w-64 h-80 md:w-72 md:h-96 rounded-[2.5rem] overflow-hidden glass glow-blue">
                {photoUrl ? (
                  <img src={photoUrl} alt={name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-secondary flex items-center justify-center">
                    <User className="w-20 h-20 text-muted-foreground/30" />
                  </div>
                )}
              </div>
              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-4 -right-4 bento-sm glass-strong py-3 px-5"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">{location}</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            className="lg:col-span-3 space-y-6"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-gradient-navy">{aboutTitle}</h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">{aboutText}</p>

            {/* Skills */}
            <div className="flex flex-wrap gap-2">
              {aboutSkills.map((skill, i) => (
                <motion.span
                  key={skill}
                  className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.08, type: "spring" }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4 pt-2">
              {instagram && (
                <a href={`https://instagram.com/${instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass text-sm font-medium text-foreground hover:scale-105 transition-transform">
                  <Instagram className="w-4 h-4" />
                  {instagram}
                </a>
              )}
              {telegram && (
                <a href={`https://t.me/${telegram.replace('@', '')}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass text-sm font-medium text-foreground hover:scale-105 transition-transform">
                  <Send className="w-4 h-4" />
                  {telegram}
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
