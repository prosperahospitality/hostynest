'use client'
import React from 'react'
import { LayoutDashboard, Building2, CalendarCheck, User, LandPlot, LogIn, DoorOpen, BedDouble, Bed, MountainSnow, ChevronDown, BaggageClaim  } from 'lucide-react'
import { TbHotelService } from "react-icons/tb";
import { BsQrCodeScan } from "react-icons/bs";
import { IoTicketOutline } from "react-icons/io5";
import { MdOutlinePolicy, MdCleaningServices, MdOutlineRoomPreferences } from "react-icons/md";
import { RiServiceLine } from "react-icons/ri";
import { FaHandsWash } from "react-icons/fa";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Tooltip } from "@nextui-org/react";
import { button as buttonStyles } from "@nextui-org/theme";
import Link from 'next/link'


export default function FacilitesAndServicesDropDown ({ isOpen }) {
    return (
      <Dropdown placement='right-start'>
      <DropdownTrigger>
      <Link 
      href="#"
        className={`${buttonStyles({ color: "default", size: "md", radius: "full", variant: "light" })} ${isOpen ? 'hover:bg-purple-500 text-foreground-600 hover:text-white justify-between w-[100%]' : 'text-foreground-600 hover:text-purple-500' }`}
      >
      <div className='flex gap-2'>
      {isOpen ? <><BaggageClaim />Facilites & Services</> :
      <>
      <Tooltip
        showArrow
        placement="right"
        content="Facilites & Services"
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
      <BaggageClaim />
      </Tooltip>
    </>
       }
      </div>
      {isOpen ? <ChevronDown aria-hidden="true"/> : '' }
      </Link>
      </DropdownTrigger>
      <DropdownMenu 
      aria-label="Dropdown Variants"
      color="primary"
      variant="flat"
    >
      <DropdownItem className='text-foreground-600 hover:text-primary' startContent={<MdOutlineRoomPreferences aria-hidden="true" className="size-6" />} key="new"><Link href="/admin/facilitesandservices/facilitesandservicescategorys">Facilites & Services Categorys</Link></DropdownItem>
      <DropdownItem className='text-foreground-600 hover:text-primary' startContent={<FaHandsWash aria-hidden="true" className="size-6" />} key="new"><Link href="/admin/facilitesandservices/facilitesandservicesitem">Facilites & Services Items</Link></DropdownItem>
      <DropdownItem className='text-foreground-600 hover:text-primary' startContent={<MdOutlineRoomPreferences aria-hidden="true" className="size-6" />} key="new"><Link href="/admin/facilitesandservices/facilitesandservices">Facilites & Services</Link></DropdownItem>
      </DropdownMenu>
      </Dropdown>
    )
}