'use client'
import React, { useState, useEffect } from "react";
import { Breadcrumbs, BreadcrumbItem, Button, Skeleton, Card, CardFooter, Progress, Divider, CardBody, Mountain, RadioGroup, Radio, cn, Popover, PopoverTrigger, PopoverContent, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Crown, Dot, Star, MapPin, Heart, Share2, Hotel, CreditCard, Search, Wifi, AirVent, Tv, Milk, ParkingSquare, MessageCircleHeart, Wallet, BatteryCharging, Refrigerator, WashingMachine, Cctv, Check, BedDouble, BedSingle, Bath, TvMinimal, VolumeX, SquareM  } from 'lucide-react';
import { Badge } from "@/_components/ui/Badge";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/_components/ui/Carousel"
import RoomsAndGuests from "@/_components/ui/RoomsAndGuests";
import HotelName, { IMAGES } from '@/public/index'
import { useSearchParams } from 'next/navigation'
import LoginFunc from "@/app/(auth)/login/LoginFunc";
import amenities_icons from "./hotelAmenitiesIcons";
import Swal from 'sweetalert2'
import { SessionProvider, useSession, getSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import DateTimeCombo from '@/_components/ui/DateTimeCombo'
import ImageModal from "@/app/(booking)/bookings/hourlybooking/hotels/[hotelname]/ImageModal";
import RoomModal from "@/app/(booking)/bookings/hourlybooking/hotels/[hotelname]/RoomModal";
import Daterangepickerreact from '@/_components/ui/DateRangePickerReact'
import { CiLocationArrow1, CiCalendar, CiTimer } from "react-icons/ci";
import { PiUsersLight } from "react-icons/pi";
import "./styleee.css"


const CustomRadio = (props) => {
    const { children, ...otherProps } = props;

    return (
        <Radio
            {...otherProps}
            classNames={{
                base: cn(
                    "m-0",
                    "flex-row max-w-full cursor-pointer rounded-lg gap-2 p-2 border-1 border-transparent",
                    "data-[selected=true]:bg-white data-[selected=true]:shadow-xl"
                ),
            }}
        >
            {children}
        </Radio>
    );
};


function HotelPagee() {

    const searchParams = useSearchParams();

    const hotelName = searchParams.get('hotelName')
    const hotelId = searchParams.get('hotelId')
    const searchedDate = searchParams.get('searchedDate')
    let hours = searchParams.get('hour')
    const searchTime = searchParams.get('searchTime')
    const adultsSelectParam = searchParams.get('adultsSelect');
    const childSelectParam = searchParams.get('childSelect');
    const infantsSelectParam = searchParams.get('infantsSelect');
    const roomsSelectParam = searchParams.get('roomsSelect');
    const petsSelectParam = searchParams.get('petsSelect');

    const [isLoaded, setIsLoaded] = useState(false);
    const [hotelsAllData, setHotelsAllData] = useState([]);
    const [hotelsData, setHotelsData] = useState({});
    const [hotelImgs, setHotelImgs] = useState({});
    const [hotelsAllDataForCorouselCards, setHotelsAllDataForCorouselCards] = useState([]);
    const [hotelsDataForCorouselCards, setHotelsDataForCorouselCards] = useState([]);
    const [hotelsDataFacility, setHotelsDataFacility] = useState({});
    const [copied, setCopied] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [toggleIcon, setToggleIcon] = useState(false);
    const [isToggled, setIsToggled] = useState(false);
    const [adultsSelect, setAdultsSelect] = useState('');
    const [childSelect, setChildSelect] = useState('');
    const [infantsSelect, setInfantsSelect] = useState('');
    const [roomsSelect, setRoomsSelect] = useState('');
    const [petsSelect, setPetsSelect] = useState('');
    const [loginFlagBookingsPage, setLoginFlagBookingsPage] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState("");
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [dateChangeFlag, setDateChangeFlag] = useState(false);
    const [timeChangeFlag, setTimeChangeFlag] = useState(false);
    const [selectedNumberOfHours, setSelectedNumberOfHours] = useState(hours.toString());
    const [lastID, setLastID] = useState(0);
    const [ resultAll, setResultAll ] = useState([]);
    const [initialDate, setInitialDate] = useState(6);
    let handleBookings;

    const [showImageModal, setShowImageModal] = useState(false);
    const [showRoomModal, setShowRoomModal] = useState(false);
    const [roomResult, setRoomResult] = useState();

    const [clickedRoomName, setClickedRoomName] = useState();
    const [clickedRoomId, setClickedRoomId] = useState();
    const [selectedDateRange, setSelectedDateRange] = useState();

    const [clickedRoom, setClickedRoom] = useState();
    const [roomAmenetities, setRoomAmenetities] = useState([]);

    const [selectedNumberOfRooms, setSelectedNumberOfRooms] = useState('0');
    const [newRate, setNewRate] = useState(0);
    const [hotelFandS, setHotelFandS] = useState([]);

    const [hotelTopFacilities, setHotelTopFacilities] = useState([]);

    const [facilitiesCategory, setFacilitiesCategory] = useState([]);

    const [lowestRatesObjectsArray, setLowestRatesObjectsArray] = useState();
    const [hotelRoomRates, setHotelRoomRates] = useState();

    const [currentSelectedTd0, setCurrentSelectedTd0] = useState();
    const [previousRates, setPreviousRates] = useState(0);
    const [totalRooms, setTotalRooms] = useState(0);
    
    // const [roomDetails, setRoomDetails] = useState();
    


    let num = ['0','1','2','3','4','5'];
    let numHours = ['3','6','12','24'];

    const [ratesArr, setRatesArr] = useState([]);


    
    const getRoomAmenities = async () => {

        const response = await fetch(`/api/property/property_amenities?hotelId=${hotelId.toString()}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();

        //console.log("Result:::::",result)
        setRoomAmenetities(result.pms_propertymaster_roomamenities)
    }
    useEffect(() => {

        getRoomAmenities()

    }, [])

    useEffect(() => {

        if(selectedNumberOfHours) {
            console.log("selectedNumberOfHours: ",selectedNumberOfHours)
            // setRatesArr([])
            // setCurrentSelectedTd0(0)
            // setSelectedNumberOfRooms('0')
        }
    
    }, [selectedNumberOfHours])

    const handleDateSelect = (val) => {
        setSelectedDateRange(val)
    }


    const handleDateChange = (date) => {
        setDateChangeFlag(true)
        let formatted_date = `${new Date(date).getDate().toString().padStart(2, '0')}-${(new Date(date).getMonth() + 1).toString().padStart(2, '0')}-${new Date(date).getFullYear().toString()}`;
        setSelectedDate(formatted_date.toString());
        setShowTimePicker(true);
    };

    const toggleTimePicker = () => {
        setShowTimePicker(prevState => !prevState); // Toggle time picker visibility
    };

    const handleSelectedTime = (time) => {
        setTimeChangeFlag(true)
        setSelectedTime(time);
    };

    const [fav, setFav] = useState([]);
    
    
    const [selectedRadioValue, setSelectedRadioValue] = useState(hours ? hours + "-hrs" : "3-hrs");

    const router = useRouter();
    // const [resp, setResp] = useState();
    // const [sessionValue, setSessionValue] = useState({});

    const { data: sessionValue, update, status } = useSession()
    // useEffect(() => {

    //   const getSessionInfo = async () => {
    //     const session = await getSession();
    //     setSessionValue(session);
    //   };
    //   getSessionInfo();
    // }, [])




    useEffect(() => {

        
        //console.log("Selected Date useeffect: ",selectedDate)

    }, [selectedDate])

    useEffect(() => {

        //console.log("Session At Bookings Page: ", sessionValue);
        setFav(sessionValue?.user?.favourites);

    }, [sessionValue])



    let results = [];

    // if(!hours) {
    //     q = 3;
    // }

    async function search_hotels_by_id(hotelId) {

        //console.log("Inside search_hotels_by_id");

        results = await fetch("/api/hotels/hotel_info/hotel_by_id", {
            method: "POST",
            body: JSON.stringify({ hotelId })
        });


        let stream = results.body;


        const reader = stream.getReader();
        let chunks = '';
        try {
            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    //console.log("Stream is done.");
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

        //console.log("Result Data::::::::>", hotelsData?.policy);
        setHotelsData(hotelsAllData.data)
        setHotelsDataFacility(hotelsAllData.facilities)

    }, [hotelsAllData]);

    useEffect(() => {

        //console.log("Facility::::::::>", hotelsDataFacility);

    }, [hotelsDataFacility]);

    const handleHotelFandS = async () => {

        let category = [];

        const response = await fetch(`/api/pms/property_master/room_fands?hotelId=${hotelId.toString()}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();

        let hotelfand = result.data_by_id;

        hotelfand.map((item) => {
            if(item.fands_category === "Top facilities") {

            }else {
                category.push(item.fands_category)
            }
        })

        setFacilitiesCategory([...new Set(category)]);

        setHotelFandS(result.data_by_id)

        let a = [];

        let promise = hotelfand.map((item) => {
            if(item.fands_category === "Top facilities" && item.availability === true) {
                a.push(item.fands_item)
            }
        })

        await Promise.all(promise)

        setHotelTopFacilities(a)

        

    }



    const cardFunction = async (searchCity, searchedDate, searchTime, hotelsData, hotelId) => {
        //console.log("Info....,",searchCity, searchedDate, searchTime, hotelsData)

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
    
            let databydate = resulttt?.databydate;

    
              const groupedByHotelId = databydate.reduce((acc, obj) => {
                const { Hotel_Id, ...rest } = obj;
                if (!acc[Hotel_Id]) {
                  acc[Hotel_Id] = [];
                }
                acc[Hotel_Id].push({...rest, Hotel_Id}); // Include Hotel_Id in the object
                return acc;
              }, {});
    
            //console.log("Data 1 groupedByHotelId: ", groupedByHotelId);
    
    
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
                // setRoomDetails(activeResults)
                
                return activeResults
            }
    
    
            const promises = Object.keys(groupedByHotelId).map(async hotelId => {
    
                hotelIdsArrayy.push(hotelId);
                
                const hotelObjects = groupedByHotelId[hotelId];
    
                let filteredHotelObjects = await Promise.all(hotelObjects.map(async obj => {
    
                    const resss = await get24HrRate(obj.Hotel_Id);
    
                    let filteredResults = resss?.find((item) => item.Hotel_Id === parseInt(obj.Hotel_Id) && item.room_name === obj.room_type);
    
                    //console.log("Data 3 :", obj.Hotel_Id, obj.rate_3hr, obj.rate_3hr, obj.rate_3hr, obj.rate_3hr, filteredResults?.room_rate, obj.status)
    
                    if (obj.rate_3hr === 0 && obj.rate_6hr === 0 && obj.rate_12hr === 0 && (obj.rate_24hr.toString() === filteredResults?.room_rate || obj.rate_24hr === 0) || obj.status === "soldout") {
                        return {
                            "hotel_id" : obj.Hotel_Id,
                            "status" : "soldout",
                        };
                    }else{
                        return obj;
                    }
                }));
    
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
            
                  //console.log("Object with lowest rates:", lowestRatesObject);
                  return lowestRatesObject;
                }
              });
                

            
            const lowestRatesObjectsArrayy = await Promise.all(promises.filter(promise => promise !== undefined));
    
            //console.log("Lowest Rates Array: ", lowestRatesObjectsArrayy.find((item) => item.Hotel_Id === parseInt(hotelId)), hotelId)
            
            setLowestRatesObjectsArray(lowestRatesObjectsArrayy.find((item) => item.Hotel_Id === parseInt(hotelId)))
  
           
    
            // if(hotelIdsArrayy && hotelsData) {
    
            //     if (hotelsData && Array.isArray(hotelsData) && hotelIdsArrayy && Array.isArray(hotelIdsArrayy)) {
    
            //         const filteredHotels = hotelsData.filter(hotel => {
    
            //             return hotelIdsArrayy.includes(hotel.Hotel_Id.toString());
    
            //         });
                
            //         console.log("Filtered Hotels:", filteredHotels);
            //         setHotelsData(filteredHotels)
            //     } else {
            //         console.log("Either hotelsData or hotelIdsArray is not defined or is not an array.");
            //     }
            // }
    
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
          });
    }

    useEffect(() => {

        if (hotelsData) {
           // console.log("Data::::::::>", hotelsData.rating);

            const initialFxn = async () => {
                try {
                    const response = await fetch(`/api/pms/property_master/room_details?hotelId=${(hotelsData.Hotel_Id).toString()}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    const result = await response.json();
          
                    //console.log("Property Rooms: ",result.dataActive)
                    
                    //setRoomResult(result.dataActive)
          
                    if (result && result.dataActive.length > 0) {
                      const newElement = {
                        id: "PM00001",
                        room_name: "Property Main"
                      };
                      result.dataActive.unshift(newElement);

                      setRoomResult(result.dataActive)
                    }
          
                } catch (error) {
                    console.error("Error fetching data:", error);
                } finally {
                  //setIsLoading(false); 
                }
            }

            handleHotelFandS()
          
            initialFxn()

            cardFunction(hotelsData?.Location, searchedDate, searchTime, hotelsData, hotelId)

        } else {
            //console.log("Data is not available yet");
        }
    }, [hotelsData]);

    useEffect(() => {

        search_hotels_by_id(hotelId)

    }, [hotelId]);


    useEffect(() => {
        //console.log("fav:", fav);
        //console.log("hotelsData?.Hotel_Id:", hotelsData?.Hotel_Id);
        if (fav?.length > 0 && fav.includes(hotelsData?.Hotel_Id)) {
            setIsToggled(true);
        } else {
            setIsToggled(false);
        }

        //console.log("isToggled:", isToggled);
    }, [fav, hotelsData?.Hotel_Id]);





    ///////////////For Corousel Cards///////////////////////////////////////////////////
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
                    //console.log("Stream is done.");
                    break;
                }
                chunks += new TextDecoder().decode(value);
            }
            setHotelsAllDataForCorouselCards(JSON.parse(chunks));

        } catch (error) {
            console.error("Error reading stream:", error);
        } finally {
            reader.releaseLock();
        }

    }

    useEffect(() => {
        search_hotels(hotelsData?.Location)
    }, [hotelsData?.Location]);

    useEffect(() => {
        setHotelsDataForCorouselCards(hotelsAllDataForCorouselCards.data);
    }, [hotelsAllDataForCorouselCards]);

    useEffect(() => {
        //console.log("Hotels dAta for Corousel: ", hotelsDataForCorouselCards);
    }, [hotelsDataForCorouselCards]);


    ///////////////////////////////////////////////////////////////////////////////////

    const handleHotelsImgs = (Imgs) => {
        setHotelImgs(Imgs);
    }

    useEffect(() => {

        //console.log("roomAmenetities: ", roomAmenetities);

    }, [roomAmenetities]);

    
    useEffect(() => {

        //console.log("lopwestArray: ", lowestRatesObjectsArray)
    }, [lowestRatesObjectsArray])

    useEffect(() => {
        //console.log("ResultAll:::::>",resultAll)
        async function dat() {
            const response = await fetch("/api/userApi/bookings", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
            //console.log("REsulttttttttttttt::::::::>",result.data_All)
            let result_All = result.data_All;
             if (result_All && result_All.length > 0) {
            const lastElement = result_All[result_All.length - 1]; // Get the last element
            //console.log("REsulttttttttttttt::::::::>",lastElement)
            const lastElementId = lastElement.booking_id; // Extract the id property from the last element
            //console.log("REsulttttttttttttt::::::::>",lastElementId)
            const numericPart = lastElementId ? lastElementId.match(/(?<=BK)0*(\d+)/) : null; // Extract numeric part using regular expression
            const lastNumericId = numericPart ? parseInt(numericPart[1]) : null;
            //console.log("Numeric ID of the last element:", lastNumericId);
            setLastID(lastNumericId);
        } else {
            //console.log("No elements in the array.");
            setLastID(0);
        }
        }

        dat()

       

    }, [resultAll,handleBookings]);

    const rateManagement = async (searchedDate, hotelId) => {
        
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

          const results = await fetch(`/api/pms/rates_and_inventory/managerateandinventory?searchedDate=${formattedDate}&hotelId=${hotelId.toString()}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
          }).then(response => {
            
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
           
            return response.json();
          }).then(async (result) => {
            //console.log("Result::::::>456",result.databyHoteliddd)
            setHotelRoomRates(result.databyHoteliddd)
          })
          
    }


    useEffect(() => {

        if(selectedNumberOfHours) {
            rateManagement(searchedDate, hotelId)
            setSelectedRadioValue(selectedNumberOfHours + "-hrs")
        }

    }, [selectedNumberOfHours])


    if (!amenities_icons) {
        return null;
    }

    if (!hotelsDataFacility) {
        return null;
    }


    const copyToClipboard = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 5000);
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    iconColor: "blue",
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "Link copied to clipcoard"
                });
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    };



    /////////////////////////////Handle Favourites Section////////////////////////////////

    let added_favourite = sessionValue?.user?.favourites;
    //console.log("Favourites:::::::>", added_favourite);


    const handleFavouriteOnHover = () => {
        //console.log("Hovered");
    };

    const handleAddToFavourite = async () => {

        setIsToggled(prevToggle => !prevToggle);
        //console.log("Toggling: ", isToggled);

        let hotel_ID = hotelsData?.Hotel_Id;
        let user_id = sessionValue?.user?.user_id;

        let action = isToggled ? "delete" : "add";

        //console.log("Favourite Clicked", user_id, hotel_ID);

        let response = await fetch("/api/userApi/insertFavourite", {
            method: "POST",
            body: JSON.stringify({ user_id, hotel_ID, action })
        });

        let stream = response.body;
        let resp;

        const reader = stream.getReader();
        let chunks = '';
        try {
            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    //console.log("Stream is done.");
                    break;
                }
                chunks += new TextDecoder().decode(value);
            }
            resp = JSON.parse(chunks);

        } catch (error) {
            console.error("Error reading stream:", error);
        } finally {
            reader.releaseLock();
        }

       // console.log("Resp::::>", resp);

        if (response.ok) {

            update({ favourites: resp.result.favourites });

            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                iconColor: "red",
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });

            Toast.fire({
                icon: "success",
                title: action === "add" ? "Hotel added to favorite" : "Hotel removed from favorite"
            });
        }


    };


    const handleAdultsSelect = (adults) => {
        setAdultsSelect(adults)
    }

    const handleChildSelect = (child) => {
        setChildSelect(child)
    }

    const handleRoomsSelect = (rooms) => {
        setRoomsSelect(rooms)
    }

    const handleInfantsSelect = (infants) => {
        setInfantsSelect(infants)
    }

    const handlePetsSelect = (pets) => {
        setPetsSelect(pets)
    }
    //console.log("Result Data::::::::>", { "date": selectedDate, "time": selectedTime, "radio value": parseInt(selectedRadioValue.split('-')[0]), "adults": adultsSelect, "child": childSelect, "infants": infantsSelect, "rooms": roomsSelect, "pets": petsSelect });

    function getCurrentDateTime() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const hours = String(today.getHours()).padStart(2, '0');
        const minutes = String(today.getMinutes()).padStart(2, '0');
        const seconds = String(today.getSeconds()).padStart(2, '0');
        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    }

    const generateUniqueID = () => {
       // console.log("Last IF:",lastID)
      const newID = `BK${String(lastID + 1).padStart(5, '0')}`;
      setLastID(lastID + 1);
      return newID;
    };

    
    handleBookings = async (hotelsData, selectedDate,
        selectedTime,selectedRadioValue,
        adultsSelect,
        childSelect,
        infantsSelect,
        roomsSelect,
        petsSelect) => {

        if(!dateChangeFlag) {
           // console.log("selectedDate Inside if")
            let formatted_date = `${new Date(selectedDate).getDate().toString().padStart(2, '0')}-${(new Date(selectedDate).getMonth() + 1).toString().padStart(2, '0')}-${new Date(selectedDate).getFullYear().toString()}`;
            selectedDate = formatted_date.toString(); 
        }else{
            //console.log("selectedDate Inside else")
            selectedDate = selectedDate.toString();
        }

        if(!timeChangeFlag) {
            selectedTime = new Date();
            let formatted_time =  selectedTime.getHours().toString().padStart(2, '0');
            selectedTime = formatted_time.toString();
        }else{
            let formatted_time =  selectedTime.getHours().toString().padStart(2, '0');
            selectedTime = formatted_time.toString();
        }
    
        let hr = parseInt(selectedRadioValue.split('-')[0])
    
        // let checkin_date = new Date(selectedDate?.split("-").reverse().join("-")).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }).replace(/(\d+)([a-z]+) (\d+)/i, "$2 $1");
        // let checkout_date = new Date(new Date(`${selectedDate?.split('-').reverse().join('-')}T${selectedTime}:00:00`).getTime() + (hr * 60 * 60 * 1000)).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }).replace(/(\d+)([a-z]+) (\d+)/i, "$2 $1");
        let checkin_date = new Date(selectedDate?.split("-").reverse().join("-")).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/(\d+)([a-z]+) (\d+)/i, "$2 $1");
        let checkout_date = new Date(new Date(`${selectedDate?.split('-').reverse().join('-')}T${selectedTime}:00:00`).getTime() + (hr * 60 * 60 * 1000)).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/(\d+)([a-z]+) (\d+)/i, "$2 $1");
        let checkin_time = new Date(`${selectedDate?.split('-').reverse().join('-')}T${selectedTime}:00:00`).toLocaleString('en-US', { hour: 'numeric', hour12: true });
        let checkout_time = new Date(new Date(`${selectedDate?.split('-').reverse().join('-')}T${selectedTime}:00:00`).getTime() + (hr * 60 * 60 * 1000)).toLocaleString('en-US', { hour: 'numeric', hour12: true });
    
        let timeParts = checkin_time.split(" ")[0].split(":").map(Number);
        let timeParts1 = checkout_time.split(" ")[0].split(":").map(Number);
        let hours = timeParts[0];
        let hours1 = timeParts1[0];
        let minutes = timeParts.length > 1 ? timeParts[1] : 0;
        let minutes1 = timeParts1.length > 1 ? timeParts1[1] : 0; 
        let meridian = checkin_time.split(" ")[1];
        let meridian1 = checkout_time.split(" ")[1];
        
        if (meridian === "PM" && hours !== 12) {
            hours += 12;
        } else if (meridian === "AM" && hours === 12) {
            hours = 0;
        }
    
        if (meridian1 === "PM" && hours1 !== 12) {
            hours1 += 12;
        } else if (meridian1 === "AM" && hours1 === 12) {
            hours1 = 0;
        }
    
        function convertTo12HourFormat(hours, minutes) {
            let meridian = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12;
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${meridian}`;
        }
        
        let tm1_12Hour = convertTo12HourFormat(hours, minutes);
        let tm2_12Hour = convertTo12HourFormat(hours1, minutes1);
    
        let payload = {
            user_id: sessionValue?.user?.user_id,
            booking_id: generateUniqueID(),
            username: sessionValue?.user?.firstname + " "+ sessionValue?.user?.lastname,
            Hotel_Id: hotelsData?.Hotel_Id,
            Hotel_name: hotelsData?.Hotel_name,
            booking_date: selectedDate,
            booking_time: tm1_12Hour + " " + tm2_12Hour,
            price: hotelsData?.final_display_price_for_3H,
            hour3_display_flag : hr === 3 ? 1 : 0,
            hour6_display_flag : hr === 6 ? 1 : 0,
            hour12_display_flag : hr === 12 ? 1 : 0,
            hour24_display_flag : hr === 24 ? 1 : 0,
            status: "inprocess",
            adults_count: adultsSelect,
            checkin_date: checkin_date,
            checkout_date: checkout_date,
            checkin_time: checkin_time,
            checkout_time: checkout_time,
            rooms_count: roomsSelect,
            infants_count: infantsSelect,
            childrens_count: childSelect,
            pets_count: petsSelect,
            pflag0 :1,
            pflag1: 0,
            pflag2: 0,
            pflag3: 0,
            refund_flag: 0,
            created_date: getCurrentDateTime(),
            last_update_on: getCurrentDateTime(),
        }
    
        const response = await fetch('/api/userApi/bookings', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        const result = await response.json();
        setResultAll(result.dataAll)
    
    }

    const handleShowImageModal = () => {
        //console.log("show image modal")
        setShowImageModal(true)
    }

    const handleShowImageModalClose = (val) => {
        if(val === true) {
            setShowImageModal(false)
        }
    }

    const handleRoomLinkClick = (e, roomname, roomid, room) => {
        //console.log("Clickedasdfasd", roomname, roomid)
        setClickedRoomName(roomname)
        setClickedRoomId(roomid)
        setClickedRoom(room)
        setShowRoomModal(true)
    }

    const handleShowRoomModalClose = (val) => {
        if(val === true) {
            setShowRoomModal(false)
        }
    }

    const columnFour = () => {
        return (<>
            <ul>
                <li>
                    <div className="inline-flex text-[13px]">
                        <span>
                            <svg class="bk-icon -streamline-food_coffee" fill="#008009" height="16" width="16" viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false"><path d="M3.75 4.5h12a.75.75 0 0 1 .75.75v7.5a6.75 6.75 0 0 1-13.5 0v-7.5a.75.75 0 0 1 .75-.75zm0-1.5A2.25 2.25 0 0 0 1.5 5.25v7.5a8.25 8.25 0 0 0 16.5 0v-7.5A2.25 2.25 0 0 0 15.75 3h-12zm-3 18h22.5a.75.75 0 0 0 0-1.5H.75a.75.75 0 0 0 0 1.5zm16.5-15h1.5a3.763 3.763 0 0 1 3.75 3.752 3.762 3.762 0 0 1-3.752 3.748H17.1a.75.75 0 0 0 0 1.5h1.65A5.263 5.263 0 0 0 24 9.752 5.264 5.264 0 0 0 18.752 4.5H17.25a.75.75 0 0 0 0 1.5z"></path></svg>
                        </span>
                        <div>
                            &nbsp;Continental breakfast included
                        </div>
                    </div>
                </li>
                <li>
                    <div className="inline-flex">
                        <div style={{ lineHeight: "" }}>
                            <span style={{ position: 'relative', verticalAlign: 'middle' }}>
                                <svg class="bk-icon -streamline-checkmark_fill" fill="#008009" height="16" width="16" viewBox="0 0 128 128" role="presentation" aria-hidden="true" focusable="false"><path d="M56.33 102a6 6 0 0 1-4.24-1.75L19.27 67.54A6.014 6.014 0 1 1 27.74 59l27.94 27.88 44-58.49a6 6 0 1 1 9.58 7.22l-48.17 64a5.998 5.998 0 0 1-4.34 2.39z"></path></svg>
                            </span>
                        </div>
                        <div>
                            <div>
                                <div>
                                    <span className="text-[13px]">  
                                        <strong  style={{ fontSize: 'inherit', fontWeight: '' }}>Free cancellation</strong> before 6:00 PM on June 14, 2024  
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div style={{display: "inline-flex"}}>
                        <div style={{ lineHeight: "" }}>
                            <span style={{ position: 'relative', verticalAlign: 'middle' }}>
                                <svg class="bk-icon -streamline-checkmark_fill" fill="#008009" height="16" width="16" viewBox="0 0 128 128" role="presentation" aria-hidden="true" focusable="false"><path d="M56.33 102a6 6 0 0 1-4.24-1.75L19.27 67.54A6.014 6.014 0 1 1 27.74 59l27.94 27.88 44-58.49a6 6 0 1 1 9.58 7.22l-48.17 64a5.998 5.998 0 0 1-4.34 2.39z"></path></svg>
                            </span>
                        </div>
                        <div>
                            <div >
                                <div>
                                    <span className="text-[13px]">  
                                        <strong style={{ fontSize: 'inherit', fontWeight: '' }}>No prepayment needed</strong> – pay at the property  
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="inline-flex text-[13px]">
                        <span>
                            <svg class="bk-icon -streamline-label" fill="#004CB8" height="16" width="16" viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false"><path d="M.311 2.56v6.257a3.75 3.75 0 0 0 1.098 2.651l11.56 11.562a2.25 2.25 0 0 0 3.182 0l6.88-6.88a2.25 2.25 0 0 0 0-3.181L11.468 1.408A3.75 3.75 0 0 0 8.818.31H2.56a2.25 2.25 0 0 0-2.25 2.25zm1.5 0a.75.75 0 0 1 .75-.75h6.257a2.25 2.25 0 0 1 1.59.659l11.562 11.56a.75.75 0 0 1 0 1.06l-6.88 6.88a.75.75 0 0 1-1.06 0L2.47 10.409a2.25 2.25 0 0 1-.659-1.59V2.56zm5.25 3.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm1.5 0a2.25 2.25 0 1 0-4.5 0 2.25 2.25 0 0 0 4.5 0z"></path></svg>
                        </span>
                        <div >
                            <div className="inline-flex text-[13px]">
                            &nbsp;<svg class="bk-icon -genius-new_identity-genius_logo  genius-badge--baseline" style={{ margin: "5px 0 0 0"}} height="10" width="39" viewBox="0 0 503 128" role="presentation" aria-hidden="true" focusable="false">
                                    <g clip-path="url(#clip0-2497)">
                                    <path d="M481.34 101.48C481.338 102.722 480.993 103.939 480.344 104.998C479.695 106.056 478.766 106.915 477.66 107.48C474.694 109.084 471.348 109.851 467.98 109.7C463.613 109.83 459.308 108.638 455.63 106.28C452.366 104.194 449.844 101.132 448.42 97.5299C447.75 95.8199 446.54 95.3599 444.82 96.1599L431.82 101.99C430 102.8 429.48 103.99 430.28 105.76C433.059 112.341 437.829 117.887 443.92 121.62C450.38 125.787 458.58 127.873 468.52 127.88C478.12 127.88 486.237 125.423 492.87 120.51C499.503 115.597 502.817 108.93 502.81 100.51C502.81 86.5565 492.98 77.9265 473.32 74.6199C468.617 73.9564 464.051 72.5382 459.8 70.4199C456.66 68.8699 453.08 66.8999 453.08 64.4999C453.08 62.4399 454.32 60.7999 456.77 59.6099C459.882 58.283 463.25 57.6681 466.63 57.8099C473.257 57.8099 479.03 60.3832 483.95 65.5299C485.31 66.8999 486.7 67.0699 488.06 66.0399L497.33 57.4699C498.92 56.2099 499.1 54.8299 497.84 53.3599C490.613 44.5199 480.027 40.1032 466.08 40.1099C456.14 40.1099 448.2 42.3665 442.26 46.8799C439.399 48.9679 437.092 51.7225 435.537 54.9046C433.983 58.0867 433.229 61.6001 433.34 65.1399C433.285 68.1652 433.893 71.1659 435.124 73.9303C436.354 76.6948 438.175 79.1558 440.46 81.1399C445.2 85.4265 451.627 88.3165 459.74 89.8099C467.74 91.2799 473.34 92.8799 476.55 94.5999C479.76 96.3199 481.34 98.6199 481.34 101.48Z" fill="#004CB8"></path>
                                    <path d="M346.84 94.6999C346.84 104.967 349.64 113.05 355.24 118.95C360.84 124.85 368.44 127.793 378.04 127.78C381.428 127.81 384.8 127.321 388.04 126.33C390.515 125.609 392.872 124.535 395.04 123.14C397.115 121.673 399.093 120.073 400.96 118.35L403.02 123.35C403.333 124.119 403.885 124.767 404.595 125.199C405.304 125.631 406.133 125.824 406.96 125.75H421.02C421.393 125.803 421.772 125.769 422.13 125.65C422.487 125.531 422.812 125.331 423.078 125.066C423.345 124.8 423.546 124.476 423.666 124.119C423.786 123.762 423.822 123.383 423.77 123.01V44.9999C423.823 44.6263 423.789 44.2454 423.67 43.8874C423.551 43.5293 423.35 43.204 423.083 42.9371C422.816 42.6702 422.491 42.4692 422.133 42.3499C421.774 42.2306 421.394 42.1964 421.02 42.2499H403.76C403.386 42.1947 403.004 42.2276 402.644 42.3461C402.285 42.4646 401.958 42.6654 401.69 42.9325C401.422 43.1996 401.22 43.5256 401.1 43.8845C400.98 44.2434 400.946 44.6254 401 44.9999V98.1199C396.653 104.4 390.94 107.543 383.86 107.55C379.4 107.55 375.94 106.123 373.48 103.27C371.02 100.417 369.8 96.6599 369.82 91.9999V44.9999C369.82 43.1699 368.82 42.2499 366.9 42.2499H349.75C347.81 42.2499 346.84 43.1699 346.84 44.9999V94.6999Z" fill="#004CB8"></path>
                                    <path d="M305.33 15.9999C305.304 18.1028 305.71 20.1887 306.522 22.1288C307.333 24.0689 308.534 25.822 310.05 27.2799C311.524 28.7747 313.28 29.9617 315.216 30.7719C317.153 31.5821 319.231 31.9993 321.33 31.9993C323.429 31.9993 325.507 31.5821 327.444 30.7719C329.38 29.9617 331.136 28.7747 332.61 27.2799C334.124 25.8205 335.323 24.0672 336.135 22.1274C336.947 20.1877 337.353 18.1025 337.33 15.9999C337.353 13.8973 336.947 11.8122 336.135 9.87241C335.323 7.93266 334.124 6.17928 332.61 4.71991C331.136 3.22509 329.38 2.03809 327.444 1.2279C325.507 0.417708 323.429 0.000488281 321.33 0.000488281C319.231 0.000488281 317.153 0.417708 315.216 1.2279C313.28 2.03809 311.524 3.22509 310.05 4.71991C308.534 6.17784 307.333 7.93095 306.522 9.87103C305.71 11.8111 305.304 13.897 305.33 15.9999V15.9999Z" fill="#FEBB02"></path>
                                    <path d="M295.83 70C295.83 60.5133 293.23 53.18 288.03 48C282.83 42.82 275.427 40.22 265.82 40.2C257.153 40.2 249.153 43.3999 241.82 49.7999L239.59 45C239.359 44.1991 238.856 43.5037 238.168 43.0329C237.48 42.5622 236.65 42.3455 235.82 42.4199H221.75C219.81 42.4199 218.84 43.3399 218.84 45.1699V123.17C218.84 125 219.84 125.91 221.75 125.91H238.9C240.85 125.91 241.82 125 241.82 123.17V69.8C243.849 67.2349 246.351 65.0827 249.19 63.4599C252.055 61.6102 255.38 60.5988 258.79 60.54C268.263 60.54 273 65.6933 273 76V123.15C273 123.877 273.289 124.574 273.802 125.087C274.316 125.601 275.013 125.89 275.74 125.89H293.06C293.789 125.89 294.489 125.6 295.005 125.084C295.52 124.569 295.81 123.869 295.81 123.14L295.83 70Z" fill="#004CB8"></path>
                                    <path d="M208.6 87.4299C208.654 87.8022 208.62 88.1818 208.501 88.5387C208.382 88.8956 208.182 89.2198 207.916 89.4858C207.65 89.7517 207.326 89.952 206.969 90.0708C206.612 90.1895 206.232 90.2235 205.86 90.1699H146.86C147.923 95.0897 150.538 99.538 154.32 102.86C158.04 106.06 162.76 107.66 168.48 107.66C176.247 107.66 182.187 104.46 186.3 98.0599C186.99 97.0599 188.07 96.8599 189.56 97.5399L204.31 103.72C206.01 104.28 206.42 105.31 205.5 106.8C197.16 120.86 184.827 127.89 168.5 127.89C156.147 127.89 145.653 123.777 137.02 115.55C128.387 107.323 124.07 96.8066 124.07 83.9999C124.07 71.1999 128.357 60.6833 136.93 52.4499C140.918 48.4837 145.655 45.3501 150.866 43.2316C156.076 41.1131 161.656 40.052 167.28 40.1099C180.2 40.1099 190.317 44.0832 197.63 52.0299C204.943 59.9766 208.61 69.9466 208.63 81.9399L208.6 87.4299ZM180.15 63.5099C176.409 60.8135 171.891 59.4093 167.28 59.5099C162.764 59.3452 158.324 60.7009 154.67 63.3599C151.317 65.9086 148.785 69.3857 147.39 73.3599H186.82C185.937 69.3451 183.55 65.8206 180.15 63.5099Z" fill="#004CB8"></path>
                                    <path d="M114.67 108.44C114.671 109.243 114.491 110.037 114.145 110.762C113.799 111.487 113.295 112.125 112.67 112.63C100.004 122.585 84.3397 127.956 68.23 127.87C30.57 127.87 0 99.4599 0 64.4699C0 29.4799 30.57 0.129904 68.24 0.129904C84.3159 0.0447155 99.9448 5.41771 112.57 15.3699C112.853 15.5863 113.087 15.8588 113.259 16.1703C113.431 16.4818 113.537 16.8256 113.57 17.1799C113.611 17.5366 113.579 17.8979 113.476 18.2417C113.373 18.5856 113.201 18.9049 112.97 19.1799C109.97 22.8299 103.59 30.4399 100.46 34.1799C100.235 34.4673 99.9522 34.7046 99.6303 34.8767C99.3083 35.0489 98.954 35.1521 98.59 35.1799C98.2309 35.2111 97.8691 35.1706 97.5257 35.0607C97.1824 34.9508 96.8643 34.7738 96.59 34.5399C88.6472 27.8857 78.6017 24.2643 68.24 24.3199C44.93 24.3199 26 42.8299 26 64.4699C26 86.1099 44.9 103.7 68.21 103.7C76.8383 103.736 85.2888 101.247 92.52 96.5399V78.9999H72.52C71.7995 79.0018 71.1069 78.7218 70.59 78.2199C70.0903 77.7048 69.8076 77.0175 69.8 76.2999V59.2999C69.8055 58.5819 70.0886 57.8939 70.59 57.3799C71.111 56.883 71.8002 56.6009 72.52 56.5899H112C112.719 56.5925 113.408 56.8786 113.917 57.3859C114.426 57.8933 114.715 58.5811 114.72 59.2999L114.67 108.44Z" fill="#004CB8"></path>
                                    <path d="M320.71 42.1499H312.07C311.343 42.1499 310.646 42.4386 310.133 42.9524C309.619 43.4663 309.33 44.1632 309.33 44.8899V123.11C309.33 123.837 309.619 124.534 310.133 125.047C310.646 125.561 311.343 125.85 312.07 125.85H330.59C330.95 125.851 331.307 125.781 331.64 125.644C331.973 125.507 332.276 125.305 332.53 125.05C332.785 124.796 332.987 124.493 333.124 124.16C333.261 123.827 333.331 123.47 333.33 123.11V54.8799C333.33 46.2999 329.22 42.1499 320.71 42.1499Z" fill="#004CB8"></path>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0-2497">
                                    <rect width="502.78" height="127.89" fill="white"></rect>
                                    </clipPath>
                                    </defs>
                                </svg>
                                &nbsp;discount available
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </>)
    }


 const handleRowClicked = (room_name, roomResult, selectedNumberOfHours, hotelRoomRates, action, extraAdultPrice, index, selectedNumberOfRoomss) => {
    
    let finalRate = 0;
    let ress = hotelRoomRates && hotelRoomRates.find((ite) => ite.room_type === room_name)

    const firstFxn = (rateHours, selectedNumberOfRoomss, ratesArr) => {
        let finalRatee = rateHours
        let res = 0;  

        Array.from({ length: Math.floor((selectedNumberOfRoomss)) }, (_, index) => {
            res = parseInt(res) + parseInt(finalRatee)
        })

        finalRate = res

        let findData = ratesArr.find((item) => item.room_name === room_name && item.selectedNumberOfHours === selectedNumberOfHours && item.numberOfGuest === '1')

        if(findData) {
            if(ratesArr.length > 0) {
                ratesArr.map((item) => {
                    if(item.room_name === room_name && item.selectedNumberOfHours === selectedNumberOfHours && item.numberOfGuest === '1') {
                        item.rate = finalRate;
                        item.selectedNumberOfRoomss = selectedNumberOfRoomss;
                    }    
                })
            }
        }else {
            ratesArr.push({room_name: room_name, selectedNumberOfHours: selectedNumberOfHours, selectedNumberOfRoomss: selectedNumberOfRoomss, numberOfGuest: '1', rate: finalRate})
        }

        
        console.log("selectedNumberOfRooms: ",ratesArr)
    }

    const secondFxn = (rateHours, selectedNumberOfRoomss, ratesArr, extraAdultPrice) => {
        let finalRatee = rateHours;
        let res = 0;   
               Array.from({ length: Math.floor((index + 1)) }, (_, index) => 
                   finalRatee = finalRatee + extraAdultPrice
                  
               )

               Array.from({ length: Math.floor((selectedNumberOfRoomss)) }, (_, index) => {
                   res = parseInt(res) + parseInt(finalRatee)
               })

       finalRate = res

       let findData = ratesArr.find((item) => item.room_name === room_name && item.selectedNumberOfHours === selectedNumberOfHours && item.numberOfGuest === (index + 2).toString())
     
       if(findData) {
           if(ratesArr.length > 0) {
               ratesArr.map((item) => {
                   if(item.room_name === room_name && item.selectedNumberOfHours === selectedNumberOfHours && item.numberOfGuest === (index + 2).toString()) {
                       item.rate = finalRate;
                       item.selectedNumberOfRoomss = selectedNumberOfRoomss;
                   }    
               })
           }
       }else {
           ratesArr.push({room_name: room_name, selectedNumberOfHours: selectedNumberOfHours, selectedNumberOfRoomss: selectedNumberOfRoomss, numberOfGuest: (index + 2).toString(), rate: finalRate})
       }
       console.log("selectedNumberOfRooms: ",ratesArr)
    }

    if(action === '') {
        if(selectedNumberOfHours === '3') {
            
            firstFxn(ress.rate_3hr, selectedNumberOfRoomss, ratesArr)

        }else if(selectedNumberOfHours === '6') {

            firstFxn(ress.rate_6hr, selectedNumberOfRoomss, ratesArr)

        }else if(selectedNumberOfHours === '12') {

            firstFxn(ress.rate_12hr, selectedNumberOfRoomss, ratesArr)

        }else if(selectedNumberOfHours === '24') {

            firstFxn(ress.rate_24hr, selectedNumberOfRoomss, ratesArr)

        }
    }else if(action === 'otherThanFirst') {
        if(selectedNumberOfHours === '3') {

            secondFxn(ress.rate_3hr, selectedNumberOfRoomss, ratesArr, extraAdultPrice)

        }else if(selectedNumberOfHours === '6') {

            secondFxn(ress.rate_6hr, selectedNumberOfRoomss, ratesArr, extraAdultPrice)

        }else if(selectedNumberOfHours === '12') {

           secondFxn(ress.rate_12hr, selectedNumberOfRoomss, ratesArr, extraAdultPrice)

        }else if(selectedNumberOfHours === '24') {

            secondFxn(ress.rate_24hr, selectedNumberOfRoomss, ratesArr, extraAdultPrice)

        }
    }

    console.log("Event:", room_name, roomResult, selectedNumberOfHours, hotelRoomRates,  action, extraAdultPrice, index, finalRate)
    let abc = 0;
    let xyz = 0;
    ratesArr.map((item) => {
        abc = abc + item.rate;
        xyz = xyz + parseInt(item.selectedNumberOfRoomss);
    })

    setTotalRooms(xyz)
    setCurrentSelectedTd0(abc)
    
 }



    let abcde = [];
    const handleRateChangeRoom = async () => {
       // console.log("ratesArrcurrentSelectedTd0:::::::::::,", currentSelectedTd0, ratesArr)
        let res = 0;

            //res = parseInt(res) + parseInt(currentSelectedTd0)

        

        Array.from({ length: Math.floor((selectedNumberOfRooms)) }, (_, index) => {
            res = parseInt(res) + parseInt(currentSelectedTd0)
        })
        
        //setPreviousRates(res);

        //ratesArr.push(res)

        console.log("ratesArr:::::::::::,", res)

        return res;
    }
    
    return (
        <div className="w-screen h-full bg-white">
            <div className="py-16 w-[96%] mx-auto">
                <Breadcrumbs>
                    <BreadcrumbItem color="primary">Home</BreadcrumbItem>
                    <BreadcrumbItem color="primary">Navi Mumbai Hotels</BreadcrumbItem>
                    <BreadcrumbItem color="primary" className="capitalize">{hotelsData?.Hotel_name}</BreadcrumbItem>
                </Breadcrumbs>
                <h1 className="text-4xl text-black/80 px-2 py-2 capitalize">{hotelsData?.Hotel_name}</h1>
                <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <a href="#">
                            <span className=" flex items-center text-base text-blue-500">
                                <Star className="h-6 w-6" fill="#FCB332" strokeWidth={0} />
                                <p className="">
                                    <span className="text-black">{hotelsData?.rating}</span>
                                    (Reviews: {hotelsData?.user_review_count})
                                </p>
                            </span>
                        </a>
                        <a href="#">
                            <span className="text-base text-gray-500 w-fit uppercase">{hotelsData?.Hotel_name + ',' + hotelsData?.Location}</span>
                        </a>
                        {hotelsData && hotelsData.hotel_category === 'premium' ? <Badge className="bg-indigo-500"><Crown className="h-4 w-4 mr-1" />PREMIUM</Badge> : <Badge className="bg-red-500"><Crown className="h-4 w-4 mr-1" />Luxury</Badge>}
                        { }<Badge className="bg-sky-500">NEW</Badge>
                    </div>
                    <div className="flex items-center space-x-9">
                        {!sessionValue
                            ? <Popover
                                offset={10}
                                placement="left-start"
                                backdrop="opaque"
                            >
                                <PopoverTrigger>
                                    <Button isIconOnly color="default" aria-label="Like">
                                        <Heart />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto">
                                    <section>
                                        <div className="grid grid-cols-2">
                                            <div className="relative flex items-end px-4 pb-10 pt-60 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24">
                                                <div className="absolute inset-0">
                                                    <img
                                                        className="h-full w-full rounded-md object-cover object-top"
                                                        src="https://images.unsplash.com/photo-1468167381860-bda3c772f16b?q=80&w=1422&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                                                <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                                                    <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Welcome Back</h2>
                                                    <h5 className="text-sm font-bold text-gray-500">
                                                        Login to unlock exclusive experience
                                                    </h5>
                                                    <LoginFunc loginFlagBookingsPage={loginFlagBookingsPage} />
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </PopoverContent>
                            </Popover>
                            :
                            <Button
                                isIconOnly
                                color={isToggled ? "danger" : "default"}
                                aria-label="Like"
                                onClick={() => {
                                    handleAddToFavourite();
                                }}
                            // onMouseOver={handleFavouriteOnHover}
                            >
                                <Heart />
                            </Button>
                        }
                        <Button isIconOnly color="primary" aria-label="Like" onClick={copyToClipboard}>
                            <Share2 />
                        </Button>
                    </div>
                </div>
                <HotelName hotel_Name={hotelsData?.Hotel_name} hotel_ID={hotelsData?.Hotel_Id} onHotelName={handleHotelsImgs} />
                <div className="mt-5 flex mx-auto w-full h-full">
                    <div className="w-[60%] h-[50vh] relative">
                        <Image
                            alt="hotelimg"
                            src={hotelImgs[(hotelsData?.Hotel_name ?? '').toString().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join("") + 1]}
                            fill
                            sizes="100%"
                            style={{
                                objectFit: 'cover'
                            }}
                            className="rounded-xl p-1"
                        />
                    </div>
                    <div className="w-[40%] h-[50vh] p-1 gap-2 grid grid-cols-2">
                        <div className="relative w-full ">
                            <Image
                                alt="hotelimg"
                                src={hotelImgs[(hotelsData?.Hotel_name ?? '').toString().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join("") + 2]} onLoad={() => setIsLoaded(true)}
                                fill
                                sizes="100%"
                                style={{
                                    objectFit: 'cover'
                                }}
                                className="rounded-xl"
                            />
                        </div>
                        <div className="relative w-full ">
                            <Image
                                alt="hotelimg"
                                src={hotelImgs[(hotelsData?.Hotel_name ?? '').toString().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join("") + 3]} onLoad={() => setIsLoaded(true)}
                                fill
                                sizes="100%"
                                style={{
                                    objectFit: 'cover'
                                }}
                                className="rounded-xl"
                            />
                        </div>
                        <div className="relative w-full ">
                            <Image
                                alt="hotelimg"
                                src={hotelImgs[(hotelsData?.Hotel_name ?? '').toString().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join("") + 4]} onLoad={() => setIsLoaded(true)}
                                fill
                                sizes="100%"
                                style={{
                                    objectFit: 'cover'
                                }}
                                className="rounded-xl"
                            />
                        </div>
                        <div className="relative w-full">
                            <Image
                                alt="hotelimg"
                                src={hotelImgs[(hotelsData?.Hotel_name ?? '').toString().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join("") + 5]}
                                fill
                                sizes="100%"
                                style={{
                                    objectFit: 'cover'
                                }}
                                className="rounded-xl"
                            />
                            <div className="bg-black/50 absolute w-full h-full rounded-xl flex justify-center items-center">
                                <Button className="text-sm text-white bg-primary" variant="shadow" color="" radius="full" size="md" onClick={handleShowImageModal}>
                                    Show All Images
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <ImageModal showImageModal={showImageModal} onShowImageModalClose={handleShowImageModalClose} hotelName={hotelsData?.Hotel_name} hotelID={hotelsData?.Hotel_Id} roomResult={roomResult}/>

                <div className="mt-5 flex mx-auto w-full h-full bg-white">
                    <div className="w-[68%] h-full">
                        <div className="w-full">
                            <div className="space-y-2">
                                {hotelsData?.facilities?.includes('coupleFriendly')
                                    ? <span className="flex space-x-4">
                                        <MessageCircleHeart className="size-10 mt-1 text-pink-600" />
                                        <span className="flex flex-col space-y-1">
                                            <p className="text-lg text-black leading-7">
                                                Couple Friendly
                                            </p>
                                            <p className="text-sm text-black font-poppins leading-5">
                                                We Provide Couple friendly hourly hotels for both unmarried and married couples with our completely secure and safe bookings
                                            </p>
                                        </span>
                                    </span> : ""}
                                {hotelsData?.facilities?.includes('payAtHotel')
                                    ? <span className="flex space-x-4">
                                        <Wallet className="h-10 w-10 mt-1 text-violet-500" />
                                        <span className="flex flex-col space-y-1">
                                            <p className="text-lg text-black leading-7">
                                                Pay At Hotel
                                            </p>
                                            <p className="text-sm text-black leading-5">
                                                You can confirm your booking now and pay at the hotel when you arrive there.
                                            </p>
                                        </span>
                                    </span>
                                    : ""}
                                {hotelsData?.facilities?.includes('localIdAccepted')
                                    ? <span className="flex space-x-4">
                                        <CreditCard className="h-10 w-10 mt-1 text-blue-500" />
                                        <span className="flex flex-col space-y-1">
                                            <p className="text-lg text-black leading-7">
                                                Local ID Accepted
                                            </p>
                                            <p className="text-sm text-black leading-5">
                                                We accept Same City Guests with hassle free check-in
                                            </p>
                                        </span>
                                    </span>
                                    : ""}
                            </div>
                            {/* # Pending to build image */}
                            <a href="/login">
                                <img className="my-9 w-full" src="https://site-img-res-new.s3.ap-south-1.amazonaws.com/next-site-images/HotelListSignUpCard.png" />
                            </a>
                            <div className="mt-4">
                                <h2 className="text-black/80 text-xl">
                                    Amenities at {hotelsData?.Hotel_name}
                                </h2>
                                <div className="grid grid-cols-3 gap-9 mt-8">

                                {/* {hotelTopFacilities && hotelTopFacilities.map((item) => {
                                    return (<>
                                    {item}
                                    </>)
                                })} */}


                                    {
                                        hotelTopFacilities && hotelTopFacilities.map((key) => {
                                            if (amenities_icons[key]) {
                                                return (
                                                    <span key={key} className="flex items-center space-x-6">
                                                        {amenities_icons[key]}
                                                    </span>
                                                );
                                            }
                                        })
                                    }
                                </div>
                            </div>

                            <div className="mt-4">
                            <h2 className="text-black text-xl">Availability</h2>

                            <div className='sticky'>
        <div className="w-full gap-2 pl-4 pr-4 flex items-center z-50 sticky top-0 m-auto h-24 transition-all duration-200 delay-200 ease-in-out text-black ">

          <div>
            <p className="flex ml-4 static items-center text-lg font-bold text-gray-600"><CiCalendar className="size-8" />Check In-Check Out</p>
                <Daterangepickerreact 
                    className='bg-white h-9 w-66 overflow-hidden'
                    initialDate={initialDate} 
                    onDateValue= {handleDateSelect}
                />
          </div>

          <Divider orientation="vertical" className="h-16 bg-black/20" />

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


<table className="mt-8">
    <thead>
        <tr>
            <th style={{ width: '200px' }}>Room Type</th>
            <th>Number of guests</th>
            <th>
            Number of Hours
            <Autocomplete
                            isRequired
                            key={''}
                            labelPlacement="outside"
                            placeholder="Select...."
                            
                            variant="bordered"
                            size="sm"
                            className="max-w-[6rem]"  
                            defaultSelectedKey={'3'}
                            value={selectedNumberOfHours}
                            allowsCustomValue={true}
                            onInputChange={(value) => {
                                setSelectedNumberOfHours(value)
                            }}
                        >
                            {Array.isArray(numHours) && numHours.map((item) => (
                                <AutocompleteItem value={item}  key={item}>{item}</AutocompleteItem>
                            ))}
                        </Autocomplete>
            </th>
            <th>Your Choices</th>
            <th>Select Rooms</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        {roomResult && roomResult.map((item, index) => {

            if(item.room_name === "Property Main") {

            }else {

            let roomamenareaa = [];
            let roomamenarea = [];
            let roomview = '';
            let roomamen = [];
            let roomamenn = [];
            let minNumberOfGuest = parseInt(item.base_adult);
            let maxNumberOfGuest = parseInt(item.max_adult);
            let extraAdultPrice = parseInt(item.extra_adult_price);
            let totalRoomss = 0;
            
            console.log("extraAdultPrice: ",item.room_name, item.extra_adult_price)
            if(item.room_type !== undefined) {
                roomview = item.room_type.split("-")[1];
            }

            if(roomAmenetities) {
                roomAmenetities.map((amenity) => {
                    console.log("Res1:::::::::>>>>>>,",amenity, index)
                    amenity.availability.map((avail) => {
                        console.log("Res2:::::::::>>>>>>,",avail)
                        if(avail === item.room_name) {
                            roomamen.push(amenity.property_amenities);
                            roomamenareaa.push(amenity.property_area);
                            roomamenn.push({area: amenity.property_area, amenity: amenity.property_amenities});
                        }
                    })
                })
            }

            
            if(roomamenareaa && roomamenareaa.length > 0) {
                roomamenarea = [...new Set(roomamenareaa)];
                }

                if(roomamen && roomamen.length > 0) {
                    roomamen = [...new Set(roomamen)];
                    }
            

            return (
            <React.Fragment key={index}>
                <tr>
                    <td rowSpan={maxNumberOfGuest.toString()} style={{alignContent:"flex-start"}}>
                        <a onClick={(e) => handleRoomLinkClick(e, item.room_name, item.id, item)}>
                            <u class="roomlink">
                                <p class="roomlink">
                                    {item.room_name}
                                </p>
                            </u>
                        </a>
                        {
                            item.bed_type && item.number_of_beds 
                                ? item.bed_type.map((type, index) => {
                                    let numberofbed = item.number_of_beds.find((item) => item.key === type.key)
                                    if(type.value === "Single Bed") {
                                        return (
                                            <><div key={index} className="data-font inline-flex">
                                                {numberofbed.value} {type.value} <BedSingle className="h-[1.5rem] ml-1" />
                                            </div>
                                            <span className="block"></span></>
                                        )
                                    }else {
                                        if(index !== (item.number_of_beds.length - 1)) {
                                            return (
                                            
                                                <span key={index} className="data-fontt">{numberofbed.value} {type.value}{", "}</span>
                                       
                                            )
                                        }else{
                                            return (
                                            
                                                <span key={index} className="data-fontt">{numberofbed.value} {type.value} <BedDouble className="h-[1.5rem] ml-1 inline-flex"/></span>
                                       
                                            )
                                        }
                                        
                                    }
                                  }) 
                                : ""
                        }
                        <span className="block"></span>
                        <div className="mt-2 inline-flex">


                            
                            {item.room_size && item.room_size_type ? <div className="inline-flex text-[13px]">
                                <svg xmlns="http://www.w3.org/2000/svg" className="" width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-m"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 16V8l4 4 4-4v8"/></svg>&nbsp;{item.room_size} {item.room_size_type}
                            </div> : ""}

                            

                            {roomview && roomview.trim() === "Terrace View" 
                            ? (<div className="ml-4 inline-flex text-[13px]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m3 14l1 5m0 0l-1 3m1-3h2.653c.704 0 .87.14.986.836L8 22m13-8l-1 5m0 0l1 3m-1-3h-2.653c-.704 0-.87.14-.986.836L16 22m-4-12v12M4.6 7.407c2.07-.969 4.153-2.507 5.69-4.043C11.199 2.454 11.654 2 12 2s.8.455 1.711 1.364c1.536 1.535 3.619 3.074 5.688 4.043c.704.33 1.134.736 1.474 1.528c.26.605.143 1.065-.566 1.065H3.693c-.71 0-.826-.46-.566-1.065c.34-.792.77-1.198 1.473-1.528M11 22h2m-4-7h6" color="currentColor"></path></svg>&nbsp; {roomview}
                            </div>)
                            : ""
                            }

                            {roomview && roomview.trim() === "Mountain View" || roomview && roomview.trim() === "Hill View"
                                ? (<div className="ml-4 inline-flex text-[13px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mountain"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>&nbsp; {roomview}
                                </div>)
                                : ""
                            }

                            {roomview && roomview.trim() === "City View"
                                ? (<div className="ml-4 inline-flex text-[13px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mt-1" width="1rem" height="1rem" viewBox="0 0 48 48"><g fill="none"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M4 42h40"></path><rect width={8} height={16} x={8} y={26} stroke="currentColor" strokeLinejoin="round" strokeWidth={4} rx={2}></rect><path stroke="currentColor" strokeLinecap="square" strokeLinejoin="round" strokeWidth={4} d="M12 34h1"></path><rect width={24} height={38} x={16} y={4} stroke="currentColor" strokeLinejoin="round" strokeWidth={4} rx={2}></rect><path fill="currentColor" d="M22 10h4v4h-4zm8 0h4v4h-4zm-8 7h4v4h-4zm8 0h4v4h-4zm0 7h4v4h-4zm0 7h4v4h-4z"></path></g></svg>&nbsp;{roomview}
                                </div>)
                                : ""
                            }
                            
                            {roomview && roomview.trim() === "Beach View"
                                ? (<div className="ml-4 inline-flex text-[13px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 14 14"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M13.5 13.48H13a2 2 0 0 1-2-2a2 2 0 0 1-4 0a2 2 0 0 1-4 0a2 2 0 0 1-2 2H.5m9.5-4a5.49 5.49 0 0 0-8.48 0"/><path d="M6.5 7.53c.06-2.26.75-4.32 2.25-5.06M5.76.57a2.58 2.58 0 0 1 3 1.9"/><path d="M12.41 2.84a2.78 2.78 0 0 0-3.66-.37"/><path d="M5.08 3.54a3 3 0 0 1 3.67-1.07a2.55 2.55 0 0 1 1.89 3"/></g></svg>&nbsp;{roomview}
                                </div>)
                                : ""
                            }

                            
                        </div>

                        
                        <div className="mt-2">
                        {roomamenarea && roomamenarea.map((area) => {
                                    if(area === "Top" || area === "Top Facilities" || area === "Popular Facilities") {
             
                                      return (<>
                                        
                                        <ul className="block">
                                          {roomamenn && roomamenn.map((item) => {
                                            if(item.area === area) {
                                              if(item.amenity === "Air conditioning") {
                                                return (<>
                                                  <li>
                                                      <div className="inline-flex text-[13px]"><AirVent className="icon-style"/> {"Air Conditioner"}</div>
                                                  </li>
                                                </>)
                                              }

                                              if(item.amenity === "Flat-screen TV") {
                                                return (<>
                                                  <li>
                                                      <div className="inline-flex text-[13px]">&nbsp;<svg xmlns="http://www.w3.org/2000/svg" className="icon-style" width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tv-minimal"><path d="M7 21h10"/><rect width="20" height="14" x="2" y="3" rx="2"/></svg>&nbsp;{item.amenity}</div>
                                                  </li>
                                                </>)
                                              }

                                              if(item.amenity === "Free Wifi") {
                                                return (<>
                                                  <li>
                                                      <div className="inline-flex text-[13px]"><Wifi className="icon-style"/> {item.amenity}</div>
                                                  </li>
                                                </>)
                                              }

                                              if(item.amenity === "Soundproof") {
                                                return (<>
                                                  <li>
                                                      <div className="inline-flex text-[13px]"><VolumeX className="icon-style"/> {item.amenity}</div>
                                                  </li>
                                                </>)
                                              }

                                              if(item.amenity === "Attached Bathroom") {
                                                return (<>
                                                  <li>
                                                      <div className="inline-flex text-[13px]"><Bath className="icon-style"/> {item.amenity}</div>
                                                  </li>
                                                </>)
                                              }
                                              
                                            }
                                          })}
                                        </ul>
                                      </>)
                                    }

                                  })}
                        </div>

                        <Divider orientation="horizontal" className="mt-1"/>
                        
                        
                        <ul className="flex flex-wrap mt-2">

                        
                            {roomamen && roomamen.map((item) => {
                                return (<>
                                    <li key={index} className="flex">
                                        <div className="inline-flex text-[13px]">
                                            <Check style={{height:"1rem", color:"green"}}/> {item}
                                        </div>
                                    </li> 
                                </>)
                            })}
                            
                        </ul>
                        
                        
                        
                        
                        
                    </td>
                    <td style={{alignContent:"flex-start"}}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M3 14s-1 0-1-1s1-4 6-4s6 3 6 4s-1 1-1 1zm5-6a3 3 0 1 0 0-6a3 3 0 0 0 0 6"></path></svg></td>
                    <td style={{alignContent:"flex-start"}}>
                        <div>
                            <div className="text-red-600 line-through inline-block text-[13px]">
                                ₹&nbsp;10,497
                            </div>
                            <div className="font-bold">
                                <div className="inline-flex">
                                    ₹&nbsp;{hotelRoomRates && hotelRoomRates.map((ite) => {
                                        
                                        if(ite.room_type === item.room_name) {

                                            let finalRate = ite.rate_3hr;
                                            totalRoomss = ite.total_rooms_count;
                                            

                                            if(selectedNumberOfHours === '3') {
                                                return (<>{ite.rate_3hr}</>)
                                            }else if(selectedNumberOfHours === '6') {
                                                return (<>{ite.rate_6hr}</>)
                                            }else if(selectedNumberOfHours === '12') {
                                                return (<>{ite.rate_12hr}</>)
                                            }else if(selectedNumberOfHours === '24') {
                                                return (<>{ite.rate_24hr}</>)
                                            }
                                            
                                        }
                                    })}
                                    &nbsp;<svg class="bk-icon -iconset-info_sign" fill="#6B6B6B" height="14" width="14" viewBox="0 0 128 128" role="presentation" aria-hidden="true" focusable="false"><path d="M49.4 85l4.2-17.2c.7-2.7.8-3.8 0-3.8a29 29 0 0 0-8.8 3.8l-1.8-3A48 48 0 0 1 66.7 53c3.7 0 4.3 4.3 2.5 11l-5 18c-.7 3.3-.3 4.3.5 4.3a19 19 0 0 0 8.2-4L75 85c-8.6 8.7-18.2 12-21.8 12s-6.4-2.3-3.8-12zM75 36a9.2 9.2 0 0 1-9.2 9c-4.4 0-7-2.7-6.8-7a9 9 0 0 1 9.1-9c4.6 0 6.9 3.2 6.9 7z"></path><path d="M62 16a48 48 0 1 1-48 48 48 48 0 0 1 48-48m0-8a56 56 0 1 0 56 56A56 56 0 0 0 62 8z"></path></svg>
                                </div>
                            </div>
                            <div className="inline-flex text-[13px]">+₹&nbsp;756 taxes and fees</div>
                            <div>
                                <span className="bg-amber-600 text-white" style={{borderRadius: "4px"}}><span style={{padding: "0 5px 0 5px"}} className="text-[13px]">40% off</span></span>
                            </div>
                            <div>
                                <span className="bg-amber-600 text-white" style={{borderRadius: "4px"}}><span style={{padding: "0 5px 0 5px"}} className="text-[13px]">Gateway deal</span></span>
                            </div>
                        </div>
                    </td>
                    <td>{columnFour()}</td>
                    <td style={{alignContent:"flex-start"}}>
                        {
                            selectedNumberOfHours === '3' 
                                ? <Autocomplete
                                    isRequired
                                    
                                    labelPlacement="outside"
                                    placeholder="Select...."
                                    
                                    variant="bordered"
                                    size="sm"
                                    className="max-w-[6rem]"  
                                    defaultSelectedKey={() => {
                                        let num = '0';
                                        const matchingItem = ratesArr.find((ite) => {
                                            return item.room_name === ite.room_name && ite.selectedNumberOfHours === '3' && ite.numberOfGuest === '1';
                                        });
                                    
                                        if (matchingItem) {
                                            num = matchingItem.selectedNumberOfRoomss;
                                        }
                                    
                                        return num;
                                    }}
                                    value={""}
                                    allowsCustomValue={true}
                                    onInputChange={(value) => {
                                        setSelectedNumberOfRooms(value);
                                        handleRowClicked(item.room_name, roomResult, selectedNumberOfHours, hotelRoomRates, '', '', 0, value)
                                        
                                    }}
                                >
                                    {Array.from({ length: Math.floor(totalRoomss + 1) }, (_, index) => {
                                        let res = false;
                                        ratesArr.map((ite) => {
                                            
                                            if(ite.room_name === item.room_name && ite.selectedNumberOfHours === selectedNumberOfHours) {
                                                console.log("Rates Array: ", index, ite.selectedNumberOfRoomss)
                                                if(ite.selectedNumberOfRoomss <= totalRoomss) {
                                                    let a = totalRoomss - ite.selectedNumberOfRoomss;
                                                    if(index > a) {
                                                        res = true;
                                                    }
        
                                                    if(index === ite.selectedNumberOfRoomss) {
                                                        res = false;
                                                    }
                                                }
                                            }
                                        })
        
                                        return(
                                            <AutocompleteItem value={index.toString()}  key={index.toString()}  style={res === true ? {pointerEvents:"none",opacity:"0.1"} : {}}>{index.toString()}</AutocompleteItem>
                                        )
                                        
                                    })}
                                </Autocomplete>
                                : ""
                        }

                        {
                            selectedNumberOfHours === '6' 
                                ? <Autocomplete
                                isRequired
                                
                                labelPlacement="outside"
                                placeholder="Select...."
                                
                                variant="bordered"
                                size="sm"
                                className="max-w-[6rem]"  
                                defaultSelectedKey={() => {
                                    let num = '0';
                                    const matchingItem = ratesArr.find((ite) => {
                                        return item.room_name === ite.room_name && ite.selectedNumberOfHours === '6' && ite.numberOfGuest === '1';
                                    });
                                
                                    if (matchingItem) {
                                        num = matchingItem.selectedNumberOfRoomss;
                                    }
                                
                                    return num;
                                }}
                                value={""}
                                allowsCustomValue={true}
                                onInputChange={(value) => {
                                    setSelectedNumberOfRooms(value);
                                    handleRowClicked(item.room_name, roomResult, selectedNumberOfHours, hotelRoomRates, '', '', 0, value)
                                    
                                }}
                            >
                                {Array.from({ length: Math.floor(totalRoomss + 1) }, (_, index) => {
                                    let res = false;
                                    ratesArr.map((ite) => {
                                        
                                        if(ite.room_name === item.room_name && ite.selectedNumberOfHours === selectedNumberOfHours) {
                                            console.log("Rates Array: ", index, ite.selectedNumberOfRoomss)
                                            if(ite.selectedNumberOfRoomss <= totalRoomss) {
                                                let a = totalRoomss - ite.selectedNumberOfRoomss;
                                                if(index > a) {
                                                    res = true;
                                                }
    
                                                if(index === ite.selectedNumberOfRoomss) {
                                                    res = false;
                                                }
                                            }
                                        }
                                    })
    
                                    return(
                                        <AutocompleteItem value={index.toString()}  key={index.toString()}  style={res === true ? {pointerEvents:"none",opacity:"0.1"} : {}}>{index.toString()}</AutocompleteItem>
                                    )
                                    
                                })}
                            </Autocomplete>
                                : "" 
                        }
                        {
                            selectedNumberOfHours === '12' 
                                ? <Autocomplete
                                isRequired
                                
                                labelPlacement="outside"
                                placeholder="Select...."
                                
                                variant="bordered"
                                size="sm"
                                className="max-w-[6rem]"  
                                defaultSelectedKey={() => {
                                    let num = '0';
                                    const matchingItem = ratesArr.find((ite) => {
                                        return item.room_name === ite.room_name && ite.selectedNumberOfHours === '12' && ite.numberOfGuest === '1';
                                    });
                                
                                    if (matchingItem) {
                                        num = matchingItem.selectedNumberOfRoomss;
                                    }
                                
                                    return num;
                                }}
                                value={""}
                                allowsCustomValue={true}
                                onInputChange={(value) => {
                                    setSelectedNumberOfRooms(value);
                                    handleRowClicked(item.room_name, roomResult, selectedNumberOfHours, hotelRoomRates, '', '', 0, value)
                                    
                                }}
                            >
                                {Array.from({ length: Math.floor(totalRoomss + 1) }, (_, index) => {
                                    let res = false;
                                    ratesArr.map((ite) => {
                                        
                                        if(ite.room_name === item.room_name && ite.selectedNumberOfHours === selectedNumberOfHours) {
                                            console.log("Rates Array: ", index, ite.selectedNumberOfRoomss)
                                            if(ite.selectedNumberOfRoomss <= totalRoomss) {
                                                let a = totalRoomss - ite.selectedNumberOfRoomss;
                                                if(index > a) {
                                                    res = true;
                                                }
    
                                                if(index === ite.selectedNumberOfRoomss) {
                                                    res = false;
                                                }
                                            }
                                        }
                                    })
    
                                    return(
                                        <AutocompleteItem value={index.toString()}  key={index.toString()}  style={res === true ? {pointerEvents:"none",opacity:"0.1"} : {}}>{index.toString()}</AutocompleteItem>
                                    )
                                    
                                })}
                            </Autocomplete>
                                : ""
                        }
                        {
                            selectedNumberOfHours === '24' 
                                ? <Autocomplete
                                isRequired
                                
                                labelPlacement="outside"
                                placeholder="Select...."
                                
                                variant="bordered"
                                size="sm"
                                className="max-w-[6rem]"  
                                defaultSelectedKey={() => {
                                    let num = '0';
                                    const matchingItem = ratesArr.find((ite) => {
                                        return item.room_name === ite.room_name && ite.selectedNumberOfHours === '24' && ite.numberOfGuest === '1';
                                    });
                                
                                    if (matchingItem) {
                                        num = matchingItem.selectedNumberOfRoomss;
                                    }
                                
                                    return num;
                                }}
                                value={""}
                                allowsCustomValue={true}
                                onInputChange={(value) => {
                                    setSelectedNumberOfRooms(value);
                                    handleRowClicked(item.room_name, roomResult, selectedNumberOfHours, hotelRoomRates, '', '', 0, value)
                                    
                                }}
                            >
                                {Array.from({ length: Math.floor(totalRoomss + 1) }, (_, index) => {
                                    let res = false;
                                    ratesArr.map((ite) => {
                                        
                                        if(ite.room_name === item.room_name && ite.selectedNumberOfHours === selectedNumberOfHours) {
                                            console.log("Rates Array: ", index, ite.selectedNumberOfRoomss)
                                            if(ite.selectedNumberOfRoomss <= totalRoomss) {
                                                let a = totalRoomss - ite.selectedNumberOfRoomss;
                                                if(index > a) {
                                                    res = true;
                                                }
    
                                                if(index === ite.selectedNumberOfRoomss) {
                                                    res = false;
                                                }
                                            }
                                        }
                                    })
    
                                    return(
                                        <AutocompleteItem value={index.toString()}  key={index.toString()}  style={res === true ? {pointerEvents:"none",opacity:"0.1"} : {}}>{index.toString()}</AutocompleteItem>
                                    )
                                    
                                })}
                            </Autocomplete>
                                : ""
                        }
                        
                        
                    </td>
                    {(index - 1) === 0 && (<td rowSpan="0" style={{alignContent:"flex-start"}}>
                            <div>
                                <div className="inline-flex"><p className="font-bold">{totalRooms}</p> &nbsp;Rooms for</div>
                                <div className="font-bold">₹&nbsp;{currentSelectedTd0}</div>
                            </div>
                            <div>
                                <Button>I&apos;ll reserve</Button>
                            </div>
                            <div>
                                <ul>
                                    <li className="inline">
                                        <span className="dot"></span>
                                        <span>Confirmation is immediate</span>
                                    </li>
                                </ul>
                            </div>
                            <div>No credit card needed</div>
                        </td> )}
                </tr>
                {adultsSelectParam <= maxNumberOfGuest ? Array.from({ length: Math.floor((maxNumberOfGuest - 1)) }, (_, index) => (
                    <><tr>
                    <td style={{alignContent:"flex-start"}}>
                        <div className="inline-flex" style={{alignContent:"flex-start"}}>
                        {Array.from({ length: Math.floor((index + 2)) }, (_, index) => (
                            <><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M3 14s-1 0-1-1s1-4 6-4s6 3 6 4s-1 1-1 1zm5-6a3 3 0 1 0 0-6a3 3 0 0 0 0 6"></path></svg></>
                        ))}
  
                        </div>
                    </td>
                    <td style={{alignContent:"flex-start"}}>
                        <div>
                            <div className="text-red-600 line-through inline-block text-[13px]">
                                ₹&nbsp;10,497
                            </div>
                            <div className="font-bold">
                                <div className="inline-flex">
                                    ₹&nbsp;{hotelRoomRates && hotelRoomRates.map((ite) => {
                                        console.log("Resssss:::::::>789", ite.room_type, item.room_name)
                                        if(ite.room_type === item.room_name) {
                                            totalRoomss = ite.total_rooms_count;

                                            if(selectedNumberOfHours === '3') {
                                                let finalRate = ite.rate_3hr;
                                                    
                                                        Array.from({ length: Math.floor((index + 1)) }, (_, index) => 
                                                            finalRate = finalRate + extraAdultPrice
                                                           
                                                        )
                                                   
                                                
                                                return (<>{finalRate}</>)
                                                
                                            }else if(selectedNumberOfHours === '6') {
                                                let finalRate = ite.rate_6hr;
                                                    
                                                        Array.from({ length: Math.floor((index + 1)) }, (_, index) => 
                                                            finalRate = finalRate + extraAdultPrice
                                                           
                                                        )
                                                   
                                                
                                                return (<>{finalRate}</>)
                                            }else if(selectedNumberOfHours === '12') {
                                                let finalRate = ite.rate_12hr;
                                                    
                                                        Array.from({ length: Math.floor((index + 1)) }, (_, index) => 
                                                            finalRate = finalRate + extraAdultPrice
                                                           
                                                        )
                                                   
                                                
                                                return (<>{finalRate}</>)
                                            }else if(selectedNumberOfHours === '24') {
                                                let finalRate = ite.rate_24hr;
                                                    
                                                        Array.from({ length: Math.floor((index + 1)) }, (_, index) => 
                                                            finalRate = finalRate + extraAdultPrice
                                                           
                                                        )
                                                   
                                                
                                                return (<>{finalRate}</>)
                                            }
                                        }
                                    })}
                                    &nbsp;<svg class="bk-icon -iconset-info_sign" fill="#6B6B6B" height="14" width="14" viewBox="0 0 128 128" role="presentation" aria-hidden="true" focusable="false"><path d="M49.4 85l4.2-17.2c.7-2.7.8-3.8 0-3.8a29 29 0 0 0-8.8 3.8l-1.8-3A48 48 0 0 1 66.7 53c3.7 0 4.3 4.3 2.5 11l-5 18c-.7 3.3-.3 4.3.5 4.3a19 19 0 0 0 8.2-4L75 85c-8.6 8.7-18.2 12-21.8 12s-6.4-2.3-3.8-12zM75 36a9.2 9.2 0 0 1-9.2 9c-4.4 0-7-2.7-6.8-7a9 9 0 0 1 9.1-9c4.6 0 6.9 3.2 6.9 7z"></path><path d="M62 16a48 48 0 1 1-48 48 48 48 0 0 1 48-48m0-8a56 56 0 1 0 56 56A56 56 0 0 0 62 8z"></path></svg>
                                </div>
                            </div>
                            <div className="inline-flex text-[13px]">+₹&nbsp;756 taxes and fees</div>
                            <div>
                                <span className="bg-amber-600 text-white" style={{borderRadius: "4px"}}><span style={{padding: "0 5px 0 5px"}} className="text-[13px]">40% off</span></span>
                            </div>
                            <div>
                                <span className="bg-amber-600 text-white" style={{borderRadius: "4px"}}><span style={{padding: "0 5px 0 5px"}} className="text-[13px]">Gateway deal</span></span>
                            </div>
                        </div>
                    </td>
                    <td style={{alignContent:"flex-start"}}>
                        {columnFour()}
                    </td>
                    <td style={{alignContent:"flex-start"}}>

{
                            selectedNumberOfHours === '3' ?
                                <Autocomplete
                                isRequired
                                labelPlacement="outside"
                                placeholder="Select...."
                                
                                variant="bordered"
                                size="sm"
                                className="max-w-[6rem]"  
                                defaultSelectedKey={() => {
                                    let num = '0';
                                    const matchingItem = ratesArr.find((ite) => {
                                        console.log("Room num: ", (index + 2).toString())
                                        return item.room_name === ite.room_name && ite.selectedNumberOfHours === '3' && ite.numberOfGuest === (index + 2).toString();
                                    });
                                
                                    if (matchingItem) {
                                        num = matchingItem.selectedNumberOfRoomss;
                                    }
                                
                                    return num;
                                }}
                                value={""}
                                allowsCustomValue={true}
                                onInputChange={(value) => {
                                    setSelectedNumberOfRooms(value)
                                    handleRowClicked(item.room_name, roomResult, selectedNumberOfHours, hotelRoomRates, "otherThanFirst", extraAdultPrice, index, value)
                                }}
                                >
                                {Array.from({ length: Math.floor((totalRoomss + 1)) }, (_, index) => {
                                     let res = false;
                                     ratesArr.map((ite) => {
                                         
                                         if(ite.room_name === item.room_name && ite.selectedNumberOfHours === selectedNumberOfHours) {
                                            
                                             if(ite.selectedNumberOfRoomss <= totalRoomss) {
                                                 let a = totalRoomss - ite.selectedNumberOfRoomss;
                                                 if(index > a) {
                                                     res = true;
                                                 }
     
                                                 if(index === ite.selectedNumberOfRoomss) {
                                                     res = false;
                                                 }
                                             }
                                         }
                                     })
    
                                     return(
                                        <AutocompleteItem value={index.toString()}  key={index.toString()}  style={res === true ? {pointerEvents:"none",opacity:"0.1"} : {}}>{index.toString()}</AutocompleteItem>
                                    )
                                })}
                            </Autocomplete>
                              : ""
                        }

                        {
                            selectedNumberOfHours === '6' 
                                ? <Autocomplete
                                isRequired
                                labelPlacement="outside"
                                placeholder="Select...."
                                
                                variant="bordered"
                                size="sm"
                                className="max-w-[6rem]"  
                                defaultSelectedKey={() => {
                                    let num = '0';
                                    const matchingItem = ratesArr.find((ite) => {
                                        console.log("Room num: ", (index + 2).toString())
                                        return item.room_name === ite.room_name && ite.selectedNumberOfHours === '6' && ite.numberOfGuest === (index + 2).toString();
                                    });
                                
                                    if (matchingItem) {
                                        num = matchingItem.selectedNumberOfRoomss;
                                    }
                                
                                    return num;
                                }}
                                value={""}
                                allowsCustomValue={true}
                                onInputChange={(value) => {
                                    setSelectedNumberOfRooms(value)
                                    handleRowClicked(item.room_name, roomResult, selectedNumberOfHours, hotelRoomRates, "otherThanFirst", extraAdultPrice, index, value)
                                }}
                                >
                                {Array.from({ length: Math.floor((totalRoomss + 1)) }, (_, index) => {
                                     let res = false;
                                     ratesArr.map((ite) => {
                                         
                                         if(ite.room_name === item.room_name && ite.selectedNumberOfHours === selectedNumberOfHours) {
                                            
                                             if(ite.selectedNumberOfRoomss <= totalRoomss) {
                                                 let a = totalRoomss - ite.selectedNumberOfRoomss;
                                                 if(index > a) {
                                                     res = true;
                                                 }
     
                                                 if(index === ite.selectedNumberOfRoomss) {
                                                     res = false;
                                                 }
                                             }
                                         }
                                     })
    
                                     return(
                                        <AutocompleteItem value={index.toString()}  key={index.toString()}  style={res === true ? {pointerEvents:"none",opacity:"0.1"} : {}}>{index.toString()}</AutocompleteItem>
                                    )
                                })}
                            </Autocomplete>
                                : "" 
                        }

{
                            selectedNumberOfHours === '12' 
                                ? <Autocomplete
                                isRequired
                                labelPlacement="outside"
                                placeholder="Select...."
                                
                                variant="bordered"
                                size="sm"
                                className="max-w-[6rem]"  
                                defaultSelectedKey={() => {
                                    let num = '0';
                                    const matchingItem = ratesArr.find((ite) => {
                                        console.log("Room num: ", (index + 2).toString())
                                        return item.room_name === ite.room_name && ite.selectedNumberOfHours === '12' && ite.numberOfGuest === (index + 2).toString();
                                    });
                                
                                    if (matchingItem) {
                                        num = matchingItem.selectedNumberOfRoomss;
                                    }
                                
                                    return num;
                                }}
                                value={""}
                                allowsCustomValue={true}
                                onInputChange={(value) => {
                                    setSelectedNumberOfRooms(value)
                                    handleRowClicked(item.room_name, roomResult, selectedNumberOfHours, hotelRoomRates, "otherThanFirst", extraAdultPrice, index, value)
                                }}
                                >
                                {Array.from({ length: Math.floor((totalRoomss + 1)) }, (_, index) => {
                                     let res = false;
                                     ratesArr.map((ite) => {
                                         
                                         if(ite.room_name === item.room_name && ite.selectedNumberOfHours === selectedNumberOfHours) {
                                            
                                             if(ite.selectedNumberOfRoomss <= totalRoomss) {
                                                 let a = totalRoomss - ite.selectedNumberOfRoomss;
                                                 if(index > a) {
                                                     res = true;
                                                 }
     
                                                 if(index === ite.selectedNumberOfRoomss) {
                                                     res = false;
                                                 }
                                             }
                                         }
                                     })
    
                                     return(
                                        <AutocompleteItem value={index.toString()}  key={index.toString()}  style={res === true ? {pointerEvents:"none",opacity:"0.1"} : {}}>{index.toString()}</AutocompleteItem>
                                    )
                                })}
                            </Autocomplete>
                                : "" 
                        }

{
                            selectedNumberOfHours === '24' 
                                ? <Autocomplete
                                isRequired
                                labelPlacement="outside"
                                placeholder="Select...."
                                
                                variant="bordered"
                                size="sm"
                                className="max-w-[6rem]"  
                                defaultSelectedKey={() => {
                                    let num = '0';
                                    const matchingItem = ratesArr.find((ite) => {
                                        console.log("Room num: ", (index + 2).toString())
                                        return item.room_name === ite.room_name && ite.selectedNumberOfHours === '24' && ite.numberOfGuest === (index + 2).toString();
                                    });
                                
                                    if (matchingItem) {
                                        num = matchingItem.selectedNumberOfRoomss;
                                    }
                                
                                    return num;
                                }}
                                value={""}
                                allowsCustomValue={true}
                                onInputChange={(value) => {
                                    setSelectedNumberOfRooms(value)
                                    handleRowClicked(item.room_name, roomResult, selectedNumberOfHours, hotelRoomRates, "otherThanFirst", extraAdultPrice, index, value)
                                }}
                                >
                                {Array.from({ length: Math.floor((totalRoomss + 1)) }, (_, index) => {
                                     let res = false;
                                     ratesArr.map((ite) => {
                                         
                                         if(ite.room_name === item.room_name && ite.selectedNumberOfHours === selectedNumberOfHours) {
                                            
                                             if(ite.selectedNumberOfRoomss <= totalRoomss) {
                                                 let a = totalRoomss - ite.selectedNumberOfRoomss;
                                                 if(index > a) {
                                                     res = true;
                                                 }
     
                                                 if(index === ite.selectedNumberOfRoomss) {
                                                     res = false;
                                                 }
                                             }
                                         }
                                     })
    
                                     return(
                                        <AutocompleteItem value={index.toString()}  key={index.toString()}  style={res === true ? {pointerEvents:"none",opacity:"0.1"} : {}}>{index.toString()}</AutocompleteItem>
                                    )
                                })}
                            </Autocomplete>
                                : "" 
                        }
                        
                    </td>
                </tr></>
                )) : ""}

                
                
                {/* <tr>
                    <td style={{alignContent:"flex-start"}}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M3 14s-1 0-1-1s1-4 6-4s6 3 6 4s-1 1-1 1zm5-6a3 3 0 1 0 0-6a3 3 0 0 0 0 6"></path></svg></td>
                    <td style={{alignContent:"flex-start"}}>
                        <div>
                            <div className="text-red-600 line-through inline-block text-[13px]">
                                ₹&nbsp;10,497
                            </div>
                            <div className="font-bold">
                                <div className="inline-flex">
                                    ₹&nbsp;14,577
                                    &nbsp;<svg class="bk-icon -iconset-info_sign" fill="#6B6B6B" height="14" width="14" viewBox="0 0 128 128" role="presentation" aria-hidden="true" focusable="false"><path d="M49.4 85l4.2-17.2c.7-2.7.8-3.8 0-3.8a29 29 0 0 0-8.8 3.8l-1.8-3A48 48 0 0 1 66.7 53c3.7 0 4.3 4.3 2.5 11l-5 18c-.7 3.3-.3 4.3.5 4.3a19 19 0 0 0 8.2-4L75 85c-8.6 8.7-18.2 12-21.8 12s-6.4-2.3-3.8-12zM75 36a9.2 9.2 0 0 1-9.2 9c-4.4 0-7-2.7-6.8-7a9 9 0 0 1 9.1-9c4.6 0 6.9 3.2 6.9 7z"></path><path d="M62 16a48 48 0 1 1-48 48 48 48 0 0 1 48-48m0-8a56 56 0 1 0 56 56A56 56 0 0 0 62 8z"></path></svg>
                                </div>
                            </div>
                            <div className="inline-flex text-[13px]">+₹&nbsp;756 taxes and fees</div>
                            <div>
                                <span className="bg-amber-600 text-white" style={{borderRadius: "4px"}}><span style={{padding: "0 5px 0 5px"}} className="text-[13px]">40% off</span></span>
                            </div>
                            <div>
                                <span className="bg-amber-600 text-white" style={{borderRadius: "4px"}}><span style={{padding: "0 5px 0 5px"}} className="text-[13px]">Gateway deal</span></span>
                            </div>
                        </div>
                    </td>
                    <td>
                        {columnFour()}
                    </td>
                    <td style={{alignContent:"flex-start"}}>
                        <Autocomplete
                            isRequired
                            key={""}
                            labelPlacement="outside"
                            placeholder="Select...."
                            
                            variant="bordered"
                            size="sm"
                            className="max-w-[6rem]"  
                            defaultSelectedKey={""}
                            value={selectedNumberOfRooms}
                            allowsCustomValue={true}
                            onInputChange={(value) => {
                                setSelectedNumberOfRooms(value)
                            }}
                        >
                            {Array.isArray(num) && num.map((item) => (
                                <AutocompleteItem value={item}  key={item}>{item}</AutocompleteItem>
                            ))}
                        </Autocomplete>
                    </td>
                </tr>


                <tr>
                    <td style={{alignContent:"flex-start"}}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M3 14s-1 0-1-1s1-4 6-4s6 3 6 4s-1 1-1 1zm5-6a3 3 0 1 0 0-6a3 3 0 0 0 0 6"></path></svg></td>
                    <td style={{alignContent:"flex-start"}}>
                        <div>
                            <div className="text-red-600 line-through inline-block text-[13px]">
                                ₹&nbsp;10,497
                            </div>
                            <div className="font-bold">
                                <div className="inline-flex">
                                    ₹&nbsp;14,577
                                    &nbsp;<svg class="bk-icon -iconset-info_sign" fill="#6B6B6B" height="14" width="14" viewBox="0 0 128 128" role="presentation" aria-hidden="true" focusable="false"><path d="M49.4 85l4.2-17.2c.7-2.7.8-3.8 0-3.8a29 29 0 0 0-8.8 3.8l-1.8-3A48 48 0 0 1 66.7 53c3.7 0 4.3 4.3 2.5 11l-5 18c-.7 3.3-.3 4.3.5 4.3a19 19 0 0 0 8.2-4L75 85c-8.6 8.7-18.2 12-21.8 12s-6.4-2.3-3.8-12zM75 36a9.2 9.2 0 0 1-9.2 9c-4.4 0-7-2.7-6.8-7a9 9 0 0 1 9.1-9c4.6 0 6.9 3.2 6.9 7z"></path><path d="M62 16a48 48 0 1 1-48 48 48 48 0 0 1 48-48m0-8a56 56 0 1 0 56 56A56 56 0 0 0 62 8z"></path></svg>
                                </div>
                            </div>
                            <div className="inline-flex text-[13px]">+₹&nbsp;756 taxes and fees</div>
                            <div>
                                <span className="bg-amber-600 text-white" style={{borderRadius: "4px"}}><span style={{padding: "0 5px 0 5px"}} className="text-[13px]">40% off</span></span>
                            </div>
                            <div>
                                <span className="bg-amber-600 text-white" style={{borderRadius: "4px"}}><span style={{padding: "0 5px 0 5px"}} className="text-[13px]">Gateway deal</span></span>
                            </div>
                        </div>
                    </td>
                    <td>
                        {columnFour()}
                    </td>
                    <td style={{alignContent:"flex-start"}}>
                        <Autocomplete
                            isRequired
                            key={""}
                            labelPlacement="outside"
                            placeholder="Select...."
                            
                            variant="bordered"
                            size="sm"
                            className="max-w-[6rem]"  
                            defaultSelectedKey={""}
                            value={selectedNumberOfRooms}
                            allowsCustomValue={true}
                            onInputChange={(value) => {
                                setSelectedNumberOfRooms(value)
                            }}
                        >
                            {Array.isArray(num) && num.map((item) => (
                                <AutocompleteItem value={item}  key={item}>{item}</AutocompleteItem>
                            ))}
                        </Autocomplete>
                    </td>
                </tr> */}
                
            </React.Fragment>
        )}})}
    </tbody>
</table>

                            </div>

<RoomModal showRoomModal={showRoomModal} onShowRoomModalClose={handleShowRoomModalClose} hotelName={hotelsData?.Hotel_name} hotelID={hotelsData?.Hotel_Id} roomResult={roomResult} clickedRoomName={clickedRoomName} clickedRoomId={clickedRoomId} clickedRoom={clickedRoom} roomAmenetities={roomAmenetities}/>

                            <div className="mt-4">
                                <div className="mt-1 h-screen w-full relative">
                                    <iframe width="100%" height="100%" loading="lazy" allowfullscreen="" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCaOQ6zhmT5Q_VAstgjZny78CARZBIbyTI&amp;q=19.084668900,73.027833600&amp;zoom=16 border:0px;">
                                    </iframe>
                                    <div className="bg-white w-full absolute top-0 h-24">
                                        <Divider className="w-full mt-1 my-2" />
                                        <h2 className="mt-6 text-black text-xl capitalize">
                                            {hotelsData?.Hotel_name} Location
                                        </h2>
                                    </div>
                                    <div className="box-border bg-gradient-to-b from-black/[85%] to-black/[48%] absolute rounded-lg top-24 h-16 w-full flex items-center justify-between px-4 space-x-2">
                                        <p className="text-base text-white">
                                            {hotelsData?.Address}
                                        </p>
                                        <a href={`https://maps.google.com/?q=${hotelsData?.latitude},${hotelsData?.longitude}`} target="_blank" className="flex items-center justify-center text-base h-10 w-40 bg-white rounded-lg text-primary shrink-0">
                                            Get Direction
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <Divider className="w-full mt-4 my-4" />
                            <div className="mt-6">
                                <h2 className="text-black text-lg capitalize">
                                    Customer Ratings for {hotelsData?.Hotel_name}</h2>
                                <div className="mt-4 flex items-center space-x-2">
                                    <Star className="h-6 w-6" fill="#FCB332" strokeWidth={0} />
                                    <span className="font-poppinsmedium text-black text-base">
                                        {hotelsData?.rating}
                                    </span>
                                    <span className="font-poppinsmedium text-black text-base">
                                        ({hotelsData?.user_review_count} Reviews)
                                    </span>
                                </div>
                                <div className="mt-10 grid grid-cols-2 gap-6 pr-8">
                                    <div className="flex items-center justify-between">
                                        <span className="text-black text-sm">
                                            Smooth Check-in
                                        </span>
                                        <div className="flex w-72 items-center justify-between space-x-10">
                                            <Progress color="warning" aria-label="Loading..." value={((hotelsData?.smooth_check_in - 1) * (100 - 1) / (5 - 1))} className="max-w-md" />
                                            <span className="w-2 text-black text-sm">
                                                {hotelsData?.smooth_check_in}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between ">
                                        <span className="text-black text-sm">
                                            Room Quality
                                        </span>
                                        <div className="flex w-72 items-center justify-between space-x-10">
                                            <Progress color="warning" aria-label="Loading..." value={((hotelsData?.room_quality - 1) * (100 - 1) / (5 - 1))} className="max-w-md" />
                                            <span className="w-2 text-black text-sm">
                                                {hotelsData?.room_quality}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between ">
                                        <span className="text-black text-sm">
                                            Staff Behaviour
                                        </span>
                                        <div className="flex w-72 items-center justify-between space-x-10">
                                            <Progress color="warning" aria-label="Loading..." value={((hotelsData?.staff_behaviour - 1) * (100 - 1) / (5 - 1))} className="max-w-md" />
                                            <span className="w-2 text-black text-sm">
                                                {hotelsData?.staff_behaviour}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-black text-sm">
                                            Hotel Surroundings
                                        </span>
                                        <div className="flex w-72 items-center justify-between space-x-10">
                                            <Progress color="warning" aria-label="Loading..." value={((hotelsData?.hotel_surroundings - 1) * (100 - 1) / (5 - 1))} className="max-w-md" />
                                            <span className="w-2 text-black text-sm">
                                                {hotelsData?.hotel_surroundings}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Divider className="w-full mt-4 my-4" />
                            <div className="mt-4">
                                <h2 className="text-black text-lg">
                                    Hotel Seven Oaks Policy
                                </h2>
                                <ul className="font-poppins text-gray-500 text-sm mt-4 pr-10 space-y-2 leading-2">
                                    {hotelsData.policy ? (
                                        hotelsData.policy.map((policyItem, index) => {
                                            return (
                                                <li className="flex" key={index}>
                                                    <Check className="h-4 w-4 text-lime-500 mt-1 mr-1" />
                                                    {policyItem}
                                                </li>
                                            );
                                        })
                                    ) : (
                                        <li>No policy information available</li>
                                    )}
                                </ul>
                                <Divider className="w-full mt-4 my-4" />
                                <div className="mt-4">
                                    <h2 className=" text-black text-lg">
                                        Hotel Seven Oaks Cancellation Policy
                                    </h2>
                                    <ul className="font-poppins text-gray-500 text-sm mt-4 pr-10 space-y-2 leading-2">
                                        {hotelsData.cancellation_policy ? (
                                            hotelsData.cancellation_policy.map((cancellation_policyItem, index) => {
                                                return (
                                                    <li className="flex" key={index}>
                                                        <Check className="h-4 w-4 text-lime-500 mt-1 mr-1" />
                                                        {cancellation_policyItem}
                                                    </li>
                                                );
                                            })
                                        ) : (
                                            <li>No policy information available</li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                            <Divider className="w-full mt-4 my-4" />


                            <div className="">
                                <div className=" text-black text-lg">Facilities of Hotel Jai Balaji, Paharganj, New Delhi Railway Station</div>
                                <div className=" text-black text-md mt-2">Great facilities! Review score, 8.6</div>
                                <div>
                                    <div className="text-[16px] font-bold mt-4">Most popular facilities</div>
                                    <div className="inline-flex flex-wrap gap-6 mt-4">
                                    {
                                        hotelTopFacilities && hotelTopFacilities.map((key) => {
                                            if (amenities_icons[key]) {
                                                return (
                                                    <span key={key} className="flex items-center space-x-6">
                                                        {amenities_icons[key]}
                                                    </span>
                                                );
                                            }
                                        })
                                    }
                                    </div>
                                    <div className="grid grid-cols-3 mt-4 gap-2">

                                        <div>
                                            {facilitiesCategory.map((item1, index) => {

                                                let abc = facilitiesCategory.length / 3;

                                                if(index <= (abc - 1)) {
                                                    return (<>
                                                        <div className="inline-flex font-bold mb-2 mt-4 gap-2">{amenities_icons[item1]} {item1}</div>
                                                        {hotelFandS.map((item) => {
        
                                                            if(item1 === item.fands_category) {
                                                                if(item.fands_category === "Top facilities") {
        
                                                                }else {
                                                                    return (<>
                                                                    <div className="block">
                                                                        <div className="inline-flex mb-2"><Check style={{height:"1rem", color:"green"}}/> <p className="text-sm ml-4">{item.fands_item}</p></div>
                                                                    </div>
                                                                    </>)
                                                                }
                                                            }
        
                                                            //area wise show karna hai idhar pe
        
                                                        })}
        
                                                        </>)
                                                }
                                            })}
                                        </div>

                                        <div>
                                            {facilitiesCategory.map((item1, index) => {

                                                let abc = facilitiesCategory.length / 3; // 2

                                                let xyz = facilitiesCategory.length - abc; // 4

                                                if(index > (abc - 1) && index < xyz) {
                                                    return (<>
                                                        <div className="inline-flex font-bold mb-2 mt-4 gap-2">{amenities_icons[item1]} {item1}</div>
                                                        {hotelFandS.map((item) => {

                                                            if(item1 === item.fands_category) {
                                                                if(item.fands_category === "Top facilities") {

                                                                }else {
                                                                    return (<>
                                                                    <div className="block">
                                                                        <div className="inline-flex mb-2"><Check style={{height:"1rem", color:"green"}}/> <p className="text-sm ml-4">{item.fands_item}</p></div>
                                                                    </div>
                                                                    </>)
                                                                }
                                                            }

                                                            //area wise show karna hai idhar pe

                                                        })}

                                                        </>)
                                                }
                                                })}
                                        </div>

                                        <div>
                                            {facilitiesCategory.map((item1, index) => {

                                                let abc = facilitiesCategory.length / 3; // 2

                                                let xyz = facilitiesCategory.length - abc; // 4

                                                if(index >= xyz) {
                                                    return (<>
                                                        <div className="inline-flex font-bold mb-2 mt-4 gap-2">{amenities_icons[item1]} {item1}</div>
                                                        {hotelFandS.map((item) => {

                                                            if(item1 === item.fands_category) {
                                                                if(item.fands_category === "Top facilities") {

                                                                }else {
                                                                    return (<>
                                                                    <div className="block">
                                                                        <div className="inline-flex mb-2"><Check style={{height:"1rem", color:"green"}}/> <p className="text-sm ml-4">{item.fands_item}</p></div>   
                                                                    </div>
                                                                        
                                                                    </>)
                                                                }
                                                            }

                                                            //area wise show karna hai idhar pe

                                                        })}

                                                        </>)
                                                }
                                                })}
                                        </div>

                                       
                                        
                                         
                                        
                                    </div>
                                </div>
                            </div>

                            <Divider className="w-full mt-4 my-4" />
                            <div className="mt-4">
                                <h3 className="text-black text-lg">
                                    Similar Hotel in {hotelsData?.Location} Like {hotelsData?.Hotel_name}
                                </h3>
                                <div className="pb-2 w-full ml-10 mt-6">
                                    <div>
                                        <Carousel
                                            opts={{
                                                align: "start",
                                            }}
                                            className="w-[89%] ml-2"
                                        >
                                            <CarouselContent>
                                                {hotelsDataForCorouselCards && hotelsDataForCorouselCards.map((hotel, index) => (
                                                    <>
                                                        <CarouselItem key={index} className="basis-1/2 bg-transparent mr-2">
                                                            <div className="">
                                                                <Card className="w-[90%]">
                                                                    <CardBody className="flex w-full rounded-lg bg-white">
                                                                        <Image
                                                                            width={400}
                                                                            height={250}
                                                                            isZoomed
                                                                            className="rounded-xl"
                                                                            alt={hotel?.Hotel_name}
                                                                            src={'/img/' + [hotel?.Hotel_name?.toString()?.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join("")] + '/1.jpg'}
                                                                        />
                                                                        <div className="mt-3 flex items-center justify-between">
                                                                            <span className="text-base text-black">
                                                                                {hotel?.Hotel_name}
                                                                            </span>
                                                                            <span className="flex items-center text-sm text-secondary">
                                                                                <Star className="h-6 w-6" fill="#8b5cf6" strokeWidth={0} />
                                                                                <p className="underline">
                                                                                    {hotel?.rating}&nbsp;
                                                                                </p>
                                                                                <p className="underline font-poppins">
                                                                                    ({hotel?.user_review_count})
                                                                                </p>
                                                                            </span>
                                                                        </div>
                                                                        <p className="mt-1 text-sm text-gray-500 font-poppins">
                                                                            {hotel?.Location}
                                                                        </p>
                                                                        <div className="flex items-center justify-between mt-8">
                                                                            <span>
                                                                                <p className="text-sm text-primary">
                                                                                    {hours}Hrs
                                                                                </p>
                                                                                <span className="flex items-center space-x-3">
                                                                                    <p className="text-sm text-primary">
                                                                                        ₹ {hotel?.final_display_price_for_3H}
                                                                                    </p>
                                                                                    <span className="line-through text-base text-gray-500">
                                                                                        3368
                                                                                    </span>
                                                                                </span>
                                                                            </span>
                                                                            <Button variant="bordered" color="" className="border-1 border-primary-200 text-primary-500" size="md" onClick={(e) => window.location.href = `${hotel.Hotel_name}?hotelName=${hotel.Hotel_name}&hour=${hours}&hotelId=${hotel.Hotel_Id}`}>
                                                                                View Hotel
                                                                            </Button>
                                                                        </div>
                                                                    </CardBody>
                                                                </Card>
                                                            </div>
                                                        </CarouselItem></>
                                                ))}
                                            </CarouselContent>
                                            <CarouselPrevious className="text-purple-600 bg-slate-100 border-none shadow-lg" />
                                            <CarouselNext className="text-purple-600 bg-slate-100 border-none shadow-lg" />
                                        </Carousel>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-[32%]">
                        <div className="w-[95%] mx-auto sticky top-10 h-fit z-20">
                            <div className="bg-primary/70 h-12 p-1 rounded-t-lg flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                    <img className="w-10 h-10" src="https://site-img-res-new.s3.ap-south-1.amazonaws.com/next-site-images/offerpng.png" />
                                    <p className="text-sm text-white">
                                        Get Upto 25% OFF on Bookings
                                    </p>
                                </div>
                                <Button variant="shadow" color="primary" size="sm">Apply Coupon</Button>
                            </div>
                            <div className="bg-white w-full rounded-b-lg shadow-xl pt-4 pb-2 h-fit">
                                <div className="w-[98%] mx-auto">
                                    <p className="text-black text-base">
                                        Your Booking Summary
                                    </p>
                                    <div >
                                        <div className="border-purple-200 w-full mt-2 bg-white rounded-lg border-1">
                                            <DateTimeCombo onDateChange = {handleDateChange} onTimeChange = {handleSelectedTime}/>
                                        </div>
                                        <div className="border-purple-200 w-full mt-2 bg-white rounded-lg border-1">
                                            <div className="w-[50%] mx-auto">
                                                <RoomsAndGuests onAdultsSelect={handleAdultsSelect} onChildSelect={handleChildSelect} onInfantsSelect={handleInfantsSelect} onRoomsSelect={handleRoomsSelect} onPetsSelect={handlePetsSelect} />
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mt-4 text-gray-500 text-base">
                                        Select Your Slot
                                    </p>
                                    <div className="py-3 w-full mt-2 rounded-lg bg-slate-100">
                                        <div className="mx-auto w-[95%]">
                                            <RadioGroup
                                                defaultValue={hours + "-hrs"}
                                                value={selectedRadioValue}
                                                onValueChange={setSelectedRadioValue}
                                            >
                                                <CustomRadio value="3-hrs">
                                                    <div className="text-primary-500 flex items-center justify-between w-[300px]">
                                                        <div>
                                                            ₹ {lowestRatesObjectsArray ? lowestRatesObjectsArray?.rate_3hr : ""}
                                                        </div>

                                                        <p className="text-sm text-primary-500">
                                                            3 Hrs
                                                        </p>
                                                    </div>
                                                </CustomRadio>
                                                <CustomRadio value="6-hrs">
                                                    <div className="text-primary-500 flex items-center justify-between w-[300px]">
                                                        ₹ {lowestRatesObjectsArray ? lowestRatesObjectsArray?.rate_6hr : ""}

                                                        <p className="text-sm text-primary-500">
                                                            6 Hrs
                                                        </p>
                                                    </div>
                                                </CustomRadio>
                                                <CustomRadio value="12-hrs">
                                                    <div className="text-primary-500 flex items-center justify-between w-[300px]">
                                                        ₹ {lowestRatesObjectsArray ? lowestRatesObjectsArray?.rate_12hr : ""}

                                                        <p className="text-sm text-primary-500">
                                                            12 Hrs
                                                        </p>
                                                    </div>
                                                </CustomRadio>
                                            </RadioGroup>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-4">
                                        <span>
                                            <p className="text-sm text-gray-500">
                                                Total Price
                                            </p>
                                            <span className="flex items-center space-x-3">
                                                <p className="text-xl  text-gray-500 font-semibold">
                                                    ₹ 3360
                                                </p>
                                            </span>
                                        </span>
                                        <Button color="secondary" variant="shadow" size="md" onClick={(e) => {handleBookings(hotelsData, selectedDate,selectedTime,selectedRadioValue,adultsSelect,childSelect,infantsSelect,roomsSelect,petsSelect);
                                            router.push(`${hotelsData?.Hotel_name}/paymentoptions?hotelid=${hotelsData?.Hotel_Id}&checkin-date=${!dateChangeFlag ? `${new Date(selectedDate).getDate().toString().padStart(2, '0')}-${(new Date(selectedDate).getMonth() + 1).toString().padStart(2, '0')}-${new Date(selectedDate).getFullYear().toString()}` : selectedDate}&checkin-time=${!timeChangeFlag ? ((new Date().getHours() + 1) % 24).toString().padStart(2, '0').toString() : (selectedTime?.getHours().toString().padStart(2, '0')).toString() }&hours=${parseInt(selectedRadioValue.split('-')[0])}&adults=${adultsSelect}&child=${childSelect}&infants=${infantsSelect}&rooms=${roomsSelect}&pets=${petsSelect}`)}}
                                            style={lowestRatesObjectsArray === undefined ? { pointerEvents: 'none', opacity: 0.5 } : {}}>
                                            
                                            Reserve Now
                                        </Button>
                                    </div>
                                    <div>
                                        <h4 className="text-sm mt-4 bg-red-500/20 px-4 py-1 rounded-lg border-red-500 border-1">
                                            Selected time is not available for booking, please try any other check-in time or date.
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <div className="text-xs font-poppins text-center text-gray-500 mt-5">
                                By clicking ‘Reserve Now’ Button, you agree to our
                                <a href="/terms-and-conditions" target="_blank" className="text-primary">
                                    T&amp;C
                                </a>
                                and
                                <a href="/hotel-policies" target="_blank" className="text-primary">
                                    Hotel Policies
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function HotelPage() {
    return (
        <SessionProvider>
            <HotelPagee />
        </SessionProvider>
    );
}