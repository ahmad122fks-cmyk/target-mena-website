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

/** Five services, each with its own small motion: outdoor pulse, REC, phone feed, on-air bars, stage lights. */
export function ServiceTiles() {
  const t = useT()
  const { tiles } = content
  return (
    <Section id="services" labelledBy="services-title" deferred>
      <SectionHeading
        id="services-title"
        eyebrow={t(tiles.eyebrow)}
        title={t(tiles.title)}
        center
      />
      <ul className="mt-9 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-5">
        <li className="flex flex-col">
          <Tile tone="dark" accent="text-brand-yellow" art={<OutdoorArt />} {...tiles.outdoor} />
        </li>
        <li className="flex flex-col">
          <Tile
            tone="dark"
            accent="text-brand-yellow"
            art={<ProductionArt />}
            {...tiles.production}
          />
        </li>
        <li className="flex flex-col">
          <Tile tone="light" accent="text-link" art={<DigitalArt />} {...tiles.digital} />
        </li>
        <li className="flex flex-col">
          <Tile tone="dark" accent="text-brand-green" art={<AlrabiaaArt />} {...tiles.alrabiaa} />
        </li>
        <li className="flex flex-col">
          <Tile
            tone="dark"
            accent="text-brand-yellow"
            art={<EventsArt />}
            title={tiles.events.title}
            link={tiles.events.link}
            note={
              <ToConfirm what={tiles.events.toConfirm} className="text-xs text-brand-grey-40" />
            }
          />
        </li>
      </ul>
    </Section>
  )
}
