/** Fill "{name}" placeholders: fill('Billboards in {city}', { city: 'Najaf' }). */
export function fill(text: string, values: Record<string, string>): string {
  return text.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? '')
}
