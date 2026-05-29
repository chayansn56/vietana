import React from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div 
      className="fixed top-0 left-0 z-[9999] h-0.5 bg-gradient-to-r from-brand-green-light via-brand-gold to-brand-gold-light shadow-[0_0_12px_rgba(201,168,76,0.55)] transition-[width] duration-75 ease-linear"
      style={{ width: `${progress}%` }}
    />
  );
};

export default ProgressBar;
