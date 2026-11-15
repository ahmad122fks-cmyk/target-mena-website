import alrabiaa from '@/assets/clients/alrabiaa.png'
import { Calligraphy } from '@/components/shared/Calligraphy'
import { Photo } from '@/components/shared/Photo'
import { Section } from '@/components/shared/Section'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { useLink, useT } from '@/features/i18n/LangContext'
import { ART } from '@/lib/images'
import content from '../home.services.content.json'
import { ChannelCard } from './ChannelCard'

/** "More than boards": outdoor (grey), production (yellow), creative (white), Alrabiaa (green). */
export function Services() {
  const t = useT()
  const link = useLink()
  const { services: s } = content
  const go = (item: { path: string; label: { ar: string; en: string } }) => ({
    href: link(item.path),
    label: t(item.label),
  })
  return (
    <Section id="services" tone="ghost" labelledBy="services-title" deferred>
      <SectionHeading id="services-title" title={t(s.title)} center />
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <ChannelCard
          tone="grey"
          eyebrow={t(s.outdoor.eyebrow)}
          title={t(s.outdoor.title)}
          link={go(s.outdoor.link)}
        >
          <Calligraphy
            mark="a"
            tone="white"
            className="-end-[60px] -bottom-[80px] w-[260px] opacity-[0.22]"
          />
        </ChannelCard>
        <ChannelCard
          tone="yellow"
          eyebrow={t(s.production.eyebrow)}
          title={t(s.production.title)}
          link={go(s.production.link)}
          media={
            <Photo
              picture={ART.production}
              alt={t(s.production.artAlt)}
              sizes="(min-width: 1024px) 280px, 100vw"
              className="aspect-square h-full object-cover"
            />
          }
        />
        <ChannelCard
          tone="white"
          eyebrow={t(s.creative.eyebrow)}
          title={t(s.creative.title)}
          link={go(s.creative.link)}
          media={
            <Photo
              picture={ART.creative}
              alt={t(s.creative.artAlt)}
              sizes="(min-width: 1024px) 250px, 100vw"
              className="aspect-[890/1190] max-h-[340px] object-cover object-left lg:h-full lg:max-h-none"
            />
          }
        />
        <ChannelCard
          tone="green"
          eyebrow={t(s.alrabiaa.eyebrow)}
          title={t(s.alrabiaa.title)}
          link={go(s.alrabiaa.link)}
        >
          <img
            src={alrabiaa}
            width={70}
            height={92}
            alt={t(s.alrabiaa.logoAlt)}
            loading="lazy"
            className="mt-1.5 h-11 w-auto self-start"
          />
        </ChannelCard>
      </div>
    </Section>
  )
}
