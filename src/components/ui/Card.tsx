import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  variant?: 'white' | 'glass' | 'green' | 'outline' | 'pro-max';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
  variant = 'white',
  padding = 'md',
  ...props
}) => {
  // We use 'group' here so we can trigger child effects on hover
  const baseStyles = 'group relative rounded-[24px] overflow-hidden transition-all duration-700 ease-out z-10';
  
  const variants = {
    white: 'bg-white/80 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgba(8,38,24,0.04)]',
    glass: 'bg-white/5 backdrop-blur-xl border border-white/10 text-white shadow-[0_8px_32px_rgba(0,0,0,0.12)]',
    green: 'bg-brand-green/90 backdrop-blur-xl text-white shadow-strong border border-brand-green-light/20',
    outline: 'bg-transparent border border-brand-gold/30',
    'pro-max': 'bg-gradient-to-b from-white/90 to-white/60 backdrop-blur-2xl border border-white shadow-[0_12px_40px_rgba(8,38,24,0.06)]'
  };

  const hoverStyles = hover 
    ? 'hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(8,38,24,0.12)]' 
    : '';

  const paddings = {
    none: '',
    sm: 'p-5',
    md: 'p-8',
    lg: 'p-12',
  };

  return (
    <div 
      className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${paddings[padding]} ${className}`}
      {...props}
    >
      {/* Premium Spotlight Effect for Pro Max */}
      {hover && (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[24px]">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-gold/0 via-brand-gold/0 to-brand-gold/0 opacity-0 group-hover:opacity-10 transition-opacity duration-1000 ease-out" />
          <div className="absolute -inset-[100%] bg-[radial-gradient(circle_at_50%_0%,rgba(201,168,76,0.15),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-out mix-blend-overlay" />
        </div>
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Card;
