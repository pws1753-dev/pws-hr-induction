'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import MainLayout from '@/components/Layout/MainLayout'
import { Toaster } from '@/components/ui/toaster'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, loading, router])

  if (loading) {
    return <div className="min-h-screen bg-background" />
  }

  return isAuthenticated ? children : null
}

export default function HomePage() {
  const { user, isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && isAuthenticated) {
      const redirectPath = user?.role === 'admin' ? '/admin' : '/dashboard'
      router.push(redirectPath)
    }
  }, [user, isAuthenticated, loading, router])

  if (loading) {
    return <div className="min-h-screen bg-background" />
  }

  return (
    <>
      <ProtectedRoute>
        <MainLayout>
          <div className="min-h-screen bg-background" />
        </MainLayout>
      </ProtectedRoute>
      <Toaster />
    </>
  )
}
