import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AI_TILES } from './sequence'
import { MOVE } from './ScreenShell'

/* Four abstract "generated" designs in the guideline colours (no real artwork). */
function Design({ index }: { index: number }) {
  switch (index) {
    case 0:
      return (
        <span className="absolute inset-0 bg-[#0161A6] p-3">
          <span className="block size-9 rounded-full bg-[#F7AF1C]" />
          <span className="absolute inset-x-3 bottom-6 block h-2 rounded-full bg-white" />
          <span className="absolute start-3 bottom-3 block h-1.5 w-1/2 rounded-full bg-white/60" />
        </span>
      )
    case 1:
      return (
        <span className="absolute inset-0 bg-[#F7AF1C]">
          <span className="absolute -end-5 -top-5 block size-20 rounded-full bg-black" />
          <span className="absolute start-3 bottom-3 block h-5 w-14 rounded-md bg-black" />
        </span>
      )
    case 2:
      return (
        <span className="absolute inset-0 grid place-items-center bg-[#2AB99D]">
          <span className="flex flex-col items-center">
            <span className="block h-9 w-20 rounded-sm border-2 border-black bg-white/40" />
            <span className="block h-8 w-1.5 bg-black" />
          </span>
        </span>
      )
    default:
      return (
        <span className="absolute inset-0 flex flex-col justify-end gap-1.5 bg-[#0F2B4D] p-3">
          <span className="block h-2 w-4/5 rounded-full bg-[#4DA8E8]" />
          <span className="block h-2 w-3/5 rounded-full bg-[#F7AF1C]" />
          <span className="block h-2 w-2/5 rounded-full bg-[#2AB99D]" />
        </span>
      )
  }
}

/** Result grid: dashed slots, each design pops in; the first is then picked. */
export function AiTiles({ count, picked }: { count: number; picked: boolean }) {
  return (
    <div className="grid flex-1 grid-cols-2 gap-2">
      {Array.from({ length: AI_TILES }, (_, i) => (
        <span key={i} className="relative rounded-[14px] border border-dashed border-[#1F4A78]">
          <span
            className={cn(
              'absolute inset-0 overflow-hidden rounded-[14px]',
              MOVE,
              i < count ? 'scale-100 opacity-100' : 'scale-90 opacity-0',
              i === 0 && picked && 'ring-2 ring-[#F7AF1C] ring-offset-2 ring-offset-[#071A2E]',
            )}
          >
            <Design index={i} />
          </span>
          {i === 0 && picked && (
            <span className="absolute -end-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-[#F7AF1C] text-black">
              <Check className="size-3" strokeWidth={3} />
            </span>
          )}
        </span>
      ))}
    </div>
  )
}
