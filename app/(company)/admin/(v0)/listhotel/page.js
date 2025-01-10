'use client'
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Plus, SquarePen, Trash2 } from "lucide-react"
import { Tooltip, RadioGroup, Radio, Button, Input, Chip, Table,  DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem, TableHeader, TableColumn, TableBody,Pagination, getKeyValue, TableRow, TableCell, Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Autocomplete, AutocompleteItem  } from "@nextui-org/react"
import {PlusIcon, SearchIcon, ChevronDownIcon, DeleteIcon, EditIcon } from "@/_components/icon";
import Swal from 'sweetalert2'
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import DataTable from "@/_components/ui/DataTable";
import { useSelector } from "react-redux";

const columns = [
    {name: "ID", uid: "id", sortable: true},
    {name: "HOTEL NAME", uid: "Hotel_name", sortable: true},
    {name: "HOTEL EMAIL", uid: "Hotel_email", sortable: true},
    {name: "PERSON NAME", uid: "contact_name", sortable: true},
    {name: "PERSON NUMBER", uid: "contact_number", sortable: true},
    {name: "HOTEL ADDRESS", uid: "Hotel_address", sortable: true},
    {name: "STATUS", uid: "status", sortable: true},
    {name: "DATE", uid: "created_date", sortable: true},
    // {name: "ACTIONS", uid: "actions"},
  ];
  
  const statusColorMap = {
    Active: "success",
    Inactive: "danger",
  };
  
  
  const propertytypesdata = [
    {
      id: "PTID00001",
      propertytype: "Hotel",
      propertydescription: "Hotel",
      status: "active",
    },
    {
        id: "PTID00002",
        propertytype: "Villa",
        propertydescription: "Villa",
        status: "active",
    },
    {
        id: "PTID00003",
        propertytype: "Resort",
        propertydescription: "Resort",
        status: "inactive",
    },
  ];


  //////////////////////////Table/////////////////////handleDe//////////
  
  const statusOptions = [
    {name: "Active", uid: "Active"},
    {name: "Inactive", uid: "Inactive"},
  ];

// const INITIAL_VISIBLE_COLUMNS = ["Hotel_Id", "Hotel_name", "status", "actions"];




