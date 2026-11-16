import site from '@/content/site.json'
import { useLink, useT } from '@/features/i18n/LangContext'
import { telHref } from '@/lib/site'
import { LangSwitch } from './LangSwitch'
import { Logo } from './Logo'

/** Light footer (v3, #F5FAFA): the theme's logo, exact contact details, three link columns (DESIGN.md 10). */
export function Footer() {
  const t = useT()
  const link = useLink()
  const { footer, contact } = site
  return (
    <footer className="border-t border-line bg-brand-ghost text-brand-text dark:bg-deep">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-10 px-4 pt-14 pb-8 sm:px-6">
        <div className="flex flex-wrap gap-x-12 gap-y-10">
          <div className="flex flex-[1_1_16rem] flex-col gap-4">
            <Logo className="-ms-2 self-start" />
            <address className="flex flex-col text-[0.9375rem] leading-8 not-italic">
              <span>{t(contact.address)}</span>
              {contact.phones.map((phone) => (
                <a key={phone} href={telHref(phone)} className="ltr-run self-start hover:text-link">
                  {phone}
                </a>
              ))}
              <a
                href={`mailto:${contact.email}`}
                className="ltr-run self-start text-link hover:underline"
              >
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
              <p className="mb-1 text-base font-semibold text-ink">{t(column.title)}</p>
              {column.links.map((item) => (
                <a
                  key={item.label.en}
                  href={link(item.path)}
                  className="inline-flex min-h-10 items-center self-start hover:text-link"
                >
                  {t(item.label)}
                </a>
              ))}
            </nav>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5 text-[0.8125rem]">
          <span>{t(footer.rights)}</span>
          <nav aria-label={t(footer.footerNav)} className="flex items-center gap-1">
            <a
              href={link(footer.privacy.path)}
              className="inline-flex min-h-11 items-center px-2 hover:text-link"
            >
              {t(footer.privacy.label)}
            </a>
            <LangSwitch className="font-normal hover:text-link" />
          </nav>
        </div>
      </div>
    </footer>
  )
}
