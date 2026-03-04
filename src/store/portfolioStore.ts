import { create } from 'zustand';

export interface PortfolioWork {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  avatar: string;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface PortfolioData {
  // Personal
  name: string;
  photoUrl: string;
  location: string;
  email: string;
  instagram: string;
  telegram: string;
  aboutTitle: string;
  aboutText: string;
  aboutSkills: string[];
  // Hero
  heroTitle: string;
  heroSubtitle: string;
  heroCta: string;
  bio: string;
  stats: { label: string; value: number; suffix: string }[];
  works: PortfolioWork[];
  services: Service[];
  testimonials: Testimonial[];
}

const defaultData: PortfolioData = {
  name: "Ваше Ім'я",
  photoUrl: "",
  location: "Київ, Україна",
  email: "hello@smm.pro",
  instagram: "@smm.pro",
  telegram: "@smm_pro",
  aboutTitle: "Про мене",
  aboutText: "Я — SMM-спеціалістка з 5+ роками досвіду. Допомагаю брендам знаходити свій голос у соцмережах, створювати контент, який чіпляє, та будувати лояльну аудиторію. Моя місія — перетворити ваш Instagram на потужний інструмент продажів.",
  aboutSkills: ["Instagram", "TikTok", "Facebook Ads", "Контент-стратегія", "Reels & Stories", "Аналітика"],
  heroTitle: "Створюю бренди, які запам'ятовуються",
  heroSubtitle: "SMM-стратегії, контент та візуал, що перетворюють підписників на клієнтів",
  heroCta: "Зв'язатися зі мною",
  bio: "Привіт! Я — SMM-спеціаліст з 5+ роками досвіду у створенні контент-стратегій для брендів, які хочуть вирізнятися.",
  stats: [
    { label: "Залучених підписників", value: 850, suffix: "K+" },
    { label: "Охоплення за місяць", value: 12, suffix: "M+" },
    { label: "Успішних проєктів", value: 120, suffix: "+" },
    { label: "Задоволених клієнтів", value: 95, suffix: "%" },
  ],
  works: [
    { id: "1", title: "Ребрендинг кав'ярні", description: "Повна SMM-стратегія та візуальна айдентика", imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600", category: "Стратегія" },
    { id: "2", title: "Запуск бʼюті-бренду", description: "Від 0 до 50K підписників за 3 місяці", imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600", category: "Контент" },
    { id: "3", title: "Ресторан «Смак»", description: "Візуальний контент та рілс-стратегія", imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600", category: "Відео" },
    { id: "4", title: "Фітнес-студія", description: "Комплексний SMM та таргетована реклама", imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600", category: "Реклама" },
    { id: "5", title: "Онлайн-магазин одягу", description: "UGC-контент та інфлюенсер-маркетинг", imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600", category: "Контент" },
    { id: "6", title: "Техно-стартап", description: "Побудова спільноти та лід-генерація", imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600", category: "Стратегія" },
  ],
  services: [
    { id: "1", icon: "Megaphone", title: "SMM-стратегія", description: "Розробка комплексної стратегії для соціальних мереж" },
    { id: "2", icon: "Palette", title: "Візуальний контент", description: "Створення унікального візуального стилю вашого бренду" },
    { id: "3", icon: "Video", title: "Відеоконтент та Reels", description: "Продакшн вірусного відеоконтенту для усіх платформ" },
    { id: "4", icon: "Target", title: "Таргетована реклама", description: "Налаштування та оптимізація рекламних кампаній" },
    { id: "5", icon: "BarChart3", title: "Аналітика та звітність", description: "Детальний аналіз метрик та щомісячні звіти" },
    { id: "6", icon: "Users", title: "Комʼюніті-менеджмент", description: "Побудова лояльної спільноти навколо бренду" },
  ],
  testimonials: [
    { id: "1", name: "Олена Коваленко", role: "CEO, Beauty Brand", text: "Завдяки роботі нашого SMM-спеціаліста ми зросли з 2K до 50K підписників за 3 місяці. Неймовірний результат!", avatar: "" },
    { id: "2", name: "Андрій Мельник", role: "Власник ресторану", text: "Професійний підхід до контенту та стратегії. Наші продажі зросли на 40% після початку співпраці.", avatar: "" },
    { id: "3", name: "Марія Шевченко", role: "Фітнес-тренер", text: "Креативний та відповідальний спеціаліст. Завжди в курсі трендів та знає, як зачепити аудиторію.", avatar: "" },
    { id: "4", name: "Дмитро Бондаренко", role: "Засновник стартапу", text: "Найкращий SMM-менеджер, з яким я працював. Результати перевершили всі очікування.", avatar: "" },
  ],
};

interface PortfolioStore {
  data: PortfolioData;
  isAdmin: boolean;
  updateData: (updates: Partial<PortfolioData>) => void;
  login: (password: string) => boolean;
  logout: () => void;
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  data: defaultData,
  isAdmin: false,
  updateData: (updates) => set((state) => ({ data: { ...state.data, ...updates } })),
  login: (password) => {
    if (password === 'admin123') {
      set({ isAdmin: true });
      return true;
    }
    return false;
  },
  logout: () => set({ isAdmin: false }),
}));
