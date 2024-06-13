'use client'
import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { useSortable, arrayMove  } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, CheckboxGroup, Checkbox, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, cn} from "@nextui-org/react";

  import { Tally3, Move, Plus } from 'lucide-react';
import { WithContext as ReactTags } from 'react-tag-input';
import "./photogrid.css"
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';


const AddNoteIcon = (props) => (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M7.37 22h9.25a4.87 4.87 0 0 0 4.87-4.87V8.37a4.87 4.87 0 0 0-4.87-4.87H7.37A4.87 4.87 0 0 0 2.5 8.37v8.75c0 2.7 2.18 4.88 4.87 4.88Z"
        fill="currentColor"
        opacity={0.4}
      />
      <path
        d="M8.29 6.29c-.42 0-.75-.34-.75-.75V2.75a.749.749 0 1 1 1.5 0v2.78c0 .42-.33.76-.75.76ZM15.71 6.29c-.42 0-.75-.34-.75-.75V2.75a.749.749 0 1 1 1.5 0v2.78c0 .42-.33.76-.75.76ZM12 14.75h-1.69V13c0-.41-.34-.75-.75-.75s-.75.34-.75.75v1.75H7c-.41 0-.75.34-.75.75s.34.75.75.75h1.81V18c0 .41.34.75.75.75s.75-.34.75-.75v-1.75H12c.41 0 .75-.34.75-.75s-.34-.75-.75-.75Z"
        fill="currentColor"
      />
    </svg>
  );
  
  
  const CopyDocumentIcon = (props) => (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M15.5 13.15h-2.17c-1.78 0-3.23-1.44-3.23-3.23V7.75c0-.41-.33-.75-.75-.75H6.18C3.87 7 2 8.5 2 11.18v6.64C2 20.5 3.87 22 6.18 22h5.89c2.31 0 4.18-1.5 4.18-4.18V13.9c0-.42-.34-.75-.75-.75Z"
        fill="currentColor"
        opacity={0.4}
      />
      <path
        d="M17.82 2H11.93C9.67 2 7.84 3.44 7.76 6.01c.06 0 .11-.01.17-.01h5.89C16.13 6 18 7.5 18 10.18V16.83c0 .06-.01.11-.01.16 2.23-.07 4.01-1.55 4.01-4.16V6.18C22 3.5 20.13 2 17.82 2Z"
        fill="currentColor"
      />
      <path
        d="M11.98 7.15c-.31-.31-.84-.1-.84.33v2.62c0 1.1.93 2 2.07 2 .71.01 1.7.01 2.55.01.43 0 .65-.5.35-.8-1.09-1.09-3.03-3.04-4.13-4.16Z"
        fill="currentColor"
      />
    </svg>
  );
  
  const EditDocumentIcon = (props) => (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M15.48 3H7.52C4.07 3 2 5.06 2 8.52v7.95C2 19.94 4.07 22 7.52 22h7.95c3.46 0 5.52-2.06 5.52-5.52V8.52C21 5.06 18.93 3 15.48 3Z"
        fill="currentColor"
        opacity={0.4}
      />
      <path
        d="M21.02 2.98c-1.79-1.8-3.54-1.84-5.38 0L14.51 4.1c-.1.1-.13.24-.09.37.7 2.45 2.66 4.41 5.11 5.11.03.01.08.01.11.01.1 0 .2-.04.27-.11l1.11-1.12c.91-.91 1.36-1.78 1.36-2.67 0-.9-.45-1.79-1.36-2.71ZM17.86 10.42c-.27-.13-.53-.26-.77-.41-.2-.12-.4-.25-.59-.39-.16-.1-.34-.25-.52-.4-.02-.01-.08-.06-.16-.14-.31-.25-.64-.59-.95-.96-.02-.02-.08-.08-.13-.17-.1-.11-.25-.3-.38-.51-.11-.14-.24-.34-.36-.55-.15-.25-.28-.5-.4-.76-.13-.28-.23-.54-.32-.79L7.9 10.72c-.35.35-.69 1.01-.76 1.5l-.43 2.98c-.09.63.08 1.22.47 1.61.33.33.78.5 1.28.5.11 0 .22-.01.33-.02l2.97-.42c.49-.07 1.15-.4 1.5-.76l5.38-5.38c-.25-.08-.5-.19-.78-.31Z"
        fill="currentColor"
      />
    </svg>
  );
  
  
  const DeleteDocumentIcon = (props) => (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M21.07 5.23c-1.61-.16-3.22-.28-4.84-.37v-.01l-.22-1.3c-.15-.92-.37-2.3-2.71-2.3h-2.62c-2.33 0-2.55 1.32-2.71 2.29l-.21 1.28c-.93.06-1.86.12-2.79.21l-2.04.2c-.42.04-.72.41-.68.82.04.41.4.71.82.67l2.04-.2c5.24-.52 10.52-.32 15.82.21h.08c.38 0 .71-.29.75-.68a.766.766 0 0 0-.69-.82Z"
        fill="currentColor"
      />
      <path
        d="M19.23 8.14c-.24-.25-.57-.39-.91-.39H5.68c-.34 0-.68.14-.91.39-.23.25-.36.59-.34.94l.62 10.26c.11 1.52.25 3.42 3.74 3.42h6.42c3.49 0 3.63-1.89 3.74-3.42l.62-10.25c.02-.36-.11-.7-.34-.95Z"
        fill="currentColor"
        opacity={0.399}
      />
      <path
        clipRule="evenodd"
        d="M9.58 17a.75.75 0 0 1 .75-.75h3.33a.75.75 0 0 1 0 1.5h-3.33a.75.75 0 0 1-.75-.75ZM8.75 13a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );




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
       console.log("Suggestions:::>",suggestions)
      }, [suggestions]);

      useEffect(() => {
        console.log("Predictions:::>",predictions)

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
                console.log("ABCdddddddd::::>",abc, t)
    
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
                                    {console.log("Latest selectSuggestions: ", selectSuggestions)}

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