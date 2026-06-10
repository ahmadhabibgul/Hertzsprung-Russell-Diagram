import { useState, useCallback, useMemo } from 'react';
import type { Star } from '../data/stars';

export function useStarFilters(allStars: Star[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSpectralClasses, setActiveSpectralClasses] = useState<
    Set<string>
  >(new Set());

  const toggleSpectralClass = useCallback((spectralClass: string) => {
    setActiveSpectralClasses((prev) => {
      const newClasses = new Set(prev);
      if (newClasses.has(spectralClass)) {
        newClasses.delete(spectralClass);
      } else {
        newClasses.add(spectralClass);
      }
      return newClasses;
    });
  }, []);

  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setActiveSpectralClasses(new Set());
  }, []);

  const filteredStars = useMemo(() => {
    return allStars.filter((star) => {
      const matchesSearch =
        searchQuery === '' ||
        star.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesClass =
        activeSpectralClasses.size === 0 ||
        activeSpectralClasses.has(star.spectralClass.charAt(0));
      return matchesSearch && matchesClass;
    });
  }, [allStars, searchQuery, activeSpectralClasses]);

  return {
    searchQuery,
    setSearchQuery,
    activeSpectralClasses,
    toggleSpectralClass,
    resetFilters,
    filteredStars,
    filteredStarCount: filteredStars.length,
  };
}
