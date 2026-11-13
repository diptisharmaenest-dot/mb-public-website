import type { StaticImageData } from 'next/image'

/** Image source for cards: bundled asset or remote URL from the API. */
export type ChefStoreImage = string | StaticImageData

/**
 * List item from `GET /api/public/stores` — matches API field names.
 * UI filtering, fallbacks, and display helpers live in `Stores.tsx`.
 */
export type ChefStore = {
  /** Public URL identifier: the store's slug when the API provides one, otherwise the store GUID (legacy). */
  storeId: string
  storeName: string
  address: string
  logoUrl: string
  coverImageUrl: string
  categories: string[]
  overallRating?: number
  storeOwnerName?: string
}

/** One dish under a menu category from store detail API. */
export type StoreDish = {
  dishName: string
  dishImageUrl: string
  description: string
  price: number
  rating: number
  isVeg: boolean
  inventoryAvailable: boolean
  shiftType: string
  prepTime?: string
  badge?: string
  category?: string
}

/** Menu category with dishes from `GET /api/public/stores/{storeGuid}`. */
export type StoreMenuCategory = {
  categoryName: string
  dishes: StoreDish[]
}

/**
 * Full store payload from `GET /api/public/stores/{storeGuid}`.
 * Field names match the API (e.g. `name`, `storeAddress`, nested `categories`).
 */
export type ChefStoreDetail = {
  storeGuid: string
  name: string
  coverImageUrl: string
  logoUrl: string
  description: string | null
  overallRating: number
  storeAddress: string
  storeOwnerName: string
  menuCategories: StoreMenuCategory[]
  reviews: unknown[]
  chefStory?: string
  cuisineLabel?: string
  galleryImages?: string[]
  socialLinks?: { instagram?: string; facebook?: string }
}

