"use client"
import React, { useState, useEffect } from 'react';
import { Button, Divider } from "@nextui-org/react";
import { MapPin, CalendarCheck2, Clock, Search, UserRound, CalendarDays, Users, Locate } from 'lucide-react';
import Cityselector from "@/_components/ui/CitySelector";
import Datepicker from "@/_components/ui/DatePicker";
import TimePickerTab from '@/_components/ui/TimePickerTab';
import RoomsAndGuests from "@/_components/ui/RoomsAndGuests";
import { useRouter } from 'next/navigation';
import { CiLocationArrow1, CiCalendar, CiTimer } from "react-icons/ci";
import { PiUsersLight } from "react-icons/pi";


export default function HourlyBooking({ searchCity }) {
  // const [selectedDate, setSelectedDate] = useState();
  const [selectedCity, setSelectedCity] = useState(null);
  // const [selectedTime, setSelectedTime] = useState('');

  const [adultsSelect, setAdultsSelect] = useState('');
  const [childSelect, setChildSelect] = useState('');
  const [infantsSelect, setInfantsSelect] = useState('');
  const [roomsSelect, setRoomsSelect] = useState('');
  const [petsSelect, setPetsSelect] = useState('');

  let router = useRouter();

  const [selectedDate, setSelectedDate] = useState(new Date()); // Initialize with current date
  const [selectedTime, setSelectedTime] = useState("");
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [nearMeFlag, setNearMeFlag] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowTimePicker(true);
  };

  const toggleTimePicker = () => {
    setShowTimePicker(prevState => !prevState); // Toggle time picker visibility
  };

  const handleSelectedTime = (time) => {
    setSelectedTime(time);
  };




  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  // const handleDateSelect = (date) => {
  //   setSelectedDate(date);
  // };

  // const handleTimeSelect = (time) => {
  //   setSelectedTime(time);
  // };



  const searchAction = (e) => {

    ///////////////Date Formatter/////////////////////////
    // let dateObject = new Date(selectedDate);
    // let day = String(dateObject.getDate()).padStart(2, '0');
    // let month = String(dateObject.getMonth() + 1).padStart(2, '0');
    // let year = dateObject.getFullYear();
    // let formattedDate = `${day}-${month}-${year}`;
    // console.log("formattedDate::::::>",formattedDate);

    ////////////////Time Formatter////////////////////////
    // let [time, meridiem] = selectedTime.split(' ');
    // let [hours] = time.split(':').map(Number);
    // if (meridiem.toLowerCase() === 'pm' && hours < 12) {
    //     hours += 12;
    // }
    // if (meridiem.toLowerCase() === 'am' && hours === 12) {
    //     hours = 0;
    // }
    // let time24HourFormat = hours.toString().padStart(2, '0');
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };

    const formattedDate = selectedDate.toLocaleDateString('en-IN', options).replace(/\//g, '-');
    let time24HoursFormat;
    if(!selectedTime) {
      const currentDate = new Date();
      let hours = currentDate.getHours(); 
      const minutes = currentDate.getMinutes(); 
      
      
      if (minutes > 0) {
          hours += 1;
      }
      
      hours = hours % 24;
      
      time24HoursFormat = hours.toString().padStart(2, '0');
    }else{
      let hours = selectedTime.getHours(); 
      const minutes = selectedTime.getMinutes(); 
      
      
      if (minutes > 0) {
          hours += 1;
      }
      
      hours = hours % 24;
      
      time24HoursFormat = hours.toString().padStart(2, '0');
    }
    console.log("Selcted City Test: ",selectedCity)

   router.push(`/bookings/hourlybooking/search?location=${selectedCity}&date=${formattedDate}&time=${time24HoursFormat}&adultsSelect=${adultsSelect}
&childSelect=${childSelect}
&infantsSelect=${infantsSelect}
&roomsSelect=${roomsSelect}
&petsSelect=${petsSelect}`);

  }

  // useEffect(() => {
  //   console.log("SElected City hourlybooking.js::::::::::",selectedCity)
  // }, [selectedCity]);

  const handleNearMe = () => {
    console.log("Near ME: ",selectedTime)
    setNearMeFlag(true);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };

    const formattedDate = selectedDate.toLocaleDateString('en-IN', options).replace(/\//g, '-');

    let time24HoursFormat;
    if(!selectedTime) {
      const currentDate = new Date();
      let hours = currentDate.getHours(); 
      const minutes = currentDate.getMinutes(); 
      
      
      if (minutes > 0) {
          hours += 1;
      }
      
      hours = hours % 24;
      
      time24HoursFormat = hours.toString().padStart(2, '0');
    }else{
      let hours = selectedTime.getHours(); 
      const minutes = selectedTime.getMinutes(); 
      
      
      if (minutes > 0) {
          hours += 1;
      }
      
      hours = hours % 24;
      
      time24HoursFormat = hours.toString().padStart(2, '0');
    }
    router.push(`/bookings/hourlybooking/search?location=${selectedCity}&date=${formattedDate}&time=${time24HoursFormat}`);
  }

  React.useEffect(() => {
    console.log("Date and Time: ",
    selectedTime)
  }, [selectedDate,
    selectedTime]);

    const handleAdultsSelect = (val) => {
      setAdultsSelect(val)
    }
    const handleChildSelect = (val) => {
      setChildSelect(val)
    }
    const handleInfantsSelect = (val) => {
      setInfantsSelect(val)
    }
    const handleRoomsSelect = (val) => {
      setRoomsSelect(val)
    }
    const handlePetsSelect = (val) => {
      setPetsSelect(val)
    }

  return (
    <>
      <div className='sticky'>

        <div className="w-full gap-2 pl-4 pr-4  justify-center flex items-center z-50 sticky top-0 border-gray-200 m-auto h-24 transition-all duration-200 delay-200 ease-in-out text-black ">
          <div className='text-primary text-1.125 font-poppinsmedium landing-1.688'>
            <p className="flex ml-4 static items-center text-lg font-bold text-gray-600"><CiLocationArrow1 className="mr-2 h-8 w-8" />Destination</p>
            <div className='flex items-center gap-2'>
            <Cityselector onCitySelect={handleCitySelect} searchCity={searchCity} nearMeFlag={nearMeFlag}/>
            <Button variant='shadow' color='primary' size='sm' startContent={<Locate className='text-white'/>} onClick={(e) => handleNearMe()}>Near Me</Button>
            </div>
          </div>

          <Divider orientation="vertical" className="h-16 bg-gray-300"/>

          <div className='text-primary text-1.125 font-poppinsmedium landing-1.688 h-[72px]'>
            <p className="flex ml-8 static items-center text-lg font-bold text-gray-600"><CiCalendar className="mr-2 h-8 w-8" />When</p>
            <Datepicker
              selected={selectedDate}
              onDateChange={handleDateChange}
              toggleTimePicker={toggleTimePicker}
            />
          </div>

          <Divider orientation="vertical" className="h-16 bg-gray-300"/>

          <div className='text-primary text-1.125 font-poppinsmedium landing-1.688 h-[72px]'>
            <p className="flex ml-4 static items-center text-lg font-bold  text-gray-600"><CiTimer className="mr-2 h-8 w-8" />What Time</p>
            <TimePickerTab selectedDate={selectedDate}
              handleTimeSelection={handleSelectedTime}
              showTimePicker={showTimePicker}
              toggleTimePicker={toggleTimePicker} />
          </div>

          <Divider orientation="vertical" className="h-16 bg-gray-300"/>

          <div className='text-primary text-1.125 font-poppinsmedium landing-1.688'>
            <p className="flex ml-4 static items-center text-base font-bold text-gray-600"><PiUsersLight className="mr-2 h-8 w-8" />Rooms & Guests</p>
            <RoomsAndGuests onAdultsSelect={handleAdultsSelect}
onChildSelect={handleChildSelect}
onInfantsSelect={handleInfantsSelect}
onRoomsSelect={handleRoomsSelect}
onPetsSelect={handlePetsSelect}/>
          </div>
          <div className='pt-6 ml-8'>
            <Button isIconOnly color="secondary" variant="shadow" size="lg" onClick={(e) => searchAction(e)}>
              <Search className="size-10" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
