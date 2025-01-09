'use client'
import React, {useState,useEffect,  useCallback, useRef} from "react";
import { Plus, SquarePen, Trash2 } from "lucide-react"
import { Tooltip, RadioGroup, Radio, Button, Input, Chip, Table,  DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem, TableHeader, TableColumn, TableBody,Pagination, getKeyValue, TableRow, TableCell, Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Autocomplete, AutocompleteItem  } from "@nextui-org/react"
import {PlusIcon, SearchIcon, ChevronDownIcon, DeleteIcon, EditIcon } from "@/_components/icon";
import {useDispatch} from "react-redux";
import { handlePropRes } from "@/app/redux/slices/propertyRoomTypeSlice";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2'
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import DataTable from "@/_components/ui/DataTable";

const columns = [
    {name: "ID", uid: "id", sortable: true},
    {name: "ROOM TYPE CATEGORY", uid: "property_roomtype_category", sortable: true},
    {name: "PROPERTY ROOM NAME", uid: "property_roomname", sortable: true},
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
  
  const roomtypes = [
    {
      id: 1,
      name: "Delux Room",
      propertycategory: "Apartment",
      bedtype: "Single Bed",
      extrabedtype: "Single Bed",
      roomview: "Valley",
      rateplan: "EP",
      status: "active",
    },
    {
        id: 2,
        name: "Dormitory Room",
        propertycategory: "Hotel",
        bedtype: "Double Bed",
        extrabedtype: "Twin Bed",
        roomview: "No View",
        rateplan: "CP",
        status: "inactive",
    },
    {
        id: 3,
        name: "Single Room",
        propertycategory: "Vill",
        bedtype: "Single Bed",
        extrabedtype: "No Extra Bed",
        roomview: "Valley",
        rateplan: "MAP",
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
    {label: "EP", value: "EP"},
    {label: "CP", value: "CP" },
    {label: "MAP", value: "MAP" },
    {label: "AP", value: "AP" },
];
  

export default function RoomType() {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const [ propertyRoomtype, setPropertyRoomtype ] = useState();
    const [ status, setStatus ] = useState('');
    const [ result, setResult ] = useState([]);
    const [ currRowId, setCurrRowId ] = useState('');
    const [actionType, setActionType] = useState(null);

    const dispatch = useDispatch();
    const property_res = useSelector((data) => data.propRes.property_res); 
    console.log("property_res: ", property_res)

    const [ roomTypeCategory, setRoomTypeCategory ] = useState([])
    const [ roomNameList, setRoomNameList ] = useState([])

    const [ selectedRoomTypeCategory, setSelectedRoomTypeCategory ] = useState('');
    const [ selectedRoomName, setSelectedRoomName ] = useState('');

    const [ lastID, setLastID ] = useState(0);
    
    const checksRef = useRef();
    checksRef.current = useSelector((state) => state.checks.selectedChecks);

    useEffect(() => {
        initialFxn()
    }, [])

    const initialFxn = async () => {

        try {
            const response = await fetch("/api/property/property_roomtype", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const result = await response.json();
            console.log("Data:", result);
            setResult(result.data)
            dispatch(handlePropRes(result))
            
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }


    useEffect(() => {

        setRoomTypeCategory(property_res.property_roomtypecategory)
        setRoomNameList(property_res.property_roomnames)
        
    }, [property_res])



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
      const newID = `RTID${String(lastID + 1).padStart(5, '0')}`;
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
                console.log("ADd Function: ", selectedRoomTypeCategory, selectedRoomName)
                const data = {
                    id: generateUniqueID(),
                    property_roomtype_category : selectedRoomTypeCategory,
                    property_roomname : selectedRoomName,
                    status: status,
                    creation_date: getCurrentDateTime(),
                    last_update_on: getCurrentDateTime(),
                };
        
                try {
                    const response = await fetch("/api/property/property_roomtype", {
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
                 console.log("EDit",currRowId)
                try {
                    const response = await fetch("/api/property/property_roomtype", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({id: currRowId, action: actionType, 
                            property_roomtype_category : selectedRoomTypeCategory,
                            property_roomname : selectedRoomName,
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
                      const response = await fetch("/api/property/property_roomtype", {
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
                const numericPart = lastElementId.match(/(?<=RTID)0*(\d+)/); // Extract numeric part using regular expression
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

        const rowEdit = async (key) => {
            console.log("Data of Row: ",key)
            setCurrRowId(key)
        }

        // useEffect(() => {
        //     console.log("Current Row ID::::::>",currRowId,customName,
        //     selectedCategory,
        //     selectedBT,
        //     selectedEBT,
        //     selectedRV,
        //     selectedRatePlans,actionType,status);
        // }, [currRowId,customName,
        //     selectedCategory,
        //     selectedBT,
        //     selectedEBT,
        //     selectedRV,
        //     selectedRatePlans,actionType,
        //     status])

        const handleOpen = (type) => {
            if(type === "add") {
                setSelectedRoomTypeCategory('');
            }

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
      
                    const response = await fetch("/api/property/property_roomtype", {
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
  
                    const response = await fetch("/api/property/property_roomtype", {
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
                      setStatus(item.status);            
                      setSelectedRoomName(item.property_roomname);
                      setSelectedRoomTypeCategory(item.property_roomtype_category);
                      handleOpen("edit")
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
            <h1 className="flex text-3xl ml-6 mt-6"><PlusIcon className="size-8 mt-1" />Add Room Type</h1>
            <div className="mr-6 text-end">
                {/* <Button onPress={() => {setCustomName('');handleOpen("add")}} color="primary" variant="shadow" ><Plus className="size-4" />Add Room</Button> */}
                <Modal isOpen={isOpen} size="4xl" onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="gap-1">Add Room</ModalHeader>
                                <ModalBody>
                                    <div className="p-4 grid grid-cols-2 gap-2">
                                    {actionType === "editmany" ? '' :
                                        <>

                            
                            <Autocomplete
                              isRequired
                              labelPlacement="outside"
                              placeholder="Select...."
                              label="Property Room Type Category"
                              variant="bordered"
                              size="md"
                              className="max-w-xs"
                              defaultSelectedKey={actionType === "edit" ? selectedRoomTypeCategory : ''}
                              value={selectedRoomTypeCategory}
                              allowsCustomValue={true}
                              onInputChange={(value) => setSelectedRoomTypeCategory(value)}
                            >
                              {roomTypeCategory?.map((item) => (
                                <AutocompleteItem key={item.property_roomtype_category} value={item.property_roomtype_category}>
                                  {item.property_roomtype_category}
                                </AutocompleteItem>
                              ))}
                            </Autocomplete>
                            <Autocomplete
                              isRequired
                              labelPlacement="outside"
                              placeholder="Select...."
                              label="Room Name"
                              variant="bordered"
                              size="md"
                              className="max-w-xs"
                              defaultSelectedKey={actionType === "edit" ? selectedRoomName : ''}
                              value={selectedRoomName}
                              allowsCustomValue={true}
                              onInputChange={(value) => setSelectedRoomName(value)}
                            >
                              {roomNameList?.map((item) => (
                                <AutocompleteItem key={item.property_roomname} value={item.property_roomname}>
                                  {item.property_roomname}
                                </AutocompleteItem>
                              ))}
                            </Autocomplete>
                            
                            </>}

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
                
                <DataTable data = {result} columns = {columns}
  statusOptions = {statusOptions} statusColorMap = {statusColorMap} columnSort = "id" columnName = {"property_roomtype_category"} actionsContent = {actionsContent} operation = "propRT" handleOpen = {handleOpen} handleClick = {handleClick} handleDelete = {handleDelete} handleSubmit = {handleSubmit}/>
            </div>
        </div></>
    );
};