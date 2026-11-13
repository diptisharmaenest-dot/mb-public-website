import { createPageMetadata, ROUTES } from '@/shared/seo'
import { JoinFlow } from './sections'

export const metadata = createPageMetadata({
  title: 'Become a Kitchen Partner',
  description:
    'Apply to become a Mother Bhojan Kitchen Partner — quick eligibility check, application form, uploads, and book your home interview.',
  path: ROUTES.join,
})

export default function JoinPage() {
  return <JoinFlow />
}
