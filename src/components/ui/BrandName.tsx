import React from 'react';

interface BrandNameProps {
  className?: string;
  withLogo?: boolean;
}

const BrandName: React.FC<BrandNameProps> = ({ className = '', withLogo = true }) => {
  return (
    <span className={`inline-flex items-center font-bold tracking-wide ${className}`}>
      {withLogo && (
        <img 
          src="/vietana_logo.png" 
          className="h-[1.2em] inline-block align-middle mx-[0.2em] brightness-110" 
          alt="VIETANA" 
        />
      )}
      VIETANA
    </span>
  );
};

export const FormatBrand: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  if (!text.includes('VIETANA')) return <span className={className}>{text}</span>;
  return (
    <span className={className}>
      {text.split(/(VIETANA(?:™)?)/g).map((part, i) => {
        if (part === 'VIETANA' || part === 'VIETANA™') {
          return <BrandName key={i} />;
        }
        return part;
      })}
    </span>
  );
};

export default BrandName;
