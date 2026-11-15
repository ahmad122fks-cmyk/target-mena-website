import { Section } from '@/components/shared/Section'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { useT } from '@/features/i18n/LangContext'
import content from '../home.content.json'

/** "A full team, not just a board": one centred statement. */
export function Team() {
  const t = useT()
  const { team } = content
  return (
    <Section labelledBy="team-title">
      <SectionHeading
        id="team-title"
        title={t(team.title)}
        lead={t(team.text)}
        center
        className="mx-auto max-w-[820px] gap-5 [&>p]:max-w-none [&>p]:leading-[1.9] lg:[&>p]:text-[1.1875rem]"
      />
    </Section>
  )
}
