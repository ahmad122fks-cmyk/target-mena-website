import { lazy, type ComponentType } from 'react'
import type { ScreenProps } from '@/components/experiences/digital/ScreenShell'
import { SocialCampaign } from '@/components/experiences/SocialCampaign'
import type { TabId } from '../tabs'

type Screen = ComponentType<ScreenProps>

/** A screen whose code loads the first time its tab is picked. */
function later<M>(load: () => Promise<M>, pick: (module: M) => Screen): Screen {
  return lazy(async () => ({ default: pick(await load()) }))
}

/**
 * Phone screen per tab. The default tab (digital campaigns) is part of the
 * prerendered page; the other five load on demand to keep the page light.
 */
export const SCREENS: Record<TabId, Screen> = {
  campaign: SocialCampaign,
  social: later(
    () => import('@/components/experiences/TargetReels'),
    (m) => m.TargetReels,
  ),
  identity: later(
    () => import('@/components/experiences/digital/IdentityScreen'),
    (m) => m.IdentityScreen,
  ),
  uiux: later(
    () => import('@/components/experiences/digital/WireframeScreen'),
    (m) => m.WireframeScreen,
  ),
  '3d': later(
    () => import('@/components/experiences/digital/BlueprintScreen'),
    (m) => m.BlueprintScreen,
  ),
  ai: later(
    () => import('@/components/experiences/digital/AiScreen'),
    (m) => m.AiScreen,
  ),
}
