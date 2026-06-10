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
      </div>
    </header>
  );
}
