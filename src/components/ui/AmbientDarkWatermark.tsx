import React from 'react';

const AmbientDarkWatermark: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none select-none z-0 hidden dark:flex flex-col items-center justify-center overflow-hidden"
      style={{ contain: 'strict' }}
    >
      {/* 100% GPU hardware-accelerated radial ambient flame glow (Zero blur filter cost) */}
      <div 
        className="absolute inset-0 pointer-events-none vietana-dark-glow-ambient"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(56, 189, 248, 0.08) 0%, rgba(239, 68, 68, 0.05) 50%, transparent 78%)'
        }}
      />

      {/* Main Luxury Brand Watermark */}
      <div className="flex flex-col items-center justify-center text-center px-4 max-w-full transform -translate-y-8 md:-translate-y-12">
        <span className="vietana-dark-watermark-title font-serif font-black tracking-[0.22em] text-[15vw] sm:text-[13vw] md:text-[11vw] lg:text-[9.5rem] leading-none uppercase select-none">
          VIETANA
        </span>
        <span className="vietana-dark-watermark-subtitle font-mono font-semibold tracking-[0.32em] sm:tracking-[0.52em] md:tracking-[0.68em] text-[2.8vw] sm:text-[1.8vw] md:text-sm lg:text-base uppercase mt-3 sm:mt-6 select-none">
          FEEL VIETNAM YOUR WAY
        </span>
      </div>
    </div>
  );
};

export default AmbientDarkWatermark;
