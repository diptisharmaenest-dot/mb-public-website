import localFont from 'next/font/local'

/** Self-hosted fonts — build works offline (no Google Fonts fetch at compile time). */
export const jakarta = localFont({
  src: '../../assets/fonts/plus-jakarta-sans-latin-wght-normal.woff2',
  variable: '--font-jakarta',
  weight: '400 800',
  display: 'swap',
})

export const antonio = localFont({
  src: '../../assets/fonts/antonio-latin-wght-normal.woff2',
  variable: '--font-antonio',
  weight: '100 700',
  display: 'swap',
})

export const aguafina = localFont({
  src: '../../assets/fonts/aguafina-script-latin-400-normal.woff2',
  variable: '--font-aguafina',
  weight: '400',
  display: 'swap',
})

/** Handwritten script font (font-hand) — self-hosted Pacifico (from @fontsource/pacifico), so it never falls back offline. */
export const pacifico = localFont({
  src: '../../assets/fonts/pacifico-latin-400-normal.woff2',
  variable: '--font-pacifico',
  weight: '400',
  display: 'swap',
})
