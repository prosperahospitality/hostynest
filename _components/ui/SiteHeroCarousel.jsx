'use client'
import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "./styles/site-hero-carousel.css";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Star, MapPinned } from "lucide-react";
import { IMAGES } from '@/public/index';
import Image from 'next/image';
import { Button, Chip } from '@nextui-org/react';
import Typewriter from 'typewriter-effect';



const heroimagesdata = [
    {
        title: 'Kerala',
        mainimage: 'Keralafarm',
        location: 'Kerla Farm - Kerla, India',
        nexttitle: 'Goa',
        nextimage: 'Goa',
    },
    {
        title: 'Goa',
        mainimage: 'Goa',
        location: 'Goa Beach - Goa, India',
        nexttitle: 'Manali',
        nextimage: 'Manali',
    },
    {
        title: 'Manali',
        mainimage: 'Manali',
        location: 'Manali - Manali, India',
        nexttitle: 'Himachal',
        nextimage: 'Himachal',
    },
    {
        title: 'Himachal',
        mainimage: 'Himachal',
        location: 'Himachal - Himachal, India',
        nexttitle: 'Lehladakh',
        nextimage: 'Lehladakh',
    },
    {
        title: 'Lehladakh',
        mainimage: 'Lehladakh',
        location: 'Lehladakh - Lehladakh, India',
        nexttitle: 'Mahabaleshwar',
        nextimage: 'Mahabaleshwar',
    },
    {
        title: 'Mahabaleshwar',
        mainimage: 'Mahabaleshwar',
        location: 'Mahabaleshwar - Mahabaleshwar, India',
        nexttitle: 'Goabeach',
        nextimage: 'Goabeach',
    },
    {
        title: 'Goabeach',
        mainimage: 'Goabeach',
        location: 'Goabeach - Goabeach, India',
        nexttitle: 'Punjab',
        nextimage: 'Punjab',
    },
    {
        title: 'Punjab',
        mainimage: 'Punjab',
        location: 'Punjab - Punjab, India',
        nexttitle: 'Keralariver',
        nextimage: 'Keralariver',
    },
]


const Carousel = () => {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };

    return (
        <div className='pt-16'>
            <div className='relative m-auto w-11/12 h-[600px] rounded-lg z-0'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="mySwiper"
            > 
            
            {heroimagesdata?.map((heroimagedata,index) =>(
                <SwiperSlide className='swiper-box rounded-lg overflow-hidden bg-no-repeat' key={index}>
                <Image 
                    key={index}
                    src={IMAGES[heroimagedata.mainimage]}
                    alt="bgcover"
                    quality={100}
                    fill
                    sizes="100%"
                    style={{
                        objectFit: 'cover',
                    }}
                    />
                    <div className='relative w-full h-full m-4 mt-10'>
                        <div className='mt-6 ml-6 text-left'>
                            <h1 className='text-6xl text-white font-semibold w-fit'>Relax,dream,love,</h1>
                            <div className='flex flex-row'>
                            <h1 className='text-6xl text-white font-semibold w-fit'>sleep, in... </h1>
                            <div className="text-7xl ml-2 text-white font-light">
                            <Typewriter
                                options={{
                                    autoStart: true,
                                    loop: true,
                                  }}
                                onInit={(typewriter) => {
                                    typewriter.typeString(heroimagedata.title)
                                    .callFunction(() => {
                                        console.log('String typed out!');
                                    })
                                    .pauseFor(5000)
                                    .deleteAll()
                                    .callFunction(() => {
                                        console.log('All strings were deleted');
                                    })
                                    .start();
                                }}
                                />
                                </div>
                            </div>
                            <p className='text-white mt-4'>Final and book your destination</p>
                            <div className=' w-11/12 flex justify-between mt-5'>
                                <Button color="primary"  size="md" radius='lg' variant='shadow'>Discover more</Button>
                                <div className='w-60 flex justify-start items-center'>
                                    <Button isIconOnly color="primary"  size="sm" radius='sm' variant='shadow'>
                                    <Star className='size-5'/>
                                    </Button>
                                    <p className='text-white font-semibold ml-2'>Next Destionation</p>
                                </div>
                            </div>
                        </div>
                        <div className='relative border-none overflow-hidden w-72 h-44 rounded-lg mt-2 -ml-8 left-3/4'>
                            <Image src={IMAGES[heroimagedata.nextimage]}
                                alt="bgcover"
                                quality={100}
                                fill
                                sizes="100%"
                            />
                                <p className='relative top-36 right-20 pl-2 text-lg text-white font-semibold'>{heroimagedata.nexttitle}</p>
                        </div>
                        <div className='mr-96 mb-2'>
                            <Chip
                                startContent={<MapPinned size={18} />}
                                variant="light"
                                color="primary"
                                className='text-white font-light mr-96 pl-2 text-base'
                            >
                                {heroimagedata.location}
                            </Chip>
                        </div>
                    </div>
                </SwiperSlide>
                ))}

                <div className="autoplay-progress" slot="container-end">
                    <svg viewBox="0 0 48 48" ref={progressCircle}>
                        <circle cx="24" cy="24" r="20"></circle>
                    </svg>
                    <span ref={progressContent}></span>
                </div>
            </Swiper>

            </div>
           
        </div>
    )
}

export default Carousel