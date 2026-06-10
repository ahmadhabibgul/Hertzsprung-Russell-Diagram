// Solar constants (normalized to 1)
const SOLAR_TEMPERATURE = 5778;

export interface ModelStar {
  mass: number;
  radius: number;
  luminosity: number;
  temperature: number;
  spectralClass: string;
}

export function computeLuminosity(mass: number): number {
  // Main sequence: L ∝ M^3.5
  return Math.pow(mass, 3.5);
}

export function computeRadius(mass: number): number {
  // Main sequence: R ∝ M^0.8
  return Math.pow(mass, 0.8);
}

export function computeTemperature(luminosity: number, radius: number): number {
  // Stefan-Boltzmann: L = 4πR²σT⁴
  // Solving for T: T = (L / (4πR²σ))^(1/4)
  // In solar units, simplified:
  // T_star = T_sun * sqrt(sqrt(L / R²))
  // which is: T_star = T_sun * (L / R²)^(1/4)

  if (radius === 0) return SOLAR_TEMPERATURE;
  const tempRatio = Math.pow(luminosity / (radius * radius), 0.25);
  return SOLAR_TEMPERATURE * tempRatio;
}

export function getSpectralClassFromTemp(temperature: number): string {
  // Simplified spectral classification based on effective temperature
  if (temperature > 30000) return 'O';
  if (temperature > 10000) return 'B';
  if (temperature > 7500) return 'A';
  if (temperature > 6000) return 'F';
  if (temperature > 5200) return 'G';
  if (temperature > 3700) return 'K';
  return 'M';
}

export function createModelStar(
  mass: number,
  radiusOverride?: number,
): ModelStar {
  const radius = radiusOverride ?? computeRadius(mass);
  const luminosity = computeLuminosity(mass);
  const temperature = computeTemperature(luminosity, radius);
  const spectralClass = getSpectralClassFromTemp(temperature);

  return {
    mass,
    radius,
    luminosity,
    temperature,
    spectralClass,
  };
}
