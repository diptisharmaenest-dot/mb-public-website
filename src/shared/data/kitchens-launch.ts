/**
 * Kitchens launch switch.
 *
 * false → the public site hides every back-end kitchen (the list, their store
 *         pages, sitemap and structured data) and shows only the example store
 *         (Ananya's Kitchen) next to a "Kitchens opening soon" panel.
 * true  → real kitchens from the API are listed as before.
 *
 * Flip to true once the first real, verified kitchens are live on the
 * production API.
 */
export const SHOW_LIVE_KITCHENS = false
