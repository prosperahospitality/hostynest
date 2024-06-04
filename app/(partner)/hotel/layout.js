'use client'
import React, { useState } from 'react';
import Sidebar from "@/app/(partner)/hotel/SideBar";
import TopBar from "@/app/(partner)/hotel/TopBar";
import { Inter } from 'next/font/google'
import { Providers } from "@/app/providers";
import '@/app/globals.css'


const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'PMS',
//   description: 'PMS',
// }

export default function pmsPageLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true); // State to manage sidebar open/close

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle the state
  };

  return (
    <html lang="en" className='light'>
      <body>
        <main>
          <Providers>
            <div className='flex h-screen'>
              <div className={`${isOpen ? 'w-[20%]' : 'w-16'} transition-all h-screen duration-800 overflow-y-scroll`}>
                <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
              </div>
              <div className={`${isOpen ? 'w-[80%]' : 'w-[95%]'} bg-foreground `}>
                <div className="m-2 w-[99%] h-[98%] bg-background rounded-3xl overflow-y-scroll">
                  <div className="h-[8%]">
                    <TopBar />
                  </div>
                  <div className="h-[92%] overflow-y-scroll">
                    {/* <div className="flex overflow-hidden w-full"> */}
                    {children}
                    {/* </div> */}
                  </div>
                </div>
              </div>
            </div>
          </Providers>
        </main>
      </body>
    </html>
  )
}