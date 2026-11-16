import { Heart, MessageCircle, Send, UserPlus } from 'lucide-react'
import { cn } from '@/lib/utils'

/** Like, comment, share and follow bubbles rising over the screen (decorative). */
const BUBBLES = [
  { at: '12%', delay: '0s', Icon: Heart, tone: 'bg-brand-yellow text-black', filled: true },
  { at: '70%', delay: '.8s', Icon: MessageCircle, tone: 'bg-brand-blue text-white' },
  { at: '40%', delay: '1.6s', Icon: Send, tone: 'bg-brand-green text-black' },
  { at: '82%', delay: '2.3s', Icon: Heart, tone: 'bg-brand-yellow text-black', filled: true },
  {
    at: '25%',
    delay: '3s',
    Icon: UserPlus,
    tone: 'border border-white/40 bg-[#0b2340] text-white',
  },
  { at: '58%', delay: '3.6s', Icon: Heart, tone: 'bg-brand-blue-60 text-black', filled: true },
]

export function FloatingBubbles() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {BUBBLES.map(({ at, delay, Icon, tone, filled }) => (
        <span
          key={delay}
          className={cn(
            'absolute -bottom-10 flex size-[30px] items-center justify-center rounded-full opacity-0 shadow-[0_6px_16px_rgb(0_0_0/0.3)] motion-safe:animate-[campaign-float-up_4.2s_ease-in_infinite]',
            tone,
          )}
          style={{ insetInlineStart: at, animationDelay: delay }}
        >
          <Icon className={cn('size-4', filled && 'fill-current')} strokeWidth={2} />
        </span>
      ))}
    </div>
  )
}
