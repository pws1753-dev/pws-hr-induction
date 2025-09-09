import { Inter } from 'next/font/google'
import Providers from './providers'
import '@/index.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'PWS Group - Corporate Induction LMS',
  description: 'Advanced Learning Management System for corporate induction and training programs at PWS Group',
  openGraph: {
    title: 'PWS Group - Corporate Induction LMS',
    description: 'Advanced Learning Management System for corporate induction and training programs at PWS Group',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link 
          href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-background font-sans">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
