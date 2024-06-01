'use client'
import React from 'react'
import { LayoutDashboard, Building2, CalendarCheck, User, LandPlot, LogIn, DoorOpen, BedDouble, Bed, MountainSnow, ChevronDown, TrendingUp, Ticket } from 'lucide-react'
import { TbHotelService } from "react-icons/tb";
import { BsQrCodeScan } from "react-icons/bs";
import { IoTicketOutline } from "react-icons/io5";
import { MdOutlinePolicy, MdCleaningServices, MdOutlineRoomPreferences } from "react-icons/md";
import { RiServiceLine } from "react-icons/ri";
import { FaHandsWash } from "react-icons/fa";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Tooltip } from "@nextui-org/react";
import { button as buttonStyles } from "@nextui-org/theme";
import Link from 'next/link'


export default function GrowYourBusinessDropDown ({ isOpen }) {
    return (
        <Dropdown placement='right-start'>
        <DropdownTrigger>
        <Link
        href="#"
          className={`${buttonStyles({ color: "default", size: "md", radius: "full", variant: "light" })} ${isOpen ? 'hover:bg-lime-500 text-foreground-300 hover:text-black justify-between w-[90%]' : 'text-foreground-300' }`}
        >
        <div className='flex gap-2'>
          {isOpen ? <><TrendingUp />Grow Your Business</> : 
        <>
        <Tooltip
          showArrow
          placement="right"
          content="Grow Your Business"
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
        <TrendingUp className='mr-10' />
        </Tooltip>
      </>
        }
        </div>
        {isOpen ? <ChevronDown /> : '' }
        </Link>
        </DropdownTrigger>
        <DropdownMenu 
        aria-label="Dropdown Variants"
        color="primary"
        variant="flat"
      >
        <DropdownItem className='text-foreground-600 hover:text-primary' startContent={<Ticket  />} key="new"><Link href="/admin/propertymaster/propertytype">Promotions & Coupons</Link></DropdownItem>
        <DropdownItem className='text-foreground-600 hover:text-primary' startContent={<LandPlot  />} key="new"><Link href="/admin/propertymaster/propertyarea">PLB & UDI</Link></DropdownItem>
        </DropdownMenu>
    </Dropdown>
    )
}