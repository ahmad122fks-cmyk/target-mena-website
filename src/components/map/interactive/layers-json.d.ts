// The map data seen through its second, lazily loaded module id (see layersData.ts).
declare module '@/data/network-map.json?layers.json' {
  type Data = typeof import('@/data/network-map.json')
  export const lights: Data['lights']
  export const densityHexes: Data['densityHexes']
  export const totals: Data['totals']
  export const typeLabels: Data['typeLabels']
}
