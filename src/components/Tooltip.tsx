import React, { useMemo } from 'react';
import type { Star } from '../data/stars';

interface TooltipProps {
  visible: boolean;
  x: number;
  y: number;
  star: Star | null;
  viewportWidth: number;
  viewportHeight: number;
}

export const Tooltip = React.memo(function Tooltip({
  visible,
  x,
  y,
  star,
  viewportWidth,
  viewportHeight,
}: TooltipProps) {
  const tooltipWidth = 280;
  const tooltipHeight = 200;
  const padding = 12;

  const position = useMemo(() => {
    if (!visible) return { left: 0, top: 0 };

    let left = x + padding;
    let top = y + padding;

    // Adjust if tooltip goes off right edge
    if (left + tooltipWidth > viewportWidth) {
      left = Math.max(0, x - tooltipWidth - padding);
    }

    // Adjust if tooltip goes off bottom edge
    if (top + tooltipHeight > viewportHeight) {
      top = Math.max(0, y - tooltipHeight - padding);
    }

    return { left, top };
  }, [visible, x, y, viewportWidth, viewportHeight]);

  if (!visible || !star) return null;

  const isModelStar = star.name.startsWith('Model Star');

  return (
    <div
      className={`pointer-events-none fixed rounded-lg border px-3 py-2 text-sm shadow-xl transition-opacity duration-150 ${
        isModelStar
          ? 'border-cyan-400/60 bg-cyan-950/95'
          : 'border-cyan-400/40 bg-slate-950/95'
      }`}
      style={{
        left: `${position.left}px`,
        top: `${position.top}px`,
        maxWidth: `${tooltipWidth}px`,
        backdropFilter: 'blur(4px)',
        opacity: visible ? 1 : 0,
      }}
    >
      <p
        className={`font-semibold ${isModelStar ? 'text-cyan-100' : 'text-cyan-200'}`}
      >
        {star.name}
      </p>
      <div className='mt-2 space-y-1 text-slate-300'>
        <div className='flex justify-between gap-4'>
          <span className='text-slate-400'>Spectral:</span>
          <span className='text-slate-100'>{star.spectralClass}</span>
        </div>
        <div className='flex justify-between gap-4'>
          <span className='text-slate-400'>Temp:</span>
          <span className='text-slate-100'>
            {star.temperature.toLocaleString()} K
          </span>
        </div>
        <div className='flex justify-between gap-4'>
          <span className='text-slate-400'>Luminosity:</span>
          <span className='text-slate-100'>
            {star.luminosity < 0.01
              ? star.luminosity.toExponential(2)
              : star.luminosity.toFixed(2)}{' '}
            L☉
          </span>
        </div>
        <div className='flex justify-between gap-4'>
          <span className='text-slate-400'>Radius:</span>
          <span className='text-slate-100'>
            {star.radius < 0.01
              ? star.radius.toExponential(2)
              : star.radius.toFixed(2)}{' '}
            R☉
          </span>
        </div>
        {!isModelStar && (
          <div className='flex justify-between gap-4'>
            <span className='text-slate-400'>Category:</span>
            <span className='text-slate-100'>{star.category}</span>
          </div>
        )}
      </div>
    </div>
  );
});

Tooltip.displayName = 'Tooltip';
