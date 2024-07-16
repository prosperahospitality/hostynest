'use client'
import React from 'react'
import { LayoutDashboard, Building2, CalendarCheck, User, LandPlot, LogIn, DoorOpen, BedDouble, Bed, MountainSnow, ChevronDown } from 'lucide-react'
import { TbHotelService } from "react-icons/tb";
import { BsQrCodeScan } from "react-icons/bs";
import { IoTicketOutline } from "react-icons/io5";
import { MdOutlinePolicy, MdCleaningServices, MdOutlineRoomPreferences } from "react-icons/md";
import { RiServiceLine } from "react-icons/ri";
import { FaHandsWash } from "react-icons/fa";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Tooltip } from "@nextui-org/react";
import { button as buttonStyles } from "@nextui-org/theme";
import Link from 'next/link'


export default function PropertyMasterDropDown ({ isOpen }) {
  
    return (
        <Dropdown placement='right-start'>
        <DropdownTrigger>
        <Link
        href="#"
          className={`${buttonStyles({ color: "default", size: "md", radius: "full", variant: "light" })} ${isOpen ? 'hover:bg-purple-500 text-foreground-600 hover:text-white justify-between w-[100%]' : 'text-foreground-600 hover:text-purple-500' }`}
        >
        <div className='flex gap-2'>
        
        {isOpen ? <><Building2 aria-hidden="true"/>Property Settings</> : 
        <>
        <Tooltip
          showArrow
          placement="right"
          content="Property Management"
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
        <Building2 />
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
        <DropdownItem className='text-foreground-600 hover:text-primary' startContent={<Building2 aria-hidden="true" />} key="new"><Link href="/admin/propertymaster/propertytype">Property Type</Link></DropdownItem>
        <DropdownItem className='text-foreground-600 hover:text-primary' startContent={<LandPlot aria-hidden="true" />} key="new"><Link href="/admin/propertymaster/propertyarea">Property Area</Link></DropdownItem>
        <DropdownItem className='text-foreground-600 hover:text-primary' startContent={<DoorOpen aria-hidden="true" />} key="new"><Link href="/admin/propertymaster/floor">Floor</Link></DropdownItem>
        <DropdownItem className='text-foreground-600 hover:text-primary' startContent={<BedDouble aria-hidden="true" />} key="new"><Link href="/admin/propertymaster/bedtype">Bed Type</Link></DropdownItem>
        <DropdownItem className='text-foreground-600 hover:text-primary' startContent={<Bed aria-hidden="true" />} key="new"><Link href="/admin/propertymaster/extrabedtype">Extra Bed Type</Link></DropdownItem>
        <DropdownItem className='text-foreground-600 hover:text-primary' startContent={<MountainSnow aria-hidden="true" />} key="new"><Link href="/admin/propertymaster/roomview">Room View</Link></DropdownItem>
        <DropdownItem className='text-foreground-600 hover:text-primary' startContent={<RiServiceLine aria-hidden="true" className="size-6"/>} key="new"><Link href="/admin/propertymaster/amenities">Amenities</Link></DropdownItem>
        <DropdownItem className='text-foreground-600 hover:text-primary' startContent={<RiServiceLine aria-hidden="true" className="size-6"/>} key="new"><Link href="/admin/propertymaster/roomtypecategorys">Room Type Categorys</Link></DropdownItem>
        <DropdownItem className='text-foreground-600 hover:text-primary' startContent={<RiServiceLine aria-hidden="true" className="size-6"/>} key="new"><Link href="/admin/propertymaster/roomname">Room Name</Link></DropdownItem>
        <DropdownItem className='text-foreground-600 hover:text-primary' startContent={<DoorOpen aria-hidden="true" />} key="new"><Link href="/admin/propertymaster/roomtype">Room Type</Link></DropdownItem>
        <DropdownItem className='text-foreground-600 hover:text-primary' startContent={<RiServiceLine aria-hidden="true" className="size-6"/>} key="new"><Link href="/admin/propertymaster/propertyamenities">Property Amenities</Link></DropdownItem>
        <DropdownItem className='text-foreground-600 hover:text-primary' startContent={<TbHotelService aria-hidden="true" className='size-6'/>} key="new"><Link href="/admin/propertymaster/addonservices">Add on Services</Link></DropdownItem>
        <DropdownItem className='text-foreground-600 hover:text-primary' startContent={<BsQrCodeScan aria-hidden="true" className='size-6'/>} key="new"><Link href="#">Promotion / Pormocode</Link></DropdownItem>
        <DropdownItem className='text-foreground-600 hover:text-primary' startContent={<IoTicketOutline aria-hidden="true" className='size-6'/>} key="new"><Link href="#">Package</Link></DropdownItem>
        <DropdownItem className='text-foreground-600 hover:text-primary' startContent={<MdOutlinePolicy aria-hidden="true" className='size-6'/>} key="new"><Link href="/admin/propertymaster/polices">Terms & Conditions / Polices</Link></DropdownItem>
        </DropdownMenu>
    </Dropdown>
    )
}