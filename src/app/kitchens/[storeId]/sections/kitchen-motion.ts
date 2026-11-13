import type { Variants } from 'framer-motion'
import { EASE } from '@/shared/lib/motion'

export const kitchenViewport = { once: true, amount: 0.15, margin: '0px 0px -40px 0px' } as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE, delay },
  }),
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, ease: EASE, delay },
  }),
}

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -14 },
  show: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: EASE, delay },
  }),
}

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 14 },
  show: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: EASE, delay },
  }),
}

export const staggerChildren: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE, delay },
  }),
}
