import { Section } from '@/components/shared/Section'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { ToConfirm } from '@/components/shared/ToConfirm'
import { useT } from '@/features/i18n/LangContext'
import content from '../home.services.content.json'
import { AlrabiaaArt } from './tiles/AlrabiaaArt'
import { DigitalArt } from './tiles/DigitalArt'
import { EventsArt } from './tiles/EventsArt'
import { OutdoorArt } from './tiles/OutdoorArt'
import { ProductionArt } from './tiles/ProductionArt'
import { Tile } from './tiles/Tile'
import './tiles/tiles.css'

/**
 * Services v3: one large Outdoor card (motif + framed real photo) and four
 * cards whose small animations sit on soft tinted panels; Alrabiaa keeps
 * its dark green.
 */
export function ServiceTiles() {
  const t = useT()
  const { tiles } = content
  return (
    <Section id="services" tone="ghost" labelledBy="services-title" deferred>
      <SectionHeading id="services-title" eyebrow={t(tiles.eyebrow)} title={t(tiles.title)} />
      <ul className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <li className="md:col-span-2 lg:col-span-1 lg:row-span-2">
          <Tile large panel="bg-panel-blue" art={<OutdoorArt />} {...tiles.outdoor} />
        </li>
        <li>
          <Tile panel="bg-panel-yellow" art={<ProductionArt />} {...tiles.production} />
        </li>
        <li>
          <Tile panel="bg-panel-green" art={<DigitalArt />} {...tiles.digital} />
        </li>
        <li>
          <Tile
            panel="bg-alrabiaa"
            accent="text-[#127a66] dark:text-brand-green"
            art={<AlrabiaaArt />}
            {...tiles.alrabiaa}
          />
        </li>
        <li>
          <Tile
            panel="bg-panel-grey"
            art={<EventsArt />}
            title={tiles.events.title}
            link={tiles.events.link}
            note={<ToConfirm what={tiles.events.toConfirm} className="self-start text-xs" />}
          />
        </li>
      </ul>
    </Section>
  )
}
