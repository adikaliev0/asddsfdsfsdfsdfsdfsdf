import { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';

export function useTelegram() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Initialize WebApp only when component mounts
    WebApp.ready();
    WebApp.expand();
    
    // Set theme colors if possible
    WebApp.setHeaderColor('bg_color');
    WebApp.setBackgroundColor('bg_color');
    
    setIsReady(true);
  }, []);

  return {
    tg: WebApp,
    user: WebApp.initDataUnsafe?.user,
    isReady,
    themeParams: WebApp.themeParams,
  };
}
