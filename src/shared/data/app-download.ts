/**
 * Customer app download settings — single place to switch the "Download app" flow live.
 *
 * While the store URLs below are empty, every download button shows the "Coming soon"
 * popup with the notify-me form. Fill them in when the apps are published and the
 * popup / mobile sheet switch to real store buttons automatically.
 *
 * Go-live checklist (values come from the mobile app team):
 * 1. playStoreUrl + androidPackage   → enables Google Play button and Android "Open app".
 * 2. appStoreUrl + iosAppId          → enables App Store button and the iOS Smart App Banner
 *                                      (Safari shows "Open" automatically when installed).
 * 3. appScheme                       → deep link used by "Open app", e.g. 'motherbhojan'.
 * 4. Host verification files (from the app team) so links open the app directly:
 *    public/.well-known/assetlinks.json and public/.well-known/apple-app-site-association
 * 5. If the live domain differs from the placeholder, regenerate the QR image
 *    (src/assets/images/app-qr.svg) for `${domain}${APP_LANDING_PATH}`.
 */
type AppDownloadConfig = {
  playStoreUrl: string
  appStoreUrl: string
  androidPackage: string
  iosAppId: string
  appScheme: string
}

export const APP_DOWNLOAD: AppDownloadConfig = {
  playStoreUrl: '',
  appStoreUrl: '',
  /** Android application id, e.g. 'com.motherbhojan.customer'. */
  androidPackage: '',
  /** Numeric App Store id, e.g. '1234567890'. */
  iosAppId: '',
  /** Custom URL scheme without '://', e.g. 'motherbhojan'. */
  appScheme: '',
}

/** Page the QR code points to; it forwards each phone to its store. */
export const APP_LANDING_PATH = '/app'

/** Placeholder production URL encoded in the QR image — update with the real domain. */
export const APP_QR_TARGET = 'https://motherbhojan.com/app'

export type AppPlatform = 'android' | 'ios' | 'desktop'

export const isAndroidLive = () => Boolean(APP_DOWNLOAD.playStoreUrl)
export const isIosLive = () => Boolean(APP_DOWNLOAD.appStoreUrl)
export const isAppLive = () => isAndroidLive() || isIosLive()

export function detectPlatform(userAgent: string): AppPlatform {
  if (/android/i.test(userAgent)) return 'android'
  if (/iphone|ipad|ipod/i.test(userAgent)) return 'ios'
  return 'desktop'
}

/** Store URL for a platform, or '' when that store isn't live yet. */
export function storeUrlFor(platform: AppPlatform): string {
  if (platform === 'android') return APP_DOWNLOAD.playStoreUrl
  if (platform === 'ios') return APP_DOWNLOAD.appStoreUrl
  return ''
}

/**
 * Android intent link: opens the app when installed, otherwise Chrome falls back
 * to the Play Store. Returns '' until package + scheme are configured.
 */
export function androidOpenAppUrl(): string {
  const { androidPackage, appScheme, playStoreUrl } = APP_DOWNLOAD
  if (!androidPackage || !appScheme) return ''
  const fallback = playStoreUrl ? `;S.browser_fallback_url=${encodeURIComponent(playStoreUrl)}` : ''
  return `intent://open#Intent;scheme=${appScheme};package=${androidPackage}${fallback};end`
}

/** Phone (Indian 10-digit, optional +91/0) or email. */
export function isValidContact(value: string): boolean {
  const v = value.trim()
  if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return true
  const digits = v.replace(/[\s-]/g, '')
  return /^(\+?91|0)?[6-9]\d{9}$/.test(digits)
}
