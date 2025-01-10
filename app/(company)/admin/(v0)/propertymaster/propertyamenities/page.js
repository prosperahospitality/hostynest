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
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const columns = [
    {name: "ID", uid: "id", sortable: true},
    {name: "AMENITIES ID", uid: "amenities_id", sortable: true},
    {name: "PROPERTY AMENITIES NAME", uid: "property_amenities", sortable: true},
    {name: "VALUE", uid: "amenities_value"},
    {name: "PROPERTY AREA ID", uid: "propertyarea_id", sortable: true},
    {name: "PROPERTY AREA NAME", uid: "property_area", sortable: true},
    {name: "STATUS", uid: "status", sortable: true},
    {name: "ACTIONS", uid: "actions", sortable: true},
  ];
  
//   const statusOptions = [
//     {name: "Active", uid: "active"},
//     {name: "Inactive", uid: "inactive"},
//   ];

//   const statusColorMap = {
//     Active: "success",
//     Inactive: "danger",
//   };

  const statusColorMap = {
    Active: "success",
    Inactive: "danger",
  };
  const statusOptions = [
    {name: "Active", uid: "Active"},
    {name: "Inactive", uid: "Inactive"},
  ];
  
  const propertyamenititesdatas = [
    {
      id: "PACID00001",
      amenitesid: "AMID00001",
      value: "fan",
      amenitiesname: "Fan",
      propertyareaid: "PAID00001",
      propertyareaname: "Bedroom",
      status: "active",
    },
    {
        id: "PACID00002",
        amenitesid: "AMID00002",
        value: "iron",
        amenitiesname: "Iron",
        propertyareaid: "PAID00001",
        propertyareaname: "Bedroom",
        status: "inactive",
    },
    {
        id: "PACID00003",
        amenitesid: "AMID00003",
        value: "hottub",
        amenitiesname: "Hot tub",
        propertyareaid: "PAID00003",
        propertyareaname: "Bathroom",
        status: "active",
    },
  ];


  const propertycategorys = [
    {label: "Hotel", value: "hotel"},
    {label: "Vill", value: "villa" },
];

const bedtypes = [
    {label: "Double Bed", value: "double-bed"},
    {label: "Single Bed", value: "single-bed" },
];

const extrabedtypes = [
    {label: "No Extra Bed", value: "no-extra-bed"},
    {label: "Twin Bed", value: "twin-bed" },
];

const roomviews = [
    {label: "No View", value: "no-view"},
    {label: "Valley", value: "valley" },
];

const rateplans = [
    {label: "EP", value: "ep"},
    {label: "CP", value: "cp" },
    {label: "MAP", value: "map" },
    {label: "AP", value: "ap" },
];
  

