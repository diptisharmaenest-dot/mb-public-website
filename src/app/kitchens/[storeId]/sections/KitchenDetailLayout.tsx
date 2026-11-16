'use client'

import type { ChefStoreDetail } from '@/features'
import StoreFront, { type StoreFrontCategory } from '@/shared/components/sections/StoreFront/StoreFront'
import StoreClassicPage from '@/shared/components/sections/StoreFront/StoreClassicPage'
import VariantSwitch from './VariantSwitch'
import { demoStoreSchedule } from '../../demo-store'

/** "…, Sahibzada Ajit Singh Nagar" → "Mohali"; otherwise the last part of the address. */
function cityFromAddress(address: string): string {
  const a = address.trim()
  if (!a) return 'Mohali'
  if (/sahibzada ajit singh nagar|\bmohali\b|\bsas nagar\b/i.test(a)) return 'Mohali'
  const parts = a.split(',').map((p) => p.trim()).filter(Boolean)
  return parts[parts.length - 1] || a
}

/** Real kitchen page (v2 store design) — every value comes from the back-end. */
export default function KitchenDetailLayout({
  store,
  design = 'classic',
  variant = 1,
  isDemo = false,
}: {
  store: ChefStoreDetail
  design?: 'classic' | 'v2'
  variant?: 1 | 2
  isDemo?: boolean
}) {
  const categories: StoreFrontCategory[] = store.menuCategories.map((c) => ({
    name: c.categoryName,
    dishes: c.dishes.map((d) => ({
      name: d.dishName,
      description: d.description,
      price: d.price,
      image: d.dishImageUrl || null,
      available: d.inventoryAvailable,
    })),
  }))

  const cuisine =
    store.cuisineLabel ||
    categories
      .filter((c) => c.dishes.length > 0)
      .slice(0, 3)
      .map((c) => c.name)
      .join(' • ')

  // Only the example store has a schedule; real kitchens: the back-end doesn't send one yet.
  const schedule = isDemo ? demoStoreSchedule : undefined
  const cookName = store.storeOwnerName?.split(' ')[0] || store.name

  return (
    <section id="kitchen-detail-page" className="min-h-screen w-full bg-[#FBF6F0]">
      <div className={design === 'classic' ? 'mx-auto w-full max-w-[1720px] px-4 pb-10 pt-5 sm:px-6 sm:pt-7 lg:px-8' : 'mx-auto w-full max-w-[1240px] px-4 pb-10 pt-5 sm:px-6 sm:pt-7 lg:px-10'}>
        {design === 'classic' ? (
          <StoreClassicPage
            name={store.name}
            byLine={store.storeOwnerName ? `By ${store.storeOwnerName}` : ''}
            description={store.description}
            avatar={store.logoUrl || null}
            cover={store.coverImageUrl || null}
            rating={store.reviews.length > 0 ? { value: store.overallRating, count: store.reviews.length } : null}
            city={cityFromAddress(store.storeAddress)}
            categories={categories}
            backHref="/"
            isDemo={isDemo}
            schedule={schedule}
            cookName={cookName}
          />
        ) : (
          <StoreFront
            mode="page"
            name={store.name}
            cuisine={cuisine || undefined}
            avatar={store.logoUrl || null}
            cover={store.coverImageUrl || null}
            rating={store.reviews.length > 0 ? { value: store.overallRating, count: store.reviews.length } : null}
            city={cityFromAddress(store.storeAddress)}
            deliveryLabel="Home delivery"
            preorderLabel="Freshly cooked to order"
            categories={categories}
            backHref="/homeV2"
            variant={variant}
            isDemo={isDemo}
            ownerName={store.storeOwnerName}
            schedule={schedule}
            cookName={cookName}
          />
        )}
        <VariantSwitch design={design} variant={variant} />
      </div>
    </section>
  )
}
