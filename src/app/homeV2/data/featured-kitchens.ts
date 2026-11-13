import type { ChefStoreDetail } from '@/features'
import { CHEF_AVATARS } from '@/shared/data/chef-avatars'

export type FeaturedKitchen = {
  storeId: string
  name: string
  area: string
  quote: string
  signatureDish: string
  alsoServingPrefix: string
  alsoServingItems: string[]
  rating: number
  image: string
  imageAlt: string
  avatar: string
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
    area: 'Home bakery · Mohali',
    quote: 'Everything baked fresh at dawn — still warm when it reaches you.',
    signatureDish: 'Chocolate fudge cake',
    alsoServingPrefix: 'Also baking —',
    alsoServingItems: ['Cookies', 'Brownies'],
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Home kitchen — Bakery Hub',
    avatar: CHEF_AVATARS.sunita,
  },
  {
    storeId: 'dollys-salad-bar',
    name: "Dolly's Kitchen",
    area: 'Home-style meals · Sector 70, Mohali',
    quote: 'Rajma soaked overnight and simmered slow — the way we make it every Sunday at home.',
    signatureDish: 'Rajma chawal',
    alsoServingPrefix: 'Also serving —',
    alsoServingItems: ['Kadhi', 'Jeera rice'],
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80&auto=format&fit=crop',
    imageAlt: "Home kitchen — Dolly's Kitchen",
    avatar: CHEF_AVATARS.dolly,
  },
  {
    storeId: 'simrans-kitchen',
    name: "Simran's Kitchen",
    area: 'Home-style meals · Phase 7, Mohali',
    quote: 'Chole bhature rolled fresh at breakfast — bhature puff up while you wait.',
    signatureDish: 'Chole bhature',
    alsoServingPrefix: 'Also serving —',
    alsoServingItems: ['Aloo paratha', 'Curd'],
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80&auto=format&fit=crop',
    imageAlt: "Home kitchen — Simran's Kitchen",
    avatar: CHEF_AVATARS.meena,
  },
  {
    storeId: 'punjabi-rasoi',
    name: 'Punjabi Rasoi',
    area: 'North Indian · Sector 68, Mohali',
    quote: 'Marinated overnight, roasted slow till it falls off the bone.',
    signatureDish: 'Roasted chicken',
    alsoServingPrefix: 'Also cooking —',
    alsoServingItems: ['Butter naan', 'Jeera rice'],
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Home kitchen — Punjabi Rasoi',
    avatar: CHEF_AVATARS.harpreet,
  },
  {
    storeId: 'bengal-bowl',
    name: 'Bengal Bowl',
    area: 'Bengali · Sector 91, Mohali',
    quote: 'Macher jhol the way my mother made it on Sundays.',
    signatureDish: 'Macher jhol',
    alsoServingPrefix: 'Also making —',
    alsoServingItems: ['Luchi', 'Mishti'],
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Home kitchen — Bengal Bowl',
    avatar: CHEF_AVATARS.bengal,
  },
  {
    storeId: 'idli-house',
    name: 'Idli House',
    area: 'South Indian · Phase 5, Mohali',
    quote: 'Idli batter ground fresh every night — no shortcuts.',
    signatureDish: 'Soft steamed idli',
    alsoServingPrefix: 'Also serving —',
    alsoServingItems: ['Sambar', 'Dosa'],
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Home kitchen — Idli House',
    avatar: CHEF_AVATARS.south,
  },
]
