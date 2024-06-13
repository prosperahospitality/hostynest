'use client'
import React, { useState, useEffect } from "react";
import { Breadcrumbs, BreadcrumbItem, Button, Skeleton, Card, CardFooter, Progress, Divider, CardBody, RadioGroup, Radio, cn, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { Crown, Dot, Star, MapPin, Heart, Share2, Hotel, CreditCard, Search, Wifi, AirVent, Tv, Milk, ParkingSquare, MessageCircleHeart, Wallet, BatteryCharging, Refrigerator, WashingMachine, Cctv, Check } from 'lucide-react';
import { Badge } from "@/app/_components/ui/Badge";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/app/_components/ui/Carousel"
import RoomsAndGuests from "@/app/_components/ui/RoomsAndGuests";
import HotelName, { IMAGES } from '@/public/index'
import { useSearchParams } from 'next/navigation'
import LoginFunc from "@/app/(auth)/login/LoginFunc";
import amenities_icons from "./hotelAmenitiesIcons";
import Swal from 'sweetalert2'
import { SessionProvider, useSession, getSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import DateTimeCombo from '@/app/_components/ui/DateTimeCombo'
import ImageModal from "@/app/(booking)/bookings/hourlybooking/hotels/[hotelname]/ImageModal";
import RoomModal from "@/app/(booking)/bookings/hourlybooking/hotels/[hotelname]/RoomModal";
import Daterangepickerreact from '@/app/_components/ui/DateRangePickerReact'
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
    const searchParams = useSearchParams()
    let hours = searchParams.get('hour')
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

        //console.log("Radion Value: ", selectedRadioValue);
    }, [selectedRadioValue])

    useEffect(() => {

        
        console.log("Selected Date useeffect: ",selectedDate)

    }, [selectedDate])

    useEffect(() => {

        console.log("Session At Bookings Page: ", sessionValue);
        setFav(sessionValue?.user?.favourites);

    }, [sessionValue])

    const hotelName = searchParams.get('hotelName')
    const hotelId = searchParams.get('hotelId')

    let results = [];

    // if(!hours) {
    //     q = 3;
    // }

    async function search_hotels_by_id(hotelId) {

        console.log("Inside search_hotels_by_id");

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

        console.log("Result Data::::::::>", hotelsData?.policy);
        setHotelsData(hotelsAllData.data)
        setHotelsDataFacility(hotelsAllData.facilities)

    }, [hotelsAllData]);

    useEffect(() => {

        console.log("Facility::::::::>", hotelsDataFacility);

    }, [hotelsDataFacility]);


    useEffect(() => {

        if (hotelsData) {
            console.log("Data::::::::>", hotelsData.rating);

            const initialFxn = async () => {
                try {
                    const response = await fetch(`/api/pms/property_master/room_details?hotelId=${(hotelsData.Hotel_Id).toString()}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    const result = await response.json();
          
                    console.log("Property Rooms: ",result.dataActive)
                    
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
          
                initialFxn()

        } else {
            console.log("Data is not available yet");
        }
    }, [hotelsData]);

    useEffect(() => {

        search_hotels_by_id(hotelId)

    }, [hotelId]);


    useEffect(() => {
        console.log("fav:", fav);
        console.log("hotelsData?.Hotel_Id:", hotelsData?.Hotel_Id);
        if (fav?.length > 0 && fav.includes(hotelsData?.Hotel_Id)) {
            setIsToggled(true);
        } else {
            setIsToggled(false);
        }

        console.log("isToggled:", isToggled);
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
                    console.log("Stream is done.");
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
        console.log("Hotels dAta for Corousel: ", hotelsDataForCorouselCards);
    }, [hotelsDataForCorouselCards]);


    ///////////////////////////////////////////////////////////////////////////////////

    const handleHotelsImgs = (Imgs) => {
        setHotelImgs(Imgs);
    }

    useEffect(() => {

        console.log("Hotel Images: ", hotelImgs);

    }, [hotelImgs]);

    useEffect(() => {
        console.log("ResultAll:::::>",resultAll)
        async function dat() {
            const response = await fetch("/api/userApi/bookings", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
            console.log("REsulttttttttttttt::::::::>",result.data_All)
            let result_All = result.data_All;
             if (result_All && result_All.length > 0) {
            const lastElement = result_All[result_All.length - 1]; // Get the last element
            console.log("REsulttttttttttttt::::::::>",lastElement)
            const lastElementId = lastElement.booking_id; // Extract the id property from the last element
            console.log("REsulttttttttttttt::::::::>",lastElementId)
            const numericPart = lastElementId ? lastElementId.match(/(?<=BK)0*(\d+)/) : null; // Extract numeric part using regular expression
            const lastNumericId = numericPart ? parseInt(numericPart[1]) : null;
            console.log("Numeric ID of the last element:", lastNumericId);
            setLastID(lastNumericId);
        } else {
            console.log("No elements in the array.");
            setLastID(0);
        }
        }

        dat()

       

    }, [resultAll,handleBookings]);


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
    console.log("Favourites:::::::>", added_favourite);


    const handleFavouriteOnHover = () => {
        console.log("Hovered");
    };

    const handleAddToFavourite = async () => {

        setIsToggled(prevToggle => !prevToggle);
        console.log("Toggling: ", isToggled);

        let hotel_ID = hotelsData?.Hotel_Id;
        let user_id = sessionValue?.user?.user_id;

        let action = isToggled ? "delete" : "add";

        console.log("Favourite Clicked", user_id, hotel_ID);

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
                    console.log("Stream is done.");
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

        console.log("Resp::::>", resp);

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
    console.log("Result Data::::::::>", { "date": selectedDate, "time": selectedTime, "radio value": parseInt(selectedRadioValue.split('-')[0]), "adults": adultsSelect, "child": childSelect, "infants": infantsSelect, "rooms": roomsSelect, "pets": petsSelect });

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
        console.log("Last IF:",lastID)
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
            console.log("selectedDate Inside if")
            let formatted_date = `${new Date(selectedDate).getDate().toString().padStart(2, '0')}-${(new Date(selectedDate).getMonth() + 1).toString().padStart(2, '0')}-${new Date(selectedDate).getFullYear().toString()}`;
            selectedDate = formatted_date.toString(); 
        }else{
            console.log("selectedDate Inside else")
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
        console.log("show image modal")
        setShowImageModal(true)
    }

    const handleShowImageModalClose = (val) => {
        if(val === true) {
            setShowImageModal(false)
        }
    }

    const handleRoomLinkClick = (e, roomname, roomid, room) => {
        console.log("Clickedasdfasd", roomname, roomid)
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

    return (
        <div className="w-screen h-full">
            <div className="py-16 w-[96%] mx-auto">
                <Breadcrumbs>
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <BreadcrumbItem>Navi Mumbai Hotels</BreadcrumbItem>
                    <BreadcrumbItem className="capitalize">{hotelsData?.Hotel_name}</BreadcrumbItem>
                </Breadcrumbs>
                <h1 className="text-4xl text-foreground px-2 py-2 capitalize">{hotelsData?.Hotel_name}</h1>
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

                <div className="mt-5 flex mx-auto w-full h-full">
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
                                <h2 className="text-black text-xl">
                                    Amenities at {hotelsData?.Hotel_name}
                                </h2>
                                <div className="grid grid-cols-3 gap-9 mt-8">
                                    {
                                        Object.entries(hotelsDataFacility).map(([key, value]) => {
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
                    className='bg-background rounded-lg border-2 border-gray-300 h-9 w-66 overflow-hidden'
                    initialDate={initialDate} 
                    onDateValue= {handleDateSelect}
                />
          </div>

          <Divider orientation="vertical" className="h-16" />

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
            <th>Room Type</th>
            <th>Number of guests</th>
            <th>Price for 3 nights</th>
            <th>Your Choices</th>
            <th>Select Rooms</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        {roomResult && roomResult.map((item, index) => (
            <React.Fragment key={index}>
                <tr>
                    <td rowSpan="3"><a onClick={(e) => handleRoomLinkClick(e, item.room_name, item.id, item)}><u class="roomlink"><p class="roomlink">{item.room_name}</p></u></a></td>
                    <td>Row 1, Column 2</td>
                    <td>Row 1, Column 3</td>
                    <td>Row 1, Column 4</td>
                    <td>Row 1, Column 5</td>
                    {index === 0 && (<td rowSpan="0">
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
                <tr>
                    <td>Row 2, Column 2</td>
                    <td>Row 2, Column 3</td>
                    <td>Row 2, Column 4</td>
                    <td>Row 2, Column 5</td>
                </tr>
                <tr>
                    <td>Row 3, Column 2</td>
                    <td>Row 3, Column 3</td>
                    <td>Row 3, Column 4</td>
                    <td>Row 3, Column 5</td>
                </tr>
                {/* {index === 0 && (
                    <tr>
                        <td rowSpan="0">
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
                        </td>
                    </tr>
                )} */}
            </React.Fragment>
        ))}
    </tbody>
</table>

                            </div>

<RoomModal showRoomModal={showRoomModal} onShowRoomModalClose={handleShowRoomModalClose} hotelName={hotelsData?.Hotel_name} hotelID={hotelsData?.Hotel_Id} roomResult={roomResult} clickedRoomName={clickedRoomName} clickedRoomId={clickedRoomId} clickedRoom={clickedRoom}/>

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
                                    <div className="flex items-center justify-between ">
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
                                                                    <CardBody className="flex w-full rounded-lg">
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
                                                            ₹ {hotelsData?.final_display_price_for_3H}
                                                        </div>

                                                        <p className="text-sm text-primary-500">
                                                            3 Hrs
                                                        </p>
                                                    </div>
                                                </CustomRadio>
                                                <CustomRadio value="6-hrs">
                                                    <div className="text-primary-500 flex items-center justify-between w-[300px]">
                                                        ₹ {hotelsData?.final_display_price_for_6H}

                                                        <p className="text-sm text-primary-500">
                                                            6 Hrs
                                                        </p>
                                                    </div>
                                                </CustomRadio>
                                                <CustomRadio value="12-hrs">
                                                    <div className="text-primary-500 flex items-center justify-between w-[300px]">
                                                        ₹ {hotelsData?.final_display_price_for_12H}

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
                                            router.push(`${hotelsData?.Hotel_name}/paymentoptions?hotelid=${hotelsData?.Hotel_Id}&checkin-date=${!dateChangeFlag ? `${new Date(selectedDate).getDate().toString().padStart(2, '0')}-${(new Date(selectedDate).getMonth() + 1).toString().padStart(2, '0')}-${new Date(selectedDate).getFullYear().toString()}` : selectedDate}&checkin-time=${!timeChangeFlag ? ((new Date().getHours() + 1) % 24).toString().padStart(2, '0').toString() : (selectedTime?.getHours().toString().padStart(2, '0')).toString() }&hours=${parseInt(selectedRadioValue.split('-')[0])}&adults=${adultsSelect}&child=${childSelect}&infants=${infantsSelect}&rooms=${roomsSelect}&pets=${petsSelect}`)}}>
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