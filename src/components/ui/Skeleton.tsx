import { cn } from '../../lib/utils';
import { HTMLAttributes } from 'react';
import { motion } from 'motion/react';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{
        repeat: Infinity,
        repeatType: "reverse",
        duration: 1,
        ease: "easeInOut",
      }}
      className={cn("bg-neutral-200 dark:bg-neutral-800 rounded-md", className)}
      {...props}
    />
  );
}
