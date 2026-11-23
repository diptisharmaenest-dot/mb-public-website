/**
 * Contact details shown on /contact — single place to update them.
 * Phone / WhatsApp are not published yet: add them here when ready.
 */
export const CONTACT_EMAIL = 'hello@motherbhojan.com'

export const OFFICE = {
  lines: ['Plot No. D-199, 2nd Floor, Phase 8B,', 'Industrial Area, Mohali,', 'SAS Nagar, Punjab — 160055'],
  /** Used for the map and "Get directions". */
  mapQuery: 'Plot D-199, Phase 8B, Industrial Area, Mohali, Punjab 160055',
} as const

/** Support hours, India time. Days: 0 = Sunday … 6 = Saturday. */
export const SUPPORT_HOURS = {
  label: 'Monday – Saturday',
  time: '10 AM – 7 PM',
  days: [1, 2, 3, 4, 5, 6],
  openHour: 10,
  closeHour: 19,
  timeZone: 'Asia/Kolkata',
} as const

/** True when support is open right now (India time). */
export function isSupportOpen(now: Date = new Date()): boolean {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: SUPPORT_HOURS.timeZone,
    weekday: 'short',
    hour: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(now)
  const weekday = parts.find((p) => p.type === 'weekday')?.value ?? ''
  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? -1)
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(weekday)
  return (
    (SUPPORT_HOURS.days as readonly number[]).includes(day) &&
    hour >= SUPPORT_HOURS.openHour &&
    hour < SUPPORT_HOURS.closeHour
  )
}
