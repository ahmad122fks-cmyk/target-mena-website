import { Check } from 'lucide-react'
import { Photo } from '@/components/shared/Photo'
import { PillButton } from '@/components/shared/PillButton'
import { Section } from '@/components/shared/Section'
import { SectionHeading } from '@/components/shared/SectionHeading'
import site from '@/content/site.json'
import { useT } from '@/features/i18n/LangContext'
import { MOCKUPS } from '@/lib/images'
import content from '../home.more.content.json'

/** "After booking" (v3, ghost band): the client portal (private login sent with the booking). */
export function Portal() {
  const t = useT()
  const { portal } = content
  return (
    <Section tone="ghost" labelledBy="portal-title" deferred>
      <div className="flex flex-wrap items-center gap-14">
        <div className="flex min-w-0 flex-[1_1_23.75rem] flex-col gap-4">
          <SectionHeading
            id="portal-title"
            size="feature"
            eyebrow={t(portal.eyebrow)}
            title={t(portal.title)}
          />
          <p>{t(portal.text)}</p>
          <ul className="flex flex-col gap-3 text-ink">
            {portal.list.map((item) => (
              <li key={item.en} className="flex items-center gap-3.5">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-[10px] border border-line-strong bg-surface text-link">
                  <Check className="size-4" strokeWidth={2.4} aria-hidden="true" />
                </span>
                {t(item)}
              </li>
            ))}
          </ul>
          <p className="text-sm">{t(portal.access)}</p>
          <PillButton href={site.clientLogin.href} external className="self-start">
            {t(portal.login)}
            <span className="sr-only"> {t(site.clientLogin.newTab)}</span>
          </PillButton>
        </div>
        <figure className="min-w-0 flex-[1_1_35rem]">
          <Photo
            picture={MOCKUPS.portal}
            alt={t(portal.alt)}
            sizes="(min-width: 1280px) 660px, (min-width: 1024px) 55vw, calc(100vw - 32px)"
          />
          <figcaption className="mt-1.5 text-xs">{t(portal.caption)}</figcaption>
        </figure>
      </div>
    </Section>
  )
}
