import { apiRequest } from '@/shared/lib'

/**
 * API path that stores "notify me when the app launches" contacts.
 * Set NEXT_PUBLIC_APP_WAITLIST_ENDPOINT (e.g. `/api/public/app-waitlist`) once the
 * backend endpoint exists. Until then submissions are NOT saved anywhere.
 */
const WAITLIST_ENDPOINT = (process.env.NEXT_PUBLIC_APP_WAITLIST_ENDPOINT ?? '').trim()

export type AppWaitlistEntry = {
  contact: string
  contactType: 'phone' | 'email'
  platform: 'android' | 'ios' | 'desktop'
  source: string
}

export async function submitAppWaitlist(entry: AppWaitlistEntry): Promise<void> {
  if (!WAITLIST_ENDPOINT) {
    console.warn('[app-waitlist] NEXT_PUBLIC_APP_WAITLIST_ENDPOINT not set — entry not saved', entry)
    return
  }
  const token = (process.env.NEXT_PUBLIC_PUBLIC_WEBSITE_BEARER_TOKEN ?? '').trim()
  await apiRequest(WAITLIST_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(entry),
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  })
}
