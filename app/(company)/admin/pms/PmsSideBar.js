import React from 'react'
import Link from 'next/link'
import { button as buttonStyles } from "@nextui-org/theme";
import { LayoutDashboard, Building2, CalendarCheck, User, LogIn } from 'lucide-react'
import PropertyMasterDropDown from '@/app/(company)/admin/(v0)/propertymasterdropdown'
import FacilitesAndServicesDropDown from '@/app/(company)/admin/(v0)/facilitesandservices'

const PmsSideBar = () => {
  return (
    <div className="flex h-screen w-80 flex-col overflow-y-auto border-r bg-background px-5 py-8">
      <div className="mt-6 flex flex-1 flex-col justify-between">
        <nav className="-mx-3 space-y-6 ">
          <div className="space-y-3">
            <Link
                href='/admin/dashboard'
                className={`${buttonStyles({ color: "default", size: "md", radius: "lg", variant: "light" })} hover:bg-purple-500 hover:w-60 text-foreground-600 hover:text-white`}
              >
                <LayoutDashboard />Dashboard
              </Link>
          </div>
          <div className="space-y-3">
            <label className="px-3 text-xs font-semibold uppercase text-foreground">Management</label>
            <Link
                href="/admin/propertymanagement"
                className={`${buttonStyles({ color: "default", size: "md", radius: "lg", variant: "light" })} hover:bg-purple-500 hover:w-60 text-foreground-600 hover:text-white`}
              >
                <Building2 />Property Management
              </Link>
              <Link
                href="#"
                className={`${buttonStyles({ color: "default", size: "md", radius: "lg", variant: "light" })} hover:bg-purple-500 hover:w-60 text-foreground-600 hover:text-white`}
              >
                <CalendarCheck />Reservation Management
              </Link>
              <Link
                href="#"
                className={`${buttonStyles({ color: "default", size: "md", radius: "lg", variant: "light" })} hover:bg-purple-500 hover:w-60 text-foreground-600 hover:text-white`}
              >
                <User />User Management
              </Link>
          </div>
        <div className="space-y-3 ">
            <label className="px-3 text-xs font-semibold uppercase text-foreground">Property Master</label>
            <PropertyMasterDropDown />
            <FacilitesAndServicesDropDown />
        </div>
        </nav>
        <div className="mt-6">
          <div className="rounded-lg bg-gray-100 p-3 ">
            <h2 className="text-sm font-medium text-gray-800">New feature availabel!</h2>
            <p className="mt-1 text-xs text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus harum officia eligendi
              velit.
            </p>
            {/* <img
              className="mt-2 h-32 w-full rounded-lg object-cover"
              src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1806&q=80"
              alt="Feature"
            /> */}
          </div>
          <div className="mt-6 flex items-center justify-between">
            <a href="#" className="flex items-center gap-x-2">
              <img
                className="h-7 w-7 rounded-full object-cover"
                src="https://overreacted.io/static/profile-pic-c715447ce38098828758e525a1128b87.jpg"
                alt="avatar"
              />
              <span className="text-sm font-medium text-foreground">Rohit Gawade</span>
            </a>
            <a
              href="#"
              className="rotate-180 text-gray-800 transition-colors duration-200 hover:text-gray-900"
            >
              <LogIn className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PmsSideBar;