/**
 * Paths relative to `NEXT_PUBLIC_API_BASE_URL` (no trailing slash).
 * Dynamic segments are built in the service, e.g.
 * `${ApiUrl.publicStoresList}/${encodeURIComponent(storeGuid)}`.
 */
export const ApiUrl = {
  publicStoresList: '/api/public/stores',
} as const
