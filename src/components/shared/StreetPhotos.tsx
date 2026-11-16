import { Eyebrow } from '@/components/shared/Eyebrow'
import type { Localized } from '@/features/i18n/lang'
import { useLang, useT } from '@/features/i18n/LangContext'
import { typeLabel, type Board } from '@/lib/boards'
import { BOARD_PHOTOS } from '@/lib/images'
import { PhotoMarquee } from './PhotoMarquee'
import { Container } from './Section'

type Props = {
  id: string
  boards: Board[]
  title: Localized
  label: Localized
  eyebrow?: Localized
}

/**
 * Light band (v3) of real, unedited street photos (home, network). Only boards
 * with an approved photo in src/lib/images.ts; the covered LED-AB01 photo
 * waits for Ahmad's OK, so it stays out of the strip.
 */
export function StreetPhotos({ id, boards, title, label, eyebrow }: Props) {
  const t = useT()
  const lang = useLang()
  const items = boards
    .filter((board) => BOARD_PHOTOS[board.code] && board.code !== 'LED-AB01')
    .map((board) => ({
      code: board.code,
      picture: BOARD_PHOTOS[board.code],
      alt: `${typeLabel(board.type, lang)} ${board.code}`,
    }))
  return (
    <section aria-labelledby={id} className="overflow-hidden bg-page pb-16 lg:pb-[5.5rem]">
      <Container className="flex flex-col gap-2.5 pt-16 pb-7 lg:pt-[5.5rem]">
        {eyebrow && <Eyebrow>{t(eyebrow)}</Eyebrow>}
        <h2 id={id} className="text-3xl lg:text-[2.5rem] lg:leading-[3.125rem]">
          {t(title)}
        </h2>
      </Container>
      <PhotoMarquee items={items} label={t(label)} />
    </section>
  )
}
