'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useChat } from '@/lib/use-chat'
import { motion, AnimatePresence } from "framer-motion"
import { Send, Star } from "lucide-react"
import { useSession } from "next-auth/react"
import SignOutButton from '@/components/auth/sign-out-button'
import { signIn } from 'next-auth/react'

export default function ChatInterface() {
  const { data: session, status } = useSession()
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  const [stars, setStars] = useState<{ id: number; x: number; y: number }[]>([])
  const [showIntro, setShowIntro] = useState(true)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const newStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))
    setStars(newStars)
  }, [])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleGetStarted = () => {
    setShowIntro(false)
  }

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (!session) {
    return (
      <div className="w-full max-w-md mx-auto p-4 relative flex flex-col items-center justify-center min-h-screen">
        {/* You may want to use SignInButton here if not already */}
        <Button onClick={() => signIn("github")} className="bg-blue-500 hover:bg-blue-600 text-white">
          Sign In
        </Button>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto p-4 relative">
      {/* Sign Out Button with higher z-index */}
      <div className="absolute top-4 right-4 z-20">
        <SignOutButton />
      </div>
      
      {/* Background Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute"
            initial={{ x: `${star.x}%`, y: `${star.y}%`, opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: Math.random() * 3 + 2,
              delay: Math.random() * 2,
            }}
          >
            <Star className="text-yellow-200" size={Math.random() * 4 + 2} />
          </motion.div>
        ))}
      </div>
      
      {/* Main Content */}
      <AnimatePresence>
        {showIntro ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-8 text-center">
              <div className="flex justify-center space-x-4 mb-6">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl"
                >
                  🚗
                </motion.div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                  className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl"
                >
                  🚲
                </motion.div>
              </div>
              <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Welcome to Share Mobility!</h1>
              <p className="text-gray-600 dark:text-gray-300 mb-8">Your friendly AI assistant for all your transportation needs. Let's get moving!</p>
              <Button onClick={handleGetStarted} size="lg" className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
                Get Started
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-4 bg-gradient-to-r from-blue-500 to-green-500">
              <h1 className="text-2xl font-bold text-center text-white">Share Mobility Chat</h1>
            </div>
            <ScrollArea className="h-[60vh] p-4" ref={chatContainerRef}>
              {messages.map((m, index) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`mb-4 ${
                    m.role === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  <span
                    className={`inline-block p-3 rounded-lg ${
                      m.role === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
                    }`}
                  >
                    {m.content}
                  </span>
                </motion.div>
              ))}
            </ScrollArea>
            <form onSubmit={handleSubmit} className="p-4 bg-gray-100 dark:bg-gray-700">
              <div className="flex items-center space-x-2">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Type your message here..."
                  className="flex-grow bg-white dark:bg-gray-600 text-gray-800 dark:text-white border-gray-300 dark:border-gray-500 focus:border-blue-500"
                />
                <Button type="submit" size="icon" className="bg-blue-500 hover:bg-blue-600 text-white">
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send message</span>
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}