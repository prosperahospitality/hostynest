import React, { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Thumb } from './EmblaCarouselThumbsButton'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import { Image } from '@nextui-org/react';
import NextImage from "next/image";

const EmblaCarousel = (props) => {
  const { slides, options, hotelNamee, roomNamee, clickedImageid } = props
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [currectSelectedImageIndex, setCurrectSelectedImageIndex] = useState(1)
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true
  })


  const onThumbClick = useCallback(
    (index) => {
      setCurrectSelectedImageIndex(index + 1)
      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
    },
    [emblaMainApi, emblaThumbsApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaMainApi) return
    onSelect()

    emblaMainApi.on('select', onSelect).on('reInit', onSelect)
  }, [emblaMainApi, onSelect])

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaMainApi)

  useEffect(() => {
    if (clickedImageid) {
      setSelectedIndex(parseInt(clickedImageid) - 1)
      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(parseInt(clickedImageid) - 1)
    }
  }, [clickedImageid, emblaMainApi,
    emblaThumbsApi])
  
  useEffect(() => {

    if(selectedIndex === 0) {
      setCurrectSelectedImageIndex(selectedIndex + 1)
    }
    
    if (selectedIndex) {
      setCurrectSelectedImageIndex(selectedIndex + 1)
    }
  }, [selectedIndex])


  return (
    <div className="embla">
      <div className='grid grid-cols-12 gap-2' style={{height:"100%"}}>

        <div className='col-span-1'>
          <PrevButton className="h-[75%]" onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        </div>

        <div className='col-span-10'>
            <div className="embla__viewport" ref={emblaMainRef}>
            <div className="embla__container">
              {slides.map((item,index) => {
                
                console.log("Images:::::::>",slides, item, `/img/${hotelNamee}/${roomNamee}/${item.title}`)

                return (
                <div className="embla__slide" key={item.id}>
                  
                  <div className="embla__slide__number" style={{position: "relative",
    top: "-34%",}}>
                  <Image
                          src={`/img/${hotelNamee}/${roomNamee}/${item.title}`}
                          as={NextImage}
                          // className="object-cover"
                          width={1280}
                          height={900}

                          objectFit="cover"
                          // style={{
                          //   width: "78%",

                          //   height: "100%",
                          //   left: "12%",
                          // }}
                          // onLoad={() => setIsLoaded(true)}
                        />
                  </div>
                </div>
              )})}
            </div>
          </div>

        <div style={{    position: "relative",
                top: "-55%",
            }}>
          <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <p>{currectSelectedImageIndex + "/" + slides.length}</p>
          </div>

          <div className="embla-thumbs" style={{    margin: "0 0 0 0"}}>
            <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
              <div className="embla-thumbs__containerr grid grid-cols-5">
                {slides.map((item,index) => {
                  
                  console.log("Items:::::>",item)
                  
                  return (
                  
                  <Thumb
                    key={parseInt(item.id)}
                    onClick={() => onThumbClick(index)}
                    selected={parseInt(item.id) === selectedIndex}
                    item={item}
                    hotelNamee={hotelNamee} 
                    roomNamee={roomNamee}
                  />
                )})}
              </div>
            </div>
          </div>

        </div>
</div>
          

        <div className='col-span-1'>
          <NextButton className="h-[75%]" onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

      </div>
 
    </div>

  )
}

export default EmblaCarousel
