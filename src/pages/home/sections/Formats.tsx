import { Photo } from '@/components/shared/Photo'
import { Section } from '@/components/shared/Section'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { useLink, useT } from '@/features/i18n/LangContext'
import { BOARD_PHOTOS } from '@/lib/images'
import content from '../home.platform.content.json'

/** Formats row: four real site photos (5:3, the board always fully in frame), one team to book. */
export function Formats() {
  const t = useT()
  const link = useLink()
  const { formats } = content
  return (
    <Section labelledBy="formats-title" deferred>
      <SectionHeading id="formats-title" title={t(formats.title)} center />
      <ul className="mt-9 grid grid-cols-2 gap-x-5 gap-y-7 lg:grid-cols-4">
        {formats.items.map((item) => (
          <li key={item.code}>
            <a href={link(item.path)} className="group flex flex-col gap-3 text-brand-black">
              <Photo
                picture={BOARD_PHOTOS[item.code]}
                alt={t(item.alt)}
                sizes="(min-width: 1024px) 290px, calc(50vw - 26px)"
                className="aspect-[5/3] rounded-[1.125rem] object-cover"
              />
              <span className="flex flex-wrap items-baseline justify-between gap-x-2">
                <b className="text-base font-semibold group-hover:text-brand-blue sm:text-lg">
                  {t(item.label)}
                </b>
                <span className="ltr-run text-[0.8125rem] text-brand-text">{item.code}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-9 text-center text-sm">{t(formats.note)}</p>
    </Section>
  )
}
