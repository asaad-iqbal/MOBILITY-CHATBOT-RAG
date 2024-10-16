'use client'

import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function SignOutButton() {
  return (
    <Button
      onClick={() => signOut()}
      className="bg-red-500 hover:bg-red-600 text-white shadow-lg border border-red-700 transition-colors duration-200"
      aria-label="Sign Out"
    >
      Sign Out
    </Button>
  )
}