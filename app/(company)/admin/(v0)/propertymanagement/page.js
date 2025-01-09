'use client'
import React, {useState,useEffect,  useCallback, useRef} from "react";
import DataTable from "@/_components/ui/DataTable";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Tooltip,
  Textarea,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Autocomplete,
    AutocompleteItem,
} from "@nextui-org/react";
import {PlusIcon, SearchIcon, ChevronDownIcon, DeleteIcon, EditIcon } from "@/_components/icon";
import { Eye } from 'lucide-react';
import { useSelector } from "react-redux";
import Swal from 'sweetalert2'
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";

const columns = [
  {name: "ID", uid: "Hotel_Id", sortable: true},
  {name: "NAME", uid: "Hotel_name", sortable: true},
  {name: "HOTELIER NAME", uid: "Contact_Name", sortable: true},
  {name: "NUMBER", uid: "Phone_Number", sortable: true},
  {name: "ADDRESS", uid: "Address"},
  {name: "LOCATION", uid: "Location"},
  {name: "STATE", uid: "State", sortable: true},
  {name: "STATUS", uid: "status", sortable: true},
  {name: "ACTIONS", uid: "actions"},
];

const statusOptions = [
  {name: "open", uid: "open"},
  {name: "close", uid: "close"},
];

const statusColorMap = {
  open: "success",
  close: "danger",
  vacation: "warning",
};

