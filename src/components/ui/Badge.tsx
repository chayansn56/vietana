import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  icon?: boolean;
  className?: string;
  variant?: 'gold' | 'green' | 'outline';
}

const Badge: React.FC<BadgeProps> = ({ 
  children, 
  icon = false, 
  className = '',
  variant = 'gold'
}) => {
  const variants = {
    gold: 'bg-brand-gold/10 border-brand-gold/25 text-brand-gold-light',
    green: 'bg-brand-green/10 border-brand-green/25 text-brand-green-light',
    outline: 'bg-transparent border-white/20 text-white/80',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 border text-[0.65rem] font-bold tracking-[0.18em] uppercase px-4 py-1.5 rounded-full backdrop-blur-md ${variants[variant]} ${className}`}>
      {icon && <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-pulse flex-shrink-0" />}
      {children}
    </div>
  );
};

export default Badge;
