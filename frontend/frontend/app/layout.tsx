import type { Metadata, Viewport } from 'next'
import { Inter, DM_Serif_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const dmSerif = DM_Serif_Display({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dm-serif'
})

export const metadata: Metadata = {
  title: 'Kinderly | Find Trusted Babysitters Near You',
  description: 'Kinderly connects parents with verified, trusted babysitters in your neighborhood. Book reliable childcare with confidence.',
  keywords: ['babysitter', 'childcare', 'nanny', 'trusted babysitters', 'parenting', 'child care marketplace'],
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#f5f0e8',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${inter.variable} ${dmSerif.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
