'use client'

import { useState } from 'react'

type Message = {
  id: number
  role: 'user' | 'assistant'
  content: string
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: input.trim(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput('')

    try {
      const response = await fetch('http://localhost:4000/llm-query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: input.trim() }),
      })

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`)
      }

      const data = await response.json()

      // Assuming the response has the shape { answer: string }
      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: data.answer,
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error in API call:', error)
      // Optionally, add an error message to the chat
      const errorMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: 'Sorry, there was an error processing your request.',
      }
      setMessages((prev) => [...prev, errorMessage])
    }
  }

  return { messages, input, handleInputChange, handleSubmit }
}