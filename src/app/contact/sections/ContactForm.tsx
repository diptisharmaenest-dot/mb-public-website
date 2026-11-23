'use client'

import { useId, useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import clsx from 'clsx'
import { FiArrowRight, FiCheck, FiSend } from 'react-icons/fi'
import { LuChefHat, LuMessageCircle, LuPackage, LuUtensils } from 'react-icons/lu'
import { Button, CARD_PADDING, FEATURE_CARD } from '@/components'
import { submitContactMessage, type ContactTopic } from '@/features/contact'
import { EASE } from '@/shared/lib/motion'
import { ROUTES } from '@/shared/seo'

const MESSAGE_MAX = 1000
const MESSAGE_MIN = 10

const TOPICS: {
  id: ContactTopic
  label: string
  icon: typeof LuUtensils
  placeholder: string
}[] = [
  {
    id: 'ordering',
    label: 'Ordering food',
    icon: LuUtensils,
    placeholder: 'e.g. Which kitchens deliver to Sector 70?',
  },
  {
    id: 'kitchen',
    label: 'Opening my kitchen',
    icon: LuChefHat,
    placeholder: 'Tell us a little about your cooking and where you live.',
  },
  {
    id: 'my-order',
    label: 'An order I placed',
    icon: LuPackage,
    placeholder: 'What went wrong? We will look into it.',
  },
  {
    id: 'other',
    label: 'Something else',
    icon: LuMessageCircle,
    placeholder: 'How can we help?',
  },
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
  else if (!classifyContact(fields.contact))
    errors.contact = 'Enter a 10-digit mobile number or a valid email.'
  const len = fields.message.trim().length
  if (len < MESSAGE_MIN) errors.message = `A few more words, please (at least ${MESSAGE_MIN} characters).`
  else if (len > MESSAGE_MAX) errors.message = `Please keep it under ${MESSAGE_MAX} characters.`
  return errors
}

const inputClass =
  'w-full rounded-xl border bg-paper px-3.5 py-3 text-[15px] text-ink placeholder:text-muted transition-colors focus:outline-none focus:ring-4'

function inputState(error?: string, ok?: boolean) {
  if (error) return 'border-partner/60 focus:border-partner focus:ring-partner/10'
  if (ok) return 'border-verified/70 focus:border-verified-dark focus:ring-verified/15'
  return 'border-ink/15 focus:border-customer focus:ring-customer/10'
}

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string
  label: string
  hint?: ReactNode
  error?: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5 text-left">
      <label htmlFor={id} className="text-[13px] font-bold text-ink">
        {label}
        {hint ? <span className="ml-1.5 font-medium text-muted">{hint}</span> : null}
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
            className="text-[12.5px] font-semibold text-partner"
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

  const update = (key: keyof Fields) => (value: string) =>
    setFields((prev) => ({ ...prev, [key]: value }))

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
    <div className={`${FEATURE_CARD} border border-border-card ${CARD_PADDING} relative overflow-hidden`}>
      <AnimatePresence mode="wait" initial={false}>
        {status === 'sent' ? (
          <motion.div
            key="thanks"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="flex min-h-[420px] flex-col items-center justify-center px-2 py-8 text-center"
            role="status"
          >
            <motion.span
              initial={{ scale: 0.4, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.1 }}
              className="flex h-16 w-16 items-center justify-center rounded-2xl bg-verified-pill text-verified-dark"
            >
              <FiCheck className="h-8 w-8" strokeWidth={2.6} aria-hidden />
            </motion.span>
            <h2 className="mt-5 font-jakarta text-[24px] font-bold tracking-tight text-ink">
              Thank you, {fields.name.trim().split(/\s+/)[0]}!
            </h2>
            <p className="body-copy mt-2 max-w-sm !text-text-500">
              Your message has reached us. We&apos;ll reply on{' '}
              <b className="font-semibold text-ink">{fields.contact.trim()}</b>, usually within one
              working day.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-6 cursor-pointer text-[14px] font-semibold text-customer underline-offset-4 hover:underline"
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
            aria-labelledby={`${uid}-title`}
          >
            <div>
              <h2 id={`${uid}-title`} className="text-h3 text-ink">
                Send us a message
              </h2>
              <p className="mt-1 text-[14px] text-muted">All fields are needed, unless marked optional.</p>
            </div>

            {/* Topic chips */}
            <fieldset>
              <legend className="mb-2.5 text-[13px] font-bold text-ink">What can we help with?</legend>
              <div className="grid grid-cols-2 gap-2.5">
                {TOPICS.map((t) => {
                  const Icon = t.icon
                  const selected = t.id === topic
                  return (
                    <label
                      key={t.id}
                      className={clsx(
                        'group relative flex min-h-12 cursor-pointer items-center gap-2.5 rounded-xl border-2 px-3 py-2.5 text-[13.5px] font-semibold transition-all duration-200 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-customer/15',
                        selected
                          ? 'border-customer bg-customer-muted text-customer shadow-sm'
                          : 'border-ink/10 bg-white text-ink/80 hover:-translate-y-0.5 hover:border-customer/40',
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
                      <Icon
                        className={clsx(
                          'h-[18px] w-[18px] shrink-0 transition-transform duration-200',
                          selected ? 'scale-110' : 'text-ink/50 group-hover:text-customer',
                        )}
                        aria-hidden
                      />
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
                  <div className="flex flex-col gap-3 rounded-xl border border-verified-pill-border bg-verified-pill px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[13.5px] font-medium text-ink/80">
                      Ready to start? The quickest way is our short kitchen application.
                    </p>
                    <Button href={ROUTES.join} variant="verified" size="sm" className="shrink-0">
                      Open your kitchen
                      <FiArrowRight className="h-4 w-4" aria-hidden />
                    </Button>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field id={`${uid}-name`} label="Your name" error={shown('name')}>
                <input
                  id={`${uid}-name`}
                  type="text"
                  autoComplete="name"
                  placeholder="e.g. Priya Sharma"
                  value={fields.name}
                  onChange={(e) => update('name')(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                  aria-invalid={Boolean(shown('name'))}
                  aria-describedby={shown('name') ? `${uid}-name-error` : undefined}
                  className={clsx(inputClass, inputState(shown('name'), ok('name')))}
                />
              </Field>
              <Field id={`${uid}-contact`} label="Phone or email" error={shown('contact')}>
                <input
                  id={`${uid}-contact`}
                  type="text"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="98765 43210 or you@email.com"
                  value={fields.contact}
                  onChange={(e) => update('contact')(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, contact: true }))}
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

            <Field id={`${uid}-message`} label="Your message" error={shown('message')}>
              <textarea
                id={`${uid}-message`}
                rows={5}
                maxLength={MESSAGE_MAX}
                placeholder={active.placeholder}
                value={fields.message}
                onChange={(e) => update('message')(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                aria-invalid={Boolean(shown('message'))}
                aria-describedby={`${uid}-count${shown('message') ? ` ${uid}-message-error` : ''}`}
                className={clsx(inputClass, 'resize-y', inputState(shown('message'), ok('message')))}
              />
              <span
                id={`${uid}-count`}
                className={clsx(
                  'self-end text-[12px] tabular-nums',
                  messageLength > MESSAGE_MAX * 0.9 ? 'font-semibold text-partner' : 'text-muted',
                )}
              >
                {messageLength} / {MESSAGE_MAX}
              </span>
            </Field>

            {status === 'error' ? (
              <p role="alert" className="rounded-xl bg-partner-muted px-4 py-3 text-[13.5px] font-medium text-partner">
                Sorry, your message didn&apos;t go through. Please try again in a moment.
              </p>
            ) : null}

            <Button
              type="submit"
              variant="customer"
              size="md"
              fullWidth
              disabled={status === 'sending'}
              className="sm:!w-auto sm:self-start sm:px-8"
            >
              {status === 'sending' ? (
                <>
                  <span
                    className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                    aria-hidden
                  />
                  Sending…
                </>
              ) : (
                <>
                  Send message
                  <FiSend className="h-4 w-4" aria-hidden />
                </>
              )}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ContactForm
