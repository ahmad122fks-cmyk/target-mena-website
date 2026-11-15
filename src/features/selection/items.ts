import type { Board } from '@/lib/boards'

/** What the selection keeps per board (whitelisted fields only, never prices). */
export type SelectedBoard = Pick<
  Board,
  'code' | 'type' | 'city' | 'area' | 'description' | 'height' | 'width' | 'sqm' | 'faces' | 'photo'
>

export const MAX_SELECTED = 200

export function toSelected(board: Board): SelectedBoard {
  const { code, type, city, area, description, height, width, sqm, faces, photo } = board
  return { code, type, city, area, description, height, width, sqm, faces, photo }
}

function isSelected(value: unknown): value is SelectedBoard {
  const v = value as SelectedBoard
  return (
    !!v &&
    typeof v.code === 'string' &&
    typeof v.type === 'string' &&
    typeof v.city === 'string' &&
    typeof v.height === 'number' &&
    typeof v.width === 'number' &&
    typeof v.sqm === 'number'
  )
}

/** Read what the browser saved; anything broken or unexpected is dropped. */
export function parseStored(raw: string | null): SelectedBoard[] {
  if (!raw) return []
  try {
    const data: unknown = JSON.parse(raw)
    if (!Array.isArray(data)) return []
    const seen = new Set<string>()
    return data
      .filter(isSelected)
      .filter((item) => !seen.has(item.code) && seen.add(item.code))
      .slice(0, MAX_SELECTED)
  } catch {
    return []
  }
}

export function toggleItem(items: SelectedBoard[], board: Board): SelectedBoard[] {
  return items.some((item) => item.code === board.code)
    ? items.filter((item) => item.code !== board.code)
    : [...items, toSelected(board)].slice(0, MAX_SELECTED)
}

export function addItems(items: SelectedBoard[], boards: Board[]): SelectedBoard[] {
  const codes = new Set(items.map((item) => item.code))
  const extra = boards.filter((board) => !codes.has(board.code)).map(toSelected)
  return [...items, ...extra].slice(0, MAX_SELECTED)
}

/** Codes from a shared link: ?codes=BGW03A,BBH20A (upper case, safe characters only). */
export function codesFromParam(param: string | null): string[] {
  if (!param) return []
  return [...new Set(param.split(',').map((code) => code.trim().toUpperCase()))]
    .filter((code) => /^[A-Z0-9()-]{1,24}$/.test(code))
    .slice(0, MAX_SELECTED)
}
