import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Share Mobility Chatbot',
  description: 'Chat with Share Mobility support',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-600 dark:from-black dark:to-gray-800 text-white px-4`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}