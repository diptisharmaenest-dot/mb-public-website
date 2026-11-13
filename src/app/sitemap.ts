import type { MetadataRoute } from 'next'
import { fetchChefsStores } from '@/features/chefData/services/stores.api'
import { ROUTES, absoluteUrl, getSiteUrl } from '@/shared/seo'

const STATIC_PATHS: { path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
  { path: ROUTES.home, changeFrequency: 'weekly', priority: 1 },
  { path: ROUTES.about, changeFrequency: 'monthly', priority: 0.8 },
  { path: ROUTES.kitchens, changeFrequency: 'daily', priority: 0.9 },
  { path: ROUTES.partners, changeFrequency: 'monthly', priority: 0.85 },
  { path: ROUTES.join, changeFrequency: 'monthly', priority: 0.75 },
  { path: ROUTES.faq, changeFrequency: 'monthly', priority: 0.7 },
  { path: ROUTES.contact, changeFrequency: 'monthly', priority: 0.65 },
  { path: ROUTES.privacy, changeFrequency: 'yearly', priority: 0.4 },
  { path: ROUTES.terms, changeFrequency: 'yearly', priority: 0.4 },
  { path: ROUTES.refunds, changeFrequency: 'yearly', priority: 0.4 },
]

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl()
  const lastModified = new Date()

  const entries: MetadataRoute.Sitemap = STATIC_PATHS.map(({ path, changeFrequency, priority }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  }))

  try {
    const stores = await fetchChefsStores()
    for (const store of stores) {
      const storeId = store.storeId.trim()
      if (!storeId) continue
      entries.push({
        url: absoluteUrl(`${ROUTES.kitchens}/${encodeURIComponent(storeId)}`),
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    }
  } catch {
    // Build without API env: static pages only.
  }

  if (!entries.some((e) => e.url === siteUrl.origin || e.url === absoluteUrl('/'))) {
    entries.unshift({
      url: absoluteUrl('/'),
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    })
  }

  return entries
}
