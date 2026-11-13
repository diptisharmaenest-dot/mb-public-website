export type CustomerReview = {
  name: string
  area: string
  initial: string
  text: string
  verified: boolean
}

/** Placeholder testimonials — replace with real, consented reviews before launch. */
export const reviewStats = {
  orders: '2,400+',
} as const

export const customerReviews: CustomerReview[] = [
  {
    name: 'Priya S.',
    area: 'Mohali · Sector 70',
    initial: 'P',
    text: "Tastes like my own mother's dal — warm, on time, and I knew exactly whose kitchen it came from.",
    verified: true,
  },
  {
    name: 'Arjun M.',
    area: 'Mohali · Phase 7',
    initial: 'A',
    text: 'Knowing every kitchen is verified means I order without a second thought. The handwritten note got me.',
    verified: true,
  },
  {
    name: 'Neha K.',
    area: 'Mohali · Phase 5',
    initial: 'N',
    text: 'Reordered three times this week. Real home cooking, never heavy. My kids actually finish their plates.',
    verified: true,
  },
  {
    name: 'Simran J.',
    area: 'Mohali · Sector 91',
    initial: 'S',
    text: 'Ordered kadhi pakora on a rainy Tuesday — still hot at the door, and the rice came separate, not mushy.',
    verified: true,
  },
  {
    name: 'Rajesh G.',
    area: 'Mohali · Sector 68',
    initial: 'R',
    text: 'Chole bhature landed at 1:15, right before my call. The bhature were still puffed — ate two standing in the kitchen.',
    verified: true,
  },
  {
    name: 'Kavita R.',
    area: 'Mohali · Phase 3',
    initial: 'K',
    text: 'Love how easy it is to find authentic regional dishes. Truly a blessing for busy working weekdays.',
    verified: true,
  },
]
