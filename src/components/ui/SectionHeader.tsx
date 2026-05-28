import React from 'react';

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  label,
  title,
  description,
  centered = true,
  className = ''
}) => {
  return (
    <div className={`mb-20 ${centered ? 'text-center' : ''} ${className}`}>
      {label && (
        <span className="inline-block text-[0.68rem] font-semibold tracking-[0.28em] uppercase text-[var(--gold)] mb-5">
          {label}
        </span>
      )}
      <h2 className={`text-clamp-2.2-4vw-4rem leading-tight mb-4 text-[var(--td)]`}>
        {title}
      </h2>
      {description && (
        <p className={`max-w-[500px] text-[1.05rem] leading-[1.82] text-[var(--tm)] ${centered ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
