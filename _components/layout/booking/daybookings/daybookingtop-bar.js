'use client'
import React from 'react'
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { IMAGES } from '@/public/index'
import { ThemeSwitch } from "@/_components/ui/ThemeSwitch";
import { button as buttonStyles } from "@nextui-org/theme";
import { Link } from "@nextui-org/react";
import DayBooking from '@/_components/ui/DayBooking';
import PropertyCarousel from '@/_components/ui/PropertyCarousel'


const menuItems = [
    {
        name: 'Home',
        href: '#',
    },
    {
        name: 'About',
        href: '#',
    },
    {
        name: 'Contact',
        href: '#',
    },
]

export default function DayBookingTopBar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <div className="relative w-full">
            <div className="mx-auto flex  items-center justify-between px-4 py-2 sm:px-6 lg:px-8 gap-2">
                <div className="inline-flex items-center ">
                    <Image src={IMAGES.Fulllogo}
                        alt="Logo"
                        width={200}
                        height={200}
                    />
                </div>

                <div className="">
                    <DayBooking />
                </div>


                <div className="flex">

                    <ThemeSwitch />

                    <div className="ml-6">
                        <Link
                            // isExternal
                            href="/login"
                            className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
                        >
                            Login/Sing Up
                        </Link>
                    </div>
                </div>
                <div className="lg:hidden">
                    <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
                </div>


                {isMenuOpen && (
                    <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
                        <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="px-5 pb-6 pt-5">
                                <div className="flex items-center justify-between">
                                    <div className="inline-flex items-center space-x-2">
                                        <Image src={IMAGES.Fulllogo}
                                            alt="Logo"
                                            width={200}
                                            height={200}
                                        />
                                    </div>
                                    <div className="-mr-2">
                                        <button
                                            type="button"
                                            onClick={toggleMenu}
                                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <X className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <nav className="grid gap-y-4">
                                        {menuItems.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                                            >
                                                <span className="ml-3 text-base font-medium text-gray-900">
                                                    {item.name}
                                                </span>
                                                <span>
                                                    <ChevronRight className="ml-3 h-4 w-4" />
                                                </span>
                                            </a>
                                        ))}
                                    </nav>
                                </div>
                                <div className="mt-2 space-y-2">
                                    <ThemeSwitch />

                                    <div className="ml-6">
                                        <Link
                                            // isExternal
                                            href="/login"
                                            className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
                                        >
                                            Login/Sing Up
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="ml-40 w-fit gap-2 pl-14 pr-14 rounded-xl bg-white justify-center flex items-center shadow-2xl sticky border-gray-200 h-24 transition-all duration-200 delay-200 ease-in-out text-black ">
          <div className='text-primary text-1.125 font-poppinsmedium landing-1.688'>
            <PropertyCarousel />
          </div>
        </div>
        </div >
    )
}