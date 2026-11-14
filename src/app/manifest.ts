import type { MetadataRoute } from 'next'
import { SITE_NAME } from '@/shared/seo'
import { APP_DOWNLOAD } from '@/shared/data/app-download'

export const dynamic = 'force-static'

/**
 * Web manifest. `related_applications` lets Android Chrome detect that the customer
 * app is installed (button switches to "Open app"); added once androidPackage is set.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    start_url: '/',
    display: 'browser',
    background_color: '#FFFAF2',
    theme_color: '#DB1A1A',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
    ...(APP_DOWNLOAD.androidPackage
      ? {
          related_applications: [
            {
              platform: 'play',
              id: APP_DOWNLOAD.androidPackage,
              url:
                APP_DOWNLOAD.playStoreUrl ||
                `https://play.google.com/store/apps/details?id=${APP_DOWNLOAD.androidPackage}`,
            },
          ],
          prefer_related_applications: false,
        }
      : {}),
  }
}
