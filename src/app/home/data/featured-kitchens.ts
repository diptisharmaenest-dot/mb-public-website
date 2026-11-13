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
  /** Optional kitchen gallery overrides; falls back to default dish photos. */
  galleryImages?: string[]
  isVeg?: boolean
  tags?: string[]
}

export function getFeaturedKitchenById(storeId: string): FeaturedKitchen | undefined {
  const id = storeId.trim()
  return featuredKitchens.find((kitchen) => kitchen.storeId === id)
}

export const DEFAULT_CHEF_STORY =
  "I grew up watching my mother and grandmother cook traditional meals in our family kitchen in Mohali. Cooking has been my passion for over 15 years, and every recipe I prepare carries generations of family heritage. Every morning, I hand-select fresh local ingredients, authentic spices, and pure ghee to craft wholesome meals from scratch. My kitchen strictly adheres to Mother Bhojan's 80-point hygiene audit, ensuring zero artificial preservatives, 100% fresh preparation, and complete transparency. For me, home-cooked food is not just a meal—it is a gesture of love, warmth, and care that brings families together around the dining table."

/** Wikimedia / Unsplash helper for fast CDN image delivery. */
const U = (id: string) =>
  `https://images.unsplash.com/${id}?w=800&q=80&auto=format&fit=crop`

const DISH = {
  rajma: U('photo-1546833999-b9f581a1996d'),
  paratha: U('photo-1626777552726-4a6b54c97e46'),
  dalMakhani: U('photo-1585937421612-70a008356fbe'),
  chole: U('photo-1565557623262-b51c2513a641'),
  palakPaneer: U('photo-1601050690597-df0568f70950'),
  kadhi: U('photo-1546833999-b9f581a1996d'),
  jeeraAloo: U('photo-1589301760014-d929f3979dbc'),
  thali: U('photo-1610192244261-3f33de3f55e4'),
  roti: U('photo-1626777552726-4a6b54c97e46'),
  poha: U('photo-1589301760014-d929f3979dbc'),
  shahiPaneer: U('photo-1601050690597-df0568f70950'),
  dalTadka: U('photo-1585937421612-70a008356fbe'),
  samosa: U('photo-1601050690597-df0568f70950'),
  paneerPakoda: U('photo-1601050690597-df0568f70950'),
  lassi: U('photo-1551024709-8f23befc6f87'),
  chaas: U('photo-1551024709-8f23befc6f87'),
  butterChicken: U('photo-1603894584373-5ac82b2ae398'),
  chickenBiryani: U('photo-1563379091339-03b21ab4a4f8'),
  eggCurry: U('photo-1599487488170-d11ec9c172f0'),
  fishCurry: U('photo-1534422298391-e4f8c172dddb'),
  chickenKebab: U('photo-1599487488170-d11ec9c172f0'),
  muttonCurry: U('photo-1546833999-b9f581a1996d'),
  eggBhurji: U('photo-1599487488170-d11ec9c172f0'),
  chickenKeemaPav: U('photo-1603894584373-5ac82b2ae398'),
  nonVegThali: U('photo-1610192244261-3f33de3f55e4'),
} as const

/** Dish-name → matching food photo (keyed by lowercase name without portion suffix). */
const DISH_IMAGES: Record<string, string> = {
  'rajma chawal': DISH.rajma,
  'stuffed paratha': DISH.paratha,
  'aloo paratha': DISH.paratha,
  'dal makhani': DISH.dalMakhani,
  'chole chawal': DISH.chole,
  'palak paneer': DISH.palakPaneer,
  'kadhi chawal': DISH.kadhi,
  'jeera aloo': DISH.jeeraAloo,
  'mix veg thali': DISH.thali,
  'tawa roti': DISH.roti,
  'poha with peanuts': DISH.poha,
  'shahi paneer': DISH.shahiPaneer,
  'yellow dal tadka': DISH.dalTadka,
  'special executive thali': DISH.thali,
  'mini ghar thali': DISH.thali,
  samosa: DISH.samosa,
  'paneer pakoda': DISH.paneerPakoda,
  'fresh sweet lassi': DISH.lassi,
  'masala chaas': DISH.chaas,
  'butter chicken': DISH.butterChicken,
  'chicken biryani': DISH.chickenBiryani,
  'egg curry': DISH.eggCurry,
  'fish curry': DISH.fishCurry,
  'chicken seekh kebab': DISH.chickenKebab,
  'mutton curry': DISH.muttonCurry,
  'egg bhurji': DISH.eggBhurji,
  'non-veg thali': DISH.nonVegThali,
  'chicken keema pav': DISH.chickenKeemaPav,
}

