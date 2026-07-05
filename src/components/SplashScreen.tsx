import { motion } from 'motion/react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  return (
    <motion.div
      key="splash"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
    >
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center"
      >
        <h1 className="text-5xl font-bold text-white tracking-tighter mb-6">
          CPM<span className="text-blue-500">2</span>
        </h1>
        
        <div className="h-1.5 w-48 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 4.5, ease: "easeInOut" }}
            className="h-full bg-blue-500 rounded-full"
            onAnimationComplete={() => {
              // Wait a little bit after loading bar is full before hiding splash
              setTimeout(onComplete, 800);
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
