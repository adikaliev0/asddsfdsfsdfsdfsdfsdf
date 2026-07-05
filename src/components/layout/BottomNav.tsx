import { NavLink } from 'react-router-dom';
import { Home, LayoutGrid, ReceiptText, UserCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useHapticFeedback } from '../../hooks/useHapticFeedback';

const navItems = [
  { to: '/', icon: Home, label: 'Главная' },
  { to: '/catalog', icon: LayoutGrid, label: 'Каталог' },
  { to: '/orders', icon: ReceiptText, label: 'Покупки' },
  { to: '/profile', icon: UserCircle, label: 'Профиль' },
];

export function BottomNav() {
  const { selection } = useHapticFeedback();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/50 dark:border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-2xl shadow-[0_-8px_32px_rgba(0,0,0,0.1)] pb-safe transition-colors duration-300">
      <nav className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => selection()}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center justify-center w-full h-full space-y-1 text-xs font-medium transition-colors',
                isActive ? 'text-blue-600 dark:text-blue-500' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300'
              )
            }
          >
            <item.icon className="w-6 h-6" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
