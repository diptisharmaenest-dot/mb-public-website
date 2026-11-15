import { fetchChefsStores } from '@/features/chefData/services/stores.api'
import { ROUTES } from '@/shared/seo'
import YourNameOnTheDoor from './index'
import { DEMO_STORE_SLUG } from '@/app/kitchens/demo-store'

/**
 * Server gate: renders "Your kitchen, your name on the door" only when the
 * configured back-end returns at least one kitchen (production API = real
 * kitchens). Re-checked every 10 minutes (see STORES_REVALIDATE_SECONDS), so
 * the section appears on its own once the first real kitchen goes live.
 */
export default async function LiveYourNameOnTheDoor({ design = 'classic' }: { design?: 'classic' | 'v2' }) {
  const stores = await fetchChefsStores()
  // Still shown only once a real kitchen is live.
  if (!stores.some((s) => s.storeId.trim())) return null
  // "See your store" opens the Ananya Kitchen example store in the matching design.
  const href = `${ROUTES.kitchens}/${DEMO_STORE_SLUG}${design === 'v2' ? '?design=v2' : ''}`
  // The kitchen page opens in the same design as the home version it came from.
  return <YourNameOnTheDoor design={design} exampleStoreHref={href} />
}
