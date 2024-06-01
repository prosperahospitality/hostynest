'use client'
import React from 'react'
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { IMAGES } from '@/public/index'
import { ThemeSwitch } from "@/app/_components/ui/ThemeSwitch";
import { button as buttonStyles } from "@nextui-org/theme";
import { Link } from "@nextui-org/react";
import HourlyBooking from '@/app/_components/ui/HourlyBooking'
import { User } from "@nextui-org/react";
import { useSession, getSession, signIn, signOut } from 'next-auth/react'


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

export default function HourlyBookingTopBar( {searchCity} ) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)
    const [sessionValue, setSessionValue] = React.useState({});

    React.useEffect(() => {
    
        const getSessionInfo = async () => {
          const session = await getSession();
          setSessionValue(session);
        };
        getSessionInfo();
      }, [])
  
      
      React.useEffect(() => {
      
        console.log("Session: ",sessionValue);
      }, [sessionValue])

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
                    <HourlyBooking searchCity = {searchCity}/>
                </div>


                <div className="flex">

                    {/* <ThemeSwitch /> */}

                    <div className="ml-6">
                    {sessionValue
              ? sessionValue?.user?.firstname === undefined && sessionValue?.user?.lastname === undefined 
                ? <Link
                    // isExternal
                    onClick = {(e) => signIn()}
                    className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
                  >
                    Login/Sign Up
                  </Link> 
                : <><User
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                      name={sessionValue?.user?.firstname + ' ' + sessionValue?.user?.lastname}
                      style = {{position: "relative",
                        top: "4px"}}
                      pointer 
                    />
                    <Link
                    //   isExternal
                      onClick={(e) => signOut()}
                      className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
                    >
                      Log out
                    </Link>
                  </>
              : <Link
                //   isExternal
                  onClick = {(e) => signIn()}
                  className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
                >
                  Login/Sign Up
                </Link>
            }
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
                                    {/* <ThemeSwitch /> */}

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
        </div >
    )
}