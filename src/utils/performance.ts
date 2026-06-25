/**
 * Performance utilities for the Vietana app.
 */

/**
 * Execute a callback when the main thread is idle.
 * Falls back to setTimeout if requestIdleCallback is not supported.
 */
export const runWhenIdle = (callback: () => void, timeoutMs: number = 2000) => {
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(callback, { timeout: timeoutMs });
  } else {
    setTimeout(callback, Math.min(100, timeoutMs));
  }
};

/**
 * Prefetch a critical resource manually.
 */
export const prefetchResource = (url: string, as: 'image' | 'script' | 'fetch' = 'script') => {
  runWhenIdle(() => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    link.as = as;
    document.head.appendChild(link);
  });
};
