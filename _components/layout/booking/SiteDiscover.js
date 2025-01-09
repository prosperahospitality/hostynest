import React from 'react'
import Image from 'next/image'
import { IMAGES } from '@/public/index'
import { Chip } from "@nextui-org/react";
import { Pacifico, Cinzel, Lemonada, Caveat, Rubik_Wet_Paint, Megrim, Sue_Ellen_Francisco, Permanent_Marker } from 'next/font/google'
import { useRouter } from 'next/navigation';

const PermanentMarker = Permanent_Marker({
  weight: '400',
  subsets: ['latin'],
  style: ['normal'],
})


const pacificoregular = Pacifico({
  weight: '400',
  subsets: ['latin'],
  style: ['normal'],
})

const Caveat400 = Caveat({
  weight: '400',
  subsets: ['latin'],
  style: ['normal'],
})

const Cinzel500 = Cinzel({
  weight: '500',
  subsets: ['latin'],
  style: ['normal'],
})

const RubikWetPaint = Rubik_Wet_Paint({
  weight: '400',
  subsets: ['latin'],
  style: ['normal'],
})

const Lemonada400 = Lemonada({
  weight: '400',
  subsets: ['latin'],
  style: ['normal'],
})

const Megrim400 = Megrim({
  weight: '400',
  subsets: ['latin'],
  style: ['normal'],
})

const SueEllenFrancisco = Sue_Ellen_Francisco({
  weight: '400',
  subsets: ['latin'],
  style: ['normal'],
})


