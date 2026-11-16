/** Green «مباشر» / "Live" dot with a soft pulse (still under reduced motion). */
export function LiveDot({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-green">
      <span aria-hidden="true" className="relative flex size-2">
        <span className="absolute inset-0 animate-[pulse-ring_2s_ease-out_infinite] rounded-full bg-brand-green" />
        <span className="relative size-2 rounded-full bg-brand-green" />
      </span>
      {label}
    </span>
  )
}
