'use client'
import React, { useState, useEffect, useCallback, useRef } from "react";
import { GoPlus } from "react-icons/go";
// import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input} from "@nextui-org/react";
import { Tooltip, RadioGroup, Radio, Button, Input, Chip, Table,  DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem, TableHeader, TableColumn, TableBody,Pagination, getKeyValue, TableRow, TableCell, Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Autocomplete, AutocompleteItem  } from "@nextui-org/react"
import {PlusIcon, SearchIcon, ChevronDownIcon, DeleteIcon, EditIcon } from "@/app/_components/icon";
import { useSearchParams } from 'next/navigation'
import Swal from 'sweetalert2'
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import DataTable from "@/app/_components/ui/DataTable";
import { useSelector } from "react-redux";

const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "FLOOR", uid: "floor", sortable: true},
  {name: "ROOM NO.", uid: "room_no", sortable: true},
  {name: "ROOM NAME", uid: "room_name", sortable: true},
  {name: "ROOM TYPE", uid: "room_type", sortable: true},
  {name: "ROOM RATE", uid: "room_rate", sortable: true},
  {name: "CGST", uid: "cgst", sortable: true},
  {name: "SGST", uid: "sgst", sortable: true},
  {name: "IGST", uid: "igst", sortable: true},
  {name: "EXTRA ADULT PRICE", uid: "extra_adult_price", sortable: true},
  {name: "EXTRA CHILD PRICE", uid: "extra_child_price", sortable: true},
  {name: "ROOM SIZE", uid: "room_size", sortable: true},
  {name: "ROOM SIZE TYPE", uid: "room_size_type", sortable: true},
  {name: "STATUS", uid: "status", sortable: true},
  {name: "BASE ADULT", uid: "base_adult", sortable: true},
  {name: "BASE CHILD", uid: "base_child", sortable: true},
  {name: "MAX ADULT", uid: "max_adult", sortable: true},
  {name: "MAX CHILD", uid: "max_child", sortable: true},
  {name: "MAX INFANT", uid: "max_infant", sortable: true},
  {name: "MAX GUEST", uid: "max_guest", sortable: true},
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

