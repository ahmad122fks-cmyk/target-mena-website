import {
  AudioLines,
  Box,
  LayoutPanelLeft,
  Sparkles,
  Tv,
  Video,
  type LucideIcon,
} from 'lucide-react'
import { useT } from '@/features/i18n/LangContext'
import content from '../production.content.json'

const ICONS: Record<string, LucideIcon> = {
  tv: Tv,
  audio: AudioLines,
  threeD: Box,
  storyboard: LayoutPanelLeft,
  ai: Sparkles,
  shows: Video,
}

/** Six service cards (the current site's services); lift and turn yellow on hover. */
export function Services() {
  const t = useT()
  return (
    <ul className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
      {content.make.services.map((service) => {
        const Icon = ICONS[service.icon]
        return (
          <li
            key={service.icon}
            className="group flex flex-col gap-3 rounded-card border border-line bg-brand-ghost p-6 transition-transform duration-300 ease-out hover:-translate-y-1.5 hover:bg-brand-yellow hover:text-brand-black"
          >
            <span className="flex size-12 items-center justify-center rounded-[14px] bg-deep">
              <Icon aria-hidden="true" strokeWidth={1.8} className="size-6 text-brand-yellow" />
            </span>
            <h3 className="text-[1.1875rem] leading-[1.4] group-hover:text-brand-black">
              {t(service.title)}
            </h3>
            <p className="text-sm leading-[1.7]">{t(service.text)}</p>
          </li>
        )
      })}
    </ul>
  )
}
