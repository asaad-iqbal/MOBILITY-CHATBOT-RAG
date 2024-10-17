'use client'

import AuthLink from './auth-link'

export default function SignUpButton() {
  return (
    <AuthLink href="/auth/signup" ariaLabel="Sign Up">
      Sign Up
    </AuthLink>
  )
}