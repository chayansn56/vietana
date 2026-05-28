import React from 'react';
import { Text } from './ui/Typography';

interface ClockProps {
  flag: string;
  city: string;
  time: string;
  date: string;
  className?: string;
}

const Clock: React.FC<ClockProps> = ({ flag, city, time, date, className = '' }) => {
  return (
    <div className={`bg-black/60 backdrop-blur-xl border border-brand-gold/14 rounded-lg p-3 px-4.5 text-left min-w-[110px] transition-colors duration-350 hover:bg-brand-green/70 ${className}`}>
      <span className="text-[0.85rem] mb-1 block">{flag}</span>
      <Text variant="white" size="xs" className="opacity-50 uppercase tracking-[0.12em] block">
        {city}
      </Text>
      <span className="font-serif text-[1.4rem] font-light text-brand-gold block leading-none my-0.5">
        {time}
      </span>
      <Text variant="white" size="xs" className="opacity-40 block">
        {date}
      </Text>
    </div>
  );
};

export default Clock;
