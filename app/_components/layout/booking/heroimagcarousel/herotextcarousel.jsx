'use client'
import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
import './carousel.css';
import heroimagesdata from './HeroImagesData'


const HeroTextCarousel = () => {
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
            > 
            
            {heroimagesdata?.map((heroimagedata,index) =>(
                <SwiperSlide key = {index} className='rounded-md overflow-hidden bg-no-repeat w-20'>
                <div className="text-6xl text-white font-light ml-4">{heroimagedata.title}</div>
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


export default HeroTextCarousel