/** Resolve a menu image by dish name. Falls back to keyword match, then default thali. */
export function imageForDish(dishName: string, fallback?: string): string {
  if (fallback && fallback.trim().length > 0) {
    return fallback.trim()
  }

  const normalized = dishName
    .toLowerCase()
    .replace(/\s*\([^)]*\)\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  if (DISH_IMAGES[normalized]) return DISH_IMAGES[normalized]

  const keywordOrder: [string, string][] = [
    ['butter chicken', DISH.butterChicken],
    ['chicken biryani', DISH.chickenBiryani],
    ['chicken seekh', DISH.chickenKebab],
    ['chicken keema', DISH.chickenKeemaPav],
    ['keema pav', DISH.chickenKeemaPav],
    ['non-veg thali', DISH.nonVegThali],
    ['non veg thali', DISH.nonVegThali],
    ['mutton', DISH.muttonCurry],
    ['egg bhurji', DISH.eggBhurji],
    ['egg curry', DISH.eggCurry],
    ['fish', DISH.fishCurry],
    ['chicken', DISH.butterChicken],
    ['egg', DISH.eggCurry],
    ['rajma', DISH.rajma],
    ['dal makhani', DISH.dalMakhani],
    ['paneer pakoda', DISH.paneerPakoda],
    ['shahi paneer', DISH.shahiPaneer],
    ['palak', DISH.palakPaneer],
    ['paratha', DISH.paratha],
    ['chole', DISH.chole],
    ['kadhi', DISH.kadhi],
    ['jeera aloo', DISH.jeeraAloo],
    ['dal tadka', DISH.dalTadka],
    ['dal', DISH.dalTadka],
    ['thali', DISH.thali],
    ['roti', DISH.roti],
    ['poha', DISH.poha],
    ['samosa', DISH.samosa],
    ['pakoda', DISH.paneerPakoda],
    ['paneer', DISH.shahiPaneer],
    ['lassi', DISH.lassi],
    ['chaas', DISH.chaas],
  ]

  for (const [keyword, url] of keywordOrder) {
    if (normalized.includes(keyword)) return url
  }

  return fallback || DISH.thali
}

/**
 * Default kitchen gallery — modern chef kitchen / workspace only (no village, no plated dishes).
 * Brand local shots first, then urban Indian home kitchens + modern interiors.
 */
export const DEFAULT_KITCHEN_GALLERY_IMAGES: string[] = [
  '/images/young_sunita_sharma.png',
  '/images/care-timeline/step-you-order.png',
  '/images/care-timeline/step-cooked.png',
  '/images/care-timeline/step-packed.png',
  '/images/care-timeline/step-order-received.png',
  U('photo-1556912173-46c336c7fd55'),
  U('photo-1556911220-bff31c812dba'),
  U('photo-1484154218962-a197022b5858'),
  U('photo-1556909172-54557c7e4fb7'),
  U('photo-1588854337236-6889d631faa8'),
]

/** Build kitchen gallery from optional extras + defaults (deduped). No dish covers. */
export function buildKitchenGalleryImages(extras?: string[] | null): string[] {
  const extraUrls = (extras ?? [])
    .map((u) => u?.trim())
    .filter((u): u is string => Boolean(u))
  return Array.from(new Set([...extraUrls, ...DEFAULT_KITCHEN_GALLERY_IMAGES]))
}

