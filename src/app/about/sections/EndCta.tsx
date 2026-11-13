'use client'

import { DualPortalCta, ABOUT_PORTAL_CTAS } from '@/components'

const EndCta = () => {
  return (
    <DualPortalCta
      id="about-end-cta"
      ariaLabel="Get started" 
      items={ABOUT_PORTAL_CTAS}
    />
  )
}

export default EndCta
