'use client'
import React, { useState, useEffect } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import "./styleee.css";
import { Crown, Dot, Star, MapPin, Heart, Share2, Hotel, CreditCard, Search, Wifi, AirVent, Tv, Milk, ParkingSquare, MessageCircleHeart, Wallet, BatteryCharging, Refrigerator, WashingMachine, Cctv, Check, BedDouble, BedSingle, Bath, TvMinimal, VolumeX, SquareM  } from 'lucide-react';
import RoomCorousel from "./RoomCorousel"

function RoomModal({showRoomModal, onShowRoomModalClose, hotelName, hotelID, roomResult, clickedRoomName, clickedRoomId, clickedRoom, roomAmenetities}) {

    const {isOpen, onOpen, onClose} = useDisclosure();

    const [currentClickedRoomImg, setCurrentClickedRoomImg] = useState([]);

    const [clickedImageTitle, setClickedImageTitle] = useState();
    const [clickedImageid, setClickedImageid] = useState();
    const [clickedImageRoom, setClickedImageRoom] = useState();

    const [hoverActive, setHoverActive] = useState(false);

    const [imageClickFlag, setImageClickFlag] = useState(false);

    const [roomNamee, setRoomNamee] = useState();

    let hotelNamee;

    if(hotelName && hotelID) {
      hotelNamee = hotelName.toString().replace(/\s+/g, '') + "-" + hotelID.toString();
    }
    


    useEffect(() => {

        if(showRoomModal === true) {
            setImageClickFlag(false)
            onOpen();
            handleRoomClick(" ",clickedRoomName, clickedRoomId)
        }

    }, [showRoomModal]);

    const handleOnClose = () => {
        onClose()
        onShowRoomModalClose(true)
    }

    const handleRoomClick = (e, clickedRoomName, clickedRoomid) => {
        console.log("Room Clicked: ",clickedRoomName, clickedRoomid, hotelName, hotelID)

        
        let roomName = clickedRoomName.toString() + "-" + clickedRoomid.toString();
        setRoomNamee(roomName)

        console.log("Room Clicked: ", roomName)

        const getImagesss = async(hotelNamee, roomName) => {
          const response = await fetch(`/api/pms/property_master/room_photomanage?hotelName=${hotelNamee}&roomName=${roomName}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
          },
          });
      
      
          let resultt = await response.json();
          
    
          if(resultt) {
            let imgnam = resultt.imgNames;
    
            const formattedFiles = imgnam?.map((fileName, index) => {
              const id = parseInt(fileName.match(/\d+/)[0], 10);
              return { id: id, title: fileName };
            });
      
            formattedFiles.sort((a, b) => a.id - b.id);

            console.log("Responseeeeeee:::::>",formattedFiles)

            setCurrentClickedRoomImg(formattedFiles)
        
      
            //onSingleDelResult(formattedFiles)
            //window.location.reload()
          }
    
    
        }

        if(hotelNamee && roomName) {
          getImagesss(hotelNamee, roomName)
        }
        
    }

    useEffect(() => {

      if(clickedRoom) {
          console.log("clickedRoom", clickedRoom)
      }

  }, [clickedRoom]);

  const handleImageClick = (e, title, id, clickedRoom) => {
    console.log("Datad: ",title, id, clickedRoom)
    setClickedImageTitle(title)
    setClickedImageid(id)
    setClickedImageRoom(clickedRoom)
    setImageClickFlag(true)
  }

    return (
<> 
      <Modal 
        // size={"5xl"} 
        style={{    height: "fit-content",
          minWidth: "75%",}}
        isOpen={isOpen} 
        onClose={handleOnClose} 
        scrollBehavior={"outside"}
      >
        <ModalContent>
          {(onClose) => (
            <>
             
              <ModalBody>
                <div class="grid grid-cols-12 gap-2 h-[100%]">

          

             
                      <div className="flex col-span-7">
                        
                        <RoomCorousel 
                          currentClickedRoomImg={currentClickedRoomImg} 
                          hotelNamee={hotelNamee} 
                          roomNamee={roomNamee} 
                          clickedImageTitle={clickedImageTitle}
                          clickedImageid={clickedImageid}
                          clickedImageRoom={clickedImageRoom}
                        />
                       
                      </div>
                      
                    
                   
                    <div className="flex col-span-5">

                      <div>
                        <div className="mt-4">
                          <h1 style={{fontSize: "20px",
                              lineHeight: "28px",
                              padding: "0 16px 0 0", fontWeight: "bold"}}
                            >
                            {clickedRoomName}
                          </h1>

                        </div>

                        

                        <div>
                          {roomResult && roomResult.map((item, index) => {
                            if(item.room_name === clickedRoomName) {

                              let roomamenareaa = [];
                              let roomamen = [];
                              let roomamenarea = [];
                              let roomview = '';
                              if(item.room_type !== undefined) {
                                roomview = item.room_type.split("-")[1];
                              }

                              if(roomAmenetities) {
                                roomAmenetities.map((amenity) => {
  
                                    amenity.availability.map((avail) => {

                                        if(avail === item.room_name) {
                                            roomamen.push({area: amenity.property_area, amenity: amenity.property_amenities});
                                            roomamenareaa.push(amenity.property_area)
                                        }
                                    })
                                })
                              }

                              if(roomamenareaa && roomamenareaa.length > 0) {
                                roomamenarea = [...new Set(roomamenareaa)];
                              }

                              console.log("roomamen: ",roomamenarea, roomamen)

                              return (<>

                                <div className="mt-4">
                                  {roomamenarea && roomamenarea.map((area) => {
                                    if(area === "Top" || area === "Top Facilities" || area === "Popular Facilities") {

                                      return (<>
                                        
                                        <ul className="inline-flex flex-wrap gap-2 mt-2">
                                          {roomamen && roomamen.map((item) => {
                                            if(item.area === area) {
                                              if(item.amenity === "Air conditioning") {
                                                return (<>
                                                  <li>
                                                      <div className="inline-flex text-[13px]"><AirVent className="icon-style"/> {"Air Conditioner"}</div>
                                                  </li>
                                                </>)
                                              }

                                              if(item.amenity === "Flat-screen TV") {
                                                return (<>
                                                  <li>
                                                      <div className="inline-flex text-[13px]"><svg xmlns="http://www.w3.org/2000/svg" className="icon-style" width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tv-minimal"><path d="M7 21h10"/><rect width="20" height="14" x="2" y="3" rx="2"/></svg> {item.amenity}</div>
                                                  </li>
                                                </>)
                                              }

                                              if(item.amenity === "Free Wifi") {
                                                return (<>
                                                  <li>
                                                      <div className="inline-flex text-[13px]"><Wifi className="icon-style"/> {item.amenity}</div>
                                                  </li>
                                                </>)
                                              }

                                              if(item.amenity === "Soundproof") {
                                                return (<>
                                                  <li>
                                                      <div className="inline-flex text-[13px]"><VolumeX className="icon-style"/> {item.amenity}</div>
                                                  </li>
                                                </>)
                                              }

                                              if(item.amenity === "Attached Bathroom") {
                                                return (<>
                                                  <li>
                                                      <div className="inline-flex text-[13px]"><Bath className="icon-style"/> {item.amenity}</div>
                                                  </li>
                                                </>)
                                              }
                                              
                                            }
                                          })}
                                        </ul>
                                      </>)
                                    }

                                  })}
                                </div>

                                <div className="mt-4">
                                  <span className="inline-flex"><p className="font-bold">Room size&nbsp;</p> {item.room_size} {item.room_size_type}</span>
                                </div>

                                <div className="mt-4">
                                  {item.bed_type.map((type, index) => {

                                    let numberofbed = item.number_of_beds.find((item) => item.key === type.key)

                                    console.log("Item>>>>,",numberofbed)

                                    if(type.value === "Single Bed") {
                                      return (
                                        <>
                                        <div className="block">
                                        <span key={""} className="data-fontt inline-flex">{numberofbed.value} {type.value} <BedSingle className="h-[1.5rem] ml-1" /></span>
                                        </div>
                                        </>
                                        )
                                    }else {
                                      if(index !== (item.number_of_beds.length - 1)) {
                                        
                                          return (<>
                                          
                                              <span key={index} className="data-fontt">{numberofbed.value} {type.value}{", "}</span>
                                    
                                          </>)
                                      }else{
                                        return (<>
                                        
                                            <span key={index} className="data-fontt">{numberofbed.value} {type.value} <BedDouble className="h-[1.5rem] ml-1 inline-flex"/></span>
                                  
                                        </>)
                                      }
                                  }

                                
                                }
                                )}

                                <span>
                                  <p>
                                    <p className="mt-2 text-[14px]">Comfy beds, 9.1 – Based on 112 reviews</p>
                                    <p className="mt-4 text-[14px]">Guests will have a special experience as the {item.room_name.toLowerCase()} provides a fireplace. This air-conditioned double room includes a flat-screen TV with cable channels, a private bathroom as well as a terrace. The unit offers 1 bed.</p>
                                  </p>
                                </span>
                              </div>

                              {roomview 
                                ? <><div className="mt-4">
                                    <span className="font-bold">{"View"}</span>
                                  </div><ul className="grid grid-cols-2 mt-4">
                                      <li key={""} className="flex">
                                        <div className="inline-flex text-[13px]">
                                          <Check style={{ height: "1rem" }} /> {roomview}
                                        </div>
                                      </li>
                                    </ul></>
                                : ""
                              }
                              

                              <div>
                                {roomamenarea && roomamenarea.map((area) => {
                                  if(area === "Top") {

                                  }else{

                                    return (<>
                                      <div className="mt-4">
                                        {area === "Bathroom" ? <span className="font-bold">In your private {area.toLowerCase()}</span> : <span className="font-bold">{area}</span>}
                                      </div>
                                      <ul className="grid grid-cols-2 mt-4">
                                        {roomamen && roomamen.map((item) => {
                                          if(item.area === area) {
                                            return (<>
                                              <li key={index} className="flex">
                                                  <div className="inline-flex text-[13px]">
                                                      <Check style={{height:"1rem"}}/> {item.amenity}
                                                  </div>
                                              </li> 
                                          </>)
                                          }
                                        })}
                                      </ul>
                                    </>)
                                  }
                                })}
                              </div>


                              </>)

                            } 
                                  
                              
                          })}
                        </div>
                      </div>
                    </div>
                </div>
              </ModalBody>
             
            </>
          )}
        </ModalContent>
      </Modal>
    </>
    )
}

export default RoomModal