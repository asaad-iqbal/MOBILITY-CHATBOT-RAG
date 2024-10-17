'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import SignInButton from "@/components/auth/sign-in-button"

export default function SignUp() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || "Something went wrong.")
      }

      const data = await res.json()

      toast.success("Registration successful! Please sign in.")
      router.push("/auth/signin")
    } catch (error: any) {
      console.error("Error during sign up:", error)
      toast.error(error.message || "An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded shadow">
      <form onSubmit={handleSignUp} className="flex flex-col space-y-4 w-full">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        <Button type="submit" disabled={loading} className="bg-green-500 hover:bg-green-600 text-white transition-colors duration-200">
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>
      </form>
      
      {/* Sign In Link */}
      <div className="mt-6 flex flex-row items-center justify-center">
        <span className="mr-2">Already have an account?</span>
        <SignInButton />
      </div>

      <ToastContainer /> {/* This container displays all toast notifications */}
    </div>
  )
}