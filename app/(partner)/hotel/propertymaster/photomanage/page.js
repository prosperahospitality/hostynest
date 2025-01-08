'use client'
import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { GetServerSideProps, NextPage } from "next";
import Image from 'next/image'
import { Button, Input, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useSearchParams } from 'next/navigation'
import HotelName, { IMAGES } from '@/public/index'
import PhotoManageGrid from '@/app/(partner)/hotel/propertymaster/photomanage/PhotoManageGrid'
import { Trash } from 'lucide-react';


const PhotoManage = () => {
  const searchParams = useSearchParams();
  const hotel_id = searchParams.get('hotel_id');
  const hotel_name = searchParams.get('hotel_name');



  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  let hotelName = capitalize_each_word(hotel_name) + "-" + hotel_id.toString();

  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState([]);

  //const [imgRes, setImgRes] = useState();
  const [fileExtension, setFileExtension] = useState();

  const [hotelImgs, setHotelImgs] = useState();

  const [selectedRoom, setSelectedRoom] = useState();
  const [selectedRoomId, setSelectedRoomId] = useState();

  const [roomResult, setRoomResult] = useState();

  const [isLoading, setIsLoading] = useState(true);

  const [roomName, setRoomName] = useState();


  const [currentRoomImage, setCurrentRoomImage] = useState();

  const getImages = async (hotelName, roomName) => {
    const response = await fetch(`/api/pms/property_master/room_photomanage?hotelName=${hotelName}&roomName=${roomName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });


    let resultt = await response.json();
    console.log("Responseeeeeee:::::>", resultt)
    setCurrentRoomImage(resultt.imgNames)
  }

  const initialFxn = async () => {
    try {
      const response = await fetch(`/api/pms/property_master/room_details?hotelId=${hotel_id.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();

      console.log("Property Rooms: ", result.dataActive)

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

    if (selectedFile === '' || selectedFile.length === 0) {
      alert("No files selected")
    } else {


      setCurrentRoomImage('')

      let formData = new FormData();
      const arrayFromObject = Object.values(selectedFile);
      console.log(arrayFromObject, selectedFile);
      arrayFromObject.forEach(file => {
        formData.append('file', file);
      });
      formData.append('hotel_id', hotel_id);
      formData.append('hotel_name', hotel_name);
      formData.append('room_result', JSON.stringify(roomResult));
      formData.append('selectedRoom', JSON.stringify(selectedRoom));
      formData.append('selectedRoomId', JSON.stringify(selectedRoomId));

      const response = await fetch('/api/pms/property_master/room_photomanage', {
        method: "POST",
        body: formData,
      });

      //console.log("Response:::::>",response)

      let result = response.json()

      result.then(result => {
        console.log("Result:::::>", result);

        if (result) {
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
        //getImages(hotelName, roomName)
        //setCurrentRoomImage('')
        setSelectedImage('')
        setSelectedFile('')
      } else {
        console.error('Error uploading file:', response.statusText);
      }

    }
  };

  useEffect(() => {
    console.log("Selected File:::::::>", selectedFile)
  }, [selectedFile])

  useEffect(() => {

    console.log("Change in room: ", selectedRoom, selectedRoomId, roomName)



    if (selectedRoom && selectedRoomId) {
      setCurrentRoomImage('')
      setRoomName(selectedRoom.replace(/"/g, '') + "-" + selectedRoomId.replace(/"/g, ''))
      let room_name = selectedRoom.replace(/"/g, '') + "-" + selectedRoomId.replace(/"/g, '');

      async function roomPhoto() {
        const response = await fetch(`/api/pms/property_master/room_photomanage?hotelName=${hotelName}&roomName=${room_name}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });


        let resultt = await response.json();
        console.log("Response:::::>", resultt)


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

  const handleSelectedCheckboxes = (val) => {

    setSelectedCheckboxes(val)

  }

  const getTagsImage = async () => {

    const response = await fetch(`/api/pms/property_master/room_photomanage?hotelName=${hotelName}&roomName=${roomName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });


    let resultt = await response.json();
    console.log("Resssssss:::::::::>", resultt)
    let imgtagg = resultt.imageeeTag;
    //setImageeeTag(resultt.imageeeTag)
    return imgtagg;
  }

  const handleMultipleDelete = async () => {

    console.log("Selected Delete Multiple: ", selectedCheckboxes, hotelName,
      roomName)

    const [name, hotelid] = hotelName.split("-");

    const [roomname, roomid] = roomName.split("-");

    const getImagesss = async (hotelName, roomName) => {
      const response = await fetch(`/api/pms/property_master/room_photomanage?hotelName=${hotelName}&roomName=${roomName}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });


      let resultt = await response.json();
      console.log("Responseeeeeee:::::>", resultt)

      if (resultt) {
        let imgnam = resultt.imgNames;

        const formattedFiles = imgnam?.map((fileName, index) => {
          const id = parseInt(fileName.match(/\d+/)[0], 10);
          return { id: id, title: fileName };
        });

        formattedFiles.sort((a, b) => a.id - b.id);


        //onSingleDelResult(formattedFiles)
        window.location.reload()
      }


    }

    let firstOperation = selectedCheckboxes.map((item) => {
      const [imgID, text] = item.split(".")
      let id = parseInt(imgID)
      console.log("Image Id::::>", id)


      getTagsImage().then(result => {


        let ressssult = result.sort((a, b) => (a.id < b.id) ? -1 : (a.id > b.id) ? 1 : 0);
        console.log("Tmage Tag::::", ressssult)

        if (ressssult) {

          let abc = ressssult.find((item) => item.Hotel_Id === parseInt(hotelid) &&
            item.selected_room === roomid &&
            item.img_id === parseInt(id))

          let k = abc && abc.img_checks;

          let i = abc && abc.img_tags;

          let g = abc && abc.include_in_main;

          console.log("Single Delete k", id, item, k, i, abc, g)



          const singledelete = async () => {
            let formData = new FormData();

            formData.append('hotel_Name', hotelName);
            formData.append('room_Name', roomName);
            formData.append('imgDelId', id);
            formData.append('imgDelTitle', item);
            formData.append('operation', "multiple_delete_img");
            formData.append('selectedCheckboxesfordelete', JSON.stringify(selectedCheckboxes));

            if (abc) {
              formData.append('img_checks_del', JSON.stringify(k));
              formData.append('img_tags_del', JSON.stringify(i));
              formData.append('img_include_in_main', g);
            } else {
              formData.append('sub_operation', "deleteWithoutRoom");
            }


            const response = await fetch('/api/pms/property_master/room_photomanage', {
              method: "POST",
              body: formData,
            });

            let result = response.json()

            result.then(result => {
              //alert("File deleted successfully!")
              console.log("result: ", result)

              if (item === selectedCheckboxes[selectedCheckboxes.length - 1]) {
                console.log("Rename after Delete");

                const renameDelete = async () => {
                  let formData = new FormData();

                  formData.append('hotel_Name', hotelName);
                  formData.append('room_Name', roomName);
                  formData.append('imgDelId', id);
                  formData.append('imgDelTitle', item);
                  formData.append('operation', "renameAfterMultipleDelete");
                  formData.append('selectedCheckboxesfordelete', JSON.stringify(selectedCheckboxes));

                  if (abc) {
                    formData.append('img_checks_del', JSON.stringify(k));
                    formData.append('img_tags_del', JSON.stringify(i));
                    formData.append('img_include_in_main', g);
                  } else {
                    formData.append('sub_operation', "deleteWithoutRoom");
                  }


                  const response = await fetch('/api/pms/property_master/room_photomanage', {
                    method: "POST",
                    body: formData,
                  });

                  let result = response.json()

                  result.then(result => {
                    alert(`${selectedCheckboxes.length} files deleted successfully!`)
                    console.log("result: ", result)



                    getImagesss(hotelName, roomName)
                  })
                }

                renameDelete()


              }

              //getImagesss(hotelName, roomName)
            })
          }

          singledelete()






        } else {
          console.log("No elements in the array.");
        }

      });

    })




  }

  return (
    <>
      <HotelName hotel_Name={hotel_name} onHotelName={handleHotelsImgs} />
      <div className="flex text-start" style={{
        position: "relative",
        left: "34px",
        top: "24px",
      }}>

        <Autocomplete
          size='sm'
          variant='bordered'
          defaultSelectedKey={selectedRoomId}
          className='w-44'
          labelPlacement='outside-left'
          value={selectedRoom}
          allowsCustomValue={true}
          onInputChange={(value) => setSelectedRoom(value)}
          onSelectionChange={(key) => setSelectedRoomId(key)}
        >
          {roomResult?.map((Room) => (
            <AutocompleteItem key={Room.id} value={Room.room_name}>
              {Room.room_name}
            </AutocompleteItem>
          ))}
        </Autocomplete>


      </div>
      <div className=" " style={{
        position: "relative",
        top: "50px",
        left: "34px",
        width: "177px",
        height: "200px",
      }}>

        <div>
          <label>
            <input
              type="file"
              hidden
              onChange={({ target }) => {
                if (target.files) {
                  const file = target.files;
                  const file1 = target.files[0];

                  if (file && file1) {
                    console.log("Initial FXN:::::>", file, file1)

                    setSelectedImage(URL.createObjectURL(file1 && file1));

                    setSelectedFile(file);
                  } else {
                    alert("No files selected")
                  }


                  //onChange={(e) => images.push(e.target.files[0])}
                }
              }}
              multiple />
            <div className="w-40 aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer"
              style={{
                width: "200%",
                height: "200px"
              }}
            >



              {selectedImage ? (
                <img src={selectedImage} alt="" />
              ) : (
                <span>Select Image</span>
              )}
            </div>
          </label>
        </div>
        <div style={{
          position: "relative",
          top: "23px",
        }}>
          <p>{selectedFile ? `${selectedFile.length} files selected` : ""}</p>
          <button
            onClick={handleUpload}
            disabled={uploading}
            style={{ opacity: uploading ? ".5" : "1" }}
            className="bg-red-600 p-3 w-32 text-center rounded text-white"
          >
            {uploading ? "Uploading.." : "Upload"}
          </button>
        </div>
      </div>

      {/* {imgRes && roomName
        ? imgRes?.map((images) => {
            return <img src={'/img/' + hotelName + '/' + roomName + '/' + images.toString() + fileExtension.toString()} key={" "}/>
        }) 
        : " "
    } */}

      <div style={{
        display: "flex",
        justifyContent: "flex-end",
        margin: "0 0 46px 0",
        background: "whitesmoke",
        position: "relative",
        top: "24%",
      }}>
        <Button onClick={handleMultipleDelete}><Trash style={{ height: "20px" }} />Delete</Button>
      </div>

      <div>


{console.log("currentRoomImage: ", currentRoomImage)}
        <PhotoManageGrid currentRoomImage={currentRoomImage} hotelName={hotelName} roomName={roomName} roomResult={roomResult} onSelectedCheckboxes={handleSelectedCheckboxes} />
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