/** Home "How Mother Bhojan works" — two journeys, four steps each (MB-33 onboarding + customer order flow). */
export type HowItWorksStep = {
  title: string
  body: string
  /** Short outcome label shown when the step is active. */
  chip: string
}

export type HowItWorksJourney = {
  id: 'family' | 'kitchen'
  tabLabel: string
  /** Short tab label for phones. */
  tabShort: string
  kicker: string
  title: string
  steps: [HowItWorksStep, HowItWorksStep, HowItWorksStep, HowItWorksStep]
}

export const FAMILY_JOURNEY: HowItWorksJourney = {
  id: 'family',
  tabLabel: 'I want to order food',
  tabShort: 'Order food',
  kicker: 'For families',
  title: 'Order home food',
  steps: [
    {
      title: 'Find a verified kitchen near you',
      body: "See home kitchens within 5 km — each one audited, with the cook's name and face.",
      chip: 'Verified kitchens near you',
    },
    {
      title: 'Choose your meal',
      body: 'Browse her menu and add what your family will enjoy.',
      chip: 'Browse her menu',
    },
    {
      title: 'Confirm & pay',
      body: 'Verify your number with an OTP and pay securely by UPI, card or net banking.',
      chip: 'Paid · she’s cooking now',
    },
    {
      title: 'Delivered warm to your door',
      body: "Track it as it's accepted, picked up and delivered.",
      chip: 'Delivered warm',
    },
  ],
}

export const KITCHEN_JOURNEY: HowItWorksJourney = {
  id: 'kitchen',
  tabLabel: 'I want to cook from home',
  tabShort: 'Cook from home',
  kicker: 'For home cooks',
  title: 'Open your kitchen',
  steps: [
    {
      title: "Check if you're eligible",
      body: 'Answer a few quick questions and verify your mobile number with an OTP.',
      chip: 'OTP verified',
    },
    {
      title: 'Tell us about your kitchen',
      body: 'Share basic details and a few photos or a short video, and pick a visit time that suits you.',
      chip: 'Visit time booked',
    },
    {
      title: 'Hygiene audit & cook test',
      body: 'Our team visits your home for an 80-point hygiene check, then tastes a meal you cook.',
      chip: '80-point hygiene check',
    },
    {
      title: 'Get verified & go live',
      body: 'Complete FSSAI and KYC, join a short welcome session, and your kitchen goes live in your own name.',
      chip: 'Verified · live in her name',
    },
  ],
}

export const HOW_IT_WORKS_JOURNEYS = [FAMILY_JOURNEY, KITCHEN_JOURNEY] as const
