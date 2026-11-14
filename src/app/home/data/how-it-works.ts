/** Home "How Mother Bhojan works" — two journeys, four steps each (MB-33 onboarding + customer order flow). */
export type HowItWorksStep = { title: string; body: string }

export type HowItWorksJourney = {
  id: 'kitchen' | 'family'
  kicker: string
  title: string
  steps: [HowItWorksStep, HowItWorksStep, HowItWorksStep, HowItWorksStep]
}

export const KITCHEN_JOURNEY: HowItWorksJourney = {
  id: 'kitchen',
  kicker: 'For home cooks',
  title: 'Open your kitchen',
  steps: [
    {
      title: "Check if you're eligible",
      body: 'Answer a few quick questions and verify your mobile number with an OTP.',
    },
    {
      title: 'Tell us about your kitchen',
      body: 'Share basic details and a few photos or a short video, and pick a visit time that suits you.',
    },
    {
      title: 'Hygiene audit & cook test',
      body: 'Our team visits your home for an 80-point hygiene check, then tastes a meal you cook.',
    },
    {
      title: 'Get verified & go live',
      body: 'Complete FSSAI and KYC, join a short welcome session, and your kitchen goes live in your own name.',
    },
  ],
}

export const FAMILY_JOURNEY: HowItWorksJourney = {
  id: 'family',
  kicker: 'For families',
  title: 'Order home food',
  steps: [
    {
      title: 'Find a verified kitchen near you',
      body: "See home kitchens within 5 km — each one audited, with the cook's name and face.",
    },
    {
      title: 'Choose your meal',
      body: 'Browse her menu and add what your family will enjoy.',
    },
    {
      title: 'Confirm & pay',
      body: 'Verify your number with an OTP and pay securely by UPI, card or net banking.',
    },
    {
      title: 'Delivered warm to your door',
      body: "Track it as it's accepted, picked up and delivered.",
    },
  ],
}
