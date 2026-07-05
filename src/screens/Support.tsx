import { ChevronLeft, MessageCircleQuestion, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export function Support() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 pb-20 transition-colors duration-300">
      <div className="flex items-center gap-3">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-transparent flex items-center justify-center text-neutral-600 dark:text-neutral-300 active:scale-95 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <span className="font-medium text-neutral-900 dark:text-white">Служба поддержки</span>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800 text-center space-y-4 transition-colors">
        <div className="w-16 h-16 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-2">
          <MessageCircleQuestion className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Возникли проблемы?</h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
          Если у вас возникли вопросы по оплате, выдаче аккаунта или вы нашли ошибку, напишите нашему менеджеру.
        </p>

        <div className="bg-neutral-50 dark:bg-neutral-950 rounded-xl p-4 text-left mt-4 border border-neutral-200 dark:border-neutral-800 transition-colors">
          <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Как правильно составить обращение:</h3>
          <ul className="text-sm text-neutral-600 dark:text-neutral-500 space-y-2 list-disc list-inside">
            <li>Укажите номер заказа (если есть)</li>
            <li>Приложите скриншот проблемы</li>
            <li>Кратко опишите ситуацию</li>
          </ul>
        </div>

        <Button 
          className="w-full mt-4" 
          onClick={() => window.open('https://t.me/support_cpm2', '_blank')}
        >
          <Send className="w-4 h-4 mr-2" />
          Написать в Telegram
        </Button>
      </div>
    </div>
  );
}
