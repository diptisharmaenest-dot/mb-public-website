import type { ChefStore, ChefStoreDetail } from '@/features'
import { CHEF_AVATARS } from '@/shared/data/chef-avatars'

export function featuredKitchenToChefStore(kitchen: FeaturedKitchen): ChefStore {
  const categoryTags: string[] = []

  const isNonVeg =
    kitchen.isVeg === false ||
    kitchen.signatureDish.toLowerCase().includes('chicken') ||
    kitchen.signatureDish.toLowerCase().includes('salmon') ||
    kitchen.signatureDish.toLowerCase().includes('jhol') ||
    kitchen.signatureDish.toLowerCase().includes('mutton') ||
    kitchen.signatureDish.toLowerCase().includes('fish')

  if (isNonVeg) {
    categoryTags.push('Non-Veg')
  } else {
    categoryTags.push('Veg')
  }

  if (kitchen.tags && kitchen.tags.length > 0) {
    categoryTags.push(...kitchen.tags)
  }

  if (kitchen.name.toLowerCase().includes('bengal')) categoryTags.push('Bengali')
  if (kitchen.name.toLowerCase().includes('idli')) categoryTags.push('South Indian')
  if (kitchen.name.toLowerCase().includes('bakery')) categoryTags.push('Bakery')
  if (kitchen.name.toLowerCase().includes('punjabi')) categoryTags.push('Punjabi', 'North Indian')

  categoryTags.push(kitchen.signatureDish, ...kitchen.alsoServingItems)

  return {
    storeId: kitchen.storeId,
    storeName: kitchen.name,
    address: kitchen.area,
    logoUrl: kitchen.avatar,
    coverImageUrl: kitchen.image,
    categories: Array.from(new Set(categoryTags)),
  }
}


export type FeaturedKitchen = {
  storeId: string
  name: string
  cookName?: string
  area: string
  quote: string
  signatureDish: string
  alsoServingPrefix: string
  alsoServingItems: string[]
  rating: number
  image: string
  imageAlt: string
  avatar: string
  isVeg?: boolean
  tags?: string[]
}

export function getFeaturedKitchenById(storeId: string): FeaturedKitchen | undefined {
  const id = storeId.trim()
  return featuredKitchens.find((kitchen) => kitchen.storeId === id)
}

/** Maps a static founding-kitchen card to the store-detail page shape. */
export function featuredKitchenToStoreDetail(kitchen: FeaturedKitchen): ChefStoreDetail {
  const alsoDishes = kitchen.alsoServingItems.map((item) => ({
    dishName: item,
    dishImageUrl: kitchen.image,
    description: `${kitchen.alsoServingPrefix} ${item}`,
    price: 0,
    rating: kitchen.rating,
    isVeg: true,
    inventoryAvailable: true,
    shiftType: 'all',
  }))

  return {
    storeGuid: kitchen.storeId,
    name: kitchen.name,
    coverImageUrl: kitchen.image,
    logoUrl: kitchen.avatar,
    description: kitchen.quote,
    overallRating: kitchen.rating,
    storeAddress: kitchen.area,
    storeOwnerName: kitchen.name,
    menuCategories: [
      {
        categoryName: 'Signature',
        dishes: [
          {
            dishName: kitchen.signatureDish,
            dishImageUrl: kitchen.image,
            description: kitchen.quote,
            price: 0,
            rating: kitchen.rating,
            isVeg: true,
            inventoryAvailable: true,
            shiftType: 'all',
          },
          ...alsoDishes,
        ],
      },
    ],
    reviews: [],
  }
}

/** Static founding-kitchen cards — matches wireframe HTML. */
export const featuredKitchens: FeaturedKitchen[] = [
  {
    storeId: 'bakery-hub',
    name: 'Bakery Hub',
    cookName: 'Sunita',
    area: 'Mohali',
    quote: 'Everything baked fresh at dawn — still warm when it reaches you.',
    signatureDish: 'Rajma Chawal',
    alsoServingPrefix: 'Also baking —',
    alsoServingItems: ['Cookies', 'Brownies'],
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Home kitchen — Bakery Hub',
    avatar: CHEF_AVATARS.sunita,
    isVeg: true,
    tags: ['Bakery', 'North Indian'],
  },
  {
    storeId: 'dollys-salad-bar',
    name: "Dolly's Salad Bar",
    cookName: 'Dolly',
    area: 'Chandigarh',
    quote: 'Bright bowls and fresh fruit to start the morning right.',
    signatureDish: 'Avocado & fruit bowl',
    alsoServingPrefix: 'Also serving —',
    alsoServingItems: ['Fresh juices', 'Granola'],
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80&auto=format&fit=crop',
    imageAlt: "Home kitchen — Dolly's Salad Bar",
    avatar: CHEF_AVATARS.dolly,
    isVeg: true,
    tags: ['North Indian'],
  },
  {
    storeId: 'abc-delights',
    name: 'ABC Delights',
    cookName: 'Meena',
    area: 'Panchkula',
    quote: "Clean, home-style plates — cooked like it's for my own family.",
    signatureDish: 'Wild salmon bowl',
    alsoServingPrefix: 'Also serving —',
    alsoServingItems: ['Steamed rice', 'Garden veg'],
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Home kitchen — ABC Delights',
    avatar: CHEF_AVATARS.meena,
    isVeg: false,
    tags: ['North Indian', 'Gujarati'],
  },
  {
    storeId: 'punjabi-rasoi',
    name: 'Punjabi Rasoi',
    cookName: 'Harpreet',
    area: 'Mohali',
    quote: 'Marinated overnight, roasted slow till it falls off the bone.',
    signatureDish: 'Roasted chicken',
    alsoServingPrefix: 'Also cooking —',
    alsoServingItems: ['Butter naan', 'Jeera rice'],
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Home kitchen — Punjabi Rasoi',
    avatar: CHEF_AVATARS.harpreet,
    isVeg: false,
    tags: ['Punjabi', 'North Indian'],
  },
  {
    storeId: 'bengal-bowl',
    name: 'Bengal Bowl',
    area: 'Chandigarh',
    quote: 'Macher jhol the way my mother made it on Sundays.',
    signatureDish: 'Macher jhol',
    alsoServingPrefix: 'Also making —',
    alsoServingItems: ['Luchi', 'Mishti'],
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Home kitchen — Bengal Bowl',
    avatar: CHEF_AVATARS.bengal,
    isVeg: false,
    tags: ['Bengali'],
  },
  {
    storeId: 'idli-house',
    name: 'Idli House',
    area: 'Panchkula',
    quote: 'Idli batter ground fresh every night — no shortcuts.',
    signatureDish: 'Soft steamed idli',
    alsoServingPrefix: 'Also serving —',
    alsoServingItems: ['Sambar', 'Dosa'],
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Home kitchen — Idli House',
    avatar: CHEF_AVATARS.south,
    isVeg: true,
    tags: ['South Indian'],
  },
]

export const dummyChefsStores: ChefStore[] = featuredKitchens.map(featuredKitchenToChefStore)
