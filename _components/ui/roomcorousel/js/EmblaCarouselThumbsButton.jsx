import React from 'react'
import { Image } from '@nextui-org/react';
import NextImage from "next/image";
import "@/_components/ui/roomcorousel/css/base.css"

export const Thumb = (props) => {
  const { selected, item, onClick, hotelNamee, roomNamee } = props

  console.log("Selected:::::>",selected)

  return (
    <div
      className={'embla-thumbs__slide'.concat(
        selected ? ' embla-thumbs__slide--selected' : ''
      )}
      style={{padding:"0 0 0 0", margin: "0 0 0 10px"}}
    >
      <button
        onClick={onClick}
        type="button"
        className="embla-thumbs__slide__number"
        style={{margin:"0 0 0 0px"}}
      >
        <Image
                      src={`/img/${hotelNamee}/${roomNamee}/${item.title}`}
                      as={NextImage}
                      className="object-cover h-[90%]"
                      width={1280}
                      height={900}

                      objectFit="cover"

                      style={{
                        height: "80px",
                        width: "80px",
                      }}    
        
                      // onLoad={() => setIsLoaded(true)}
                    />
       
      </button>
    </div>
  )
}
