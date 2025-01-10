'use client'
import React from 'react'
import Image from 'next/image'
import { IMAGES } from '@/public/index'
// import {Card, CardFooter, Image, Button} from "@nextui-org/react";
import UnbeatableImgCarousel from '@/_components/ui/unbeatableimgcarousel/UnbeatableImgCarousel'
import '@/_components/ui/styles/unbeatableimagcarousel.css'
import { Button } from '@nextui-org/react'

const OPTIONS = { dragFree: true }
const SLIDE_COUNT = 6
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())


const SiteUnbeatable = () => {
    return (
        <div className='h-screen w-screen bg-white'>
            <div className='h-[20%] flex items-center pl-8'>

                <h1 className='text-[100px] font-bold italic bg-gradient-to-r from-blue-300  to-purple-300 inline-block text-transparent bg-clip-text text-opacity-50'>UNBEATABLE</h1>

                <div className='flex gap-4 mt-3 bg-white bg-opacity-80 absolute'>
                    <div className='bg-primary w-1 h-[24px] rounded-lg'></div>
                    <h4 className='text-primary text-base italic font-bold'>Deals & Discount across Top Properties</h4>
                </div>
            </div>
            <div className='h-[80%] w-[95%] space-y-4 mx-auto'>
                <div className='h-[70%]'>
                <UnbeatableImgCarousel slides={SLIDES} options={OPTIONS} />
                </div>
                <div className='h-[30%] '>
                    <div className='w-[90%] h-[80%] mx-auto relative'>
                    <Image
                        src={IMAGES.DiscGoa}
                        alt="DiacoverGoa"
                        quality={100}
                        fill
                        sizes="100%"
                        style={{
                            objectFit: 'cover',
                        }}
                        className='rounded-2xl'
                        />
                        <div className='absolute w-full text-right p-4 '>
                        <h6 className='text-white text-sm font-semibold'>&quot;Discover the Majesty of Manali&apos;s Snow-Capped Peaks<br/>- Book Your Adventure Today!&quot;</h6>
                        <Button variant='shadow' color='primary' size='sm' radius='md' className='mt-1'>Book Now</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SiteUnbeatable;