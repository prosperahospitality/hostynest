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
    {name: "NAME", uid: "property_name", sortable: true},
    {name: "PROPERTY CATEGORY", uid: "property_type", sortable: true},
    {name: "BED TYPE", uid: "property_bedtype", sortable: true},
    {name: "EXTRA BED Type", uid: "property_extbedtype", sortable: true},
    {name: "ROOM VIEW", uid: "property_roomview", sortable: true},
    {name: "RATE PLAN", uid: "property_rateplan", sortable: true},
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

    const [ propertyBedtype, setPropertyBedtype ] = useState([]);
    const [ propertyExtbedtype, setPropertyExtbedtype ] = useState([]);
    const [ propertyRoomview, setPropertyRoomview ] = useState([]);
    const [ propertyType, setPropertyType ] = useState([]);
    const [ propertyRatePlans, setPropertyRatePlans ] = useState('');

    const [ customName, setCustomName ] = useState('');
    const [ selectedCategory, setSelectedCategory ] = useState('');
    const [ selectedBT, setSelectedBT ] = useState('');
    const [ selectedEBT, setSelectedEBT ] = useState('');
    const [ selectedRV, setSelectedRV ] = useState('');
    const [ selectedRatePlans, setSelectedRatePlans ] = useState('');

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

        setPropertyBedtype(property_res.property_bedtype)
        setPropertyExtbedtype(property_res.property_extbedtype)
        setPropertyRoomview(property_res.property_roomview)
        setPropertyType(property_res.property_type)
        
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
    
                const data = {
                    id: generateUniqueID(),
                    property_name : customName,
                    property_type : selectedCategory,
                    property_bedtype : selectedBT,
                    property_extbedtype : selectedEBT,
                    property_roomview : selectedRV,
                    property_rateplan : selectedRatePlans,
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
                        body: JSON.stringify({id: currRowId, action: actionType, property_name : customName,
                            property_type : selectedCategory,
                            property_bedtype : selectedBT,
                            property_extbedtype : selectedEBT,
                            property_roomview : selectedRV,
                            property_rateplan : selectedRatePlans,
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

        const rowEdit = async (key,name,type,bedtype,extbedtype,roomview,rateplan) => {
            console.log("Data of Row: ",key,name,type,bedtype,extbedtype,roomview,rateplan)
            setCurrRowId(key)
        }

        useEffect(() => {
            console.log("Current Row ID::::::>",currRowId,customName,
            selectedCategory,
            selectedBT,
            selectedEBT,
            selectedRV,
            selectedRatePlans,actionType,status);
        }, [currRowId,customName,
            selectedCategory,
            selectedBT,
            selectedEBT,
            selectedRV,
            selectedRatePlans,actionType,
            status])

        const handleOpen = (type) => {
            if(type === "add") {
                setCustomName('');
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
                      setSelectedRatePlans(item.property_rateplan);
                      setSelectedBT(item.property_bedtype);
                      setSelectedEBT(item.property_extbedtype);
                      setSelectedRV(item.property_roomview);
                      setCustomName(item.property_name,);
                      setSelectedCategory(item.property_type);
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
                                        <><Input
                            isRequired
                            type="text"
                            label="Display Name"
                            labelPlacement="outside"
                            placeholder="Enter your Custom Name"
                            variant="bordered"
                            size="md"
                            className="max-w-xs"
                            value={actionType === "edit" ? customName : customName}
                            onChange={(e) => setCustomName(e.target.value)} /><Autocomplete
                              isRequired
                              labelPlacement="outside"
                              placeholder="Select...."
                              label="Property Category"
                              variant="bordered"
                              size="md"
                              className="max-w-xs"
                              defaultSelectedKey={actionType === "edit" ? selectedCategory : ''}
                              value={selectedCategory}
                              allowsCustomValue={true}
                              onInputChange={(value) => setSelectedCategory(value)}
                            >
                              {propertyType?.map((item) => (
                                <AutocompleteItem key={item.property_category} value={item.property_category}>
                                  {item.property_category}
                                </AutocompleteItem>
                              ))}
                            </Autocomplete><Autocomplete
                              isRequired
                              labelPlacement="outside"
                              placeholder="Select...."
                              label="Bed Type"
                              variant="bordered"
                              size="md"
                              className="max-w-xs"
                              defaultSelectedKey={actionType === "edit" ? selectedBT : ''}
                              value={selectedBT}
                              allowsCustomValue={true}
                              onInputChange={(value) => setSelectedBT(value)}
                            >
                              {propertyBedtype?.map((item) => (
                                <AutocompleteItem key={item.property_bedtype} value={item.property_bedtype}>
                                  {item.property_bedtype}
                                </AutocompleteItem>
                              ))}
                            </Autocomplete><Autocomplete
                              isRequired
                              labelPlacement="outside"
                              placeholder="Select...."
                              label="Extra Bed Type"
                              variant="bordered"
                              size="md"
                              className="max-w-xs"
                              defaultSelectedKey={actionType === "edit" ? selectedEBT : ''}
                              value={selectedEBT}
                              allowsCustomValue={true}
                              onInputChange={(value) => setSelectedEBT(value)}
                            >
                              {propertyExtbedtype?.map((item) => (
                                <AutocompleteItem key={item.property_extbedtype} value={item.property_extbedtype}>
                                  {item.property_extbedtype}
                                </AutocompleteItem>
                              ))}
                            </Autocomplete><Autocomplete
                              isRequired
                              labelPlacement="outside"
                              placeholder="Select...."
                              label="Room View"
                              variant="bordered"
                              size="md"
                              className="max-w-xs"
                              defaultSelectedKey={actionType === "edit" ? selectedRV : ''}
                              value={selectedRV}
                              allowsCustomValue={true}
                              onInputChange={(value) => setSelectedRV(value)}
                            >
                              {propertyRoomview?.map((item) => (
                                <AutocompleteItem key={item.property_roomview} value={item.property_roomview}>
                                  {item.property_roomview}
                                </AutocompleteItem>
                              ))}
                            </Autocomplete><Autocomplete
                              isRequired
                              labelPlacement="outside"
                              placeholder="Select...."
                              label="Rate Plan"
                              variant="bordered"
                              size="md"
                              className="max-w-xs"
                              defaultSelectedKey={actionType === "edit" ? selectedRatePlans : ''}
                              value={selectedRatePlans}
                              allowsCustomValue={true}
                              onInputChange={(value) => setSelectedRatePlans(value)}
                            >
                              {rateplans?.map((rateplan) => (
                                <AutocompleteItem key={rateplan.value} value={rateplan.value}>
                                  {rateplan.label}
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
                    {result?.map((roomtype) => (
                        <TableRow key={roomtype.id}>
                            <TableCell>{roomtype.id}</TableCell>
                            <TableCell>{roomtype.property_name}</TableCell>
                            <TableCell>{roomtype.property_type}</TableCell>
                            <TableCell>{roomtype.property_bedtype}</TableCell>
                            <TableCell>{roomtype.property_extbedtype}</TableCell>
                            <TableCell>{roomtype.property_roomview}</TableCell>
                            <TableCell>
                                <Chip className="capitalize" color="primary" size="sm" variant="solid">
                                {roomtype.property_rateplan}
                                </Chip>
                            </TableCell>
                            <TableCell>
                                <Chip className="capitalize" color={statusColorMap[roomtype.status]} size="sm" variant="flat">
                                {roomtype.status}
                                </Chip>
                            </TableCell>
                            <TableCell>
                                <Tooltip color="default" content="Edit user">
                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <Button isIconOnly onPress={() => {setStatus(roomtype.status);            
                                    setSelectedRatePlans(roomtype.property_rateplan);
                                    setSelectedBT(roomtype.property_bedtype);
                                    setSelectedEBT(roomtype.property_extbedtype);
                                    setSelectedRV(roomtype.property_roomview);
                                    setCustomName(roomtype.property_name);
                                    setSelectedCategory(roomtype.property_type);
                                    handleOpen("edit")
                                }} 
                                    color="default" variant="light" size="sm" 
                                    onClick= {(e) => {rowEdit(roomtype.id)}}>    
                                    <EditIcon className="size-4"/></Button>
                                </span>
                                </Tooltip>
                                <Tooltip color="danger" content="Delete">
                                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <Button isIconOnly color="danger" variant="light" size="sm" onClick={(e) => handleDelete(roomtype.id)}><DeleteIcon className="size-4"/></Button>
                                </span>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table> */}
                <DataTable data = {result} columns = {columns}
  statusOptions = {statusOptions} statusColorMap = {statusColorMap} columnSort = "id" columnName = {"property_name"} actionsContent = {actionsContent} operation = "propRT" handleOpen = {handleOpen} handleClick = {handleClick} handleDelete = {handleDelete} handleSubmit = {handleSubmit}/>
            </div>
        </div></>
    );
};