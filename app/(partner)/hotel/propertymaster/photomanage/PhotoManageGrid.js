'use client'
import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { useSortable, arrayMove  } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, CheckboxGroup, Checkbox, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, cn} from "@nextui-org/react";

  import { Tally3, Move } from 'lucide-react';
import EditModal from './EditModal.js'


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

  
  //import "./photogrid.css"

const PhotoManageGrid = ({ currentRoomImage, hotelName, roomName, roomResult, onSelectedCheckboxes }) => {
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
    onSelectedCheckboxes(selectedCheckBoxes)

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
      console.log("Resssssss:::::::::>",resultt.imageeeTag)
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
          objectFit: "cover",
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
          objectFit: "cover",
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
