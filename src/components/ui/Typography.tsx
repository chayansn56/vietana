import React from 'react';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'none';
  font?: 'serif' | 'sans' | 'none';
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'white' | 'none';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'none';
}

const weights: Record<string, string> = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  none: '',
};

export const Heading: React.FC<HeadingProps> = ({
  children,
  as: Component = 'h2',
  size = 'none',
  font = 'none',
  className = '',
  variant = 'primary',
  weight = 'none',
  ...props
}) => {
  const sizes: Record<string, string> = {
    xs: 'text-xs font-semibold tracking-wider',
    sm: 'text-base md:text-lg font-medium',
    md: 'text-xl md:text-2xl font-normal',
    lg: 'text-2xl md:text-3xl font-normal',
    xl: 'text-3xl md:text-4xl font-normal',
    '2xl': 'text-[clamp(2.2rem,5vw,4rem)] font-light leading-tight',
    '3xl': 'text-[clamp(3.2rem,8vw,6.5rem)] font-light leading-none',
    none: '',
  };

  const fonts: Record<string, string> = {
    serif: 'font-serif',
    sans: 'font-sans',
    none: '',
  };

  const variants: Record<string, string> = {
    primary: 'text-text-dark',
    secondary: 'text-text-muted',
    accent: 'text-brand-gold',
    white: 'text-white',
    none: '',
  };

  const variantClass = variants[variant] || '';
  const fontClass = fonts[font] || '';
  
  const rawSizeClass = sizes[size] || '';
  const finalSizeClass = weight !== 'none'
    ? rawSizeClass.replace(/\bfont-(light|normal|medium|semibold|bold)\b/g, '').trim()
    : rawSizeClass;
  
  const weightClass = weight !== 'none' ? weights[weight] : '';

  const finalProps = props.dangerouslySetInnerHTML ? { ...props } : { ...props, children };

  return (
    <Component className={`${finalSizeClass} ${weightClass} ${fontClass} ${variantClass} ${className}`.trim().replace(/\s+/g, ' ')} {...finalProps} />
  );
};

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
  as?: 'p' | 'span' | 'div';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  variant?: 'primary' | 'muted' | 'subtle' | 'white' | 'none';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'none';
}

export const Text: React.FC<TextProps> = ({
  children,
  as: Component = 'p',
  size = 'md',
  className = '',
  variant = 'primary',
  weight = 'none',
  ...props
}) => {
  const sizes: Record<string, string> = {
    xs: 'text-[0.75rem] leading-relaxed',
    sm: 'text-[0.875rem] leading-relaxed',
    md: 'text-[1rem] leading-relaxed',
    lg: 'text-[1.125rem] leading-relaxed',
    xl: 'text-[1.25rem] md:text-[1.5rem] leading-relaxed',
  };

  const variants: Record<string, string> = {
    primary: 'text-text-dark',
    muted: 'text-text-muted',
    subtle: 'text-text-subtle',
    white: 'text-white',
    none: '',
  };

  const variantClass = variants[variant] || '';
  const sizeClass = sizes[size] || '';
  const weightClass = weight !== 'none' ? weights[weight] : '';

  const finalProps = props.dangerouslySetInnerHTML ? { ...props } : { ...props, children };

  return (
    <Component className={`${sizeClass} ${weightClass} ${variantClass} ${className}`.trim().replace(/\s+/g, ' ')} {...finalProps} />
  );
};

