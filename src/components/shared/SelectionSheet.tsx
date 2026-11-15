import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import content from '@/content/selection.json'
import { useDir, useLang, useT } from '@/features/i18n/LangContext'
import { SelectionPanel } from './SelectionPanel'

type Props = { open: boolean; onOpenChange: (open: boolean) => void }

/** "My list" as a sheet (phones, and pages without the finder's side panel). */
export default function SelectionSheet({ open, onOpenChange }: Props) {
  const lang = useLang()
  const dir = useDir()
  const t = useT()
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={lang === 'ar' ? 'left' : 'right'}
        dir={dir}
        aria-describedby={undefined}
        closeLabel={t(content.close)}
        className="w-[min(26rem,92vw)] gap-0 bg-white p-0"
      >
        <SelectionPanel
          className="h-full"
          title={(children) => (
            <SheetTitle className="text-lg font-semibold text-brand-black">{children}</SheetTitle>
          )}
        />
      </SheetContent>
    </Sheet>
  )
}
