"use client";
import React, { useState, useEffect } from "react";
import { Button, Input, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useSession } from 'next-auth/react'

export default function Home() {

  const [files, setFiles] = useState([]);
  const [folder, setFolder] = useState('');
  const [subfolder, setSubfolder] = useState('');
  const { data: sessionValue } = useSession();
  const [selectedImageUrls, setSelectedImageUrls] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [hotel_id, setHotel_id] = useState(sessionValue !== undefined ? sessionValue?.user?.Hotel_Id : 0);
  const [hotel_name, setHotel_name] = useState('');
  const [hotelDetails, setHotelDetails] = useState({});
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState([]);
  const [fileExtension, setFileExtension] = useState();
  const [hotelImgs, setHotelImgs] = useState();
  const [selectedRoom, setSelectedRoom] = useState("Property Main");
  const [selectedRoomId, setSelectedRoomId] = useState("propertymain");
  const [roomResult, setRoomResult] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [roomName, setRoomName] = useState();
  const [currentRoomImage, setCurrentRoomImage] = useState();

  const [hotelName, setHotelName] = useState('');
  // let hotelName = capitalize_each_word(hotel_name) + "-" + hotel_id.toString();

  useEffect(() => {
    if (sessionValue !== undefined) {
      setHotel_id(sessionValue?.user?.Hotel_Id)
    }
  }, [sessionValue])

  const fxnOne = async () => {
    try {

      const payload = {
        hotelId: hotel_id
      }

      const response = await fetch(`/api/hotels_copy/hotel_info/hotel_by_id`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json();

      setHotelDetails(result.data);

      setHotel_name(result.data.Hotel_name);

      setHotelName(capitalize_each_word(result.data.Hotel_name) + "-" + hotel_id.toString())

      setFolder(capitalize_each_word(result.data.Hotel_name) + "-" + hotel_id.toString())

      const response1 = await fetch(`/api/pms/property_master/room_details?hotelId=${hotel_id.toString()}&type=room`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result1 = await response1.json();

      const impData = result1.data;

      setRoomResult(impData)


    } catch (error) {

    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    try {

      if (hotel_id !== 0) {
        fxnOne();
      }

    } catch (error) {

    } finally {

    }
  }, [hotel_id])

  const handleUpload = async () => {

    console.log("File and folder: ", files, folder, hotelName, subfolder)
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
    formData.append('folder', folder);
    formData.append('subfolder', subfolder);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    console.log("Date:::::::>0,", data)
    if (data.success) {
      fetchImagesFromFolder(folder, subfolder)
      setFiles([])
      setSelectedImage("")
      setSelectedFile([])
      window.alert("Uploaded Successfully!")
    } else {
      console.error('Upload failed:', data.error);
    }
  };

  const fetchImagesFromFolder = async (folder, subfolder) => {
    try {
      console.log("Data:::::>", folder, subfolder)
      const response = await fetch(`/api/upload?folder=${encodeURIComponent(folder)}&subfolder=${encodeURIComponent(subfolder)}`, {
        method: 'GET',
      });
      const data = await response.json();
      console.log("Data:::::>", data.results)
      if (data.success) {
        setImageUrls(data.results);
      } else {
        console.error('Fetch failed:', data.error);
      }
    } catch (error) {
      console.log("Err: ", error)
    }

  };


  useEffect(() => {

    console.log("Response:::::>", selectedRoom, selectedRoomId, hotelName);

    if (selectedRoom && selectedRoomId) {
      setCurrentRoomImage('')
      setRoomName(selectedRoom.replace(/"/g, '') + "-" + selectedRoomId.replace(/"/g, ''))
      let room_name = selectedRoom.replace(/"/g, '') + "-" + selectedRoomId.replace(/"/g, '');

      console.log("roomname: ", folder, room_name)

      setSubfolder(room_name)

      fetchImagesFromFolder(folder, room_name)

    }

  }, [selectedRoom, selectedRoomId, folder])

  if (isLoading) {
    return <div>Loading...</div>;
  }


  const handleImageSelect = (url) => {
    setSelectedImageUrls((prev) =>
      prev.includes(url) ? prev.filter((item) => item !== url) : [...prev, url]
    );
  };



  const handleDelete = async () => {
    try {
      const publicIds = selectedImageUrls.map(url => {
        // Extract the public ID from the image URL
        const urlParts = url.split('/');
        const publicId = urlParts[urlParts.length - 1].split('.')[0];
        return publicId;
      });

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ publicIds: publicIds, action: "delete", folder: folder }),
      });

      const result = await response.json();
      if (result.success) {
        // Remove deleted images from the state
        setImageUrls((prev) =>
          prev.filter((url) => !selectedImageUrls.includes(url))
        );
        setSelectedImageUrls([]);
        window.alert("Images deleted successfully!");
      } else {
        console.error('Delete failed:', result.error);
      }
    } catch (error) {
      console.error('Error deleting images:', error);
    }
  };


  return (

    <><div className="flex text-start" style={{
      position: "relative",
      left: "34px",
      top: "24px",
    }}>

      <Autocomplete
        key={selectedRoomId}
        size='sm'
        variant='bordered'
        defaultSelectedKey={selectedRoomId}
        className="w-full"
        inputProps={{
          classNames: {
            inputWrapper: "w-[400px]",
          },
        }}
        labelPlacement='outside-left'
        value={selectedRoom}
        allowsCustomValue={true}
        onInputChange={(value) => setSelectedRoom(value)}
        onSelectionChange={(key) => {
          if (key !== "propertymain") {
            const selectedRoomName = roomResult.find((Room) => Room._id === key)?.room_name || "";
            setSelectedRoomId(key);
            setSelectedRoom(selectedRoomName);
          }else {
            setSelectedRoomId(key);
            setSelectedRoom("Property Main");
          }
        }}
      >
        <AutocompleteItem key={"propertymain"} value={"Property Main"}>
          {"Property Main"}
        </AutocompleteItem>
        {roomResult?.map((Room) => (
          <AutocompleteItem key={Room._id} value={Room.room_name}>
            {Room.room_name + " (" + Room.room_no + ")"}
          </AutocompleteItem>
        ))}
      </Autocomplete>


    </div>

      <div
        className=""
        style={{
          position: "relative",
          top: "50px",
          left: "34px",
          width: "177px",
          height: "200px",
        }}
      >
        <div>
          {/* Triggering the input click using a div */}
          <div
            onClick={() => document.getElementById('fileInput').click()}
            className="w-40 aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer"
            style={{
              width: "200%",
              height: "200px",
            }}
          >
            {selectedImage ? (
              <img src={selectedImage} alt="Selected" />
            ) : (
              <span>Select Image</span>
            )}
          </div>

          {/* Hidden file input */}
          <input
            id="fileInput"
            type="file"
            hidden
            onChange={({ target }) => {
              if (target.files) {
                const file = target.files;
                const file1 = target.files[0];

                if (file && file1) {
                  console.log("Initial FXN:::::>", file, file1);

                  setSelectedImage(URL.createObjectURL(file1 && file1));

                  setSelectedFile(file);

                  setFiles(Array.from(file));
                } else {
                  alert("No files selected");
                }
              }
            }}
            multiple
          />
        </div>

        <div
          style={{
            position: "relative",
            top: "23px",
          }}
        >
          <p>{selectedFile ? `${selectedFile.length} files selected` : ""}</p>
          <button
            onClick={handleUpload}
            disabled={uploading}
            style={{
              opacity: uploading ? ".5" : "1",
              background: "red",
            }}
            className="p-3 w-32 text-center rounded text-white"
          >
            {uploading ? "Uploading.." : "Upload"}
          </button>
        </div>
      </div>

      <div style={{
        display: "flex",
        justifyContent: "flex-end",
        margin: "0 0 46px 0",
        background: "whitesmoke",
        position: "relative",
        top: "24%",
      }}>
        <div className="p-2">
          <Button onClick={handleDelete}>Delete</Button>
        </div>

      </div>

      <div className="" style={{
        display: "grid",
        gridGap: "8px",
        gridTemplateColumns: "auto auto auto auto",
        position: "relative",
        top: "155px",
        left: "35px",
        width: "95%",
      }}>


        {imageUrls.map((url, index) => (
          <div key={index} className="relative">
            <img
              src={url}
              alt={`Uploaded ${index}`}
              className={`w-full h-auto object-cover ${selectedImageUrls.includes(url) ? 'border-2 border-blue-600' : ''}`}
              onClick={() => handleImageSelect(url)}
            />
            {selectedImageUrls.includes(url) && (
              <button
                onClick={() => handleImageSelect(url)}
                className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded"
              >
                X
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}



function capitalize_each_word(val) {
  if (val === undefined || val === null) {
    return "";
  }

  const words = val.toString().split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }

  var str = words.join("");
  var replacedStr = "";

  for (var i = 0; i < str.length; i++) {
    if (str[i] === ",") {
      replacedStr += "";
    } else {
      replacedStr += str[i];
    }
  }

  return replacedStr;
}



