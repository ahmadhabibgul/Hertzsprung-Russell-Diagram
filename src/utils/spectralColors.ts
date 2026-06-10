export function getSpectralColor(spectralClass: string): string {
  const mainType = spectralClass.charAt(0).toUpperCase();

  const spectralColors: Record<string, string> = {
    O: '#83d4ff',
    B: '#7fb7ff',
    A: '#7be1d8',
    F: '#b9f7b9',
    G: '#ffe26b',
    K: '#ffb75d',
    M: '#ff7a6e',
  };

  return spectralColors[mainType] || '#a0aec0';
}

export function getCategoryOpacity(category: string): number {
  const opacityMap: Record<string, number> = {
    'main-sequence': 0.85,
    giant: 0.8,
    supergiant: 0.75,
    'white-dwarf': 0.9,
    subgiant: 0.8,
  };
  return opacityMap[category] || 0.8;
}
