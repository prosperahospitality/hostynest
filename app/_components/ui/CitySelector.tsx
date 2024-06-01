"use client"
import * as React from "react"
import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { MapPin, CornerDownRight } from 'lucide-react'


const city_list = [
  { label: "Hyderabad", value: "hyderabad"},
  { label: "Delhi", value: "delhi"},
  { label: "Gurgaon", value: "gurgaon"},
  { label: "Bangalore", value: "bangalore"},
  { label: "Mysore", value: "mysore"},
  { label: "Mumbai", value: "mumbai"},
  { label: "Navi Mumbai", value: "navi mumbai"},
  { label: "Chandigarh", value: "chandigarh"},
]



interface Location {
  location: string;
  sub_cities?: string[];
  city?: string;
}

type Live_Location = {
  latitude: number;
  longitude: number;
};

let city_arr: any[] = [];

interface ChildProps {
  onCitySelect: (city: string) => void; 
  searchCity : string;
  nearMeFlag : boolean;
}

const Cityselector: React.FC<ChildProps> = ({ onCitySelect, searchCity, nearMeFlag }) => {
  const [value, setValue] = React.useState<string>('');
  const [filteredLocations, setFilteredLocations] = React.useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = React.useState('');
  const [selectedNew, setSelectedNew] = React.useState('');
  const [selectedSubCity, setSelectedSubCity] = React.useState('');
  const [divDisplay, setDivDisplay] = React.useState(false);
  const [location, setLocation] = useState<Live_Location | null>(null);
  const [address, setAddress] = useState<string>('');
  const [addressArray, setAddressArray] = useState<string[]>([]);


  async function list_of_cities(curr_val: String) {

    const results = await fetch("/api/search_cities", {
      method: "POST",
      body: JSON.stringify({ curr_val })
    });
    const response = await results.json();
    setFilteredLocations(response.final_res_like);

  }

  function capitalize_each_word(val : string) {

    // const mySentence = "sameer 02 asd- li Lio";
    const words = val.split(" ");

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }

    var str = words.join(" ");
    var replacedStr = '';

    for (var i = 0; i < str.length; i++) {
      if (str[i] === ',') {
        replacedStr += ' ';
      } else {
        replacedStr += str[i];
      }
    }

    console.log("Words:::::>" + replacedStr);
    setValue(replacedStr);
  }

  React.useEffect(() => {
    if (selectedNew != "" && selectedLocation === "" && selectedSubCity === "") {
      setValue(selectedNew);
      onCitySelect(selectedNew)
      
    }
    if (selectedLocation === selectedNew) {
      setValue(selectedSubCity);
      onCitySelect(selectedSubCity)
      setDivDisplay(false)

    }
    else {
      setValue(selectedNew);
      onCitySelect(selectedNew)
      setDivDisplay(false)
    }

    if(selectedNew === "" && selectedLocation === "" && selectedSubCity === "") {
      console.log("If 01 Called:::::::::");

       

        if(searchCity !== undefined) {
          console.log("If 02 Called:::::::::");
          setValue(searchCity);
        }else{
          //setValue(addressArray[0]);
          onCitySelect(addressArray[0])
        }

    }

    

  }, [selectedLocation, selectedNew, selectedSubCity, addressArray, searchCity]);

  React.useEffect(() => {
    list_of_cities("")
  }, []);

  React.useEffect(() => {
    console.log("Address Array: ",nearMeFlag, addressArray[0]);

    if(nearMeFlag) {
      setValue(addressArray[0]);
    }
  }, [nearMeFlag]);

  React.useEffect(() => {

    console.log("Selcted City Test Value ",value);
    onCitySelect(value)

  }, [value]);

  const toggleDivDisplay = () => {
    setDivDisplay(!divDisplay);
  };
///////////////////Fetching Live Location////////////////////////////

React.useEffect(() => {
  // Function to fetch live location
  const fetchLiveLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });

          fetchAddress(latitude, longitude);
        },
        (error) => {
          
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const fetchAddress = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Display Name: ",data,data.display_name)
        setAddress(data.display_name);
       
      } else {
        console.error('Failed to fetch address:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  
  fetchLiveLocation();

  // Cleanup function
  return () => {
    
  };
}, []);

React.useEffect(() => {
  // console.log("Live Location:::::::::>",address)
  const addressArray: string[] = address.split(", ");
  console.log(addressArray);
  setAddressArray(addressArray)
}, [address])

React.useEffect(() => {
  console.log("Live Location:::::::::>",addressArray[0])
}, [addressArray])

  return (
    <>
      <Combobox value={value} onChange={(e) => {setValue}}>
        <div className="relative mt-1 bg-white">
        <div className="relative w-full overflow-hidden text-center rounded-xl bg-white">
        <Combobox.Input
        className="w-fit py-2 pl-3 pr-10 text-sm rounded-xl text-center font-semibold text-gray-500 bg-white cursor-pointer"
        placeholder="Select City Or Area" 
        onChange={(e) => { list_of_cities(e.target.value); capitalize_each_word(e.target.value); }}
        value={value}
        onClick={toggleDivDisplay}
      />
      </div>
      <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
        <Combobox.Options className="absolute mt-1 w-96 bg-white overflow-auto rounded-md py-1 text-base">
      
        {filteredLocations.length === 0 ? (
                <div className="relative cursor-default select-none px-4 py-2 text-red-500">
                  Nothing found.
                </div>
              ) : (
      <div className="relative flex flex-col h-96 w-96">
        <ul className="w-96 overflow-y-scroll">
          {filteredLocations.map((location: Location, index: number) => (
            <li
              key={index}
              className="relative cursor-pointer  select-none py-2 pl-6 pr-4 text-primary"
              onClick={(e) => { setSelectedNew(location.location); setValue(location.location) }}
            >
              <span
                className="flex items-center truncate  font-normal"
                style={{ position: "relative", left: "-17px" }}
              >
                <MapPin className="text-primary ml-2" />
                <strong>{location.location}</strong>
              </span>
              {location.sub_cities ? (
                <ul
                  style={{ margin: "0 0 0 -35px" }}
                >
                  {location.sub_cities.map((subCity: string, index: number, array: string[]) => (
                    <li
                      key={`${location.location}-${index}`}
                      className={`${index === array.length - 1 ? 'ml-16 before:absolute before:top-0  before:h-[50%] flex items-end relative cursor-pointer select-none   pr-2 text-primary-500' : 'ml-16 flex items-end relative cursor-pointer select-none pr-2 text-primary-300'}`}
                      onClick={(e) => { setSelectedLocation(location.location); setSelectedSubCity(subCity) }}
                    >
                      <div className="relative w-8 -top-3">
                      <CornerDownRight />
                        </div>
                      <div className="pl-2" style={{ position: "relative", top: "6px", height: "33px" }}>
                        {subCity}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul
                  style={{ margin: "0 0 0 -35px" }}
                >
                  <li
                    key={`${location.location}-${index}`}
                    className="ml-16 before:absolute before:top-0  before:h-[50%] flex items-end relative cursor-pointer select-none   pr-2 text-primary-300"
                    onClick={(e) => { setSelectedLocation(location.location); location.city && setSelectedSubCity(location.city) }}>
                    <div className=" w-[2rem] " style={{ position: "relative", top: "-17px" }}>
                    <CornerDownRight />
                      </div>
                    <div className="pl-2" style={{ position: "relative", top: "6px", height: "40px" }}>
                      {location.city}
                    </div>
                  </li>
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      )}
      </Combobox.Options>
      </Transition>
        </div>
      </Combobox>
    </>
  )
}

export default Cityselector;