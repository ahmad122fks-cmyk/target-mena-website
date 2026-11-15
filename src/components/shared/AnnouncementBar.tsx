import { useLocation } from 'react-router'
import feed from '@/content/feed.json'
import { LATEST } from '@/features/feed/feed'
import { basePath } from '@/features/i18n/lang'
import { useLang, useT } from '@/features/i18n/LangContext'

/** Blue bar above the home header: the newest approved campaign, linking to the feed. */
export function AnnouncementBar() {
  const t = useT()
  const lang = useLang()
  const { pathname } = useLocation()
  if (basePath(pathname) !== '/' || !LATEST?.bar) return null
  return (
    <div className="bg-brand-blue text-white">
      <a
        href="#feed"
        className="mx-auto flex min-h-11 max-w-[1240px] items-center justify-center gap-2.5 px-4 py-2 text-center text-sm hover:underline sm:px-6"
      >
        <span className="shrink-0 rounded-full bg-brand-yellow px-2.5 py-0.5 text-xs font-semibold text-brand-black">
          {t(feed.newLabel)}
        </span>
        <span>
          {t(LATEST.bar)} <span aria-hidden="true">{lang === 'ar' ? '←' : '→'}</span>
        </span>
      </a>
    </div>
  )
}
