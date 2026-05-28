import React from 'react';
import { Heading, Text } from './Typography';

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
  variant?: 'dark' | 'light';
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  label,
  title,
  description,
  centered = true,
  className = '',
  variant = 'light',
}) => {
  const isDark = variant === 'dark';

  return (
    <div className={`mb-20 reveal ${centered ? 'text-center' : ''} ${className}`}>
      {label && (
        <span className={`inline-block text-[0.68rem] font-semibold tracking-[0.28em] uppercase mb-5 ${isDark ? 'text-brand-gold-light' : 'text-brand-gold'}`}>
          {label}
        </span>
      )}
      <Heading 
        as="h2" 
        className={`leading-tight mb-4 ${isDark ? 'text-white' : 'text-text-dark'}`}
      >
        {title}
      </Heading>
      {description && (
        <Text 
          variant={isDark ? 'white' : 'muted'} 
          className={`max-w-[500px] ${centered ? 'mx-auto' : ''}`}
        >
          {description}
        </Text>
      )}
    </div>
  );
};

export default SectionHeader;
