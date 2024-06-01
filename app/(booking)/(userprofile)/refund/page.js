'use client'
import React, { useState, useEffect, useCallback, useRef } from "react";
import  RefundTab  from '@/app/(booking)/(userprofile)/refund/RefundTab'
import InfoModal from '@/app/(booking)/(userprofile)/bookings/InfoModal'
import VerticalStepper from '@/app/(booking)/(userprofile)/refund/VerticalStepper'
import {  Chip, Button } from "@nextui-org/react";
import { CiCircleCheck } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { VscHistory } from "react-icons/vsc";
import Image from 'next/image'
import { IMAGES } from '@/public/index'
import { useSelector } from "react-redux";
import { SessionProvider, useSession, getSession, signIn, signOut } from 'next-auth/react'


const Refundpagee = () => {

  const [currentStep, setCurrentStep] = useState(1);
  const [result, setResult] = useState([]);
  const [resultBooking, setResultBooking] = useState([]);
  const { data: session, update ,status } = useSession();
  const user_Id = session ? session?.user?.user_id : "";
  const [hour, setHour] = React.useState("3");

  let selectedItem = useSelector((state) => state.refund.refundState);
  let selectedItemBooking = useSelector((state) => state.refund.refundBookingState);

  const steps = [
    {
      title: 'Request Raised',
      initializing: 'Wating...',
      pending: 'Wating for Confirmation...',
      done: '24 March 2024 09:00 am',
    },
    {
      title: 'Claim Processed',
      initializing: 'Wating...',
      pending: 'Processing Claim...',
      done: '24 March 2024 09:00 am',
    },
    {
      title: 'Credited in account',
      initializing: 'Wating...',
      pending: 'Wating for Confirmation...',
      done: '24 March 2024 09:00 am',
    },
  ];

  const handleResult = (data) => {
    setResult(data)
  }

  const handleResultBooking = (data) => {
    setResultBooking(data)
  }

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

  if(selectedItemBooking) {

    if(selectedItemBooking?.rFlag0 === 1){
      setCurrentStep(0)
    }else if(selectedItemBooking?.rFlag1 === 1){
      setCurrentStep(1)
    }else if(selectedItemBooking?.rFlag2 === 1){
      setCurrentStep(2)
    }else if(selectedItemBooking?.rFlag3 === 1){
      setCurrentStep(3)
    }
  }else{

    if(result[0]?.rFlag0 === 1){
      setCurrentStep(0)
    }else if(result[0]?.rFlag1 === 1){
      setCurrentStep(1)
    }else if(result[0]?.rFlag2 === 1){
      setCurrentStep(2)
    }else if(result[0]?.rFlag3 === 1){
      setCurrentStep(3)
    }
  }

  if(selectedItem) {

    if(selectedItemBooking?.hour3_display_flag === 1) {
      setHour("3")
    }else if(selectedItemBooking?.hour6_display_flag === 1) {
      setHour("6")
    }else if(selectedItemBooking?.hour12_display_flag === 1) {
      setHour("12")
    }else if(selectedItemBooking?.hour24_display_flag === 1) {
      setHour("24")
    }

  }else {

    if(resultBooking[0]?.hour3_display_flag === 1) {
      setHour("3")
    }else if(resultBooking[0]?.hour6_display_flag === 1) {
      setHour("6")
    }else if(resultBooking[0]?.hour12_display_flag === 1) {
      setHour("12")
    }else if(resultBooking[0]?.hour24_display_flag === 1) {
      setHour("24")
    }

  }



}, [selectedItem, selectedItemBooking, result, resultBooking])


  return (
    <div className=' w-full h-full flex items-center justify-between'>
      <div className='w-full h-[95%] pt-9 p-2 space-y-2'>
        <div className='bg-white w-full shadow-xl h-[40%] rounded-3xl p-2 flex'>
          <div className='w-[30%] relative'>
          <Image
              src={selectedItem ? '/img/' + [selectedItem?.Hotel_name?.toString().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join("")] +'/1.jpg' : '/img/' + [resultBooking[0]?.Hotel_name?.toString().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join("")] +'/1.jpg'}
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
            <div className='flex gap-2 items-center'>
              <h1 className='text-xl font-semibold text-gray-400'>{selectedItem ? selectedItem?.Hotel_name : resultBooking[0]?.Hotel_name}</h1>
              {selectedItem ? selectedItem.status === "inprocess" 
                  ? <Chip color="primary" variant="flat" className="bg-primary-50" startContent={<VscHistory size={20} />}>in Process</Chip>
                  : selectedItem.status === "cancelled" 
                  ? <Chip color="danger" variant="flat" className="bg-danger-50" startContent={<IoIosCloseCircleOutline size={21} />} >Cancelled</Chip>
                  : selectedItem.status === "booked" 
                  ? <Chip color="success" variant="flat" className="bg-success-50" startContent={<CiCircleCheck size={21} />} >Booked</Chip>
                  : ""
                : resultBooking[0]?.status === "inprocess" 
                  ? <Chip color="primary" variant="flat" className="bg-primary-50" startContent={<VscHistory size={20} />}>in Process</Chip>
                  : resultBooking[0]?.status === "cancelled" 
                  ? <Chip color="danger" variant="flat" className="bg-danger-50" startContent={<IoIosCloseCircleOutline size={21} />} >Cancelled</Chip>
                  : resultBooking[0]?.status === "booked" 
                  ? <Chip color="success" variant="flat" className="bg-success-50" startContent={<CiCircleCheck size={21} />} >Booked</Chip>
                  : ""}
            </div>
            <h5 className='text-sm text-gray-400 mt-2'><span className='text-primary'>Mall Road |</span> 600m from Main Manali Market</h5>
            <div className='flex'>
              <div className='grid grid-cols-2 gap-1 p-1 w-[70%] relative'>
                <div>
                  <h6 className='text-xs ml-4 bg-white w-fit absolute'>Check In</h6>
                  <div className='border-1 border-gray-500 rounded-md mt-2 flex p-2 gap-1 items-center'>
                    <h4 className='text-base text-gray-500 font-bold'>{selectedItem ? formatDate(selectedItem?.checkin_date).day : formatDate(resultBooking[0]?.checkin_date).day}</h4>
                    <h5 className='text-xs text-gray-500'>{selectedItem ? formatDate(selectedItem?.checkin_date).month : formatDate(resultBooking[0]?.checkin_date).month}</h5>
                    <h5 className='text-xs text-gray-500'>{selectedItem ? formatDate(selectedItem?.checkin_date).day : formatDate(resultBooking[0]?.checkin_date).day}</h5>
                  </div>
                </div>
                <div>
                  <h6 className='text-xs ml-4 bg-white w-fit absolute'>Check Out</h6>
                  <div className='border-1 border-gray-500 rounded-md mt-2 flex p-2 gap-1 items-center'>
                    <h4 className='text-base text-gray-500 font-bold'>{selectedItem ? formatDate(selectedItem?.checkout_date).day : formatDate(resultBooking[0]?.checkout_date).day}</h4>
                    <h5 className='text-xs text-gray-500'>{selectedItem ? formatDate(selectedItem?.checkout_date).month : formatDate(resultBooking[0]?.checkout_date).month}</h5>
                    <h5 className='text-xs text-gray-500'>{selectedItem ? formatDate(selectedItem?.checkout_date).year : formatDate(resultBooking[0]?.checkout_date).year}</h5>
                  </div>
                </div>
                <div>
                  <h6 className='text-xs ml-4 bg-white w-fit absolute'>Guest</h6>
                  <div className='border-1 border-gray-500 rounded-md mt-2 flex p-2 gap-1 items-center'>
                    <h4 className='text-base text-gray-500 font-bold'>{selectedItem ? selectedItem?.adults_count : resultBooking[0]?.adults_count} Adults</h4>
                  </div>
                </div>
                <div>
                  <h6 className='text-xs ml-4 bg-white w-fit absolute'>Rooms</h6>
                  <div className='border-1 border-gray-500 rounded-md mt-2 flex p-2 gap-1 items-center'>
                    <h4 className='text-base text-gray-500 font-bold'>{selectedItem ? selectedItem?.rooms_count : resultBooking[0]?.rooms_count}</h4>
                    <h5 className='text-xs text-gray-500'>Super Deluxe</h5>
                  </div>
                </div>
              </div>
              <div className='w-[25%] flex justify-center items-center'>
              {selectedItem 
                  ? <Button variant='shadow' color='success' size='sm' className='text-white' onClick={(e) => {window.open(`/bookings/hourlybooking/hotels/${selectedItem?.Hotel_name}?hotelName=${selectedItem?.Hotel_name}&hour=${hour}&hotelId=${selectedItem?.Hotel_Id}`, '_blank')}}>View Property</Button>
                  : <Button variant='shadow' color='success' size='sm' className='text-white' onClick={(e) => {window.open(`/bookings/hourlybooking/hotels/${resultBooking[0]?.Hotel_name}?hotelName=${result[0]?.Hotel_name}&hour=${hour}&hotelId=${resultBooking[0]?.Hotel_Id}`, '_blank')}}>View Property</Button>}
              </div>
            </div>
          </div>
          <div className='w-[20%] overflow-y-scroll'>
            <h2 className='text-xl'>₹ {selectedItem ? selectedItem?.price : resultBooking[0]?.price}</h2>
            <div className='flex justify-between items-center'>
              <h6 className='text-primary text-sm'>+500 Reward Points</h6>
              <InfoModal />
            </div>
            <VerticalStepper steps={steps} currentStep={currentStep} selectedItem = {selectedItem}/>
          </div>
        </div>
        <div className='bg-white w-full shadow-xl h-[60%] rounded-3xl p-2 text-right relative overflow-y-scroll'>
          <RefundTab onResult = {handleResult} onResultBooking = {handleResultBooking} user_Id = {user_Id}/>
        </div>
      </div>
    </div>
  )
}

// export default Refundpage;

export default function Refundpage() {
  return (
      <SessionProvider>
          <Refundpagee />
      </SessionProvider>
  );
}