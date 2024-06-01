'use client'
import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { useSortable, arrayMove  } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, CheckboxGroup, Checkbox, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, cn} from "@nextui-org/react";
import {
  AddNoteIcon,
  CopyDocumentIcon,
  EditDocumentIcon,
  DeleteDocumentIcon} from "./icon.jsx";
  import { Tally3, Move, Plus } from 'lucide-react';
import { WithContext as ReactTags } from 'react-tag-input';
import "./photogrid.css"
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';




const EditModal = ({ currentRoomImage, hotelName, roomName, modalOpen, selectedImageTitle, selectedImageID, onCloseModal, roomResult, resultImageTags }) => {

    const {isOpen, onOpen, onClose} = useDisclosure();
    // let suggestions = '';
    const [predictions, setPredictions] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [lastID, setLastID] = useState(0);
    const [selectSuggestions, setSelectSuggestions] = useState([]);
    const [imageeeTag, setImageeeTag] = useState([]);
    const [hoteltext, hotelid] = hotelName.split("-");

    const [previousCheckBox, setPreviousCheckBox] = useState([]);

    const [includeCheckBox, setIncludeCheckBox] = useState(false);
    const [previousIncludeCheckBox, setPreviousIncludeCheckBox] = useState();
    
    
    

    
    const imgRef = useRef(null);

    let COUNTRIES = [
        { id: 'Thailand', text: 'Thailand' },
        { id: 'India', text: 'India' },
        { id: 'Vietnam', text: 'Vietnam' },
        { id: 'Turkey', text: 'Turkey' }
    ];

    const getTagsImage = async () => {

        const response = await fetch(`/api/pms/property_master/room_photomanage?hotelName=${hotelName}&roomName=${roomName}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
          },
          });
      
      
          let resultt = await response.json();
          //console.log("Resssssss:::::::::>",resultt.imageeeTag)
          let imgtagg = resultt.imageeeTag;
          setImageeeTag(resultt.imageeeTag)
          return imgtagg;
    }

    const getTagsImageeee = async () => {

        const response = await fetch(`/api/pms/property_master/room_photomanage?hotelName=${hotelName}&roomName=${roomName}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
          },
          });
      
      
          let resultt = await response.json();

          let imgtagg = resultt.imageeeTag;

          let ressssult = imgtagg.sort((a, b) => (a.id < b.id) ? -1 : (a.id > b.id) ? 1 : 0);
 
        let abc = ressssult.find((item) => item.Hotel_Id === parseInt(hotelid) && 
        item.selected_room === roomid &&
        item.img_id === parseInt(selectedImageID))
  
        let ki = abc && abc.include_in_main;

        if(ki === undefined || ki === false) {
            let result = false;

            console.log("ki1899999999999999999resultfalse: ",result)

            return result
        }else{
            let result = true;

            console.log("ki1899999999999999999resulttrue: ",result)

            return result
        }

    }

    const generateUniqueID = () => {
        //console.log("IDDD02",lastID)
      const newID = `PMSIT${String(lastID + 1).padStart(5, '0')}`;
      setLastID(lastID + 1);
      return newID;
      };

    const [roomtext, roomid] = roomName ? roomName.split('-') : [null, null];
    
    const [selectedCheckBoxes, setSelectedCheckBoxes] = useState([]);

    console.log("Room name:::::>",roomtext, roomid, roomName,selectedCheckBoxes )

    function getCurrentDateTime() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const hours = String(today.getHours()).padStart(2, '0');
        const minutes = String(today.getMinutes()).padStart(2, '0');
        const seconds = String(today.getSeconds()).padStart(2, '0');
        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    }   


      const [tags, setTags] = useState([]);

      const handleDelete = i => {
        setTags(tags.filter((tag, index) => index !== i));

        let payload = {
            Hotel_Id: parseInt(hotelid),
            selected_room: roomid,
            img_id: selectedImageID,
            img_title: selectedImageTitle,
            img_tags: tags.filter((tag, index) => index !== i),
        }

        const addToDb = async () => {
            const response = await fetch(`/api/pms/property_master/room_photomanage?operationnn=${"deleteImageTag"}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
              });
          
          
              let resultt = await response.json();
        }

        addToDb()
      };
      const handleAddition = tag => {
        console.log("Additions:::::>",tag)
        if(tags?.includes((item) => item.id === tag.id)) {

        }else{
            setTags([...tags, tag]);
            setSuggestions(suggestions?.filter((itemss) => !(itemss.text === tag.text)))
            let payload = {
                id: generateUniqueID(),
                Hotel_Id: parseInt(hotelid),
                selected_room: roomid,
                img_id: selectedImageID,
                img_title: selectedImageTitle,
                img_tags: [tag],
                img_checks: [],
                creation_date: getCurrentDateTime(),
                last_update_on: getCurrentDateTime(),
            }

            const addToDb = async () => {
                const response = await fetch(`/api/pms/property_master/room_photomanage?operationnn=${"addImageTag"}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                  });
              
              
                  let resultt = await response.json();
            }

            addToDb()

       }

      };

      const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice();
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
        setTags(newTags);
      };

      const handleTagClick = index => {
        console.log('The tag at index ' + index + ' was clicked');
      };

      const loadModelAndDetect = async () => {
        // Set up TensorFlow.js backend
        await tf.setBackend('webgl');
  
        // Load the model
        const model = await cocoSsd.load();
  
        // Make predictions on the image
        if (imgRef.current) {
          const image = imgRef.current;
          const detections = await model.detect(image, 6);
          setPredictions(detections);
        }
      };

    useEffect(() => {



        if (modalOpen) {

            const abc = async() => {
                let res = await getTagsImageeee();
                setIncludeCheckBox(res);
            }
            abc()

            onOpen()
            console.log("Roomdsssss:::::::::>",[roomid])
            setSelectedCheckBoxes([roomid])
            loadModelAndDetect();



          

            if(resultImageTags) {
                setSuggestions(resultImageTags.map(tag => {
                    return {
                      id: tag.id.trim(),
                      text: tag.tag_name.trim()
                    };
                  }));
            }

            getTagsImage().then(result => {
       

                let ressssult = result.sort((a, b) => (a.id < b.id) ? -1 : (a.id > b.id) ? 1 : 0);
                console.log("Tmage Tag::::", ressssult)

                if (ressssult && ressssult.length > 0) {
                    const lastElement = ressssult[ressssult.length - 1]; 
                    const lastElementId = lastElement.id; 
                    const numericPart = lastElementId.match(/(?<=PMSIT)0*(\d+)/); 
                    const lastNumericId = numericPart ? parseInt(numericPart[1]) : null;
                   // console.log("IDDD03", lastNumericId);
                    setLastID(lastNumericId);

                    //console.log("sdfasdfsadf", hotelid,roomid,selectedImageID)

                    let abc = ressssult.find((item) => item.Hotel_Id === parseInt(hotelid) && 
                    item.selected_room === roomid &&
                    item.img_id === parseInt(selectedImageID))
        
                    let k = abc && abc.img_checks;
                    
                    let arr = [];

                    if(k && k.length !== 0) {
                        roomResult?.map((item,index) => {
                            if(k.includes(item.id)) {
                                //console.log("True", item.id)
                                arr.push(item.id)
                            }else {
                               // console.log("False", item.id)
                            }
                        })
    
                        console.log("werqwkej: ",k)
                        setSelectedCheckBoxes(k)
                        setPreviousCheckBox(k)
                        // if(k.length === arr.length) {
                        //     console.log("Final True")
                        // }
                    }



                    console.log("Currently selected edit img: ",k)
                } else {
                    console.log("No elements in the array.");
                    setLastID(0);
                }

              });
           

        }else{
            onClose()
        }
    
      }, [modalOpen]);



    
      useEffect(() => {
       // console.log("Suggestions:::>",suggestions)
      }, [suggestions]);

      useEffect(() => {
       // console.log("Predictions:::>",predictions)

        if(predictions) {
            let t = [];
            {suggestions?.map((item) => {
                if (predictions?.some((itemm) => itemm.class === 'bed') || predictions?.some((itemm) => itemm.class === 'chair') || predictions?.some((itemm) => itemm.class === 'couch')) {
                    if (item.text && item.text.includes('Room') || item.text.includes('Bed') || item.text.includes('Chair') || item.text.includes('Couch') || item.text.includes('Sofa')) {
                        if(predictions?.some((itemm) => itemm.class === 'chair')) {
                            if(item.text && item.text.includes('Room') || item.text.includes('Bed') || item.text.includes('Chair')) {
                                //console.log("Result1::::::::>", item.text)
                                t.push({id: item.text, text: item.text})
                            }

                        }else if(predictions?.some((itemm) => itemm.class === 'bed')) {
                            if(item.text && item.text.includes('Room') || item.text.includes('Bed')) {
                                //console.log("Result1::::::::>", item.text)
                                t.push({id: item.text, text: item.text})
                            }
                        }else if(predictions?.some((itemm) => itemm.class === 'couch')) {
                            if(item.text && item.text.includes('Room') || item.text.includes('Bed') || item.text.includes('Couch') || item.text.includes('Sofa')) {
                                //console.log("Result1::::::::>", item.text)
                                t.push({id: item.text, text: item.text})
                            }
                        }
                        
                        
                    }
                } else if (predictions?.some((itemm) => itemm.class === 'toilet')) {
                    if (item.text === "Toilet" || item.text.includes('Sink')) {
                        t.push({id: item.text, text: item.text})
                    }
                }else if(predictions?.some((itemm) => itemm.class === 'sink')) {
                    if (item.text.includes('Sink')) {
                        t.push({id: item.text, text: item.text})
                    }
                }
                else if(predictions?.some((itemm) => itemm.class === 'potted plant') || predictions?.some((itemm) => itemm.class === 'book')) {
                    if(predictions?.some((itemm) => itemm.class === 'potted plant') && predictions?.some((itemm) => itemm.class === 'book')) {
                        if(item.text && item.text.includes('Room') || item.text.includes('Potted Plant') || item.text && item.text.includes('Book') || item.text.includes('Book Shelf') || item.text.includes('Library')) {

                            t.push({id: item.text, text: item.text})
                        }
                    }else if(predictions?.some((itemm) => itemm.class === 'potted plant')) {
                        if(item.text && item.text.includes('Room') || item.text.includes('Potted Plant')) {

                            t.push({id: item.text, text: item.text})
                        }
                    }else if(predictions?.some((itemm) => itemm.class === 'book')) {
                        if(item.text && item.text.includes('Book') || item.text.includes('Book Shelf') || item.text.includes('Library')) {

                            t.push({id: item.text, text: item.text})
                        }
                    }
                   
                }
                else if(predictions?.some((itemm) => itemm.class === 'oven' || predictions?.some((itemm) => itemm.class === 'refrigerator'))) {
                    if(item.text && item.text.includes('Kitchen') || item.text.includes('Oven') || item.text.includes('Refrigerator')) {

                        t.push({id: item.text, text: item.text})
                    }
                }
            })}

            //console.log("taggggggg::::::::>", imageeeTag)
            if(imageeeTag.length !== 0) {
                let abc = imageeeTag.find((item) => item.Hotel_Id === parseInt(hotelid) && 
                item.selected_room === roomid &&
                item.img_id === selectedImageID)
    
                let k = abc && abc.img_tags;
                //console.log("ABCdddddddd::::>",abc, k)
    
                if (Array.isArray(k) && Array.isArray(t)) {
                    const filteredArray2 = t.filter(item2 => {
                        // Check if the item's id exists in array1
                        return !k.some(item1 => item1.id === item2.id);
                    });
                
                    setSelectSuggestions(filteredArray2)
                } else {
                    //console.log("Arrays are not properly defined.");
                    setSelectSuggestions(t)
                }
    
                
            }else {
                setSelectSuggestions(t)
            }
            

        }

      }, [predictions]);


      useEffect(() => {
        //console.log("imageeeTag:::>",imageeeTag)

        if(imageeeTag) {
            let abc = imageeeTag.find((item) => item.Hotel_Id === parseInt(hotelid) && 
            item.selected_room === roomid &&
            item.img_id === selectedImageID)
    
            let k = abc && abc.img_tags;
            //console.log("ABC::::>",abc, k)
            if(abc) {
                setTags(abc && abc.img_tags)
            }
        }
       
        // setTags(abc && abc.img_tags)
      }, [imageeeTag]);


      useEffect(() => {
        console.log("selectedCheeeeeeeeeee:::>",selectedCheckBoxes)
        // if(selectedCheckBoxes) {
        //     console.log("Checks item",)
        //     let filteredChecks = selectedCheckBoxes.filter((item) => item !== roomid)

        //     if(hotelid &&
        //     hoteltext &&
        //     roomtext &&
        //     roomid &&
        //     filteredChecks.length !== 0) {
        //         let copyFile = async () => {
        //             let formData = new FormData();
    
                    
        //             formData.append('hotel_name', hotelName);
        //             formData.append('selectedRoom', roomName);
                    
        //             formData.append('filteredChecks', JSON.stringify(filteredChecks));
        //             formData.append('action', "copyFile"); 
        //             formData.append('selectedImageTitle', selectedImageTitle);
        //             formData.append('selectedImageID', selectedImageID);
                
        //             const response = await fetch('/api/pms/property_master/room_photomanage', {
        //               method: "POST",
        //               body: formData,
        //             });
                
        //             let result = response.json()
        //         }
    
        //         copyFile()



        //         let payload = {
        //             id: generateUniqueID(),
        //             Hotel_Id: parseInt(hotelid),
        //             selected_room: roomid,
        //             img_id: selectedImageID,
        //             img_title: selectedImageTitle,
        //             img_tags: tags,
        //             img_checks: selectedCheckBoxes,
        //             creation_date: getCurrentDateTime(),
        //             last_update_on: getCurrentDateTime(),
        //         }
        
        //         const addToDb = async () => {
        //             const response = await fetch(`/api/pms/property_master/room_photomanage?operationnn=${"addImageChecks"}`, {
        //                 method: "POST",
        //                 headers: {
        //                     "Content-Type": "application/json",
        //                 },
        //                 body: JSON.stringify(payload),
        //               });
                  
                  
        //               let resultt = await response.json();
        //         }
        
        //         addToDb()
        //     }


            
            

        // }
      }, [selectedCheckBoxes]);

      useEffect(() => {
        //console.log("selectSuggestions:::>",selectSuggestions)
      }, [selectSuggestions]);

      const handleSelectSuggestion = (e,val) => {
        handleAddition({id: val, text: val})
        let newSuggestion = selectSuggestions.filter((item) => !(item.text === val))
        //console.log("newSuggestion: ", newSuggestion)
        setSelectSuggestions(newSuggestion)
      }


      const handleCloseModal = async() => {

        console.log("Previous and current",previousCheckBox && previousCheckBox, selectedCheckBoxes && selectedCheckBoxes)



        
                

        const impFxn = async () => {
            console.log("selectedChe:::>",selectedCheckBoxes)
            if(selectedCheckBoxes) {
                
                let filteredChecks = selectedCheckBoxes.filter((item) => item !== roomid)
                filteredChecks = filteredChecks.filter((item) => !previousCheckBox.includes(item))
                console.log("Checks item",filteredChecks, previousCheckBox)
                if(hotelid &&
                hoteltext &&
                roomtext &&
                roomid &&
                filteredChecks.length !== 0) {
                    let copyFile = async () => {
                        let formData = new FormData();
        
                        
                        formData.append('hotel_name', hotelName);
                        formData.append('selectedRoom', roomName);
                        
                        formData.append('filteredChecks', JSON.stringify(filteredChecks));
                        formData.append('action', "copyFile"); 
                        formData.append('selectedImageTitle', selectedImageTitle);
                        formData.append('selectedImageID', selectedImageID);
                    
                        const response = await fetch('/api/pms/property_master/room_photomanage', {
                          method: "POST",
                          body: formData,
                        });
                    
                        let result = response.json()
                    }
        
                    copyFile()
    
    
    
                    let payload = {
                        id: generateUniqueID(),
                        Hotel_Id: parseInt(hotelid),
                        selected_room: roomid,
                        img_id: selectedImageID,
                        img_title: selectedImageTitle,
                        img_tags: tags,
                        img_checks: selectedCheckBoxes,
                        include_in_main: includeCheckBox ? true : false,
                        creation_date: getCurrentDateTime(),
                        last_update_on: getCurrentDateTime(),
                    }
            
                    const addToDb = async () => {
                        const response = await fetch(`/api/pms/property_master/room_photomanage?operationnn=${"addImageChecks"}`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(payload),
                          });
                      
                      
                          let resultt = await response.json();
                    }
            
                    addToDb()
                }
    
    
                
                
    
            }
        }



        if(previousCheckBox && previousCheckBox.length !== 0) {
            let filterChecks =  previousCheckBox.filter((items) => !selectedCheckBoxes.includes(items))
            console.log("delete filterChecks: ",filterChecks)
 
            let filterCheckss =  selectedCheckBoxes.filter((items) => !previousCheckBox.includes(items))
            console.log("add filterChecks: ",filterCheckss)

            
 
            let payload = {
             Hotel_Id: parseInt(hotelid),
             selected_room: roomid,
             img_id: selectedImageID,
             img_title: selectedImageTitle,
             img_checks: filterChecks,
         }
 
         const deleteToDb = async () => {
             const response = await fetch(`/api/pms/property_master/room_photomanage?operationnn=${"deleteImageChecks"}`, {
                 method: "POST",
                 headers: {
                     "Content-Type": "application/json",
                 },
                 body: JSON.stringify(payload),
               });
           
           
               let resultt = await response.json();
         }
 
         deleteToDb()

         if(hotelid &&
            hoteltext &&
            roomtext &&
            roomid &&
            filterChecks.length !== 0) {
                let deleteFile = async () => {
                    let formData = new FormData();
    
                    
                    formData.append('hotel_name', hotelName);
                    formData.append('selectedRoom', roomName);
                    
                    formData.append('filteredChecks', JSON.stringify(filterChecks));
                    formData.append('action', "deleteFile"); 
                    formData.append('selectedImageTitle', selectedImageTitle);
                    formData.append('selectedImageID', selectedImageID);
                
                    const response = await fetch('/api/pms/property_master/room_photomanage', {
                      method: "POST",
                      body: formData,
                    });
                
                    let result = response.json()
                }
    
                deleteFile()

            }
 
 
        if(previousCheckBox && previousCheckBox.length === selectedCheckBoxes.length) {
            console.log("File already copied")
        }else if(filterCheckss.length !== 0)
            impFxn()
         }else {

            impFxn()
            
        }

  
        

        getTagsImage().then(result => {
            let ressssult = result.sort((a, b) => (a.id < b.id) ? -1 : (a.id > b.id) ? 1 : 0);
 
            let abc = ressssult.find((item) => item.Hotel_Id === parseInt(hotelid) && 
            item.selected_room === roomid &&
            item.img_id === parseInt(selectedImageID))

            let ki = abc && abc.include_in_main;

            console.log("ki18: ",ki)

            if(ki) {

                if(ki === true && includeCheckBox === false) {
                    let payload = {
                        Hotel_Id: parseInt(hotelid),
                        selected_room: roomid,
                        img_id: selectedImageID,
                        img_title: selectedImageTitle,
                        include_in_main: includeCheckBox ? true : false,
                        operation: "updateIncludeMain"
                    }
        
                    const deleteToDb = async () => {
                        const response = await fetch(`/api/pms/property_master/room_photomanage?operationnn=${"deleteImageChecks"}`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(payload),
                          });
                      
                      
                          let resultt = await response.json();
                    }
            
                    deleteToDb()
        
        
                    let deleteFile = async () => {
                        let formData = new FormData();
        
                        
                        formData.append('hotel_name', hotelName);
                        formData.append('selectedRoom', roomName);
                        
                        formData.append('filteredChecks', JSON.stringify(["PM00001"]));
                        formData.append('action', "deleteFile"); 
                        formData.append('selectedImageTitle', selectedImageTitle);
                        formData.append('selectedImageID', selectedImageID);
                    
                        const response = await fetch('/api/pms/property_master/room_photomanage', {
                          method: "POST",
                          body: formData,
                        });
                    
                        let result = response.json()
                    }
        
                    deleteFile()
                }

            }else {
                if(ki === false && includeCheckBox === true) {
                    let copyFile = async () => {
                        let formData = new FormData();
        
                        
                        formData.append('hotel_name', hotelName);
                        formData.append('selectedRoom', roomName);
                        
                        formData.append('filteredChecks', JSON.stringify(["PM00001"]));
                        formData.append('action', "copyFile"); 
                        formData.append('selectedImageTitle', selectedImageTitle);
                        formData.append('selectedImageID', selectedImageID);
                    
                        const response = await fetch('/api/pms/property_master/room_photomanage', {
                          method: "POST",
                          body: formData,
                        });
                    
                        let result = response.json()
                    }
        
                    copyFile()
        
        
        
                    let payload = {
                        Hotel_Id: parseInt(hotelid),
                        selected_room: roomid,
                        img_id: selectedImageID,
                        img_title: selectedImageTitle,
                        include_in_main: includeCheckBox ? true : false,
                        action: "updateIncludeInMain",
                    }
            
                    const addToDb = async () => {
                        const response = await fetch(`/api/pms/property_master/room_photomanage?operationnn=${"addImageChecks"}`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(payload),
                          });
                      
                      
                          let resultt = await response.json();
                    }
            
                    addToDb()
                }

                if(ki === undefined && includeCheckBox === true) {
                    let copyFile = async () => {
                        let formData = new FormData();
        
                        
                        formData.append('hotel_name', hotelName);
                        formData.append('selectedRoom', roomName);
                        
                        formData.append('filteredChecks', JSON.stringify(["PM00001"]));
                        formData.append('action', "copyFile"); 
                        formData.append('selectedImageTitle', selectedImageTitle);
                        formData.append('selectedImageID', selectedImageID);
                    
                        const response = await fetch('/api/pms/property_master/room_photomanage', {
                          method: "POST",
                          body: formData,
                        });
                    
                        let result = response.json()
                    }
        
                    copyFile()
        
        
        
                    let payload = {
                        id: generateUniqueID(),
                        Hotel_Id: parseInt(hotelid),
                        selected_room: roomid,
                        img_id: selectedImageID,
                        img_title: selectedImageTitle,
                        img_tags: tags,
                        img_checks: selectedCheckBoxes,
                        include_in_main: includeCheckBox ? true : false,
                        creation_date: getCurrentDateTime(),
                        last_update_on: getCurrentDateTime(),
                    }
            
                    const addToDb = async () => {
                        const response = await fetch(`/api/pms/property_master/room_photomanage?operationnn=${"addImageChecks"}`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(payload),
                          });
                      
                      
                          let resultt = await response.json();
                    }
            
                    addToDb()
                }

                // if(includeCheckBox) {
                //     let copyFile = async () => {
                //         let formData = new FormData();
        
                        
                //         formData.append('hotel_name', hotelName);
                //         formData.append('selectedRoom', roomName);
                        
                //         formData.append('filteredChecks', JSON.stringify(["PM00001"]));
                //         formData.append('action', "copyFile"); 
                //         formData.append('selectedImageTitle', selectedImageTitle);
                //         formData.append('selectedImageID', selectedImageID);
                    
                //         const response = await fetch('/api/pms/property_master/room_photomanage', {
                //           method: "POST",
                //           body: formData,
                //         });
                    
                //         let result = response.json()
                //     }
        
                //     copyFile()
        
        
        
                //     let payload = {
                //         id: generateUniqueID(),
                //         Hotel_Id: parseInt(hotelid),
                //         selected_room: roomid,
                //         img_id: selectedImageID,
                //         img_title: selectedImageTitle,
                //         img_tags: tags,
                //         img_checks: selectedCheckBoxes,
                //         include_in_main: includeCheckBox ? true : false,
                //         creation_date: getCurrentDateTime(),
                //         last_update_on: getCurrentDateTime(),
                //     }
            
                //     const addToDb = async () => {
                //         const response = await fetch(`/api/pms/property_master/room_photomanage?operationnn=${"addImageChecks"}`, {
                //             method: "POST",
                //             headers: {
                //                 "Content-Type": "application/json",
                //             },
                //             body: JSON.stringify(payload),
                //           });
                      
                      
                //           let resultt = await response.json();
                //     }
            
                //     addToDb()
                // }else {
        
                //     let payload = {
                //         Hotel_Id: parseInt(hotelid),
                //         selected_room: roomid,
                //         img_id: selectedImageID,
                //         img_title: selectedImageTitle,
                //         include_in_main: includeCheckBox ? true : false,
                //     }
        
                //     const deleteToDb = async () => {
                //         const response = await fetch(`/api/pms/property_master/room_photomanage?operationnn=${"deleteImageChecks"}`, {
                //             method: "POST",
                //             headers: {
                //                 "Content-Type": "application/json",
                //             },
                //             body: JSON.stringify(payload),
                //           });
                      
                      
                //           let resultt = await response.json();
                //     }
            
                //     deleteToDb()
        
        
                //     let deleteFile = async () => {
                //         let formData = new FormData();
        
                        
                //         formData.append('hotel_name', hotelName);
                //         formData.append('selectedRoom', roomName);
                        
                //         formData.append('filteredChecks', JSON.stringify(["PM00001"]));
                //         formData.append('action', "deleteFile"); 
                //         formData.append('selectedImageTitle', selectedImageTitle);
                //         formData.append('selectedImageID', selectedImageID);
                    
                //         const response = await fetch('/api/pms/property_master/room_photomanage', {
                //           method: "POST",
                //           body: formData,
                //         });
                    
                //         let result = response.json()
                //     }
        
                //     deleteFile()
        
        
        
                // }
            }
        })


        setPreviousCheckBox([])
        setSelectedCheckBoxes([])
        setIncludeCheckBox(false)
        
      }

      const handleCheckboxChange = (event) => {
        setIncludeCheckBox(event.target.checked);
      };


      useEffect(() => {

            console.log("IncludeCheckBox: ",includeCheckBox)
       
      }, [includeCheckBox]);


    return (
        <>
            <Modal 
                size={"5xl"}
                isOpen={isOpen}
                onClose={onClose}
            >
            <ModalContent>
                {(onClose) => (
                <>
                    <ModalHeader className="flex flex-col gap-1">Edit Image</ModalHeader>
                    <ModalBody>
                    <div className="grid grid-cols-2">
                        <div className="col1">


                        <div>
                        <Checkbox 
                            key="checkbox"
                            value="includeCheckBox"
                            checked={includeCheckBox}
                            onChange={handleCheckboxChange} 
                            style={{position:"relative", left: "10px"}}
                            isSelected={roomtext && roomtext === "Property Main" ? true : includeCheckBox}
                        >
                            Include in your main gallery 
                        </Checkbox>
                        </div>

                        <div style={{width: "94%", margin: "7px 0 0 11px"}}>
                            <p>Tags applied to this photo  -  Why tag photos? </p>

                            <div className="app">
  
                            <div>
                                <ReactTags
                                    tags={tags}
                                    suggestions={suggestions}
                                    handleDelete={handleDelete}
                                    handleAddition={handleAddition}
                                    handleDrag={handleDrag}
                                    handleTagClick={handleTagClick}
                                    delimiters={[',', 'Enter']}
                                    autofocus={false}
                                    placeholder="Add new tag"
                                />
                            </div>
                            <div style={{ position: "relative", top: "40px"}}>
                                <p>Select tags for this photo</p>
                                <div style={{ position: "relative", top: "10px"}}>
                                    {/* {console.log("Latest selectSuggestions: ", selectSuggestions)} */}

                                    {selectSuggestions?.map((item) => {
                                         return (
                                                <div key={" "} className="selectSuggest" onClick={(e) => handleSelectSuggestion(e, item.text)}>
                                                    {item.text} <Plus style={{ height: "18px", position: "relative", top: "4px"}}/>
                                                </div>
                                            );
                                    })}


                                {/* {suggestions?.map((item) => {
                                    if (predictions?.some((itemm) => itemm.class === 'bed')) {
                                        if (item.text && item.text.includes('Room')) {
                                            console.log("Result1::::::::>", item.text, handleAddition({id:item.text, text: item.text}))
                                            // return (
                                            //     <div key={" "} className="selectSuggest" onClick={(e) => {handleAddition({id:item.text, text: item.text})}}>
                                            //         {item.text} <Plus style={{ height: "18px", position: "relative", top: "4px"}}/>
                                            //     </div>
                                            // );
                                        }
                                    } else if (predictions?.some((itemm) => itemm.class === 'toilet')) {
                                        if (item.text === "Toilet") {
                                            // return (
                                            //     <div key={" "} className="selectSuggest" onClick={(e) => {handleAddition({id:item.text, text: item.text})}}>
                                            //         {item.text} <Plus style={{ height: "18px", position: "relative", top: "4px"}}/>
                                            //     </div>
                                            // );
                                        }
                                    }
                                })} */}

                                </div>
                            </div>
                            
                            </div>
                        </div>
                        

                            <div style={{position: "relative",
                                top: "60px",
                                left: "10px"}}>
                                <p>Select the room or unit this photo belongs to</p>
                                <div>
                                <CheckboxGroup        
                                    color="warning"
                                    value={selectedCheckBoxes}
                                    onValueChange={setSelectedCheckBoxes}
                                    
                                >
                                    <div className="checkGrid" style={{position: "relative",
                                        top: "8px",
                                        left: "10px"}}>
                                        {roomResult?.map((item) => {
                                            if(!(item.id === 'PM00001')) {
                                                return (<><div style={{    width: "50%",
                                                height: "28px"}}>
                                                <Checkbox key={item.id} value={item.id}>{item.room_name}</Checkbox>
                                            </div></>)
                                            } 
                                            
                                        })}
                                    </div>
                            
                                </CheckboxGroup>
                                </div>
                            </div>
                        </div>

                        <div className="col2">

                        <div>
                            <img ref={imgRef} src={`/img/${hotelName}/${roomName}/${selectedImageTitle}`} />
                        </div>
                            <p style={{    position: "relative",
                                fontSize: "14px",
                                left: "36px",}}>
                                    For policies related to the usage of photos, see our photo policies.</p>
                        </div>
                    </div>
                    </ModalBody>
                    <ModalFooter>
                    <Button color="danger" variant="light" onPress={(e) => {onClose();onCloseModal(true);setTags([]);handleCloseModal()}}>
                        Close
                    </Button>
                    {/* <Button color="primary" onPress={onClose}>
                        Action
                    </Button> */}
                    </ModalFooter>
                </>
                )}
            </ModalContent>
            </Modal>
        </>
    )

}

export default EditModal