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
        <Heading
          as="h4"
          size="xs"
          font="sans"
          className={`inline-block mb-5 tracking-[0.28em] uppercase ${isDark ? 'text-brand-gold-light' : 'text-brand-gold'}`}
        >
          {label}
        </Heading>
      )}
      <Heading 
        as="h2" 
        size="2xl"
        className={`mb-4 ${isDark ? 'text-white' : 'text-text-dark'}`}
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
