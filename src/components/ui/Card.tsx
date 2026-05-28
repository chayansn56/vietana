import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  variant?: 'white' | 'glass' | 'green' | 'outline';
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
  const baseStyles = 'rounded-xl overflow-hidden transition-all duration-500';
  
  const variants = {
    white: 'bg-white border border-brand-green/10 shadow-soft',
    glass: 'bg-white/5 backdrop-blur-md border border-white/10 text-white',
    green: 'bg-brand-green text-white shadow-strong',
    outline: 'bg-transparent border border-brand-gold/30',
  };

  const hoverStyles = hover 
    ? 'hover:-translate-y-2 hover:shadow-heavy' 
    : '';

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-8',
    lg: 'p-12',
  };

  return (
    <div 
      className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${paddings[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
