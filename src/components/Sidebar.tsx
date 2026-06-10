import { SearchBar } from './SearchBar';
import { SpectralFilterPanel } from './SpectralFilterPanel';

interface SidebarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchResultCount: number;
  activeSpectralClasses: Set<string>;
  onToggleSpectralClass: (cls: string) => void;
  onResetFilters: () => void;
}

export function Sidebar({
  searchQuery,
  onSearchChange,
  searchResultCount,
  activeSpectralClasses,
  onToggleSpectralClass,
  onResetFilters,
}: SidebarProps) {
  return (
    <aside className='w-full lg:w-80 flex-shrink-0 space-y-4 lg:max-h-[calc(100vh-140px)] lg:overflow-y-auto'>
      <SearchBar
        query={searchQuery}
        onQueryChange={onSearchChange}
        resultCount={searchResultCount}
      />

      <SpectralFilterPanel
        activeClasses={activeSpectralClasses}
        onToggleClass={onToggleSpectralClass}
        onResetFilters={onResetFilters}
      />

      <div className='rounded-2xl border border-slate-700 bg-slate-950/75 p-4 space-y-3'>
        <p className='text-xs font-medium uppercase tracking-[0.2em] text-slate-500'>
          About the diagram
        </p>
        <div className='text-sm text-slate-400 space-y-2'>
          <p>
            The <strong>Hertzsprung–Russell diagram</strong> plots stars by
            their temperature and luminosity.
          </p>
          <p>
            Most stars lie on the <strong>main sequence</strong> (diagonal
            band). Giants and dwarfs occupy other regions.
          </p>
          <p className='text-xs text-slate-500'>
            Temperature increases to the left. Luminosity uses a logarithmic
            scale.
          </p>
        </div>
      </div>

      <div className='rounded-2xl border border-slate-700 bg-slate-950/75 p-4 space-y-3'>
        <p className='text-xs font-medium uppercase tracking-[0.2em] text-slate-500'>
          Model star
        </p>
        <div className='text-sm text-slate-400 space-y-2'>
          <p>
            Adjust the mass slider on the right to see how stellar mass affects
            luminosity and temperature.
          </p>
          <p className='text-xs text-slate-500'>
            Based on main-sequence relationships: L ∝ M<sup>3.5</sup>, R ∝ M
            <sup>0.8</sup>
          </p>
        </div>
      </div>
    </aside>
  );
}
