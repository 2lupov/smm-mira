import { useState } from 'react';
import { usePortfolioStore } from '@/store/portfolioStore';
import { useNavigate } from 'react-router-dom';
import { LogOut, Save, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const AdminLogin = ({ onLogin }: { onLogin: (p: string) => boolean }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onLogin(password)) setError(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero px-6">
      <motion.form
        onSubmit={handleSubmit}
        className="bento glass-strong w-full max-w-sm space-y-5"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h2 className="text-2xl font-extrabold text-gradient-navy">Адмін-панель</h2>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
            placeholder="Введіть пароль"
          />
          {error && <p className="text-xs text-destructive mt-1">Невірний пароль</p>}
        </div>
        <button
          type="submit"
          className="w-full rounded-xl bg-primary text-primary-foreground font-semibold py-3 transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Увійти
        </button>
      </motion.form>
    </div>
  );
};

const AdminPanel = () => {
  const { data, updateData, isAdmin, login, logout } = usePortfolioStore();
  const navigate = useNavigate();
  const [localData, setLocalData] = useState(data);

  if (!isAdmin) return <AdminLogin onLogin={login} />;

  const save = () => {
    updateData(localData);
    toast.success('Зміни збережено!');
  };

  const updateStat = (index: number, field: 'value' | 'label' | 'suffix', val: string) => {
    const stats = [...localData.stats];
    if (field === 'value') {
      stats[index] = { ...stats[index], value: Number(val) };
    } else {
      stats[index] = { ...stats[index], [field]: val };
    }
    setLocalData({ ...localData, stats });
  };

  const updateWork = (index: number, field: keyof typeof localData.works[0], val: string) => {
    const works = [...localData.works];
    works[index] = { ...works[index], [field]: val };
    setLocalData({ ...localData, works });
  };

  const updateSkill = (index: number, val: string) => {
    const aboutSkills = [...localData.aboutSkills];
    aboutSkills[index] = val;
    setLocalData({ ...localData, aboutSkills });
  };

  const addSkill = () => {
    setLocalData({ ...localData, aboutSkills: [...localData.aboutSkills, 'Нова навичка'] });
  };

  const removeSkill = (index: number) => {
    setLocalData({ ...localData, aboutSkills: localData.aboutSkills.filter((_, i) => i !== index) });
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="sticky top-0 z-50 glass-strong border-b border-border px-6 py-3">
        <div className="container max-w-4xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/')} className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-bold text-foreground">Адмін-панель</h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={save} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:scale-[1.02] transition-transform">
              <Save className="w-4 h-4" /> Зберегти
            </button>
            <button onClick={() => { logout(); navigate('/'); }} className="text-muted-foreground hover:text-foreground transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="container max-w-4xl px-6 py-10 space-y-10">
        {/* Personal Info */}
        <Section title="Особисті дані">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Ім'я" value={localData.name} onChange={(v) => setLocalData({ ...localData, name: v })} />
            <Field label="Локація" value={localData.location} onChange={(v) => setLocalData({ ...localData, location: v })} />
            <Field label="Email" value={localData.email} onChange={(v) => setLocalData({ ...localData, email: v })} />
            <Field label="Instagram" value={localData.instagram} onChange={(v) => setLocalData({ ...localData, instagram: v })} />
            <Field label="Telegram" value={localData.telegram} onChange={(v) => setLocalData({ ...localData, telegram: v })} />
          </div>
          <div className="mt-4">
            <Field label="URL фото (вставте посилання на ваше фото)" value={localData.photoUrl} onChange={(v) => setLocalData({ ...localData, photoUrl: v })} />
            {localData.photoUrl && (
              <div className="mt-3 w-24 h-24 rounded-2xl overflow-hidden">
                <img src={localData.photoUrl} alt="Прев'ю" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </Section>

        {/* About */}
        <Section title="Про мене">
          <Field label="Заголовок секції" value={localData.aboutTitle} onChange={(v) => setLocalData({ ...localData, aboutTitle: v })} />
          <Field label="Текст про мене" value={localData.aboutText} onChange={(v) => setLocalData({ ...localData, aboutText: v })} textarea />
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground block">Навички / Теги</label>
            <div className="flex flex-wrap gap-2">
              {localData.aboutSkills.map((skill, i) => (
                <div key={i} className="flex items-center gap-1 bg-secondary rounded-xl px-3 py-1.5">
                  <input
                    value={skill}
                    onChange={(e) => updateSkill(i, e.target.value)}
                    className="bg-transparent text-sm text-secondary-foreground border-none outline-none w-24"
                  />
                  <button onClick={() => removeSkill(i)} className="text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <button onClick={addSkill} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-xl border border-dashed border-border">
                <Plus className="w-3 h-3" /> Додати
              </button>
            </div>
          </div>
        </Section>

        {/* Hero */}
        <Section title="Hero секція">
          <Field label="Заголовок" value={localData.heroTitle} onChange={(v) => setLocalData({ ...localData, heroTitle: v })} />
          <Field label="Підзаголовок" value={localData.heroSubtitle} onChange={(v) => setLocalData({ ...localData, heroSubtitle: v })} />
          <Field label="Кнопка CTA" value={localData.heroCta} onChange={(v) => setLocalData({ ...localData, heroCta: v })} />
          <Field label="Біо" value={localData.bio} onChange={(v) => setLocalData({ ...localData, bio: v })} textarea />
        </Section>

        {/* Stats */}
        <Section title="Статистика">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {localData.stats.map((stat, i) => (
              <div key={i} className="bento-sm space-y-3">
                <Field label="Назва" value={stat.label} onChange={(v) => updateStat(i, 'label', v)} />
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Field label="Значення" value={String(stat.value)} onChange={(v) => updateStat(i, 'value', v)} type="number" />
                  </div>
                  <div className="w-20">
                    <Field label="Суфікс" value={stat.suffix} onChange={(v) => updateStat(i, 'suffix', v)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Works */}
        <Section title="Роботи">
          <div className="space-y-4">
            {localData.works.map((work, i) => (
              <div key={work.id} className="bento-sm space-y-3">
                <Field label="Назва" value={work.title} onChange={(v) => updateWork(i, 'title', v)} />
                <Field label="Опис" value={work.description} onChange={(v) => updateWork(i, 'description', v)} />
                <Field label="URL зображення" value={work.imageUrl} onChange={(v) => updateWork(i, 'imageUrl', v)} />
                <Field label="Категорія" value={work.category} onChange={(v) => updateWork(i, 'category', v)} />
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
    <h2 className="text-xl font-bold text-gradient-navy">{title}</h2>
    {children}
  </motion.div>
);

const Field = ({ label, value, onChange, textarea, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; textarea?: boolean; type?: string;
}) => (
  <div>
    <label className="text-xs font-medium text-muted-foreground mb-1 block">{label}</label>
    {textarea ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition resize-none"
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
      />
    )}
  </div>
);

export default AdminPanel;
