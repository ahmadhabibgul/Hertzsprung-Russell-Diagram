import { memo } from 'react';

interface ControlPanelProps {
  mass: number;
  onMassChange: (mass: number) => void;
  radius: number | undefined;
  onRadiusChange: (radius: number | undefined) => void;
  onReset: () => void;
}

function ControlPanelComponent({
  mass,
  onMassChange,
  radius,
  onRadiusChange,
  onReset,
}: ControlPanelProps) {
  return (
    <section className='rounded-[28px] border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-slate-950/20'>
      <div className='mb-5'>
        <p className='text-xs uppercase tracking-[0.3em] text-slate-500'>
          Controls
        </p>
        <h3 className='mt-2 text-xl font-semibold text-slate-100'>
          Physics Model
        </h3>
      </div>
      <div className='flex items-center gap-2'>
        <button
          onClick={onReset}
          className='flex-1 rounded-lg border border-orange-500/40 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-200 hover:bg-orange-500/15 transition'
        >
          ↻ Reset Controls
        </button>
      </div>
      <div className='space-y-5 text-slate-300'>
        <div className='rounded-2xl border border-slate-700 bg-slate-950/75 p-4'>
          <label className='block text-sm font-medium text-slate-100'>
            Model Star Mass (M☉)
          </label>
          <div className='mt-3 flex items-center gap-3'>
            <input
              type='range'
              min='0.1'
              max='20'
              step='0.1'
              value={mass}
              onChange={(e) => onMassChange(parseFloat(e.target.value))}
              className='flex-1 cursor-pointer'
            />
            <span className='w-12 rounded-lg bg-slate-950 px-2 py-1 text-center text-sm font-semibold text-cyan-200'>
              {mass.toFixed(2)}
            </span>
          </div>
          <p className='mt-2 text-xs text-slate-400'>
            Adjust the model star mass to update its position
          </p>
        </div>

        <div className='rounded-2xl border border-slate-700 bg-slate-950/75 p-4'>
          <label className='block text-sm font-medium text-slate-100'>
            Model Star Radius (R☉)
          </label>
          <div className='mt-3'>
            <button
              onClick={() => onRadiusChange(undefined)}
              className={`w-full rounded-lg border px-3 py-2 text-sm font-medium transition ${
                radius === undefined
                  ? 'border-cyan-400/50 bg-cyan-500/20 text-cyan-200'
                  : 'border-slate-600 bg-slate-950 text-slate-300 hover:border-slate-500'
              }`}
            >
              {radius === undefined ? '✓ Auto-computed' : 'Use custom radius'}
            </button>
          </div>
          {radius !== undefined && (
            <div className='mt-3 flex items-center gap-3'>
              <input
                type='range'
                min='0.1'
                max='100'
                step='0.1'
                value={radius}
                onChange={(e) => onRadiusChange(parseFloat(e.target.value))}
                className='flex-1 cursor-pointer'
              />
              <span className='w-12 rounded-lg bg-slate-950 px-2 py-1 text-center text-sm font-semibold text-cyan-200'>
                {radius.toFixed(2)}
              </span>
            </div>
          )}
          <p className='mt-2 text-xs text-slate-400'>
            {radius === undefined
              ? 'Radius computed from mass (M^0.8)'
              : 'Custom radius override enabled'}
          </p>
        </div>
      </div>
    </section>
  );
}

export const ControlPanel = memo(ControlPanelComponent);
ControlPanel.displayName = 'ControlPanel';
