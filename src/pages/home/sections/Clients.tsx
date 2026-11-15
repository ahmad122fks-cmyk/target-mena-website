import alrabiaa from '@/assets/clients/alrabiaa.png'
import qi from '@/assets/clients/qi.png'
import { Section } from '@/components/shared/Section'
import { ToConfirm } from '@/components/shared/ToConfirm'
import { useT } from '@/features/i18n/LangContext'
import content from '../home.services.content.json'

/** Logo files supplied by Ahmad only; Qi is always the yellow logo. */
const LOGOS: Record<string, { src: string; w: number; h: number }> = {
  qi: { src: qi, w: 248, h: 244 },
  alrabiaa: { src: alrabiaa, w: 70, h: 92 },
}

export function Clients() {
  const t = useT()
  const { clients } = content
  return (
    <Section labelledBy="clients-title" deferred className="border-t [&>div]:py-12">
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
        <h2 id="clients-title" className="text-base font-medium text-brand-text">
          {t(clients.title)}
        </h2>
        {clients.logos.map((logo) => {
          const file = LOGOS[logo.file]
          return (
            <img
              key={logo.file}
              src={file.src}
              width={file.w}
              height={file.h}
              alt={t(logo.alt)}
              loading="lazy"
              className="h-12 w-auto"
            />
          )
        })}
        {clients.textOnly.map((name) => (
          <span key={name.en} lang="en" className="text-2xl font-bold text-brand-text">
            {t(name)}
          </span>
        ))}
        <ToConfirm what={clients.toConfirm} />
      </div>
    </Section>
  )
}
