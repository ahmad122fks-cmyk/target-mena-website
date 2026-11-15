import { useSyncExternalStore } from 'react'
import type { Board } from '@/lib/boards'
import { addItems, parseStored, toggleItem, type SelectedBoard } from './items'

/*
 * "My selection": boards the visitor picked, saved in this browser
 * (localStorage, every access wrapped in try/catch). No account needed.
 */
const KEY = 'target-selection-v1'
const EMPTY: SelectedBoard[] = []
let items: SelectedBoard[] = EMPTY
let loaded = false
const listeners = new Set<() => void>()

function read(): SelectedBoard[] {
  try {
    return parseStored(window.localStorage.getItem(KEY))
  } catch {
    return EMPTY
  }
}

function set(next: SelectedBoard[]) {
  items = next
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    // Private mode or storage full: the selection still works for this page.
  }
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  const sync = (event: StorageEvent) => {
    if (event.key !== KEY) return
    items = read()
    listener()
  }
  window.addEventListener('storage', sync)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', sync)
  }
}

function snapshot(): SelectedBoard[] {
  if (!loaded) {
    loaded = true
    items = read()
  }
  return items
}

export const selection = {
  toggle: (board: Board) => set(toggleItem(snapshot(), board)),
  add: (boards: Board[]) => set(addItems(snapshot(), boards)),
  remove: (code: string) => set(snapshot().filter((item) => item.code !== code)),
  clear: () => set(EMPTY),
}

/** Current selection; empty during prerender and hydration, then the saved list. */
export function useSelection(): SelectedBoard[] {
  return useSyncExternalStore(subscribe, snapshot, () => EMPTY)
}