const SiteDiscover = () => {
  let router = useRouter();
  const date = new Date();
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };

  let formattedDate = date.toLocaleDateString('en-IN', options).replace(/\//g, '-');

  let hours = date.getHours(); 
  const minutes = date.getMinutes(); 
  
  
  if (minutes > 0) {
      hours += 1;
  }
  
  hours = hours % 24;
  
  let time24HoursFormat = hours.toString().padStart(2, '0');

  return (
    <div className='h-fit w-screen bg-white'>
      <div className='h-[20%] flex items-center pl-8'>
        <h1 className='text-[100px] font-bold italic bg-gradient-to-r from-blue-300  to-purple-300 inline-block text-transparent bg-clip-text text-opacity-50'>DISCOVER</h1>
        <div className='flex gap-4 mt-3 bg-white bg-opacity-80 absolute'>
          <div className='bg-primary w-1 h-[24px] rounded-lg'></div>
          <h4 className='text-primary text-base italic font-bold'>Top Destination for Your next Holiday</h4>
        </div>
      </div>
      <div className='h-[80%] w-[95%] space-y-4 mx-auto'>
        <div class="grid gap-4 grid-cols-12">
          <div className='relative min-h-[200px] col-span-8 ' onClick={(e) => {window.open(`/bookings/hourlybooking/search?location=Goa&date=${formattedDate}&time=${time24HoursFormat}`, '_blank')}}>
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
            <div className='bg-black/25 rounded-lg relative min-h-[200px] flex flex-col justify-center items-center gap-4'>
              <div className='text-white text-[80px]'><h1 className={PermanentMarker.className}>Goa</h1></div>
              <Chip color="default" variant="flat"><h4 className='text-white font-bold'>Sun-kissed shores, vibrant culture</h4></Chip>
            </div>
          </div>
          <div className='relative min-h-[200px] col-span-4' onClick={(e) => {window.open(`/bookings/hourlybooking/search?location=Agra&date=${formattedDate}&time=${time24HoursFormat}`, '_blank')}}>
            <Image
              src={IMAGES.DiscTaj}
              alt="DiacoverTaj"
              quality={100}
              fill
              sizes="100%"
              style={{
                objectFit: 'cover',
              }}
              className='rounded-lg'
            />
            <div className='bg-black/25 rounded-lg relative min-h-[200px] flex flex-col justify-center items-center'>
              <div className='text-white text-[80px]'><h1 className={Cinzel500.className}>Agra</h1></div>
              <Chip color="default" variant="flat"><h4 className='text-white font-bold'>Majestic marble monument of love.</h4></Chip>
            </div>
          </div>
        </div>
        <div class="grid gap-4 grid-cols-12">
          <div className='relative min-h-[200px] col-span-4' onClick={(e) => {window.open(`/bookings/hourlybooking/search?location=Jaipur&date=${formattedDate}&time=${time24HoursFormat}`, '_blank')}}>
            <Image
              src={IMAGES.DiscJaipur}
              alt="DiacoverJaipur"
              quality={100}
              fill
              sizes="100%"
              style={{
                objectFit: 'cover',
              }}
              className='rounded-lg'
            />
            <div className='bg-black/25 rounded-lg relative min-h-[200px] flex flex-col justify-center items-center'>
              <div className='text-white text-[80px]'><h1 className={Cinzel500.className}>Jaipur</h1></div>
              <Chip color="default" variant="flat"><h4 className='text-white font-bold'>Pink hues paint royal history</h4></Chip>
            </div>
          </div>
          <div className='relative min-h-[200px] col-span-4' onClick={(e) => {window.open(`/bookings/hourlybooking/search?location=Kerala&date=${formattedDate}&time=${time24HoursFormat}`, '_blank')}}>
            <Image
              src={IMAGES.Disckerala}
              alt="DiacoverKerala"
              quality={100}
              fill
              sizes="100%"
              style={{
                objectFit: 'cover',
              }}
              className='rounded-lg'
            />
            <div className='bg-black/25 rounded-lg relative min-h-[200px] flex flex-col justify-center items-center'>
              <div className='text-white text-[80px]'><h1 className={Lemonada400.className}>Kerala</h1></div>
              <Chip color="default" variant="flat"><h4 className='text-white font-bold'>God&apos;s Own Country</h4></Chip>
            </div>
          </div>
          <div className='relative min-h-[200px] col-span-4' onClick={(e) => {window.open(`/bookings/hourlybooking/search?location=Rishikesh&date=${formattedDate}&time=${time24HoursFormat}`, '_blank')}}>
            <Image
              src={IMAGES.DiscRishikesh}
              alt="DiacoverRishikesh"
              quality={100}
              fill
              sizes="100%"
              style={{
                objectFit: 'cover',
              }}
              className='rounded-lg'
            />
            <div className='bg-black/25 rounded-lg relative min-h-[200px] flex flex-col justify-center items-center'>
              <div className='text-white text-[80px]'><h1 className={Cinzel500.className}>Rishikesh</h1></div>
              <Chip color="default" variant="flat"><h4 className='text-white font-bold'>Experience your spiritual Retreat</h4></Chip>
            </div>
          </div>
        </div>
        <div class="grid gap-4 grid-cols-12">
          <div className='relative min-h-[200px] col-span-4' onClick={(e) => {window.open(`/bookings/hourlybooking/search?location=Jim Corbett&date=${formattedDate}&time=${time24HoursFormat}`, '_blank')}}>
            <Image
              src={IMAGES.DiscJimcorbett}
              alt="DiacoverJimcorbett"
              quality={100}
              fill
              sizes="100%"
              style={{
                objectFit: 'cover',
              }}
              className='rounded-lg'
            />
            <div className='bg-black/25 rounded-lg relative min-h-[200px] flex flex-col justify-center items-center'>
              <div className='text-white text-[80px]'><h1 className={Caveat400.className}>Jim Corbett</h1></div>
              <Chip color="default" variant="flat"><h4 className='text-white font-bold'>Wilderness echoes tales of adventure.</h4></Chip>
            </div>
          </div>
          <div className='relative min-h-[200px] col-span-8' onClick={(e) => {window.open(`/bookings/hourlybooking/search?location=Pawana Lake&date=${formattedDate}&time=${time24HoursFormat}`, '_blank')}}>
            <Image
              src={IMAGES.DiscPawna}
              alt="DiacoverPawana"
              quality={100}
              fill
              sizes="100%"
              style={{
                objectFit: 'cover',
              }}
              className='rounded-lg'
            />
            <div className='bg-black/25 rounded-lg relative min-h-[200px] flex flex-col justify-center items-center'>
              <div className='text-white text-[100px]'><h1 className={SueEllenFrancisco.className}>Pawana Lake</h1></div>
              <Chip color="default" variant="flat"><h4 className='text-white font-bold'>Tranquil waters cradle scenic serenity.</h4></Chip>
            </div>
          </div>
        </div>
        <div class="grid gap-4 grid-cols-12">
          <div className='relative min-h-[200px] col-span-4' onClick={(e) => {window.open(`/bookings/hourlybooking/search?location=Ladakh&date=${formattedDate}&time=${time24HoursFormat}`, '_blank')}}>
            <Image
              src={IMAGES.DiscLadhak}
              alt="DiacoverLadhak"
              quality={100}
              fill
              sizes="100%"
              style={{
                objectFit: 'cover',
              }}
              className='rounded-lg'
            />
            <div className='bg-black/25 rounded-lg relative min-h-[200px] flex flex-col justify-center items-center'>
              <div className='text-white text-[90px]'><h1 className={RubikWetPaint.className}>Ladakh</h1></div>
              <Chip color="default" variant="flat"><h4 className='text-white font-bold'>Mountains whisper timeless tales</h4></Chip>
            </div>
          </div>
          <div className='relative min-h-[200px] col-span-4' onClick={(e) => {window.open(`/bookings/hourlybooking/search?location=Darjeeling&date=${formattedDate}&time=${time24HoursFormat}`, '_blank')}}>
            <Image
              src={IMAGES.DiscDarjeeling}
              alt="DiacoverDarjeeling"
              quality={100}
              fill
              sizes="100%"
              style={{
                objectFit: 'cover',
              }}
              className='rounded-lg'
            />
            <div className='bg-black/25 rounded-lg relative min-h-[200px] flex flex-col justify-center items-center gap-4'>
              <div className='text-white text-[80px]'><h1 className={pacificoregular.className}>Darjeeling</h1></div>
              <Chip color="default" variant="flat"><h4 className='text-white font-bold'>Misty hills, tea-scented dreams.</h4></Chip>
            </div>
          </div>
          <div className='relative min-h-[200px] col-span-4' onClick={(e) => {window.open(`/bookings/hourlybooking/search?location=Ellora&date=${formattedDate}&time=${time24HoursFormat}`, '_blank')}}>
            <Image
              src={IMAGES.DiscEllora}
              alt="DiacoverEllora"
              quality={100}
              fill
              sizes="100%"
              style={{
                objectFit: 'cover',
              }}
              className='rounded-lg'
            />
            <div className='bg-black/25 rounded-lg relative min-h-[200px] flex flex-col justify-center items-center'>
              <div className='text-white text-[80px]'><h1 className={Megrim400.className}>Ellora</h1></div>
              <Chip color="default" variant="flat"><h4 className='text-white font-bold'>Cultural marvels carved in stone</h4></Chip>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SiteDiscover;