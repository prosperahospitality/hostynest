import { Inter } from 'next/font/google'
import { Providers } from "@/app/providers";
import '@/app/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Booking Ota',
  description: 'Hourly Booking Platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='light'>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
