export type CareTimelineStatusKind = '' | 'solid' | 'live'

export type CareTimelineIcon =
  | 'bell'
  | 'basket'
  | 'pot'
  | 'shield'
  | 'box'
  | 'scooter'

export type CareTimelineMedia =
  | { type: 'order' }
  | { type: 'img'; src: string; alt: string }
  | { type: 'qc'; src: string; alt: string }

export type CareTimelineStep = {
  n: string
  icon: CareTimelineIcon
  title: string
  desc: string
  status: { label: string; kind: CareTimelineStatusKind }
  time: string
  media: CareTimelineMedia
  qc?: boolean
  /** Step 00 — the customer’s action; styled with customer accent outline */
  isCustomer?: boolean
}

export const careTimelineHeader = {
  eyebrow: 'The operating standard',
  title: 'From Your Order to',
  titleAccent: 'Your Door',
} as const

export const careTimelineMetrics = [
  { value: '4', label: 'Checkpoints before any meal is packed' },
  { value: '64', suffix: '°C', label: 'Core temperature held to your door' },
  {
    value: '1 ',
    mid: 'in ',
    suffix: '20',
    label: 'Applicant kitchens that pass the audit',
  },
  { value: '~69', suffix: 'min', label: 'Median tap-to-doorstep, cooked fresh' },
] as const

const CARE_TIMELINE_IMAGES = {
  youOrder: '/images/care-timeline/step-you-order.png',
  orderReceived: '/images/care-timeline/step-order-received.png',
  cooking: '/images/care-timeline/step-cooked.png',
  packing: '/images/care-timeline/step-packed.png',
  delivered: '/images/care-timeline/step-delivered.png',
  qcbg: '/images/care-timeline/step-packed.png',
} as const

/** Full customer journey: You order → Received → Cooked → Packed at 64°C → Delivered. Step 00 is the customer’s own action. */
export const careTimelineSteps: CareTimelineStep[] = [
  {
    n: '00',
    icon: 'basket',
    title: 'You Order',
    desc: 'You tap, choose your dish, and place the order. Everything that follows starts here.',
    status: { label: 'You ordered', kind: 'live' },
    time: '10:40',
    media: { type: 'img', src: CARE_TIMELINE_IMAGES.youOrder, alt: 'Person browsing food ordering app on smartphone' },
    isCustomer: true,
  },
  {
    n: '01',
    icon: 'bell',
    title: 'Order Received',
    desc: 'A verified order lands on her phone — dish, quantity, area, slot and amount, in one card.',
    status: { label: 'Received', kind: '' },
    time: '10:42',
    media: { type: 'img', src: CARE_TIMELINE_IMAGES.orderReceived, alt: 'Home chef receiving order notification on phone in her kitchen' },
  },
  {
    n: '02',
    icon: 'pot',
    title: 'Cooked',
    desc: 'Cooked fresh to order in her own kitchen — no pre-cooking, no shortcuts, the way she cooks for family.',
    status: { label: 'Cooking', kind: 'live' },
    time: '11:18',
    media: {
      type: 'img',
      src: CARE_TIMELINE_IMAGES.cooking,
      alt: 'Hands stirring dal makhani on a gas stove in an Indian home kitchen',
    },
  },
  {
    n: '03',
    icon: 'shield',
    title: 'Packed at 64°C',
    desc: 'A four-point quality and hygiene check, then sealed in food-safe, tamper-evident packaging — warm and ready to travel.',
    status: { label: 'QC passed', kind: 'solid' },
    time: '11:39',
    qc: true,
    media: {
      type: 'qc',
      src: CARE_TIMELINE_IMAGES.qcbg,
      alt: 'Indian mother carefully sealing a food container in her kitchen',
    },
  },
  {
    n: '04',
    icon: 'scooter',
    title: 'Delivered',
    desc: 'Handed to the delivery partner with live tracking — arriving warm at about 64°C.',
    status: { label: 'Out for delivery', kind: 'live' },
    time: '11:51',
    media: {
      type: 'img',
      src: CARE_TIMELINE_IMAGES.delivered,
      alt: 'Delivery rider handing food bag to a smiling woman at her apartment door',
    },
  },
]
