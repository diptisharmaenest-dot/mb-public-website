'use client'

import { useId, useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import clsx from 'clsx'
import { FiArrowRight, FiCheck, FiSend } from 'react-icons/fi'
import { LuChefHat, LuMessageCircle, LuPackage, LuUtensils } from 'react-icons/lu'
import { Button, DownloadAppButton } from '@/components'
import { submitContactMessage, type ContactTopic } from '@/features/contact'
import { EASE } from '@/shared/lib/motion'

/* Form for the dark "Write to us" panel. */

const MESSAGE_MAX = 1000
const MESSAGE_MIN = 10

const TOPICS: {
  id: ContactTopic
  label: string
  icon: typeof LuUtensils
  placeholder: string
}[] = [
  { id: 'ordering', label: 'Ordering food', icon: LuUtensils, placeholder: 'e.g. Which kitchens deliver to Sector 70?' },
  { id: 'kitchen', label: 'Opening my kitchen', icon: LuChefHat, placeholder: 'Tell us a little about your cooking and where you live.' },
  { id: 'my-order', label: 'An order I placed', icon: LuPackage, placeholder: 'What went wrong? We will look into it.' },
  { id: 'other', label: 'Something else', icon: LuMessageCircle, placeholder: 'How can we help?' },
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Accepts an email, or an Indian mobile number (optionally with +91 / 0). */
function classifyContact(value: string): 'email' | 'phone' | null {
  const v = value.trim()
  if (EMAIL_RE.test(v)) return 'email'
  const digits = v.replace(/[\s()-]/g, '').replace(/^(\+91|0091|91|0)(?=\d{10}$)/, '')
  if (/^[6-9]\d{9}$/.test(digits)) return 'phone'
  return null
}

type Fields = { name: string; contact: string; orderNumber: string; message: string }
type FieldErrors = Partial<Record<keyof Fields, string>>

function validate(fields: Fields): FieldErrors {
  const errors: FieldErrors = {}
  if (fields.name.trim().length < 2) errors.name = 'Please tell us your name.'
  if (!fields.contact.trim()) errors.contact = 'We need a phone number or email to reply.'
  else if (!classifyContact(fields.contact)) errors.contact = 'Enter a 10-digit mobile number or a valid email.'
  const len = fields.message.trim().length
  if (len < MESSAGE_MIN) errors.message = `A few more words, please (at least ${MESSAGE_MIN} characters).`
  else if (len > MESSAGE_MAX) errors.message = `Please keep it under ${MESSAGE_MAX} characters.`
  return errors
}

const inputClass =
  'w-full rounded-xl border bg-white/[0.06] px-4 py-3 text-[15px] text-white placeholder:text-white/35 transition-colors focus:bg-white/[0.09] focus:outline-none focus:ring-4'

function inputState(error?: string, ok?: boolean) {
  if (error) return 'border-[#FF8F86]/70 focus:border-[#FF8F86] focus:ring-[#FF8F86]/15'
  if (ok) return 'border-verified/80 focus:border-verified focus:ring-verified/20'
  return 'border-white/15 hover:border-white/25 focus:border-yellow/70 focus:ring-yellow/10'
}

function Field({
  id,
  label,
  hint,
  error,
  ok,
  children,
}: {
  id: string
  label: string
  hint?: ReactNode
  error?: string
  ok?: boolean
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5 text-left">
      <label htmlFor={id} className="flex items-center gap-1.5 text-[13px] font-bold text-white/85">
        {label}
        {hint ? <span className="font-medium text-white/45">{hint}</span> : null}
        <AnimatePresence>
          {ok ? (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="ml-auto flex h-4 w-4 items-center justify-center rounded-full bg-verified text-white"
              aria-hidden
            >
              <FiCheck className="h-3 w-3" strokeWidth={3} />
            </motion.span>
          ) : null}
        </AnimatePresence>
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error ? (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-[12.5px] font-semibold text-[#FF9C93]"
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

const EMPTY: Fields = { name: '', contact: '', orderNumber: '', message: '' }

const ContactForm = () => {
  const uid = useId()
  const [topic, setTopic] = useState<ContactTopic>('ordering')
  const [fields, setFields] = useState<Fields>(EMPTY)
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const errors = validate(fields)
  const shown = (key: keyof Fields) => (touched[key] ? errors[key] : undefined)
  const ok = (key: keyof Fields) => Boolean(touched[key] && !errors[key] && fields[key].trim())
  const active = TOPICS.find((t) => t.id === topic) ?? TOPICS[0]
  const messageLength = fields.message.length

  const update = (key: keyof Fields) => (value: string) => setFields((prev) => ({ ...prev, [key]: value }))
  const touch = (key: keyof Fields) => () => setTouched((t) => ({ ...t, [key]: true }))

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setTouched({ name: true, contact: true, message: true })
    if (Object.keys(errors).length) {
      const first = (['name', 'contact', 'message'] as const).find((k) => errors[k])
      if (first) document.getElementById(`${uid}-${first}`)?.focus()
      return
    }
    setStatus('sending')
    try {
      await submitContactMessage({
        topic,
        name: fields.name.trim(),
        contact: fields.contact.trim(),
        contactType: classifyContact(fields.contact) ?? 'email',
        orderNumber: topic === 'my-order' && fields.orderNumber.trim() ? fields.orderNumber.trim() : undefined,
        message: fields.message.trim(),
      })
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const reset = () => {
    setFields(EMPTY)
    setTouched({})
    setStatus('idle')
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === 'sent' ? (
        <motion.div
          key="thanks"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="flex min-h-[460px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-10 text-center"
          role="status"
        >
          <motion.span
            initial={{ scale: 0.4, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.1 }}
            className="flex h-16 w-16 items-center justify-center rounded-2xl bg-verified text-white shadow-[0_10px_30px_-8px_rgba(141,165,82,0.7)]"
          >
            <FiCheck className="h-8 w-8" strokeWidth={2.8} aria-hidden />
          </motion.span>
          <h3 className="mt-5 font-jakarta text-[26px] font-bold tracking-tight text-white">
            Thank you, {fields.name.trim().split(/\s+/)[0]}!
          </h3>
          <p className="mt-1 font-hand text-[22px] text-yellow">your message has reached us</p>
          <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-white/70">
            We&apos;ll reply on <b className="font-semibold text-white">{fields.contact.trim()}</b>, usually within one working day.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-7 cursor-pointer rounded-xl border border-white/20 px-5 py-2.5 text-[14px] font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
          >
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          noValidate
          onSubmit={onSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-5"
          aria-label="Contact form"
        >
          {/* Topic chips */}
          <fieldset>
            <legend className="mb-2.5 text-[13px] font-bold text-white/85">What can we help with?</legend>
            <div className="grid grid-cols-2 gap-2.5">
              {TOPICS.map((t) => {
                const Icon = t.icon
                const selected = t.id === topic
                return (
                  <label
                    key={t.id}
                    className={clsx(
                      'group relative flex min-h-[52px] cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-[13.5px] font-semibold transition-all duration-200 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-yellow/20',
                      selected
                        ? 'border-customer bg-gradient-to-b from-customer to-partner text-white shadow-[0_8px_22px_-8px_rgba(225,87,76,0.8)]'
                        : 'border-white/12 bg-white/[0.04] text-white/75 hover:-translate-y-0.5 hover:border-white/30 hover:text-white',
                    )}
                  >
                    <input
                      type="radio"
                      name="topic"
                      value={t.id}
                      checked={selected}
                      onChange={() => setTopic(t.id)}
                      className="sr-only"
                    />
                    <span
                      className={clsx(
                        'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors',
                        selected ? 'bg-white/20' : 'bg-white/[0.06] group-hover:bg-white/10',
                      )}
                      aria-hidden
                    >
                      <Icon className="h-[17px] w-[17px]" />
                    </span>
                    <span className="leading-tight">{t.label}</span>
                  </label>
                )
              })}
            </div>
          </fieldset>

          <AnimatePresence initial={false}>
            {topic === 'kitchen' ? (
              <motion.div
                key="kitchen-tip"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-3 rounded-xl border border-verified/40 bg-verified/10 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[13.5px] font-medium text-white/85">
                    Ready to start? Download the Mother Bhojan app to set up your kitchen.
                  </p>
                  <DownloadAppButton source="contact-kitchen" openLabel="Open the app" variant="verified" size="sm" className="shrink-0">
                    Open your kitchen
                    <FiArrowRight className="h-4 w-4" aria-hidden />
                  </DownloadAppButton>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field id={`${uid}-name`} label="Your name" error={shown('name')} ok={ok('name')}>
              <input
                id={`${uid}-name`}
                type="text"
                autoComplete="name"
                placeholder="e.g. Priya Sharma"
                value={fields.name}
                onChange={(e) => update('name')(e.target.value)}
                onBlur={touch('name')}
                aria-invalid={Boolean(shown('name'))}
                aria-describedby={shown('name') ? `${uid}-name-error` : undefined}
                className={clsx(inputClass, inputState(shown('name'), ok('name')))}
              />
            </Field>
            <Field id={`${uid}-contact`} label="Phone or email" error={shown('contact')} ok={ok('contact')}>
              <input
                id={`${uid}-contact`}
                type="text"
                inputMode="email"
                autoComplete="email"
                placeholder="98765 43210 or you@email.com"
                value={fields.contact}
                onChange={(e) => update('contact')(e.target.value)}
                onBlur={touch('contact')}
                aria-invalid={Boolean(shown('contact'))}
                aria-describedby={shown('contact') ? `${uid}-contact-error` : undefined}
                className={clsx(inputClass, inputState(shown('contact'), ok('contact')))}
              />
            </Field>
          </div>

          <AnimatePresence initial={false}>
            {topic === 'my-order' ? (
              <motion.div
                key="order-number"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="overflow-hidden"
              >
                <Field id={`${uid}-order`} label="Order number" hint="(optional)">
                  <input
                    id={`${uid}-order`}
                    type="text"
                    placeholder="e.g. #00194"
                    value={fields.orderNumber}
                    onChange={(e) => update('orderNumber')(e.target.value)}
                    className={clsx(inputClass, inputState())}
                  />
                </Field>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <Field id={`${uid}-message`} label="Your message" error={shown('message')} ok={ok('message')}>
            <textarea
              id={`${uid}-message`}
              rows={5}
              maxLength={MESSAGE_MAX}
              placeholder={active.placeholder}
              value={fields.message}
              onChange={(e) => update('message')(e.target.value)}
              onBlur={touch('message')}
              aria-invalid={Boolean(shown('message'))}
              aria-describedby={`${uid}-count${shown('message') ? ` ${uid}-message-error` : ''}`}
              className={clsx(inputClass, 'resize-y', inputState(shown('message'), ok('message')))}
            />
          </Field>

          {status === 'error' ? (
            <p role="alert" className="rounded-xl border border-[#FF8F86]/40 bg-[#FF8F86]/10 px-4 py-3 text-[13.5px] font-medium text-[#FFB3AC]">
              Sorry, your message didn&apos;t go through. Please try again in a moment.
            </p>
          ) : null}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span
              id={`${uid}-count`}
              className={clsx(
                'text-[12px] tabular-nums',
                messageLength > MESSAGE_MAX * 0.9 ? 'font-semibold text-[#FF9C93]' : 'text-white/45',
              )}
            >
              {messageLength} / {MESSAGE_MAX} characters
            </span>
            <Button
              type="submit"
              variant="customer"
              size="md"
              disabled={status === 'sending'}
              className="w-full px-8 sm:w-auto"
            >
              {status === 'sending' ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden />
                  Sending…
                </>
              ) : (
                <>
                  Send message
                  <FiSend className="h-4 w-4" aria-hidden />
                </>
              )}
            </Button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  )
}

export default ContactForm
