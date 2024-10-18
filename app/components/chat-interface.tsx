'use client'

import { useSession } from "next-auth/react"

export default function ChatInterface() {
  const { data: session } = useSession()

  if (!session) {
    return <div>Please sign in to access the chat.</div>
  }

  return (
    <div className="w-full max-w-2xl p-4 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Chat Interface</h2>
      {/* Implement your chat UI here */}
      <p className="text-gray-700 dark:text-gray-200">Welcome, {session.user?.name || session.user?.email}!</p>
    </div>
  )
}