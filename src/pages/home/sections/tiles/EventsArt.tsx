const BEAM =
  'absolute -top-1.5 h-[200px] w-20 origin-top [clip-path:polygon(44%_0,56%_0,100%_100%,0_100%)]'

/** Events: two stage lights sweeping over the stage, on the soft grey panel. */
export function EventsArt() {
  return (
    <>
      <span
        className={`${BEAM} start-[30%] animate-[beam-swing_4s_ease-in-out_infinite] bg-linear-to-b from-brand-yellow/55 to-transparent`}
      />
      <span
        className={`${BEAM} start-[52%] animate-[beam-swing_4s_ease-in-out_infinite_reverse] bg-linear-to-b from-brand-blue/50 to-transparent`}
      />
      <span className="absolute inset-x-0 bottom-0 h-[26px] bg-line-strong" />
    </>
  )
}
