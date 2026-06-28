import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  variant?: 'white' | 'glass' | 'green' | 'outline' | 'pro-max' | 'editorial';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  asButton?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
  variant = 'white',
  padding = 'md',
  asButton = false,
  ...props
}) => {
  // We use 'group' here so we can trigger child effects on hover
  const baseStyles = 'group relative overflow-hidden transition-all duration-500 ease-out z-10';
  
  const variants: Record<string, string> = {
    white: 'rounded-[24px] glass text-text-dark',
    glass: 'rounded-[24px] glass-dark text-white',
    green: 'rounded-[24px] glass-dark text-white border-brand-gold/20',
    outline: 'rounded-[24px] bg-transparent border border-brand-gold/30',
    'pro-max': 'rounded-[24px] glass border-brand-gold/30 text-text-dark',
    editorial: 'rounded-xl bg-white border border-[#E8E4D9] shadow-sm',
  };

  const hoverStyles = hover 
    ? variant === 'editorial'
      ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer'
      : 'hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] cursor-pointer'
    : '';

  const paddings = {
    none: '',
    sm: 'p-5',
    md: 'p-8',
    lg: 'p-12',
  };

  const clickable = asButton ? '' : '';

  return (
    <div 
      className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${paddings[padding]} ${clickable} ${className}`}
      role={asButton ? 'button' : undefined}
      tabIndex={asButton ? 0 : undefined}
      {...props}
    >
      {/* Premium Spotlight Effect for Pro Max */}
      {hover && variant === 'pro-max' && (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[24px]">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-gold/0 via-brand-gold/0 to-brand-gold/0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 ease-out" />
          <div className="absolute -inset-[100%] bg-[radial-gradient(circle_at_50%_0%,rgba(202,138,4,0.15),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out mix-blend-overlay" />
        </div>
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Card;
