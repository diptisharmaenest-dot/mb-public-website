'use client'

import { FiClipboard, FiClock } from 'react-icons/fi'
import SolutionShowcase from './SolutionShowcase'
import { expertSupport } from '@/assets'

const SoloKitchen = () => {
  return (
    <SolutionShowcase
      id="independent-chefs"
      bannerImage={expertSupport}
      bannerAlt="Kitchen operations"
      scriptText="Independent chefs"
      heading="RUN YOUR KITCHEN SOLO, MANAGE. YOUR ORDERS LIKE A PRO"
      subText="Manage all your orders, customers, deliveries and more with one easy-to-use tool."
      cards={[
        {
          title: 'Keep orders organized',
          description: 'Track incoming requests, update statuses, and stay in control even during peak hours.',
          icon: FiClipboard,
        },
        {
          title: 'See what to prep next',
          description: 'Use a clean dashboard to prioritize dishes, prep timing, and customer communication.',
          icon: FiClock,
        },
      ]}
      highlightText="All your kitchen workflows stay in one place, so you can focus on quality without getting buried in admin."
      highlightTone="primary"
      testimonials={[
        {
          text: 'Running the kitchen alone used to mean sticky notes and missed calls — now every order, prep step, and delivery update lives in one place.',
          author: 'Independent Kitchen Partner',
          role: 'Mother Bhojan',
        },
      ]}
    />
  )
}

export default SoloKitchen
