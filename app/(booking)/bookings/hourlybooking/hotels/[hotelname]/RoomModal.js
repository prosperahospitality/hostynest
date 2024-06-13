'use client'
import React, { useState, useEffect } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import "./styleee.css";
import {Undo2} from "lucide-react"
import RoomCorousel from "./RoomCorousel"

function RoomModal({showRoomModal, onShowRoomModalClose, hotelName, hotelID, roomResult, clickedRoomName, clickedRoomId, clickedRoom}) {

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
            handleRoomClick(" ","Property Main","PM00001")
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
        style={{    height: "150%",
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

                      <div className="mt-4">
                        <h1 style={{fontSize: "20px",
                            lineHeight: "28px",
                            padding: "0 16px 0 0", fontWeight: "bold"}}
                          >
                          {clickedRoomName}
                        </h1>
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