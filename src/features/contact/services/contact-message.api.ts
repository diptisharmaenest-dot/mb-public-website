import { apiRequest } from '@/shared/lib'

/**
 * API path that stores Contact Us messages.
 * Set NEXT_PUBLIC_CONTACT_ENDPOINT (e.g. `/api/public/contact-messages`) once the
 * backend endpoint exists. Until then messages are NOT saved anywhere — the visitor
 * still sees the thank-you card.
 */
const CONTACT_ENDPOINT = (process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? '').trim()

export type ContactTopic = 'ordering' | 'kitchen' | 'my-order' | 'other'

export type ContactMessage = {
  topic: ContactTopic
  name: string
  contact: string
  contactType: 'phone' | 'email'
  orderNumber?: string
  message: string
}

export async function submitContactMessage(entry: ContactMessage): Promise<void> {
  if (!CONTACT_ENDPOINT) {
    console.warn('[contact] NEXT_PUBLIC_CONTACT_ENDPOINT not set — message not saved', entry)
    return
  }
  const token = (process.env.NEXT_PUBLIC_PUBLIC_WEBSITE_BEARER_TOKEN ?? '').trim()
  await apiRequest(CONTACT_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(entry),
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  })
}
