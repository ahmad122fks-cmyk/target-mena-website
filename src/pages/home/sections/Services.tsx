import { CalendarDays, Clapperboard, MapPinned, Tv, type LucideIcon } from 'lucide-react'
import { Section } from '@/components/shared/Section'
import { useLink, useT } from '@/features/i18n/LangContext'
import content from '../home.services.content.json'

const ICONS: Record<string, LucideIcon> = { outdoor: MapPinned, production: Clapperboard, events: CalendarDays, tv: Tv }

/** What we do: outdoor first, then production, events, TV (BUILD-BRIEF 3). */
export function Services() {
  const t = useT()
  const link = useLink()
  const { services } = content
  return (
    <Section tone="ghost" labelledBy="services-title">
      <h2 id="services-title" className="mb-8 text-3xl sm:text-4xl">{t(services.title)}</h2>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.items.map((item) => {
          const Icon = ICONS[item.icon]
          return (
            <li key={item.path} className="flex flex-col gap-3 rounded-2xl bg-white p-6">
              <Icon className="size-7 text-brand-blue" strokeWidth={1.75} aria-hidden="true" />
              <h3 className="text-xl">{t(item.title)}</h3>
              <p className="flex-1">{t(item.text)}</p>
              <a href={link(item.path)} className="inline-flex min-h-11 items-center font-semibold text-brand-blue hover:underline">
                {t(services.more)}
                <span className="sr-only"> – {t(item.title)}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
