'use client'

import { useSession, signIn } from "next-auth/react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/toast-provider"
import ThemeToggle from "@/components/theme-toggle"
import ChatInterface from '@/components/chat-interface'

export default function SignIn() {
  const { data: session, status } = useSession()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { addToast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })

    if (res?.error) {
      addToast({
        title: "Error",
        description: res.error,
        variant: "destructive",
      })
    } else {
      addToast({
        title: "Success",
        description: "Signed in successfully!",
        variant: "success",
      })
      router.push("/")
    }
  }

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
          <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-200 mb-2">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your-email@example.com"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 dark:text-gray-200 mb-2">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white mb-4">
              Sign In
            </Button>
          </form>
          <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
            Don&apos;t have an account?{" "}
            <a href="/auth/signup" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
          <div className="mt-4">
            <Button onClick={() => signIn("github")} className="bg-blue-500 hover:bg-blue-600 text-white">
              Sign In with GitHub
            </Button>
          </div>
        </div>
      )}
    </main>
  )
}