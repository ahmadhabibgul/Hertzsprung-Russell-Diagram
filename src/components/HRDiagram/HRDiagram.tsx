import React, { useRef, useState, useCallback, memo } from 'react';
import type { Star } from '../../data/stars';
import type { ModelStar } from '../../utils/physics';
import { Tooltip } from '../Tooltip';
import { useHRDiagramChart } from '../../hooks/useHRDiagramChart';

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  star: Star | null;
}

interface HRDiagramProps {
  stars: Star[];
  modelStar?: ModelStar;
  searchQuery?: string;
  activeSpectralClasses?: Set<string>;
  isLoading?: boolean;
}

function HRDiagramComponent({
  stars,
  modelStar,
  searchQuery = '',
  activeSpectralClasses,
  isLoading = false,
}: HRDiagramProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    star: null,
  });
  const [viewportSize, setViewportSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Spectral class is a hard filter (non-matching stars are removed). The
  // search query is applied inside the chart as a highlight/dim treatment so
  // matching stars stay visible in context rather than disappearing.
  const visibleStars = stars.filter((star) => {
    return (
      !activeSpectralClasses ||
      activeSpectralClasses.size === 0 ||
      activeSpectralClasses.has(star.spectralClass.charAt(0))
    );
  });

  const handleTooltip = useCallback((tooltipState: TooltipState) => {
    setTooltip(tooltipState);
  }, []);

  useHRDiagramChart(svgRef, visibleStars, modelStar, handleTooltip, searchQuery);

  const handleResize = useCallback(() => {
    setViewportSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const hasNoResults = !isLoading && visibleStars.length === 0;

  return (
    <div className='relative rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-slate-950/30'>
      <div className='mb-6'>
        <p className='text-xs uppercase tracking-[0.3em] text-slate-500'>
          Visualization
        </p>
        <h2 className='mt-2 text-2xl font-semibold text-slate-100'>
          Hertzsprung–Russell Diagram
        </h2>
      </div>

      {isLoading && (
        <div className='flex h-[600px] items-center justify-center rounded-2xl bg-slate-950/40'>
          <div className='space-y-3 text-center'>
            <div className='mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-600 border-t-cyan-400' />
            <p className='text-sm text-slate-400'>Loading diagram...</p>
          </div>
        </div>
      )}

      {hasNoResults && (
        <div className='flex h-[600px] items-center justify-center rounded-2xl bg-slate-950/40'>
          <div className='space-y-3 text-center'>
            <p className='text-lg font-semibold text-slate-300'>
              No stars match your filters
            </p>
            <p className='text-sm text-slate-400'>
              Try adjusting your search or spectral class selection
            </p>
          </div>
        </div>
      )}

      {!isLoading && !hasNoResults && (
        <div className='flex justify-center overflow-x-auto rounded-2xl bg-slate-950/40 p-4'>
          <svg
            ref={svgRef}
            width={800}
            height={600}
            style={{ display: 'block', background: '#0f172a' }}
          />
        </div>
      )}

      <Tooltip
        visible={tooltip.visible}
        x={tooltip.x}
        y={tooltip.y}
        star={tooltip.star}
        viewportWidth={viewportSize.width}
        viewportHeight={viewportSize.height}
      />
    </div>
  );
}

export const HRDiagram = memo(HRDiagramComponent);
HRDiagram.displayName = 'HRDiagram';
