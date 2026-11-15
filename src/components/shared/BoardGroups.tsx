import { useLang } from '@/features/i18n/LangContext'
import type { Board } from '@/lib/boards'
import { formatCount } from '@/lib/format'
import { BoardRow } from './BoardRow'
import { Section } from './Section'

type Group = { key: string; title: string; boards: Board[] }

/** Boards listed in titled groups (province page: by type; format page: by province). */
export function BoardGroups({ groups }: { groups: Group[] }) {
  const lang = useLang()
  return (
    <Section labelledBy={`group-${groups[0]?.key}`}>
      <div className="flex flex-col gap-12">
        {groups.map((group) => (
          <div key={group.key} className="flex flex-col gap-4">
            <h2
              id={`group-${group.key}`}
              className="flex flex-wrap items-baseline gap-x-3 text-2xl"
            >
              {group.title}
              <span className="text-base font-normal text-brand-text">
                {formatCount(group.boards.length, lang)}
              </span>
            </h2>
            <ul className="flex flex-col divide-y rounded-xl border bg-white">
              {group.boards.map((board) => (
                <BoardRow key={board.code} board={board} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
