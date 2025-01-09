'use client'
import ImgCarousel from "@/_components/ui/ImgCarousel"
import { Crown, Star, StarHalf, MapPin, Heart, Hotel, CreditCard, Wifi, AirVent, Tv, Milk, ParkingSquare } from 'lucide-react';
import { Badge } from "@/_components/ui/Badge";
import { Link, Chip, Divider, Button } from "@nextui-org/react";
import HourlyBookingSideBar from '@/_components/layout/booking/hourlybookings/hourlybookingside-bar';
import Cityselector from "@/_components/ui/CitySelector";
import React, { useState, useEffect, useCallback } from 'react';
import HotelName from "@/public";
import SearchHero from '@/app/(booking)/bookings/hourlybooking/search/SearchHero';
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'



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
    const [hotelIdsArray, sethotelIdsArray] = useState([]);
    const [lowestRatesObjectsArray, setLowestRatesObjectsArray] = useState([]);
    const [allRoomDetails, setAllRoomDetails] = useState([]);
    let dat = useSelector((state) => state.log.loginState);
    
    const pathname = usePathname()
    console.log("pathname: ")
    const router = useRouter()
    const searchParams = useSearchParams();
 
  const searchCity = searchParams.get('location');
  const searchedDate = searchParams.get('date');
  const searchTime = searchParams.get('time');
  const adultsSelect = searchParams.get('adultsSelect');
  const childSelect = searchParams.get('childSelect');
  const infantsSelect = searchParams.get('infantsSelect');
  const roomsSelect = searchParams.get('roomsSelect');
  const petsSelect = searchParams.get('petsSelect');

//   const [startTime, setStartTime] = useState('');
//   const [endTime, setEndTime] = useState('');



const convertTo24Hour = (time) => {
    if(time !== undefined) {

        let hourStr = time.slice(0, -2);
        let meridian = time.slice(-2);
        // const [hourStr, meridian] = time.split(' ');
        let hour = parseInt(hourStr, 10);
    
        if (meridian === 'PM' && hour !== 12) {
          hour += 12;
        } else if (meridian === 'AM' && hour === 12) {
          hour = 0;
        }
    
        return hour;
    }

    // Return a default value when time is undefined
    return undefined;
};

  useEffect(() => {

    const storedValue = localStorage.getItem('searchCity');

    if (storedValue !== searchCity && dat === 1) {

      localStorage.setItem('searchCity', searchCity);
      
      window.location.reload();
    }
  }, [searchCity]);

  async function search_hotels(searchCity, searchedDate, searchTime) {

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
                   // console.log("Stream is done.");
                    break;
                }
                chunks += new TextDecoder().decode(value);
            }
            setHotelsAllData(JSON.parse(chunks));
            //setHotelsData(JSON.parse(chunks).data);
            cardFunction(searchCity, searchedDate, searchTime, JSON.parse(chunks).data)
            setHotelsFacilities(JSON.parse(chunks).facilities);
            setHotelsPaymentMethod(JSON.parse(chunks).payment_method);
            setHotelsPOI(JSON.parse(chunks).hotel_point_of_interest)

        } catch (error) {
            console.error("Error reading stream:", error);
        } finally {
            reader.releaseLock();
        }

  }

  useEffect(() => {

    search_hotels(searchCity, searchedDate, searchTime)
    
  }, [searchCity, searchedDate, searchTime]);


// useEffect(() => {

//     setHotelsData(hotelsAllData.data);

//     setHotelsFacilities(hotelsAllData.facilities);

//     setHotelsPaymentMethod(hotelsAllData.payment_method);

//     setHotelsPOI(hotelsAllData.hotel_point_of_interest)

// }, [hotelsAllData, hotelsData, hotelsFacilities, hotelsPaymentMethod, hotelsPOI, hotelIdsArray]);

// useEffect(() => {

//     setHotelsData(hotelsAllData.data);

