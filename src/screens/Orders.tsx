import { useState, useEffect } from 'react';
import { mockOrders } from '../data/mock';
import { Badge } from '../components/ui/Badge';
import { ChevronDown, ChevronUp, Copy, CheckCircle2, ReceiptText } from 'lucide-react';
import { useHapticFeedback } from '../hooks/useHapticFeedback';
import { Skeleton } from '../components/ui/Skeleton';

export function Orders() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { impact, notification } = useHapticFeedback();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6 pb-20 transition-colors duration-300">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">Мои покупки</h1>
        </div>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4">
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-6 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (mockOrders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4 transition-colors">
        <div className="w-16 h-16 bg-white dark:bg-neutral-900 rounded-full flex items-center justify-center text-neutral-400 dark:text-neutral-500 border border-neutral-200 dark:border-transparent">
          <ReceiptText className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Нет заказов</h2>
          <p className="text-neutral-500 dark:text-neutral-400 mt-1">Вы еще ничего не купили</p>
        </div>
      </div>
    );
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    notification('success');
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="space-y-6 pb-20 transition-colors duration-300">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">Мои покупки</h1>
      </div>

      <div className="space-y-4">
        {mockOrders.map((order) => {
          const isExpanded = expandedOrder === order.id;
          const statusColors = {
            completed: 'success',
            pending: 'warning',
            failed: 'danger'
          } as const;
          
          const statusText = {
            completed: 'Выполнен',
            pending: 'Ожидает оплаты',
            failed: 'Ошибка'
          };

          return (
            <div key={order.id} className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden transition-colors">
              {/* Header - clickable to expand */}
              <div 
                className="p-4 flex items-center justify-between active:bg-neutral-50 dark:active:bg-neutral-800/50 transition-colors cursor-pointer"
                onClick={() => {
                  impact('light');
                  setExpandedOrder(isExpanded ? null : order.id);
                }}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-neutral-900 dark:text-white">Заказ {order.id}</span>
                    <Badge variant={statusColors[order.status]}>
                      {statusText[order.status]}
                    </Badge>
                  </div>
                  <span className="text-xs text-neutral-500">
                    {new Date(order.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-neutral-900 dark:text-white">{order.totalRub} ₽</span>
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-neutral-400 dark:text-neutral-500" /> : <ChevronDown className="w-5 h-5 text-neutral-400 dark:text-neutral-500" />}
                </div>
              </div>

              {/* Details - Collapsible */}
              {isExpanded && (
                <div className="border-t border-neutral-200 dark:border-neutral-800 p-4 space-y-4 bg-neutral-50 dark:bg-neutral-950/50">
                  {/* Items */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-semibold text-neutral-500 uppercase">Товары</h4>
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex gap-3">
                        <img src={item.product.image} className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                          <p className="text-sm font-medium text-neutral-900 dark:text-neutral-200">{item.product.name}</p>
                          <p className="text-xs text-neutral-500 mt-0.5">{item.quantity} шт. × {item.priceRub} ₽</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Credentials - If completed */}
                  {order.status === 'completed' && order.credentials && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-semibold text-neutral-500 uppercase">Данные от аккаунтов</h4>
                      <div className="space-y-2">
                        {order.credentials.map((cred, idx) => (
                          <div key={idx} className="bg-white dark:bg-neutral-900 rounded-xl p-3 border border-neutral-200 dark:border-neutral-800">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs text-neutral-500 dark:text-neutral-400">Аккаунт {idx + 1}</span>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between bg-neutral-50 dark:bg-neutral-950 px-3 py-2 rounded-lg border border-neutral-100 dark:border-transparent">
                                <span className="text-sm text-neutral-800 dark:text-neutral-300 font-mono select-all">{cred.login}</span>
                                <button onClick={() => handleCopy(cred.login)} className="text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
                                  {copiedText === cred.login ? <CheckCircle2 className="w-4 h-4 text-green-500 dark:text-green-400" /> : <Copy className="w-4 h-4" />}
                                </button>
                              </div>
                              <div className="flex items-center justify-between bg-neutral-50 dark:bg-neutral-950 px-3 py-2 rounded-lg border border-neutral-100 dark:border-transparent">
                                <span className="text-sm text-neutral-800 dark:text-neutral-300 font-mono select-all">{cred.pass}</span>
                                <button onClick={() => handleCopy(cred.pass)} className="text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
                                  {copiedText === cred.pass ? <CheckCircle2 className="w-4 h-4 text-green-500 dark:text-green-400" /> : <Copy className="w-4 h-4" />}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
