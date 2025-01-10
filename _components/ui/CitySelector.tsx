"use client"
import * as React from "react"
import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { MapPin, CornerDownRight } from 'lucide-react'
import { Input } from "@nextui-org/react"
import { useAnimate, stagger, motion } from "framer-motion";
import "./styles.css"

const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });

interface City {
  geonameId: number;
  name: string;
  country: string;
  [key: string]: any;
}


interface Location {
  name: string;
  sub_cities?: string[];
  city?: string;
  adminName1: string;
  countryName: string;
  geonameId: string;
}

type Live_Location = {
  latitude: number;
  longitude: number;
};

let city_arr: any[] = [];

interface ChildProps {
  onCitySelect: (city: string) => void;
  searchCity: string;
  nearMeFlag: boolean;
}

const Cityselector: React.FC<ChildProps> = ({ onCitySelect, searchCity, nearMeFlag }) => {
  function useMenuAnimation(isOpen: boolean) {
    const [scope, animate] = useAnimate();

    React.useEffect(() => {
      // animate(".arrow", { rotate: isOpen ? 180 : 0 }, { duration: 0.2 });

      animate(
        "ul",
        {
          clipPath: isOpen
            ? "inset(0% 0% 0% 0% round 10px)"
            : "inset(10% 50% 90% 50% round 10px)",
        },
        {
          type: "spring",
          bounce: 0,
          duration: 0.5,
        }
      );

      animate(
        "li",
        isOpen
          ? { opacity: 1, scale: 1, filter: "blur(0px)" }
          : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
        {
          duration: 0.2,
          delay: isOpen ? staggerMenuItems : 0,
        }
      );
    }, [isOpen]);

    return scope;
  }

  const [activeIndex, setActiveIndex] = useState(-1);
  const [isOpenn, setIsOpenn] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Select Purpose");
  const scope = useMenuAnimation(isOpenn);

  const [value, setValue] = React.useState<string>('');
  const [filteredLocations, setFilteredLocations] = React.useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = React.useState('');
  const [selectedNew, setSelectedNew] = React.useState('');
  const [selectedSubCity, setSelectedSubCity] = React.useState('');
  const [divDisplay, setDivDisplay] = React.useState(false);
  const [location, setLocation] = useState<Live_Location | null>(null);
  const [address, setAddress] = useState<string>('');
  const [addressArray, setAddressArray] = useState<string[]>([]);


  async function list_of_cities(curr_val: string) {
    try {
      // Fetch Indian cities and global cities concurrently
      const [indiaResults, globalResults] = await Promise.all([
        fetch(
          `http://api.geonames.org/searchJSON?name_startsWith=${curr_val}&featureClass=P&country=IN&maxRows=100&username=S2m3e7_`
        ).then((res) => res.json()),
        fetch(
          `http://api.geonames.org/searchJSON?name_startsWith=${curr_val}&featureClass=P&maxRows=100&username=S2m3e7_`
        ).then((res) => res.json()),
      ]);

      // Extract geonames from both responses
      const indianCities = indiaResults.geonames || [];
      const globalCities = globalResults.geonames || [];

      // Filter global cities to exclude any that are already in the Indian cities list
      const globalCitiesFiltered = globalCities.filter(
        (city: Location) => !indianCities.some((indianCity: Location) => indianCity.geonameId === city.geonameId)
      );

      // Combine Indian cities first, followed by global cities
      const combinedResults = [...indianCities, ...globalCitiesFiltered];

      console.log("Combined Results:", combinedResults);

      // Update the filtered locations state
      setFilteredLocations(combinedResults);

      if (combinedResults.length === 0) {
        console.log("Is zero");

        const [indiaResults, globalResults] = await Promise.all([
          fetch(
            `http://api.geonames.org/childrenJSON?geonameId=1269750&username=S2m3e7_`
          ).then((res) => res.json()),
          fetch(
            `http://api.geonames.org/childrenJSON?username=S2m3e7_`
          ).then((res) => res.json()),
        ]);

        // Extract geonames from both responses
        const indianCities = indiaResults.geonames || [];
        const globalCities = globalResults.geonames || [];

        // Filter global cities to exclude any that are already in the Indian cities list
        const globalCitiesFiltered = globalCities.filter(
          (city: Location) =>
            !indianCities.some((indianCity: Location) => indianCity.geonameId === city.geonameId)
        );

        // Combine Indian cities first, followed by global cities
        const combinedResults = [...indianCities, ...globalCitiesFiltered];

        console.log("Combined Results states:", combinedResults);

        // Now filter the combined results based on the search query
        const filtered = combinedResults.filter((city: Location) =>
          city.name.toLowerCase().includes(curr_val.toLowerCase()) // Case-insensitive search
        );
        setFilteredLocations(filtered);
      }


    } catch (error) {
      console.error("Error fetching cities:", error);
      setFilteredLocations([]);
    }
  }








  function capitalize_each_word(val: string) {

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

    if (selectedNew === "" && selectedLocation === "" && selectedSubCity === "") {
      console.log("If 01 Called:::::::::");



      if (searchCity !== undefined) {
        console.log("If 02 Called:::::::::");
        setValue(searchCity);
      } else {
        //setValue(addressArray[0]);
        onCitySelect(addressArray[0])
      }

    }



  }, [selectedLocation, selectedNew, selectedSubCity, addressArray, searchCity]);

  React.useEffect(() => {
    list_of_cities("")
  }, []);

  React.useEffect(() => {
    console.log("Address Array: ", nearMeFlag, addressArray[0]);

    if (nearMeFlag) {
      setValue(addressArray[0]);
    }
  }, [nearMeFlag]);

  React.useEffect(() => {

    console.log("Selcted City Test Value ", value);
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
          console.log("Display Name: ", data, data.display_name)
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
    console.log("Live Location:::::::::>", addressArray[0])
  }, [addressArray])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpenn) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prevIndex) => {
        const nextIndex = prevIndex < filteredLocations.length - 1 ? prevIndex + 1 : 0;
        scrollToActiveItem(nextIndex); // Scroll the active item into view
        return nextIndex;
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prevIndex) => {
        const nextIndex = prevIndex > 0 ? prevIndex - 1 : filteredLocations.length - 1;
        scrollToActiveItem(nextIndex); // Scroll the active item into view
        return nextIndex;
      });
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < filteredLocations.length) {
        handleSelect(filteredLocations[activeIndex]);
      }
    } else if (e.key === "Escape") {
      setIsOpenn(false); // Close the dropdown
    }
  };


  const scrollToActiveItem = (index: number) => {
    const list = document.querySelector(".menuul");
    const item = list?.children[index] as HTMLElement;

    if (item) {
      item.scrollIntoView({
        behavior: "smooth", // Smooth scrolling
        block: "nearest", // Scroll to the nearest visible area
      });
    }
  };


  const handleSelect = (item: Location) => {
    setValue(item.name);
    setIsOpenn(false);
  };

  React.useEffect(() => {
    console.log("Active value", value)
  }, [value])



  return (
    <nav className="menu w-full z-50 h-[3rem] justify-center items-center" ref={scope}>
      <div className="relative">
        <motion.input
          className="mt-1 px-3 py-2 bg-white text-black border shadow-none border-none placeholder-slate-400 focus:outline-black focus:ring-black focus:bg-white block w-full rounded-md sm:text-sm"
          type="text"
          placeholder="Select city or area"
          onFocus={() => setIsOpenn(true)}
          onBlur={() => setIsOpenn(false)}
          onChange={(e) => {
            list_of_cities(e.target.value);
            capitalize_each_word(e.target.value);
          }}
          value={value}
          onKeyDown={(e) => handleKeyDown(e)} // Add keydown event
        />
      </div>

      <ul
        className="custom-scrollbarrrrrr cursor-pointer menuul"
        style={{
          pointerEvents: isOpenn ? "auto" : "none",
          clipPath: "inset(10% 50% 90% 50% round 10px)",
          height: "15rem",
          width: "auto",
        }}
      >
        {filteredLocations.length > 0 ? (
          filteredLocations.map((item, index) => {
            return (
              <li
                className={"menuli"}
                style={activeIndex === index ? {
                  background: "aqua",
                  borderRadius: "15px",
                  color: "black",
                } :
                  {
                    background: "white",
                    color: "black",
                  }}
                key={`${item.name}-${index}`}
                onMouseEnter={() => setActiveIndex(index)} // Update active index on hover
                onClick={() => handleSelect(item)}
              >
                <div className="flex flex-col gap-0 justify-start items-start text-start">
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-sm">{item.adminName1 + ", " + item.countryName}</div>
                </div>
              </li>
            )
          })
        ) : (
          <li className="menuli" style={{
            background: "white",
            color: "black",
          }}>No items found!
          </li>
        )}
      </ul>
    </nav>

  )
}

export default Cityselector;