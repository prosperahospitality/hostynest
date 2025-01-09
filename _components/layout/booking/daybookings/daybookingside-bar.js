"use client"
import Image from 'next/image'
import { IMAGES } from '@/public/index'
import { BarChart, Wallet, Newspaper, BellRing, Paperclip, Brush, Wrench, PanelLeftClose} from 'lucide-react'
import Dropdown from '@/_components/ui/Dropdown';
import Link from 'next/link';


const options = {
    "bookings": [
      { value: 'bookinglist', label: 'Booking List' },
      { value: 'payment', label: 'Payment' },
      { value: 'adjustments', label: 'Adjustmnets' },
    ],

    "ratesinventory": [
      { value: 'managerates&inventory', label: 'Manage Rates & Inventory' },
      { value: 'syncpropertycalender', label: 'Sync Property Calender' },
      { value: 'defaultrates&inventory', label: 'Default Rates & Inventory' },
      { value: 'lowinventorydates', label: 'Low Inventory Dates' },
    ],

    "growyourbusiness": [
        { value: 'promotions&coupons', label: 'Promotions & Coupons' },
        { value: 'plb&udi', label: 'PLB & UDI' },
    ],

    "growyourbusiness": [
        { value: 'promotions&coupons', label: 'Promotions & Coupons' },
        { value: 'plb&udi', label: 'PLB & UDI' },
    ],

    "reviews": [
        { value: 'ratings&reviews', label: 'Ratings & Reviews' },
        { value: 'questions&answers', label: 'Questions & Answers' },
    ],

    "guestchat": [
        { value: 'guestmessages', label: 'Guest Messages' },
        { value: 'instayguestissues', label: 'Instay Guest Issues' },
    ],

    "more": [
        { value: 'marginoffers', label: 'Margin Offers' },
        { value: 'reports', label: 'Reports' },
        { value: 'addons', label: 'Add Ons' },
        { value: 'actioncenter', label: 'Action Cneter' },
    ],

  };
  

  const handleSelect = (selectedOption) => {
    console.log('Selected Option:', selectedOption);
  };

const BookingSideBar = () => {
    const handleSelect = (selectedOption) => {
        console.log('Selected Option:', selectedOption);
      };
    
      const renderOption = (option) => {
        // Customize the content for each option as needed
        return <span>{option.label.toUpperCase()}</span>;
      };

    return (
        <>
            <aside className="flex h-screen overflow-y-auto w-60 flex-col px-5 py-8">
                <a className="flex transform items-center gap-20 px-2 py-1"
                    href="#">
                    <Image src={IMAGES.Logo} alt="Logo" width={70} height={70} />
                    <PanelLeftClose className="h-25 w-25 rounded-sm text-white transition-colors duration-300 hover:bg-lime-400 hover:text-gray-700" aria-hidden="true"/>
                </a>
                <div className="mt-6 flex flex-1 flex-col justify-between">
                    <nav className="-mx-3 space-y-6 ">
                    <div className="space-y-3 ">
                            <a
                                className="flex transform items-center rounded-3xl px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-lime-500 hover:text-black"
                                href="#"
                            >
                                <BarChart className="h-5 w-5" aria-hidden="true" />
                                <span className="mx-2 text-sm font-medium">Dashboard</span>
                            </a>
                        </div>
                        <div className="space-y-3">
                            <label className="px-3 text-xs font-semibold uppercase text-white">Main Menu</label>
                            <a
                                className="flex transform items-center rounded-3xl px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-lime-500 hover:text-black gap-2"
                                href="#"
                            >
                                <BarChart className="h-5 w-5" aria-hidden="true" />
                                <Dropdown options={options.bookings} onSelect={handleSelect}>Bookings</Dropdown>
                            </a>

                            <a
                                className="flex transform items-center rounded-3xl px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-lime-500 hover:text-black gap-2"
                                href="#"
                            >
                                <BarChart className="h-5 w-5" aria-hidden="true" />
                                <Dropdown options={options.ratesinventory} onSelect={handleSelect}>Rates & Inventory</Dropdown>
                            </a>

                            <a
                                className="flex transform items-center rounded-3xl px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-lime-500 hover:text-black gap-2"
                                href="#"
                            >
                                <BarChart className="h-5 w-5" aria-hidden="true" />
                                <Dropdown options={options.growyourbusiness} onSelect={handleSelect}>Grow Your Business</Dropdown>
                            </a>
                            
                            <a
                                className="flex transform items-center rounded-3xl px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-lime-500 hover:text-black"
                                href="#"
                            >
                                <Wallet className="h-5 w-5" aria-hidden="true" />
                                <span className="mx-2 text-sm font-medium">Property Information</span>
                            </a>

                            <a
                                className="flex transform items-center rounded-3xl px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-lime-500 hover:text-black gap-2"
                                href="#"
                            >
                                <BarChart className="h-5 w-5" aria-hidden="true" />
                                <Dropdown options={options.reviews} onSelect={handleSelect}>Reviews</Dropdown>
                            </a>

                            <a
                                className="flex transform items-center rounded-3xl px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-lime-500 hover:text-black"
                                href="#"
                            >
                                <Wallet className="h-5 w-5" aria-hidden="true" />
                                <span className="mx-2 text-sm font-medium">Analytics</span>
                            </a>

                            <a
                                className="flex transform items-center rounded-3xl px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-lime-500 hover:text-black gap-2"
                                href="#"
                            >
                                <BarChart className="h-5 w-5" aria-hidden="true" />
                                <Dropdown options={options.guestchat} onSelect={handleSelect}>Guest Chat</Dropdown>
                            </a>

                            <a
                                className="flex transform items-center rounded-3xl px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-lime-500 hover:text-black gap-2"
                                href="#"
                            >
                                <BarChart className="h-5 w-5" aria-hidden="true" />
                                <Dropdown options={options.more} onSelect={handleSelect}>More</Dropdown>
                            </a>





                        </div>
                        <div className="space-y-3 ">
                            <label className="px-3 text-xs font-semibold uppercase text-white">content</label>
                            <a
                                className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                                href="#"
                            >
                                <Newspaper className="h-5 w-5" aria-hidden="true" />
                                <span className="mx-2 text-sm font-medium">Blogs</span>
                            </a>
                            <a
                                className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                                href="#"
                            >
                                <BellRing className="h-5 w-5" aria-hidden="true" />
                                <span className="mx-2 text-sm font-medium">Notifications</span>
                            </a>
                            <a
                                className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                                href="#"
                            >
                                <Paperclip className="h-5 w-5" aria-hidden="true" />
                                <span className="mx-2 text-sm font-medium">Checklists</span>
                            </a>
                        </div>

                        <div className="space-y-3 ">
                            <label className="px-3 text-xs font-semibold uppercase text-white">Customization</label>
                            <a
                                className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                                href="#"
                            >
                                <Brush className="h-5 w-5" aria-hidden="true" />
                                <span className="mx-2 text-sm font-medium">Themes</span>
                            </a>
                            <a
                                className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                                href="#"
                            >
                                <Wrench className="h-5 w-5" aria-hidden="true" />
                                <span className="mx-2 text-sm font-medium">Setting</span>
                            </a>
                        <div className="relative w-[200px] h-[100px] top-[10px] bottom-[90px] bg-gray-500 rounded-[16px]" />
                        </div>
                    </nav>
                </div>
            </aside>
        </>
    )
}

export default BookingSideBar;