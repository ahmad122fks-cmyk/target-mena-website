import type { ReactNode } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import type { Picture } from '@/lib/images'
import { Photo } from './Photo'

type Props = {
  picture: Picture
  alt: string
  titleId: string
  title: string
  light?: string
  children: ReactNode
}

/** shadcn Card with an image on top and a two-weight title (bold + light). */
export function ImageCard({ picture, alt, titleId, title, light, children }: Props) {
  return (
    <Card className="gap-0 overflow-hidden py-0 shadow-none">
      <Photo
        picture={picture}
        alt={alt}
        sizes="(min-width: 1024px) 600px, 100vw"
        className="aspect-[16/10] object-cover"
      />
      <CardContent className="flex flex-col gap-4 p-6 sm:p-8">
        <h3 id={titleId} className="text-2xl sm:text-3xl">
          {title}
          {light && ' '}
          {light && <span className="block font-light">{light}</span>}
        </h3>
        {children}
      </CardContent>
    </Card>
  )
}
