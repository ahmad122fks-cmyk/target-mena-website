import { lazy, Suspense } from 'react'
import type { Board } from '@/lib/boards'
import { useHydrated } from '@/lib/motion'
import { LOGO_WHITE } from '@/lib/site'
import type { ShowcaseKey } from './tabs'
import { TvScreen } from './TvScreen'

// Each screen is its own chunk: the home page's own JS stays inside its budget
// and a screen downloads only when the phone first shows it.
const BoardSwipe = lazy(() => import('../BoardSwipe').then((m) => ({ default: m.BoardSwipe })))
const Viewfinder = lazy(() =>
  import('../production/ProductionViewfinder').then((m) => ({ default: m.ProductionViewfinder })),
)
const SocialCampaign = lazy(() =>
  import('../SocialCampaign').then((m) => ({ default: m.SocialCampaign })),
)
const TargetReels = lazy(() => import('../TargetReels').then((m) => ({ default: m.TargetReels })))

/** What the prerendered page and a screen still loading show: the dark screen and the logo. */
function Waiting() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#04111f]">
      <img src={LOGO_WHITE} alt="" width={1111} height={202} className="h-7 w-auto opacity-60" />
    </div>
  )
}

type Props = { which: ShowcaseKey; boards: Board[]; active: boolean }

export function Screen({ which, boards, active }: Props) {
  if (!useHydrated()) return <Waiting />
  return (
    <Suspense fallback={<Waiting />}>
      {which === 'boards' && <BoardSwipe boards={boards} active={active} />}
      {which === 'prod' && <Viewfinder variant="phone" active={active} />}
      {which === 'camp' && <SocialCampaign active={active} />}
      {which === 'reels' && <TargetReels active={active} />}
      {which === 'tv' && <TvScreen active={active} />}
    </Suspense>
  )
}
