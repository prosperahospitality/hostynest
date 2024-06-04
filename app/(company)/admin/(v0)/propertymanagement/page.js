'use client'
import React from "react";
import DataTable from "@/app/_components/ui/DataTable";
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
import {PlusIcon, SearchIcon, ChevronDownIcon, DeleteIcon, EditIcon } from "@/app/_components/icon";
import { Eye } from 'lucide-react';
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
  {name: "Open", uid: "open"},
  {name: "Close", uid: "close"},
];

const statusColorMap = {
  open: "success",
  close: "danger",
  vacation: "warning",
};

export default function PropertyManagment () {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [result, setResult] = React.useState([]);
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
  // setActionType(type); 
  onOpen();
};


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
            // setStatus(item.status);
            handleOpen("edit");
          }}
          color="default"
          variant="light"
          size="sm"
          onClick={(e) => {
            console.log("Clicked")
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

    <>
    <Modal isOpen={isOpen} size="4xl" onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>

            <ModalHeader className="gap-1">Add Property Category</ModalHeader>
            <ModalBody>
              <div className="p-4 grid grid-cols-2 gap-2">
                <Input
                  isRequired
                  type="text"
                  label="Property Category"
                  labelPlacement="outside"
                  placeholder="Enter your Custom Name"
                  variant="bordered"
                  size="md"
                  className="max-w-xs" />
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
                  }} />
                <div className="ml-2">
                  <Autocomplete
                    isRequired
                    labelPlacement="outside"
                    placeholder="Select...."
                    label="Bed Type Status"
                    variant="bordered"
                    size="md"
                    className="max-w-xs"
                  >
                    <AutocompleteItem value="Active" key="Active">Active</AutocompleteItem>
                    <AutocompleteItem value="Inactive" key="Inactive">Inactive</AutocompleteItem>
                  </Autocomplete>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={onClose}>
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
      statusOptions={statusOptions} statusColorMap={statusColorMap} columnSort="Hotel_Id" columnName={"Hotel_name"} actionsContent={actionsContent} operation = "propManagement"/>
      </div>
      </>
  )
  
}
