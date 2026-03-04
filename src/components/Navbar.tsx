import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { usePortfolioStore } from '@/store/portfolioStore';

const links = [
  { label: 'Про мене', href: '#about' },
  { label: 'Роботи', href: '#works' },
  { label: 'Послуги', href: '#services' },
  { label: 'Відгуки', href: '#testimonials' },
  { label: 'Контакт', href: '#contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { name } = usePortfolioStore((s) => s.data);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container max-w-6xl mx-auto glass-strong rounded-2xl px-6 py-3 flex items-center justify-between">
        <a href="#" className="text-lg font-extrabold text-gradient-navy">
          {name || 'SMM.pro'}
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
          <a
            href="/admin"
            className="text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors"
          >
            Адмін
          </a>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <motion.div
          className="md:hidden mt-2 glass-strong rounded-2xl px-6 py-4 container max-w-6xl mx-auto flex flex-col gap-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
          <a href="/admin" className="text-xs text-muted-foreground hover:text-foreground">Адмін</a>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