export default function PropertyAmenities() {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();   
    const [ property_amenities, setProperty_amenities] = useState();
    const [ propertyDesc, setPropertyDesc ] = useState();
    const [ propertyaosType, setPropertyaosType ]= useState();
    const [ status, setStatus ] = useState('');
    const [ result, setResult ] = useState([]);
    const [ currRowId, setCurrRowId ] = useState('');
    const [actionType, setActionType] = useState(null);

    const [ amenities, setAmenities ] = useState([]);
    const [ property_area, setProperty_area ] = useState([]);

    const [ selectedAmenities, setSelectedAmenities ] = useState('');
    const [ selectedAmenitiesId, setSelectedAmenitiesId ] = useState('');
    const [ selectedArea, setSelectedArea ] = useState('');
    const [ selectedAreaId, setSelectedAreaId ] = useState('');
const [lastID, setLastID] = useState(0);

const checksRef = useRef();
checksRef.current = useSelector((state) => state.checks.selectedChecks);

    useEffect(() => {
        initialFxn()
    }, [])

    const initialFxn = async () => {
        try {
            const response = await fetch("/api/property/property_amenities", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
            console.log("Data:", result);
            setResult(result.data);
            setAmenities(result.amenities);
            setProperty_area(result.property_area);
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
      const newID = `PACID${String(lastID + 1).padStart(5, '0')}`;
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
                console.log("Pay::::::::::>",selectedAmenitiesId,
                selectedAmenities,
                selectedAmenities?.toLowerCase().replace(/\s/g, ''),
                selectedAreaId,
                selectedArea,
                status)
    
                const data = {
                    id: generateUniqueID(),
                    amenities_id : selectedAmenitiesId,
                    property_amenities: selectedAmenities,
                    amenities_value : selectedAmenities?.toLowerCase().replace(/\s/g, ''),
                    propertyarea_id: selectedAreaId,
                    property_area : selectedArea,
                    status: status,
                    creation_date: getCurrentDateTime(),
                    last_update_on: getCurrentDateTime(),
                };
        
                try {
                    const response = await fetch("/api/property/property_amenities", {
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
                    const response = await fetch("/api/property/property_amenities", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({id: currRowId, action: actionType, amenities_id : selectedAmenitiesId,
                            property_amenities: selectedAmenities,
                            amenities_value : selectedAmenities?.toLowerCase().replace(/\s/g, ''),
                            propertyarea_id: selectedAreaId,
                            property_area : selectedArea,
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
                  const response = await fetch("/api/property/property_amenities", {
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
                const numericPart = lastElementId.match(/(?<=PACID)0*(\d+)/); // Extract numeric part using regular expression
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
            setProperty_amenities(type)
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
      
                    const response = await fetch("/api/property/property_amenities", {
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
  
                    const response = await fetch("/api/property/property_amenities", {
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
                      onEditClick(item); // Pass item data to the callback function
                      setStatus(item.status);setSelectedArea(item.property_area);
                      setSelectedAmenities(item.property_amenities);setSelectedAreaId(item.propertyarea_id)
                      setSelectedAmenitiesId(item.amenities_id);handleOpen("edit")
                    }}
                    color="default"
                    variant="light"
                    size="sm"
                    onClick={(e) => {
                      rowEdit(item.id);
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

        };

    return (
        <><Toaster
        position="top-right"
        reverseOrder={false} />
        <div className="w-full">
            <h1 className="flex text-3xl ml-6 mt-6"><PlusIcon className="size-8 mt-1" />Add Property Amenities</h1>
            <div className="mr-6 text-end">
                {/* <Button onPress={() => handleOpen("add")} color="primary" variant="shadow" ><Plus className="size-4" />Add Property Amenities</Button> */}
                <Modal isOpen={isOpen} size="4xl" onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="gap-1">Add Property Amenities</ModalHeader>
                                <ModalBody>
                                    <div className="p-4 grid grid-cols-2 gap-2">
                                    {actionType === "editmany" ? '' :
                                    <>
                                        {/* <Input
                                            isRequired
                                            type="text"
                                            label="Property Amenities Name"
                                            labelPlacement="outside"
                                            placeholder="Enter your Custom Property Amenities"
                                            variant="bordered"
                                            size="md"
                                            className="max-w-xs"
                                        /> */}

                                    <Autocomplete
                                        isRequired
                                        labelPlacement="outside"
                                        placeholder="Select...."
                                        label="Property Area Name"
                                        variant="bordered"
                                        size="md"
                                        className="max-w-xs" 
                                        defaultSelectedKey={actionType === "edit" ? selectedAreaId : '' }
                                        value={selectedArea}
                                        allowsCustomValue={true}
                                        onSelectionChange={(id) => setSelectedAreaId(id)}
                                        onInputChange={(value) => setSelectedArea(value)}
                                    >
                                        {property_area?.map((item) => (
                                        <AutocompleteItem key={item.id} value={item.property_area}>
                                            {item.property_area}
                                        </AutocompleteItem>
                                        ))}
                                    </Autocomplete>

                                    <Autocomplete
                                        isRequired
                                        labelPlacement="outside"
                                        placeholder="Select...."
                                        label="Property Amenitites Name"
                                        variant="bordered"
                                        size="md"
                                        className="max-w-xs"
                                        defaultSelectedKey={actionType === "edit" ? selectedAmenitiesId : '' }
                                        value={selectedAmenities}
                                        onSelectionChange={(id) => setSelectedAmenitiesId(id)}
                                        allowsCustomValue={true}
                                        onInputChange={(value) => setSelectedAmenities(value)}
                                    >
                                    {amenities?.map((item) => (
                                        <AutocompleteItem key={item.id} value={item.amenities}>
                                            {item.amenities}
                                        </AutocompleteItem>
                                        ))}
                                    </Autocomplete></>}

                                    <Autocomplete
                                        isRequired
                                        labelPlacement="outside"
                                        placeholder="Select...."
                                        label="Room Status"
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
                    {result?.map((propertyamenititesdata) => (
                        <TableRow key={propertyamenititesdata.id}>
                            <TableCell>{propertyamenititesdata.id}</TableCell>
                            <TableCell>{propertyamenititesdata.amenities_id}</TableCell>
                            <TableCell>{propertyamenititesdata.amenities_value}</TableCell>
                            <TableCell>{propertyamenititesdata.property_amenities}</TableCell>
                            <TableCell>{propertyamenititesdata.propertyarea_id}</TableCell>
                            <TableCell>{propertyamenititesdata.property_area}</TableCell>
                            <TableCell>
                                <Chip className="capitalize" color={statusColorMap[propertyamenititesdata.status]} size="sm" variant="flat">
                                {propertyamenititesdata.status}
                                </Chip>
                            </TableCell>
                            <TableCell>
                                <Tooltip color="default" content="Edit user">
                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <Button isIconOnly onPress={() => {setStatus(propertyamenititesdata.status);setSelectedArea(propertyamenititesdata.property_area);
setSelectedAmenities(propertyamenititesdata.property_amenities);setSelectedAreaId(propertyamenititesdata.propertyarea_id)
setSelectedAmenitiesId(propertyamenititesdata.amenities_id);handleOpen("edit")}} color="default" variant="light" size="sm" onClick={(e) => {rowEdit(propertyamenititesdata.id)}}><EditIcon className="size-4"/></Button>
                                </span>
                                </Tooltip>
                                <Tooltip color="danger" content="Delete user">
                                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <Button isIconOnly color="danger" variant="light" size="sm" onClick={(e) => handleDelete(propertyamenititesdata.id)}><DeleteIcon className="size-4"/></Button>
                                </span>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table> */}
                <DataTable data = {result} columns = {columns}
  statusOptions = {statusOptions} statusColorMap = {statusColorMap} columnSort = "id" columnName = {"property_amenities"} actionsContent = {actionsContent} operation = "propAmen" handleOpen = {handleOpen} handleClick = {handleClick} handleDelete = {handleDelete} handleSubmit = {handleSubmit}/>            
            </div>
        </div></>
    );
};