'use client'

import type { ChefStoreDetail } from '@/features'
import StoreFront, { type StoreFrontCategory } from '@/shared/components/sections/StoreFront/StoreFront'

/** "…, Sahibzada Ajit Singh Nagar" → "Mohali"; otherwise the last part of the address. */
function cityFromAddress(address: string): string {
  const a = address.trim()
  if (!a) return 'Mohali'
  if (/sahibzada ajit singh nagar|\bmohali\b|\bsas nagar\b/i.test(a)) return 'Mohali'
  const parts = a.split(',').map((p) => p.trim()).filter(Boolean)
  return parts[parts.length - 1] || a
}

/** Real kitchen page (v2 store design) — every value comes from the back-end. */
export default function KitchenDetailLayout({ store }: { store: ChefStoreDetail }) {
  const categories: StoreFrontCategory[] = store.menuCategories.map((c) => ({
    name: c.categoryName,
    dishes: c.dishes.map((d) => ({
      name: d.dishName,
      description: d.description,
      price: d.price,
      image: d.dishImageUrl || null,
    })),
  }))

  const cuisine =
    store.cuisineLabel ||
    categories
      .filter((c) => c.dishes.length > 0)
      .slice(0, 3)
      .map((c) => c.name)
      .join(' • ')

  return (
    <section id="kitchen-detail-page" className="min-h-screen w-full bg-[#FBF6F0]">
      <div className="mx-auto w-full max-w-[1240px] px-4 pb-16 pt-28 sm:px-6 md:pt-32 lg:px-10">
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
          backHref="/"
        />
      </div>
    </section>
  )
}
