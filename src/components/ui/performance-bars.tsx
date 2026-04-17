import React from 'react';

interface PerformanceBarsProps {
  longevity: number;  // 1-5
  projection: number; // 1-5
  theme?: 'light' | 'dark';
}

export const PerformanceBars = ({ 
  longevity = 3, 
  projection = 3, 
  theme = 'light' 
}: PerformanceBarsProps) => {
  const labelStyle: React.CSSProperties = {
    fontFamily: 'DM Sans, sans-serif',
    fontSize: '0.6rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: theme === 'dark' ? '#EAE6DF' : '#2C1810',
    opacity: 0.5,
    width: '72px',
    flexShrink: 0
  };

  const barTrackStyle = { display: 'flex', gap: '3px' };

  const getBarColor = (i: number, value: number) => {
    if (i <= value) return '#8B7355'; // --color-gold
    return theme === 'dark' ? 'rgba(234,230,223,0.15)' : 'rgba(44,24,16,0.12)';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      
      {/* LONGEVIDAD */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={labelStyle}>Duración</span>
        <div style={barTrackStyle}>
          {[1, 2, 3, 4, 5].map(i => (
            <div 
              key={i} 
              style={{
                width: '16px',
                height: '2px',
                background: getBarColor(i, longevity),
                transition: 'background 300ms ease'
              }} 
            />
          ))}
        </div>
      </div>

      {/* PROYECCIÓN */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={labelStyle}>Proyección</span>
        <div style={barTrackStyle}>
          {[1, 2, 3, 4, 5].map(i => (
            <div 
              key={i} 
              style={{
                width: '16px',
                height: '2px',
                background: getBarColor(i, projection),
                transition: 'background 300ms ease'
              }} 
            />
          ))}
        </div>
      </div>

    </div>
  );
};
