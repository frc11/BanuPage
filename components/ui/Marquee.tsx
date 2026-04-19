import React from 'react';
import { cn } from '@/lib/utils';

export interface MarqueeProps {
  children: React.ReactNode;
  speed?: 'slow' | 'normal' | 'fast' | number;
  direction?: 'left' | 'right';
  className?: string;
  align?: 'start' | 'center' | 'end';
}

export function Marquee({
  children,
  speed = 'slow',
  direction = 'left',
  className,
  align = 'center'
}: MarqueeProps) {
  const speedMap: Record<string, string> = {
    slow: '60s',
    normal: '35s',
    fast: '20s',
  };

  const durationValue = typeof speed === 'number' ? `${speed}s` : speedMap[speed] || '60s';
  const directionClass = direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse';
  const alignClass = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end'
  }[align];

  const gapValue = 'var(--marquee-gap, var(--spacing-card))';
  const paddingValue = 'var(--marquee-padding, var(--spacing-sm))';

  const trackStyle = {
    animationDuration: durationValue,
    gap: gapValue,
    paddingLeft: paddingValue,
    paddingRight: `calc(${paddingValue} + ${gapValue})`,
  } as React.CSSProperties;

  return (
    <div
      className={cn(
        "group overflow-hidden flex flex-row w-full select-none",
        "[mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]",
        className
      )}
    >
      <div
        className={cn(
          "w-max flex flex-row shrink-0 justify-start",
          alignClass,
          directionClass,
          "group-hover:[animation-play-state:paused]"
        )}
        style={trackStyle}
      >
        {children}
      </div>
      <div
        className={cn(
          "w-max flex flex-row shrink-0 justify-start",
          alignClass,
          directionClass,
          "group-hover:[animation-play-state:paused]"
        )}
        style={trackStyle}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}
