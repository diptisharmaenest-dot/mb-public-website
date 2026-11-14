/** Public marketing site configuration for metadata, sitemap, and JSON-LD. */
export const SITE_NAME = 'Mother Bhojan'

export const SITE_TAGLINE = 'Verified home food from women home cooks near you'

/** Cities where Mother Bhojan currently delivers. */
export const SERVICE_CITIES = ['Mohali'] as const

export const DEFAULT_DESCRIPTION =
  'Mother Bhojan is a verified home-kitchen marketplace: women cook in their own kitchens and families nearby order real ghar ka khaana — starting in Mohali.'

/** Default OG/Twitter image (absolute URL resolved via metadataBase). */
export const DEFAULT_OG_IMAGE_PATH = '/assets/images/logo-red.png'

export const ROUTES = {
  home: '/',
  homev2: '/homeV2',
  homev3: '/homeV3',
  about: '/about',
  kitchens: '/kitchens',
  partners: '/partners',
  join: '/join',
  faq: '/faq',
  contact: '/contact',
  privacy: '/privacy',
  terms: '/terms',
  refunds: '/refunds',
} as const

/** Production canonical origin — set in `.env.production` as `NEXT_PUBLIC_SITE_URL`. */
export function getSiteUrl(): URL {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').trim()
  const normalized = raw.replace(/\/+$/, '')
  return new URL(normalized)
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl()
  if (!path || path === '/') return base.origin
  return new URL(path.startsWith('/') ? path : `/${path}`, base).toString()
}
