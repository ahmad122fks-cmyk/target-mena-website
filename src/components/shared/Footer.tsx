import site from '@/content/site.json'
import { useLink, useT } from '@/features/i18n/LangContext'
import { telHref } from '@/lib/site'
import { Calligraphy } from './Calligraphy'
import { LangSwitch } from './LangSwitch'
import { Logo } from './Logo'

/** Black footer: white logo, contact details, three link columns, blue calligraphy (DESIGN.md 10). */
export function Footer() {
  const t = useT()
  const link = useLink()
  const { footer, contact } = site
  return (
    <footer className="relative overflow-hidden bg-deep text-brand-grey-40">
      <Calligraphy
        mark="b"
        tone="blue"
        className="-end-24 -top-10 w-60 opacity-90 lg:-end-44 lg:-top-14 lg:w-[22rem]"
      />
      <div className="relative mx-auto flex max-w-[1240px] flex-col gap-12 px-4 pt-16 pb-10 sm:px-6 lg:pt-[4.5rem]">
        <div className="flex flex-wrap gap-x-12 gap-y-10">
          <div className="flex flex-[1_1_16rem] flex-col gap-4">
            <Logo tone="white" className="-ms-2 self-start" />
            <address className="flex flex-col text-[0.9375rem] leading-8 not-italic">
              <span>{t(contact.address)}</span>
              {contact.phones.map((phone) => (
                <a
                  key={phone}
                  href={telHref(phone)}
                  className="ltr-run self-start hover:text-white"
                >
                  {phone}
                </a>
              ))}
              <a href={`mailto:${contact.email}`} className="ltr-run self-start hover:text-white">
                {contact.email}
              </a>
            </address>
          </div>
          {footer.columns.map((column) => (
            <nav
              key={column.title.en}
              aria-label={t(column.title)}
              className="flex flex-[0_1_11rem] flex-col gap-1 text-[0.9375rem]"
            >
              <p className="mb-1 text-[1.0625rem] font-semibold text-white">{t(column.title)}</p>
              {column.links.map((item) => (
                <a
                  key={item.label.en}
                  href={link(item.path)}
                  className="inline-flex min-h-10 items-center self-start hover:text-white"
                >
                  {t(item.label)}
                </a>
              ))}
            </nav>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-5 text-[0.8125rem] text-brand-grey-60">
          <span>{t(footer.rights)}</span>
          <nav aria-label={t(footer.footerNav)} className="flex items-center gap-1">
            <a
              href={link(footer.privacy.path)}
              className="inline-flex min-h-11 items-center px-2 hover:text-white"
            >
              {t(footer.privacy.label)}
            </a>
            <LangSwitch className="font-normal hover:text-white" />
          </nav>
        </div>
      </div>
    </footer>
  )
}
