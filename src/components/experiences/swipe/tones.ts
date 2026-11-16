/**
 * Type chip colours on the swipe cards (guideline colours only; text on
 * yellow, green and the light tints is black).
 */
const TONES: Record<string, string> = {
  rooftop: 'bg-brand-grey text-black',
  screen: 'bg-brand-blue-60 text-black',
  bridge: 'bg-brand-green text-black',
  wall: 'bg-brand-yellow text-black',
  wallsign: 'bg-brand-yellow text-black',
  megapole: 'bg-white text-black',
  unipole: 'bg-white text-black',
  backlit: 'bg-brand-blue text-white',
  mupi: 'bg-brand-blue text-white',
}

export function typeTone(type: string): string {
  return TONES[type] ?? 'bg-white text-black'
}
