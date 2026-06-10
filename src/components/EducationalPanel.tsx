export function EducationalPanel() {
  return (
    <section className='rounded-[28px] border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-slate-950/20'>
      <div className='mb-6'>
        <p className='text-xs uppercase tracking-[0.3em] text-slate-500'>
          Learning
        </p>
        <h3 className='mt-2 text-xl font-semibold text-slate-100'>
          H-R Diagram Overview
        </h3>
      </div>
      <div className='space-y-4 text-slate-300'>
        <div className='rounded-2xl border border-slate-700 bg-slate-950/75 p-4'>
          <p className='text-sm font-medium text-slate-100'>
            Diagram structure
          </p>
          <p className='mt-2 text-sm text-slate-400'>
            Explanatory content for diagram axes and regions.
          </p>
        </div>
        <div className='rounded-2xl border border-slate-700 bg-slate-950/75 p-4'>
          <p className='text-sm font-medium text-slate-100'>
            Stellar evolution
          </p>
          <p className='mt-2 text-sm text-slate-400'>
            Educational notes on main sequence, giants, and dwarfs.
          </p>
        </div>
      </div>
    </section>
  );
}
