import React from 'react';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'white' | 'none';
}

export const Heading: React.FC<HeadingProps> = ({
  children,
  as: Component = 'h2',
  className = '',
  variant = 'primary',
  ...props
}) => {
  const variants: Record<string, string> = {
    primary: 'text-text-dark',
    secondary: 'text-text-muted',
    accent: 'text-brand-gold',
    white: 'text-white',
    none: '',
  };

  const variantClass = variants[variant] || '';

  const finalProps = props.dangerouslySetInnerHTML ? { ...props } : { ...props, children };

  return (
    <Component className={`${variantClass} ${className}`} {...finalProps} />
  );
};

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
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
  ...props
}) => {
  const sizes: Record<string, string> = {
    xs: 'text-[0.75rem] leading-relaxed',
    sm: 'text-[0.875rem] leading-relaxed',
    md: 'text-[1rem] leading-relaxed',
    lg: 'text-[1.125rem] leading-relaxed',
  };

  const variants: Record<string, string> = {
    primary: 'text-text-dark',
    muted: 'text-text-muted',
    subtle: 'text-text-subtle',
    white: 'text-white',
    none: '',
  };

  const variantClass = variants[variant] || '';

  const finalProps = props.dangerouslySetInnerHTML ? { ...props } : { ...props, children };

  return (
    <Component className={`${sizes[size]} ${variantClass} ${className}`} {...finalProps} />
  );
};
