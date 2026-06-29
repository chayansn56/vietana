import React from 'react';
import { Heading, Text } from './Typography';

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
  variant?: 'light' | 'dark';
  showAccent?: boolean;
  titleSize?: 'h2' | 'h3' | 'h4';
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  label,
  title,
  description,
  centered = false,
  className = '',
  variant = 'light',
  showAccent = true,
  titleSize = 'h2',
}) => {
  const isDark = variant === 'dark';

  const labelClasses = 'text-xs font-bold tracking-wide-em uppercase mb-3 block';
  const titleClasses = isDark ? 'text-white' : 'text-brand-green-dark';
  const descClasses = isDark ? 'text-white/70' : 'text-text-subtle';

  return (
    <div className={`mb-12 md:mb-16 ${centered ? 'text-center max-w-3xl mx-auto' : ''} ${className}`}>
      <span className={`${labelClasses} ${isDark ? 'text-brand-gold-light' : 'text-brand-sage'}`}>
        {label}
      </span>
      <Heading as={titleSize} size={titleSize === 'h2' ? '4xl' : titleSize === 'h3' ? 'h3' : 'h4'} font="serif" className={`tracking-tight ${titleClasses}`}>
        {title}
      </Heading>
      {showAccent && <div className={`w-12 h-px bg-brand-gold mt-4 mb-5 ${centered ? 'mx-auto' : ''}`} />}
      {description && (
        <Text variant="none" className={`${descClasses} font-light max-w-2xl ${centered ? 'mx-auto' : ''} text-sm md:text-base`}>
          {description}
        </Text>
      )}
    </div>
  );
};

export default SectionHeader;
