'use client'

import ChatInterface from '@/components/chat-interface'
import ThemeToggle from '@/components/theme-toggle'
import { useSession } from "next-auth/react"
import SignInButton from '@/components/auth/sign-in-button'

export default function Home() {
  const { data: session, status } = useSession()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-600 dark:from-black dark:to-gray-800 text-white">
      <div className="fixed top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      {status === "loading" ? (
        <div>Loading...</div>
      ) : session ? (
        <ChatInterface />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-4">Welcome to Share Mobility Chatbot</h1>
          <SignInButton />
        </div>
      )}
    </main>
  )
}