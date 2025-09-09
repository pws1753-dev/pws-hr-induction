'use client'

import { AuthProvider } from '@/contexts/AuthContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { Toaster } from '@/components/ui/toaster'

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  )
}
