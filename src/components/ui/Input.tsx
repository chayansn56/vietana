import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  variant?: 'glass' | 'ghost';
}

const Input: React.FC<InputProps> = ({ className = '', variant = 'glass', ...props }) => {
  const baseStyles = 'w-full text-sm outline-none focus-visible:ring-2 focus-visible:ring-brand-gold transition-all text-text-dark dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30';
  
  const variants = {
    glass: 'bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg px-4 py-2.5 focus:border-brand-gold/40 focus:bg-black/10 dark:focus:bg-white/10',
    ghost: 'bg-transparent border-none py-3 rounded-md text-lg font-light',
  };

  return (
    <input
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    />
  );
};

export default Input;
