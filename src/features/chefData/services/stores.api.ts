import type { ChefStore, ChefStoreDetail, StoreDish, StoreMenuCategory } from '../models'
import {
  dummyChefsStores,
  featuredKitchens,
  featuredKitchenToStoreDetail,
  getFeaturedKitchenById,
} from '@/app/home/data/featured-kitchens'
import type { RequestOptions } from '@/shared/lib'
import { apiRequest } from '@/shared/lib'
import { ApiUrl } from '@/shared/lib'


const DEFAULT_LOCAL_DEV_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJNb3RoZXJCaG9qYW4iLCJhdWQiOiJwdWJsaWMtd2Vic2l0ZSIsInNjb3BlIjoicHVibGljX2FwaSJ9.uN-EgXHK087McAzKAK2HbQOhAHsZUgkmVlVuo0uoq58'

function bearerHeaders(): HeadersInit {
  const token =
    process.env.NEXT_PUBLIC_PUBLIC_WEBSITE_BEARER_TOKEN?.trim() || DEFAULT_LOCAL_DEV_TOKEN
  if (!token) return {}
  return { Authorization: `Bearer ${token}` }
}

async function storesRequest<T>(path: string, init: RequestOptions = {}): Promise<T> {
  const { headers: callerHeaders, ...rest } = init
  return apiRequest<T>(path, {
    ...rest,
    headers: {
      ...(callerHeaders as Record<string, string> | undefined),
      ...bearerHeaders(),
    },
  })
}

function pickString(obj: Record<string, unknown>, ...keys: string[]): string {
  for (const k of keys) {
    const v = obj[k]
    if (typeof v === 'string') return v.trim()
  }
  return ''
}

function pickNumber(obj: Record<string, unknown>, ...keys: string[]): number {
  for (const k of keys) {
    const v = obj[k]
    if (typeof v === 'number' && Number.isFinite(v)) return v
    if (typeof v === 'string' && v.trim() !== '' && !Number.isNaN(Number(v))) return Number(v)
  }
  return 0
}

function pickStringArray(obj: Record<string, unknown>, ...keys: string[]): string[] {
  for (const k of keys) {
    const v = obj[k]
    if (Array.isArray(v)) {
      const values = v.filter(
        (item): item is string => typeof item === 'string' && item.trim().length > 0,
      )
      if (values.length > 0) return values.map((value) => value.trim())
    }
  }
  return []
}

function unwrapList(raw: unknown): unknown[] {
  if (Array.isArray(raw)) return raw
  if (raw && typeof raw === 'object') {
    const o = raw as Record<string, unknown>
    for (const key of ['data', 'items', 'stores', 'results']) {
      const v = o[key]
      if (Array.isArray(v)) return v
    }
  }
  return []
}

function unwrapSingle(raw: unknown): unknown {
  if (raw === null || raw === undefined) return raw
  if (typeof raw !== 'object' || Array.isArray(raw)) return raw
  const o = raw as Record<string, unknown>
  for (const key of ['data', 'store', 'result', 'item']) {
    const v = o[key]
    if (v && typeof v === 'object' && !Array.isArray(v)) return v
  }
  return raw
}

/** Maps one API row to `ChefStore` (API-shaped). Unknown legacy keys still fill the same shape. */
function parseStoreRow(item: unknown, index: number): ChefStore {
  if (!item || typeof item !== 'object') {
    throw new Error('Invalid store item in API response')
  }
  const o = item as Record<string, unknown>

  // Prefer the slug so public URLs read /kitchens/pinkys-kitchen; the API
  // still resolves legacy GUID links, so GUID fallback keeps old data working.
  const storeId =
    pickString(o, 'storeSlug', 'storeIdentifier', 'slug') ||
    pickString(o, 'storeId', 'storeGuid', 'guid', 'id') ||
    `store-${index}`

  const storeName = pickString(o, 'storeName', 'name', 'title') || 'Store'

  const address = pickString(o, 'address', 'location', 'fullAddress', 'streetAddress', 'city')

  const logoUrl = pickString(o, 'logoUrl', 'avatarUrl', 'profileImageUrl', 'thumbnailUrl')

  const coverImageUrl = pickString(
    o,
    'coverImageUrl',
    'coverUrl',
    'bannerImageUrl',
    'heroImageUrl',
    'imageUrl',
    'photoUrl',
  )

  const categories = pickStringArray(o, 'categories')
  const tagFallback = pickStringArray(o, 'tags')
  const mergedCategories = categories.length > 0 ? categories : tagFallback

  const overallRating = pickNumber(o, 'overallRating', 'rating')
  const storeOwnerName = pickString(o, 'storeOwnerName', 'ownerName', 'cookName')

  return {
    storeId,
    storeName,
    address,
    logoUrl,
    coverImageUrl,
    categories: mergedCategories,
    overallRating: overallRating > 0 ? overallRating : undefined,
    storeOwnerName: storeOwnerName || undefined,
  }
}

