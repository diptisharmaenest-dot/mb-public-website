import { createPageMetadata, ROUTES } from '@/shared/seo'
import { ContactHero, ContactMain } from './sections'

export const metadata = createPageMetadata({
  title: 'Contact us',
  description:
    'Questions about an order or opening your kitchen? Write to Mother Bhojan. Support Monday to Saturday, 10 AM to 7 PM, from our office in Mohali.',
  path: ROUTES.contact,
})

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactMain />
    </>
  )
}
