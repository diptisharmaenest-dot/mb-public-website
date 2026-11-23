'use client'

import { Section } from '@/components'
import ContactDetails from './ContactDetails'
import ContactForm from './ContactForm'

const ContactMain = () => {
  return (
    <Section id="contact-main" aria-label="Contact form and details" className="bg-paper">
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-8">
        <ContactForm />
        <ContactDetails />
      </div>
    </Section>
  )
}

export default ContactMain
