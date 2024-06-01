'use client'
import React from 'react'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { button as buttonStyles } from "@nextui-org/theme";
import { PiSlidersHorizontalDuotone } from "react-icons/pi";
import { IoIosArrowForward } from "react-icons/io";
import { GoShieldLock } from "react-icons/go";
import { LiaUserLockSolid } from "react-icons/lia";
import { PiBellLight } from "react-icons/pi";
import { usePathname } from 'next/navigation'



const Settingspage = () => {
    const pathname = usePathname()

    return (
        <>
            <div className='flex gap-4'>
                <Button color='' variant='flat' radius='full' size='sm' className='bg-primary-100 text-primary' isIconOnly isDisabled startContent={<PiSlidersHorizontalDuotone size={22} />}></Button>
                <div>
                    <h2 className={`link ${pathname === '/settings/prefernce' ? 'text-primary-500 font-semibold text-xl' : 'text-gray-500'}`}>Prefernce</h2>
                    <h6 className='text-gray-300 text-[10px]'>Change Your Language <br /> & Currency</h6>
                    <Link href='/settings/prefernce' className={`${buttonStyles({ color: "default", size: "sm", radius: "full", variant: "light" })} text-primary text-center -ml-3`}>
                        <span
                            className=" text-primary rounded-xl flex justify-between items-center"
                            style={{
                                backgroundImage: 'linear-gradient(transparent, transparent), linear-gradient(#0070f0, #0070f0)',
                                backgroundSize: '0 3px',
                                backgroundPosition: '0% 100%', // Center the line animation
                                backgroundRepeat: 'no-repeat',
                                transition: 'background-size .5s ease-in-out',
                            }}
                            onMouseEnter={(e) => { e.target.style.backgroundSize = '100% 2px'; }}
                            onMouseLeave={(e) => { e.target.style.backgroundSize = '0 2px'; }}
                        >
                            Manage Prefernce <IoIosArrowForward className="ml-1 mt-2 mb-1" />
                        </span>
                    </Link>
                </div>
            </div>
            <div className='flex gap-4'>
                <Button color='' variant='flat' radius='full' size='sm' className='bg-primary-100 text-primary' isIconOnly isDisabled startContent={<GoShieldLock size={22} />}></Button>
                <div>
                    <h2 className={`link ${pathname === '/settings/security' ? 'text-primary-500 font-semibold text-xl' : 'text-gray-500'}`}>Security</h2>
                    <h6 className='text-gray-300 text-[10px]'>Empowering Security: <br />Customize, verify or delete account.</h6>
                    <Link href='/settings/security' className={`${buttonStyles({ color: "default", size: "sm", radius: "full", variant: "light" })} text-primary text-center -ml-3`}>
                        <span
                            className=" text-primary rounded-xl flex justify-between items-center"
                            style={{
                                backgroundImage: 'linear-gradient(transparent, transparent), linear-gradient(#0070f0, #0070f0)',
                                backgroundSize: '0 3px',
                                backgroundPosition: '0% 100%', // Center the line animation
                                backgroundRepeat: 'no-repeat',
                                transition: 'background-size .5s ease-in-out',
                            }}
                            onMouseEnter={(e) => { e.target.style.backgroundSize = '100% 2px'; }}
                            onMouseLeave={(e) => { e.target.style.backgroundSize = '0 2px'; }}
                        >
                            Manage Security <IoIosArrowForward />
                        </span>
                    </Link>
                </div>
            </div>
            <div className='flex gap-4'>
                <Button color='' variant='flat' radius='full' size='sm' className='bg-primary-100 text-primary' isIconOnly isDisabled startContent={<LiaUserLockSolid size={22} />}></Button>
                <div>
                    <h2 className={`link ${pathname === '/settings/privacy' ? 'text-primary-500 font-semibold text-xl' : 'text-gray-500'}`}>Privacy</h2>
                    <h6 className='text-gray-300 text-[10px]'>Take control of your <br />privacy</h6>
                    <Link href='/settings/privacy' className={`${buttonStyles({ color: "default", size: "sm", radius: "full", variant: "light" })} text-primary text-center -ml-3`}>
                        <span
                            className=" text-primary rounded-xl flex justify-between items-center"
                            style={{
                                backgroundImage: 'linear-gradient(transparent, transparent), linear-gradient(#0070f0, #0070f0)',
                                backgroundSize: '0 3px',
                                backgroundPosition: '0% 100%', // Center the line animation
                                backgroundRepeat: 'no-repeat',
                                transition: 'background-size .5s ease-in-out',
                            }}
                            onMouseEnter={(e) => { e.target.style.backgroundSize = '100% 2px'; }}
                            onMouseLeave={(e) => { e.target.style.backgroundSize = '0 2px'; }}
                        >
                            Manage Privacy <IoIosArrowForward />
                        </span>
                    </Link>
                </div>
            </div>
            <div className='flex gap-4'>
                <Button color='' variant='flat' radius='full' size='sm' className='bg-primary-100 text-primary' isIconOnly isDisabled startContent={<PiBellLight size={22} />}></Button>
                <div>
                    <h2 className={`link ${pathname === '/settings/emailnotification' ? 'text-primary-500 font-semibold text-xl' : 'text-gray-500'}`}>Email Notification</h2>
                    <h6 className='text-gray-300 text-[10px]'>Choose what you want<br />to be notified about</h6>
                    <Link href='/settings/emailnotification' className={`${buttonStyles({ color: "default", size: "sm", radius: "full", variant: "light" })} text-primary text-center -ml-3`}>
                        <span
                            className=" text-primary rounded-xl flex justify-between items-center"
                            style={{
                                backgroundImage: 'linear-gradient(transparent, transparent), linear-gradient(#0070f0, #0070f0)',
                                backgroundSize: '0 3px',
                                backgroundPosition: '0% 100%', // Center the line animation
                                backgroundRepeat: 'no-repeat',
                                transition: 'background-size .5s ease-in-out',
                            }}
                            onMouseEnter={(e) => { e.target.style.backgroundSize = '100% 2px'; }}
                            onMouseLeave={(e) => { e.target.style.backgroundSize = '0 2px'; }}
                        >
                            Manage Notification <IoIosArrowForward />
                        </span>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Settingspage;