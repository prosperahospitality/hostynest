'use client'
import React from 'react'
import { LayoutDashboard, Building2, CalendarCheck, User, LandPlot, LogIn, DoorOpen, BedDouble, Bed, MountainSnow, ChevronDown, Codesandbox, CalendarClock, CalendarCheck2  } from 'lucide-react'
import { TbHotelService } from "react-icons/tb";
import { BsQrCodeScan } from "react-icons/bs";
import { IoTicketOutline } from "react-icons/io5";
import { MdOutlinePolicy, MdCleaningServices, MdOutlineRoomPreferences } from "react-icons/md";
import { RiServiceLine } from "react-icons/ri";
import { FaHandsWash } from "react-icons/fa";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Tooltip } from "@nextui-org/react";
import { button as buttonStyles } from "@nextui-org/theme";
import Link from 'next/link'
import { ListChecks, ArrowsClockwise } from "@/_components/icon"
import { useSearchParams } from 'next/navigation'


export default function RatesInventoryDropDown ({ isOpen }) {
  const searchParams = useSearchParams();
  const hotel_id = searchParams.get('hotel_id');
  const hotel_name = searchParams.get('hotel_name');
    return (
        <Dropdown placement='right-start'>
        <DropdownTrigger>
        <Link
        href="#"
          className={`${buttonStyles({ color: "default", size: "md", radius: "full", variant: "light" })} ${isOpen ? 'hover:bg-lime-500 text-foreground-300 hover:text-black justify-between w-[90%]' : 'text-foreground-300' }`}
        >
          <div className='flex gap-2'>

          {isOpen ? <><Codesandbox />Rates & Inventory</> : 
        <>
        <Tooltip
          showArrow
          placement="right"
          content="Rates & Inventory"
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
        <Codesandbox className='mr-10'/>
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
        <DropdownItem className='text-foreground-600 hover:text-primary' startContent={<ListChecks  />} key="new"><Link href={`/hotel/rateandinventory/managerateandinventory?hotel_id=${hotel_id}&hotel_name=${hotel_name}`}>Manage Rate & Inventory</Link></DropdownItem>
        <DropdownItem className='text-foreground-600 hover:text-primary' startContent={<ArrowsClockwise  />} key="new"><Link href={`/admin/propertymaster/propertyarea?hotel_id=${hotel_id}&hotel_name=${hotel_name}`}>Sync Property Calender</Link></DropdownItem>
        <DropdownItem className='text-foreground-600 hover:text-primary' startContent={<CalendarCheck2 />} key="new"><Link href={`/admin/propertymaster/floor?hotel_id=${hotel_id}&hotel_name=${hotel_name}`}>Default Rates & Inventory</Link></DropdownItem>
        <DropdownItem className='text-foreground-600 hover:text-primary' startContent={<CalendarClock  />} key="new"><Link href={`/admin/propertymaster/floor?hotel_id=${hotel_id}&hotel_name=${hotel_name}`}>Low Inventory Dates</Link></DropdownItem>
        </DropdownMenu>
    </Dropdown>
    )
}