import type { ReactNode } from 'react'

/** Number card: big blue figure and one line of text (DESIGN.md 4). */
export function StatCard({ value, label }: { value: ReactNode; label: ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5 rounded-card border border-line bg-surface p-7 lg:p-8">
      <b className="text-5xl font-semibold leading-none text-link lg:text-[3.25rem]">{value}</b>
      <span className="leading-[1.8]">{label}</span>
    </div>
  )
}
