'use client'
import ImgCarousel from "@/app/_components/ui/ImgCarousel"
import { Crown, Star, StarHalf, MapPin, Heart, Hotel, CreditCard, Wifi, AirVent, Tv, Milk, ParkingSquare } from 'lucide-react';
import { Badge } from "@/app/_components/ui/Badge";
import { Link, Chip, Divider, Button } from "@nextui-org/react";
import HourlyBookingSideBar from '@/app/_components/layout/booking/hourlybookings/hourlybookingside-bar';
import Cityselector from "@/app/_components/ui/CitySelector";
import { useSearchParams } from 'next/navigation'
import React, { useState, useEffect } from 'react';
import HotelName from "@/public";
import SearchHero from '@/app/(booking)/bookings/hourlybooking/search/SearchHero';
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { useSelector } from "react-redux";



export default function HourlyBookingsearch() {

    const [hotelsAllData, setHotelsAllData] = useState([]);
    const [hotelsData, setHotelsData] = useState([]);
    const [hotelsFacilities, setHotelsFacilities] = useState([]);
    const [hotelsPaymentMethod, setHotelsPaymentMethod] = useState([]);
    const [hotelsPOI, setHotelsPOI] = useState([]);
    const [selectChecks, setSelectChecks] = useState({});
    const [ratingsChecks, setRatingsChecks] = useState({});
    const [priceChecks, setPriceChecks] = useState('');
    const [categoryChecks, setCategoryChecks] = useState({});
    const [facilityChecks, setFacilityChecks] = useState({});
    const [hourChange, setHourChange] = useState();
    const [priceSliderChange, setPriceSliderChange] = useState();
    let dat = useSelector((state) => state.log.loginState);
    


    const searchParams = useSearchParams();
 
  const searchCity = searchParams.get('location');

  useEffect(() => {

    const storedValue = localStorage.getItem('searchCity');

    if (storedValue !== searchCity && dat === 1) {

      localStorage.setItem('searchCity', searchCity);
      
      window.location.reload();
    }
  }, [searchCity]);

  async function search_hotels(searchCity) {

    const results = await fetch("/api/hotels/hotel_info/hotel_by_city", {
      method: "POST",
      body: JSON.stringify({ searchCity })
    });

    let stream = results.body;


        const reader = stream.getReader();
        let chunks = '';
        try {
            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    console.log("Stream is done.");
                    break;
                }
                chunks += new TextDecoder().decode(value);
            }
            setHotelsAllData(JSON.parse(chunks));
            
        } catch (error) {
            console.error("Error reading stream:", error);
        } finally {
            reader.releaseLock();
        }

  }

  useEffect(() => {
    search_hotels(searchCity)

    const searchCity1 = searchParams.get('location');

   console.log("New:::::>",searchCity1);
  }, [searchCity]);

  

  useEffect(() => {

    setHotelsData(hotelsAllData.data);

    setHotelsFacilities(hotelsAllData.facilities);

    setHotelsPaymentMethod(hotelsAllData.payment_method);

    setHotelsPOI(hotelsAllData.hotel_point_of_interest)

}, [hotelsAllData, hotelsData, hotelsFacilities, hotelsPaymentMethod, hotelsPOI]);

let a = [];

// useEffect(() => {
//     console.log("Arr:::::::::>",a);
//   }, [a]);

  function popAllElements(array) {
    while (a.length > 0) {
        a.pop();
    }
}
//////////////////////Check Box Select HAndling//////////////////

function handleCheckBoxSelect(selects) {
    setSelectChecks(selects); 
}

useEffect(() => {
     console.log("Final Selects:::::::>",selectChecks);
  }, [selectChecks]);

  const filteredHotelsData = hotelsData && hotelsData.filter(hotel => {
    const selectedCities = Object.entries(selectChecks)
        .filter(([city, selected]) => selected)
        .map(([city]) => city);
    return selectedCities.length === 0 || selectedCities.includes(hotel.City);
});

// useEffect(() => {
//     console.log("Filtered Data:::::::>",filteredHotelsData);
//   }, [filteredHotelsData]);


//////////////Ratings Select Handle/////////////////

function handleRatingsCheck(rating) {
    setRatingsChecks(rating); 
}

