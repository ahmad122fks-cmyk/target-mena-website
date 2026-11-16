/*
 * What must never reach the public site or the public repo (CLAUDE.md,
 * BUILD-BRIEF 4.2 and 9). Supplier and staff names are NOT written here
 * (this repo is public): they live in scripts/forbidden.private.txt (git-
 * ignored, one per line) or the FORBIDDEN_TERMS secret in GitHub.
 */
import fs from 'node:fs'

/** Keys that may never appear in board data (prices, suppliers, bookings, availability). */
export const FORBIDDEN_KEYS =
  /"(price\w*|monthlyPrice|pricePerMeter|ppm|mp|sp|supplier\w*|campaign\w*|company\w*|available|availability|booked\w*)"\s*:/i

/** The data a built page carries for the browser (<script id="page-data">). */
export function pageData(html: string): string {
  return html.match(/<script id="page-data"[^>]*>([\s\S]*?)<\/script>/)?.[1] ?? ''
}

/** Words that may never appear in published text. */
export const FORBIDDEN_WORDS: RegExp[] = [
  /\bprice/i,
  /سعر/,
  /\bUSD\b/,
  /\$/,
  /monthlyPrice/i,
  /\bsupplier/i,
  /الريادة|ريادة/,
]

/**
 * The site owner's name appears in internal notes and code comments (stripped
 * from the build), but never in anything that ships: content JSON (bundled
 * whole, notes included) and the built pages, scripts and data.
 */
export const OWNER_NAME = /\bAhmad\b/i

export function privateTerms(): string[] {
  const file = new URL('./forbidden.private.txt', import.meta.url)
  const fromFile = fs.existsSync(file) ? fs.readFileSync(file, 'utf8').split('\n') : []
  const fromEnv = (process.env.FORBIDDEN_TERMS ?? '').split(/[\n,]/)
  return [...fromFile, ...fromEnv]
    .map((term) => term.trim())
    .filter((term) => term && !term.startsWith('#'))
}

export type Finding = { rule: string; sample: string }

/** Check one text. `words` = also check FORBIDDEN_WORDS (published text only). */
export function findForbidden(
  text: string,
  opts: { keys?: boolean; words?: boolean; terms?: string[] },
): Finding[] {
  const found: Finding[] = []
  const add = (rule: string, match: RegExpMatchArray | null) =>
    match &&
    found.push({
      rule,
      sample: text.slice(Math.max(0, match.index! - 30), match.index! + 40).replace(/\s+/g, ' '),
    })
  if (opts.keys) add('forbidden key', text.match(FORBIDDEN_KEYS))
  if (opts.words)
    for (const word of FORBIDDEN_WORDS) add(`forbidden word ${word}`, text.match(word))
  for (const term of opts.terms ?? []) {
    const index = text.toLowerCase().indexOf(term.toLowerCase())
    if (index >= 0) found.push({ rule: 'private name', sample: '(hidden)' })
  }
  return found
}

/** Visible text of an HTML page (scripts and styles removed). */
export function htmlText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
}
