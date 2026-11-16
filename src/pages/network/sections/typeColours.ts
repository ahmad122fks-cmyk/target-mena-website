/**
 * One colour per board type (tour bars, charts), guideline palette only,
 * after the v3 Network spec. `ink` and `brand-text` swap in the dark theme,
 * so megapole and unipole bars stay visible on the navy cards.
 */
export const TYPE_COLOURS: Record<string, string> = {
  backlit: 'bg-brand-yellow',
  bridge: 'bg-brand-green',
  rooftop: 'bg-brand-blue',
  wall: 'bg-brand-grey',
  unipole: 'bg-brand-text',
  screen: 'bg-brand-blue-60',
  megapole: 'bg-ink',
  mupi: 'bg-brand-grey-40',
}