/** Maps a static founding-kitchen card to the store-detail page shape. */
export function featuredKitchenToStoreDetail(kitchen: FeaturedKitchen): ChefStoreDetail {
  const signatureDishes = [
    {
      dishName: 'Rajma Chawal',
      dishImageUrl: imageForDish('Rajma Chawal'),
      description: 'Kidney beans curry with steamed rice, just like ghar ka khana.',
      price: 149,
      rating: 4.9,
      isVeg: true,
      inventoryAvailable: true,
      shiftType: 'Lunch',
      prepTime: '30 min',
      badge: 'Bestseller',
      category: 'Lunch',
    },
    {
      dishName: 'Butter Chicken',
      dishImageUrl: imageForDish('Butter Chicken'),
      description: 'Tender chicken in a silky tomato-butter gravy, home-style.',
      price: 229,
      rating: 4.9,
      isVeg: false,
      inventoryAvailable: true,
      shiftType: 'Dinner',
      prepTime: '35 min',
      badge: 'Bestseller',
      category: 'Dinner',
    },
    {
      dishName: 'Stuffed Paratha',
      dishImageUrl: imageForDish('Stuffed Paratha'),
      description: 'Aloo paratha with curd, pickle and homemade butter.',
      price: 129,
      rating: 4.8,
      isVeg: true,
      inventoryAvailable: true,
      shiftType: 'Breakfast',
      prepTime: '25 min',
      badge: "Chef's Pick",
      category: 'Breakfast',
    },
    {
      dishName: 'Dal Makhani',
      dishImageUrl: imageForDish('Dal Makhani'),
      description: 'Slow cooked overnight for rich and creamy taste.',
      price: 139,
      rating: 4.9,
      isVeg: true,
      inventoryAvailable: true,
      shiftType: 'Dinner',
      prepTime: '30 min',
      badge: 'Bestseller',
      category: 'Dinner',
    },
  ]

  const lunchDishes = [
    {
      dishName: 'Chole Chawal',
      dishImageUrl: imageForDish('Chole Chawal'),
      description: 'Chickpea curry with steamed rice, onion salad & pickle.',
      price: 149,
      rating: 4.8,
      isVeg: true,
      inventoryAvailable: true,
      shiftType: 'Lunch',
      prepTime: '30 min',
      category: 'Lunch',
    },
    {
      dishName: 'Palak Paneer',
      dishImageUrl: imageForDish('Palak Paneer'),
      description: 'Cottage cheese in creamy spinach gravy.',
      price: 169,
      rating: 4.7,
      isVeg: true,
      inventoryAvailable: true,
      shiftType: 'Lunch',
      prepTime: '30 min',
      category: 'Lunch',
    },
    {
      dishName: 'Kadhi Chawal',
      dishImageUrl: imageForDish('Kadhi Chawal'),
      description: 'Punjabi kadhi with jeera rice, papad & pickle.',
      price: 139,
      rating: 4.8,
      isVeg: true,
      inventoryAvailable: true,
      shiftType: 'Lunch',
      prepTime: '30 min',
      category: 'Lunch',
    },
    {
      dishName: 'Jeera Aloo',
      dishImageUrl: imageForDish('Jeera Aloo'),
      description: 'Cumin flavoured potato sabzi (dry).',
      price: 99,
      rating: 4.6,
      isVeg: true,
      inventoryAvailable: true,
      shiftType: 'Lunch',
      prepTime: '20 min',
      category: 'Lunch',
    },
    {
      dishName: 'Mix Veg Thali',
      dishImageUrl: imageForDish('Mix Veg Thali'),
      description: '2 sabzi, dal, rice, roti, salad, pickle.',
      price: 199,
      rating: 4.9,
      isVeg: true,
      inventoryAvailable: true,
      shiftType: 'Lunch',
      prepTime: '35 min',
      category: 'Thalis',
    },
    {
      dishName: 'Tawa Roti (4 pcs)',
      dishImageUrl: imageForDish('Tawa Roti'),
      description: 'Soft whole wheat rotis made with desi ghee.',
      price: 40,
      rating: 4.9,
      isVeg: true,
      inventoryAvailable: true,
      shiftType: 'Lunch',
      prepTime: '15 min',
      category: 'Lunch',
    },
    {
      dishName: 'Chicken Biryani',
      dishImageUrl: imageForDish('Chicken Biryani'),
      description: 'Fragrant basmati rice layered with spiced chicken, dum-cooked.',
      price: 219,
      rating: 4.8,
      isVeg: false,
      inventoryAvailable: true,
      shiftType: 'Lunch',
      prepTime: '40 min',
      badge: 'Bestseller',
      category: 'Lunch',
    },
    {
      dishName: 'Egg Curry',
      dishImageUrl: imageForDish('Egg Curry'),
      description: 'Boiled eggs simmered in onion-tomato masala with steamed rice.',
      price: 149,
      rating: 4.7,
      isVeg: false,
      inventoryAvailable: true,
      shiftType: 'Lunch',
      prepTime: '25 min',
      category: 'Lunch',
    },
  ]

  const breakfastDishes = [
    {
      dishName: 'Aloo Paratha (2 pcs)',
      dishImageUrl: imageForDish('Aloo Paratha'),
      description: 'Stuffed potato flatbread with fresh curd & butter.',
      price: 110,
      rating: 4.8,
      isVeg: true,
      inventoryAvailable: true,
      shiftType: 'Breakfast',
      prepTime: '20 min',
      category: 'Breakfast',
    },
    {
      dishName: 'Poha with Peanuts',
      dishImageUrl: imageForDish('Poha with Peanuts'),
      description: 'Flattened rice tempered with mustard, curry leaves & roasted peanuts.',
      price: 80,
      rating: 4.7,
      isVeg: true,
      inventoryAvailable: true,
      shiftType: 'Breakfast',
      prepTime: '15 min',
      category: 'Breakfast',
    },
    {
      dishName: 'Egg Bhurji',
      dishImageUrl: imageForDish('Egg Bhurji'),
      description: 'Spiced scrambled eggs with onion, tomato & green chilli. Served with pav.',
      price: 99,
      rating: 4.8,
      isVeg: false,
      inventoryAvailable: true,
      shiftType: 'Breakfast',
      prepTime: '15 min',
      badge: "Chef's Pick",
      category: 'Breakfast',
    },
  ]

  const dinnerDishes = [
    {
      dishName: 'Shahi Paneer',
      dishImageUrl: imageForDish('Shahi Paneer'),
      description: 'Rich royal cottage cheese curry in cashew-tomato gravy.',
      price: 189,
      rating: 4.9,
      isVeg: true,
      inventoryAvailable: true,
      shiftType: 'Dinner',
      prepTime: '30 min',
      category: 'Dinner',
    },
    {
      dishName: 'Yellow Dal Tadka',
      dishImageUrl: imageForDish('Yellow Dal Tadka'),
      description: 'Tempered arhar dal with garlic, cumin, and ghee.',
      price: 129,
      rating: 4.8,
      isVeg: true,
      inventoryAvailable: true,
      shiftType: 'Dinner',
      prepTime: '25 min',
      category: 'Dinner',
    },
    {
      dishName: 'Mutton Curry',
      dishImageUrl: imageForDish('Mutton Curry'),
      description: 'Slow-cooked mutton on the bone with whole spices — Sunday special.',
      price: 279,
      rating: 4.8,
      isVeg: false,
      inventoryAvailable: true,
      shiftType: 'Dinner',
      prepTime: '45 min',
      category: 'Dinner',
    },
    {
      dishName: 'Fish Curry',
      dishImageUrl: imageForDish('Fish Curry'),
      description: 'Fresh river fish in a tangy mustard-coconut gravy.',
      price: 249,
      rating: 4.7,
      isVeg: false,
      inventoryAvailable: true,
      shiftType: 'Dinner',
      prepTime: '35 min',
      category: 'Dinner',
    },
  ]

  const thaliDishes = [
    {
      dishName: 'Special Executive Thali',
      dishImageUrl: imageForDish('Special Executive Thali'),
      description: 'Paneer sabzi, seasonal veg, dal makhani, 4 rotis, jeera rice, sweet dish.',
      price: 249,
      rating: 4.9,
      isVeg: true,
      inventoryAvailable: true,
      shiftType: 'Lunch',
      prepTime: '35 min',
      category: 'Thalis',
    },
    {
      dishName: 'Mini Ghar Thali',
      dishImageUrl: imageForDish('Mini Ghar Thali'),
      description: '1 sabzi, dal tadka, 3 rotis, plain rice, pickle.',
      price: 169,
      rating: 4.7,
      isVeg: true,
      inventoryAvailable: true,
      shiftType: 'Lunch',
      prepTime: '25 min',
      category: 'Thalis',
    },
    {
      dishName: 'Non-Veg Thali',
      dishImageUrl: imageForDish('Non-Veg Thali'),
      description: 'Butter chicken, dal, 4 rotis, jeera rice, salad & pickle.',
      price: 299,
      rating: 4.9,
      isVeg: false,
      inventoryAvailable: true,
      shiftType: 'Lunch',
      prepTime: '40 min',
      badge: 'Bestseller',
      category: 'Thalis',
    },
  ]

  const snackDishes = [
    {
      dishName: 'Samosa (2 pcs)',
      dishImageUrl: imageForDish('Samosa'),
      description: 'Crispy fried pastry filled with spiced potatoes and green peas.',
      price: 50,
      rating: 4.8,
      isVeg: true,
      inventoryAvailable: true,
      shiftType: 'Snacks',
      prepTime: '15 min',
      category: 'Snacks',
    },
    {
      dishName: 'Paneer Pakoda',
      dishImageUrl: imageForDish('Paneer Pakoda'),
      description: 'Deep-fried spiced cottage cheese fritters.',
      price: 120,
      rating: 4.7,
      isVeg: true,
      inventoryAvailable: true,
      shiftType: 'Snacks',
      prepTime: '20 min',
      category: 'Snacks',
    },
    {
      dishName: 'Chicken Seekh Kebab',
      dishImageUrl: imageForDish('Chicken Seekh Kebab'),
      description: 'Minced chicken kebabs grilled with garam masala & herbs (4 pcs).',
      price: 179,
      rating: 4.8,
      isVeg: false,
      inventoryAvailable: true,
      shiftType: 'Snacks',
      prepTime: '25 min',
      badge: "Chef's Pick",
      category: 'Snacks',
    },
    {
      dishName: 'Chicken Keema Pav',
      dishImageUrl: imageForDish('Chicken Keema Pav'),
      description: 'Spiced minced chicken with soft buttered pav — evening favourite.',
      price: 159,
      rating: 4.7,
      isVeg: false,
      inventoryAvailable: true,
      shiftType: 'Snacks',
      prepTime: '20 min',
      category: 'Snacks',
    },
  ]

  const drinkDishes = [
    {
      dishName: 'Fresh Sweet Lassi',
      dishImageUrl: imageForDish('Fresh Sweet Lassi'),
      description: 'Traditional Punjabi sweet yogurt drink topped with malai.',
      price: 60,
      rating: 4.9,
      isVeg: true,
      inventoryAvailable: true,
      shiftType: 'Drinks',
      prepTime: '5 min',
      category: 'Drinks',
    },
    {
      dishName: 'Masala Chaas',
      dishImageUrl: imageForDish('Masala Chaas'),
      description: 'Refreshing spiced buttermilk with mint and roasted cumin.',
      price: 40,
      rating: 4.8,
      isVeg: true,
      inventoryAvailable: true,
      shiftType: 'Drinks',
      prepTime: '5 min',
      category: 'Drinks',
    },
  ]

  return {
    storeGuid: kitchen.storeId,
    name: kitchen.cookName ? `Chef ${kitchen.cookName}'s Kitchen` : kitchen.name,
    coverImageUrl: kitchen.image,
    logoUrl: kitchen.avatar,
    description: kitchen.quote,
    overallRating: kitchen.rating,
    storeAddress: `${kitchen.area}, Punjab`,
    storeOwnerName: kitchen.cookName || kitchen.name,
    cuisineLabel:
      kitchen.tags?.join(' · ') ||
      (kitchen.isVeg === false ? 'North Indian · Veg & Non-Veg' : 'North Indian · Pure Veg'),
    chefStory: DEFAULT_CHEF_STORY,
    galleryImages: buildKitchenGalleryImages(kitchen.galleryImages),
    socialLinks: {
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
    },
    menuCategories: [
      {
        categoryName: 'Signature',
        dishes: signatureDishes,
      },
      {
        categoryName: 'Lunch',
        dishes: lunchDishes,
      },
      {
        categoryName: 'Breakfast',
        dishes: breakfastDishes,
      },
      {
        categoryName: 'Dinner',
        dishes: dinnerDishes,
      },
      {
        categoryName: 'Thalis',
        dishes: thaliDishes,
      },
      {
        categoryName: 'Snacks',
        dishes: snackDishes,
      },
      {
        categoryName: 'Drinks',
        dishes: drinkDishes,
      },
    ],
    reviews: [128],
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

