import { createPageMetadata, ROUTES } from '@/shared/seo'
import { platformFaqs } from '@/shared/data/faqs'
import { FaqHero, FaqAccordion, FaqCta } from './sections'

export const metadata = createPageMetadata({
  title: 'FAQ',
  description:
    'Frequently asked questions about ordering from Mother Bhojan kitchens and becoming a Kitchen Partner.',
  path: ROUTES.faq,
})

export default function Page() {
  return (
    <>
      <FaqHero />
      <FaqAccordion faqs={platformFaqs} />
      <FaqCta />
    </>
  )
}
