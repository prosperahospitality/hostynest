'use client'
import React, { useState } from 'react';
import Link from 'next/link'
import { button as buttonStyles } from "@nextui-org/theme";
import {Tooltip} from "@nextui-org/react";
import { LayoutDashboard, Building2, CalendarCheck, User, LogIn, PanelLeftClose, PanelLeftOpen, Settings } from 'lucide-react'
import PropertyMasterDropDown from '@/app/(company)/admin/(v0)/propertymasterdropdown'
import FacilitesAndServicesDropDown from '@/app/(company)/admin/(v0)/facilitesandservices'
import LocationDropDown from '@/app/(company)/admin/(v0)/locationdropdown'

const CompanyChiledSideBar = ({isOpen, toggleSidebar}) => {
 

  return (
    <div className={`flex flex-col h-screen overflow-y-auto border-r bg-background transition-all duration-800 overflow-hidden ${isOpen ? '' : 'w-16'}`}>
      <div className="flex flex-col h-screen">

      
        <div className='flex justify-end'>
        {isOpen ? <><PanelLeftClose className='m-4' onClick={toggleSidebar} /></> : <PanelLeftOpen className='mt-4 mr-3' onClick={toggleSidebar} /> }
        </div>

        <nav className={`${isOpen ? 'space-y-6 mt-2' : 'flex flex-col h-[80%] items-center justify-center'}`}>
          <div className={`${isOpen ? 'w-[90%] hover:bg-purple-500 space-y-3 rounded-full' : 'mt-6'}`}>
            <Link
              href='/admin/dashboard'
              className={`${buttonStyles({ color: "default", size: "md", radius: "full", variant: "light" })} ${isOpen ? 'text-foreground-600 hover:text-white' : 'text-foreground-600 hover:text-purple-500'} `}
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
                    <LayoutDashboard />
                  </Tooltip>
                </>
              }
            </Link>
          </div>
          <div className={`${isOpen ? 'space-y-3' : ''}`}>
            <label className={`${isOpen ? 'px-3' : ''} text-xs font-semibold uppercase text-foreground`}>{isOpen ? 'Management' : '' }</label>
            <div className={`space-y-1  rounded-full ${isOpen ? 'w-[90%] hover:bg-purple-500' : ''}`}>
            <Link
              href="/admin/propertymanagement"
              className={`${buttonStyles({ color: "default", size: "md", radius: "lg", variant: "light" })} ${isOpen ? 'text-foreground-600 hover:text-white' : 'text-foreground-600 hover:text-purple-500'} `}
              >
                {isOpen ? <><Building2 />Property Management</> : 
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
            </Link>
            </div>
            <div className={`space-y-1  rounded-full ${isOpen ? 'w-[90%] hover:bg-purple-500' : ''}`}>
            <Link
              href="#"
              className={`${buttonStyles({ color: "default", size: "md", radius: "lg", variant: "light" })} ${isOpen ? 'text-foreground-600 hover:text-white' : 'text-foreground-600 hover:text-purple-500'} `}
            >
              {isOpen ? <><CalendarCheck />Reservation Management</> :
              <>
              <Tooltip
                showArrow
                placement="right"
                content="Reservation Management"
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
              <CalendarCheck /> 
              </Tooltip>
            </>
              }
              
            </Link>
            </div>
            <div className={`space-y-1  rounded-full ${isOpen ? 'w-[90%] hover:bg-purple-500' : ''}`}>
            <Link
              href="#"
              className={`${buttonStyles({ color: "default", size: "md", radius: "lg", variant: "light" })} ${isOpen ? 'text-foreground-600 hover:text-white' : 'text-foreground-600 hover:text-purple-500'} `}
            >
              {isOpen ? <><User />User Management</> :
              <>
              <Tooltip
                showArrow
                placement="right"
                content="User Management"
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
              <User />
              </Tooltip>
            </>
               }
            </Link>
            </div>

            <div className={`space-y-1  rounded-full ${isOpen ? 'w-[90%] hover:bg-purple-500' : ''}`}>
            <Link
              href="/admin/listhotel"
              className={`${buttonStyles({ color: "default", size: "md", radius: "lg", variant: "light" })} ${isOpen ? 'text-foreground-600 hover:text-white' : 'text-foreground-600 hover:text-purple-500'} `}
            >
              {isOpen ? <><User />List Hotels</> :
              <>
              <Tooltip
                showArrow
                placement="right"
                content="User Management"
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
              <User />
              </Tooltip>
            </>
               }
            </Link>
            </div>
          </div>
          <div className={`${isOpen ? 'space-y-3' : ''}`}>
            <label className={`${isOpen ? 'px-3' : ''} text-xs font-semibold uppercase text-foreground`}>{isOpen ? 'Property Master' : '' }</label>
            <PropertyMasterDropDown  isOpen={isOpen} />
            <FacilitesAndServicesDropDown isOpen={isOpen} />
            <LocationDropDown isOpen={isOpen} />
          </div>
          <div className={`space-y-1 rounded-full ${isOpen ? 'w-[90%] hover:bg-purple-500' : ''}`}>
            <Link
              href="#"
              className={`${buttonStyles({ color: "default", size: "md", radius: "lg", variant: "light" })} ${isOpen ? 'text-foreground-600 hover:text-white' : 'text-foreground-600 hover:text-purple-500'} `}
            >
              {isOpen ? <><Settings />Settings</> :
              <>
              <Tooltip
                showArrow
                placement="right"
                content="Settings"
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
              <Settings />
              </Tooltip>
            </>
               }
            </Link>
            </div>
        </nav>
      </div>
    </div>
  )
}

export default CompanyChiledSideBar;