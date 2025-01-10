'use client'
import React, { useState, useEffect, useCallback, useRef } from "react";
import DateTimeCombo from '@/_components/ui/DateTimeCombo'
import { CiCirclePlus } from "react-icons/ci";
import { AiOutlineShareAlt } from "react-icons/ai";
import Image from 'next/image'
import { Button, Chip, Divider } from "@nextui-org/react";
import { IMAGES } from '@/public/index'
import Link from 'next/link'
import { Crown, Star, StarHalf, MapPin, Heart, Hotel, CreditCard, Wifi, AirVent, Tv, Milk, ParkingSquare } from 'lucide-react';
import { Badge } from "@/_components/ui/Badge";
import ImgCarousel from "@/_components/ui/ImgCarousel"
import { SessionProvider, useSession, getSession, signIn, signOut } from 'next-auth/react'

const HourlyStayy = () => {

  const [result, setResult] = useState([]);
  const [filteredResult, setFilteredResult] = useState([]);
  const [hotelsFacilities, setHotelsFacilities] = useState([]);
  const { data: session, update ,status } = useSession()
  let user_Id = session?.user?.user_id;
  let fav = session?.user?.favourites;
  let a = [];
  const initialFxn = async (user_Id) => {

    try {
        const response1 = await fetch(`/api/userApi?userID=${user_Id}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
        });
        const result1 = await response1.json();

        if(result1.data_by_id) {
          update({ favourites: result1.data_by_id.favourites });
          fav = session?.user?.favourites;
          search_facilities(fav)
        }


        const response = await fetch(`/api/hotels/hotel_info`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();
        setResult(result.data)

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

  useEffect(() => {

          initialFxn(user_Id);

  }, [user_Id])

  useEffect(() => {

    if (fav) {
      let filteredResultss = result?.filter(hotel => fav.includes(hotel.Hotel_Id));
      setFilteredResult(filteredResultss)
    }

  }, [result,fav])


  async function search_facilities(h_ID) {

    const response = await fetch("/api/hotels/hotel_info/hotel_by_city", {
      method: "POST",
      body: JSON.stringify({ h_ID })
    });
    const result = await response.json();
    setHotelsFacilities(result.facilities)
  }

  // useEffect(() => {

  //   console.log("HotelFaccccc::::::::>",hotelsFacilities)

  // }, [hotelsFacilities])

  function popAllElements(array) {
    while (a.length > 0) {
        a.pop();
    }
  }

  return (
  <>
    <div className='flex space-x-2'>
    <DateTimeCombo />
  </div>
    {session 
      ? filteredResult && filteredResult?.map((hotel, index) => (
// eslint-disable-next-line react/jsx-key
<div className="flex w-full h-full flex-col relative">
      <div className='flex justify-between'>
        <div></div>
        <div className='space-x-2'>
          <Button color='primary' variant='flat' startContent={<AiOutlineShareAlt size={25} />}>Share</Button>
          <Button color='success' variant='flat' startContent={<CiCirclePlus size={25} />}>Create Wishlist</Button>
        </div>
      </div>
      {/* #####container */}
      <div className="flex shadow-lg rounded-xl hover:outline outline-primary-100 outline-[2.5px] w-[98%] mx-auto bg-white mt-4">
        <div className="w-[40%] h-full">
          <div className="ml-2 pt-4 pl-2 relative">
            <ImgCarousel hotelName={hotel.Hotel_name} />
          </div>
        </div>
        <div className="w-[60%] h-full">
          <div className="h-full w-full p-3 flex flex-col border-gray-400">
            <div className="relative w-full">
              <a href={`bookings/hourlybooking/hotels/${hotel.Hotel_name}?hotelName=${hotel.Hotel_name}&hotelId=${hotel.Hotel_Id}`}>
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
                    <Link href='#' title="Hotel Shubham Inn"
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
                  {hotelsFacilities[index]?.Car_park === true ? <><ParkingSquare className="text-gray-500" /> {void a.push("Sam")}</> : ""}
                  {hotelsFacilities[index]?.Air_conditioning_in_public_areas === true ? <><AirVent className="text-gray-500" /> {void a.push("Sam")}</> : ""}
                  {hotelsFacilities[index]?.wi_fi === true ? <><Wifi className="text-gray-500" /> {void a.push("Sam")}</> : ""}

                  <p className="cursor-pointer mt-2">
  +{hotelsFacilities[index] ? Object.keys(hotelsFacilities[index]).length - 3 - a.length : 0}&nbsp;more{popAllElements(a)}
</p>

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
    </div>
      ))
      : "" }
      </>
  )
}

// export default HourlyStay

export default function HourlyStay() {
  return (
      <SessionProvider>
          <HourlyStayy />
      </SessionProvider>
  );
}