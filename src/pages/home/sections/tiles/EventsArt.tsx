const BEAM =
  'absolute -top-1.5 h-[200px] w-20 origin-top [clip-path:polygon(44%_0,56%_0,100%_100%,0_100%)]'

/** Events: two stage lights sweeping over a dark stage. */
export function EventsArt() {
  return (
    <>
      <span
        className={`${BEAM} start-[30%] animate-[beam-swing_4s_ease-in-out_infinite] bg-linear-to-b from-brand-yellow/60 to-transparent`}
      />
      <span
        className={`${BEAM} start-[52%] animate-[beam-swing_4s_ease-in-out_infinite_reverse] bg-linear-to-b from-brand-blue/70 to-transparent`}
      />
      <span className="absolute inset-x-0 bottom-0 h-[34px] border-t-2 border-white/20 bg-black" />
    </>
  )
}
