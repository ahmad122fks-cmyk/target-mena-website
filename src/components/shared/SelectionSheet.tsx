import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import content from '@/content/selection.json'
import { useDir, useLang, useT } from '@/features/i18n/LangContext'
import { useSelection } from '@/features/selection/store'
import { SelectionActions } from './SelectionActions'
import { SelectionItem } from './SelectionItem'

type Props = { open: boolean; onOpenChange: (open: boolean) => void }

/** "My selection" side panel: the chosen boards, remove/clear, request or share. */
export default function SelectionSheet({ open, onOpenChange }: Props) {
  const t = useT()
  const lang = useLang()
  const dir = useDir()
  const items = useSelection()
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={lang === 'ar' ? 'left' : 'right'}
        dir={dir}
        aria-describedby={undefined}
        className="w-[min(26rem,92vw)] gap-0 bg-white p-0"
      >
        <div className="border-b p-5 pe-14">
          <SheetTitle className="text-xl text-brand-black">
            {t(content.title)} <span className="ltr-run text-brand-blue">({items.length})</span>
          </SheetTitle>
        </div>
        {items.length === 0 ? (
          <p className="p-5">{t(content.empty)}</p>
        ) : (
          <ul className="flex-1 divide-y overflow-y-auto">
            {items.map((item) => (
              <SelectionItem key={item.code} item={item} />
            ))}
          </ul>
        )}
        <SelectionActions items={items} onDone={() => onOpenChange(false)} />
      </SheetContent>
    </Sheet>
  )
}
