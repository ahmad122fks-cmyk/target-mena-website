const POSTS = ['bg-brand-blue', 'bg-brand-yellow', 'bg-brand-green']

/** Creative & digital: a small phone on the soft green panel whose feed scrolls. */
export function DigitalArt() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-[140px] w-[78px] overflow-hidden rounded-2xl border-[2.5px] border-brand-black bg-white p-1">
        <div className="h-full overflow-hidden rounded-[11px]">
          <div className="flex h-[300%] animate-[feed-scroll_6s_cubic-bezier(.6,0,.2,1)_infinite] flex-col">
            {POSTS.map((tone) => (
              <span key={tone} className={`block flex-1 ${tone}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
