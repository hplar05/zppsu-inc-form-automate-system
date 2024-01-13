'use client'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import './globals.css'
import { AuthContextProvider } from './context/AuthContext'
import NavBar from './components/NavBar'


const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
      <AuthContextProvider>
           <NavBar />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  )
}
