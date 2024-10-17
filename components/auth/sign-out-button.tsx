'use client'

import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function SignOutButton() {
  return (
    <Button
      onClick={() => signOut()}
      className="bg-gray-700 hover:bg-gray-800 text-white transition-colors duration-200"
      aria-label="Sign Out"
    >
      Sign Out
    </Button>
  )
}