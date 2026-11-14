import { createPageMetadata } from '@/shared/seo'
import { APP_LANDING_PATH } from '@/shared/data/app-download'
import AppLanding from './AppLanding'

export const metadata = createPageMetadata({
  title: 'Get the app',
  description: 'Get the Mother Bhojan app — order home food from verified home cooks near you.',
  path: APP_LANDING_PATH,
  noIndex: true,
})

export default function Page() {
  return <AppLanding />
}
