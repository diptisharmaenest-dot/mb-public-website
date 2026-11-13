import type { Metadata } from 'next'
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE_PATH,
  SITE_NAME,
  SITE_TAGLINE,
  absoluteUrl,
  getSiteUrl,
} from './site'

export type PageMetadataInput = {
  /** Page title without site suffix (root layout template adds `| Mother Bhojan`). */
  title: string
  /** Use for homepage — bypasses the title template. */
  absoluteTitle?: string
  description?: string
  /** Pathname, e.g. `/features` — used for canonical and Open Graph URL. */
  path?: string
  /** Path or absolute URL for share image. */
  image?: string
  noIndex?: boolean
}

function resolveImageUrl(image?: string): string | undefined {
  if (!image) return absoluteUrl(DEFAULT_OG_IMAGE_PATH)
  if (image.startsWith('http://') || image.startsWith('https://')) return image
  return absoluteUrl(image)
}

export function createPageMetadata({
  title,
  absoluteTitle,
  description = DEFAULT_DESCRIPTION,
  path,
  image,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const canonical = path ? absoluteUrl(path) : undefined
  const imageUrl = resolveImageUrl(image)
  const resolvedTitle = absoluteTitle ?? title
  const ogTitle = absoluteTitle ?? `${title} | ${SITE_NAME}`

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: canonical ? { canonical } : undefined,
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title: ogTitle,
      description,
      url: canonical,
      images: imageUrl ? [{ url: imageUrl, alt: resolvedTitle }] : undefined,
    },
    twitter: {
      card: imageUrl ? 'summary_large_image' : 'summary',
      title: ogTitle,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  }
}

/** Root layout defaults — title template, metadataBase, and site-wide tags. */
export function createRootMetadata(): Metadata {
  const metadataBase = getSiteUrl()
  const defaultOgImage = absoluteUrl(DEFAULT_OG_IMAGE_PATH)

  return {
    metadataBase,
    title: {
      default: `${SITE_NAME} — ${SITE_TAGLINE}`,
      template: `%s | ${SITE_NAME}`,
    },
    description: DEFAULT_DESCRIPTION,
    applicationName: SITE_NAME,
    keywords: [
      'home cooked food',
      'sell food online',
      'chef platform',
      'food business',
      'meal prep',
      'independent chefs',
      'Mother Bhojan',
    ],
    alternates: {
      canonical: metadataBase.origin,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: SITE_NAME,
      title: `${SITE_NAME} — ${SITE_TAGLINE}`,
      description: DEFAULT_DESCRIPTION,
      url: metadataBase.origin,
      images: [{ url: defaultOgImage, alt: SITE_NAME }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${SITE_NAME} — ${SITE_TAGLINE}`,
      description: DEFAULT_DESCRIPTION,
      images: [defaultOgImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    icons: {
      icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    },
  }
}
