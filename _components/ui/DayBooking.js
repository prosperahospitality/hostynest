"use client"
import React, { useState, useEffect } from 'react';
import Cityselector from "@/_components/ui/CitySelector"
import Bookingselctor from "@/_components/ui/BookingSelctor"
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu } from "@nextui-org/react";
import { button as buttonStyles } from "@nextui-org/theme";
import { MapPin, CalendarCheck2, Clock, Search, School, Plane, Home, TentTree, TrainFront, BusFront, CarTaxiFront, UserRound } from 'lucide-react';
import RoomsAndGuests from "@/_components/ui/RoomsAndGuests"
import TimePickerTab from '@/_components/ui/TimePickerTab'
import { Divider } from "@nextui-org/react";
import Daterangepicker from '@/_components/ui/DateRangePicker';
import PropertyCarousel from '@/_components/ui/PropertyCarousel'
import { useRouter } from 'next/navigation';
import { CiLocationArrow1, CiCalendar, CiTimer } from "react-icons/ci";
import { PiUsersLight } from "react-icons/pi";


export default function DayBooking() {
  const [selectedDate, setSelectedDate] = useState();
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  let router = useRouter();

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };
  
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const searchAction = (e) => {

  ///////////////Date Formatter/////////////////////////
    let dateObject = new Date(selectedDate);
    let day = String(dateObject.getDate()).padStart(2, '0');
    let month = String(dateObject.getMonth() + 1).padStart(2, '0');
    let year = dateObject.getFullYear();
    let formattedDate = `${day}-${month}-${year}`;
    console.log("formattedDate::::::>",formattedDate);

  ////////////////Time Formatter////////////////////////
    // let [time, meridiem] = selectedTime.split(' ');
    // let [hours] = time.split(':').map(Number);
    // if (meridiem.toLowerCase() === 'pm' && hours < 12) {
    //     hours += 12;
    // }
    // if (meridiem.toLowerCase() === 'am' && hours === 12) {
    //     hours = 0;
    // }
    let time24HourFormat = "";

    router.push(`/bookings/hourlybooking/search?location=${selectedCity}&date=${formattedDate}&time=${time24HourFormat}`);

  }

  useEffect(() => {

  }, [selectedCity]);

  const list = [
    {
      title: "Hotels",
      icon: <School />,
    },
    {
      title: "Flights",
      icon: <Plane />,
    },
    {
      title: "Homestays/Villas",
      icon: <Home />,
    },
    {
      title: "Holiday Packages",
      icon: <TentTree />,
    },
    {
      title: "Trains",
      icon: <TrainFront />,
    },
    {
      title: "Buses",
      icon: <BusFront />,
    },
    {
      title: "Cabs",
      icon: <CarTaxiFront />,
    },
  ];


  return (
    <>
      <div className='sticky'>
        <div className="w-full gap-2 pl-4 pr-4 justify-center flex items-center z-50 sticky top-0 m-auto h-24 transition-all duration-200 delay-200 ease-in-out text-black ">
          <div>
            <p className="flex ml-4 static items-center text-lg font-bold text-gray-600"><CiLocationArrow1 className="mr-2 size-8" />Destination</p>
            <Cityselector onCitySelect={handleCitySelect}/>
          </div>

          <Divider orientation="vertical" className="h-16 bg-gray-300" />

          <div>
            <p className="flex ml-4 static items-center text-lg font-bold text-gray-600"><CiCalendar className="size-8" />Check In-Check Out</p>
            <Daterangepicker />
          </div>

          <Divider orientation="vertical" className="h-16 bg-gray-300" />

          <div>
            <p className="flex ml-8 static items-center text-lg font-bold text-gray-600"><PiUsersLight className="mr-2 size-8" />Travelers</p>
            <RoomsAndGuests />
          </div>
          <div className='pt-2 gap-2'>
            <Button isIconOnly color="secondary" variant="shadow" size="lg" onClick={(e) => searchAction(e)}>
              <Search className="size-8" />
            </Button>
          </div>
        </div>

      </div>
      {/* <div className="z-0 w-full gap-2 pl-14 pr-14 rounded-xl bg-white justify-center flex items-center shadow-2xl sticky  border-gray-200 mt-1 h-24 transition-all duration-200 delay-200 ease-in-out text-black ">
          <div className='text-primary text-1.125 font-poppinsmedium landing-1.688'>
            <PropertyCarousel />
          </div>
        </div> */}
    </>
  );
};