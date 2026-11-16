import { PHONE_STAGE_MS, stageState } from './viewfinder'

/**
 * Five thin progress bars: done stages are yellow, the current one fills
 * from the start side while the viewfinder rolls (full when it is still).
 */
export function StageBars({
  count,
  stage,
  running,
}: {
  count: number
  stage: number
  running: boolean
}) {
  return (
    <div aria-hidden="true" className="flex gap-[5px]">
      {Array.from({ length: count }, (_, i) => {
        const state = stageState(i, stage)
        return (
          <span key={i} className="block h-1 flex-1 overflow-hidden rounded-full bg-white/20">
            {state !== 'next' && (
              <span
                key={state === 'current' ? `on-${stage}` : 'done'}
                style={
                  state === 'current' && running
                    ? { animation: `grow-x ${PHONE_STAGE_MS}ms linear both` }
                    : undefined
                }
                className="block h-full rounded-full bg-brand-yellow ltr:origin-left rtl:origin-right"
              />
            )}
          </span>
        )
      })}
    </div>
  )
}
