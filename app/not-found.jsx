"use client"

import Link from 'next/link'
import Logo from '@/components/Logo'

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="mb-6">
        <Logo className="h-10 w-auto" />
      </div>
      <p className="text-sm text-muted-foreground">Error 404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-2 text-muted-foreground max-w-md">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <div className="mt-6 flex items-center gap-3">
        <Link href="/" className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-primary-foreground hover:opacity-90">
          Go to Home
        </Link>
        <Link href="/dashboard" className="inline-flex items-center rounded-md border px-4 py-2 hover:bg-accent">
          Open Dashboard
        </Link>
      </div>
    </main>
  )
}
