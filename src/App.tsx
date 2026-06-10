import { HRDiagram } from './components/HRDiagram/HRDiagram';
import { ControlPanel } from './components/ControlPanel';
import { EducationalPanel } from './components/EducationalPanel';
import { InfoPanel } from './components/InfoPanel';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { useModelStar } from './hooks/useModelStar';
import { useStarFilters } from './hooks/useStarFilters';
import { stars } from './data/stars';

function App() {
  const { modelStar, setMass, setRadius, mass, radius } = useModelStar(1.0);
  const {
    searchQuery,
    setSearchQuery,
    activeSpectralClasses,
    toggleSpectralClass,
    resetFilters,
    filteredStarCount,
  } = useStarFilters(stars);

  const handleResetControls = () => {
    setMass(1.0);
    setRadius(undefined);
  };

  return (
    <div className='min-h-screen bg-slate-950 text-slate-100'>
      <Navbar />

      <main className='mx-auto flex max-w-[1920px] gap-6 px-4 py-6 sm:px-6 lg:px-8'>
        {/* Left Sidebar */}
        <Sidebar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchResultCount={filteredStarCount}
          activeSpectralClasses={activeSpectralClasses}
          onToggleSpectralClass={toggleSpectralClass}
          onResetFilters={resetFilters}
        />

        {/* Main Content */}
        <div className='flex-1 space-y-6'>
          <HRDiagram
            stars={stars}
            modelStar={modelStar}
            searchQuery={searchQuery}
            activeSpectralClasses={activeSpectralClasses}
          />
          <EducationalPanel />
        </div>

        {/* Right Sidebar */}
        <aside className='w-full lg:w-96 flex-shrink-0 space-y-6 lg:max-h-[calc(100vh-140px)] lg:overflow-y-auto'>
          <ControlPanel
            mass={mass}
            onMassChange={setMass}
            radius={radius}
            onRadiusChange={setRadius}
            onReset={handleResetControls}
          />
          <InfoPanel modelStar={modelStar} />
        </aside>
      </main>
    </div>
  );
}

export default App;