useEffect(() => {
    //  console.log("Final Rating Selects:::::::>",ratingsChecks);
  }, [ratingsChecks]);


  const filteredHotelsDataRatings = hotelsData && hotelsData.filter((hotel,index) => {
    
    const selectedCities = Object.entries(selectChecks)
                                    .filter(([city, selected]) => selected)
                                    .map(([city]) => city);
                            
                                    
                            
                              
                                const selectedRatings = Object.entries(ratingsChecks)
                                    .filter(([rating, selected]) => selected)
                                    .map(([rating]) => (rating === 'popularity' ? parseFloat(rating = 5) : rating === 'ratings4_5Above' ? parseFloat(rating = 4.5) : rating === 'ratings4Above' ? parseFloat(rating = 4) : rating === 'ratings3Above' ? parseFloat(rating = 3) : rating === 'ratings2Above' ? parseFloat(rating = 2) : ""));
                            
                               
                                    const selectedCategories = Object.keys(categoryChecks).filter(category => categoryChecks[category]);
                                    const isValidCategory = selectedCategories.length === 0 || selectedCategories.includes(hotel.hotel_category);
                            
                                    const selectedFacilities = Object.keys(facilityChecks).filter(facility => facilityChecks[facility]);
                               
                                    if (selectedRatings.length > 0 || selectedCategories.length > 0 || selectedFacilities.length > 0 || hourChange != 0) {
                                        if(selectedRatings.length === 0) {
                                            selectedRatings.push(0)
                                        }
                                        
                                        return (
                                            (selectedCities.length === 0 || selectedCities.includes(hotel.City)) &&
                                            selectedRatings.some(selectedRating => parseFloat(hotel.rating) >= selectedRating) &&
                                            isValidCategory && (selectedFacilities.length === 0 || selectedFacilities.every(selectedFaciliti => hotel.facilities.includes(selectedFaciliti))) && (
                                                hourChange === 0 ? true :
                                                hourChange === 3 ? hotel.hour3_display_flag === 1 && parseFloat(hotel.final_display_price_for_3H) >= priceSliderChange[0] && parseFloat(hotel.final_display_price_for_3H) <= priceSliderChange[1] :
                                                hourChange === 6 ? hotel.hour6_display_flag === 1 && parseFloat(hotel.final_display_price_for_6H) >= priceSliderChange[0] && parseFloat(hotel.final_display_price_for_6H) <= priceSliderChange[1]:
                                                hourChange === 12 ? hotel.hour12_display_flag === 1 && parseFloat(hotel.final_display_price_for_12H) >= priceSliderChange[0] && parseFloat(hotel.final_display_price_for_12H) <= priceSliderChange[1]:
                                                true 
                                            )
                                        );
                                    } else {
                                   
                                    return selectedCities.length === 0 || selectedCities.includes(hotel.City);
    }
}).sort((a, b) => {
    if (priceChecks === 'lowToHigh') {
        // Sort ascending by final_display_price_for_3H
        if (a.final_display_price_for_3H !== b.final_display_price_for_3H) {
            return a.final_display_price_for_3H - b.final_display_price_for_3H;
        }

        if (a.final_display_price_for_6H !== b.final_display_price_for_6H) {
            return a.final_display_price_for_6H - b.final_display_price_for_6H;
        }

        if (a.final_display_price_for_12H !== b.final_display_price_for_12H) {
            return a.final_display_price_for_12H - b.final_display_price_for_12H;
        }
        
        return a.final_display_price_for_24H - b.final_display_price_for_24H;
    } else if (priceChecks === 'highToLow') {
        // Sort descending by final_display_price_for_3H
        if (a.final_display_price_for_3H !== b.final_display_price_for_3H) {
            return b.final_display_price_for_3H - a.final_display_price_for_3H;
        }
        if (a.final_display_price_for_6H !== b.final_display_price_for_6H) {
            return b.final_display_price_for_6H - a.final_display_price_for_6H;
        }
        if (a.final_display_price_for_12H !== b.final_display_price_for_12H) {
            return b.final_display_price_for_12H - a.final_display_price_for_12H;
        }
        
        return b.final_display_price_for_24H - a.final_display_price_for_24H;
    } else {
        return 0; // No sorting applied
    }
});

useEffect(() => {
    console.log("Filtered Data:::::::>",filteredHotelsDataRatings);
  }, [filteredHotelsDataRatings]);


/////////////////////Sort by price///////////////////////

        function handlePriceCheck(price) {
            setPriceChecks(price)
        }

        useEffect(() => {
            
          }, [priceChecks]);

          if (filteredHotelsDataRatings && priceChecks) {
            if (priceChecks === 'lowToHigh') {
                filteredHotelsDataRatings.sort((a, b) => a.final_display_price_for_3H - b.final_display_price_for_3H);
            } else if (priceChecks === 'highToLow') {
                filteredHotelsDataRatings.sort((a, b) => b.final_display_price_for_3H - a.final_display_price_for_3H);
            }
        }

