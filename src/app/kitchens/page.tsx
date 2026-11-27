import { fetchChefsStores } from '@/features/chefData/services/stores.api'
import type { ChefStore } from '@/features'
import { JsonLd, ROUTES, absoluteUrl, createPageMetadata } from '@/shared/seo'
import { SHOW_LIVE_KITCHENS } from '@/shared/data/kitchens-launch'
import KitchensPageClient from './KitchensPageClient'

export const metadata = createPageMetadata({
  title: 'Verified kitchens near you',
  description:
    'Browse verified home kitchens on Mother Bhojan. Filter by city and diet — discover chefs near you.',
  path: ROUTES.kitchens,
})

export default async function KitchensPage() {
  let itemListJsonLd: Record<string, unknown> | null = null
  let stores: ChefStore[] = []

  if (SHOW_LIVE_KITCHENS) try {
    stores = await fetchChefsStores()
    const items = stores
      .map((store, index) => {
        const storeId = store.storeId.trim()
        if (!storeId) return null
        return {
          '@type': 'ListItem',
          position: index + 1,
          name: store.storeName,
          url: absoluteUrl(`${ROUTES.kitchens}/${encodeURIComponent(storeId)}`),
        }
      })
      .filter(Boolean)

    if (items.length > 0) {
      itemListJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Mother Bhojan chef stores',
        url: absoluteUrl(ROUTES.kitchens),
        numberOfItems: items.length,
        itemListElement: items,
      }
    }
  } catch {
    // API unavailable at build — page still renders; list schema omitted.
  }

  return (
    <>
      {itemListJsonLd ? <JsonLd data={itemListJsonLd} /> : null}
      <KitchensPageClient initialStores={stores} />
    </>
  )
}
