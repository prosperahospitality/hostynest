'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { PrevButton, NextButton, usePrevNextButtons} from './EmblaCarouselArrowButtons'
import {SelectedSnapDisplay, useSelectedSnapDisplay} from './EmblaCarouselSelectedSnapDisplay'
import useEmblaCarousel from 'embla-carousel-react'

import Image from 'next/image'
import { Button, Chip } from "@nextui-org/react";
import { IMAGES } from '@/public/index'
import { MapPin } from 'lucide-react'
import Autoplay from 'embla-carousel-autoplay'

const AcrossIndiaImgCarousel = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 3000 })
  ])
  const [isPlaying, setIsPlaying] = useState()

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  const onButtonAutoplayClick = useCallback(
    (callback) => {
      const autoplay = emblaApi?.plugins()?.autoplay
      if (!autoplay) return

      const resetOrStop =
        autoplay.options.stopOnInteraction === false
          ? autoplay.reset
          : autoplay.stop

      resetOrStop()
      callback()
    },
    [emblaApi]
  )

  const toggleAutoplay = useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const playOrStop = autoplay.isPlaying() ? autoplay.stop : autoplay.play
    playOrStop()
  }, [emblaApi])

  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    setIsPlaying(autoplay.isPlaying())
    emblaApi
      .on('autoplay:play', () => setIsPlaying(true))
      .on('autoplay:stop', () => setIsPlaying(false))
      .on('reInit', () => setIsPlaying(false))
  }, [emblaApi])

  const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi)

  return (
    <section className="acrossindiaimgcarouselembla">
      <div className="acrossindiaimgcarouselembla__viewport" ref={emblaRef}>
        <div className="acrossindiaimgcarouselembla__container">
          {slides.map((slide, index) => (
            <div className="acrossindiaimgcarouselembla__slide" key={index}>
              <div className="acrossindiaimgcarouselembla__slide__number">
                <div className='w-full h-full relative'>
                  <Image
                    src={IMAGES[slide.img]}
                    alt="DiacoverGoa"
                    quality={100}
                    fill
                    sizes="100%"
                    style={{
                      objectFit: 'cover',
                    }}
                    className='rounded-lg'
                  />
                  <div className='absolute w-full h-full p-1 bg-transparent/20 rounded-xl flex items-center'>
                    <div className='w-[60%]'></div>
                    <div className='w-[40%] text-right mr-4'>
                      <h4 className='text-xl font-semibold text-white'>{slide.title}</h4>
                      <h4 className='text-xs text-white'>
                        {slide.discription}
                      </h4>
                      <Button color='primary' variant='shadow' size='md' radius='sm'>Explore {slide.btnlink} </Button>
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

export default AcrossIndiaImgCarousel;
