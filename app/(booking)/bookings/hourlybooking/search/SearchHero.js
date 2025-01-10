import React from 'react'
import HourlyBooking from '@/_components/ui/HourlyBooking';
import Image from 'next/image'
import { IMAGES } from '@/public/index'
import { IndianFlag } from "@/_components/icon"
import { Divider } from "@nextui-org/react";
import { Permanent_Marker } from 'next/font/google'
import VIDEOS from '@/public/video'
import { useSearchParams } from 'next/navigation'
    

const PermanentMarker = Permanent_Marker({
  weight: '400',
  subsets: ['latin'],
  style: ['normal'],
})

const SearchHero = () => {
  const searchParams = useSearchParams();
  const searchCity = searchParams.get('location');
  return (
    <div className='pt-[50px] h-screen w-screen'>
      <div className="w-[96%] h-[95%] m-auto">
        <div className='relative z-0 m-auto w-[96%] h-[95%] rounded-3xl'>
          <div className='relative w-full h-full'>
            {/* <Image
              src={IMAGES.DiscGoa}
              alt="DiacoverGoa"
              quality={100}
              fill
              sizes="100%"
              style={{
                objectFit: 'cover',
              }}
              className='rounded-3xl'
            /> */}
            <video src={VIDEOS.heroVideo} loading="lazy" muted="muted" type="video/mp4" autoplay="autoplay" loop="loop" className='absolute rounded-3xl h-[100%] w-full' style={{ objectFit: 'cover' }} >
            </video>
            <div className='bg-black/20 relative rounded-3xl h-full flex flex-col justify-center items-center'>
              <div className='text-white text-9xl'><h1 className={PermanentMarker.className}>{searchCity}</h1></div>
              <Divider className="my-4 w-[50%] bg-white" />
              <div className='flex items-center gap-4'>
                <IndianFlag className="size-10" />
                <h1 className='text-white text-lg font-thin'>INDIA</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-50 w-[90%] -mt-24 mx-auto">
        <div className='bg-white rounded-xl shadow-xl w-fit mx-auto'>
          <HourlyBooking />
        </div>
      </div>
    </div>
  )
}

export default SearchHero;