/////////////////////Category Check///////////////////////
        function handleCategoryCheck(categoryState) {
            setCategoryChecks(categoryState)
        }

        useEffect(() => {
            // console.log("Category Check:::::::>",categoryChecks);
          }, [categoryChecks]);

/////////////////////Facility Check///////////////////////        
        function handleFacilityCheck(facilityState) {
            setFacilityChecks(facilityState)
        }

        useEffect(() => {
            console.log("Facility Check:::::::>",facilityChecks);
          }, [facilityChecks]);

 /////////////////////Hour Change/////////////////////// 
          function handleHourChange(hour) {
            console.log(hour);
            setHourChange(hour)
          }
          useEffect(() => {
            console.log("Hour Change:::::::>",hourChange);
          }, [hourChange]);

          const handlePriceChange = (priceRange) => {
            console.log("Pring Range:::::::::>",priceRange);
            setPriceSliderChange(priceRange)
          }

    return (
        <>
          <SearchHero />


        <div className="flex w-screen h-[210vh]">
            <div className="w-[30%]">
            <HourlyBookingSideBar searchCity={searchCity} onSelectCheck = {handleCheckBoxSelect} onRatingsCheck = {handleRatingsCheck} onPriceCheck = {handlePriceCheck} onCategoryCheck = {handleCategoryCheck} onFacilityCheck = {handleFacilityCheck} onHourChange = {handleHourChange} onPriceChange={handlePriceChange}/>
            </div>

            <div className="w-[70%] pb-4">
            <div className="w-full h-full overflow-y-scroll">
            <Breadcrumbs className="pl-6" >
                <BreadcrumbItem>Home</BreadcrumbItem>
                <BreadcrumbItem>Navi Mumbai Hotels</BreadcrumbItem>
            </Breadcrumbs>
                <div className="space-y-3">
                    <h1 className="text-3xl text-gray-500 pt-4 pl-6">Showing {filteredHotelsDataRatings && filteredHotelsDataRatings.length} Hourly Hotels in {searchCity}</h1>                         
                        <>
                            {hotelsData && hotelsData
                            .filter(hotel => {

                                    const selectedCities = Object.entries(selectChecks)
                                    .filter(([city, selected]) => selected)
                                    .map(([city]) => city);
                            
                                    
                            
                              
                                const selectedRatings = Object.entries(ratingsChecks)
                                    .filter(([rating, selected]) => selected)
                                    .map(([rating]) => (rating === 'popularity' ? parseFloat(rating = 5) : rating === 'ratings4_5Above' ? parseFloat(rating = 4.5) : rating === 'ratings4Above' ? parseFloat(rating = 4) : rating === 'ratings3Above' ? parseFloat(rating = 3) : rating === 'ratings2Above' ? parseFloat(rating = 2) : ""));
                            
                               
                                    const selectedCategories = Object.keys(categoryChecks).filter(category => categoryChecks[category]);
                                    const isValidCategory = selectedCategories.length === 0 || selectedCategories.includes(hotel.hotel_category);
                            
                                    const selectedFacilities = Object.keys(facilityChecks).filter(facility => facilityChecks[facility]);
                               
                                    if (selectedRatings.length > 0 || selectedCategories.length > 0 || selectedFacilities.length > 0 || hourChange != 0) {
                                        if(selectedRatings.length === 0) {
                                            selectedRatings.push(0)
                                        }
                                        
                                        return (
                                            (selectedCities.length === 0 || selectedCities.includes(hotel.City)) &&
                                            selectedRatings.some(selectedRating => parseFloat(hotel.rating) >= selectedRating) &&
                                            isValidCategory && (selectedFacilities.length === 0 || selectedFacilities.every(selectedFaciliti => hotel.facilities.includes(selectedFaciliti))) && (
                                                hourChange === 0 ? true :
                                                hourChange === 3 ? hotel.hour3_display_flag === 1 && parseFloat(hotel.final_display_price_for_3H) >= priceSliderChange[0] && parseFloat(hotel.final_display_price_for_3H) <= priceSliderChange[1] :
                                                hourChange === 6 ? hotel.hour6_display_flag === 1 && parseFloat(hotel.final_display_price_for_6H) >= priceSliderChange[0] && parseFloat(hotel.final_display_price_for_6H) <= priceSliderChange[1]:
                                                hourChange === 12 ? hotel.hour12_display_flag === 1 && parseFloat(hotel.final_display_price_for_12H) >= priceSliderChange[0] && parseFloat(hotel.final_display_price_for_12H) <= priceSliderChange[1]:
                                                true 
                                            )
                                        );
                                    } else {
                                   
                                    return selectedCities.length === 0 || selectedCities.includes(hotel.City);
                                }
                                }).sort((a, b) => {
                                    if (priceChecks === 'lowToHigh') {
                                        // Sort ascending by final_display_price_for_3H
                                        if (a.final_display_price_for_3H !== b.final_display_price_for_3H) {
                                            return a.final_display_price_for_3H - b.final_display_price_for_3H;
                                        }

                                        if (a.final_display_price_for_6H !== b.final_display_price_for_6H) {
                                            return a.final_display_price_for_6H - b.final_display_price_for_6H;
                                        }

                                        if (a.final_display_price_for_12H !== b.final_display_price_for_12H) {
                                            return a.final_display_price_for_12H - b.final_display_price_for_12H;
                                        }
                                        
                                        return a.final_display_price_for_24H - b.final_display_price_for_24H;
                                    } else if (priceChecks === 'highToLow') {
                                        // Sort descending by final_display_price_for_3H
                                        if (a.final_display_price_for_3H !== b.final_display_price_for_3H) {
                                            return b.final_display_price_for_3H - a.final_display_price_for_3H;
                                        }
                                        if (a.final_display_price_for_6H !== b.final_display_price_for_6H) {
                                            return b.final_display_price_for_6H - a.final_display_price_for_6H;
                                        }
                                        if (a.final_display_price_for_12H !== b.final_display_price_for_12H) {
                                            return b.final_display_price_for_12H - a.final_display_price_for_12H;
                                        }
                                        
                                        return b.final_display_price_for_24H - a.final_display_price_for_24H;
                                    } else {
                                        return 0; // No sorting applied
                                    }
                                }).map((hotel,index) => (

// eslint-disable-next-line react/jsx-key
                                    <>
                                    <div className="flex shadow-lg rounded-xl hover:outline outline-primary-100 outline-[2.5px] w-[98%] mx-auto bg-white">
                                   <div className="w-[40%] h-full">
                                        <div className="ml-2 pt-4 pl-2 relative">
                                            <ImgCarousel hotelName={hotel.Hotel_name} hotelID={hotel.Hotel_Id}/>
                                        </div>
                                        </div>

                                   <div className="w-[60%] h-full">

                                        
                                        <div className="h-full w-full p-3 flex flex-col border-gray-400">
                                            <div className="relative w-full">
                                            <a href = {`hotels/${hotel.Hotel_name}?hotelName=${hotel.Hotel_name}&hotelId=${hotel.Hotel_Id}`}>
                                                <div className="rounded-xl -ml-1 w-fit flex items-center justify-center cursor-pointer">
                                                    {Array.from({ length: Math.floor(hotel.rating) }, (_, index) => (
                                                        // eslint-disable-next-line react/jsx-key
                                                        <Star key={index} className="h-4 w-4" fill="#FCB332" strokeWidth={0} />
                                                    ))}
                                                    {hotel.rating % 1 !== 0 && (
                                                        // eslint-disable-next-line react/jsx-key
                                                        <StarHalf className="h-4 w-4" fill="#FCB332" strokeWidth={0} />
                                                    )}
                                                    <span className="ml-0.5 text-foreground text-xs font-poppinssemibold">{hotel.rating} ({hotel.user_review_count} Reviews)</span>
                                                </div>
                                                <div className="flex items-center space-x-5 ">
                                                    <h3 className="max-w-[36.25rem] truncate">
                                                        <Link href={`hotels/${hotel.Hotel_name}?hotelName=${hotel.Hotel_name}&hotelId=${hotel.Hotel_Id}`} title="Hotel Shubham Inn"
                                                            className="cursor-pointer text-foreground text-lg font-poppinsmedium">
                                                            {hotel.Hotel_name}
                                                        </Link>
                                                    </h3>
                                                    {hotel.hotel_category === 'premium' ? <Badge className="bg-indigo-500"><Crown className="h-4 w-4 mr-1" />PREMIUM</Badge> : <Badge className="bg-red-500"><Crown className="h-4 w-4 mr-1" />LUXURY</Badge>}
                                                    <Badge className="bg-sky-500">NEW</Badge>
                                                </div>
                                                <div className="pt-0 flex items-center space-x-2">
                                                    <MapPin className="h-4 w-4 text-gray-500" />
                                                    <p className="text-gray-500 text-sm font-poppinsmedium">{hotel.City}</p>
                                                </div>
                                                <div className="pt-3 flex items-center">
                                                    {Array.isArray(hotel.facilities) && hotel.facilities.includes('coupleFriendly') ? <Chip className="text-lime-500" variant="light" startContent={<Heart size={18} fill="#fb7185" strokeWidth={0} />}>Couple Friendly</Chip> : ""}
                                                    {Array.isArray(hotel.facilities) && hotel.facilities.includes('payAtHotel') ? <Chip className="text-lime-500" variant="light" startContent={<Hotel size={18} className="text-blue-500" />}>Pay At Hotel</Chip> : ""}
                                                    {Array.isArray(hotel.facilities) && hotel.facilities.includes('localIdAccepted') ? <Chip className="text-lime-500" variant="light" startContent={<CreditCard size={18} className="text-gray-500" />}>Local ID Accepted</Chip> : ""}
                                                </div>
                                                <div className="flex items-center justify-between w-full">
                                                    <div className="mt-2 flex items-center space-x-4">
                                                        {hotelsFacilities[index].Car_park === true ? <><ParkingSquare className="text-gray-500" /> {void a.push("Sam")}</> : ""}
                                                        {hotelsFacilities[index].Air_conditioning_in_public_areas === true ? <><AirVent className="text-gray-500" /> {void a.push("Sam")}</> : ""}
                                                        {hotelsFacilities[index].wi_fi === true ? <><Wifi className="text-gray-500" /> {void a.push("Sam")}</> : ""}

                                                        <p className="cursor-pointer mt-2">+{Object.keys(hotelsFacilities[index]).length - 3 - a.length}&nbsp;more{popAllElements(a)}</p>
                                                    </div>
                                                </div>
                                                <Divider className="my-4" />
                                                <div className="flex mt-2 items-center justify-end ">
                                                    <p className="text-red-400 text-sm font-semibold">Full Day Price :
                                                        <span
                                                            className="line-through">₹2400</span></p>
                                                </div>
                                                </a>
                                                <div className="mt-3 flex gap-2">
                                                    {hotel.hour3_display_flag === 1 
                                                    ? <Button color="primary" variant="shadow" className="flex flex-col py-6 px-8" onClick={(e) => window.location.href = `hotels/${hotel.Hotel_name}?hotelName=${hotel.Hotel_name}&hour=3&hotelId=${hotel.Hotel_Id}`}>
                                                        <p className="text-lg -mb-1">₹ {hotel.final_display_price_for_3H}</p>
                                                        <p className="text-xs -mt-1">3 Hrs</p>
                                                      </Button>
                                                    : ""}
                                                    
                                                    {hotel.hour6_display_flag === 1 
                                                    ? <Button color="primary" variant="shadow" className="flex flex-col py-6 px-8" onClick={(e) => window.location.href = `hotels/${hotel.Hotel_name}?hotelName=${hotel.Hotel_name}&hour=6&hotelId=${hotel.Hotel_Id}`}>
                                                        <p className="text-lg -mb-1">₹ {hotel.final_display_price_for_6H}</p>
                                                        <p className="text-xs -mt-1">6 Hrs</p>
                                                      </Button>
                                                    : ""}
                                                    
                                                    {hotel.hour12_display_flag === 1 
                                                    ? <Button color="primary" variant="shadow" className="flex flex-col py-6 px-8" onClick={(e) => window.location.href = `hotels/${hotel.Hotel_name}?hotelName=${hotel.Hotel_name}&hour=12&hotelId=${hotel.Hotel_Id}`}>
                                                        <p className="text-lg -mb-1">₹ {hotel.final_display_price_for_12H}</p>
                                                        <p className="text-xs -mt-1">12 Hrs</p>
                                                      </Button>
                                                    : ""}
                                                    

                                                    {hotel.hour24_display_flag === 1 
                                                    ? <Button isDisabled color="primary" variant="shadow" className="flex flex-col py-6 px-8" onClick={(e) => window.location.href = `hotels/${hotel.Hotel_name}?hotelName=${hotel.Hotel_name}&hour=24&hotelId=${hotel.Hotel_Id}`}>
                                                        <p className="text-lg -mb-1">₹ {hotel.final_display_price_for_24H}</p>
                                                        <p className="text-xs -mt-1">24 Hrs</p>
                                                      </Button>
                                                    : ""}
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </>
                    ))}
                    </>
                </div>
            </div>
            <div>
        </div>
        </div>
        </div>
        </>
    )
};