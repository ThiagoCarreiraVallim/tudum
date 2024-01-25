import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import PrelineScript from '../components/PrelineScript'
import NextAuthSessionProvider from '@/providers/sessionProvider'
import TodoContextProvider from '@/context/todoContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tudum',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} `}>
        <NextAuthSessionProvider>
        <TodoContextProvider>
          {children}
        </TodoContextProvider>
        </NextAuthSessionProvider>
      </body>
      <PrelineScript />
    </html>
  )
}