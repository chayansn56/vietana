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
    white: 'glass text-text-dark',
    glass: 'glass-dark text-white',
    green: 'glass-dark text-white border-brand-gold/20',
    outline: 'bg-transparent border border-brand-gold/30',
    'pro-max': 'glass border-brand-gold/30 text-text-dark'
  };

  const hoverStyles = hover 
    ? 'hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] cursor-pointer' 
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