// }, [hotelsAllData]);

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
     //console.log("Final Selects:::::::>",selectChecks);
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


  ////////////////////////////////////rates and inentory////////////////////////////////////////////////


  const cardFunction = async (searchCity, searchedDate, searchTime, hotelsData) => {

    console.log("Info....,0",searchCity, searchedDate, searchTime, hotelsData)

    function formatDate(dateString) {
        const [day, month, year] = dateString.split("-");
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      
        const date = new Date(year, month - 1, day);
        const dayName = days[date.getDay()];
        const monthName = months[date.getMonth()];
      
        return `${dayName} ${day} ${monthName}`;
      }
    
      const formattedDate = formatDate(searchedDate);

    const results = await fetch(`/api/pms/rates_and_inventory/managerateandinventory?searchedDate=${formattedDate}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
      }).then(response => {
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
       
        return response.json();
      })
      .then(async (resulttt) => {
       
        //console.log("Result:", result);

        let databydate = resulttt?.databydate;


        ////////////Groupin the objects with respect to hotel ids////////////

        // const groupedByHotelId = databydate.reduce((acc, obj) => {
        //     const { Hotel_Id, ...rest } = obj;
        //     if (!acc[Hotel_Id]) {
        //       acc[Hotel_Id] = [];
        //     }
        //     acc[Hotel_Id].push(rest);
        //     return acc;
        //   }, {});

          const groupedByHotelId = databydate.reduce((acc, obj) => {
            const { Hotel_Id, ...rest } = obj;
            if (!acc[Hotel_Id]) {
              acc[Hotel_Id] = [];
            }
            acc[Hotel_Id].push({...rest, Hotel_Id}); // Include Hotel_Id in the object
            return acc;
          }, {});

        console.log("Data 1 groupedByHotelId: ", groupedByHotelId);


        ////////////////////Iterating throup each hotel objects//////////////

        const hotelIdsArrayy = [];
        const lowestRatesObjectsSet = new Set();

        async function get24HrRate (id) {
            const response = await fetch(`/api/pms/property_master/room_details?hotelId=${id.toString()}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
            let activeResults = result.dataActive;
            
            return activeResults
        }


        const promises = Object.keys(groupedByHotelId).map(async hotelId => {

            hotelIdsArrayy.push(hotelId);
            
            const hotelObjects = groupedByHotelId[hotelId];

            let filteredHotelObjects = await Promise.all(hotelObjects.map(async obj => {

                const resss = await get24HrRate(obj.Hotel_Id);

                let filteredResults = resss?.find((item) => item.Hotel_Id === parseInt(obj.Hotel_Id) && item.room_name === obj.room_type);

                console.log("Data 3 :", obj.Hotel_Id, obj.rate_3hr, obj.rate_3hr, obj.rate_3hr, obj.rate_3hr, filteredResults?.room_rate, obj.status)

                if (obj.rate_3hr === 0 && obj.rate_6hr === 0 && obj.rate_12hr === 0 && (obj.rate_24hr.toString() === filteredResults?.room_rate || obj.rate_24hr === 0) || obj.status === "soldout") {
                    return {
                        "hotel_id" : obj.Hotel_Id,
                        "status" : "soldout",
                    };
                }else{
                    return obj;
                }
            }));

            console.log("Data 4 filteredHotelObjects: ",filteredHotelObjects)

            let ffBoth = () => {
                let closeCount = 0;
                let bookableCount = 0;

                for (let i = 0; i < filteredHotelObjects.length; i++) {
                    if (filteredHotelObjects[i].status === "soldout") {
                        
                        closeCount++;
                    } else {
                        bookableCount++;
                    }
                }

                if(closeCount !== 0 && bookableCount !== 0) {
                    return true
                }

            
            };

            let ffBothVar = ffBoth();

            console.log("Data 5 ffBothVar: ",ffBothVar)

            if(ffBothVar) {
                filteredHotelObjects = filteredHotelObjects.filter(obj => obj.status !== "soldout");
            }

            const finalFilteredHotelObjects = filteredHotelObjects.filter(obj => obj !== undefined);
        
            if (finalFilteredHotelObjects?.length > 0) {
              let lowestRatesObject = finalFilteredHotelObjects[0];
        
              for (let i = 1; i < finalFilteredHotelObjects.length; i++) {

                const currentObj = finalFilteredHotelObjects[i];

                    for (const key in currentObj) {
                        if (key.startsWith("rate_") && currentObj.hasOwnProperty(key)) {
                     
                          if (currentObj[key] > 0 && currentObj[key] < lowestRatesObject[key]) {
                            lowestRatesObject = currentObj;
                            break;
                          }
                        }
                      }
                //}
              }
        
              console.log("Object with lowest rates:", lowestRatesObject);
              return lowestRatesObject;
            }
          });
            


        // const promises = Object.keys(groupedByHotelId).map(async hotelId => {

        //     hotelIdsArrayy.push(hotelId);
            
        //     const hotelObjects = groupedByHotelId[hotelId];

        //     console.log("Data 2 hotelObjects: ",hotelObjects)

        //     hotelObjects?.map(async (hotel) => {

        //         const resss = await get24HrRate(hotel.Hotel_Id);

        //         let filteredResults = resss?.find((item) => item.Hotel_Id === parseInt(hotel.Hotel_Id) && item.room_name === hotel.room_type);

        //         if(rate_3hr === 0 && rate_6hr === 0 && rate_12hr === 0 && rate_24hr.toString() === filteredResults?.room_rate) {

        //         }
        //     })

        //   });
        
        const lowestRatesObjectsArrayy = await Promise.all(promises.filter(promise => promise !== undefined));

        console.log("Lowest Rates Array: ", lowestRatesObjectsArrayy)
        
        setLowestRatesObjectsArray(lowestRatesObjectsArrayy)

        if(hotelIdsArrayy && hotelsData) {

            if (hotelsData && Array.isArray(hotelsData) && hotelIdsArrayy && Array.isArray(hotelIdsArrayy)) {

                const filteredHotels = hotelsData.filter(hotel => {

                    return hotelIdsArrayy.includes(hotel.Hotel_Id.toString());

                });
            
                console.log("Filtered Hotels:", filteredHotels);
                const updateHotel = async(filteredHotels, lowestRatesObjectsArrayy) => {
                    console.log("Filtered Hotels123:", filteredHotels, lowestRatesObjectsArrayy);
                    let payload = {
                        filteredHotels: filteredHotels,
                        lowestRatesObjectsArrayy: lowestRatesObjectsArrayy,
                        operation: "updateHotelRates"
                    }
                    const results = await fetch("/api/hotels/hotel_info", {
                        method: "POST",
                        body: JSON.stringify(payload)
                      }).then((res) => {
                        console.log("REs:::::::>res",res)
                        if(res.status === 200) {
                            if(filteredHotels.length === lowestRatesObjectsArrayy.length) {
                                let a = [];
                                filteredHotels.map((item) => {
                                  lowestRatesObjectsArrayy.map(async (item1) => {
                                    if(item.Hotel_Id === parseInt(item1.Hotel_Id)) {
                                      console.log("Inside updateHotelRates If: ", item.Hotel_Id)
                                      a.push(item.Hotel_Id);
                                        item.final_display_price_for_3H = item1.rate_3hr;
                                        item.final_display_price_for_6H = item1.rate_6hr;
                                        item.final_display_price_for_12H = item1.rate_12hr;
                                        item.final_display_price_for_24H = item1.rate_24hr;
      
                                    }else {
                                      console.log("Inside updateHotelRates Else: ", a, item.Hotel_Id)
                                      if(a.includes(item.Hotel_Id)) {
                                        console.log("Inside updateHotelRates If 1: ", item.Hotel_Id)
                                      }else {
                                        console.log("Inside updateHotelRates Else 1: ", item.Hotel_Id)
                                        
                                          item.final_display_price_for_3H = 0; 
                                          item.final_display_price_for_6H = 0;
                                          item.final_display_price_for_12H = 0;
                                          item.final_display_price_for_24H = 0;
                                        
                                      }
                                    }
                                  })
                                })
                              }
                            
                              async function getRoomDetails () {
                                const response = await fetch(`/api/pms/property_master/room_details`, {
                                    method: "GET",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                });
                                const result = await response.json();
                                let activeResults = result.dataAllActive;
                    
                                console.log("room details::::::>",activeResults)
                                setAllRoomDetails(activeResults)
                                
                                return activeResults
                            }

                            getRoomDetails()

                            setHotelsData(filteredHotels)
                        }
                      });

                }
                updateHotel(filteredHotels, lowestRatesObjectsArrayy)
                
               
            } else {
                console.log("Either hotelsData or hotelIdsArray is not defined or is not an array.");
            }
        }

      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  
}


