import { Link } from 'react-router-dom';
import { Settings, Shield, Clock, ChevronRight, Moon, Sun } from 'lucide-react';
import { useTelegram } from '../hooks/useTelegram';
import { mockUser } from '../data/mock';
import { useHapticFeedback } from '../hooks/useHapticFeedback';
import { useTheme } from '../components/ThemeProvider';

export function Profile() {
  const { user: tgUser } = useTelegram();
  const { selection } = useHapticFeedback();
  const { theme, setTheme } = useTheme();
  const user = { ...mockUser, firstName: tgUser?.firstName || mockUser.firstName };

  const toggleTheme = () => {
    selection();
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="space-y-6 pb-20 transition-colors duration-300">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">Профиль</h1>
        <button 
          onClick={toggleTheme}
          className="w-10 h-10 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-300 active:scale-95 transition-all"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* User Card */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800 flex items-center gap-4 transition-colors duration-300">
        <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold text-white shadow-lg shadow-blue-500/20">
          {user.firstName.charAt(0)}
        </div>
        <div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white">{user.firstName}</h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">ID: {user.id}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-4 border border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
          <p className="text-xs text-neutral-500 mb-1">Покупок</p>
          <p className="text-2xl font-bold text-neutral-900 dark:text-white">{user.totalPurchases}</p>
        </div>
        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-4 border border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
          <p className="text-xs text-neutral-500 mb-1">Аккаунтов выдано</p>
          <p className="text-2xl font-bold text-neutral-900 dark:text-white">{user.totalAccountsIssued}</p>
        </div>
      </div>

      {/* Menu List */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden transition-colors duration-300">
        <Link to="/orders" onClick={() => selection()} className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800 active:bg-neutral-50 dark:active:bg-neutral-800/50 transition-colors">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
            <span className="text-neutral-700 dark:text-neutral-200">История заказов</span>
          </div>
          <ChevronRight className="w-5 h-5 text-neutral-400 dark:text-neutral-600" />
        </Link>
        
        <Link to="/support" onClick={() => selection()} className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800 active:bg-neutral-50 dark:active:bg-neutral-800/50 transition-colors">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-green-500 dark:text-green-400" />
            <span className="text-neutral-700 dark:text-neutral-200">Поддержка</span>
          </div>
          <ChevronRight className="w-5 h-5 text-neutral-400 dark:text-neutral-600" />
        </Link>

        <div className="flex items-center justify-between p-4 active:bg-neutral-50 dark:active:bg-neutral-800/50 transition-colors">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
            <span className="text-neutral-700 dark:text-neutral-200">Настройки языка (RU)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
