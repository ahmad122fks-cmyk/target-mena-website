import { usePageData } from '@/app/PageData'
import { StreetPhotos } from '@/components/shared/StreetPhotos'
import content from '../home.content.json'

/** "From the street": the featured photos first, then the swipe boards. */
export function Street() {
  const { featured, swipe } = usePageData('home')
  const seen = new Set<string>()
  const boards = [...featured, ...swipe].filter(
    (board) => !seen.has(board.code) && seen.add(board.code),
  )
  const { strip } = content
  return <StreetPhotos id="street-title" boards={boards} {...strip} />
}
