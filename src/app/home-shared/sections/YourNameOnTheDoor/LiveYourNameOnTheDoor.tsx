import { fetchChefsStores } from '@/features/chefData/services/stores.api'
import { ROUTES } from '@/shared/seo'
import YourNameOnTheDoor from './index'

/**
 * Server gate: renders "Your kitchen, your name on the door" only when the
 * configured back-end returns at least one kitchen (production API = real
 * kitchens). Re-checked every 10 minutes (see STORES_REVALIDATE_SECONDS), so
 * the section appears on its own once the first real kitchen goes live.
 */
export default async function LiveYourNameOnTheDoor() {
  const stores = await fetchChefsStores()
  const first = stores.find((s) => s.storeId.trim())
  if (!first) return null
  return <YourNameOnTheDoor exampleStoreHref={`${ROUTES.kitchens}/${encodeURIComponent(first.storeId.trim())}`} />
}
