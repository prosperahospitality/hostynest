'use client'
import React from 'react'
import { Menu, X, ChevronDown, ChevronRight, Search } from 'lucide-react'
import {Input, Avatar} from "@nextui-org/react";
import { ThemeSwitch } from "@/_components/ui/ThemeSwitch";
import { CompanyDashLogo } from "@/_components/icon";


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

const PmsTopBar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="relative w-full bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
      <Input
      isClearable
      variant="bordered"
      placeholder="Type to search..."
      size='sm'
      radius='lg'
      className="max-w-xs"
      startContent={
        <Search className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
      }
    />
        
        <div className="flex grow justify-end">
          <ThemeSwitch />
        </div>
        <div className="ml-2 mt-2 hidden lg:block">
          <span className="relative inline-block">
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
            <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-600 ring-2 ring-white"></span>
          </span>
        </div>
        <div className="ml-2 lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <CompanyDashLogo />
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
                <div className="ml-3 mt-4 flex items-center space-x-2">
                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


export default PmsTopBar;