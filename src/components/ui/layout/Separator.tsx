import React from 'react';

interface SeparatorProps {
  variant?: 'green' | 'gold' | 'transparent';
  className?: string;
}

const Separator: React.FC<SeparatorProps> = ({ 
  variant = 'green', 
  className = '' 
}) => {
  const variants = {
    green: 'bg-gradient-to-r from-transparent via-brand-green/10 to-transparent',
    gold: 'bg-gradient-to-r from-transparent via-brand-gold/15 to-transparent',
    transparent: 'bg-transparent',
  };

  return (
    <div className={`h-px mx-[var(--spacing-layout)] ${variants[variant]} ${className}`} />
  );
};

export default Separator;
