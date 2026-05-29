import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: React.ElementType;
  variant?: 'cream' | 'warm' | 'green' | 'dark' | 'none';
  spacing?: 'sm' | 'md' | 'lg' | 'none';
}

const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  id,
  as: Component = 'section',
  variant = 'none',
  spacing = 'md',
}) => {
  const variants = {
    cream: 'bg-surface-cream text-text-dark',
    warm: 'bg-surface-warm text-text-dark',
    green: 'bg-brand-green text-white',
    dark: 'bg-brand-green-extra-dark text-white/80',
    none: '',
  };

  const spacings = {
    sm: 'py-16 md:py-20',
    md: 'py-24 md:py-32',
    lg: 'py-32 md:py-48',
    none: '',
  };

  return (
    <Component 
      id={id} 
      className={`relative overflow-hidden ${variants[variant]} ${spacings[spacing]} ${className}`}
    >
      {children}
    </Component>
  );
};

export default Section;
