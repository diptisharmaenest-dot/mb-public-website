'use client'

import { DualPortalCta, FAQ_PORTAL_CTAS } from '@/components'

const FaqCta = () => {
  return (
    <DualPortalCta
      id="faq-cta"
      ariaLabel="Get started"
      items={FAQ_PORTAL_CTAS}
    />
  )
}

export default FaqCta
