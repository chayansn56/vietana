import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, icon, className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-3 bg-[var(--gold)]/10 border border-[var(--gold)]/25 text-[var(--gold3)] text-[0.7rem] font-medium tracking-[0.22em] uppercase px-5 py-2 rounded-full backdrop-blur-md ${className}`}>
      {icon && <span className="w-1.5 h-1.5 bg-[var(--gold)] rounded-full animate-pulse" />}
      {children}
    </div>
  );
};

export default Badge;