function parseDish(raw: unknown): StoreDish | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null
  const o = raw as Record<string, unknown>
  return {
    dishName: pickString(o, 'dishName', 'name') || 'Item',
    dishImageUrl: pickString(o, 'dishImageUrl', 'imageUrl'),
    description: pickString(o, 'description'),
    price: pickNumber(o, 'price'),
    rating: pickNumber(o, 'rating'),
    isVeg: Boolean(o.isVeg),
    inventoryAvailable: o.inventoryAvailable !== false,
    shiftType: pickString(o, 'shiftType'),
  }
}

function parseMenuCategory(raw: unknown): StoreMenuCategory | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null
  const o = raw as Record<string, unknown>
  const categoryName = pickString(o, 'categoryName', 'name') || 'Menu'
  const dishesRaw = o.dishes
  const dishes: StoreDish[] = []
  if (Array.isArray(dishesRaw)) {
    for (const row of dishesRaw) {
      const d = parseDish(row)
      if (d) dishes.push(d)
    }
  }
  return { categoryName, dishes }
}

/**
 * Adds the full menu (`storeDishes`) to the shift-based categories. Shift dishes keep their
 * entry (it carries availability); a menu dish is added under each of its categories unless
 * a dish with the same name is already listed there.
 */
function mergeStoreDishes(menuCategories: StoreMenuCategory[], storeDishesRaw: unknown): void {
  if (!Array.isArray(storeDishesRaw)) return
  for (const row of storeDishesRaw) {
    const dish = parseDish(row)
    if (!dish) continue
    const names = pickStringArray(row as Record<string, unknown>, 'categories')
    for (const categoryName of names.length > 0 ? names : ['Other']) {
      let category = menuCategories.find(
        (c) => c.categoryName.toLowerCase() === categoryName.toLowerCase(),
      )
      if (!category) {
        category = { categoryName, dishes: [] }
        menuCategories.push(category)
      }
      if (!category.dishes.some((d) => d.dishName === dish.dishName)) {
        category.dishes.push(dish)
      }
    }
  }
}

function parseStoreDetailPayload(item: unknown): ChefStoreDetail {
  if (!item || typeof item !== 'object') {
    throw new Error('Invalid store detail response from API')
  }
  const o = item as Record<string, unknown>

  const storeGuid = pickString(o, 'storeGuid', 'guid', 'storeId', 'id')
  const name = pickString(o, 'name', 'storeName') || 'Store'

  const categoriesRaw = o.categories
  const menuCategories: StoreMenuCategory[] = []
  if (Array.isArray(categoriesRaw)) {
    for (const row of categoriesRaw) {
      const cat = parseMenuCategory(row)
      if (cat) menuCategories.push(cat)
    }
  }
  mergeStoreDishes(menuCategories, o.storeDishes)

  const reviewsRaw = o.reviews
  const reviews = Array.isArray(reviewsRaw) ? reviewsRaw : []

  let description: string | null
  if (o.description === null || o.description === undefined) {
    description = null
  } else if (typeof o.description === 'string') {
    const t = o.description.trim()
    description = t.length > 0 ? t : null
  } else {
    description = null
  }

  return {
    storeGuid,
    name,
    coverImageUrl: pickString(o, 'coverImageUrl', 'coverUrl', 'bannerImageUrl'),
    logoUrl: pickString(o, 'logoUrl', 'avatarUrl'),
    description,
    overallRating: pickNumber(o, 'overallRating'),
    storeAddress: pickString(o, 'storeAddress', 'address', 'location'),
    storeOwnerName: pickString(o, 'storeOwnerName', 'ownerName'),
    menuCategories,
    reviews,
  }
}

/** `GET /api/public/stores` */
export async function fetchChefsStores(): Promise<ChefStore[]> {
  try {
    const raw = await storesRequest<unknown>(ApiUrl.publicStoresList)
    const list = unwrapList(raw).map((row, i) => parseStoreRow(row, i))
    return list
  } catch (error) {
    console.warn('[stores.api] Live store list fetch failed, falling back to dummy stores:', error)
    return dummyChefsStores
  }
}

/** `GET /api/public/stores/{idOrSlug}` — accepts store slug (e.g. 'truffles') or store GUID. */
export async function fetchChefStore(idOrSlug: string): Promise<ChefStoreDetail> {
  const raw = await storesRequest<unknown>(
    `${ApiUrl.publicStoresList}/${encodeURIComponent(idOrSlug)}`,
  )
  const item = unwrapSingle(raw)
  return parseStoreDetailPayload(item)
}

export const fetchChefStoreByGuid = fetchChefStore

