import { useEffect, useRef } from 'react';

export const useIntersectionObserver = (
  options: IntersectionObserverInit = { threshold: 0.1 }
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, options);

    const scanAndObserve = () => {
      const elements = document.querySelectorAll('.reveal:not(.is-visible)');
      elements.forEach((el) => observerRef.current?.observe(el));
    };

    // Initial scan
    scanAndObserve();

    // Set up MutationObserver to detect new .reveal elements (e.g. from lazy loading)
    const mutationObserver = new MutationObserver(() => {
      scanAndObserve();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      mutationObserver.disconnect();
    };
  }, [options]);

  return observerRef;
};