//   useEffect(() => {
//     console.log("Filtered Hotels hotelIdsArray hotelsData: ", hotelIdsArray, hotelsData)
//     if(hotelIdsArray && hotelsData) {
//         if (hotelsData && Array.isArray(hotelsData) && hotelIdsArray && Array.isArray(hotelIdsArray)) {
//             const filteredHotels = hotelsData.filter(hotel => {
//                 // Check if the hotel's Hotel_Id exists in hotelIdsArray
//                 return hotelIdsArray.includes(hotel.Hotel_Id.toString());
//             });
        
//             console.log("Filtered Hotels:", filteredHotels);
//             setHotelsData(filteredHotels)
//         } else {
//             console.log("Either hotelsData or hotelIdsArray is not defined or is not an array.");
//         }
//     }

//   }, [hotelIdsArray]);


  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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
                                            && hotel.status === "open"
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
    //console.log("Filtered Data:::::::>",filteredHotelsDataRatings);
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
            //console.log("Facility Check:::::::>",facilityChecks);
          }, [facilityChecks]);

 /////////////////////Hour Change/////////////////////// 
          function handleHourChange(hour) {
            //console.log(hour);
            setHourChange(hour)
          }
          useEffect(() => {
           // console.log("Hour Change:::::::>",hourChange);
          }, [hourChange]);

          const handlePriceChange = (priceRange) => {
            //console.log("Pring Range:::::::::>",priceRange);
            setPriceSliderChange(priceRange)
          }



        



    return (
        <>
          <SearchHero />


        <div className="flex w-screen h-[210vh] bg-white">
            <div className="w-[30%]">
            <HourlyBookingSideBar searchCity={searchCity} onSelectCheck = {handleCheckBoxSelect} onRatingsCheck = {handleRatingsCheck} onPriceCheck = {handlePriceCheck} onCategoryCheck = {handleCategoryCheck} onFacilityCheck = {handleFacilityCheck} onHourChange = {handleHourChange} onPriceChange={handlePriceChange}/>
            </div>

            <div className="w-[70%] pb-4">
            <div className="w-full h-full overflow-y-scroll">
            <Breadcrumbs className="pl-6" >
                <BreadcrumbItem color="primary">Home</BreadcrumbItem>
                <BreadcrumbItem color="primary">{searchCity} Hotels</BreadcrumbItem>
            </Breadcrumbs>
                <div className="space-y-3">
                    <h1 className="text-3xl text-black/60 pt-4 pl-6">Showing {filteredHotelsDataRatings && filteredHotelsDataRatings.length} Hourly Hotels in {searchCity}</h1>                         
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
                                            && hotel.status === "open"
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
                                            <a href={`hotels/${hotel.Hotel_name}?hotelName=${hotel.Hotel_name}&hotelId=${hotel.Hotel_Id}&searchedDate=${searchedDate}&searchTime=${searchTime}`}>
                                                <div className="rounded-xl -ml-1 w-fit flex items-center justify-center cursor-pointer">
                                                    {Array.from({ length: Math.floor(hotel.rating) }, (_, index) => (
                                                        // eslint-disable-next-line react/jsx-key
                                                        <Star key={index} className="h-4 w-4" fill="#FCB332" strokeWidth={0} />
                                                    ))}
                                                    {hotel.rating % 1 !== 0 && (
                                                        // eslint-disable-next-line react/jsx-key
                                                        <StarHalf className="h-4 w-4" fill="#FCB332" strokeWidth={0} />
                                                    )}
                                                    <span className="ml-0.5 text-black/50 text-xs font-poppinssemibold">{hotel.rating} ({hotel.user_review_count} Reviews)</span>
                                                </div>
                                                <div className="flex items-center space-x-5 ">
                                                    <h3 className="max-w-[36.25rem] truncate">
                                                        <Link href={`hotels/${hotel.Hotel_name}?hotelName=${hotel.Hotel_name}&hotelId=${hotel.Hotel_Id}}&searchedDate=${searchedDate}&searchTime=${searchTime}`} title="Hotel Shubham Inn"
                                                            className="cursor-pointer text-black/80 text-lg font-poppinsmedium">
                                                            {hotel.Hotel_name}
                                                        </Link>
                                                    </h3>
                                                    {hotel.hotel_category === 'premium' ? <Badge className="bg-indigo-500"><Crown className="h-4 w-4 mr-1" />PREMIUM</Badge> : <Badge className="bg-red-500"><Crown className="h-4 w-4 mr-1" />LUXURY</Badge>}
                                                    <Badge className="bg-sky-500">NEW</Badge>
                                                </div>
                                                <div className="pt-0 flex items-center space-x-2">
                                                    <MapPin className="h-4 w-4 text-gray-500" />
                                                    <p className="text-black/50 text-sm font-poppinsmedium">{hotel.City}</p>
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
                                                {lowestRatesObjectsArray && lowestRatesObjectsArray.map((lowestRate) => {

                                                    console.log("Data 6 : ",lowestRate && lowestRate, lowestRate?.Hotel_Id, hotel?.Hotel_Id, lowestRate?.status)

                                                    if(lowestRate && lowestRate?.hotel_id === hotel?.Hotel_Id && lowestRate?.status === 'soldout') {
                                                        return ""
                                                    }else if(lowestRate && lowestRate?.Hotel_Id === hotel?.Hotel_Id && lowestRate?.status === "bookable") {

                                                        let t = lowestRate.first_checkin_last_checkout_3hr;

                                                        const timeRangeWithoutSpaces = t.replace(/\s/g, '');
                                                                
                                                        let [start, end] = timeRangeWithoutSpaces.split('-');

                                                        let startTime = convertTo24Hour(start);
                                                        let endTime = convertTo24Hour(end);
                                                       
                                                        let isTimeInRange = true;

                                                        if(searchTime >= startTime && searchTime <= endTime) {
                                                            isTimeInRange = true;
                                                        }else{
                                                            isTimeInRange = false;
                                                        }

                                                        //console.log("Start and End Time conversion: ", startTime, endTime, isTimeInRange);

                                                        return (
                                                            <Button 
                                                                key={index}
                                                                color="primary" 
                                                                variant="shadow" 
                                                                className="flex flex-col py-6 px-8"
                                                                onClick={() => window.location.href = `hotels/${hotel.Hotel_name}?hotelName=${hotel.Hotel_name}&hour=3&hotelId=${hotel.Hotel_Id}&searchedDate=${searchedDate}&searchTime=${searchTime}&adultsSelect=${adultsSelect}&childSelect=${childSelect}&infantsSelect=${infantsSelect}&roomsSelect=${roomsSelect}&petsSelect=${petsSelect}`}
                                                                style={isTimeInRange ? {} : { pointerEvents: 'none', opacity: 0.5 }}
                                                            >
                                                                <p className="text-lg -mb-1">₹ {lowestRate.rate_3hr}</p>
                                                                <p className="text-xs -mt-1">3 Hrs</p>
                                                            </Button>
                                                        )
                                                    }
                                                })}


{lowestRatesObjectsArray && lowestRatesObjectsArray.map((lowestRate) => {

console.log("Data 6 : ",lowestRate && lowestRate, lowestRate?.Hotel_Id, hotel?.Hotel_Id, lowestRate?.status)

if(lowestRate && lowestRate?.hotel_id === hotel?.Hotel_Id && lowestRate?.status === 'soldout') {
    return ""
}else if(lowestRate && lowestRate?.Hotel_Id === hotel?.Hotel_Id && lowestRate?.status === "bookable") {

    let t = lowestRate.first_checkin_last_checkout_6hr;

    const timeRangeWithoutSpaces = t.replace(/\s/g, '');
            
    let [start, end] = timeRangeWithoutSpaces.split('-');

    let startTime = convertTo24Hour(start);
    let endTime = convertTo24Hour(end);
   
    let isTimeInRange = true;

    if(searchTime >= startTime && searchTime <= endTime) {
        isTimeInRange = true;
    }else{
        isTimeInRange = false;
    }

    //console.log("Start and End Time conversion: ", startTime, endTime, isTimeInRange);

    return (
        <Button 
            key= "2"
            color="primary" 
            variant="shadow" 
            className="flex flex-col py-6 px-8" 
            onClick={(e) => window.location.href = `hotels/${hotel.Hotel_name}?hotelName=${hotel.Hotel_name}&hour=6&hotelId=${hotel.Hotel_Id}&searchedDate=${searchedDate}&searchTime=${searchTime}&adultsSelect=${adultsSelect}&childSelect=${childSelect}&infantsSelect=${infantsSelect}&roomsSelect=${roomsSelect}&petsSelect=${petsSelect}`}
            style={isTimeInRange ? {} : { pointerEvents: 'none', opacity: 0.5 }}
        >
            <p className="text-lg -mb-1">₹ {lowestRate.rate_6hr}</p>
            <p className="text-xs -mt-1">6 Hrs</p>
        </Button>
    )
}
})}


{lowestRatesObjectsArray && lowestRatesObjectsArray.map((lowestRate) => {

console.log("Data 6 : ",lowestRate && lowestRate, lowestRate?.Hotel_Id, hotel?.Hotel_Id, lowestRate?.status)

if(lowestRate && lowestRate?.hotel_id === hotel?.Hotel_Id && lowestRate?.status === 'soldout') {
    return ""
}else if(lowestRate && lowestRate?.Hotel_Id === hotel?.Hotel_Id && lowestRate?.status === "bookable") {

    let t = lowestRate.first_checkin_last_checkout_12hr;

    const timeRangeWithoutSpaces = t.replace(/\s/g, '');
            
    let [start, end] = timeRangeWithoutSpaces.split('-');

    let startTime = convertTo24Hour(start);
    let endTime = convertTo24Hour(end);
   
    let isTimeInRange = true;

    if(searchTime >= startTime && searchTime <= endTime) {
        isTimeInRange = true;
    }else{
        isTimeInRange = false;
    }

    //console.log("Start and End Time conversion: ", startTime, endTime, isTimeInRange);

    return (
        <Button 
            key= "3"
            color="primary" 
            variant="shadow" 
            className="flex flex-col py-6 px-8" 
            onClick={(e) => window.location.href = `hotels/${hotel.Hotel_name}?hotelName=${hotel.Hotel_name}&hour=12&hotelId=${hotel.Hotel_Id}&searchedDate=${searchedDate}&searchTime=${searchTime}&adultsSelect=${adultsSelect}&childSelect=${childSelect}&infantsSelect=${infantsSelect}&roomsSelect=${roomsSelect}&petsSelect=${petsSelect}`}
            style={isTimeInRange ? {} : { pointerEvents: 'none', opacity: 0.5 }}
        >
            <p className="text-lg -mb-1">₹ {lowestRate.rate_12hr}</p>
            <p className="text-xs -mt-1">12 Hrs</p>
        </Button>
    )
}
})}


{lowestRatesObjectsArray && lowestRatesObjectsArray.map((lowestRate) => {

console.log("Data 6 : ",lowestRate && lowestRate, lowestRate?.Hotel_Id, hotel?.Hotel_Id, lowestRate?.status)

if(lowestRate && lowestRate?.hotel_id === hotel?.Hotel_Id && lowestRate?.status === 'soldout') {
    return "Sold Out"
}else if(lowestRate && lowestRate?.Hotel_Id === hotel?.Hotel_Id && lowestRate?.status === "bookable") {

    return (
        <Button 
            key= "4"
            color="primary" 
            variant="shadow" 
            className="flex flex-col py-6 px-8" 
            onClick={(e) => window.location.href = `hotels/${hotel.Hotel_name}?hotelName=${hotel.Hotel_name}&hour=24&hotelId=${hotel.Hotel_Id}&searchedDate=${searchedDate}&searchTime=${searchTime}&adultsSelect=${adultsSelect}&childSelect=${childSelect}&infantsSelect=${infantsSelect}&roomsSelect=${roomsSelect}&petsSelect=${petsSelect}`}
            
        >
            <p className="text-lg -mb-1">₹ {lowestRate.rate_24hr}</p>
            <p className="text-xs -mt-1">24 Hrs</p>
        </Button>
    )
}
})}
                                                
                                           

                                               


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