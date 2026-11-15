/*
 * Which published board(s) a photo file belongs to. File names are
 * "CODE__sNN.jpg"; variants handled: case, zero padding (BBH1A = BBH01A),
 * both faces in one photo (BBH1A_B -> BBH01A + BBH01B) and backlit network
 * codes (GHS01A -> every board of that network). Ranges such as
 * "BBH15-31A_B" are overview slides, not site photos, and are skipped.
 */
import { normaliseCode } from './normalise'

export function codeVariants(code: string): string[] {
  const match = code.match(/^([A-Z-]*?)(\d+)([A-Z]?)(-\d+)?$/)
  if (!match) return [code]
  const [, prefix, number, suffix, tail = ''] = match
  const numbers = new Set([
    number,
    number.replace(/^0+(?=\d)/, ''),
    number.padStart(2, '0'),
    number.padStart(3, '0'),
  ])
  return [code, ...[...numbers].map((n) => `${prefix}${n}${suffix}${tail}`)]
}

export function matchPhoto(
  file: string,
  published: Set<string>,
  networks: Map<string, string[]>,
): string[] {
  const stem = normaliseCode(file.split('__')[0])
  if (/\d+-\d+[A-Z]_[A-Z]$/.test(stem)) return []
  const pair = stem.match(/^(.*?)([A-Z])_([A-Z])$/)
  const codes = pair ? [pair[1] + pair[2], pair[1] + pair[3]] : [stem]
  const found = codes
    .map((code) => codeVariants(code).find((variant) => published.has(variant)))
    .filter((c) => c !== undefined)
  if (found.length) return found
  return (networks.get(stem) ?? []).map(normaliseCode).filter((code) => published.has(code))
}
