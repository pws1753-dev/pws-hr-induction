'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import AdminEmployees from '@/pages/AdminEmployees'
import MainLayout from '@/components/Layout/MainLayout'

export default function AdminEmployeesPage() {
  const { isAuthenticated, loading, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login')
    } else if (!loading && isAuthenticated && user?.role !== 'admin') {
      router.push('/dashboard')
    }
  }, [isAuthenticated, loading, user, router])

  if (loading) {
    return <div className="min-h-screen bg-background" />
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return null
  }

  return (
    <MainLayout>
      <AdminEmployees />
    </MainLayout>
  )
}
