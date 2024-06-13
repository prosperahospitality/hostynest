'use client'
import React, { useState, useEffect } from "react";
import EmblaCarousel from "@/app/_components/ui/roomcorousel/js/EmblaCarousel"
import Header from "@/app/_components/ui/roomcorousel/js/Header"
import Footer from  "@/app/_components/ui/roomcorousel/js/Footer"
import "@/app/_components/ui/roomcorousel/css/base.css"
import '@/app/_components/ui/roomcorousel/css/sandbox.css'
import '@/app/_components/ui/roomcorousel/css/embla.css'



function RoomCorousel({currentClickedRoomImg, hotelNamee, roomNamee, clickedImageTitle, clickedImageid, clickedImageRoom}) {

  const OPTIONS = {}
const SLIDE_COUNT = parseInt(currentClickedRoomImg && currentClickedRoomImg.length)
const SLIDES = currentClickedRoomImg
    
    return (<>
      {/* <Header /> */}
      <EmblaCarousel slides={SLIDES} options={OPTIONS} hotelNamee={hotelNamee} roomNamee={roomNamee} clickedImageid={clickedImageid}/>
      {/* <Footer /> */}
    </>)
}

export default RoomCorousel;