import type { StaticImageData } from 'next/image'

// Static imports (fallback logos, placeholders) are objects, not URLs, and are always local.
export function isRemoteImageUrl(src: string | StaticImageData | null | undefined): boolean {
  if (typeof src !== 'string') return false
  return (
    src.startsWith('http://') ||
    src.startsWith('https://') ||
    src.startsWith('//')
  )
}
