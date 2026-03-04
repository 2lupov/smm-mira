import { Instagram, Mail, Send } from 'lucide-react';
import { usePortfolioStore } from '@/store/portfolioStore';

const Footer = () => {
  const { name, email, instagram, telegram } = usePortfolioStore((s) => s.data);

  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="container max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © 2026 {name || 'SMM.pro'} — Усі права захищені
        </p>
        <div className="flex items-center gap-4">
          {instagram && (
            <a href={`https://instagram.com/${instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
          )}
          {telegram && (
            <a href={`https://t.me/${telegram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Send className="w-5 h-5" />
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`} className="text-muted-foreground hover:text-foreground transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
