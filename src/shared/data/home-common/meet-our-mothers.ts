import {
  northMomPoster,
  southMomPoster,
  gujratiMomPoster,
  punjabiMomPoster,
  hyderabadiMomPoster,
} from "@/assets/images"
import {
  gujratiMomVideo,
  northMomVideo,
  southMomVideo,
  punjabiMomVideo,
  hyderabadiMomVideo,
} from "@/assets/videos"

export type MotherProfile = {
  id: string
  name: string
  kitchen: string
  quote: string
  storeId: string
  posterSrc: string
  videoSrc: string
}

/** Portrait gallery — mothers behind the kitchens. */
export const MEET_OUR_MOTHERS: MotherProfile[] = [
  {
    id: 'ritu-sharma',
    name: 'Ritu Sharma',
    kitchen: 'North Indian',
    quote:
      'I roll every roti the way my mother taught me — slow, patient, with both hands.',
    storeId: 'abc-delights',
    posterSrc: northMomPoster.src,
    videoSrc: northMomVideo,
  },
  {
    id: 'sunita-kaur',
    name: 'Sunita Kaur',
    kitchen: 'Punjabi Kitchen',
    quote:
      "No meal leaves my home unless I'd happily serve it to my own family.",
    storeId: 'punjabi-rasoi',
    posterSrc: punjabiMomPoster.src,
    videoSrc: punjabiMomVideo,
  },
  {
    id: 'neha-patel',
    name: 'Neha Patel',
    kitchen: 'Gujarati Kitchen',
    quote:
      'Every Box I pack is the same lunch I would send with my daughter to school.',
    storeId: 'bakery-hub',
    posterSrc: gujratiMomPoster.src,
    videoSrc: gujratiMomVideo,
  },
  {
    id: 'latha-iyer',
    name: 'Latha Iyer',
    kitchen: 'South Indian',
    quote:
      'The sambar has to simmer long enough for the aroma to reach the front door.',
    storeId: 'idli-house',
    posterSrc: southMomPoster.src,
    videoSrc: southMomVideo,
  },
  {
    id: 'shabnam-begum',
    name: 'Shabnam Begum',
    kitchen: 'Hyderabadi',
    quote:
      'Biryani needs time and attention — I never rush what families will share together.',
    storeId: 'bengal-bowl',
    posterSrc: hyderabadiMomPoster.src,
    videoSrc: hyderabadiMomVideo,
  },
]

export const MOTHERS_AUTO_DELAY_MS = 10000
export const MOTHERS_PAUSE_AFTER_MANUAL_MS = 10000

export const DEFAULT_MOTHER_INDEX = MEET_OUR_MOTHERS.findIndex(
  (mother) => mother.id === 'sunita-kaur',
)
