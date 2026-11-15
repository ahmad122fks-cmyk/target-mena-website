import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { useDir, useLang } from '@/features/i18n/LangContext'
import { SelectionPanel } from './SelectionPanel'

type Props = { open: boolean; onOpenChange: (open: boolean) => void }

/** "My list" as a sheet (phones, and pages without the finder's side panel). */
export default function SelectionSheet({ open, onOpenChange }: Props) {
  const lang = useLang()
  const dir = useDir()
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={lang === 'ar' ? 'left' : 'right'}
        dir={dir}
        aria-describedby={undefined}
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
