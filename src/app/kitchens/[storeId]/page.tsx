import { cache } from 'react'
import { notFound } from 'next/navigation'
import { fetchChefStore, fetchChefStoreByGuid, fetchChefsStores } from '@/features/chefData/services/stores.api'
import type { ChefStoreDetail } from '@/features'
import {
  DEFAULT_CHEF_STORY,
  buildKitchenGalleryImages,
} from '@/app/home/data/featured-kitchens'
import {
  JsonLd,
  ROUTES,
  SITE_NAME,
  absoluteUrl,
  createPageMetadata,
} from '@/shared/seo'
import KitchenDetailLayout from './sections/KitchenDetailLayout'

const loadStoreDetail = cache(async (idOrSlug: string) => fetchChefStore(idOrSlug))

function mergeStaticStoreParams(apiParams: { storeId: string }[]): { storeId: string }[] {
  const ids = new Set<string>()
  const merged: { storeId: string }[] = []

  for (const param of apiParams) {
    if (!param.storeId || ids.has(param.storeId)) continue
    ids.add(param.storeId)
    merged.push(param)
  }

  return merged.length > 0 ? merged : [{ storeId: 'placeholder' }]
}

async function loadKitchenStaticParams(): Promise<{ storeId: string }[]> {
  try {
    const stores = await fetchChefsStores()
    const params = stores
      .map((s) => s.storeId.trim())
      .filter(Boolean)
      .map((storeId) => ({ storeId }))
    return mergeStaticStoreParams(params)
  } catch {
    return mergeStaticStoreParams([])
  }
}

async function resolveStoreDetail(storeId: string): Promise<ChefStoreDetail | null> {
  // 1. Try fetching live store data from the API first (works for slugs like 'truffles' and store GUIDs)
  try {
    const store = await loadStoreDetail(storeId)
    if (store) {
      return {
        ...store,
        chefStory: store.chefStory || DEFAULT_CHEF_STORY,
        cuisineLabel: store.cuisineLabel || 'North Indian · Pure Veg',
        galleryImages: buildKitchenGalleryImages(store.galleryImages),
        socialLinks: store.socialLinks || {
          instagram: 'https://instagram.com',
          facebook: 'https://facebook.com',
        },
      }
    }
  } catch (err) {
    console.warn(`[resolveStoreDetail] Could not load store '${storeId}' from live API:`, err)
  }

  // No sample-kitchen fallback — unknown or unreachable stores show "not found".
  return null
}

/** Required for `output: 'export'`: pre-render one HTML file per store at build time. */
export const dynamicParams = true

export function generateStaticParams() {
  return loadKitchenStaticParams()
}

function storeDescription(name: string, address: string, description: string | null): string {
  const trimmed = description?.trim()
  if (trimmed) return trimmed.slice(0, 160)
  const location = address.trim()
  if (location) {
    return `Order home-cooked food from ${name} on ${SITE_NAME}. Located at ${location}. Browse the menu and place your order online.`
  }
  return `Order home-cooked food from ${name} on ${SITE_NAME}. Browse the menu, ratings, and place your order online.`
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ storeId: string }>
}) {
  const { storeId } = await params
  const id = decodeURIComponent(storeId).trim()
  if (!id) {
    return createPageMetadata({ title: 'Store', path: `${ROUTES.kitchens}/` })
  }
  try {
    const store = await resolveStoreDetail(id)
    if (!store) {
      return createPageMetadata({
        title: 'Store',
        path: `${ROUTES.kitchens}/${encodeURIComponent(id)}`,
      })
    }
    const path = `${ROUTES.kitchens}/${encodeURIComponent(id)}`
    return createPageMetadata({
      title: store.name,
      description: storeDescription(store.name, store.storeAddress, store.description),
      path,
      image: store.coverImageUrl || store.logoUrl || undefined,
    })
  } catch {
    return createPageMetadata({
      title: 'Store',
      path: `${ROUTES.kitchens}/${encodeURIComponent(id)}`,
    })
  }
}

export default async function StoreDetail({
  params,
}: {
  params: Promise<{ storeId: string }>
}) {
  const { storeId } = await params
  const id = decodeURIComponent(storeId).trim()
  if (!id) notFound()

  const store = await resolveStoreDetail(id)
  if (!store) notFound()

  const storeUrl = absoluteUrl(`${ROUTES.kitchens}/${encodeURIComponent(id)}`)
  const kitchensListingUrl = absoluteUrl(ROUTES.kitchens)
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
      { '@type': 'ListItem', position: 2, name: 'Kitchens', item: kitchensListingUrl },
      { '@type': 'ListItem', position: 3, name: store.name, item: storeUrl },
    ],
  }
  const restaurantJsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: store.name,
    url: storeUrl,
    image: store.coverImageUrl || store.logoUrl || undefined,
    description: store.description?.trim() || undefined,
    address: store.storeAddress.trim()
      ? { '@type': 'PostalAddress', streetAddress: store.storeAddress }
      : undefined,
  }

  if (store.overallRating > 0) {
    restaurantJsonLd.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: store.overallRating,
      bestRating: 5,
      worstRating: 1,
    }
  }

  return (
    <div>
      <JsonLd data={[breadcrumbJsonLd, restaurantJsonLd]} />
      <KitchenDetailLayout store={store} />
    </div>
  )
}

