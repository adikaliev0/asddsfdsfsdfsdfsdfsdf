import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'stars';
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
          {
            'bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300': variant === 'default',
            'bg-green-500/10 text-green-600 dark:text-green-400': variant === 'success',
            'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400': variant === 'warning',
            'bg-red-500/10 text-red-600 dark:text-red-400': variant === 'danger',
            'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20': variant === 'stars',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';
