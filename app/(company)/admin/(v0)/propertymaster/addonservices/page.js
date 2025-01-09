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
    {name: "Add On Services", uid: "property_addonservice", sortable: true},
    {name: "Add On Services DESCRIPTION", uid: "propertyaddonservice_desc", sortable: true},
    {name: "Add On Services Service Type", uid: "propertyaddonservice_type", sortable: true},
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


  
  const addonservicesdata = [
    {
      id: "AOSID00001",
      addonservicestype: "BRUSH",
      addonservicesdescription: "BRUSH",
      servicestype: "Person",
      status: "active",
    },
    {
        id: "AOSID00002",
        addonservicestype: "Pick up",
        addonservicesdescription: "Pick up",
        servicestype: "Night",
        status: "active",
    },
    {
        id: "AOSID00003",
        addonservicestype: "Drop service",
        addonservicesdescription: "Drop service",
        servicestype: "Night",
        status: "inactive",
    },
  ];

export default function AddOnServices() {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const [ propertyAddonservice, setPropertyAddonservice] = useState();
    const [ propertyDesc, setPropertyDesc ] = useState();
    const [ propertyaosType, setPropertyaosType ]= useState();
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
            const response = await fetch("/api/property/property_addonservice", {
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
      const newID = `AOSID${String(lastID + 1).padStart(5, '0')}`;
      setLastID(lastID + 1);
      return newID;
    };
        // const toast = (action, message) => {
        //     const Toast = Swal.mixin({
        //         toast: true,
        //         position: "top-end",
        //         showConfirmButton: false,
        //         timer: 3000,
        //         timerProgressBar: true,
        //         iconColor : "#90EE90",
        //         didOpen: (toast) => {
        //           toast.onmouseenter = Swal.stopTimer;
        //           toast.onmouseleave = Swal.resumeTimer;
        //         }
        //       });
        //       Toast.fire({
        //         icon: action,
        //         title: message
        //       });
        // }

        const handleSubmit = async () => {

            if(actionType === "add") {
                console.log("Add")
    
                const data = {
                    id: generateUniqueID(),
                    property_addonservice: propertyAddonservice,
                    propertyaddonservice_desc: propertyDesc,
                    propertyaddonservice_type: propertyaosType,
                    status: status,
                    creation_date: getCurrentDateTime(),
                    last_update_on: getCurrentDateTime(),
                };
        
                try {
                    const response = await fetch("/api/property/property_addonservice", {
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
                    const response = await fetch("/api/property/property_addonservice", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({id: currRowId, action: actionType, property_addonservice: propertyAddonservice,
                            propertyaddonservice_desc: propertyDesc,
                            propertyaddonservice_type : propertyaosType,
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
                  const response = await fetch("/api/property/property_addonservice", {
                      method: "POST",
                      headers: {
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ids: checksRef.current, action: actionType, propertyaosType: propertyaosType,
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
                const numericPart = lastElementId.match(/(?<=AOSID)0*(\d+)/); // Extract numeric part using regular expression
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
            setCurrRowId(key)
            setPropertyAddonservice(type)
            setPropertyDesc(desc)
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
      
                    const response = await fetch("/api/property/property_addonservice", {
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
  
                    const response = await fetch("/api/property/property_addonservice", {
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
                      setStatus(item.status);setPropertyaosType(item.propertyaddonservice_type);handleOpen("edit")
                    }}
                    color="default"
                    variant="light"
                    size="sm"
                    onClick={(e) => {
                      rowEdit(item.id,item.property_addonservice,item.propertyaddonservice_desc);
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
            setPropertyAddonservice('');
            setPropertyDesc('')
        };
   
    return (
    <><Toaster
        position="top-right"
        reverseOrder={false} />
        <div className="w-full">
            <h1 className="flex text-3xl ml-6 mt-6"><PlusIcon className="size-8 mt-1" />Add On Services Type</h1>
            <div className="mr-6 text-end">
                {/* <Button onPress={() => handleOpen("add")} color="primary" variant="shadow" 
                onClick = {(e) => {setPropertyAddonservice('');
                    setPropertyDesc('')
                    }}><PlusIcon className="size-6" />Add On Services</Button> */}
                <Modal isOpen={isOpen} size="4xl" onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="gap-1">Add Services</ModalHeader>
                                <ModalBody>
                                    <div className="p-4 grid grid-cols-2 gap-2">
                                        {actionType === "editmany" ? '' :
                                        <>
                                        <Input
                                            isRequired
                                            type="text"
                                            label="Add On Services"
                                            labelPlacement="outside"
                                            placeholder="Enter your Custom Name"
                                            variant="bordered"
                                            size="md"
                                            className="max-w-xs"
                                            value={actionType === "edit" ? propertyAddonservice : propertyAddonservice}
                                            onChange={(e) => setPropertyAddonservice(e.target.value)}
                                        />
                                        <Textarea
                                            isRequired
                                            type="text"
                                            label="Add On Services Description"
                                            labelPlacement="outside"
                                            variant="bordered"
                                            placeholder="Add On Services description"
                                            disableAnimation
                                            disableAutosize
                                            classNames={{
                                                base: "max-w-xs",
                                                input: "resize-y min-h-[40px]",
                                            }}
                                            value={actionType === "edit" ? propertyDesc : propertyDesc}
                                            onChange={(e) => setPropertyDesc(e.target.value)}
                                            /></>}

                                        <Autocomplete
                                        isRequired
                                        labelPlacement="outside"
                                        placeholder="Select...."
                                        label="Services Type"
                                        variant="bordered"
                                        size="md"
                                        className="max-w-xs" 
                                        defaultSelectedKey={actionType === "edit" ? propertyaosType : '' }
                                        value={propertyaosType} 
                                        allowsCustomValue={true}
                                        onInputChange={(value) => setPropertyaosType(value)} 
                                    >
                                        <AutocompleteItem value="Person" key="Person">Person</AutocompleteItem>
                                        <AutocompleteItem value="Night" key="Night">Night</AutocompleteItem>
                                    </Autocomplete>


                                        <Autocomplete
                                        isRequired
                                        labelPlacement="outside"
                                        placeholder="Select...."
                                        label="Add On Services Status"
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
                {/* <Table aria-label="Example static collection table">
                    <TableHeader>
                        {columns.map((column) => (
                        <TableColumn key={column.uid}>{column.name}</TableColumn>
                        ))}
                    </TableHeader>
                    <TableBody>
                    {result?.map((addonservicedata) => (
                        <TableRow key={addonservicedata.id}>
                            <TableCell>{addonservicedata.id}</TableCell>
                            <TableCell>{addonservicedata.property_addonservice}</TableCell>
                            <TableCell>{addonservicedata.propertyaddonservice_desc}</TableCell>
                            <TableCell>
                                <Chip className="capitalize" color="primary" size="sm" variant="solid">
                                {addonservicedata.propertyaddonservice_type}
                                </Chip>
                            </TableCell>
                            <TableCell>
                                <Chip className="capitalize" color={statusColorMap[addonservicedata.status]} size="sm" variant="flat">
                                {addonservicedata.status}
                                </Chip>
                            </TableCell>
                            <TableCell>
                                <Tooltip color="default" content="Edit Room View Type">
                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <Button isIconOnly onPress={() => {setStatus(addonservicedata.status);setPropertyaosType(addonservicedata.propertyaddonservice_type);handleOpen("edit")}} color="default" variant="light" size="sm" onClick={(e) => {rowEdit(addonservicedata.id,addonservicedata.property_addonservice,addonservicedata.propertyaddonservice_desc)}}><EditIcon className="size-4"/></Button>
                                </span>
                                </Tooltip>
                                <Tooltip color="danger" content="Delete Room View Type">
                                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <Button isIconOnly color="danger" variant="light" size="sm" onClick={(e) => handleDelete(addonservicedata.id)}><DeleteIcon className="size-4"/></Button>
                                </span>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table> */}
                <DataTable data = {result} columns = {columns}
  statusOptions = {statusOptions} statusColorMap = {statusColorMap} columnSort = "id" columnName = {"property_addonservice"} actionsContent = {actionsContent} operation = "propAOS" handleOpen = {handleOpen} handleClick = {handleClick} handleDelete = {handleDelete} handleSubmit = {handleSubmit}/>            
            </div>
        </div></>
    );
};