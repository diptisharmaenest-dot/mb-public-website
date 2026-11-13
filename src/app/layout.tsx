import type { Metadata } from 'next'
import './globals.css'
import { aguafina, antonio, jakarta, pacifico } from '@/shared/theme/fonts'
import { AppProviders } from '@/providers'
import MainLayout from '@/components/layout/MainLayout'
import { JsonLd, createRootMetadata, absoluteUrl, SITE_NAME, SITE_TAGLINE } from '@/shared/seo'

export const metadata: Metadata = createRootMetadata()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const siteUrl = absoluteUrl('/')
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: siteUrl,
      description: SITE_TAGLINE,
      inLanguage: 'en-US',
      publisher: { '@type': 'Organization', name: SITE_NAME, url: siteUrl },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: siteUrl,
      description: SITE_TAGLINE,
    },
  ]

  return (
    <html lang="en" className={`${jakarta.variable} ${antonio.variable} ${aguafina.variable} ${pacifico.variable}`}>
      <body className="font-jakarta overflow-x-clip w-full max-w-full" suppressHydrationWarning>
        <JsonLd data={structuredData} />
        <AppProviders>
          <MainLayout>{children}</MainLayout>
        </AppProviders>
      </body>
    </html>
  )
}
