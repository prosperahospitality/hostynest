'use client'
import React, { useState, useEffect, useMemo } from 'react';
import LoginFunc from "@/app/(auth)/login/LoginFunc";
import { ChevronLeft, BadgeCheck } from 'lucide-react'
import { Input } from "@nextui-org/react";
import { Button, Image, Divider } from "@nextui-org/react";
import { useSearchParams } from 'next/navigation'
import { SessionProvider, useSession, getSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation';

function PaymentOptionss() {
    const [guestfullname, setGuestfullname] = useState('mrcybOrg Hacker');
    const [email, setEmail] = useState('rsgm1821999@gmail.com');
    const [mobile_number, setMobileNumber] = useState('7678030010');
    const [hotelsAllData, setHotelsAllData] = useState([]);
    const [hotelsData, setHotelsData] = useState({});
    const [hotelsDataFacility, setHotelsDataFacility] = useState({});
    const searchParams = useSearchParams()

    const hotelId = searchParams.get('hotelid');
    const checkin_date = searchParams.get('checkin-date');
    const checkin_time = searchParams.get('checkin-time');
    const hours = searchParams.get('hours');
    const adults = searchParams.get('adults');
    const child = searchParams.get('child');
    const infants = searchParams.get('infants');
    const rooms = searchParams.get('rooms');
    const pets = searchParams.get('pets');
    const [guestInfoFlag, setGuestInfoFlag] = useState(false);
    const [paymentFlag, setPaymentFlag] = useState(false);
    const [loginFlag, setLoginFlag] = useState(false);
    const [editFlag, setEditFlag] = useState(false);
    const router = useRouter();
    
    console.log("Hotel Is: ",hotelId);
    const { data: session, update ,status } = useSession()

    const validateEmail = (email) => email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    const isInvalid = useMemo(() => {
        if (email === "") return false;
        return validateEmail(email) ? false : true;
    }, [email]);
    let results= [];

    const handleMobileChange = (event) => {
        const value = event.target.value;
        const sanitizedValue = value.replace(/\D/g, '').slice(0, 10);
        setMobileNumber(sanitizedValue);
        console.log("Mobile Number::::::>", mobile_number);
    };

    useEffect(() => {
    
        console.log("Session At Payments Page: ",session);
        
      }, [session])

    async function search_hotels_by_id(hotelId) {

        console.log("Inside search_hotels_by_id");

        results = await fetch("/api/hotels/hotel_info/hotel_by_id", {
          method: "POST",
          body: JSON.stringify({ hotelId })
        });

    
        let stream = results.body;

        console.log("Stream:::::>",stream);
    
    
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

        search_hotels_by_id(hotelId)

      }, [hotelId]);

      useEffect(() => {

        console.log("Result Data::::::::>",hotelsAllData);
        setHotelsData(hotelsAllData.data)
        setHotelsDataFacility(hotelsAllData.facilities)

      }, [hotelsAllData]);


      const handleGuestInfo = () => {
        console.log("Handle Guest:::::::::::>");
        setGuestInfoFlag(true);
      }

      const handleEdit = () => {
        setEditFlag(true)
        setGuestInfoFlag(false)
      }

    return (
        <>
            <div className="w-full h-full bg-white pt-10 pb-32 overflow-y-auto">
                <div className="cursor-pointer mt-6 ml-10 flex items-center space-x-6 w-fit">
                    <ChevronLeft onClick = {(e) => router.push(`/bookings/hourlybooking/hotels/${hotelsData?.Hotel_name}?hotelName=${hotelsData?.Hotel_name}&hour=${hours}&hotelId=${hotelsData?.Hotel_Id}`)}/>
                    <span className="text-black text-sm">
                        Go Back to Details Page
                    </span>
                </div>
                <div className="px-14 flex mt-4 space-x-9">
                    <div className="w-1/2 space-y-6">
                        {!session 
                        ? <div className="pb-20 w-full border-1 border-gray-500 rounded-lg text-sm text-black">
                        <div className="flex items-center justify-between">
                            <div className="h-10 bg-secondary w-full rounded-lg pl-3 flex items-center space-x-6">
                                <span className="text-black rounded-lg flex items-center justify-center bg-white w-8 h-8">
                                    1</span>
                                <span className="text-white">
                                    Please Login to Proceed
                                </span>
                            </div>
                            </div>
                            <div className="mt-9 w-6/7 px-20 text-left">
                                < LoginFunc loginFlag = {loginFlag}/>
                            </div>
                        </div>
                        : <div class="w-full border-1 border-gray-500 rounded-lg text-sm text-black">
                        <div class="flex items-center justify-between">
                            <div class="h-12 w-full rounded-lg pl-3 flex items-center space-x-6">
                                <span class="text-black rounded-lg flex items-center justify-center bg-white w-8 h-8">
                                    1
                                </span>
                                <span class="text-black ">
                                    Login
                                </span>
                            </div>
                            <BadgeCheck className="h-10 w-10 mr-4 text-white" fill="#84cc16" />
                            </div>
                        </div>
                        }

                        {guestInfoFlag 
                        ? <div class="w-full border-1 border-gray-500 rounded-lg text-sm text-black">
                        <div class="flex items-center justify-between">
                            <div class="h-12 w-full rounded-lg pl-3 flex items-center space-x-6">
                                <span class="text-black rounded-lg flex items-center justify-center bg-white w-8 h-8">
                                    2
                                </span>
                                <span class="text-black ">
                                    Guest Information
                                </span>
                            </div>
                            <Button onClick={handleEdit}>Edit</Button> <BadgeCheck className="h-10 w-10 mr-4 text-white" fill="#84cc16" />
                        </div>
                    </div>
                        : !session 
                            ? <div class={`w-full border-1 border-gray-500 rounded-lg text-sm text-black ${!guestInfoFlag ? 'opacity-50 pointer-events-none' : ''}`}>
                            <div class="flex items-center justify-between">
                                <div class="h-12 w-full rounded-lg pl-3 flex items-center space-x-6">
                                    <span class="text-black rounded-lg flex items-center justify-center bg-white w-8 h-8">
                                        2
                                    </span>
                                    <span class="text-black ">
                                        Guest Information
                                    </span>
                                </div>
                            </div>
                        </div>
                            : <div className="pb-20 w-full border-1 border-gray-500 rounded-lg text-sm text-black">
                                {editFlag 
                                ? <div class="w-full border-1 border-gray-500 rounded-lg text-sm text-black">
                                <div class="flex items-center justify-between">
                                    <div class="h-12 w-full rounded-lg pl-3 flex items-center space-x-6">
                                        <span class="text-black rounded-lg flex items-center justify-center bg-white w-8 h-8">
                                            2
                                        </span>
                                        <span class="text-black ">
                                            Guest Information
                                        </span>
                                    </div>
                                    <Button onClick={handleEdit}>Edit</Button> <BadgeCheck className="h-10 w-10 mr-4 text-white" fill="#84cc16" />
                                </div>
                            </div>
                                : <div className="flex items-center justify-between">
                                <div className="h-10 bg-secondary w-full  rounded-lg pl-3 flex items-center space-x-6">
                                    <span className="text-black rounded-lg flex items-center justify-center bg-white w-8 h-8">
                                        2
                                    </span>
                                    <span className="text-black">
                                        Guest Information
                                    </span>
                                </div>
                            </div>
                                }
                               
                        <div className="mt-9 px-20 text-left">
                            <span className="">
                                Enter Details
                            </span>
                            <div className="mt-3 flex flex-col space-y-4">
                                <Input
                                    className="inline-flex w-full"
                                    type="text"
                                    placeholder="Guest’s Full Name"
                                    variant="bordered"
                                    value={guestfullname}
                                    onChange={(e) => setGuestfullname(e.target.value)}
                                />
                                <Input
                                    isRequired
                                    className="inline-flex w-full"
                                    type="email"
                                    placeholder="Guest’s E-mail"
                                    variant="bordered"
                                    onValueChange={setEmail}
                                    value={email}
                                    isInvalid={isInvalid}
                                    color={isInvalid ? "danger" : "success"}
                                    errorMessage={isInvalid && "Please enter a valid email"}
                                />
                                <Input
                                    className="inline-flex w-full\"
                                    type="text"
                                    placeholder="Guest’s Phone Number"
                                    variant="bordered"
                                    value={mobile_number}
                                    onChange={handleMobileChange}
                                />
                            </div>
                            <Button
                                color="secondary"
                                variant="shadow"
                                className="inline-flex w-full mt-6"
                                onClick = {handleGuestInfo}
                            >
                                Save &amp; Proceed to Pay
                            </Button>
                        </div>
                        <div className="px-40 text-left mt-4 text-black font-poppins text-sm">
                            Read our <a href="/privacy" target="_blank" className="underline">
                                Privacy Policy
                            </a>
                            and <a href="/terms-and-conditions" target="_blank" className="underline">
                                Terms &amp; Conditions</a>
                        </div>
                    </div>
                        }
                        

                        {paymentFlag 
                        ? <div class="w-full border-1 border-gray-500 rounded-lg text-sm text-black">
                        <div class="flex items-center justify-between">
                            <div class="h-12 w-full rounded-lg pl-3 flex items-center space-x-6">
                                <span class="text-black rounded-lg flex items-center justify-center bg-white w-8 h-8">
                                    3
                                </span>
                                <span class="text-black ">
                                    Select Payment Method
                                </span>
                            </div>
                            <BadgeCheck className="h-10 w-10 mr-4 text-white" fill="#84cc16" />
                        </div>
                    </div>
                        : guestInfoFlag 
                            ? <div class="w-full border-1 border-gray-500 rounded-lg text-sm text-black">
                            <div class="flex items-center justify-between ">
                                <div class="h-16 bg-secondary w-full rounded-lg pl-3 flex items-center space-x-6">
                                    <span class="text-black rounded-lg flex items-center justify-center bg-white w-8 h-8">
                                        3
                                    </span>
                                    <span class="text-black">
                                        Select Payment Method
                                    </span>
                                </div>
                            </div>
                            <div class="h-screen" id="juspayDiv">
                                <iframe src="https://api.juspay.in/orders/ordeh_86cd9eea62174a1bb50396997ecd15a7/payment-page" id="juspay-iframe" allow="payment *;" width="100%" height="100%" class="  z-50 block     inset-0  overflow-hidden">
                                </iframe>
                            </div>
                        </div>
                            : <div class={`w-full border-1 border-gray-500 rounded-lg text-sm text-black ${!guestInfoFlag ? 'opacity-50 pointer-events-none' : ''}`}>
                            <div class="flex items-center justify-between">
                                <div class="h-12 w-full rounded-lg pl-3 flex items-center space-x-6">
                                    <span class="text-black rounded-lg flex items-center justify-center bg-white w-8 h-8">
                                        3
                                    </span>
                                    <span class="text-black ">
                                        Select Payment Method
                                    </span>
                                </div>
                            </div>
                        </div>
                        }
                        
                        
                    </div>
                    <div className="shadow-xl h-max rounded-lg w-1/2 bg-white py-7">
                        <div className="flex justify-between px-6">
                            <span className="flex flex-col text-left space-y-2 self-start">
                                <p className="text-black text-lg">
                                    {hotelsData?.Hotel_name}
                                </p>
                                <p className="text-black text-sm font-poppins leading-6 w-80">
                                {hotelsData?.Address}</p>
                            </span>
                            <Image
                                width={800}
                                height={450}
                                isZoomed
                                className="rounded-xl"
                                alt="Hotel Seven Oaks in Navi Mumbai"
                                src={'/img/' + [hotelsData?.Hotel_name?.toString().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join("")] +'/1.jpg'}
                            />
                        </div>
                        <div className="px-8 mx-6 mt-6 border-1 border-gray-500 rounded-lg -mb-5 py-3 flex items-center justify-between">
                            <p className="text-sm font-poppins text-black">
                                <span className="text-gray-500 mr-2">
                                    Room Category : </span>
                                {hotelsData?.hotel_category === "premium" ? "STANDARD" : "LUXURY"}</p>
                        </div>
                        <div className="px-8 mx-6 mt-6 border-1 border-gray-500 rounded-lg py-3 flex items-center justify-between">
                            <div className="flex flex-col text-left space-y-3">
                                <span className="text-gray-500 font-poppins text-sm">
                                    Check in</span>
                                <span className="text-black text-sm">
                                {new Date(checkin_date && checkin_date?.split("-").reverse().join("-")).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }).replace(/(\d+)([a-z]+) (\d+)/i, "$2 $1")} , {new Date(`${checkin_date && checkin_date.split('-').reverse().join('-')}T${checkin_time}:00:00`).toLocaleString('en-US', { hour: 'numeric', hour12: true })}</span>
                            </div>
                            <div className="flex flex-col text-left space-y-3">
                                <span className="text-gray-500 font-poppins text-sm ml-auto">
                                    Check Out</span>
                                <span className="text-black text-sm">
                                {new Date(new Date(`${checkin_date && checkin_date.split('-').reverse().join('-')}T${checkin_time}:00:00`).getTime() + (hours * 60 * 60 * 1000)).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }).replace(/(\d+)([a-z]+) (\d+)/i, "$2 $1")}, {new Date(new Date(`${checkin_date && checkin_date.split('-').reverse().join('-')}T${checkin_time}:00:00`).getTime() + (hours * 60 * 60 * 1000)).toLocaleString('en-US', { hour: 'numeric', hour12: true })}</span>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between space-x-3 px-6">
                            <div className="px-8 flex flex-col justify-center text-left space-y-3 border-1 border-gray-500 w-full rounded-lg py-3">
                                <span className="text-gray-500 font-poppins text-sm">
                                    Rooms &amp; Guests Details</span>
                                <span className="text-black text-sm">
                                    {adults} Guests, {rooms} Room</span>
                            </div>
                            <div className="px-8 flex flex-col text-left justify-center space-y-3 border-1 border-gray-500 w-full rounded-lg py-3">
                                <span className="text-gray-500 font-poppins text-sm">
                                    Pack</span>
                                <span className="text-black text-sm">
                                    {hours} Hours</span>
                            </div>
                        </div>
                        <div className="mt-6 pl-8 pr-14 space-y-6 px-6">
                            <span className="text-sm text-black">
                                Price Details</span>
                            <div className="flex items-center justify-between">
                                <span className="text-base text-black font-poppins">
                                    Room price</span>
                                <span className="text-base text-black">
                                    ₹3360</span>
                            </div>
                        </div>
                        <Divider className="w-full mt-4 my-4" />
                        <div className="flex items-center justify-between px-8 mt-6">
                            <div className="space-x-3">
                                <span className="text-lg text-black">
                                    Grand Total</span>
                            </div>
                            <span className="text-lg text-black">
                                ₹3360</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default function PaymentOptions() {
    return (
        <SessionProvider>
            <PaymentOptionss />
        </SessionProvider>
    );
}