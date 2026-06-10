interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  resultCount?: number;
}

export function SearchBar({
  query,
  onQueryChange,
  resultCount,
}: SearchBarProps) {
  return (
    <div className='rounded-2xl border border-slate-700 bg-slate-950/75 p-3'>
      <label className='block text-xs font-medium uppercase tracking-[0.2em] text-slate-500 mb-2'>
        Search stars
      </label>
      <input
        type='text'
        placeholder='Find a star...'
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        className='w-full rounded-lg border border-slate-600 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-cyan-400/50 focus:outline-none focus:ring-1 focus:ring-cyan-400/25 transition'
      />
      {query && resultCount !== undefined && (
        <p className='mt-2 text-xs text-slate-400'>
          {resultCount > 0
            ? `${resultCount} star${resultCount !== 1 ? 's' : ''} found`
            : 'No matches'}
        </p>
      )}
    </div>
  );
}
