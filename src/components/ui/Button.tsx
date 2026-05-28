import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
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
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';
  
  const variants = {
    primary: 'bg-[var(--gold)] color-[var(--gd)] hover:bg-[var(--gold3)] hover:-translate-y-1 shadow-[0_4px_20px_rgba(201,168,76,0.3)] hover:shadow-[0_12px_32px_rgba(201,168,76,0.45)] border-none',
    secondary: 'bg-white/5 text-white border border-white/20 hover:bg-white/10 hover:border-white/40 hover:-translate-y-1 backdrop-blur-md',
    outline: 'bg-transparent border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--gd)]',
    ghost: 'bg-transparent text-[var(--gold)] hover:bg-[var(--gold)]/10',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-8 py-3.5 text-[0.88rem]',
    lg: 'px-10 py-4 text-base',
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
