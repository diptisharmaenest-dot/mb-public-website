export type FAQItem = {
  question: string
  answer: string
}

/** FAQ page copy — written from Mother Bhojan's real ordering and kitchen-onboarding flows. */
export const platformFaqs: FAQItem[] = [
  {
    question: 'What is Mother Bhojan?',
    answer:
      "Mother Bhojan brings you ghar ka khaana from real home cooks near you. Every kitchen belongs to a named cook, cooking in her own home — and every one is visited and checked by our team before it goes live.",
  },
  {
    question: 'How do I order?',
    answer:
      'Find a verified kitchen within 5 km of you, choose from her menu, confirm your number with a quick OTP and pay securely by UPI, card or net banking. You can follow your order as it is accepted, picked up and delivered.',
  },
  {
    question: 'Is there a minimum order?',
    answer:
      'Yes — the minimum order is ₹199, so every meal is worth her while to cook fresh for you.',
  },
  {
    question: 'Which areas do you deliver to?',
    answer:
      'We are serving Mohali first, with the rest of the Tricity coming next. You will see the kitchens that can deliver to you once you share your location.',
  },
  {
    question: 'How do you check a kitchen before it goes live?',
    answer:
      'Our team visits every kitchen in person for a detailed hygiene check, tastes her cooking at home, and helps her complete FSSAI registration and KYC. Only then does her store open on Mother Bhojan.',
  },
  {
    question: 'What if something is wrong with my order?',
    answer:
      "That's our Daughter's Promise. If a meal arrives cold, late or not as it should be, just tell us — a real person from our team will look into it and make it right, quickly and fairly.",
  },
  {
    question: 'I cook at home. How do I open my kitchen?',
    answer:
      'Download the Mother Bhojan app, verify your mobile number, and tell us about yourself, your kitchen and the dishes you love to cook. Our team will call you and guide you through every step until your store is live.',
  },
  {
    question: 'Do I need a commercial kitchen?',
    answer:
      'No. You cook in your own home kitchen. It just needs to be clean and well kept — our team will visit, check it with you and help you with anything that needs fixing.',
  },
]
