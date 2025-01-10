'use client'
import React, { useState, useEffect } from "react";
import EmblaCarousel from "@/_components/ui/corousel/js/EmblaCarousel"
import Header from "@/_components/ui/corousel/js/Header"
import Footer from  "@/_components/ui/corousel/js/Footer"
import "@/_components/ui/corousel/css/base.css"
import '@/_components/ui/corousel/css/sandbox.css'
import '@/_components/ui/corousel/css/embla.css'



function ImageCorousel({currentClickedRoomImg, hotelNamee, roomNamee, clickedImageTitle, clickedImageid, clickedImageRoom}) {

  const OPTIONS = {}
const SLIDE_COUNT = parseInt(currentClickedRoomImg && currentClickedRoomImg.length)
const SLIDES = currentClickedRoomImg
    
    return (<>
      {/* <Header /> */}
      <EmblaCarousel slides={SLIDES} options={OPTIONS} hotelNamee={hotelNamee} roomNamee={roomNamee} clickedImageid={clickedImageid}/>
      {/* <Footer /> */}
    </>)
}

export default ImageCorousel;