import { useState, useCallback } from 'react';
import { createModelStar, type ModelStar } from '../utils/physics';

interface UseModelStarReturn {
  modelStar: ModelStar;
  setMass: (mass: number) => void;
  setRadius: (radius: number | undefined) => void;
  mass: number;
  radius: number | undefined;
}

export function useModelStar(initialMass: number = 1): UseModelStarReturn {
  const [mass, setMassState] = useState(initialMass);
  const [radius, setRadiusState] = useState<number | undefined>(undefined);

  const modelStar = createModelStar(mass, radius);

  const setMass = useCallback((newMass: number) => {
    setMassState(Math.max(0.1, Math.min(newMass, 20)));
  }, []);

  const setRadius = useCallback((newRadius: number | undefined) => {
    if (newRadius !== undefined) {
      setRadiusState(Math.max(0.1, Math.min(newRadius, 1000)));
    } else {
      setRadiusState(undefined);
    }
  }, []);

  return {
    modelStar,
    setMass,
    setRadius,
    mass,
    radius,
  };
}
