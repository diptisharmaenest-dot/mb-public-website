export const KITCHEN_AUDIT_POINTS = 80

export const VERIFIED_KITCHEN_TITLE = 'Verified Kitchen'

export const verifiedKitchenAuditLabel = `${KITCHEN_AUDIT_POINTS}-point audit`

/** Mark sections that already explain trust / verified kitchens — hides the float badge while in view */
export const VERIFIED_TRUST_SECTION_PROPS = {
  'data-mb-trust-section': true,
} as const

export const VERIFIED_TRUST_SECTION_SELECTOR = '[data-mb-trust-section]'
