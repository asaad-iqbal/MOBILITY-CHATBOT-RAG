'use client'

import AuthLink from './auth-link'

export default function SignInButton() {
  return (
    <AuthLink href="/auth/signin" ariaLabel="Sign In">
      Sign In
    </AuthLink>
  )
}