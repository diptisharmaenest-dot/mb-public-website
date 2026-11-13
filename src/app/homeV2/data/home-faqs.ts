import type { FAQItem } from '@/shared/data/faqs'

export type HomeFaqGroup = {
  id: string
  label: string
  items: FAQItem[]
}

/**
 * Home page teaser — two questions per audience.
 * Every other question lives on the full FAQ page (see `shared/data/faqs.ts`).
 */
export const homeFaqGroups: HomeFaqGroup[] = [
  {
    id: 'families',
    label: 'For families',
    items: [
      {
        question: 'How do you verify a kitchen?',
        answer:
          'Every kitchen passes an 80-point audit covering hygiene, ingredients and cooking practices, checked in person. Roughly 1 in 20 applicants pass.',
      },
      {
        question: 'What if something is wrong with my order?',
        answer:
          "The Daughter's Promise: anything wrong — cold, late, or not as it should be — gets a full refund, no questions asked.",
      },
    ],
  },
  {
    id: 'partners',
    label: 'For partners',
    items: [
      {
        question: 'How do I become a Kitchen Partner?',
        answer:
          'You can apply by clicking "Become a Kitchen Partner" above. Our team will visit you in person, assist with FSSAI registration, set up your menu, and handle professional photography.',
      },
      {
        question: 'Do I need a commercial kitchen to join?',
        answer:
          'No, you can cook directly from your home kitchen. We will guide you through an in-person audit to make sure it meets our 80-point hygiene and safety standards before going live.',
      },
    ],
  },
]
