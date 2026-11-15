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
      title: 'Download the app',
      body: 'Get the Mother Bhojan app on your phone to start your kitchen.',
      chip: 'App installed',
    },
    {
      title: 'Verify your contact',
      body: 'Confirm your mobile number with a quick OTP.',
      chip: 'Number verified',
    },
    {
      title: 'Add your details & dishes',
      body: 'Tell us about yourself and your kitchen, and add the dishes you love to cook.',
      chip: 'Menu added',
    },
    {
      title: 'Mother Bhojan will connect with you',
      body: 'Our team will get in touch to guide you through the next steps.',
      chip: 'We’ll be in touch',
    },
  ],
}

export const HOW_IT_WORKS_JOURNEYS = [FAMILY_JOURNEY, KITCHEN_JOURNEY] as const
