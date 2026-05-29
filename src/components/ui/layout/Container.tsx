import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const Container: React.FC<ContainerProps> = ({ 
  children, 
  className = '', 
  as: Component = 'div',
  size = 'xl'
}) => {
  const maxWidths = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-none',
  };

  return (
    <Component 
      className={`mx-auto px-[var(--spacing-layout)] ${maxWidths[size]} ${className}`}
    >
      {children}
    </Component>
  );
};

export default Container;
