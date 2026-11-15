import { CalendarDays, Clapperboard, MapPinned, Tv, type LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Section } from '@/components/shared/Section'
import { useLink, useT } from '@/features/i18n/LangContext'
import content from '../home.services.content.json'

const ICONS: Record<string, LucideIcon> = {
  outdoor: MapPinned,
  production: Clapperboard,
  events: CalendarDays,
  tv: Tv,
}

/** What we do: outdoor first, then production, events, TV (BUILD-BRIEF 3). */
export function Services() {
  const t = useT()
  const link = useLink()
  const { services } = content
  return (
    <Section tone="ghost" labelledBy="services-title" deferred>
      <h2 id="services-title" className="mb-10 text-3xl sm:text-4xl">
        {t(services.title)}
      </h2>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.items.map((item) => {
          const Icon = ICONS[item.icon]
          return (
            <li key={item.path} className="flex">
              <Card className="w-full gap-0 py-0 shadow-none">
                <CardContent className="flex flex-1 flex-col gap-3 p-6">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-brand-blue-10 text-brand-blue">
                    <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <h3 className="text-xl">{t(item.title)}</h3>
                  <p className="flex-1 text-[0.95rem]">{t(item.text)}</p>
                  <a
                    href={link(item.path)}
                    className="inline-flex min-h-11 items-center font-semibold text-brand-blue hover:underline"
                  >
                    {t(services.more)}
                    <span className="sr-only"> – {t(item.title)}</span>
                  </a>
                </CardContent>
              </Card>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
