'use client'

import { FiShield, FiSliders } from 'react-icons/fi'
import SolutionShowcase from './SolutionShowcase'
import { expertSupport } from '@/assets'

const Flexibility = () => {
  return (
    <SolutionShowcase
      id="occasional-food-seller"
      scriptText="Occasional Food Sellers"
      bannerImage={expertSupport}
      bannerAlt="Flexible business setup"
      heading="LOOKING FOR FLEXIBILITY?"
      subText="From special drops to pop-ups, handle your occasional food sales effortlessly with one simple tool."
      cards={[
        {
          title: 'Work your way',
          description: 'Set up custom workflows that match your daily process and keep your service running smoothly.',
          icon: FiSliders,
        },
        {
          title: 'Build customer trust',
          description: 'Use reviews, ratings, and clear communication to make every order feel reliable.',
          icon: FiShield,
        },
      ]}
      highlightText="Whether you sell on schedule, on demand, or through special events, Mother Bhojan adapts to the way you operate."
      highlightTone="yellow"
      testimonials={[
        {
          text: "I only cook on weekends, but I can go live for a pop-up, pause the moment I'm sold out, and pick back up next time without any hassle.",
          author: 'Occasional Seller Partner',
          role: 'Mother Bhojan',
        },
      ]}
    />
  )
}

export default Flexibility
