import { Inter } from 'next/font/google'
import { Providers } from "@/app/providers";
import '@/app/globals.css'
import { Metadata } from 'next';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'V0',
  description: 'Admin PMS',
  icons: "/faviconpms.ico",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='light'>
      <body>
        <main>
        <Providers>
          {children}
        </Providers>
      </main>
      </body>
    </html>
  )
}
