'use client'
import { useState, useEffect } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import "./styleee.css";
import {Undo2} from "lucide-react"
import ImageCorousel from "./ImageCorousel"

function ImageModal({showImageModal, onShowImageModalClose, hotelName, hotelID, roomResult}) {

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

        if(showImageModal === true) {
            setImageClickFlag(false)
            onOpen();
            handleRoomClick(" ","Property Main","PM00001")
        }

    }, [showImageModal]);

    const handleOnClose = () => {
        onClose()
        onShowImageModalClose(true)
    }

    const handleRoomClick = (e, clickedRoom, clickedRoomid) => {
        console.log("Room Clicked: ",clickedRoom, clickedRoomid, hotelName, hotelID)

        
        let roomName = clickedRoom.toString() + "-" + clickedRoomid.toString();
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

      if(currentClickedRoomImg) {
          console.log("currentClickedRoomImg", currentClickedRoomImg)
      }

  }, [currentClickedRoomImg]);

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
        style={{    height: "97%",
          minWidth: "96%",}}
        isOpen={isOpen} 
        onClose={handleOnClose} 
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "10px"}}>
                  {imageClickFlag === true ? (
                    <Undo2 onClick={(e) => setImageClickFlag(false)} />
                  ) : (
                    <span></span>
                  )}
                  <span>{hotelName}</span>
                  <Button>Reserve Now</Button>
                </div>
              </ModalHeader>

              <ModalBody>
                <div class="grid grid-cols-12 gap-2 h-[100%]">

          

                    {imageClickFlag === true 
                      ? <div className="flex col-span-10">
                        
                        <ImageCorousel 
                          currentClickedRoomImg={currentClickedRoomImg} 
                          hotelNamee={hotelNamee} 
                          roomNamee={roomNamee} 
                          clickedImageTitle={clickedImageTitle}
                          clickedImageid={clickedImageid}
                          clickedImageRoom={clickedImageRoom}
                        />
                       
                      </div>
                      :           <div className="flex col-span-10">
                      <div class="grid grid-rows-12 grid-flow-row gap-2">
                          <div className="flex w-[100%] overflow-x-scroll row-span-1"
                          style={{height: currentClickedRoomImg && currentClickedRoomImg.length > 0 ? "100%" : "auto"}}
                          >
                              {roomResult && roomResult.map((item) => {
                                let roomNameee = item.room_name + "-" + item.id;

                                  return (<>
                                      <div style={{padding: "10px 40px 10px 10px"}}>
                                          <Button 
                                            className="block rounded-lg object-cover object-center" 
                                            style={{ height: "73px", width: "145%", padding:"0 0 0 0", background:`url(${encodeURI(`http://192.168.29.117:3000/img/${hotelNamee}/${roomNameee}/1.jpg`)})`,
                                              backgroundSize: "cover",
                                              backgroundPosition: "center",
                                              backgroundRepeat: "no-repeat" 
                                            }} 
                                            onClick={(e) => handleRoomClick(e, item.room_name, item.id)}
                                          >
                                              <p style={{    position: "relative",
                                                  top: "28px",
                                                  color: "white",
                                                  fontWeight: "bold",
                                              }}>{item.room_name}</p>
                                          </Button>
                                      </div>
                                  </>)
                              })}
                          </div>
      
                          <div className="row-span-2" style={{height:"0px"}}>
                              <div class="grid grid-cols-4 gap-1" style={{height: currentClickedRoomImg.length > 8 ? "560px" : "auto", overflowY:"auto"}}>
                                

                              {currentClickedRoomImg && currentClickedRoomImg.map((item) => {
                                // console.log("Datra: ",`/img/${hotelNamee}/${roomNamee}/${item.title}`)
                                return (<>
                                <div>
                                <img
                                    className="zoom-image block h-full w-full rounded-lg object-cover object-center"
                                    alt="Mountains"
                                    src={`/img/${hotelNamee}/${roomNamee}/${item.title}`}
                                    key={item.id}
                                    fill
                                    sizes="(min-width: 808px) 50vw, 100vw"
                                    style={{
                                      objectFit: "cover",
                                      height:"118%",
                                      width:"97%",
                                      padding: "0px 0 37px 0",
                                      margin: "5px 0 0 12px",
                                      
                                    }}
                                    onMouseOver={(e) => {setHoverActive(true)}}
                                    onMouseOut={(e) => {setHoverActive(false)}}
                                    onClick={(e) => {handleImageClick(e, item.title, item.id, roomNamee)}}
                                  />
                                </div>
                                  
                               
                                 
                                </>)
                                
                              })}

                              </div>
                          </div>
                      </div>
                  </div>
                    }
                   
                    <div className="flex col-span-2 bg-red-500">
                        Ratings and Reviews
                    </div>

                </div>
              </ModalBody>
              {/* <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
    )
}

export default ImageModal