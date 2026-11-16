import { useState } from 'react'
import content from '@/content/experiences.json'
import { useT } from '@/features/i18n/LangContext'
import { useInView, useInterval, usePrefersReducedMotion } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { FloatingBubbles } from './campaign/FloatingBubbles'
import { PlatformGrid } from './campaign/PlatformGrid'
import { PostPreview } from './campaign/PostPreview'
import { ReachChart } from './campaign/ReachChart'
import { campaignStage, FINAL_STEP, nextStep, STEP_MS } from './campaign/stage'
import { StatusPill } from './campaign/StatusPill'
import './campaign/campaign.css'

type Props = { topPad?: number; active?: boolean }

/**
 * A demo digital campaign going live: draft -> scheduled -> live now, the
 * post's formats, platforms publishing one by one, reach growing, reactions
 * floating up. Labelled demo data; no numbers. Reduced motion: the finished
 * campaign as one still frame.
 */
export function SocialCampaign({ topPad = 50, active = true }: Props) {
  const t = useT()
  const c = content.social
  const [rootRef, inView] = useInView<HTMLDivElement>()
  const reduced = usePrefersReducedMotion()
  const live = active && inView
  const [step, setStep] = useState(0)
  useInterval(() => setStep(nextStep), live && !reduced ? STEP_MS : null)
  const shown = reduced ? FINAL_STEP : step
  const stage = campaignStage(shown, c.platforms.length)
  return (
    <div
      ref={rootRef}
      role="region"
      aria-label={t(c.label)}
      className={cn(
        'absolute inset-0 flex flex-col gap-2.5 overflow-hidden bg-[#071a2e] px-3.5 pb-3.5 text-white',
        !live && '[&_*]:[animation-play-state:paused]',
      )}
      style={{ paddingTop: topPad }}
    >
      <div className="flex items-center justify-between">
        <b className="text-[15px]">{t(c.title)}</b>
        <StatusPill status={stage.status} />
      </div>
      <PostPreview format={stage.format} liked={stage.liked} />
      <PlatformGrid step={shown} published={stage.published} />
      <ReachChart growth={stage.growth} />
      {stage.bubbles && !reduced && <FloatingBubbles />}
    </div>
  )
}
