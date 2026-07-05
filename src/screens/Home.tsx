import { Link } from 'react-router-dom';
import { ShoppingCart, ShieldCheck, Zap, Star } from 'lucide-react';
import { mockProducts } from '../data/mock';
import { Badge } from '../components/ui/Badge';
import { useTelegram } from '../hooks/useTelegram';
import { useHapticFeedback } from '../hooks/useHapticFeedback';

export function Home() {
  const { user } = useTelegram();
  const { selection } = useHapticFeedback();
  const featuredProduct = mockProducts[0];

  return (
    <div className="space-y-8 transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
            Привет, {user?.firstName || 'Гонщик'} 👋
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 mt-1">Лучшие аккаунты CPM 2 здесь</p>
        </div>
      </div>

      {/* Hero / Featured */}
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
        <div className="absolute inset-0">
          <img src={featuredProduct.image} alt="Featured" className="w-full h-full object-cover opacity-60 dark:opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-neutral-900 to-transparent" />
        </div>
        <div className="relative p-6 mt-20">
          <Badge variant="stars" className="mb-3">🔥 Хит продаж</Badge>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">{featuredProduct.name}</h2>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">{featuredProduct.priceRub} ₽</span>
            <span className="text-sm text-neutral-500 dark:text-neutral-400 line-through">{featuredProduct.priceRub + 100} ₽</span>
          </div>
          <Link
            to={`/product/${featuredProduct.id}`}
            onClick={() => selection()}
            className="inline-flex items-center justify-center w-full bg-blue-600 text-white rounded-xl h-12 font-medium hover:bg-blue-700 active:scale-[0.98] transition-all"
          >
            Смотреть
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Link to="/catalog" onClick={() => selection()} className="flex flex-col p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 active:bg-neutral-50 dark:active:bg-neutral-800 transition-colors">
          <ShoppingCart className="w-6 h-6 text-blue-500 dark:text-blue-400 mb-3" />
          <span className="font-medium text-neutral-900 dark:text-white">Каталог</span>
          <span className="text-xs text-neutral-500 mt-1">Все аккаунты</span>
        </Link>
        <Link to="/support" onClick={() => selection()} className="flex flex-col p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 active:bg-neutral-50 dark:active:bg-neutral-800 transition-colors">
          <ShieldCheck className="w-6 h-6 text-green-500 dark:text-green-400 mb-3" />
          <span className="font-medium text-neutral-900 dark:text-white">Гарантии</span>
          <span className="text-xs text-neutral-500 mt-1">100% защита</span>
        </Link>
      </div>

      {/* Features List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Почему мы?</h3>
        <div className="space-y-3">
          {[
            { icon: Zap, title: 'Мгновенная выдача', desc: 'Сразу после оплаты' },
            { icon: ShieldCheck, title: 'Полная безопасность', desc: 'Аккаунты без банов' },
            { icon: Star, title: 'Лучшие цены', desc: 'Скидки за объем' },
          ].map((feat, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800/50 transition-colors">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-transparent flex items-center justify-center">
                <feat.icon className="w-5 h-5 text-neutral-500 dark:text-neutral-300" />
              </div>
              <div>
                <h4 className="font-medium text-sm text-neutral-900 dark:text-neutral-200">{feat.title}</h4>
                <p className="text-xs text-neutral-500 mt-0.5">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
