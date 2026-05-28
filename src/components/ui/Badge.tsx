import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  icon?: boolean;
  className?: string;
  variant?: 'gold' | 'gold-filled' | 'green' | 'green-filled' | 'outline';
}

const Badge: React.FC<BadgeProps> = ({ 
  children, 
  icon = false, 
  className = '',
  variant = 'gold'
}) => {
  const variants = {
    gold: 'bg-brand-gold/10 border-brand-gold/25 text-brand-gold-light',
    'gold-filled': 'bg-brand-gold text-brand-green-dark border-transparent shadow-medium',
    green: 'bg-brand-green/10 border-brand-green/25 text-brand-green-light',
    'green-filled': 'bg-brand-green text-white border-transparent shadow-soft',
    outline: 'bg-transparent border-white/20 text-white/80',
  };

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-1.5 border rounded-full backdrop-blur-md text-xxs md:text-xs font-bold tracking-[0.2em] uppercase ${variants[variant]} ${className}`}>
      {icon && <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-pulse flex-shrink-0" />}
      {children}
    </div>
  );
};

export default Badge;
