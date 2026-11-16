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

/** Six white service cards with blue icons (v3): lift with a soft blue shadow on hover. */
export function Services() {
  const t = useT()
  return (
    <ul className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
      {content.make.services.map((service) => {
        const Icon = ICONS[service.icon]
        return (
          <li
            key={service.icon}
            className="card-lift flex flex-col gap-3 rounded-card border border-line bg-surface p-6"
          >
            <span className="flex size-12 items-center justify-center rounded-[14px] bg-panel-blue">
              <Icon aria-hidden="true" strokeWidth={1.8} className="size-6 text-link" />
            </span>
            <h3 className="text-xl leading-[1.4] font-semibold">{t(service.title)}</h3>
            <p className="text-[0.9375rem] leading-[1.75]">{t(service.text)}</p>
          </li>
        )
      })}
    </ul>
  )
}
