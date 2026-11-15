import { PillButton } from '@/components/shared/PillButton'
import { Section } from '@/components/shared/Section'
import { LANGS, localePath } from '@/features/i18n/lang'
import content from './not-found.content.json'

/**
 * 404 page in both languages at once (one static 404.html serves every
 * unknown URL). The server must send it with HTTP status 404 (DEPLOY.md).
 */
export default function NotFoundPage() {
  return (
    <Section labelledBy="nf-title" tone="ghost">
      <div className="grid gap-10 md:grid-cols-2">
        {LANGS.map((lang) => (
          <div
            key={lang}
            lang={lang}
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
            className="flex flex-col gap-4"
          >
            {lang === 'ar' ? (
              <h1 id="nf-title" className="text-4xl">
                {content.title.ar}
              </h1>
            ) : (
              <p className="text-4xl font-bold text-brand-black">{content.title.en}</p>
            )}
            <p>{content.text[lang]}</p>
            <div className="flex flex-wrap gap-3">
              {content.links.map((item) => (
                <PillButton
                  key={item.path}
                  href={localePath(lang, item.path)}
                  tone={item.path === '/' ? 'blue' : 'white'}
                  className="border border-brand-blue"
                >
                  {item.label[lang]}
                </PillButton>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
