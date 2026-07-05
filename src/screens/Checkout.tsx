import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard, Wallet, Tag, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { PaymentMethod } from '../types';
import { useHapticFeedback } from '../hooks/useHapticFeedback';

export function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, quantity, finalPrice } = location.state || {};
  
  const [promoCode, setPromoCode] = useState('');
  const [promoState, setPromoState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [discount, setDiscount] = useState(0);
  const [method, setMethod] = useState<PaymentMethod>('stars');
  const [isProcessing, setIsProcessing] = useState(false);
  const { notification, selection, impact } = useHapticFeedback();

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <p className="text-neutral-500 dark:text-neutral-400">Ошибка оформления</p>
        <Button variant="ghost" className="mt-4" onClick={() => navigate('/catalog')}>
          В каталог
        </Button>
      </div>
    );
  }

  const applyPromo = () => {
    if (!promoCode.trim()) return;
    setPromoState('loading');
    setTimeout(() => {
      if (promoCode.toLowerCase() === 'sale10') {
        setDiscount(10);
        setPromoState('success');
        notification('success');
      } else {
        setPromoState('error');
        setDiscount(0);
        notification('error');
      }
    }, 800);
  };

  const totalPrice = Math.round(finalPrice * (1 - discount / 100));

  const handlePay = () => {
    impact('heavy');
    setIsProcessing(true);
    // Mock processing delay
    setTimeout(() => {
      setIsProcessing(false);
      notification('success');
      navigate('/orders'); // Redirect to orders on success
    }, 2000);
  };

  return (
    <div className="space-y-6 pb-24 transition-colors duration-300">
      {/* Top Nav */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => {
            selection();
            navigate(-1);
          }}
          className="w-10 h-10 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-transparent flex items-center justify-center text-neutral-600 dark:text-neutral-300 active:scale-95 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <span className="font-medium text-neutral-900 dark:text-white">Оформление заказа</span>
      </div>

      {/* Order Summary */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-4 border border-neutral-200 dark:border-neutral-800 flex gap-4 transition-colors">
        <img src={product.image} alt={product.name} className="w-16 h-16 rounded-xl object-cover" />
        <div className="flex-1">
          <h3 className="font-medium text-neutral-900 dark:text-white line-clamp-1">{product.name}</h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">{quantity} шт.</p>
        </div>
        <div className="text-right">
          <span className="font-bold text-neutral-900 dark:text-white">{finalPrice} ₽</span>
        </div>
      </div>

      {/* Promo Code */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-4 border border-neutral-200 dark:border-neutral-800 space-y-3 transition-colors">
        <h3 className="text-sm font-semibold text-neutral-500 dark:text-neutral-300 uppercase tracking-wider flex items-center gap-2">
          <Tag className="w-4 h-4" /> Промокод
        </h3>
        <div className="flex gap-2">
          <Input 
            placeholder="Введите код" 
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            disabled={promoState === 'success' || promoState === 'loading'}
            error={promoState === 'error'}
          />
          <motion.button
            layout
            onClick={applyPromo}
            disabled={!promoCode || promoState === 'success' || promoState === 'loading'}
            initial={false}
            animate={{
              width: promoState === 'success' || promoState === 'error' ? 48 : 140,
              backgroundColor: promoState === 'success' 
                ? '#16a34a' 
                : promoState === 'error' 
                  ? '#dc2626' 
                  : undefined,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={`relative flex items-center justify-center h-12 rounded-xl font-medium overflow-hidden disabled:opacity-50 whitespace-nowrap px-4 ${
              promoState === 'idle' || promoState === 'loading'
                ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white'
                : 'text-white'
            }`}
          >
            <AnimatePresence mode="wait">
              {promoState === 'loading' ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Loader2 className="w-5 h-5 animate-spin" />
                </motion.div>
              ) : promoState === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="absolute inset-0 flex items-center justify-center text-white"
                >
                  <CheckCircle2 className="w-6 h-6" />
                </motion.div>
              ) : promoState === 'error' ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1, x: [-5, 5, -5, 5, 0] }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex items-center justify-center text-white"
                >
                  <XCircle className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  Применить
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
        {promoState === 'success' && <p className="text-sm text-green-600 dark:text-green-400">Промокод применен (-10%)</p>}
        {promoState === 'error' && <p className="text-sm text-red-600 dark:text-red-400">Неверный код</p>}
      </div>

      {/* Payment Methods */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-4 border border-neutral-200 dark:border-neutral-800 space-y-3 transition-colors">
        <h3 className="text-sm font-semibold text-neutral-500 dark:text-neutral-300 uppercase tracking-wider mb-4">Способ оплаты</h3>
        
        <div className="space-y-2">
          <button
            onClick={() => {
              selection();
              setMethod('stars');
            }}
            className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
              method === 'stars' ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10' : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/50 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <StarIcon className="w-6 h-6 text-blue-500 dark:text-blue-400" />
              <span className="font-medium text-neutral-900 dark:text-white">Telegram Stars</span>
            </div>
            {method === 'stars' && <CheckCircle2 className="w-5 h-5 text-blue-500" />}
          </button>

          <button
            onClick={() => {
              selection();
              setMethod('yoomoney');
            }}
            className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
              method === 'yoomoney' ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10' : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/50 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-purple-500 dark:text-purple-400" />
              <span className="font-medium text-neutral-900 dark:text-white">ЮMoney / Карта РФ</span>
            </div>
            {method === 'yoomoney' && <CheckCircle2 className="w-5 h-5 text-blue-500" />}
          </button>

          <button
            onClick={() => {
              selection();
              setMethod('kaspi');
            }}
            className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
              method === 'kaspi' ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10' : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/50 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <Wallet className="w-6 h-6 text-red-500 dark:text-red-400" />
              <span className="font-medium text-neutral-900 dark:text-white">Kaspi KZ</span>
            </div>
            {method === 'kaspi' && <CheckCircle2 className="w-5 h-5 text-blue-500" />}
          </button>
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-[calc(4rem+env(safe-area-inset-bottom))] left-0 right-0 p-4 bg-white/40 dark:bg-black/40 backdrop-blur-2xl shadow-[0_-8px_32px_rgba(0,0,0,0.1)] border-t border-white/50 dark:border-white/10 z-40 transition-colors duration-300">
        <div className="container max-w-md mx-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-xs text-neutral-500">К оплате</span>
            <span className="text-xl font-bold text-neutral-900 dark:text-white">{totalPrice} ₽</span>
          </div>
          <Button 
            className="flex-1" 
            isLoading={isProcessing}
            onClick={handlePay}
          >
            Оплатить
          </Button>
        </div>
      </div>
    </div>
  );
}

// Helper SVG for Stars
function StarIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}
