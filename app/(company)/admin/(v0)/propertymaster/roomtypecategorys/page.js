'use client'
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Plus, SquarePen, Trash2 } from "lucide-react"
import { Tooltip, RadioGroup, Radio, Button, Input, Chip, Table,  DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem, TableHeader, TableColumn, TableBody,Pagination, getKeyValue, TableRow, TableCell, Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Autocomplete, AutocompleteItem  } from "@nextui-org/react"
import {PlusIcon, SearchIcon, ChevronDownIcon, DeleteIcon, EditIcon } from "@/_components/icon";
import Swal from 'sweetalert2'
import DataTable from "@/_components/ui/DataTable";
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const columns = [
    {name: "ID", uid: "id", sortable: true},
    {name: "PROPERTY ROOM TYPE CATEGORYS", uid: "property_roomtype_category", sortable: true},
    {name: "PROPERTY ROOM TYPE CATEGORYS DESCRIPTION", uid: "property_roomtype_category_desc", sortable: true},
    {name: "STATUS", uid: "status", sortable: true},
    {name: "ACTIONS", uid: "actions", sortable: true},
  ];
  
  const statusColorMap = {
    Active: "success",
    Inactive: "danger",
  };
  const statusOptions = [
    {name: "Active", uid: "Active"},
    {name: "Inactive", uid: "Inactive"},
  ];
  
  const propertyfandccategorysdata = [
    {
      id: "PFSCID00001",
      propertyfandccategorys: "Top facilities",
      propertyfandccategorysdescription: "Top facilities",
      status: "active",
    },
    {
        id: "PFSCID00002",
        propertyfandccategorys: "Activities",
        propertyfandccategorysdescription: "Activities",
        status: "active",
    },
    {
        id: "PFSCID00003",
        propertyfandccategorys: "Common areas",
        propertyfandccategorysdescription: "Common areas",
        status: "inactive",
    },
  ];


