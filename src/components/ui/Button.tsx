import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  className = '',
  ...props
}) => {
  const baseStyles = 'focus-ring inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none cursor-pointer';
  
  const variants = {
    primary: 'bg-brand-gold text-brand-green-dark hover:bg-brand-gold-light hover:-translate-y-1 shadow-gold hover:shadow-gold-hover border-none',
    secondary: 'bg-brand-green text-white hover:bg-brand-green-light hover:-translate-y-1 shadow-soft',
    outline: 'bg-transparent border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-green-dark',
    ghost: 'bg-transparent text-brand-gold hover:bg-brand-gold/10',
    glass: 'bg-black/5 dark:bg-white/10 text-text-dark dark:text-white border border-black/10 dark:border-white/30 hover:bg-black/10 dark:hover:bg-white/20 backdrop-blur-xl',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-8 py-3.5 text-sm',
    lg: 'px-10 py-4 text-base',
    hero: 'px-12 py-6 text-xl shadow-[0_20px_60px_rgba(202,138,4,0.3)]',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {icon && <span className="flex items-center">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