const RoomDetailsPage = () => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const searchParams = useSearchParams();
    const hotel_id = searchParams.get('hotel_id');
    const [ result, setResult ] = useState([]);
    const [ allResult, setAllResult ] = useState([]);
    const [ status, setStatus ] = useState('');
    const [ floor, setFloor ] = useState([]);
    const [ roomtype, setRoomtype ] = useState([]);

    const [selectedFloor, setSelectedFloor] = useState('');
    const [selectedRoomtype, setSelectedRoomtype] = useState('');

    const [roomNumber, setRoomNumber] = useState('');
    const [roomName, setRoomName] = useState('');
    const [roomRate, setRoomRate] = useState('');
    const [cgst, setCGST] = useState('');
    const [sgst, setSGST] = useState('');
    const [igst, setIGST] = useState('');
    const [extraAdultPrice, setExtraAdultPrice] = useState('');
    const [extraChildPrice, setExtraChildPrice] = useState('');
    const [roomSize, setRoomSize] = useState('');
    const [selectedRoomSizeType, setSelectedRoomSizeType] = useState('');
    const [baseAdult, setBaseAdult] = useState('');
    const [baseChild, setBaseChild] = useState('');
    const [maxAdult, setMaxAdult] = useState('');
    const [maxChild, setMaxChild] = useState('');
    const [maxInfant, setMaxInfant] = useState('');
    const [maxGuest, setMaxGuest] = useState('');
    
    const [ currRowId, setCurrRowId ] = useState('');
    const [actionType, setActionType] = useState(null);
    const [lastID, setLastID] = useState(0);

    const checksRef = useRef();
    checksRef.current = useSelector((state) => state.checks.selectedChecks);

    useEffect(() => {
      initialFxn()
  }, [])

  
  useEffect(() => {
    console.log("IDDD01 ",lastID)
}, [lastID])

  const initialFxn = async () => {
      try {
          const response = await fetch(`/api/pms/property_master/room_details?hotelId=${hotel_id.toString()}`, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
              },
          });
          const result = await response.json();
          console.log("Data:", result.dataAll);
          setAllResult(result.dataAll);
          setResult(result.data);
          setFloor(result.floor);
          setRoomtype(result.roomtype);
      } catch (error) {
          console.error("Error fetching data:", error);
      }
  }

  useEffect(() => {
    console.log("Result: ",result)
}, [result])

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
      console.log("IDDD02",lastID)
    const newID = `RDID${String(lastID + 1).padStart(5, '0')}`;
    setLastID(lastID + 1);
    return newID;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleSubmit = useCallback(async () => {

      if(actionType === "add") {
          console.log("Add")

          const data = {
              id: generateUniqueID(),
              Hotel_Id: hotel_id,
              floor: selectedFloor.trim(),
              room_no: roomNumber.trim(),
              room_name: roomName.trim(),
              room_type: selectedRoomtype.trim(),
              room_rate: roomRate.trim(),
              cgst: cgst.trim(),
              sgst: sgst.trim(),
              igst: igst.trim(),
              extra_adult_price: extraAdultPrice.trim(),
              extra_child_price: extraChildPrice.trim(),
              room_size: roomSize.trim(),
              room_size_type: selectedRoomSizeType.trim(),
              status: status.trim(),
              base_adult: baseAdult.trim(),
              base_child: baseChild.trim(),
              max_adult: maxAdult.trim(),
              max_child: maxChild.trim(),
              max_infant: maxInfant.trim(),
              max_guest: maxGuest.trim(),
              creation_date: getCurrentDateTime,
              last_update_on: getCurrentDateTime,  
          };
  
          try {
              const response = await fetch("/api/pms/property_master/room_details", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
              });
              const result = await response.json();
              console.log("Data:", result.res);
              setResult(result.res);
              setAllResult(result.dataAll)
              onClose()

              if(result.data.result === "Data already existed") {
                  toast("Data already existed!")
              }else{
                  toast.success("Data inserted!")
              }
          } catch (error) {
              console.error("Error fetching data:", error);
          }
      }else if(actionType === "edit"){
          console.log("EDit")
          try {
              const response = await fetch("/api/pms/property_master/room_details", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify({id: currRowId, action: actionType, floor: selectedFloor.trim(),
                    Hotel_Id: hotel_id,
                    room_no: roomNumber.trim(),
                    room_name: roomName.trim(),
                    room_type: selectedRoomtype.trim(),
                    room_rate: roomRate.trim(),
                    cgst: cgst.trim(),
                    sgst: sgst.trim(),
                    igst: igst.trim(),
                    extra_adult_price: extraAdultPrice.trim(),
                    extra_child_price: extraChildPrice.trim(),
                    room_size: roomSize.trim(),
                    room_size_type: selectedRoomSizeType.trim(),
                    status: status.trim(),
                    base_adult: baseAdult.trim(),
                    base_child: baseChild.trim(),
                    max_adult: maxAdult.trim(),
                    max_child: maxChild.trim(),
                    max_infant: maxInfant.trim(),
                    max_guest: maxGuest.trim()
                  }),
              });
              const result = await response.json();
              console.log("Data:", result);
              setResult(result.res);
              onClose()
              toast.success("Data edited!")
          } catch (error) {
              console.error("Error fetching data:", error);
          }
      }
      else if(actionType === "editmany"){
          console.log("Edit Many: ",checksRef.current);

          try {
            const response = await fetch("/api/pms/property_master/room_details", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ids: checksRef.current, action: actionType, 
                    status: status, Hotel_Id: hotel_id}),
            });
            const result = await response.json();
            console.log("Data:", result);
            setResult(result.res);
            onClose()
            toast.success("Row updated!")
        } catch (error) {
            console.error("Error fetching data:", error);
        }
      }

  }
  );


  useEffect(() => {
    if (allResult && allResult.length > 0) {
        const lastElement = allResult[allResult.length - 1]; 
        const lastElementId = lastElement.id; 
        const numericPart = lastElementId.match(/(?<=RDID)0*(\d+)/); 
        const lastNumericId = numericPart ? parseInt(numericPart[1]) : null;
        console.log("IDDD03", lastNumericId);
        setLastID(lastNumericId);
    } else {
        console.log("No elements in the array.");
        setLastID(0);
    }
}, [allResult,handleSubmit])

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
    // setRegion(type)
    // setRegionDesc(desc)
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

            const response = await fetch("/api/pms/property_master/room_details", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({id: id, action: "deleteSelectedChecks", selectedChecks : checks, Hotel_Id: hotel_id,}),
          });
          const result = await response.json();
          console.log("Data:", result);
          setResult(result.res);
          setAllResult(result.dataAll);
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

            const response = await fetch("/api/pms/property_master/room_details", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({id: id, action: "delete", Hotel_Id: hotel_id}),
          });
          const result = await response.json();
          console.log("Data:", result);
          setResult(result.res);
          setAllResult(result.dataAll);

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
        <span className="text-lg text-danger cursor-pointer active:opacity-50">
          <Button
            isIconOnly
            onPress={() => {
              onEditClick(item); // Pass item data to the callback function
              setStatus(item.status);
              setSelectedFloor(item.floor)
              setSelectedRoomtype(item.room_type)
              setSelectedRoomSizeType(item.room_size_type)
              handleOpen("edit");
            }}
            color="default"
            variant="light"
            size="sm"
            onClick={(e) => {

                setCurrRowId(item.id);
                setRoomNumber(item.room_no);
                setRoomName(item.room_name);
                setRoomRate(item.room_rate);
                setCGST(item.cgst);
                setSGST(item.sgst);
                setIGST(item.igst);
                setExtraAdultPrice(item.extra_adult_price);
                setExtraChildPrice(item.extra_child_price);
                setRoomSize(item.room_size);
                setBaseAdult(item.base_adult);
                setBaseChild(item.base_child);
                setMaxAdult(item.max_adult);
                setMaxChild(item.max_child);
                setMaxInfant(item.max_infant);
                setMaxGuest(item.max_guest);

            }}
          >
            <EditIcon className="size-4 text-black" />
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
    setCurrRowId('');
    setStatus('');
    setSelectedFloor('');
    setSelectedRoomtype('');
    setRoomNumber('');
    setRoomName('');
    setRoomRate('');
    setCGST('');
    setSGST('');
    setIGST('');
    setExtraAdultPrice('');
    setExtraChildPrice('');
    setRoomSize('');
    setSelectedRoomSizeType('');
    setBaseAdult('');
    setBaseChild('');
    setMaxAdult('');
    setMaxChild('');
    setMaxInfant('');
    setMaxGuest('');
};

  return (
  
    <><Toaster
        position="top-right"
        reverseOrder={false} />
    <div className='bg-background-800 h-fit rounded-xl m-4 p-4 shadow-xl'>
        <div className='w-full h-fit flex gap-4 justify-between'>
        <h1 className='text-3xl text-foreground-500 font-semibold'>Room Details</h1>
        {/* <Button variant='shadow' color='primary' size='sm' startContent={<GoPlus />} onPress={onOpen} >Create New Room</Button> */}
        
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl" className='h-[90%] overflow-y-scroll'>
        <ModalContent >
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Rooms Details</ModalHeader>
              <ModalBody>
              <div className="p-4 grid grid-cols-2 gap-2">
              {actionType === "editmany" ? '' :
                      <>
                                    <Autocomplete
                                        isRequired
                                        key=""
                                        labelPlacement="outside"
                                        placeholder="Select...."
                                        label="Floor"
                                        variant="bordered"
                                        size="md"
                                        className="max-w-xs"  
                                        defaultSelectedKey={actionType === "edit" ? selectedFloor : ''}
                                        value={selectedFloor}
                                        allowsCustomValue={true}
                                        onInputChange={(value) => setSelectedFloor(value)}
                                    >
                                      {Array.isArray(floor) && floor.map((item) => (
                                                    <AutocompleteItem key={item.property_floor} value={item.property_floor}>
                                                        {item.property_floor}
                                                    </AutocompleteItem>
                                       ))}
                                    </Autocomplete>
                                        <Input
                                            isRequired
                                            key=""
                                            type="text"
                                            label="Enter Room No"
                                            labelPlacement="outside"
                                            placeholder="Enter Room No"
                                            variant="bordered"
                                            size="md"
                                            className="max-w-xs"
                                            value={roomNumber}
                                            onChange={(e) => setRoomNumber(e.target.value)}
                                        />

                                        <Input
                                            isRequired
                                            key=""
                                            type="text"
                                            label="Coustom Room Name"
                                            labelPlacement="outside"
                                            placeholder="Enter Room Name"
                                            variant="bordered"
                                            size="md"
                                            className="max-w-xs"
                                            value={roomName}
                                            onChange={(e) => setRoomName(e.target.value)}
                                        />

                                        <Autocomplete
                                        isRequired
                                        key=""
                                        labelPlacement="outside"
                                        placeholder="Select...."
                                        label="Room Type"
                                        variant="bordered"
                                        size="md"
                                        className="max-w-xs"  
                                        defaultSelectedKey={actionType === "edit" ? selectedRoomtype : ''}
                                        value={selectedRoomtype}
                                        allowsCustomValue={true}
                                        onInputChange={(value) => setSelectedRoomtype(value)}
                                    >
                                       {Array.isArray(roomtype) && roomtype.map((item) => (
                                                    <AutocompleteItem key={item.property_name} value={item.property_name}>
                                                        {item.property_name}
                                                    </AutocompleteItem>
                                       ))}
                                        {/* <AutocompleteItem value="Active"  key="Classic">Classic</AutocompleteItem>
                                        <AutocompleteItem value="Inactive" key="Deluxe">Deluxe</AutocompleteItem> */}
                                    </Autocomplete>
                                    <Input
                                            isRequired
                                            key=""
                                            type="text"
                                            label="Room Rate"
                                            labelPlacement="outside"
                                            placeholder="Enter Room Rate"
                                            variant="bordered"
                                            size="md"
                                            className="max-w-xs"
                                            value={roomRate}
                                            onChange={(e) => setRoomRate(e.target.value)}
                                        /></>}
                                    </div>

                                    <div className='flex gap-16 w-[92%] ml-4'>
                                    {actionType === "editmany" ? '' :
                      <>
                                    <Input
                                            isRequired
                                            key=""
                                            type="text"
                                            label="CGST"
                                            labelPlacement="outside"
                                            placeholder="CGST"
                                            variant="bordered"
                                            size="md"
                                            className="max-w-xs"
                                            value={cgst}
                                            onChange={(e) => setCGST(e.target.value)}
                                        />
                                    <Input
                                            isRequired
                                            key=""
                                            type="text"
                                            label="SGST"
                                            labelPlacement="outside"
                                            placeholder="SGST"
                                            variant="bordered"
                                            size="md"
                                            className="max-w-xs"
                                            value={sgst}
                                            onChange={(e) => setSGST(e.target.value)}
                                        />
                                    <Input
                                            isRequired
                                            key=""
                                            type="text"
                                            label="IGST"
                                            labelPlacement="outside"
                                            placeholder="IGST"
                                            variant="bordered"
                                            size="md"
                                            className="max-w-xs"
                                            value={igst}
                                            onChange={(e) => setIGST(e.target.value)}
                                        /></>}
                                    </div>

                                    <div className='flex gap-6 w-[92%] ml-4'>
                                    {actionType === "editmany" ? '' :
                      <>
                                    <Input
                                            isRequired
                                            key=""
                                            type="text"
                                            label="Extra Adult Price"
                                            labelPlacement="outside"
                                            placeholder="Extra Adult Price"
                                            variant="bordered"
                                            size="md"
                                            className="w-60"
                                            value={extraAdultPrice}
                                            onChange={(e) => setExtraAdultPrice(e.target.value)}
                                        />
                                    <Input
                                            isRequired
                                            key=""
                                            type="text"
                                            label="Extra Child Price"
                                            labelPlacement="outside"
                                            placeholder="Extra Child Price"
                                            variant="bordered"
                                            size="md"
                                            className="w-60"
                                            value={extraChildPrice}
                                            onChange={(e) => setExtraChildPrice(e.target.value)}
                                        />
                                        <div className='flex'>
                                        <Input
                                            isRequired
                                            key=""
                                            type="text"
                                            label="Room Size"
                                            labelPlacement="outside"
                                            placeholder="Room Size"
                                            variant="bordered"
                                            size="md"
                                            className="w-28"
                                            value={roomSize}
                                            onChange={(e) => setRoomSize(e.target.value)}
                                        />
                                        <Autocomplete
                                        isRequired
                                        key=""
                                        labelPlacement="outside"
                                        placeholder="Select...."
                                        label="Select Size"
                                        variant="bordered"
                                        size="md"
                                        className="w-32"  
                                        defaultSelectedKey={actionType === "edit" ? selectedRoomSizeType : ''}
                                        value={selectedRoomSizeType}
                                        allowsCustomValue={true}
                                        onInputChange={(value) => setSelectedRoomSizeType(value)}
                                    >
                                        <AutocompleteItem value="sq ft"  key="sq ft">sq ft</AutocompleteItem>
                                        <AutocompleteItem value="sq m" key="sq m">sq m</AutocompleteItem>
                                    </Autocomplete>
                                    </div>
</>}
                                    </div>

                                    <div  className="p-4 grid grid-cols-2 gap-2">
                                        
                                    

                                    <Autocomplete
                                        isRequired
                                        key=""
                                        labelPlacement="outside"
                                        placeholder="Select...."
                                        label="Room Status"
                                        variant="bordered"
                                        size="md"
                                        className="max-w-xs"  
                                        defaultSelectedKey={actionType === "edit" ? status : ''}
                                        value={status}
                                        allowsCustomValue={true}
                                        onInputChange={(value) => setStatus(value)}
                                    >
                                        <AutocompleteItem value="Active"  key="Active">Active</AutocompleteItem>
                                        <AutocompleteItem value="Inactive" key="Inactive">Inactive</AutocompleteItem>
                                    </Autocomplete>

                                    </div>
                                    <div className='mt-2'>
                                    {actionType === "editmany" ? '' :
                      <>
                                        <h1 className='text-lg text-foreground-500'>Room Occupancy</h1>
                                        <div className="p-4 grid grid-cols-2 gap-6">
                                        <Input
                                            isRequired
                                            key=""
                                            type="text"
                                            label="Adults (Base)"
                                            labelPlacement="outside"
                                            placeholder="Adults (Base)*"
                                            variant="bordered"
                                            size="md"
                                            className="max-w-xs"
                                            value={baseAdult}
                                            onChange={(e) => setBaseAdult(e.target.value)}
                                        />

                                        <Input
                                            isRequired
                                            key=""
                                            type="text"
                                            label="Child (Base)"
                                            labelPlacement="outside"
                                            placeholder="Child (Base)"
                                            variant="bordered"
                                            size="md"
                                            className="max-w-xs"
                                            value={baseChild}
                                            onChange={(e) => setBaseChild(e.target.value)}
                                        />

                                        <Input
                                            isRequired
                                            key=""
                                            type="text"
                                            label="Adults (Max)"
                                            labelPlacement="outside"
                                            placeholder="Adults (Max)*"
                                            variant="bordered"
                                            size="md"
                                            className="max-w-xs"
                                            value={maxAdult}
                                            onChange={(e) => setMaxAdult(e.target.value)}
                                        />

                                        <Input
                                            isRequired
                                            key=""
                                            type="text"
                                            label="Child (Max)"
                                            labelPlacement="outside"
                                            placeholder="Child (Max)"
                                            variant="bordered"
                                            size="md"
                                            className="max-w-xs"
                                            value={maxChild}
                                            onChange={(e) => setMaxChild(e.target.value)}
                                        />

                                        <Input
                                            isRequired
                                            key=""
                                            type="text"
                                            label="Infant (Max)"
                                            labelPlacement="outside"
                                            placeholder="Infant (Max)"
                                            variant="bordered"
                                            size="md"
                                            className="max-w-xs"
                                            value={maxInfant}
                                            onChange={(e) => setMaxInfant(e.target.value)}
                                        />

                                        <Input
                                            isRequired
                                            key=""
                                            type="text"
                                            label="Guest(Max)Should always be greater than Adult(Max)"
                                            labelPlacement="outside"
                                            placeholder="Guest(Max)"
                                            variant="bordered"
                                            size="md"
                                            className="max-w-xs mt-4"
                                            value={maxGuest}
                                            onChange={(e) => setMaxGuest(e.target.value)}
                                        />
                                        </div></>}
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
        <div className="ml-2 mr-2">
            <DataTable data={result} columns={columns}
              statusOptions={statusOptions} statusColorMap={statusColorMap} columnSort="id" columnName={"room_name"} actionsContent={actionsContent} operation="pms_roomtype" handleOpen={handleOpen} handleClick={handleClick} handleDelete={handleDelete} handleSubmit={handleSubmit} />
          </div>
    </div>
    </>
  )
}

export default RoomDetailsPage;