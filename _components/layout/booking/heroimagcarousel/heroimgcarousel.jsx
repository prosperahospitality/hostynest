'use client'
import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
import { IMAGES } from '@/public/index';
import Image from 'next/image';
import { Chip } from '@nextui-org/react'
import { MapPinned } from "lucide-react";
import heroimagesdata from './HeroImagesData'


const HeroCarousel = () => {
  const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };

  return (
    <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className='h-[100%]'
            > 
            
            {heroimagesdata?.map((heroimagedata,index) =>(
              <>
                <SwiperSlide key = {index} className='rounded-md overflow-hidden bg-no-repeat'>
                <Image 
                    key = {index}
                    src={IMAGES[heroimagedata.mainimage]}
                    alt="heroimgbgcover"
                    quality={100}
                    fill
                    sizes="100%"
                    style={{
                        objectFit: 'cover',
                    }}
                    />
                    <div className='mt-[22%] ml-[10%]'>
                            <Chip
                                startContent={<MapPinned size={18} />}
                                variant="light"
                                color="primary"
                                className='text-white font-light mr-96 pl-2 text-base'
                            >
                                {heroimagedata.location}
                            </Chip>
                </div>
                </SwiperSlide>
                </>
                ))}

                <div className="autoplay-progress" slot="container-end">
                    <svg viewBox="0 0 48 48" ref={progressCircle}>
                    </svg>
                    <span ref={progressContent}></span>
                </div>
            </Swiper>
  )
}


export default HeroCarousel