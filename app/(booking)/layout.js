import { Inter } from 'next/font/google'
import { Providers } from "@/app/providers";
import '@/app/globals.css'
import SiteHeader from '@/_components/layout/booking/SiteHeader';
import SiteFooter from '@/_components/layout/booking/SiteFooter';
import { Suspense } from 'react';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'HostyNest',
  description: 'Hourly Booking Platform',
}

export default function RootLayout(props) {
  return (
    <html lang="en" className='light'>
      <body className='bg-white text-black' >
        <main>
        <Providers>
        <Suspense>
        <SiteHeader />
          {props.parallel}
          {props.children}
        <SiteFooter />
        </Suspense>
        </Providers>
        </main>
      </body>
    </html>
  )
}
