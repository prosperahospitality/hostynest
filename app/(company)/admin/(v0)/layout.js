'use client'
import React, { useState } from 'react';
import CompanySideBar from "@/app/(company)/admin/(v0)/companyside-bar";
import CompanyChiledSideBar from '@/app/(company)/admin/(v0)/companychiledside-bar';
import CompanyTopBar from '@/app/(company)/admin/(v0)/companytop-bar';

export default function AdminPageLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true); // State to manage sidebar open/close

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle the state
  };


  return (
    <div className="flex h-screen">
      <div className="w-[3%]"><CompanySideBar /></div>
      <div className={`${isOpen ? 'w-[17%]' : 'w-16'} transition-all duration-800 overflow-hidden`}><CompanyChiledSideBar isOpen={isOpen} toggleSidebar={toggleSidebar} /></div>
      <div className={`${isOpen ? 'w-[80%]' : 'w-[100%]'} `}>
        <div className="h-[8%]">
          <CompanyTopBar />
        </div>
        <div className="h-[92%] overflow-y-scroll">
          {/* <div className="flex overflow-hidden w-full"> */}
            {children}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
