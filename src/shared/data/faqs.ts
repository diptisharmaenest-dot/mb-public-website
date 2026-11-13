export type FAQItem = {
  question: string
  answer: string
}

/** Shared FAQs for marketing pages — replace with legal-approved copy before launch. */
export const platformFaqs: FAQItem[] = [
  {
    question: 'What is Mother Bhojan?',
    answer:
      'Mother Bhojan is a platform for home cooks and small food businesses to publish a storefront, accept orders, and manage pickup or delivery — without stitching together separate tools.',
  },
  {
    question: 'How do I start selling on Mother Bhojan?',
    answer:
      'Create your store profile, add your menu, set your availability, and choose how customers can order. Once your setup is complete, you can share your storefront link and start taking orders.',
  },
  {
    question: 'What does it cost to use Mother Bhojan?',
    answer:
      'You only pay when you make a sale. There are no monthly storefront fees on our standard plan — see the pricing section for current rates and what is included.',
  },
  {
    question: 'Can I offer pickup, delivery, or both?',
    answer:
      'Yes. You control how customers receive orders. Configure pickup windows, delivery zones, and fees in your store settings so fulfillment matches how you already operate.',
  },
  {
    question: 'Is my business and customer data secure?',
    answer:
      'We use secure connections for account access and order data, and we treat seller and customer information with care. Contact us if you need details about data handling for your region.',
  },
  {
    question: 'Are the kitchens FSSAI-compliant?',
    answer:
      'Yes. Every partner kitchen is FSSAI-registered and hygiene-checked before it ever appears on Mother Bhojan.',
  },
  {
    question: 'Which areas do you deliver to?',
    answer:
      'We currently deliver across Mohali, with more neighbourhoods opening soon.',
  },
  {
    question: 'How do I order?',
    answer:
      'Browse verified chefs near you in the app, place your order, and track delivery from your phone.',
  },
]
