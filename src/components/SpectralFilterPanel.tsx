interface SpectralFilterPanelProps {
  activeClasses: Set<string>;
  onToggleClass: (spectralClass: string) => void;
  onResetFilters: () => void;
}

const SPECTRAL_CLASSES = [
  { label: 'O', color: '#83d4ff', description: 'Hot blue' },
  { label: 'B', color: '#7fb7ff', description: 'Blue' },
  { label: 'A', color: '#7be1d8', description: 'Blue-white' },
  { label: 'F', color: '#b9f7b9', description: 'Yellow-white' },
  { label: 'G', color: '#ffe26b', description: 'Yellow' },
  { label: 'K', color: '#ffb75d', description: 'Orange' },
  { label: 'M', color: '#ff7a6e', description: 'Red' },
];

export function SpectralFilterPanel({
  activeClasses,
  onToggleClass,
  onResetFilters,
}: SpectralFilterPanelProps) {
  return (
    <div className='rounded-2xl border border-slate-700 bg-slate-950/75 p-4'>
      <div className='flex items-center justify-between mb-3'>
        <label className='text-xs font-medium uppercase tracking-[0.2em] text-slate-500'>
          Spectral class filter
        </label>
        <button
          onClick={onResetFilters}
          className='text-xs text-slate-400 hover:text-cyan-200 transition'
        >
          Reset
        </button>
      </div>
      <div className='space-y-2'>
        {SPECTRAL_CLASSES.map(({ label, color, description }) => (
          <button
            key={label}
            onClick={() => onToggleClass(label)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg border transition ${
              activeClasses.has(label)
                ? 'border-cyan-400/50 bg-cyan-500/15 text-slate-100'
                : 'border-slate-600 bg-slate-900/30 text-slate-400 hover:border-slate-500 hover:bg-slate-900/50'
            }`}
          >
            <div
              className='w-4 h-4 rounded-full flex-shrink-0'
              style={{ backgroundColor: color, opacity: 0.8 }}
            />
            <div className='text-left flex-1'>
              <span className='font-semibold text-sm'>{label}</span>
              <span className='text-xs text-slate-500 ml-1'>
                ({description})
              </span>
            </div>
            {activeClasses.has(label) && (
              <span className='text-xs font-semibold text-cyan-200'>✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
