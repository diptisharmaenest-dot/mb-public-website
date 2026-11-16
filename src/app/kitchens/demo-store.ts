import type { ChefStoreDetail, StoreDish } from '@/features'
import type { StoreFrontCategory } from '@/shared/components/sections/StoreFront/StoreFront'
import type { WeeklySchedule } from '@/shared/components/sections/StoreFront/schedule'
// Sample photos only (no people). Swap Ananya's profile photo in when the real one arrives.
import cover from '@/assets/images/home-v2/hero-thali.jpg'
import thali from '@/assets/images/home-v2/hero-thali.jpg'
import sabzi from '@/assets/images/home-v2/sabzi.jpg'
import kofta from '@/assets/images/how-it-works/f2-curry.jpg'
import moongDal from '@/assets/images/how-it-works/f3-dal.jpg'
import choleRice from '@/assets/images/ai_feature_enhanced.png'
import dalFry from '@/assets/images/demo-store/dal-fry.jpg'
import dalTadka from '@/assets/images/demo-store/dal-tadka-pour.jpg'
import mealBox from '@/assets/images/demo-store/meal-box.jpg'
import rotis from '@/assets/images/demo-store/rotis.jpg'
import achaar from '@/assets/images/demo-store/achaar.jpg'
import salad from '@/assets/images/demo-store/salad.jpg'

/**
 * "Ananya Kitchen" — an EXAMPLE store used as the live example from the
 * "Your name on the door" section. Not a real kitchen: the page shows an
 * "Example store" label and is not indexed. Real kitchens use back-end data only.
 */
export const DEMO_STORE_SLUG = 'ananyas-kitchen'

const dish = (dishName: string, price: number, description: string, img: { src: string }, available = true): StoreDish => ({
  dishName,
  price,
  description,
  dishImageUrl: img.src,
  rating: 0,
  isVeg: true,
  inventoryAvailable: available,
  shiftType: '',
})

export const demoStoreDetail: ChefStoreDetail = {
  storeGuid: 'demo-ananya-kitchen',
  name: "Ananya's Kitchen",
  coverImageUrl: cover.src,
  logoUrl: '',
  description:
    'Home-cooked North Indian meals made fresh to order in my own kitchen — the dal, sabzi and rotis my family grew up on.',
  overallRating: 0,
  storeAddress: 'Mohali',
  storeOwnerName: 'Ananya',
  cuisineLabel: 'Home-style North Indian • Pure Veg',
  reviews: [],
  menuCategories: [
    {
      categoryName: 'Thalis',
      dishes: [
        dish("Ananya's Home Thali", 199, 'Dal, seasonal sabzi, 4 rotis, rice, achaar and salad.', thali),
        dish('Dal Sabzi Meal Box', 169, 'Dal tadka with mixed-veg sabzi, packed fresh for delivery.', mealBox),
        dish('Chole Chawal Thali', 179, 'Punjabi-style chole with steamed rice, salad and achaar.', choleRice),
      ],
    },
    {
      categoryName: 'Curries & Dal',
      dishes: [
        dish('Dal Tadka', 120, 'Yellow dal finished with a ghee, jeera and red-chilli tadka.', dalTadka),
        dish('Kofta Curry', 160, 'Soft lauki koftas simmered in a rich tomato-onion gravy.', kofta),
        dish('Aloo Matar', 130, 'Potatoes and peas cooked the way it is made at home.', sabzi),
        dish('Moong Dal', 110, 'Light, comforting moong dal — just like home.', moongDal),
        dish('Dal Fry', 120, 'Arhar dal with onion, tomato and a hing tadka.', dalFry, false),
      ],
    },
    {
      categoryName: 'Breads & Sides',
      dishes: [
        dish('Tawa Roti (4)', 40, 'Soft whole-wheat rotis, made fresh on the tawa.', rotis),
        dish('Kachumber Salad', 60, 'Fresh cucumber, onion and tomato with lemon.', salad),
        dish('Aam ka Achaar', 30, 'Homemade raw-mango pickle.', achaar),
      ],
    },
  ],
}

/** The same menu in the store components' shape — used by the Home previews so they match the page. */
export const demoStoreCategories: StoreFrontCategory[] = demoStoreDetail.menuCategories.map((c) => ({
  name: c.categoryName,
  dishes: c.dishes.map((d) => ({
    name: d.dishName,
    description: d.description,
    price: d.price,
    image: d.dishImageUrl,
    available: d.inventoryAvailable,
  })),
}))

/** Sample weekly cooking schedule (Sun → Sat). Sunday lunch only. */
const LUNCH = 'Lunch · 12:30–2:30 PM'
const DINNER = 'Dinner · 7:30–9:30 PM'
export const demoStoreSchedule: WeeklySchedule = [
  [LUNCH],
  [LUNCH, DINNER],
  [LUNCH, DINNER],
  [LUNCH, DINNER],
  [LUNCH, DINNER],
  [LUNCH, DINNER],
  [LUNCH, DINNER],
]

/** Both Home previews show exactly these dishes: first three categories, two dishes each. */
export const demoPreviewMenu: StoreFrontCategory[] = demoStoreCategories
  .slice(0, 3)
  .map((c) => ({ ...c, dishes: c.dishes.slice(0, 2) }))
