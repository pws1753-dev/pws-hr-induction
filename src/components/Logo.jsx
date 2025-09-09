'use client'

import { useTheme } from '@/contexts/ThemeContext'
import Image from 'next/image'

const Logo = ({ className = "h-8 w-auto", showText = true }) => {
  const { theme } = useTheme()
  
  // Use black logo for light theme, white logo for dark theme
  const logoSrc = theme === 'dark' ? '/asssets/pws-white-logo.svg' : '/asssets/pws-black-logo.svg'
  const logoSrcFallback = '/asssets/pws-black-logo.svg' // fallback for SSR

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Image
        src={logoSrc}
        alt="PWS Group Logo"
        width={225}
        height={113}
        className="h-8 w-auto object-contain"
        priority
        onError={(e) => {
          // Fallback to black logo if white logo fails to load
          if (e.target.src !== logoSrcFallback) {
            e.target.src = logoSrcFallback
          }
        }}
      />
      
    </div>
  )
}

export default Logo
