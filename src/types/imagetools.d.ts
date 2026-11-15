/** vite-imagetools `as=picture` import (AVIF + WebP sources, JPEG fallback). */
interface ImagetoolsPicture {
  sources: Record<string, string>
  img: { src: string; w: number; h: number }
}

declare module '*&as=picture' {
  const picture: ImagetoolsPicture
  export default picture
}
