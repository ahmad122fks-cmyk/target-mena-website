import { useEffect, useState } from 'react'
import { BoardCard } from '@/components/shared/BoardCard'
import { Container } from '@/components/shared/Section'
import { Button } from '@/components/ui/button'
import { useT } from '@/features/i18n/LangContext'
import type { Board } from '@/lib/boards'
import content from '../boards.content.json'

const PAGE = 24

/** Results grid, 24 at a time (keeps the page light on phones). */
export function Results({ boards, resetKey }: { boards: Board[]; resetKey: string }) {
  const t = useT()
  const r = content.results
  const [shown, setShown] = useState(PAGE)
  useEffect(() => setShown(PAGE), [resetKey])
  return (
    <section aria-labelledby="results-title">
      <Container className="flex flex-col gap-6 py-10 lg:py-14">
        <h2 id="results-title" className="text-xl" aria-live="polite">
          {t(r.count)} <span className="ltr-run">{boards.length}</span>
        </h2>
        {boards.length === 0 ? (
          <p>{t(r.none)}</p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {boards.slice(0, shown).map((board) => (
              <li key={board.code} className="flex">
                <BoardCard board={board} requestLabel={t(r.request)} />
              </li>
            ))}
          </ul>
        )}
        {shown < boards.length && (
          <Button
            variant="outline"
            onClick={() => setShown(shown + PAGE)}
            className="h-12 self-center rounded-xl px-8 text-base font-semibold text-brand-blue"
          >
            {t(r.more)}
          </Button>
        )}
      </Container>
    </section>
  )
}
