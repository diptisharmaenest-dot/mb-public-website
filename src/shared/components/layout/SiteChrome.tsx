'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { ROUTES } from '@/shared/seo'

/** Kitchen store pages (/kitchens/<slug>) are the cook's own branded store — no site header/footer. */
export function isStorePage(pathname: string | null) {
  return !!pathname && pathname.startsWith(`${ROUTES.kitchens}/`)
}

export default function SiteChrome({
  header,
  footer,
  children,
}: {
  header: ReactNode
  footer: ReactNode
  children: ReactNode
}) {
  const pathname = usePathname()
  const store = isStorePage(pathname)
  return (
    <>
      {store ? null : header}
      <main>{children}</main>
      {store ? null : footer}
    </>
  )
}
