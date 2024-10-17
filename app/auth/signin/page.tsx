'use client'

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import SignUpButton from "@/components/auth/sign-up-button"

export default function SignIn() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })

    setLoading(false)

    if (res?.error) {
      toast.error(res.error)
    } else {
      router.push("/")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Sign In to Share Mobility Chatbot</h1>
      <form onSubmit={handleCredentialsSignIn} className="w-full flex flex-col space-y-4">
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
        />
        <Button type="submit" disabled={loading} className="bg-green-500 hover:bg-green-600 text-white transition-colors duration-200">
          {loading ? "Signing In..." : "Sign In"}
        </Button>
      </form>
      
      {/* Sign Up Link */}
      <div className="mt-6 flex flex-row items-center justify-center">
        <span className="mr-2">Don't have an account?</span>
        <SignUpButton />
      </div>

      {/* GitHub Sign In */}
      <div className="mt-6">
        <Button onClick={() => signIn("github")} className="bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200">
          Sign In with GitHub
        </Button>
      </div>
      <ToastContainer />
    </div>
  )
}