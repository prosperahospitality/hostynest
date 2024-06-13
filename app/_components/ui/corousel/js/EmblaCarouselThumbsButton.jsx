import React from 'react'
import { Image } from '@nextui-org/react';
import NextImage from "next/image";

export const Thumb = (props) => {
  const { selected, item, onClick, hotelNamee, roomNamee } = props

  console.log("Selected:::::>",selected)

  return (
    <div
      className={'embla-thumbs__slide'.concat(
        selected ? ' embla-thumbs__slide--selected' : ''
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className="embla-thumbs__slide__number"
      >
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
      </button>
    </div>
  )
}
