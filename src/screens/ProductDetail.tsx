import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockProducts } from '../data/mock';
import { ChevronLeft, Star, ShieldCheck, CheckCircle2, Minus, Plus } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useHapticFeedback } from '../hooks/useHapticFeedback';
import { Skeleton } from '../components/ui/Skeleton';

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = mockProducts.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { selection, impact } = useHapticFeedback();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6 pb-24 transition-colors duration-300">
        {/* Top Nav Skeleton */}
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="w-32 h-6" />
        </div>

        {/* Image & Header Skeleton */}
        <div className="space-y-4">
          <Skeleton className="rounded-2xl aspect-video w-full" />
          <div>
            <div className="flex items-center justify-between mb-2">
              <Skeleton className="w-24 h-6 rounded-full" />
              <Skeleton className="w-16 h-6 rounded-full" />
            </div>
            <Skeleton className="w-3/4 h-8 mb-2" />
            <Skeleton className="w-full h-4 mb-1" />
            <Skeleton className="w-5/6 h-4" />
          </div>
        </div>

        {/* Features Skeleton */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-4 border border-neutral-200 dark:border-neutral-800 space-y-3">
          <Skeleton className="w-24 h-4 mb-2" />
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="w-5 h-5 rounded-full" />
                <Skeleton className="w-48 h-4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <p className="text-neutral-500 dark:text-neutral-400">Товар не найден</p>
        <Button variant="ghost" className="mt-4" onClick={() => navigate(-1)}>
          Назад
        </Button>
      </div>
    );
  }

  // Calculate discount
  let currentDiscount = 0;
  if (product.discountTiers) {
    const applicableTier = [...product.discountTiers]
      .sort((a, b) => b.quantity - a.quantity)
      .find(t => quantity >= t.quantity);
    if (applicableTier) currentDiscount = applicableTier.discountPercent;
  }

  const basePrice = product.priceRub * quantity;
  const finalPrice = Math.round(basePrice * (1 - currentDiscount / 100));

  const handleCheckout = () => {
    impact('medium');
    navigate('/checkout', { state: { product, quantity, finalPrice } });
  };

  const handleBack = () => {
    selection();
    navigate(-1);
  };

  return (
    <div className="space-y-6 pb-24 transition-colors duration-300">
      {/* Top Nav */}
      <div className="flex items-center gap-3">
        <button 
          onClick={handleBack}
          className="w-10 h-10 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-transparent flex items-center justify-center text-neutral-600 dark:text-neutral-300 active:scale-95 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <span className="font-medium text-neutral-900 dark:text-white">Детали товара</span>
      </div>

      {/* Image & Header */}
      <div className="space-y-4">
        <div className="rounded-2xl overflow-hidden aspect-video relative border border-neutral-200 dark:border-neutral-800">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <Badge variant="success">В наличии: {product.stock}</Badge>
            <div className="flex items-center gap-1 text-yellow-500 dark:text-yellow-400">
              <Star className="w-4 h-4 fill-yellow-500 dark:fill-yellow-400" />
              <span className="text-sm font-medium text-neutral-900 dark:text-white">{product.rating}</span>
              <span className="text-xs text-neutral-500">({product.reviewsCount})</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white leading-tight">{product.name}</h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-2 leading-relaxed">{product.description}</p>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-4 border border-neutral-200 dark:border-neutral-800 space-y-3 transition-colors">
        <h3 className="text-sm font-semibold text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">В комплекте</h3>
        <ul className="space-y-2">
          {product.features.map((feat, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-neutral-700 dark:text-neutral-200">
              <CheckCircle2 className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Quantity & Price */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-4 border border-neutral-200 dark:border-neutral-800 space-y-4 transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-neutral-700 dark:text-neutral-300 font-medium">Количество</span>
          <div className="flex items-center gap-4 bg-neutral-50 dark:bg-neutral-950 p-1 rounded-xl border border-neutral-200 dark:border-neutral-800 transition-colors">
            <button 
              className="w-8 h-8 flex items-center justify-center text-neutral-500 dark:text-neutral-400 active:text-neutral-900 dark:active:text-white disabled:opacity-50"
              onClick={() => {
                selection();
                setQuantity(q => Math.max(1, q - 1));
              }}
              disabled={quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-6 text-center font-semibold text-neutral-900 dark:text-white">{quantity}</span>
            <button 
              className="w-8 h-8 flex items-center justify-center text-neutral-500 dark:text-neutral-400 active:text-neutral-900 dark:active:text-white disabled:opacity-50"
              onClick={() => {
                selection();
                setQuantity(q => Math.min(product.stock, q + 1));
              }}
              disabled={quantity >= product.stock}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {product.discountTiers && product.discountTiers.length > 0 && (
          <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800">
            <p className="text-xs text-neutral-500 mb-2">Скидки от количества:</p>
            <div className="flex flex-wrap gap-2">
              {product.discountTiers.map((tier, i) => (
                <Badge key={i} variant={quantity >= tier.quantity ? "success" : "default"}>
                  От {tier.quantity} шт. (-{tier.discountPercent}%)
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-[calc(4rem+env(safe-area-inset-bottom))] left-0 right-0 p-4 bg-white/40 dark:bg-black/40 backdrop-blur-2xl shadow-[0_-8px_32px_rgba(0,0,0,0.1)] border-t border-white/50 dark:border-white/10 z-40 transition-colors duration-300">
        <div className="container max-w-md mx-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-xs text-neutral-500">Итого к оплате</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-neutral-900 dark:text-white">{finalPrice} ₽</span>
              {currentDiscount > 0 && (
                <span className="text-sm text-neutral-500 line-through">{basePrice} ₽</span>
              )}
            </div>
          </div>
          <Button onClick={handleCheckout} className="flex-1">
            К оплате
          </Button>
        </div>
      </div>
    </div>
  );
}
