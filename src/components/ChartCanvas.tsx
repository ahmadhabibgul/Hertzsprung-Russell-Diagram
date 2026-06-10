export function ChartCanvas() {
  return (
    <section className='rounded-[28px] border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-slate-950/30'>
      <div className='flex items-center justify-between gap-4 pb-5'>
        <div>
          <p className='text-xs uppercase tracking-[0.3em] text-slate-500'>
            Visualization
          </p>
          <h2 className='mt-2 text-2xl font-semibold text-slate-100'>
            H-R Diagram Canvas
          </h2>
        </div>
        <div className='rounded-2xl bg-slate-950/80 px-3 py-2 text-sm text-slate-300'>
          Placeholder mode
        </div>
      </div>

      <div className='flex h-[520px] items-center justify-center rounded-3xl border-2 border-dashed border-slate-700 bg-slate-950/70 text-slate-500'>
        <span className='text-base text-slate-400'>
          Chart placeholder — D3 visualization will render here.
        </span>
      </div>
    </section>
  );
}
