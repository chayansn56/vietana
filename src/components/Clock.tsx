import React from 'react';
import { Heading, Text } from './ui/Typography';

interface ClockProps {
  flag: string;
  city: string;
  time: string;
  date: string;
  className?: string;
}

const Clock: React.FC<ClockProps> = ({ flag, city, time, date, className = '' }) => {
  const hour = parseInt(time.split(':')[0], 10);
  const isDay = !isNaN(hour) && hour >= 6 && hour < 18;

  return (
    <div className={`bg-black/60  border border-brand-gold/14 rounded-lg p-3 px-4 text-left min-w-[110px] transition-colors duration-350 hover:bg-brand-green/70 ${className}`}>
      <div className="flex justify-between items-center mb-1">
        <Text size="sm" variant="white" className="block m-0">
          {flag}
        </Text>
        <span className="text-xs" title={isDay ? 'Daytime' : 'Nighttime'}>
          {isDay ? '☀️' : '🌙'}
        </span>
      </div>
      <Text variant="white" size="xs" className="opacity-50 uppercase tracking-[0.12em] block">
        {city}
      </Text>
      <Heading size="md" variant="accent" className="block leading-none my-0.5">
        {time}
      </Heading>
      <Text variant="white" size="xs" className="opacity-40 block">
        {date}
      </Text>
    </div>
  );
};


export default Clock;
