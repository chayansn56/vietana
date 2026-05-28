import React from 'react';

interface HeadingProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'none';
}

export const Heading: React.FC<HeadingProps> = ({
  children,
  as: Component = 'h2',
  className = '',
  variant = 'primary',
}) => {
  const variants = {
    primary: 'text-text-dark',
    secondary: 'text-text-muted',
    accent: 'text-brand-gold',
    none: '',
  };

  return (
    <Component className={`${variants[variant]} ${className}`}>
      {children}
    </Component>
  );
};

interface TextProps {
  children: React.ReactNode;
  as?: 'p' | 'span' | 'div';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  variant?: 'primary' | 'muted' | 'subtle' | 'white' | 'none';
}

export const Text: React.FC<TextProps> = ({
  children,
  as: Component = 'p',
  size = 'md',
  className = '',
  variant = 'primary',
}) => {
  const sizes = {
    xs: 'text-[0.75rem] leading-relaxed',
    sm: 'text-[0.875rem] leading-relaxed',
    md: 'text-[1rem] leading-relaxed',
    lg: 'text-[1.125rem] leading-relaxed',
  };

  const variants = {
    primary: 'text-text-dark',
    muted: 'text-text-muted',
    subtle: 'text-text-subtle',
    white: 'text-white/80',
    none: '',
  };

  return (
    <Component className={`${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </Component>
  );
};
