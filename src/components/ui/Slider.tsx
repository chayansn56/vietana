import React from 'react';

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Slider: React.FC<SliderProps> = ({ className = '', ...props }) => {
  return (
    <input
      type="range"
      className={`w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full appearance-none outline-none focus-visible:ring-2 focus-visible:ring-brand-gold [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-brand-gold [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(201,168,76,0.6)] transition-all cursor-pointer ${className}`}
      {...props}
    />
  );
};

export default Slider;
