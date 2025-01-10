'use client'
import React, { useState } from 'react';
import Image from 'next/image'
import { IMAGES } from '@/public/index'
import Dropdown from '@/_components/ui/Dropdown';
import Link from 'next/link'
import { button as buttonStyles } from "@nextui-org/theme";
import {Tooltip} from "@nextui-org/react";
import { LayoutDashboard, Building2, CalendarCheck, User, LogIn, PanelLeftClose, PanelLeftOpen, FilePieChart } from 'lucide-react'
import BookingsDropDown from "@/app/(partner)/hotel/BookingsDropDown"
import RatesInventoryDropDown from "@/app/(partner)/hotel/RatesInventoryDropDown"
import GrowYourBusinessDropDown from "@/app/(partner)/hotel/GrowYourBusinessDropDown"
import ReviewsDropDown from "@/app/(partner)/hotel/ReviewsDropDown"
import GuestChatDropDown from "@/app/(partner)/hotel/GuestChatDropDown"
import MoreDropDown from "@/app/(partner)/hotel/MoreDropDown"
import { Logo } from "@/_components/icon";
import PropertyMasterDropDown from "@/app/(partner)/hotel/PropertyMasterDropDown"
import ReportsDropDown from './ReportsDropDown';



const SideBar = ({isOpen, toggleSidebar}) => {

    return (
        <>
            <aside className={`flex overflow-y-auto flex-col px-5 py-4 h-screen bg-foreground ${isOpen ? '' : 'w-16'}`}>
                <Link className="flex justify-between items-center" href="">
                    <Logo size={60}/>
                    <div className='flex justify-end text-background'>
                    {isOpen ? <><PanelLeftClose className='m-4' onClick={toggleSidebar} /></> : <><div className='flex flex-col'><Logo size={60} className='pr-4'/><PanelLeftOpen className='mt-4 ml-14 absolute z-50 text-foreground' onClick={toggleSidebar} /></div></> }
                    </div>
                </Link>
                
                <div className="mt-2 flex flex-1 flex-col">
                    <nav className="-mx-3 space-y-6">
                        <div className={`${isOpen ? 'space-y-3 w-[90%] hover:bg-lime-400 rounded-full' : '' }`}>
                            <Link
                                href='/hotel/dashboard'
                                className={`${buttonStyles({ color: "default", size: "md", radius: "full", variant: "light" })} ${isOpen ? 'text-foreground-300  hover:text-black' : 'text-foreground-300 hover:text-lime-400'}`}
                            >
                                {isOpen ? <><LayoutDashboard />Dashboard</> : 
              <>
                  <Tooltip
                    showArrow
                    placement="right"
                    content="Dashboard"
                    classNames={{
                      base: [
                        // arrow color
                        "before:bg-primary-300 dark:before:bg-primary",
                      ],
                      content: [
                        "py-2 px-4 shadow-xl",
                        "text-white bg-primary-300 from-primary-300 to-primary-300",
                      ],
                    }}
                  >
                    <LayoutDashboard className='mr-10' />
                  </Tooltip>
                </>
              }
               </Link>
                        </div>
                        <div className={`${isOpen ? 'space-y-3' : ''}`}>
                            <label className={`${isOpen ? 'px-3' : ''} text-xs font-semibold uppercase text-foreground-300`}>{isOpen ? 'Front Office' : '' }</label>
                            <BookingsDropDown isOpen={isOpen}/>
                            <RatesInventoryDropDown isOpen={isOpen}/>
                            <GrowYourBusinessDropDown isOpen={isOpen}/>
                            <ReviewsDropDown isOpen={isOpen}/>
                            <div className={`${isOpen ? 'space-y-3 w-[90%] hover:bg-lime-400 rounded-full' : '' }`}>
                                <Link
                                    href='/admin/dashboard'
                                    className={`${buttonStyles({ color: "default", size: "md", radius: "full", variant: "light" })} ${isOpen ? 'text-foreground-300  hover:text-black' : 'text-foreground-300 hover:text-lime-400'}`}
                                >
                                    {isOpen ? <><FilePieChart />Analytics</> : 
              <>
                  <Tooltip
                    showArrow
                    placement="right"
                    content="Analytics"
                    classNames={{
                      base: [
                        // arrow color
                        "before:bg-primary-300 dark:before:bg-primary",
                      ],
                      content: [
                        "py-2 px-4 shadow-xl",
                        "text-white bg-primary-300 from-primary-300 to-primary-300",
                      ],
                    }}
                  >
                    <FilePieChart className='mr-10' />
                  </Tooltip>
                </>
              }
                                </Link>
                            </div>
                            <GuestChatDropDown isOpen={isOpen}/>
                            <MoreDropDown isOpen={isOpen}/>
                        </div>
                        <div className={`${isOpen ? 'space-y-3' : ''}`}>
                            <label className={`${isOpen ? 'px-3' : ''} text-xs font-semibold uppercase text-foreground-300`}>{isOpen ? 'Property Master' : '' }</label>
                            <PropertyMasterDropDown isOpen={isOpen}/>
                            <ReportsDropDown isOpen={isOpen}/>
                        </div>
                        {isOpen ? <><div className="relative w-[200px] h-[100px] top-[10px] bottom-[90px] bg-gray-500 rounded-[16px] ml-6" >hii</div></>
                        : ''}
                    </nav>
                </div>
            </aside>
        </>
    )
}

export default SideBar;