export default function PropertyType() {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [ propertyType, setPropertyType ] = useState();
    const [ propertyDesc, setPropertyDesc ] = useState();
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
            const response = await fetch("/api/userApi/list_hotel", {
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

    

     function generateUniqueID() {
        console.log("Last IF:",lastID)
      const newID = `PTID${String(lastID + 1).padStart(5, '0')}`;
      setLastID(lastID + 1);
      return newID;
    }
        
      //  const customToast = (action, message) => {
      //       const Toast = Swal.mixin({
      //           toast: true,
      //           position: "top-end",
      //           showConfirmButton: false,
      //           timer: 3000,
      //           timerProgressBar: true,
      //           iconColor : "#90EE90",
      //           didOpen: (toast) => {
      //             toast.onmouseenter = Swal.stopTimer;
      //             toast.onmouseleave = Swal.resumeTimer;
      //           }
      //         });
      //         Toast.fire({
      //           icon: action,
      //           title: message
      //         });

      //   }


        // eslint-disable-next-line react-hooks/exhaustive-deps
        const handleSubmit = useCallback(async () => {
          console.log("Submit")

            if(actionType === "add") {
                console.log("Add")
    
                const data = {
                    id: generateUniqueID(),
                    property_category: propertyType,
                    property_desc: propertyDesc,
                    status: status,
                    creation_date: getCurrentDateTime(),
                    last_update_on: getCurrentDateTime(),
                };
        
                try {
                    const response = await fetch("/api/property/property_type", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    });
                    const result = await response.json();
                    console.log("Data:", result);
                    setResult(result.res);
                    onClose()

                    if(result.data.result === "Data already existed") {
                        // toast.error("Data already existed!")
                        toast("Data already existed!")
                    }else{
                        // toast.success("Data inserted!")
                        toast.success("Row inserted!")
                    }
                    
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }else if(actionType === "edit"){
                console.log("EDit")
                try {
                    const response = await fetch("/api/property/property_type", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({id: currRowId, action: actionType, property_category: propertyType,
                            property_desc: propertyDesc,
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
            }else if(actionType === "editmany"){
                console.log("Edit Many: ",checksRef.current);

                try {
                  const response = await fetch("/api/property/property_type", {
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

        });

                useEffect(() => {
            if (result && result.length > 0) {
                const lastElement = result[result.length - 1]; 
                const lastElementId = lastElement.id; 
                const numericPart = lastElementId.match(/(?<=PTID)0*(\d+)/); 
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

        const rowEdit = async (key,type,desc,statuses) => {
            console.log("Statusuasdfasf: ",statuses);
            setCurrRowId(key)
            setPropertyType(type)
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

        const handleClick = () => {
          setCurrRowId('')
          setPropertyType('')
          setPropertyDesc('')
          setStatus('')
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
    
                  const response = await fetch("/api/property/property_type", {
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

                  const response = await fetch("/api/property/property_type", {
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

        ///////////////////////////////////////////////////////////////////////////////////////

        // let actionsContent = (<> <Tooltip color="default" content="Edit Bed Type">
        // <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
        // <Button isIconOnly onPress={() => {onOpen();console.log("Data:::::>",item)}} color="default" variant="light" size="sm" onClick={(e) => {rowEdit(result.id,result.property_category,result.property_desc,result.status)}}><EditIcon className="size-4"/></Button>
        // </span>
        // </Tooltip>
        // <Tooltip color="danger" content="Delete Bed Type">
        // <span className="text-lg text-danger cursor-pointer active:opacity-50">
        // <Button isIconOnly color="danger" variant="light" size="sm" onClick={(e) => handleDelete(result.id)}><DeleteIcon className="size-4"/></Button>
        // </span>
        // </Tooltip></>);

        let actionsContent = (item, onEditClick, onDeleteClick) => (
            <>
              <Tooltip color="default" content="Edit Bed Type">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <Button
                    isIconOnly
                    onPress={() => {
                      onEditClick(item); // Pass item data to the callback function
                      setStatus(item.status);
                      handleOpen("edit");
                    }}
                    color="default"
                    variant="light"
                    size="sm"
                    onClick={(e) => {
                      rowEdit(item.id, item.property_category, item.property_desc, item.status);
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

    return (
      <><Toaster
        position="top-right"
        reverseOrder={false} /><div className="w-full">
          <h1 className="flex text-3xl ml-6 mt-6"><PlusIcon className="size-8 mt-1" />Add Property Type</h1>
          <div className="mr-6 text-end">
            {/* <Button onPress={() => handleOpen("add")} color="primary" variant="shadow" onClick={(e) => {
        setCurrRowId('')
        setPropertyType('')
        setPropertyDesc('')
        setStatus('')
    }}><Plus className="size-4" />Add Property</Button> */}
            <Modal isOpen={isOpen} size="4xl" onOpenChange={onOpenChange}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="gap-1">Add Property Category</ModalHeader>
                    <ModalBody>
                      <div className="p-4 grid grid-cols-2 gap-2">
                        {actionType === "editmany" ? '' :
                        <><Input
                            isRequired
                            type="text"
                            label="Property Category"
                            labelPlacement="outside"
                            placeholder="Enter your Custom Name"
                            variant="bordered"
                            size="md"
                            className="max-w-xs"
                            value={actionType === "edit" ? propertyType : propertyType}
                            onChange={(e) => setPropertyType(e.target.value)} />
                            
                            <Textarea
                              isRequired
                              type="text"
                              label="Property Description"
                              labelPlacement="outside"
                              placeholder="Property Description"
                              variant="bordered"
                              disableAnimation
                              disableAutosize
                              classNames={{
                                base: "max-w-xs",
                                input: "resize-y min-h-[40px]",
                              }}
                              value={actionType === "edit" ? propertyDesc : propertyDesc}
                              onChange={(e) => setPropertyDesc(e.target.value)} /></>}
                        <div className="ml-2">
                          <Autocomplete
                            isRequired
                            labelPlacement="outside"
                            placeholder="Select...."
                            label="Property Type Status"
                            variant="bordered"
                            size="md"
                            className="max-w-xs"
                            defaultSelectedKey={actionType === "edit" ? status : ''}
                            value={status}
                            allowsCustomValue={true}
                            onInputChange={(value) => setStatus(value)}
                          >
                            <AutocompleteItem value="Active" key="Active">Active</AutocompleteItem>
                            <AutocompleteItem value="Inactive" key="Inactive">Inactive</AutocompleteItem>
                          </Autocomplete>
                        </div>
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
            <DataTable data={result} columns={columns}
              statusOptions={statusOptions} statusColorMap={statusColorMap} columnSort="id" columnName={"created_date"} actionsContent={actionsContent} operation="listHotel" handleOpen={handleOpen} handleClick={handleClick} handleDelete = {handleDelete} handleSubmit = {handleSubmit}/>
          </div>
        </div></>
    );
};