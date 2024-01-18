import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import toast, {Toaster} from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ZPPSU INC FORM AUTOMATE',
  description: 'ZPPSU INC FORM AUTOMATE',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster/>
         <Navbar/>
        {children}
      </body>
    </html>
  )
}
