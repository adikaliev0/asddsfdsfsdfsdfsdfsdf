import WebApp from '@twa-dev/sdk';
import { useCallback } from 'react';

export function useHapticFeedback() {
  const impact = useCallback((style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' = 'light') => {
    try {
      if (WebApp.isExpanded !== undefined) { // basic check if it's running in TG
        WebApp.HapticFeedback.impactOccurred(style);
      }
    } catch (e) {
      // Ignore if not supported
    }
  }, []);

  const notification = useCallback((type: 'error' | 'success' | 'warning' = 'success') => {
    try {
      if (WebApp.isExpanded !== undefined) {
        WebApp.HapticFeedback.notificationOccurred(type);
      }
    } catch (e) {
      // Ignore
    }
  }, []);

  const selection = useCallback(() => {
    try {
      if (WebApp.isExpanded !== undefined) {
        WebApp.HapticFeedback.selectionChanged();
      }
    } catch (e) {
      // Ignore
    }
  }, []);

  return { impact, notification, selection };
}
