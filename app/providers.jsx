'use client'

import { AuthProvider } from '@/contexts/AuthContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from '@/components/ui/toaster'

export default function Providers({ children }) {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}
