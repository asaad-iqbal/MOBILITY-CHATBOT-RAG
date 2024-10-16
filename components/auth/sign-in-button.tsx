'use client'

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function SignInButton() {
  return (
    <Button onClick={() => signIn("github")} className="bg-blue-500 hover:bg-blue-600 text-white">
      Sign In with GitHub
    </Button>
  )
}