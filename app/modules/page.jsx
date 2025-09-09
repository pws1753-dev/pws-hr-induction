'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import ModulesPage from '@/pages/ModulesPage'
import MainLayout from '@/components/Layout/MainLayout'

export default function Modules() {
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

  if (!isAuthenticated) {
    return null
  }

  return (
    <MainLayout>
      <ModulesPage />
    </MainLayout>
  )
}
