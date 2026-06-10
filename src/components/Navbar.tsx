export function Navbar() {
  return (
    <header className='sticky top-0 z-20 border-b border-white/10 bg-slate-950/95 backdrop-blur-xl'>
      <div className='mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4'>
        <div>
          <p className='text-xs uppercase tracking-[0.28em] text-slate-400'>
            Stellar Visualization
          </p>
          <h1 className='mt-1 text-2xl font-semibold text-slate-100'>
            Hertzsprung–Russell Explorer
          </h1>
        </div>

        <div className='flex flex-1 items-center justify-end gap-3 sm:justify-between sm:gap-4'>
          <div className='hidden sm:flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-slate-300 shadow-sm'>
            <span className='text-xs uppercase tracking-[0.2em] text-slate-500'>
              Search
            </span>
            <span className='text-sm text-slate-100'>Find star</span>
          </div>
          <button className='rounded-2xl border border-cyan-400/25 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-200 transition hover:bg-cyan-500/15'>
            Reset view
          </button>
        </div>
      </div>
    </header>
  );
}
