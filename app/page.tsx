'use client'

import ChatInterface from '@/components/chat-interface'
import ThemeToggle from '@/components/theme-toggle'
import { useSession, signIn } from "next-auth/react"
import Link from 'next/link'
import { Button } from "@/components/ui/button"

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
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-3xl font-bold mb-4">Welcome to Share Mobility Chatbot</h1>
          <Button asChild className="w-full max-w-md bg-blue-500 hover:bg-blue-600 text-white">
            <Link href="/auth/signin">Sign In with Email</Link>
          </Button>
          <Button onClick={() => signIn("github")} className="w-full max-w-md bg-gray-800 hover:bg-gray-900 text-white">
            Sign In with GitHub
          </Button>
          <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      )}
    </main>
  )
}