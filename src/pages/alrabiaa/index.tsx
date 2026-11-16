import alrabiaa from '@/assets/clients/alrabiaa.png'
import { ContentPage } from '@/components/shared/ContentPage'
import { useT } from '@/features/i18n/LangContext'
import { AlrabiaaSales } from '@/pages/home/sections/AlrabiaaSales'
import content from './alrabiaa.content.json'
import { AlrabiaaMockup } from './AlrabiaaMockup'

/** Alrabiaa TV (channel colour green): exclusive distributor wording, channels, planner. No prices. */
export default function AlrabiaaPage() {
  const t = useT()
  return (
    <ContentPage
      id="alrabiaa"
      content={content}
      hero={
        <img
          src={alrabiaa}
          width={70}
          height={92}
          alt={t(content.logoAlt)}
          className="mt-2 h-14 w-auto self-start"
        />
      }
    >
      <AlrabiaaSales />
      <AlrabiaaMockup />
    </ContentPage>
  )
}
