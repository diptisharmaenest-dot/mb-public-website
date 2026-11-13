'use client'

import { FiBookOpen, FiTrendingUp } from 'react-icons/fi'
import SolutionShowcase from './SolutionShowcase'
import { expertSupport } from '@/assets'

const ScaleOperation = () => {
  return (
    <SolutionShowcase
      id="small-business-owners"
      scriptText="Small Business Owners"
      bannerImage={expertSupport}
      bannerAlt="Scale operations"
      heading="SCALE YOUR OPERATION WITHOUT. SCALING YOUR EXPENSES"
      subText="Spend less time managing your ghost kitchen, food truck or small business, and more time cooking, with one affordable tool."
      cards={[
        {
          title: 'Manage a growing menu',
          description: 'Add new dishes, update pricing, and control inventory from one streamlined backend.',
          icon: FiBookOpen,
        },
        {
          title: 'Showcase best sellers',
          description: 'Highlight top dishes beautifully so customers can browse and order faster.',
          icon: FiTrendingUp,
        },
      ]}
      highlightText="Smart tools help you grow with confidence, keeping operations light while your business reaches more customers."
      highlightTone="secondary"
      testimonials={[
        {
          text: 'As our menu and delivery area grew, we never had to hire extra staff just to keep track of orders — the dashboard scaled with us.',
          author: 'Growing Kitchen Partner',
          role: 'Mother Bhojan',
        },
      ]}
    />
  )
}

export default ScaleOperation
