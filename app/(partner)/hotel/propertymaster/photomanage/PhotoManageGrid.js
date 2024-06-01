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
  import { Tally3, Move } from 'lucide-react';
import EditModal from './EditModal.js'

  
  //import "./photogrid.css"

const PhotoManageGrid = ({ currentRoomImage, hotelName, roomName, roomResult }) => {
  const [formattedFilesNew, setFormattedFilesNew] = useState();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [selectedImageID, setSelectedImageID] = useState();
  const [selectedImageTitle, setSelectedImageTitle] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [resultImageTags, setResultImageTags] = useState([]);

  const [selectedCheckBoxes, setSelectedCheckBoxes] = useState([]);
  

  const initialFxn = async () => {
    try {
        const response = await fetch("/api/property/image_tag", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();
        //console.log("Data:", result.dataActivee);
        setResultImageTags(result.dataActivee);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

useEffect(() => {
  initialFxn()
}, []);

useEffect(() => {

  console.log("ResultImageTags: ", resultImageTags)
}, [resultImageTags]);

  const getImages = async(hotelName, roomName) => {
    const response = await fetch(`/api/pms/property_master/room_photomanage?hotelName=${hotelName}&roomName=${roomName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
    },
    });


    let resultt = await response.json();
    console.log("Responseeeeeee:::::>",resultt)

    const formattedFiles = resultt.imgNames?.map((fileName, index) => {
      const id = parseInt(fileName.match(/\d+/)[0], 10);
      return { id: id, title: fileName };
    });
    setFormattedFilesNew(formattedFiles)
  }

  useEffect(() => {
    if (currentRoomImage) {
      const formattedFiles = currentRoomImage?.map((fileName, index) => {
        const id = parseInt(fileName.match(/\d+/)[0], 10);
        return { id: id, title: fileName };
      });

      formattedFiles.sort((a, b) => a.id - b.id);
      setFormattedFilesNew(formattedFiles);
    } else {
      setFormattedFilesNew([]);
    }
  }, [currentRoomImage]);

  const { items, strategy } = useMemo(() => {
    return {
      items: formattedFilesNew || [],
      strategy: verticalListSortingStrategy,
    };
  }, [formattedFilesNew]);

  const getTaskPos = (id) => formattedFilesNew.findIndex((task) => task.id === id);

  const renameFile = async (activeId, overId, formattedFilesNew) => {

    console.log("formattedFilesNew:::::::: ",formattedFilesNew)

    let formData = new FormData();

    formData.append('hotel_Name', hotelName);
    formData.append('room_Name', roomName);
    formData.append('activeId', activeId);
    formData.append('overId', overId);
    formData.append('operation', "rename_File");
    formData.append('formattedFilesNew', JSON.stringify(formattedFilesNew));

    const response = await fetch('/api/pms/property_master/room_photomanage', {
      method: "POST",
      body: formData,
    });

    let result = response.json()

    result.then(result => {

        console.log("Result:::::>", result);

        const final_rename =  async() => {
          let formData = new FormData();

          formData.append('hotel_Name', hotelName);
          formData.append('room_Name', roomName);
          formData.append('activeId', activeId);
          formData.append('overId', overId);
          formData.append('operation', "final_rename");
          formData.append('formattedFilesNew', JSON.stringify(formattedFilesNew));

          const response = await fetch('/api/pms/property_master/room_photomanage', {
            method: "POST",
            body: formData,
          });
      
          let result = response.json()
            result.then(result => {
              console.log("Final Result:::::>", result);
                           
              if(result.Message === "Success") {
                // setFormattedFilesNew(result.finalResult)
                window.location.reload()
              }
            })
        }

        final_rename()

 


    }).catch(error => {

      console.error('Error:', error);
      
    });
  }

  const handleDragEnd = (event) => {
    const { active, over } = event;

    console.log("originalPos newPos", active.id, over.id)

    renameFile(active.id, over.id, formattedFilesNew)

    if (active.id === over.id) return;

    setFormattedFilesNew((tasks) => {
      
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(tasks, originalPos, newPos);
    });

    
  };

  const handleModalOpen = (val,id,title) => {
    console.log("Data Edit::::>",val,id,title)

    setSelectedImageID(id)
    setSelectedImageTitle(title)

    if(val && id && title) {
      setModalOpen(true)
      //onOpen()
    }
  }

  const handleModalClose = (val) => {
    if(val) {
      setModalOpen(false)
      setSelectedImageID('')
      setSelectedImageTitle('')
    }
  }




const handleonSingleDelResult = (val) => {
  setFormattedFilesNew(val)
}

useEffect(() => {
  if (selectedCheckBoxes && selectedCheckBoxes.length > 0) {
    
    console.log("selectedCheckBoxes: ",selectedCheckBoxes,selectedCheckBoxes.length)

  }
}, [selectedCheckBoxes]);

  return (
    <>
      <div
        style={{
          display: "grid",
          gridGap: "8px",
          gridTemplateColumns: "auto auto auto auto",
          position: "relative",
          top: "155px",
          left: "35px",
          width: "95%",
        }}
      >
        {formattedFilesNew && (
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items} strategy={strategy}>

             <CheckboxGroup        
              orientation="horizontal"
              color="warning"
               value={selectedCheckBoxes}
               onValueChange={setSelectedCheckBoxes}
            > 
              {items.map((image, index) => {
                const extensionIndex = image.title.lastIndexOf(".");
                const fileExtensions = image.title.substring(extensionIndex);
                const id = image.id;

                return <SortableItem  
                          key={id} id={id} 
                          title={image.title} 
                          hotelName={hotelName} 
                          roomName={roomName} 
                          fileExtensions={fileExtensions} 
                          index={index} 
                          onOpenModal={handleModalOpen} 
                          onSingleDelResult={handleonSingleDelResult}
                          selectedCheckBoxes={selectedCheckBoxes}
                          setSelectedCheckBoxes={setSelectedCheckBoxes}
                        />;
              })}
              </CheckboxGroup>
            </SortableContext>
          </DndContext>
        )}
      </div>

      <EditModal modalOpen={modalOpen} hotelName={hotelName} roomName={roomName} selectedImageID={selectedImageID} selectedImageTitle={selectedImageTitle} onCloseModal={handleModalClose} roomResult={roomResult} resultImageTags={resultImageTags} />

      {/* <Modal 
        size={"5xl"} 
        isOpen={isOpen} 
        onClose={onClose} 
      >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-2">
                <div>

                  <div>
                  <Checkbox key={" "} value={" "} style={{position:"relative", left: "10px"}}>Include in your main gallery </Checkbox>
                  </div>

                  <div>
                    <p>Tags applied to this photo  -  Why tag photos? </p>
                  </div>
                  

                </div>

                <div>

                  <div>
                    <img src={`/img/${hotelName}/${roomName}/${selectedImageTitle}`} />
                  </div>
                  <p>For policies related to the usage of photos, see our photo policies.</p>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Action
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal> */}
    </>
  );
};

const SortableItem = ({ id, title, hotelName, roomName,selectedCheckBoxes, fileExtensions, index, onOpenModal, onSingleDelResult }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    position: 'relative',
    // width: '200px',
    height: '200px'
  };
  const [isHovered, setIsHovered] = useState(false);

  const [hoteltext, hotelid] = hotelName.split("-");
  const [roomtext, roomid] = roomName.split("-");

  const handleMouseOver = (e) => {
    setIsHovered(true);
  };

  const handleMouseOut = (e) => {
    setIsHovered(false);
  };

  const handleOptionClick = (e) => {
    console.log("Clicked Option")
  }

  const handleMoveClick = (e) => {
    console.log("Clicked Move")
  }

  const handleImageClick = (e,id,title) => {
    console.log("Img clicked")
    onOpenModal(true,id,title)
  }


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
      //setImageeeTag(resultt.imageeeTag)
      return imgtagg;
}

  const handleSingleDeleteClick = (e,id,title) => {
    console.log("Single Delete", e,id,title)

    const getImagesss = async(hotelName, roomName) => {
      const response = await fetch(`/api/pms/property_master/room_photomanage?hotelName=${hotelName}&roomName=${roomName}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
      },
      });
  
  
      let resultt = await response.json();
      console.log("Responseeeeeee:::::>",resultt)

      if(resultt) {
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

          console.log("Single Delete k", e,id,title, k, i, abc, g)



          const singledelete = async () => {
            let formData = new FormData();

            formData.append('hotel_Name', hotelName);
            formData.append('room_Name', roomName);
            formData.append('imgDelId', id);
            formData.append('imgDelTitle', title);
            formData.append('operation', "single_delete_img");
            if(abc) {
              formData.append('img_checks_del', JSON.stringify(k));
              formData.append('img_tags_del', JSON.stringify(i));
              formData.append('img_include_in_main', g);
            }else {
              formData.append('sub_operation', "deleteWithoutRoom");
            }
            
  
            const response = await fetch('/api/pms/property_master/room_photomanage', {
              method: "POST",
              body: formData,
            });
  
            let result = response.json()
  
            result.then(result => {
              alert("File deleted successfully!")
              console.log("result: ",result)

              

              getImagesss(hotelName, roomName)
            })
          }

          singledelete()






      } else {
          console.log("No elements in the array.");
      }

    });
  }

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    console.log("Value: ",e.target.value)
    setIsChecked(e.target.checked);

  };

  useEffect(() => {
    if (selectedCheckBoxes && selectedCheckBoxes.length > 0) {
      
      console.log("selectedCheckBoxes: ",selectedCheckBoxes,selectedCheckBoxes.length)

      setIsHovered(true)

    }else{
      setIsHovered(false)
    }
  }, [selectedCheckBoxes]);

  return (
    
    <div style={style} ref={setNodeRef} {...attributes} {...listeners} className="task" key={id} id={id}
      onMouseEnter={() => selectedCheckBoxes && selectedCheckBoxes.length > 0 ? "" : setIsHovered(true)}
      onMouseLeave={() => selectedCheckBoxes && selectedCheckBoxes.length > 0 ? "" :setIsHovered(false)}
    >

      {title.includes("-")
        ? <img
        className="block h-full w-full rounded-lg object-cover object-center"
        alt="Mountains"
        src={`/img/${hotelName}/${roomName}/${title}`}
        key={id}
        fill
        sizes="(min-width: 808px) 50vw, 100vw"
        style={{
          objectFit: "cover", // cover, contain, none
        }}
      />
        : <img
        className="block h-full w-full rounded-lg object-cover object-center"
        alt="Mountains"
        src={`/img/${hotelName}/${roomName}/${id}${fileExtensions}`}
        key={id}
        fill
        sizes="(min-width: 808px) 50vw, 100vw"
        style={{
          objectFit: "cover", // cover, contain, none
        }}
      />}
      

      {isHovered && (
        <div
          style={selectedCheckBoxes && selectedCheckBoxes.length > 0 ? {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.31)',
          } : {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0)',
            transition: 'background 0.5s ease'
          }}
          onMouseOver={selectedCheckBoxes && selectedCheckBoxes.length > 0 ? null : (e) => { e.target.style.background = 'rgba(0, 0, 0, 0.31)'; }}
          onMouseOut={selectedCheckBoxes && selectedCheckBoxes.length > 0 ? null : (e) => { e.target.style.background = 'rgba(0, 0, 0, 0)'; }}
        >
          {/* <div style={{ position: "relative", top: "0px", zIndex: "100", left: "0px" }}> */}
            <Checkbox
              key={id}
              value={title}
              checked={isChecked}
              style={{ left: "15px", top:"-5px"}}
              onChange={handleCheckboxChange}
            />
            <Dropdown>
              <DropdownTrigger>
                <Button
                  className="bg-transparent"
                  onClick={(e) => { console.log("Clicccccckkkk") }}
                  style={{
                    left:"75%"
                  }}
                >
                  <Tally3 style={{ color: "white" }} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
                <DropdownItem
                  key="new"
                  startContent={<AddNoteIcon />}
                >
                  New file
                </DropdownItem>
                <DropdownItem
                  key="copy"
                  startContent={<CopyDocumentIcon />}
                >
                  Copy link
                </DropdownItem>
                <DropdownItem
                  key="edit"
                  startContent={<EditDocumentIcon />}
                >
                  Edit file
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  startContent={<DeleteDocumentIcon className="text-danger" />}
                  onClick={(e) => handleSingleDeleteClick(e, id, title)}
                >
                  Delete file
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            {/* <div style={{ position: "relative", top: "-35px", left: "15px" }}> */}
              {/* <div> */}
                <Button
                  className="bg-transparent"
                  onClick={(e) => { console.log("Clicccccckkkk") }}
                  style={{
                    top: "75px",
                    left: "8%",
                  }}
                >
                  <Move style={{ color: "white" }} />
                </Button>
              {/* </div> */}
              <div>
                <Button
                  className="bg-transparent"
                  onClick={(e) => { handleImageClick(e, id, title) }}
                  style={{
                    top: "65px",
                    left: "30%",
                  }}
                >
                  <p style={{ color: "white" }}>Click here to edit</p>
                </Button>
              </div>
            {/* </div> */}
          </div>
        // </div>
      )}




    </div>
  );
};

export default PhotoManageGrid;
