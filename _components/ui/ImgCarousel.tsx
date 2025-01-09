'use client'
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/_components/ui/Carousel"
import {Image} from "@nextui-org/react";
import NextImage from "next/image";
// import { Image } from "next/image";
import HotelName, {IMAGES} from '@/public/index'
import { Card, CardBody, Skeleton } from '@nextui-org/react';
import { useState, useEffect } from "react";

const ImgCarousel: React.FC<{ hotelName: string, hotelID: number }> = ({ hotelName, hotelID }) => {

  const [hotelImgs,setHotelImgs] = useState<{ [key: string]: string }>({});

  // function handleHotelImgs(Imgs: object) {
  //   setHotelImgs(Imgs);
  // }

  function handleHotelImgs(Imgs: { [key: string]: string }) {
    setHotelImgs(Imgs);
  }

  let hotel_name = capitalize_each_word(hotelName);

  function capitalize_each_word(val : string) {

    const words = val.split(" ");

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }

    var str = words.join("");
    var replacedStr = '';

    for (var i = 0; i < str.length; i++) {
      if (str[i] === ',') {
        replacedStr += '';
      } else {
        replacedStr += str[i];
      }
    }

    return replacedStr;
  }

  const [isLoaded, setIsLoaded] = React.useState(false);
  
  const plugin = React.useRef(
    Autoplay({ delay: 10000, stopOnInteraction: true })
  )

  useEffect(() => {
  
}, [hotelImgs, hotel_name]);

// useEffect(() => {
//   console.log("final Output:::::>" + hotelImgs);
// }, [hotelImgs]);

useEffect(() => {
  // console.log("Name1t:::::>" + hotel_name);
}, [hotel_name]);

  return (
    <div className="w-full h-full" >
    <HotelName hotel_Name={hotel_name} hotel_ID={hotelID} onHotelName={handleHotelImgs}/>
      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className="w-full h-[90%]"
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <Skeleton isLoaded={isLoaded} className="rounded-lg">
                <Card className="border-none">
                  <CardBody className="overflow-visible p-0">
                    <Image 
                      src= {index === 0 ? hotelImgs[hotel_name + '1']:hotelImgs[hotel_name + [(index + 1).toString()]]}
                      as={NextImage}
                      isZoomed
                      // className="object-cover"
                      width={1280}
                      height={900}
                      style={{
                        objectFit: "cover"
                      }}
                      onLoad={() => setIsLoaded(true)} // Set isLoaded to true when the image is loaded
                    />
                    
                  </CardBody>
                </Card>
              </Skeleton>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-14 bg-transparent text-white hover:text-purple-500 border-none"/>
        <CarouselNext className="mr-14 bg-transparent text-white hover:text-purple-500 border-none"/>
      </Carousel>
      
      <div className="gap-2 pt-1 pb-1 w-full grid grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          // eslint-disable-next-line react/jsx-key
          <Skeleton isLoaded={isLoaded} className="rounded-lg">
          <Card shadow="sm" key={index} isPressable >
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="sm"
                width="100%"
                className="w-full object-cover"
                src={index === 0 ? hotelImgs[hotel_name + '1']:hotelImgs[hotel_name + [(index + 1).toString()]]}
              />
            </CardBody>
          </Card>
        </Skeleton>
        ))}
      </div>
    </div>
  )
}

export default ImgCarousel;
