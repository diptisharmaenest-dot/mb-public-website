'use client'

import { useEffect, useMemo, useState } from 'react'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { LuArrowRight, LuCalendarDays, LuClock, LuX } from 'react-icons/lu'
import { useAppDownload } from '@/providers/AppDownloadProvider'

/**
 * Store schedule: "View Schedule" / "View delivery slots" opens the cook's
 * cooking schedule for the next 7 days; "Next" then opens the app download
 * popup (pre-ordering happens in the app). Nothing is booked on the website.
 */

/** Weekly template: index 0 = Sunday … 6 = Saturday; empty list = kitchen closed. */
export type WeeklySchedule = [string[], string[], string[], string[], string[], string[], string[]]

const DAY = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function nextSevenDays(schedule: WeeklySchedule) {
  const out: { key: string; label: string; date: string; slots: string[] }[] = []
  const today = new Date()
  for (let i = 0; i < 7; i++) {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i)
    out.push({
      key: d.toISOString().slice(0, 10),
      label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : DAY[d.getDay()],
      date: `${DAY[d.getDay()].slice(0, 3)}, ${d.getDate()} ${MONTH[d.getMonth()]}`,
      slots: schedule[d.getDay()],
    })
  }
  return out
}

export function ScheduleModal({
  open,
  onClose,
  cookName,
  schedule,
}: {
  open: boolean
  onClose: () => void
  /** e.g. "Ananya" — used in the title. */
  cookName: string
  /** Missing → the schedule is only available in the app. */
  schedule?: WeeklySchedule
}) {
  const { openDownload } = useAppDownload()
  const days = useMemo(() => (open && schedule ? nextSevenDays(schedule) : []), [open, schedule])
  const [picked, setPicked] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    setPicked(null)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  const next = () => {
    onClose()
    openDownload('store-schedule-next')
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="schedule"
          className="fixed inset-0 z-[120] flex items-end justify-center bg-black/50 p-0 backdrop-blur-[2px] sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="schedule-title"
            className="flex max-h-[88vh] w-full max-w-[520px] flex-col overflow-hidden rounded-t-[26px] bg-white font-jakarta text-ink shadow-2xl sm:rounded-[26px]"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 border-b border-ink/8 px-6 pb-4 pt-5">
              <div>
                <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-verified-text">
                  <LuCalendarDays className="h-4 w-4" aria-hidden /> Cooking schedule
                </p>
                <h2 id="schedule-title" className="mt-1 text-[21px] font-bold leading-tight">
                  When {cookName} cooks
                </h2>
                {schedule ? <p className="mt-0.5 text-[13px] text-ink/55">Next 7 days · pick a slot to pre-order</p> : null}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close schedule"
                className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#F4EFE8] transition hover:bg-[#EAE2D7]"
              >
                <LuX className="h-4.5 w-4.5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {schedule ? (
                <ul className="space-y-2.5">
                  {days.map((d) => (
                    <li
                      key={d.key}
                      className={clsx('rounded-[16px] p-3.5 ring-1', d.slots.length ? 'bg-[#FBF8F4] ring-ink/6' : 'bg-[#F6F3EF] ring-transparent')}
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <p className={clsx('text-[15px] font-semibold', !d.slots.length && 'text-ink/45')}>{d.label}</p>
                        <p className="text-[12.5px] text-ink/50">{d.date}</p>
                      </div>
                      {d.slots.length ? (
                        <div className="mt-2.5 flex flex-wrap gap-2">
                          {d.slots.map((slot) => {
                            const id = `${d.key}|${slot}`
                            const on = picked === id
                            return (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => setPicked(on ? null : id)}
                                aria-pressed={on}
                                className={clsx(
                                  'inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] font-medium transition',
                                  on ? 'bg-verified text-white shadow-sm' : 'bg-white text-ink ring-1 ring-ink/10 hover:ring-verified/50',
                                )}
                              >
                                <LuClock className="h-3.5 w-3.5" aria-hidden /> {slot}
                              </button>
                            )
                          })}
                        </div>
                      ) : (
                        <p className="mt-1 text-[13px] text-ink/45">Kitchen closed</p>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="rounded-[16px] bg-[#FBF8F4] p-5 text-center ring-1 ring-ink/6">
                  <LuCalendarDays className="mx-auto h-8 w-8 text-verified" aria-hidden />
                  <p className="mt-2 text-[15px] font-semibold">{cookName}&apos;s schedule is in the app</p>
                  <p className="mt-1 text-[13px] text-ink/60">See the cooking days and delivery slots, and pre-order in the Mother Bhojan app.</p>
                </div>
              )}
            </div>

            <div className="border-t border-ink/8 px-6 pb-6 pt-4">
              <button
                type="button"
                onClick={next}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-b from-customer to-partner py-3.5 text-[16px] font-semibold text-white shadow-[0_12px_24px_-12px_rgba(219,26,26,0.7)] transition hover:-translate-y-0.5"
              >
                {picked ? 'Next — pre-order this slot in the app' : 'Next — pre-order in the app'}
                <LuArrowRight className="h-5 w-5" aria-hidden />
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
