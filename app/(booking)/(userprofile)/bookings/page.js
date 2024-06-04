'use client'
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Button, Slider } from '@nextui-org/react'
import BookingTab from '@/app/(booking)/(userprofile)/bookings/BookingTab'
import InfoModal from '@/app/(booking)/(userprofile)/bookings/InfoModal'
import VerticalStepper from '@/app/(booking)/(userprofile)/bookings/VerticalStepper'
import Image from 'next/image'
import { IMAGES } from '@/public/index'
import { SessionProvider, useSession, getSession, signIn, signOut } from 'next-auth/react'
import Swal from 'sweetalert2'
const Bookingspagee = () => {

  const [currentStep, setCurrentStep] = useState(0);
  const { data: session, update ,status } = useSession()
  const user_Id = session ? session?.user?.user_id : "";
  const [result, setResult] = React.useState([]);
  const [selectedItem, setSelectedItem] = React.useState();
  const [hour, setHour] = React.useState("3");
  const [lastID, setLastID] = useState(0);
  const [ resultAll, setResultAll ] = useState([]);
  const [ deleteFlag, setDeleteFlag ] = useState(false);
  const [ deletedBooking, setDeletedBooking ] = useState([]);
  

  const steps = [
    {
      title: 'Payment',
      initializing: 'Unpaid...',
      pending: 'Wating for Payment Confirmation...',
      done: 'Payment Recived',
    },
    {
      title: 'Hotel Confirmation',
      initializing: 'Wating...',
      pending: 'Processing Confirmation...',
      done: 'Confirmed',
    },
    {
      title: 'Room Reservation',
      initializing: 'Wating...',
      pending: 'Allocating Room...',
      done: 'Room Reserved',
    },
  ];

  const handleResult = (data) => {
    setResult(data)
  }

  const handleItemSelect = (data) => {
    setSelectedItem(data)
  }
  // const formatDate = (dateString) => {
  //   console.log("Date String:::::::::>",dateString)
  //   if (!dateString) return { day: null, month: null, year: null };

  //   const [day, monthIndex, year] = dateString.split("-").map((part, index) => parseInt(part, 10));
  //   const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  //   const month = months[monthIndex - 1];
  //   return { day, month, year };
  // };

  const formatDate = (dateString) => {
    if (!dateString) return { day: null, month: null, year: null };

    const [monthAbbreviation, day, year] = dateString.split(" ");
    const months = {
        "Jan": "January",
        "Feb": "February",
        "Mar": "March",
        "Apr": "April",
        "May": "May",
        "Jun": "June",
        "Jul": "July",
        "Aug": "August",
        "Sep": "September",
        "Oct": "October",
        "Nov": "November",
        "Dec": "December"
    };
    const month = months[monthAbbreviation];
    return { day: parseInt(day, 10), month, year: parseInt(year, 10) };
};

  useEffect(() => {

    if(selectedItem) {

      if(selectedItem?.pflag0 === 1){
        setCurrentStep(0)
      }else if(selectedItem?.pflag1 === 1){
        setCurrentStep(1)
      }else if(selectedItem?.pflag2 === 1){
        setCurrentStep(2)
      }else if(selectedItem?.pflag3 === 1){
        setCurrentStep(3)
      }
    }else{

      if(result[0]?.pflag0 === 1){
        setCurrentStep(0)
      }else if(result[0]?.pflag1 === 1){
        setCurrentStep(1)
      }else if(result[0]?.pflag2 === 1){
        setCurrentStep(2)
      }else if(result[0]?.pflag3 === 1){
        setCurrentStep(3)
      }
    }

    if(selectedItem?.hour3_display_flag === 1) {
      setHour("3")
    }else if(selectedItem?.hour6_display_flag === 1) {
      setHour("6")
    }else if(selectedItem?.hour12_display_flag === 1) {
      setHour("12")
    }else if(selectedItem?.hour24_display_flag === 1) {
      setHour("24")
    }


  }, [selectedItem,result])

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
  const newID = `REF${String(lastID + 1).padStart(5, '0')}`;
  setLastID(lastID + 1);
  return newID;
};

  const handleCancellationRefund = async(item, bk_id) => {
    console.log("Booking Id: ", item, bk_id)
    if(item.pflag0 !== 1) {



    
      let payload = {
        id: generateUniqueID(),
        user_id: user_Id,
        booking_id: item.booking_id,
        username: session?.user?.firstname + " "+ session?.user?.lastname,
        Hotel_Id: item.Hotel_Id,
        Hotel_name: item.Hotel_name,
        booking_date: item.booking_date,
        booking_time: item.booking_time,
        price: item.price,
        status: "inprocess",
        refund_requested_on: getCurrentDateTime(),
        payment_mode: "String",
        refund_status: "active",
        rFlag0: 1,
        rFlag1: 0,
        rFlag2: 0,
        rFlag3: 0,
        created_date: getCurrentDateTime(),
        last_update_on: getCurrentDateTime(),
    }
  
        const response1 = await fetch(`/api/userApi/refund`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
      });
      const result1 = await response1.json();
      setResultAll(result1.dataAll)
      console.log(">>>>>>>>>>:", result1)
      if(result1.data.result === "Data already existed") {

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "error",
          title: "Cancellation request has already been raised!"
        });
      }else{

        const response = await fetch(`/api/userApi/bookings`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({user_id: user_Id, booking_id: bk_id, operation : "update"}),
      });
      const result = await response.json();

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "Cancellation and refund request raised!"
        });
      }
      
    }else{
      console.log("Delete")

      const response = await fetch(`/api/userApi/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({user_id: user_Id, booking_id: bk_id, operation : "delete_by_id"}),
    });
    const result = await response.json();
    console.log("Delte Results::::::::::>",result)
    setResultAll(result.dataAll)
    setDeleteFlag(true)
    setDeletedBooking(result.data)
    if(result.success === true) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Booking cacelled!"
      });
    }else{
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: "Error while cancelling booking!"
      });
    }
    }
        

  }


  useEffect(() => {
    console.log("ResultAll:::::>",resultAll)
    async function dat() {
        const response = await fetch("/api/userApi/refund", {
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
        const lastElementId = lastElement.id; // Extract the id property from the last element
        console.log("REsulttttttttttttt::::::::>",lastElementId)
        const numericPart = lastElementId ? lastElementId.match(/(?<=REF)0*(\d+)/) : null; // Extract numeric part using regular expression
        const lastNumericId = numericPart ? parseInt(numericPart[1]) : null;
        console.log("Numeric ID of the last element:", lastNumericId);
        setLastID(lastNumericId);
    } else {
        console.log("No elements in the array.");
        setLastID(0);
    }
    }

    dat()

   

}, [resultAll,handleCancellationRefund]);

  return (
    <div className=' w-full h-full flex items-center justify-between'>
      <div className='w-full h-[95%] pt-9 p-2 space-y-2'>
        <div className='bg-white w-full shadow-xl h-[40%] rounded-3xl p-2 flex'>
          <div className='w-[30%] relative'>
            <Image
              src={selectedItem ? '/img/' + [selectedItem?.Hotel_name?.toString().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join("")] +'/1.jpg' : '/img/' + [result[0]?.Hotel_name?.toString().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join("")] +'/1.jpg'}
              alt="DiacoverGoa"
              quality={100}
              fill
              sizes="100%"
              style={{
                objectFit: 'cover',
              }}
              className='rounded-3xl pr-2'
            />
          </div>
          <div className='w-[50%]'>
            <h1 className='text-xl font-semibold text-gray-400'>{selectedItem ? selectedItem?.Hotel_name : result[0]?.Hotel_name}</h1>
            <h5 className='text-sm text-gray-400 mt-2'><span className='text-primary'>Mall Road |</span> 600m from Main Manali Market</h5>
            <div className='flex'>
              <div className='grid grid-cols-2 gap-1 p-1 w-[70%] relative'>
                <div>
                  <h6 className='text-xs ml-4 bg-white w-fit absolute'>Check In</h6>
                  <div className='border-1 border-gray-500 rounded-md mt-2 flex p-2 gap-1 items-center'>
                    <h4 className='text-base text-gray-500 font-bold'>{selectedItem ? formatDate(selectedItem?.checkin_date).day : formatDate(result[0]?.checkin_date).day}</h4>
                    <h5 className='text-xs text-gray-500'>{selectedItem ? formatDate(selectedItem?.checkin_date).month : formatDate(result[0]?.checkin_date).month}</h5>
                    <h5 className='text-xs text-gray-500'>{selectedItem ? formatDate(selectedItem?.checkin_date).year : formatDate(result[0]?.checkin_date).year}</h5>
                  </div>checkin_date
                </div>
                <div>
                  <h6 className='text-xs ml-4 bg-white w-fit absolute'>Check Out</h6>
                  <div className='border-1 border-gray-500 rounded-md mt-2 flex p-2 gap-1 items-center'>
                    <h4 className='text-base text-gray-500 font-bold'>{selectedItem ? formatDate(selectedItem?.checkout_date).day : formatDate(result[0]?.checkout_date).day}</h4>
                    <h5 className='text-xs text-gray-500'>{selectedItem ? formatDate(selectedItem?.checkout_date).month : formatDate(result[0]?.checkout_date).month}</h5>
                    <h5 className='text-xs text-gray-500'>{selectedItem ? formatDate(selectedItem?.checkout_date).year : formatDate(result[0]?.checkout_date).year}</h5>
                  </div>
                </div>
                <div>
                  <h6 className='text-xs ml-4 bg-white w-fit absolute'>Guest</h6>
                  <div className='border-1 border-gray-500 rounded-md mt-2 flex p-2 gap-1 items-center'>
                    <h4 className='text-base text-gray-500 font-bold'>{selectedItem ? selectedItem?.adults_count : result[0]?.adults_count} Adults</h4>
                  </div>
                </div>
                <div>
                  <h6 className='text-xs ml-4 bg-white w-fit absolute'>Rooms</h6>
                  <div className='border-1 border-gray-500 rounded-md mt-2 flex p-2 gap-1 items-center'>
                    <h4 className='text-base text-gray-500 font-bold'>{selectedItem ? selectedItem?.rooms_count : result[0]?.adults_count}</h4>
                    <h5 className='text-xs text-gray-500'>Super Deluxe</h5>
                  </div>
                </div>
              </div>
              <div className='w-[25%] flex justify-center items-center'>
                {selectedItem 
                  ? <><Button variant='shadow' color='success' size='sm' className='text-white' onClick={(e) => {window.open(`/bookings/hourlybooking/hotels/${selectedItem?.Hotel_name}?hotelName=${selectedItem?.Hotel_name}&hour=${hour}&hotelId=${selectedItem?.Hotel_Id}`, '_blank')}}>View Property</Button>
                  <Button variant='shadow' color='success' size='sm' className='text-white' onClick={(e) => {handleCancellationRefund( selectedItem ,selectedItem?.booking_id )}}>Cancel</Button></>
                  : <><Button variant='shadow' color='success' size='sm' className='text-white' onClick={(e) => {window.open(`/bookings/hourlybooking/hotels/${result[0]?.Hotel_name}?hotelName=${result[0]?.Hotel_name}&hour=${hour}&hotelId=${result[0]?.Hotel_Id}`, '_blank')}}>View Property</Button>
                  <Button variant='shadow' color='success' size='sm' className='text-white' onClick={(e) => {handleCancellationRefund( result[0] , result[0]?.booking_id)}}>Cancel</Button></>}
                
              </div>

            </div>
          </div>
          <div className='w-[20%] overflow-y-scroll'>
            <h2 className='text-xl'>₹ {selectedItem ? selectedItem?.price : result[0]?.price}</h2>
            <div className='flex justify-between items-center'>
              <h6 className='text-primary text-sm'>+500 Reward Points</h6>
              <InfoModal />
            </div>
            <VerticalStepper steps={steps} currentStep={currentStep} selectedItem = {selectedItem}/>
          </div>
        </div>
        <div className='bg-white w-full shadow-xl h-[60%] rounded-3xl p-2 text-right relative overflow-y-scroll'>
          <BookingTab onResult = {handleResult} user_Id = {user_Id} onItemSelected = {handleItemSelect} deleteFlag = {deleteFlag} deletedBooking = {deletedBooking}/>
          <Button color='primary' variant='light' className='relative' >see more</Button>
        </div>
      </div>
    </div>
  )
}

export default function Bookingspage() {
  return (
      <SessionProvider>
          <Bookingspagee />
      </SessionProvider>
  );
}