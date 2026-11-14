import type { StaticImageData } from 'next/image'
import {
  expertSupport,
  kitchenStorefrontPreview,
} from '@/assets/images'
import humanSupportFrame from '@/assets/images/human-support-frame.png'

/** Home "How Mother Bhojan works" — two journeys, four steps each (MB-33 onboarding + customer order flow). */
export type HowItWorksStep = {
  title: string
  body: string
  image: StaticImageData | string
  imageAlt: string
  /** Small floating label on the photo. */
  chip: string
  /** 'contain' for UI screenshots that must not be cropped. */
  fit?: 'cover' | 'contain'
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
      image: '/images/care-timeline/step-you-order.png',
      imageAlt: 'Hands holding a phone showing the Mother Bhojan app with nearby kitchens',
      chip: 'Verified kitchens near you',
    },
    {
      title: 'Choose your meal',
      body: 'Browse her menu and add what your family will enjoy.',
      image: kitchenStorefrontPreview,
      imageAlt: "A home cook's menu on Mother Bhojan with starters, thalis and curries",
      chip: 'Browse her menu',
      fit: 'contain',
    },
    {
      title: 'Confirm & pay',
      body: 'Verify your number with an OTP and pay securely by UPI, card or net banking.',
      image: '/images/care-timeline/step-cooked.png',
      imageAlt: 'Dal simmering in a pot in a home kitchen',
      chip: 'Paid · she’s cooking now',
    },
    {
      title: 'Delivered warm to your door',
      body: "Track it as it's accepted, picked up and delivered.",
      image: '/images/care-timeline/step-delivered.png',
      imageAlt: 'A delivery rider handing a Mother Bhojan bag to a customer at her door',
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
      image: '/images/care-timeline/step-order-received.png',
      imageAlt: 'A home cook smiling at her phone in her kitchen',
      chip: 'OTP verified',
    },
    {
      title: 'Tell us about your kitchen',
      body: 'Share basic details and a few photos or a short video, and pick a visit time that suits you.',
      image: humanSupportFrame,
      imageAlt: 'A Mother Bhojan team member on a video call',
      chip: 'Visit time booked',
    },
    {
      title: 'Hygiene audit & cook test',
      body: 'Our team visits your home for an 80-point hygiene check, then tastes a meal you cook.',
      image: expertSupport,
      imageAlt: 'A home cook in a Mother Bhojan apron cooking at her stove',
      chip: '80-point hygiene check',
    },
    {
      title: 'Get verified & go live',
      body: 'Complete FSSAI and KYC, join a short welcome session, and your kitchen goes live in your own name.',
      image: '/images/care-timeline/step-packed.png',
      imageAlt: 'A home cook packing food into a Mother Bhojan box',
      chip: 'Verified · live in her name',
    },
  ],
}

export const HOW_IT_WORKS_JOURNEYS = [FAMILY_JOURNEY, KITCHEN_JOURNEY] as const
