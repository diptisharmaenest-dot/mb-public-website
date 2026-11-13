import { whyBefore, whyToday, whyTomorrow } from '@/assets'
import type { StaticImageData } from 'next/image'

export type WhyStoryChapter = {
  id: string
  slotId: string
  kicker: string
  numeral: string
  headline: string
  body: string
  image: StaticImageData
  accent: string
  dot: string
}

export const WHY_STORY_CHAPTERS: WhyStoryChapter[] = [
  {
    id: 'before',
    slotId: 'why2-before',
    kicker: 'Before',
    numeral: '01',
    headline: 'Ordering became anonymous.',
    body: 'For years, convenience quietly replaced connection. Meals arrived from kitchens we had never seen, prepared by people we never knew.',
    image: whyBefore,
    accent: '#858A8E',
    dot: '#858A8E',
  },
  {
    id: 'today',
    slotId: 'why2-today',
    kicker: 'Today',
    numeral: '02',
    headline: 'Meet the mother.',
    body: 'Behind every Mother Bhojan meal is a real mother cooking from her own home kitchen.',
    image: whyToday,
    accent: '#DB1A1A',
    dot: '#DB1A1A',
  },
  {
    id: 'tomorrow',
    slotId: 'why2-tomorrow',
    kicker: 'Tomorrow',
    numeral: '03',
    headline: 'Know who cooked.',
    body: 'Food feels different when you know who prepared it. Every meal carries a face, a kitchen, and a story you can trust.',
    image: whyTomorrow,
    accent: '#6B7F3B',
    dot: '#6B7F3B',
  },
]

/** Crossfade between chapters */
export const WHY_STORY_TRANSITION_MS = 800