export default function PropertyManagment () {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [result, setResult] = useState([]);
  const [actionType, setActionType] = useState();

  const [hotelName, setHotelName] = useState();
  const [hotelierName, setHotelierName] = useState();
  const [contactNumber, setContactNumber] = useState();
  const [address, setAddress] = useState();
  const [location, setLocation] = useState();
  const [state, setState] = useState();
  const [status, setStatus] = useState();
  const [closingDesc, setClosingDesc] = useState(" ");

  const [currRowId, setCurrRowId] = useState();

  const checksRef = useRef();
  checksRef.current = useSelector((state) => state.checks.selectedChecks);

  const router = useRouter();

  React.useEffect(() => {
    initialFxn()
  }, [])
  
  const initialFxn = async () => {
    try {
        const response = await fetch("/api/hotels/hotel_info", {
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

  let columnSort = "Hotel_Id";

//   let actionsContent = (<>
//     <><Tooltip color="default" content="Edit Bed Type">
//         <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
//             <Button isIconOnly onPress= {(e) => onOpen()} color="default" variant="light" size="sm"><EditIcon className="size-4" /></Button>
//         </span>
//     </Tooltip><Tooltip color="danger" content="Delete Bed Type">
//             <span className="text-lg text-danger cursor-pointer active:opacity-50">
//                 <Button isIconOnly color="danger" variant="light" size="sm"><DeleteIcon className="size-4" /></Button>
//             </span>
//         </Tooltip></>
// </>);


const handleOpen = (type) => {
  console.log("Inside Hanlde Open")
  setActionType(type); 
  //onOpen();

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


const handleSubmit = async () => {

  if(actionType === "edit"){

       console.log("EDit",currRowId)
      try {
          const response = await fetch("/api/hotels/hotel_info", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({id: currRowId, action: actionType, Hotel_name : hotelName.trim(),
                  Contact_Name : hotelierName.trim(),
                  Phone_Number : contactNumber.trim(),
                  Address : address.trim(),
                  Location : location.trim(),
                  State : state.trim(),
                  status: status.trim(),
                  closing_description: closingDesc.trim()}),
                  
          });
          const result = await response.json();
          console.log("Data:", result);
          setResult(result.data);
          onClose()
          toast.success("Data edited!")
      } catch (error) {
          console.error("Error fetching data:", error);
      }
  }else if(actionType === "editmany"){
          console.log("Edit Many: ",checksRef.current);

          try {
            const response = await fetch("/api/hotels/hotel_info", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ids: checksRef.current, action: actionType, 
                    status: status, closing_description: closingDesc.trim()}),
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
  console.log("Status::::::>",status);
  if(status) {
    setStatus(status.toLowerCase())
  }

}, [status])

const rowEdit = async (key) => {
  //console.log("Data of Row: ",key,name,type,bedtype,extbedtype,roomview,rateplan)
  setCurrRowId(key)
}

let actionsContent = (item, onEditClick, onDeleteClick) => (
  <>
  <div className="flex w-fit">
  <Tooltip color="primary" content="Edit Property">
      <span className="text-lg text-default-400 cursor-pointer active:opacity-50" style={{bottom : "-5px"}}>
        <Button
          isIconOnly
          onPress={() => {
            //router.push(`/hotel/dashboard?hotel_id=${item.Hotel_Id}`)
            window.open(`/hotel/dashboard?hotel_id=${item.Hotel_Id}&hotel_name=${item.Hotel_name}`, '_blank')
          }}
          color="primary"
          variant="light"
          size="sm"
          onClick={(e) => {

          }}
        >
          <Eye />
        </Button>
      </span>
    </Tooltip>
    <Tooltip color="default" content="Edit Bed Type">
      <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
        <Button
          isIconOnly
          onPress={() => {
            onEditClick(item); // Pass item data to the callback function
            setHotelName(item.Hotel_name);            
            setHotelierName(item.Contact_Name);
            setContactNumber(item.Phone_Number);
            setAddress(item.Address);
            setLocation(item.Location);
            setState(item.State);
            setStatus(item?.status.toLowerCase());
            handleOpen("edit");
          }}
          color="default"
          variant="light"
          size="sm"
          onClick={(e) => {
            console.log("Clicked", item.Hotel_Id)
            rowEdit(item.Hotel_Id);
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
          // onClick={(e) => {
          //   handleDelete(result.id);
          // }}
        >
          <DeleteIcon className="size-4" />
        </Button>
      </span>
    </Tooltip>
    </div>
  </>
);

  return(

    <><Toaster
    position="top-right"
    reverseOrder={false} />
    <Modal isOpen={isOpen} size="4xl" onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>

            <ModalHeader className="gap-1">Edit Hotel Details</ModalHeader>
            <ModalBody>
              <div className="p-4 grid grid-cols-2 gap-2">
              {actionType === "editmany" 
                ? '' 
                : 
                <>
                  <Input
                      isRequired
                      type="text"
                      label="Hotel Name"
                      labelPlacement="outside"
                      placeholder="Enter Hotel Name"
                      variant="bordered"
                      size="md"
                      className="max-w-xs" 
                      value={actionType === "edit" ? hotelName : hotelName}
                      onChange={(e) => setHotelName(e.target.value)}
                    />
                  <Input
                        isRequired
                        type="text"
                        label="Hotel Hotelier Name"
                        labelPlacement="outside"
                        placeholder="Enter Hotelier Name"
                        variant="bordered"
                        size="md"
                        className="max-w-xs" 
                        value={actionType === "edit" ? hotelierName : hotelierName}
                        onChange={(e) => setHotelierName(e.target.value)}
                    />
                    <Input
                        isRequired
                        type="text"
                        label="Mobile Number"
                        labelPlacement="outside"
                        placeholder="Enter Mobile Number"
                        variant="bordered"
                        size="md"
                        className="max-w-xs"
                        value={actionType === "edit" ? contactNumber : contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)} 
                    />
                    <Textarea
                        isRequired
                        type="text"
                        label="Address"
                        labelPlacement="outside"
                        placeholder="Enter Address"
                        variant="bordered"
                        disableAnimation
                        disableAutosize
                        classNames={{
                          base: "max-w-xs",
                          input: "resize-y min-h-[40px]",
                        }} 
                        value={actionType === "edit" ? address : address}
                        onChange={(e) => setAddress(e.target.value)} 
                      />
                      <Input
                        isRequired
                        type="text"
                        label="Location"
                        labelPlacement="outside"
                        placeholder="Enter Location"
                        variant="bordered"
                        size="md"
                        className="max-w-xs" 
                        value={actionType === "edit" ? location : location}
                        onChange={(e) => setLocation(e.target.value)} 
                      />
                      <Input
                        isRequired
                        type="text"
                        label="State"
                        labelPlacement="outside"
                        placeholder="Enter State"
                        variant="bordered"
                        size="md"
                        className="max-w-xs" 
                        value={actionType === "edit" ? state : state}
                        onChange={(e) => setState(e.target.value)} 
                        /></> }
                        
                <div className="ml-2">
                  <Autocomplete
                    isRequired
                    labelPlacement="outside"
                    placeholder="Select...."
                    label="Hotel Status"
                    variant="bordered"
                    size="md"
                    className="max-w-xs"
                    defaultSelectedKey={actionType === "edit" ? status : '' }
                    value={status} 
                    allowsCustomValue={true}
                    onInputChange={(value) => setStatus(value.toLowerCase())}
                  >
                    <AutocompleteItem value="open" key="open">Open</AutocompleteItem>
                    <AutocompleteItem value="close" key="close">Close</AutocompleteItem>
                  </Autocomplete>

                 
                </div>
                {status === "close" 
                  ? <Textarea
                  isRequired
                  type="text"
                  label="Closing Reason"
                  labelPlacement="outside"
                  placeholder="Enter Closing Description"
                  variant="bordered"
                  disableAnimation
                  disableAutosize
                  classNames={{
                    base: "max-w-xs",
                    input: "resize-y min-h-[40px]",
                  }} 
                  value={actionType === "edit" ? closingDesc : closingDesc}
                  onChange={(e) => setClosingDesc(e.target.value)} 
              />
                    : " "}
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
    <div className="m-4">
    <DataTable data={result} columns={columns}
      statusOptions={statusOptions} statusColorMap={statusColorMap} columnSort="Hotel_Id" columnName={"Hotel_name"} actionsContent={actionsContent} operation = "propManagement" handleOpen = {handleOpen}/>
      </div>
      </>
  )
  
}