export default function RoomTypeCategorys() {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const [ roomtypeCategorys, setRoomtypeCategorys ] = useState();
    const [ roomtypeDesc, setRoomtypeDesc ] = useState();
    const [ status, setStatus ] = useState('');
    const [ result, setResult ] = useState([]);
    const [ currRowId, setCurrRowId ] = useState('');
    const [actionType, setActionType] = useState(null);
    const [lastID, setLastID] = useState(0);

    const checksRef = useRef();
    checksRef.current = useSelector((state) => state.checks.selectedChecks);


    useEffect(() => {
        initialFxn()
    }, [])

    const initialFxn = async () => {
        try {
            const response = await fetch("/api/property/property_roomtype_category", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
            console.log("Data:", result.data);
            setResult(result.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

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


    

    const generateUniqueID = () => {
        console.log("Last IF:",lastID)
      const newID = `PRTCID${String(lastID + 1).padStart(5, '0')}`;
      setLastID(lastID + 1);
      return newID;
    };


        const handleSubmit = async () => {

            if(actionType === "add") {
                console.log("Add")

                const data = {
                    id: generateUniqueID(),
                    property_roomtype_category: roomtypeCategorys,
                    property_roomtype_category_desc: roomtypeDesc,
                    status: status,
                    creation_date: getCurrentDateTime(),
                    last_update_on: getCurrentDateTime(),
                };
        
                try {
                    const response = await fetch("/api/property/property_roomtype_category", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    });
                    const result = await response.json();
                    console.log("Data:", result.res);
                    setResult(result.res);
                    onClose()

                    if(result.data.result === "Data already existed") {
                        toast.error("Data already existed!")
                    }else{
                        toast.success("Data inserted!")
                    }
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }else if(actionType === "edit"){
                console.log("EDit")
                try {
                    const response = await fetch("/api/property/property_roomtype_category", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({id: currRowId, action: actionType, property_roomtype_category: roomtypeCategorys,
                            property_roomtype_category_desc: roomtypeDesc,
                            status: status}),
                    });
                    const result = await response.json();
                    console.log("Data:", result);
                    setResult(result.res);
                    onClose()
                    toast.success("Data edited!")
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }else if(actionType === "editmany"){
                console.log("Edit Many: ",checksRef.current);

                try {
                  const response = await fetch("/api/property/property_roomtype_category", {
                      method: "POST",
                      headers: {
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ids: checksRef.current, action: actionType,
                          status: status}),
                  });
                  const result = await response.json();
                  console.log("Data:", result);
                  setResult(result.res);
                  onClose()
                  // toast.success("Data edited!")
                  toast.success("Row updated!")
              } catch (error) {
                  console.error("Error fetching data:", error);
              }
            }

        };

        useEffect(() => {
            if (result && result.length > 0) {
                const lastElement = result[result.length - 1]; // Get the last element
                const lastElementId = lastElement.id; // Extract the id property from the last element
                const numericPart = lastElementId.match(/(?<=PRTCID)0*(\d+)/); // Extract numeric part using regular expression
                const lastNumericId = numericPart ? parseInt(numericPart[1]) : null;
                console.log("Numeric ID of the last element:", lastNumericId);
                setLastID(lastNumericId);
            } else {
                console.log("No elements in the array.");
                setLastID(0);
            }
        }, [result,handleSubmit])

        useEffect(() => {
            console.log("REs::::::>",result);
        }, [result])

        useEffect(() => {
            console.log("Status::::::>",status);
            setStatus(status)
        }, [status])

        const rowEdit = async (key,type,desc) => {
console.log(key,type,desc)
            setCurrRowId(key)
            setRoomtypeCategorys(type)
            setRoomtypeDesc(desc)
        }

        useEffect(() => {
            console.log("Current Row ID::::::>",currRowId);
        }, [currRowId])

        const handleOpen = (type) => {
            console.log("Inside Hanlde Open",checksRef.current,type,result.length)
            setActionType(type); 
            if(result && result.length === 0) {
              checksRef.current = [];
              if(type === "editmany" && (checksRef.current).length === 0){
                toast.error("No rows selected!")
              }else{
                onOpen();
              }
              
            }else{
              if(type === "editmany" && (checksRef.current).length === 0){
                toast.error("No rows selected!")
              }else{
                onOpen();
              }
            }
        };

        const handleDelete = async (id, deleteAction,checks) => {
            console.log("Delete Opearion: ",id, deleteAction)
  
            if(deleteAction === "deleteSelected") { 
              
              console.log("Delete Console",checks,checks.length)
  
              if(checks.length === 0 || result && result.length === 0) {
                toast.error("No rows selected!")
              }else{
                Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!"
                }).then(async (result) => {
                  if (result.isConfirmed) {
      
                    const response = await fetch("/api/property/property_roomtype_category", {
                      method: "POST",
                      headers: {
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify({id: id, action: "deleteSelectedChecks", selectedChecks : checks}),
                  });
                  const result = await response.json();
                  console.log("Data:", result);
                  setResult(result.res);
      
                    Swal.fire({
                      title: "Deleted!",
                      text: "Selected rows has been deleted!",
                      icon: "success"
                    });
                  }
                });
              }
  
        
  
            }else{
              try {
  
                Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!"
                }).then(async (result) => {
                  if (result.isConfirmed) {
  
                    const response = await fetch("/api/property/property_roomtype_category", {
                      method: "POST",
                      headers: {
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify({id: id, action: "delete"}),
                  });
                  const result = await response.json();
                  console.log("Data:", result);
                  setResult(result.res);
  
  
                    Swal.fire({
                      title: "Deleted!",
                      text: "Selected row has been deleted.",
                      icon: "success"
                    });
                  }
                });
     
              } catch (error) {
                  console.error("Error fetching data:", error);
              }
            }
  
  
  
          };


        useEffect(() => {
            console.log("Action Type::::::>",actionType);
        }, [actionType])

        let actionsContent = (item, onEditClick, onDeleteClick) => (
            <>
              <Tooltip color="default" content="Edit Bed Type">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <Button
                    isIconOnly
                    onPress={() => {
                      onEditClick(item); 
                      setStatus(item.status);handleOpen("edit")
                    }}
                    color="default"
                    variant="light"
                    size="sm"
                    onClick={(e) => {
                      rowEdit(item.id,item.property_roomtype_category,item.property_roomtype_category_desc);
                    }}
                  >
                    <EditIcon className="size-4" />
                  </Button>
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete Bed Type">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <Button
                    isIconOnly
                    color="danger"
                    variant="light"
                    size="sm"
                    onClick={(e) => {
                      onDeleteClick(item)
                      handleDelete(item.id);
                    }}
                  >
                    <DeleteIcon className="size-4" />
                  </Button>
                </span>
              </Tooltip>
            </>
          );

          const handleClick = () => {
            setCurrRowId('')
            setRoomtypeCategorys('')
            setRoomtypeDesc('')
        };

   
    return (
         <><Toaster
        position="top-right"
        reverseOrder={false} />
        <div className="w-full">
            <h1 className="flex text-3xl ml-6 mt-6"><PlusIcon className="size-8 mt-1" />Add Room Type Categorys</h1>
            <div className="mr-6 text-end">
                <Modal isOpen={isOpen} size="4xl" onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="gap-1">Add Room Type Categorys</ModalHeader>
                                <ModalBody>
                                    <div className="p-4 grid grid-cols-2 gap-2">
                                        {actionType === "editmany" ? '' :
                                        <>
                                        <Input
                                            isRequired
                                            type="text"
                                            label="Room Type Categorys"
                                            labelPlacement="outside"
                                            placeholder="Enter your Custom Name"
                                            variant="bordered"
                                            size="md"
                                            className="max-w-xs"
                                            value={actionType === "edit" ? roomtypeCategorys : roomtypeCategorys}
                                            onChange={(e) => setRoomtypeCategorys(e.target.value)}
                                        />
                                        <Textarea
                                            isRequired
                                            type="text"
                                            label="Room Type Category Description"
                                            labelPlacement="outside"
                                            variant="bordered"
                                            placeholder="Property Room Type Categorys description"
                                            disableAnimation
                                            disableAutosize
                                            classNames={{
                                                base: "max-w-xs",
                                                input: "resize-y min-h-[40px]",
                                            }}
                                            value={actionType === "edit" ? roomtypeDesc : roomtypeDesc}
                                            onChange={(e) => setRoomtypeDesc(e.target.value)}
                                            /></>}
                                        <Autocomplete
                                        isRequired
                                        labelPlacement="outside"
                                        placeholder="Select...."
                                        label="Room Type Category Status"
                                        variant="bordered"
                                        size="md"
                                        className="max-w-xs" 
                                        defaultSelectedKey={actionType === "edit" ? status : '' }
                                        value={status} 
                                        allowsCustomValue={true}
                                        onInputChange={(value) => setStatus(value)} 
                                    >
                                        <AutocompleteItem value="Active" key="Active">Active</AutocompleteItem>
                                        <AutocompleteItem value="Inactive" key="Inactive">Inactive</AutocompleteItem>
                                    </Autocomplete>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onPress={handleSubmit}>
                                        Submit
                                    </Button>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Cancel
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
            <div className="mt-10 ml-2 mr-2">
                <DataTable data = {result} columns = {columns}
  statusOptions = {statusOptions} statusColorMap = {statusColorMap} columnSort = "id" columnName = {"property_roomtype_category"} actionsContent = {actionsContent} operation = "roomtypeCategory" handleOpen = {handleOpen} handleClick = {handleClick} handleDelete = {handleDelete} handleSubmit = {handleSubmit}/>            
            </div>
        </div></>
    );
};