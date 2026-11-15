import { useLink, useT } from '@/features/i18n/LangContext'
import { ART } from '@/lib/images'
import { Photo } from '../Photo'
import { PillButton } from '../PillButton'
import { StatCard } from '../StatCard'
import { GridBlock } from './GridBlock'
import type { Block } from './types'
import { WorkBlock } from './WorkBlock'

/** The inside of one content block. */
export function BlockBody({ block }: { block: Block }) {
  const t = useT()
  const link = useLink()
  switch (block.type) {
    case 'grid':
      return <GridBlock items={block.items} columns={block.columns} />
    case 'text':
      return (
        <div className="flex max-w-3xl flex-col gap-4 text-[1.0625rem] leading-[1.9]">
          {block.paragraphs.map((p) => (
            <p key={p.en}>{t(p)}</p>
          ))}
        </div>
      )
    case 'stat':
      return (
        <div className="max-w-md">
          <StatCard
            value={<span className="ltr-run">{t(block.value)}</span>}
            label={
              <>
                {t(block.label)}
                {block.note && <span className="block text-sm">{t(block.note)}</span>}
              </>
            }
          />
        </div>
      )
    case 'art':
      return (
        <Photo
          picture={ART[block.art]}
          alt={t(block.alt)}
          sizes="(min-width: 640px) 512px, 100vw"
          className="mx-auto max-w-lg rounded-card"
        />
      )
    case 'chips':
      return (
        <ul className="flex flex-wrap gap-2.5">
          {block.items.map((item) => (
            <li
              key={item.en}
              className="rounded-full border border-input bg-white px-4 py-2 text-[0.9375rem] text-brand-black"
            >
              {t(item)}
            </li>
          ))}
        </ul>
      )
    case 'cta':
      return (
        <div className="flex flex-col items-start gap-5">
          {block.text && <p className="max-w-2xl text-lg leading-[1.8]">{t(block.text)}</p>}
          <PillButton href={link(block.link.path)}>{t(block.link.label)}</PillButton>
        </div>
      )
    case 'work':
      return <WorkBlock />
  }
}
