'use client'
import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
import { IMAGES } from '@/public/index';
import Image from 'next/image';
import heroimagesdata from './HeroImagesData'

const VerticalHeroCarousel = () => {
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
                direction={'vertical'}
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className='h-44'
            >
            
            {heroimagesdata?.map((heroimagedata,index) =>(
                <SwiperSlide key = {index} className='rounded-md overflow-hidden bg-no-repeat'>
                <Image 
                    key = {index}
                    src={IMAGES[heroimagedata.nextimage]}
                    alt="bgcover"
                    quality={100}
                    fill
                    sizes="100%"
                    style={{
                        objectFit: 'cover',
                    }}
                    />
                    <p className='relative mt-32 ml-6 items-center text-lg text-white font-semibold'>{heroimagedata.nexttitle}</p>
                </SwiperSlide>
                ))}

                <div className="autoplay-progress" slot="container-end">
                    <svg viewBox="0 0 48 48" ref={progressCircle}>
                    </svg>
                    <span ref={progressContent}></span>
                </div>
            </Swiper>
  )
}


export default VerticalHeroCarousel;