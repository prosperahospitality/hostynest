'use client'
import React from 'react'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import {
  SelectedSnapDisplay,
  useSelectedSnapDisplay
} from './EmblaCarouselSelectedSnapDisplay'
import useEmblaCarousel from 'embla-carousel-react'

import Image from 'next/image'
import { Button, Chip } from "@nextui-org/react";
import { IMAGES } from '@/public/index'
import { MapPin } from 'lucide-react'

const UnbeatableImgCarousel = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi)

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">
                <div className='w-full h-full relative'>
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
                  <div className='absolute w-full h-full p-1 bg-transparent/20 rounded-xl'>
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
          ))}
        </div>
      </div>
    </section>
  )
}

export default UnbeatableImgCarousel;
