'use client'

import Link from 'next/link'

interface AuthLinkProps {
  href: string
  children: React.ReactNode
  ariaLabel?: string
}

export default function AuthLink({ href, children, ariaLabel }: AuthLinkProps) {
  return (
    <Link
      href={href}
      className="text-blue-500 hover:text-blue-700 underline font-semibold transition-colors duration-200"
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  )
}