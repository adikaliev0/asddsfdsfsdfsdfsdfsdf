import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockProducts } from '../data/mock';
import { Badge } from '../components/ui/Badge';
import { Star } from 'lucide-react';
import { motion } from 'motion/react';
import { Skeleton } from '../components/ui/Skeleton';

export function Catalog() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6 transition-colors duration-300">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">Каталог</h1>
        <p className="text-neutral-500 dark:text-neutral-400 mt-1 text-sm">Выберите подходящий аккаунт</p>
      </div>

      {isLoading ? (
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <Skeleton className="h-32 w-full rounded-none" />
              <div className="p-4 flex flex-col gap-3">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                </div>
                <div className="flex items-center justify-between mt-1 pt-2">
                  <div className="space-y-1 w-1/3">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                  <Skeleton className="h-8 w-20 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <motion.div 
          className="grid gap-4"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          {mockProducts.map((product) => (
            <motion.div 
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 transition-colors"
            >
              <Link to={`/product/${product.id}`} className="block">
                <div className="h-32 w-full relative">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {product.stock < 10 && (
                      <Badge variant="warning">Осталось {product.stock}</Badge>
                    )}
                  </div>
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/80 dark:bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg">
                    <Star className="w-3.5 h-3.5 text-yellow-500 dark:text-yellow-400 fill-yellow-500 dark:fill-yellow-400" />
                    <span className="text-xs font-medium text-neutral-900 dark:text-white">{product.rating}</span>
                  </div>
                </div>
                
                <div className="p-4 flex flex-col gap-3">
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-neutral-500 mt-1 line-clamp-1">{product.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{product.priceRub} ₽</span>
                      <span className="text-xs text-neutral-500">или {product.priceStars} Stars</span>
                    </div>
                    <div className="h-8 px-4 rounded-lg bg-blue-50 dark:bg-blue-600/10 text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center justify-center">
                      Купить
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
