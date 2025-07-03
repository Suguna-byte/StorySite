import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'next app',
  description: 'Created with next',
  
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
