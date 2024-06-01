'use client'
import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { GetServerSideProps, NextPage } from "next";
import Image from 'next/image'
import { Button, Input, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useSearchParams } from 'next/navigation'
import HotelName, { IMAGES } from '@/public/index'
import PhotoManageGrid from '@/app/(partner)/hotel/propertymaster/photomanage/PhotoManageGrid'

const PhotoManage = () => {
    const searchParams = useSearchParams();
    const hotel_id = searchParams.get('hotel_id');
    const hotel_name = searchParams.get('hotel_name');

    let hotelName = capitalize_each_word(hotel_name) + "-" + hotel_id.toString();

    const [uploading, setUploading] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    //const [imgRes, setImgRes] = useState();
    const [fileExtension, setFileExtension] = useState();

    const [hotelImgs, setHotelImgs] = useState();

    const [selectedRoom, setSelectedRoom] = useState();
    const [selectedRoomId, setSelectedRoomId] = useState();
    
    const [roomResult, setRoomResult] = useState();

    const [isLoading, setIsLoading] = useState(true);

    const [roomName, setRoomName] = useState();

    
    const [currentRoomImage, setCurrentRoomImage] = useState();

    

    const initialFxn = async () => {
      try {
          const response = await fetch(`/api/pms/property_master/room_details?hotelId=${hotel_id.toString()}`, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
              },
          });
          const result = await response.json();

          console.log("Property Rooms: ",result.dataActive)
          
          setRoomResult(result.dataActive)

          if (result && result.dataActive.length > 0 && !selectedRoom) {
            const newElement = {
              id: "PM00001",
              room_name: "Property Main"
            };
            result.dataActive.unshift(newElement);
            setSelectedRoomId(result.dataActive[0].id);
            setSelectedRoom(result.dataActive[0].room_name);
          }

      } catch (error) {
          console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); 
      }
  }

  useEffect(() => {
      initialFxn()
  }, [])

  const handleUpload = async () => {
    setCurrentRoomImage('')
    let formData = new FormData();
    formData.append('file', selectedFile)
    formData.append('hotel_id', hotel_id);
    formData.append('hotel_name', hotel_name);
    formData.append('room_result', JSON.stringify(roomResult));
    formData.append('selectedRoom', JSON.stringify(selectedRoom));
    formData.append('selectedRoomId', JSON.stringify(selectedRoomId));

    const response = await fetch('/api/pms/property_master/room_photomanage', {
      method: "POST",
      body: formData,
    });

    console.log("Response:::::>",response)

    let result = response.json()

    result.then(result => {
        console.log("Result:::::>", result);

        if(result) {
            //setImgRes(result?.imgNumbers)
            setCurrentRoomImage(result?.imgNames)
            setFileExtension(result?.fileExtensions)
        }

      }).catch(error => {
        console.error('Error:', error);
      });

    //console.log("Result:::::>",result)

    if (response.ok) {
      console.log('File uploaded successfully!');
      alert('File uploaded successfully!')
      setCurrentRoomImage('')
    } else {
      console.error('Error uploading file:', response.statusText);
    }
  };

  useEffect(() => {
    console.log("Selected File:::::::>", selectedFile)
}, [selectedFile])

useEffect(() => {

  console.log("Change in room: ",selectedRoom, selectedRoomId)

  

  if(selectedRoom && selectedRoomId) {
    setCurrentRoomImage('')
    setRoomName(selectedRoom.replace(/"/g, '') + "-" + selectedRoomId.replace(/"/g, ''))
    let room_name = selectedRoom.replace(/"/g, '') + "-" + selectedRoomId.replace(/"/g, '');

    async function roomPhoto () {
      const response = await fetch(`/api/pms/property_master/room_photomanage?hotelName=${hotelName}&roomName=${room_name}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
      },
      });
  

      let resultt = await response.json();
      console.log("Response:::::>",resultt)
      setCurrentRoomImage(resultt.imgNames)
    }

    roomPhoto()

  }
    
}, [selectedRoom])

// useEffect(() => {
//     console.log("ImgRes:::::::>", imgRes, fileExtension, hotelName)


//   if(roomName) {
//     let img = imgRes?.map((images) => {
//       return '/img/' + hotelName + '/' + roomName + '/' + images.toString() + fileExtension.toString()
//   })

//   console.log("RESSSS::::::>",img)
//   }


// }, [imgRes, fileExtension, roomName])

useEffect(() => {
    console.log("hotelImgs:::::::>", hotelImgs)
}, [hotelImgs])

const handleHotelsImgs = (Imgs) => {
    setHotelImgs(Imgs);
}

if (isLoading) {
  return <div>Loading...</div>;
}
   
    return (
        <>
        <HotelName hotel_Name={hotel_name} onHotelName={handleHotelsImgs} />
        <div className="flex text-start" style={{position: "relative",
    left: "27px",
    top: "21px",}}>

<Autocomplete
                        size='sm'
                        variant='bordered'
                        defaultSelectedKey={selectedRoomId}
                        className='w-44'
                        labelPlacement='outside-left'
                        value={selectedRoom}
                        allowsCustomValue={true}
                        onInputChange={(value) =>  setSelectedRoom(value)}
                        onSelectionChange={(key) => setSelectedRoomId(key)}
                    >
                        {roomResult?.map((Room) => (
                            <AutocompleteItem key={Room.id} value={Room.room_name}>
                                {Room.room_name}
                            </AutocompleteItem>
                        ))}
                    </Autocomplete>

       
        </div>
        <div className="max-w-4xl mx-auto p-20 space-y-6">

       

      <label>
        <input
          type="file"
          hidden
          onChange={({ target }) => {
            if (target.files) {
              const file = target.files[0];
              if(file) {
                setSelectedImage(URL.createObjectURL(file && file));
                setSelectedFile(file);
                console.log("File Initial::::::::::>", file, URL.createObjectURL(file))
              }

            }
          }}
        />
        <div className="w-40 aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer">



          {selectedImage ? (
            <img src={selectedImage} alt="" />
          ) : (
            <span>Select Image</span>
          )}
        </div>
      </label>
      <button
        onClick={handleUpload}
        disabled={uploading}
        style={{ opacity: uploading ? ".5" : "1" }}
        className="bg-red-600 p-3 w-32 text-center rounded text-white"
      >
        {uploading ? "Uploading.." : "Upload"}
      </button>

    </div>

    {/* {imgRes && roomName
        ? imgRes?.map((images) => {
            return <img src={'/img/' + hotelName + '/' + roomName + '/' + images.toString() + fileExtension.toString()} key={" "}/>
        }) 
        : " "
    } */}

        <div>
          


          <PhotoManageGrid currentRoomImage={currentRoomImage} hotelName={hotelName} roomName={roomName}/>
          </div></>
    )
}

export default PhotoManage;


function capitalize_each_word(val) {

    if (val === undefined || val === null) {
      return ''; 
    }
  
    const words = val.toString().split(" ");

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