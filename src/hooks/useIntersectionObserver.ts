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
          // Optionally unobserve after revealing
          // observerRef.current?.unobserve(entry.target);
        }
      });
    }, options);

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [options]);

  return observerRef;
};
