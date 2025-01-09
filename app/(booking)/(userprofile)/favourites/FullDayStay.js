'use client'
import React, { useState } from 'react'
import { CiCirclePlus } from "react-icons/ci";
import { AiOutlineShareAlt } from "react-icons/ai";
import Image from 'next/image'
import { Button, Chip } from "@nextui-org/react";
import { IMAGES } from '@/public/index'
import { MapPin } from 'lucide-react'
import Daterangepicker from '@/_components/ui/DateRangePicker';

const FullDayStay = () => {
  const [selectedDate, setSelectedDate] = useState(new Date()); // Initialize with current date
  const [selectedTime, setSelectedTime] = useState("");
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowTimePicker(true);
  };

  const toggleTimePicker = () => {
    setShowTimePicker(prevState => !prevState); // Toggle time picker visibility
  };

  const handleSelectedTime = (time) => {
    setSelectedTime(time);
  };


  return (
    <div className="flex w-full h-full flex-col relative">
      <div className='flex justify-between'>
        <div className='flex justify-between items-center ml-10'>
          <h5 className='text-base text-gray-500 font-semibold'>Check In - Check Out:</h5>
          <Daterangepicker />
        </div>
        <div className='space-x-2'>
          <Button color='primary' variant='flat' startContent={<AiOutlineShareAlt size={25} />}>Share</Button>
          <Button color='success' variant='flat' startContent={<CiCirclePlus size={25} />}>Create Wishlist</Button>
        </div>
      </div>
      <div className='grid grid-cols-3 mt-4'>
        <div className='w-full h-full p-2 flex justify-center items-center'>
          <div className='w-80 h-96 relative'>
            <Image
              src={IMAGES.DiscGoa}
              alt="DiacoverGoa"
              quality={100}
              fill
              sizes="100%"
              style={{
                objectFit: 'cover',
              }}
              className='rounded-lg'
            />
            <div className=' w-full h-full relative p-1 bg-transparent/20 rounded-xl'>
              <div className='h-[50%]'></div>
              <div className='h-[50%]'>
                <div className='flex justify-between'>
                  <div className='flex gap-1 items-center'>
                    <h3 className='text-white text-2xl font-semibold'>Shiv Villa</h3>
                    <Chip color="" size="sm" className='bg-lime-500/50 text-white'>Couple friendly</Chip>
                  </div>
                  <Chip color="success" radius='sm' className='text-white' >4.4/5</Chip>
                </div>
                <div className='flex justify-between'>
                  <h5 className='text-sm text-white'>Mumbai</h5>
                  <h6 className='text-xs text-white'>120+ Reviews</h6>
                </div>
                <div className='flex'>
                  <div className='w-[68%] mt-2'>
                    <h5 className='text-xs items-center text-white flex'><MapPin />5 min walk to Chilka Lake</h5>
                    <div className='h-fit grid grid-cols-2 gap-1 m-1 mt-1'>
                      <Chip color="" className='bg-white/30 text-white text-[10px]'>Spa</Chip>
                      <Chip color="" className='bg-white/30 text-white text-[10px]'>Wifi</Chip>
                      <Chip color="" className='bg-white/30 text-white text-[10px]'>Gym</Chip>
                      <Chip color="" className='bg-white/30 text-white text-[10px]'>20+ Amenities</Chip>
                    </div>
                  </div>
                  <div className='w-[32%] gap-2 flex flex-col mt-1'>
                    <h3 className='text-xl text-right text-white'>₹ 2200</h3>
                    <Button variant='shadow' color='success' size='sm' radius='sm' className="text-white">View</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full h-full p-2 flex justify-center items-center'>
          <div className='w-80 h-96 relative'>
            <Image
              src={IMAGES.DiscGoa}
              alt="DiacoverGoa"
              quality={100}
              fill
              sizes="100%"
              style={{
                objectFit: 'cover',
              }}
              className='rounded-lg'
            />
            <div className=' w-full h-full relative p-1 bg-transparent/20 rounded-xl'>
              <div className='h-[50%]'></div>
              <div className='h-[50%]'>
                <div className='flex justify-between'>
                  <div className='flex gap-1 items-center'>
                    <h3 className='text-white text-2xl font-semibold'>Shiv Villa</h3>
                    <Chip color="" size="sm" className='bg-lime-500/50 text-white'>Couple friendly</Chip>
                  </div>
                  <Chip color="success" radius='sm' className='text-white' >4.4/5</Chip>
                </div>
                <div className='flex justify-between'>
                  <h5 className='text-sm text-white'>Mumbai</h5>
                  <h6 className='text-xs text-white'>120+ Reviews</h6>
                </div>
                <div className='flex'>
                  <div className='w-[68%] mt-2'>
                    <h5 className='text-xs items-center text-white flex'><MapPin />5 min walk to Chilka Lake</h5>
                    <div className='h-fit grid grid-cols-2 gap-1 m-1 mt-1'>
                      <Chip color="" className='bg-white/30 text-white text-[10px]'>Spa</Chip>
                      <Chip color="" className='bg-white/30 text-white text-[10px]'>Wifi</Chip>
                      <Chip color="" className='bg-white/30 text-white text-[10px]'>Gym</Chip>
                      <Chip color="" className='bg-white/30 text-white text-[10px]'>20+ Amenities</Chip>
                    </div>
                  </div>
                  <div className='w-[32%] gap-2 flex flex-col mt-1'>
                    <h3 className='text-xl text-right text-white'>₹ 2200</h3>
                    <Button variant='shadow' color='success' size='sm' radius='sm' className="text-white">View</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full h-full p-2 flex justify-center items-center'>
          <div className='w-80 h-96 relative'>
            <Image
              src={IMAGES.DiscGoa}
              alt="DiacoverGoa"
              quality={100}
              fill
              sizes="100%"
              style={{
                objectFit: 'cover',
              }}
              className='rounded-lg'
            />
            <div className=' w-full h-full relative p-1 bg-transparent/20 rounded-xl'>
              <div className='h-[50%]'></div>
              <div className='h-[50%]'>
                <div className='flex justify-between'>
                  <div className='flex gap-1 items-center'>
                    <h3 className='text-white text-2xl font-semibold'>Shiv Villa</h3>
                    <Chip color="" size="sm" className='bg-lime-500/50 text-white'>Couple friendly</Chip>
                  </div>
                  <Chip color="success" radius='sm' className='text-white' >4.4/5</Chip>
                </div>
                <div className='flex justify-between'>
                  <h5 className='text-sm text-white'>Mumbai</h5>
                  <h6 className='text-xs text-white'>120+ Reviews</h6>
                </div>
                <div className='flex'>
                  <div className='w-[68%] mt-2'>
                    <h5 className='text-xs items-center text-white flex'><MapPin />5 min walk to Chilka Lake</h5>
                    <div className='h-fit grid grid-cols-2 gap-1 m-1 mt-1'>
                      <Chip color="" className='bg-white/30 text-white text-[10px]'>Spa</Chip>
                      <Chip color="" className='bg-white/30 text-white text-[10px]'>Wifi</Chip>
                      <Chip color="" className='bg-white/30 text-white text-[10px]'>Gym</Chip>
                      <Chip color="" className='bg-white/30 text-white text-[10px]'>20+ Amenities</Chip>
                    </div>
                  </div>
                  <div className='w-[32%] gap-2 flex flex-col mt-1'>
                    <h3 className='text-xl text-right text-white'>₹ 2200</h3>
                    <Button variant='shadow' color='success' size='sm' radius='sm' className="text-white">View</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full h-full p-2 flex justify-center items-center'>
          <div className='w-80 h-96 relative'>
            <Image
              src={IMAGES.DiscGoa}
              alt="DiacoverGoa"
              quality={100}
              fill
              sizes="100%"
              style={{
                objectFit: 'cover',
              }}
              className='rounded-lg'
            />
            <div className=' w-full h-full relative p-1 bg-transparent/20 rounded-xl'>
              <div className='h-[50%]'></div>
              <div className='h-[50%]'>
                <div className='flex justify-between'>
                  <div className='flex gap-1 items-center'>
                    <h3 className='text-white text-2xl font-semibold'>Shiv Villa</h3>
                    <Chip color="" size="sm" className='bg-lime-500/50 text-white'>Couple friendly</Chip>
                  </div>
                  <Chip color="success" radius='sm' className='text-white' >4.4/5</Chip>
                </div>
                <div className='flex justify-between'>
                  <h5 className='text-sm text-white'>Mumbai</h5>
                  <h6 className='text-xs text-white'>120+ Reviews</h6>
                </div>
                <div className='flex'>
                  <div className='w-[68%] mt-2'>
                    <h5 className='text-xs items-center text-white flex'><MapPin />5 min walk to Chilka Lake</h5>
                    <div className='h-fit grid grid-cols-2 gap-1 m-1 mt-1'>
                      <Chip color="" className='bg-white/30 text-white text-[10px]'>Spa</Chip>
                      <Chip color="" className='bg-white/30 text-white text-[10px]'>Wifi</Chip>
                      <Chip color="" className='bg-white/30 text-white text-[10px]'>Gym</Chip>
                      <Chip color="" className='bg-white/30 text-white text-[10px]'>20+ Amenities</Chip>
                    </div>
                  </div>
                  <div className='w-[32%] gap-2 flex flex-col mt-1'>
                    <h3 className='text-xl text-right text-white'>₹ 2200</h3>
                    <Button variant='shadow' color='success' size='sm' radius='sm' className="text-white">View</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full h-full p-2 flex justify-center items-center'>
          <div className='w-80 h-96 relative'>
            <Image
              src={IMAGES.DiscGoa}
              alt="DiacoverGoa"
              quality={100}
              fill
              sizes="100%"
              style={{
                objectFit: 'cover',
              }}
              className='rounded-lg'
            />
            <div className=' w-full h-full relative p-1 bg-transparent/20 rounded-xl'>
              <div className='h-[50%]'></div>
              <div className='h-[50%]'>
                <div className='flex justify-between'>
                  <div className='flex gap-1 items-center'>
                    <h3 className='text-white text-2xl font-semibold'>Shiv Villa</h3>
                    <Chip color="" size="sm" className='bg-lime-500/50 text-white'>Couple friendly</Chip>
                  </div>
                  <Chip color="success" radius='sm' className='text-white' >4.4/5</Chip>
                </div>
                <div className='flex justify-between'>
                  <h5 className='text-sm text-white'>Mumbai</h5>
                  <h6 className='text-xs text-white'>120+ Reviews</h6>
                </div>
                <div className='flex'>
                  <div className='w-[68%] mt-2'>
                    <h5 className='text-xs items-center text-white flex'><MapPin />5 min walk to Chilka Lake</h5>
                    <div className='h-fit grid grid-cols-2 gap-1 m-1 mt-1'>
                      <Chip color="" className='bg-white/30 text-white text-[10px]'>Spa</Chip>
                      <Chip color="" className='bg-white/30 text-white text-[10px]'>Wifi</Chip>
                      <Chip color="" className='bg-white/30 text-white text-[10px]'>Gym</Chip>
                      <Chip color="" className='bg-white/30 text-white text-[10px]'>20+ Amenities</Chip>
                    </div>
                  </div>
                  <div className='w-[32%] gap-2 flex flex-col mt-1'>
                    <h3 className='text-xl text-right text-white'>₹ 2200</h3>
                    <Button variant='shadow' color='success' size='sm' radius='sm' className="text-white">View</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full h-full p-2 flex justify-center items-center'>
          <div className='w-80 h-96 relative'>
            <Image
              src={IMAGES.DiscGoa}
              alt="DiacoverGoa"
              quality={100}
              fill
              sizes="100%"
              style={{
                objectFit: 'cover',
              }}
              className='rounded-lg'
            />
            <div className=' w-full h-full relative p-1 bg-transparent/20 rounded-xl'>
              <div className='h-[50%]'></div>
              <div className='h-[50%]'>
                <div className='flex justify-between'>
                  <div className='flex gap-1 items-center'>
                    <h3 className='text-white text-2xl font-semibold'>Shiv Villa</h3>
                    <Chip color="" size="sm" className='bg-lime-500/50 text-white'>Couple friendly</Chip>
                  </div>
                  <Chip color="success" radius='sm' className='text-white' >4.4/5</Chip>
                </div>
                <div className='flex justify-between'>
                  <h5 className='text-sm text-white'>Mumbai</h5>
                  <h6 className='text-xs text-white'>120+ Reviews</h6>
                </div>
                <div className='flex'>
                  <div className='w-[68%] mt-2'>
                    <h5 className='text-xs items-center text-white flex'><MapPin />5 min walk to Chilka Lake</h5>
                    <div className='h-fit grid grid-cols-2 gap-1 m-1 mt-1'>
                      <Chip color="" className='bg-white/30 text-white text-[10px]'>Spa</Chip>
                      <Chip color="" className='bg-white/30 text-white text-[10px]'>Wifi</Chip>
                      <Chip color="" className='bg-white/30 text-white text-[10px]'>Gym</Chip>
                      <Chip color="" className='bg-white/30 text-white text-[10px]'>20+ Amenities</Chip>
                    </div>
                  </div>
                  <div className='w-[32%] gap-2 flex flex-col mt-1'>
                    <h3 className='text-xl text-right text-white'>₹ 2200</h3>
                    <Button variant='shadow' color='success' size='sm' radius='sm' className="text-white">View</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FullDayStay