'use client'

import { useTheme } from '@/contexts/ThemeContext'
import Image from 'next/image'

const Logo = ({ className = "h-8 w-auto", showText = false }) => {
  const { theme } = useTheme()
  
  
  const logoSrc = theme === 'dark' ? '/asssets/pws-white-logo.svg' : '/asssets/pws-black-logo.svg'
  const logoSrcFallback = '/asssets/pws-black-logo.svg' 

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
          
          if (e.target.src !== logoSrcFallback) {
            e.target.src = logoSrcFallback
          }
        }}
      />
      
    </div>
  )
}

export default Logo
