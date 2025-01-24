'use client'
import React from 'react'
import { LayoutDashboard, Building2, CalendarCheck, User, LandPlot, LogIn, DoorOpen, BedDouble, Bed, MountainSnow, ChevronDown  } from 'lucide-react'
import { TbHotelService } from "react-icons/tb";
import { BsQrCodeScan } from "react-icons/bs";
import { IoTicketOutline } from "react-icons/io5";
import { MdOutlinePolicy, MdCleaningServices, MdOutlineRoomPreferences } from "react-icons/md";
import { RiServiceLine } from "react-icons/ri";
import { FaHandsWash } from "react-icons/fa";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Tooltip } from "@nextui-org/react";
import { button as buttonStyles } from "@nextui-org/theme";
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function PropertyMasterDropDown ({ isOpen }) {
    const searchParams = useSearchParams();
  const hotel_id = searchParams.get('hotel_id');
  const hotel_name = searchParams.get('hotel_name');
  console.log("ID: ",hotel_id)
    return (
        <Dropdown placement='right-start'>
        <DropdownTrigger>
        <Link
        href="#"
          className={`${buttonStyles({ color: "default", size: "md", radius: "full", variant: "light" })} ${isOpen ? 'hover:bg-lime-500 text-foreground-300 hover:text-black justify-between w-[90%]' : 'text-foreground-300' }`}
        >
        <div className='flex gap-2'>
        {isOpen ? <><Building2 />Property Master</> : 
        <>
        <Tooltip
          showArrow
          placement="right"
          content="Property Master"
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
        <Building2 className='mr-10' />
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
        <DropdownItem className='text-foreground-600 hover:text-primary' startContent={<Building2 aria-hidden="true" />} key="new"><Link href={`/hotel/propertymaster/generalinformation?hotel_id=${hotel_id}&hotel_name=${hotel_name}`}>General Information</Link></DropdownItem>
        <DropdownItem className='text-foreground-600 hover:text-primary' startContent={<LandPlot aria-hidden="true" />} key="new"><Link href={`/hotel/propertymaster/photomanage?hotel_id=${hotel_id}&hotel_name=${hotel_name}`}>Photo Manage</Link></DropdownItem>
        <DropdownItem className='text-foreground-600 hover:text-primary' startContent={<LandPlot aria-hidden="true" />} key="new"><Link href={`/hotel/propertymaster/policiesmaster?hotel_id=${hotel_id}&hotel_name=${hotel_name}`}>Policies Master</Link></DropdownItem>
        <DropdownItem className='text-foreground-600 hover:text-primary' startContent={<LandPlot aria-hidden="true" />} key="new"><Link href={`/hotel/propertymaster/facilitiesandservices?hotel_id=${hotel_id}&hotel_name=${hotel_name}`}>Facilities & Services</Link></DropdownItem>
        <DropdownItem className='text-foreground-600 hover:text-primary' startContent={<LandPlot aria-hidden="true" />} key="new"><Link href={`/hotel/propertymaster/roomdetails?hotel_id=${hotel_id}&hotel_name=${hotel_name}`}>Room Details</Link></DropdownItem>
        <DropdownItem className='text-foreground-600 hover:text-primary' startContent={<LandPlot aria-hidden="true" />} key="new"><Link href={`/hotel/propertymaster/roomamenities?hotel_id=${hotel_id}&hotel_name=${hotel_name}`}>Room Amenities</Link></DropdownItem>
        <DropdownItem className='text-foreground-600 hover:text-primary' startContent={<LandPlot aria-hidden="true" />} key="new"><Link href="/hotel/propertymaster/">Messaging Prefernces</Link></DropdownItem>
        </DropdownMenu>
    </Dropdown>
    )
}