'use client'
import React from 'react'
import { LayoutDashboard, Building2, CalendarCheck, User, MessageSquareWarning, LogIn, DoorOpen, BedDouble, Bed, MountainSnow, ChevronDown, MessagesSquare } from 'lucide-react'
import { TbHotelService } from "react-icons/tb";
import { BsQrCodeScan } from "react-icons/bs";
import { IoTicketOutline } from "react-icons/io5";
import { MdOutlinePolicy, MdCleaningServices, MdOutlineRoomPreferences } from "react-icons/md";
import { RiServiceLine } from "react-icons/ri";
import { FaHandsWash } from "react-icons/fa";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Tooltip } from "@nextui-org/react";
import { button as buttonStyles } from "@nextui-org/theme";
import Link from 'next/link'


export default function GuestChatDropDown ({ isOpen }) {
    return (
        <Dropdown placement='right-start'>
        <DropdownTrigger>
        <Link
        href="#"
          className={`${buttonStyles({ color: "default", size: "md", radius: "full", variant: "light" })} ${isOpen ? 'hover:bg-lime-500 text-foreground-300 hover:text-black justify-between w-[90%]' : 'text-foreground-300' }`}
        >
        <div className='flex gap-2'>
        {isOpen ? <><MessagesSquare />Guest Chat</> : 
        <>
        <Tooltip
          showArrow
          placement="right"
          content="Guest Chat"
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
        <MessagesSquare className='mr-10' />
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
        <DropdownItem className='text-foreground-600 hover:text-primary' startContent={<MessagesSquare />} key="new"><Link href="/admin/propertymaster/propertytype">Guest Messages</Link></DropdownItem>
        <DropdownItem className='text-foreground-600 hover:text-primary' startContent={<MessageSquareWarning />} key="new"><Link href="/admin/propertymaster/propertyarea">Instay Guest Issues</Link></DropdownItem>
        </DropdownMenu>
    </Dropdown>
    )
}