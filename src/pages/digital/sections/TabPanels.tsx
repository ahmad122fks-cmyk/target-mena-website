import { ToConfirm } from '@/components/shared/ToConfirm'
import { useT } from '@/features/i18n/LangContext'
import hero from '../digital.hero.content.json'
import { TAB_IDS, type TabId } from '../tabs'

/**
 * One panel per tab (all in the HTML, so every service text is indexed);
 * only the picked one shows. Text from the current site's service list.
 */
export function TabPanels({ value }: { value: TabId }) {
  const t = useT()
  return (
    <div className="flex flex-col gap-3">
      {TAB_IDS.map((id, i) => {
        const tab = hero.tabs[i]
        return (
          <div
            key={id}
            role="tabpanel"
            id={`digital-panel-${id}`}
            aria-labelledby={`digital-tab-${id}`}
            hidden={id !== value}
            tabIndex={0}
            className="rounded-[18px] border border-line bg-surface p-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"
          >
            <h2 className="text-xl">{t(tab.title)}</h2>
            <p className="mt-1.5 text-[0.9375rem] leading-[1.8]">{t(tab.text)}</p>
          </div>
        )
      })}
      <ToConfirm what={hero.toConfirm} className="self-start text-xs" />
    </div>
  )
}
