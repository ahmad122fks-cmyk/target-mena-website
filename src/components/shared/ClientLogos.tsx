import alrabiaa from '@/assets/clients/alrabiaa.png'
import qi from '@/assets/clients/qi.png'
import type { Localized } from '@/features/i18n/lang'
import { useT } from '@/features/i18n/LangContext'
import { ToConfirm } from './ToConfirm'

/** Logo files supplied by Ahmad only; Qi is always the yellow logo. */
const FILES: Record<string, { src: string; w: number; h: number }> = {
  qi: { src: qi, w: 248, h: 244 },
  alrabiaa: { src: alrabiaa, w: 70, h: 92 },
}

type Props = { logos: { file: string; alt: Localized }[]; toConfirm: string }

/** The client logos Ahmad approved, and a placeholder for the others. */
export function ClientLogos({ logos, toConfirm }: Props) {
  const t = useT()
  return (
    <div className="flex flex-wrap items-center gap-x-11 gap-y-6">
      {logos.map((logo) => {
        const file = FILES[logo.file]
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
      <ToConfirm what={toConfirm} />
    </div>
  )
}
