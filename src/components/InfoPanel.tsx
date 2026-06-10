import type { ModelStar } from '../utils/physics';

interface InfoPanelProps {
  modelStar?: ModelStar;
}

export function InfoPanel({ modelStar }: InfoPanelProps) {
  return (
    <section className='rounded-[28px] border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-slate-950/20'>
      <div className='mb-5'>
        <p className='text-xs uppercase tracking-[0.3em] text-slate-500'>
          Model Star
        </p>
        <h3 className='mt-2 text-xl font-semibold text-slate-100'>
          Computed Properties
        </h3>
      </div>
      <div className='space-y-3 text-slate-300'>
        {modelStar ? (
          <>
            <div className='rounded-2xl border border-cyan-700/40 bg-cyan-950/30 p-4'>
              <div className='space-y-2 text-sm'>
                <div className='flex items-center justify-between'>
                  <span className='text-slate-400'>Mass:</span>
                  <span className='font-semibold text-cyan-200'>
                    {modelStar.mass.toFixed(2)} M☉
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-slate-400'>Radius:</span>
                  <span className='font-semibold text-cyan-200'>
                    {modelStar.radius.toFixed(2)} R☉
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-slate-400'>Luminosity:</span>
                  <span className='font-semibold text-cyan-200'>
                    {modelStar.luminosity.toFixed(2)} L☉
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-slate-400'>Temperature:</span>
                  <span className='font-semibold text-cyan-200'>
                    {modelStar.temperature.toLocaleString()} K
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-slate-400'>Spectral class:</span>
                  <span className='font-semibold text-cyan-200'>
                    {modelStar.spectralClass}
                  </span>
                </div>
              </div>
            </div>
            <div className='rounded-2xl border border-slate-700 bg-slate-950/75 p-4'>
              <p className='text-xs text-slate-400'>
                <strong>Physics formulae:</strong> L = M<sup>3.5</sup>, R = M
                <sup>0.8</sup>, T derived from Stefan-Boltzmann
              </p>
            </div>
          </>
        ) : (
          <div className='rounded-2xl border border-slate-700 bg-slate-950/75 p-4'>
            <p className='text-sm text-slate-400'>
              Adjust the mass slider to generate a model star.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
