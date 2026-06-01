import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  maxWidth?: string;
  variant?: 'dark' | 'light';
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className = '',
  maxWidth = 'max-w-md',
  variant = 'dark'
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  const overlays = {
    dark: 'fixed inset-0 bg-brand-green-extra-dark/80 ',
    light: 'fixed inset-0 bg-brand-green-extra-dark/45 ',
  };

  const wrappers = {
    dark: 'bg-brand-green-extra-dark border border-white/10 text-white',
    light: 'bg-surface-cream border border-brand-green/8 text-text-dark',
  };

  const closeBtns = {
    dark: 'bg-white/5 text-white/60 hover:bg-white/15 hover:text-white',
    light: 'bg-brand-green/5 text-brand-green/60 hover:bg-brand-green/10 hover:text-brand-green',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={overlays[variant]}
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`relative w-full ${maxWidth} ${wrappers[variant]} rounded-[28px] overflow-hidden shadow-deep ${className}`}
          >
            <button
              onClick={onClose}
              className={`absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 z-[100] text-2xl cursor-pointer ${closeBtns[variant]}`}
              aria-label="Close modal"
            >
              ×
            </button>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
