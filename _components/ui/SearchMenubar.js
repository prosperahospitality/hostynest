"use client"
import Cityselector from "@/_components/ui/CitySelector"
import Bookingselctor from "@/_components/ui/BookingSelctor"
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu} from "@nextui-org/react";
import { button as buttonStyles } from "@nextui-org/theme";
import { MapPin, CalendarCheck2, Clock, Search, School, Plane, Home, TentTree, TrainFront, BusFront, CarTaxiFront } from 'lucide-react';

const SearchMenuBar = () => {

  const list = [
    {
      title: "Hotels",
      icon: <School/>,
    },
    {
      title: "Flights",
      icon: <Plane/>,
    },
    {
      title: "Homestays/Villas",
      icon: <Home/>,
    },
    {
      title: "Holiday Packages",
      icon: <TentTree/>,
    },
    {
      title: "Trains",
      icon: <TrainFront/>,
    },
    {
      title: "Buses",
      icon: <BusFront/>,
    },
    {
      title: "Cabs",
      icon: <CarTaxiFront/>,
    },
  ];


  return (
    <>
    {/* <div className='sticky'>
    <div className="w-fit gap-4 pl-8 pr-4 rounded-xl bg-white justify-center flex items-center z-50 shadow-2xl sticky top-0 -mt-16  border-gray-200 m-auto h-32 transition-all duration-200 delay-200 ease-in-out text-black">


    <div className="absolute -mt-16 w-fit gap-4 pl-2 pr-2 pt-2 pb-2 rounded-xl bg-white justify-center flex items-center shadow-lg top-0 border-gray-200 m-auto h-auto transition-all duration-200 delay-200 ease-in-out text-black">
    <div className='text-primary text-1.125 font-poppinsmedium landing-1.688 gap-2'> */}

    {/* {list.map((item, index) => (
        
        <Button className="flex-col h-auto w-auto items-center p-0 bg-white data-[hover=true]:bg-white text-purple-500 font-bold hover:text-purple-500 hover:shadow-xl rounded-3xl px-3 py-2">
          <a >
          {item.icon}
          </a>
        {item.title}
        </Button>
      
      ))}      */}

    {/* </div>
    
    </div> */}





    <div className='text-primary text-1.125 font-poppinsmedium landing-1.688'>
    <p className="flex static items-center font-bold text-purple-500"><MapPin className="mr-2 h-8 w-8" />Where ?</p>
    <Cityselector/>
    </div>
       

    <div className='text-primary text-1.125 font-poppinsmedium landing-1.688'>
    <p className="flex static items-center font-bold text-purple-500"><CalendarCheck2 className="mr-2 h-8 w-8" />When ?</p>
    {/* <Bookingselctor /> */}
    </div>


    <div className='text-primary text-1.125 font-poppinsmedium landing-1.688'>
    <p className="flex static items-center font-bold text-purple-500"><Clock className="mr-2 h-8 w-8" />What Time ?</p>
    {/* <TimePickerTab /> */}
    </div>


    <div className='pt-5 gap-6'>
    {/* <button
            type="button"
            className="ml-2 rounded-md bg-purple-600 px-3 py-2 text-3xl font-semibold text-foreground shadow-sm hover:bg-purple-900 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Search
    </button> */}
    <Button color="secondary" variant="shadow" size="lg">
      Search
    <Search className="h-6 w-6"/>
      </Button>
    </div>


    {/* </div>
    </div> */}
    </>
  );
};

export default SearchMenuBar;
