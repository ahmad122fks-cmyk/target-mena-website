import { Photo } from '@/components/shared/Photo'
import { ART } from '@/lib/images'

const POSTS = ['bg-brand-blue', 'bg-brand-yellow', 'bg-brand-green']

/** Creative & digital: the catalog artwork behind a small phone whose feed scrolls. */
export function DigitalArt() {
  return (
    <>
      <div className="absolute inset-0 opacity-55">
        <Photo picture={ART.creative} alt="" sizes="260px" className="h-full w-full object-cover" />
      </div>
      <div className="absolute top-[18px] left-1/2 h-[140px] w-[92px] -translate-x-1/2 overflow-hidden rounded-[18px] border-[2.5px] border-brand-black bg-white p-[5px]">
        <div className="h-full overflow-hidden rounded-[13px]">
          <div className="flex h-[300%] flex-col animate-[feed-scroll_6s_cubic-bezier(.6,0,.2,1)_infinite]">
            {POSTS.map((tone) => (
              <span key={tone} className={`block flex-1 ${tone}`} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
