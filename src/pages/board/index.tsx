import { usePageData } from '@/app/PageData'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs'
import { RequestForm } from '@/components/shared/RequestForm'
import { Container } from '@/components/shared/Section'
import { useLang } from '@/features/i18n/LangContext'
import { trailFor } from '@/lib/breadcrumbs'
import { BoardDetails } from './sections/BoardDetails'
import { BoardMedia } from './sections/BoardMedia'
import { Nearby } from './sections/Nearby'

/** One board (approved demo "Board page"): real photo, facts, map, request form, nearby sites. */
export default function BoardPage() {
  const data = usePageData('board')
  const lang = useLang()
  return (
    <>
      <Container className="pt-6">
        <Breadcrumbs items={trailFor(data, lang)} />
      </Container>
      <Container className="grid items-start gap-10 py-8 lg:grid-cols-[1.4fr_1fr] lg:py-10">
        <BoardMedia board={data.board} />
        <div className="flex flex-col gap-8">
          <BoardDetails board={data.board} />
          <RequestForm code={data.board.code} />
        </div>
      </Container>
      <Nearby board={data.board} nearby={data.nearby} />
    </>
  )
}
