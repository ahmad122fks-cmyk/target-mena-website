/*
 * Data only the interactive layer needs (city lights, density hexes, type
 * names, totals). Imported through a second module id, `?layers.json`, on
 * purpose: a module shared with the static map is bundled into the static
 * chunk with every key anyone uses, lights included; this one stays in the
 * lazy chunk. Typed in layers-json.d.ts.
 * Fallback if a build ever rejects the query: import from
 * '@/data/network-map.json' (same data, about 2.5 KB gzip more up front).
 */
export { densityHexes, lights, totals, typeLabels } from '@/data/network-map.json?layers.json'
