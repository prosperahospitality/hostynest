'use client'
import React, { useState, useEffect, useCallback, useRef } from "react";
import { GoPlus } from "react-icons/go";
// import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input} from "@nextui-org/react";
import {
  Tooltip,
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Autocomplete,
  AutocompleteItem,
  Spinner
} from "@nextui-org/react"
import { DeleteIcon, EditIcon } from "@/_components/icon";
import Swal from 'sweetalert2'
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import DataTable from "@/_components/ui/DataTable";
import { useSelector } from "react-redux";
import { Trash2 } from 'lucide-react';
import { useSession } from 'next-auth/react'

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "FLOOR", uid: "floor", sortable: true },
  { name: "ROOM NO.", uid: "room_no", sortable: true },
  { name: "ROOM NAME", uid: "room_name", sortable: true },
  { name: "ROOM TYPE", uid: "room_type", sortable: true },
  { name: "ROOM RATE", uid: "room_rate", sortable: true },
  { name: "ROOM RATE 3 HOURS", uid: "room_rate3hrs", sortable: true },
  { name: "ROOM RATE 6 HOURS", uid: "room_rate6hrs", sortable: true },
  { name: "ROOM RATE 12 HOURS", uid: "room_rate12hrs", sortable: true },
  { name: "CGST", uid: "cgst", sortable: true },
  { name: "SGST", uid: "sgst", sortable: true },
  { name: "IGST", uid: "igst", sortable: true },
  { name: "EXTRA ADULT PRICE", uid: "extra_adult_price", sortable: true },
  { name: "EXTRA CHILD PRICE", uid: "extra_child_price", sortable: true },
  { name: "ROOM SIZE", uid: "room_size", sortable: true },
  { name: "ROOM SIZE TYPE", uid: "room_size_type", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "BASE ADULT", uid: "base_adult", sortable: true },
  { name: "BASE CHILD", uid: "base_child", sortable: true },
  { name: "MAX ADULT", uid: "max_adult", sortable: true },
  { name: "MAX CHILD", uid: "max_child", sortable: true },
  { name: "MAX INFANT", uid: "max_infant", sortable: true },
  { name: "MAX GUEST", uid: "max_guest", sortable: true },
  { name: "ACTIONS", uid: "actions", sortable: true },
];

const statusColorMap = {
  Active: "success",
  Inactive: "danger",
};
const statusOptions = [
  { name: "Active", uid: "Active" },
  { name: "Inactive", uid: "Inactive" },
];

const RoomDetailsPage = () => {

  const [isLoading, setIsloading] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { data: sessionValue } = useSession();
  const [hotel_id, setHotel_id] = useState(sessionValue !== undefined ? sessionValue?.user?.Hotel_Id : 0);
  const [result, setResult] = useState([]);
  const [allResult, setAllResult] = useState([]);
  const [status, setStatus] = useState('');
  const [floor, setFloor] = useState([]);
  const [roomtype, setRoomtype] = useState([]);

  const [selectedFloor, setSelectedFloor] = useState('');
  const [selectedRoomtype, setSelectedRoomtype] = useState('');

  const [roomNumber, setRoomNumber] = useState('');
  const [roomName, setRoomName] = useState('');
  const [roomRate, setRoomRate] = useState('');
  const [roomRate3Hrs, setRoomRate3Hrs] = useState('');
  const [roomRate6Hrs, setRoomRate6Hrs] = useState('');
  const [roomRate12Hrs, setRoomRate12Hrs] = useState('');
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

  const [currRowId, setCurrRowId] = useState('');
  const [actionType, setActionType] = useState(null);
  const [lastID, setLastID] = useState(0);
  const [bedType, setBedType] = useState([]);

  const [num, setNum] = useState(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);
  const [bedSize, setBedSize] = useState(['90-130 cm wide', '131-150 cm wide', '151-180 cm wide', '181-210 cm wide', 'Variable size']);

  const [selectedBedtype, setSelectedBedtype] = useState([]);
  const [selectedNum, setSelectedNum] = useState([]);
  const [selectedBedSize, setSelectedBedSize] = useState([]);

  const [addBed, setAddBed] = useState([]);



  const checksRef = useRef();
  checksRef.current = useSelector((state) => state.checks.selectedChecks);




  useEffect(() => {
    console.log("selectedNum ", selectedNum)
  }, [selectedNum])

  const initialFxn = async (hotel_id) => {
    try {
      const response = await fetch(`/api/pms/property_master/room_details?hotelId=${hotel_id.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log("Data:123456", result);
      setAllResult(result.dataAll);
      setResult(result.data);
      setFloor(result.floor);
      console.log("Room Det:::::::>", result.roomtype)
      setRoomtype(result.roomtype);
      setBedType(result.bedtype);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    if (sessionValue !== undefined) {
      setHotel_id(sessionValue?.user?.Hotel_Id)
    }
  }, [sessionValue])

  useEffect(() => {
    if (hotel_id !== 0) {
      setIsloading(true);
      Promise.all([
        initialFxn(hotel_id)
      ]).then(() => {
        setIsloading(false);
      });
    }
  }, [hotel_id]);

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
    console.log("IDDD02", lastID)
    const newID = `RDID${String(lastID + 1).padStart(5, '0')}`;
    setLastID(lastID + 1);
    return newID;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSubmit = useCallback(async () => {

    console.log("Data imp: ", selectedBedtype, selectedNum, selectedBedSize)

    if (actionType === "add") {
      console.log("Add")

      const data = {
        id: generateUniqueID(),
        Hotel_Id: hotel_id,
        floor: selectedFloor.trim(),
        room_no: roomNumber.trim(),
        room_name: roomName.trim(),
        room_type: selectedRoomtype.trim(),
        room_rate: roomRate.trim(),
        room_rate3hrs: roomRate3Hrs.trim(),
        room_rate6hrs: roomRate6Hrs.trim(),
        room_rate12hrs: roomRate12Hrs.trim(),
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
        bed_type: selectedBedtype,
        number_of_beds: selectedNum,
        bed_size: selectedBedSize,
        room_photos: [],
        property_photos: [],
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

        if (result.data.result === "Data already existed") {
          toast("Data already existed!")
        } else {
          toast.success("Data inserted!")
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else if (actionType === "edit") {
      console.log("EDit")
      try {
        const response = await fetch("/api/pms/property_master/room_details", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: currRowId, action: actionType, floor: selectedFloor.trim(),
            Hotel_Id: hotel_id,
            room_no: roomNumber.trim(),
            room_name: roomName.trim(),
            room_type: selectedRoomtype.trim(),
            room_rate: roomRate.trim(),
            room_rate3hrs: roomRate3Hrs.trim(),
            room_rate6hrs: roomRate6Hrs.trim(),
            room_rate12hrs: roomRate12Hrs.trim(),
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
            bed_type: selectedBedtype,
            number_of_beds: selectedNum,
            bed_size: selectedBedSize,
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
    else if (actionType === "editmany") {
      console.log("Edit Many: ", checksRef.current);

      try {
        const response = await fetch("/api/pms/property_master/room_details", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ids: checksRef.current, action: actionType,
            status: status, Hotel_Id: hotel_id
          }),
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
  }, [allResult, handleSubmit])

  useEffect(() => {
    console.log("REs::::::>", result);
  }, [result])

  useEffect(() => {
    console.log("Status::::::>", status);
    setStatus(status)
  }, [status])

  const rowEdit = async (key, type, desc, statuses) => {
    console.log("Statusuasdfasf: ", statuses);
    setCurrRowId(key)
    // setRegion(type)
    // setRegionDesc(desc)
  }

  useEffect(() => {
    console.log("Current Row ID::::::>", currRowId);
  }, [currRowId])

  const handleOpen = (type) => {
    console.log("Inside Hanlde Open", checksRef.current, type, result.length)
    setActionType(type);
    if (result && result.length === 0) {
      checksRef.current = [];
      if (type === "editmany" && (checksRef.current).length === 0) {
        toast.error("No rows selected!")
      } else {
        onOpen();
      }

    } else {
      if (type === "editmany" && (checksRef.current).length === 0) {
        toast.error("No rows selected!")
      } else {
        onOpen();
      }
    }
  };

  const handleDelete = async (id, deleteAction, checks) => {
    console.log("Delete Opearion: ", id, deleteAction)

    if (deleteAction === "deleteSelected") {

      console.log("Delete Console", checks, checks.length)

      if (checks.length === 0 || result && result.length === 0) {
        toast.error("No rows selected!")
      } else {
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
              body: JSON.stringify({ id: id, action: "deleteSelectedChecks", selectedChecks: checks, Hotel_Id: hotel_id, }),
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



    } else {
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
              body: JSON.stringify({ id: id, action: "delete", Hotel_Id: hotel_id }),
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
              setRoomRate3Hrs(item.room_rate3hrs);
              setRoomRate6Hrs(item.room_rate6hrs);
              setRoomRate12Hrs(item.room_rate12hrs);
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
              setSelectedBedtype(item.bed_type);
              setSelectedNum(item.number_of_beds);
              setSelectedBedSize(item.bed_size);
              let a = item.bed_type;
              let aa = item.bed_type;
              let b = item.number_of_beds;
              let bb = item.number_of_beds;
              let c = item.bed_size;
              let cc = item.bed_size;
              let abcde = [];

              if (a.find((item) => item.key === 0)) {

                let abcd = a.filter((item) => item.key !== 0)
                a = abcd;

              } else {

              }

              a.map((item, index) => {
                let len = item.key;



                if (b.find((item) => item.key === 0)) {

                  let abcd = b.filter((item) => item.key !== 0)
                  b = abcd;

                } else {

                }

                if (c.find((item) => item.key === 0)) {

                  let abcd = c.filter((item) => item.key !== 0)
                  c = abcd;

                } else {

                }

                abcde.push({
                  key: item.key,
                  value: (
                    <div className="flex flex-row justify-evenly mt-2" style={{ padding: "0 0 12px 0" }} id={len}>

                      <div className="">
                        <Autocomplete
                          isRequired
                          key={a[len - 1] ? a[len - 1].value : " "}
                          labelPlacement="outside"
                          placeholder="Select...."

                          variant="bordered"
                          size="md"
                          className=""

                          defaultSelectedKey={a[len - 1] ? a[len - 1].value : " "}
                          value={a[len - 1] ? a[len - 1].value : " "}
                          allowsCustomValue={true}
                          onInputChange={(value) => {


                            let findres = aa.find((item) =>
                              item.key === len
                            );

                            if (findres) {
                              aa.map((item) => {
                                if (item.key === len) {
                                  item.value = value
                                }
                              });
                              setSelectedBedtype(aa)
                            } else {
                              aa.push({ key: len, value: value });
                              setSelectedBedtype(aa)
                            }

                          }}
                        >
                          {Array.isArray(bedType) &&
                            [...new Set(bedType.map((item) => item.property_bedtype))].map((item) => (
                              <AutocompleteItem key={item} value={item}>
                                {item}
                              </AutocompleteItem>
                            ))}
                        </Autocomplete>

                      </div>
                      <div className="" style={{ margin: "10px 0px 0 30px", width: "20px" }}><p>x</p></div>
                      <div className="" style={{ padding: "0" }}>
                        <Autocomplete
                          isRequired
                          key={b[len - 1] ? b[len - 1].value : " "}
                          labelPlacement="outside"
                          placeholder="Select...."

                          variant="bordered"
                          size="md"
                          className="max-w-xs"
                          defaultSelectedKey={b[len - 1] ? b[len - 1].value : " "}
                          value={b[len - 1] ? b[len - 1].value : " "}
                          allowsCustomValue={true}
                          onInputChange={(value) => {

                            let findres = bb.find((item) =>
                              item.key === len
                            );

                            if (findres) {
                              bb.map((item) => {
                                if (item.key === len) {
                                  item.value = value
                                }
                              });
                              setSelectedNum(bb)
                            } else {
                              bb.push({ key: len, value: value });
                              setSelectedNum(bb)
                            }

                            console.log("findres: ", findres)


                            // selectedNum.push({key:len,value:value}); 
                            // setSelectedNum(selectedNum)
                          }}
                        >
                          {Array.isArray(num) && num.map((item) => (
                            <AutocompleteItem value={item} key={item}>{item}</AutocompleteItem>
                          ))}
                        </Autocomplete>
                      </div>
                      <div className="" style={{ padding: "0 0 0 12px" }}>
                        <Autocomplete
                          isRequired
                          key={c[len - 1] ? c[len - 1].value : " "}
                          labelPlacement="outside"
                          placeholder="Select...."
                          label=""
                          variant="bordered"
                          className=""
                          style={{}}
                          defaultSelectedKey={c[len - 1] ? c[len - 1].value : " "}
                          value={c[len - 1] ? c[len - 1].value : " "}
                          allowsCustomValue={true}
                          onInputChange={(value) => {

                            let findres = cc.find((item) =>
                              item.key === len
                            );

                            if (findres) {
                              cc.map((item) => {
                                if (item.key === len) {
                                  item.value = value
                                }
                              });
                              setSelectedBedSize(cc)
                            } else {
                              cc.push({ key: len, value: value });
                              setSelectedBedSize(cc)
                            }

                            console.log("findres: ", findres)

                            // selectedBedSize.push({key:len,value:value}); 
                            // setSelectedBedSize(selectedBedSize)
                          }}
                        >
                          {Array.isArray(bedSize) && bedSize.map((item) => (
                            <AutocompleteItem value={item} key={item}>{item}</AutocompleteItem>
                          ))}
                        </Autocomplete>
                      </div>
                      <div className="" style={{ margin: "5px 0px 0px 0px" }}>
                        <Button style={{
                          height: "30px",
                          width: "107px",
                          background: "transparent"
                        }} onClick={(e) => handleRemoveBed(e, len)}><Trash2 /> Remove</Button></div>
                    </div>
                  )
                })

              })

              console.log("Edit clidedk: ", a, b, c, abcde)
              setAddBed(abcde)

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
    setRoomRate3Hrs('');
    setRoomRate6Hrs('');
    setRoomRate12Hrs('');
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
    setSelectedBedtype([]);
    setSelectedNum([]);
    setSelectedBedSize([]);
    setAddBed([])
  };


  useEffect(() => {
    console.log("SelectedRoomtype::::::>", selectedRoomtype);
  }, [selectedRoomtype])

  const handleRemoveBed = (e, ind) => {

    console.log("Add bed 050: ", ind);


    let a = '';
    let b = '';
    let c = '';

    setSelectedBedtype((prevSelectedBedtype) => {

      const updatedSelectedBedtype = prevSelectedBedtype.filter((item, index) => item.key !== ind);

      let findress = updatedSelectedBedtype.find((item) => item.key === 0);

      if (findress) {
        let abc = updatedSelectedBedtype.map((item, index) => {
          return ({
            ...item,
            key: index,
          })
        })
        a = abc;
        return abc;
      } else {
        let abc = updatedSelectedBedtype.map((item, index) => {
          return ({
            ...item,
            key: index + 1,
          })
        })
        a = abc;
        return abc;
      }
    });



    setSelectedNum((prevSelectedNum) => {

      const updatedSelectedNum = prevSelectedNum.filter((item, index) => item.key !== ind);

      let findress = updatedSelectedNum.find((item) => item.key === 0);

      if (findress) {
        let abc = updatedSelectedNum.map((item, index) => {
          return ({
            ...item,
            key: index,
          })
        })
        b = abc;
        return abc;
      } else {
        let abc = updatedSelectedNum.map((item, index) => {
          return ({
            ...item,
            key: index + 1,
          })
        })
        b = abc;
        return abc;
      }

    });



    setSelectedBedSize((prevSelectedBedSize) => {

      const updatedSelectedBedSize = prevSelectedBedSize.filter((item, index) => item.key !== ind);

      let findress = updatedSelectedBedSize.find((item) => item.key === 0);

      if (findress) {
        let abc = updatedSelectedBedSize.map((item, index) => {
          return ({
            ...item,
            key: index,
          })
        })
        c = abc;
        return abc;
      } else {
        let abc = updatedSelectedBedSize.map((item, index) => {
          return ({
            ...item,
            key: index + 1,
          })
        })
        c = abc;
        return abc;
      }
    });


    setAddBed((prevAddBed) => {
      console.log("data9 prevAddBed", prevAddBed, ind)



      const updatedAddBed = prevAddBed

        .filter((item, index) => item.key !== ind)
        .map((item, index) => {

          let len = index + 1;

          if (a.find((item) => item.key === 0)) {

            let abcd = a.filter((item) => item.key !== 0)
            a = abcd;

          } else {

          }

          if (b.find((item) => item.key === 0)) {

            let abcd = b.filter((item) => item.key !== 0)
            b = abcd;

          } else {

          }

          if (c.find((item) => item.key === 0)) {

            let abcd = c.filter((item) => item.key !== 0)
            c = abcd;

          } else {

          }




          return ({
            ...item,
            key: index + 1,
            value: (
              <div className="flex flex-row justify-evenly mt-2" style={{ padding: "0 0 12px 0" }} id={len}>

                <div className="">
                  <Autocomplete
                    isRequired
                    key={a[len - 1] ? a[len - 1].value : " "}
                    labelPlacement="outside"
                    placeholder="Select...."

                    variant="bordered"
                    size="md"
                    className=""
                    style={{ width: "100%" }}
                    defaultSelectedKey={a[len - 1] ? a[len - 1].value : " "}
                    value={a[len - 1] ? a[len - 1].value : " "}
                    allowsCustomValue={true}
                    onInputChange={(value) => {


                      let findres = selectedBedtype.find((item) =>
                        item.key === len
                      );

                      if (findres) {
                        selectedBedtype.map((item) => {
                          if (item.key === len) {
                            item.value = value
                          }
                        });
                        setSelectedBedtype(selectedBedtype)
                      } else {
                        selectedBedtype.push({ key: len, value: value });
                        setSelectedBedtype(selectedBedtype)
                      }

                    }}
                  >
                    {Array.isArray(bedType) &&
                      [...new Set(bedType.map((item) => item.property_bedtype))].map((item) => (
                        <AutocompleteItem key={item} value={item}>
                          {item}
                        </AutocompleteItem>
                      ))}
                  </Autocomplete>

                </div>
                <div className="" style={{ margin: "10px 0px 0 30px", width: "20px" }}><p>x</p></div>
                <div className="" style={{ padding: "0" }}>
                  <Autocomplete
                    isRequired
                    key={b[len - 1] ? b[len - 1].value : " "}
                    labelPlacement="outside"
                    placeholder="Select...."

                    variant="bordered"
                    size="md"
                    className="max-w-xs"
                    defaultSelectedKey={b[len - 1] ? b[len - 1].value : " "}
                    value={b[len - 1] ? b[len - 1].value : " "}
                    allowsCustomValue={true}
                    onInputChange={(value) => {

                      let findres = selectedNum.find((item) =>
                        item.key === len
                      );

                      if (findres) {
                        selectedNum.map((item) => {
                          if (item.key === len) {
                            item.value = value
                          }
                        });
                        setSelectedNum(selectedNum)
                      } else {
                        selectedNum.push({ key: len, value: value });
                        setSelectedNum(selectedNum)
                      }

                      console.log("findres: ", findres)


                      // selectedNum.push({key:len,value:value}); 
                      // setSelectedNum(selectedNum)
                    }}
                  >
                    {Array.isArray(num) && num.map((item) => (
                      <AutocompleteItem value={item} key={item}>{item}</AutocompleteItem>
                    ))}
                  </Autocomplete>
                </div>
                <div className="" style={{ padding: "0 0 0 12px" }}>
                  <Autocomplete
                    isRequired
                    key={c[len - 1] ? c[len - 1].value : " "}
                    labelPlacement="outside"
                    placeholder="Select...."
                    label=""
                    variant="bordered"
                    className=""
                    style={{}}
                    defaultSelectedKey={c[len - 1] ? c[len - 1].value : " "}
                    value={c[len - 1] ? c[len - 1].value : " "}
                    allowsCustomValue={true}
                    onInputChange={(value) => {

                      let findres = selectedBedSize.find((item) =>
                        item.key === len
                      );

                      if (findres) {
                        selectedBedSize.map((item) => {
                          if (item.key === len) {
                            item.value = value
                          }
                        });
                        setSelectedBedSize(selectedBedSize)
                      } else {
                        selectedBedSize.push({ key: len, value: value });
                        setSelectedBedSize(selectedBedSize)
                      }

                      console.log("findres: ", findres)

                      // selectedBedSize.push({key:len,value:value}); 
                      // setSelectedBedSize(selectedBedSize)
                    }}
                  >
                    {Array.isArray(bedSize) && bedSize.map((item) => (
                      <AutocompleteItem value={item} key={item}>{item}</AutocompleteItem>
                    ))}
                  </Autocomplete>
                </div>
                <div className="" style={{ margin: "5px 0px 0px 0px" }}>
                  <Button style={{
                    height: "30px",
                    width: "107px",
                    background: "transparent"
                  }} onClick={(e) => handleRemoveBed(e, len)}><Trash2 /> Remove</Button></div>
              </div>
            )
          })

        })
      console.log("data9 updatedAddBed", updatedAddBed, ind)
      return updatedAddBed
    })

  };




  const handleAddBed = () => {

    console.log("DataKKKKKKKKKKKK:>", addBed[addBed.length - 1], selectedBedtype, selectedBedSize, selectedNum)

    if (addBed) {

      let xyz;
      let len;

      if (addBed.length > 0) {

        xyz = addBed[addBed.length - 1];
        len = xyz.key + 1;
      } else {
        len = addBed.length + 1;
      }

      console.log("DataKKKKKKKKKKKK78:>", xyz)



      // let len = addBed.length + 1;

      setAddBed([...addBed, {
        key: len, value: (
          <div className="flex flex-row justify-evenly mt-2" style={{ padding: "0 0 12px 0" }} id={len}>

            <div className="">
              <Autocomplete
                isRequired
                key=""
                labelPlacement="outside"
                placeholder="Select...."

                variant="bordered"
                size="md"
                className=""
                defaultSelectedKey={actionType === "edit" ? selectedBedtype[len] : ''}
                value={selectedBedtype[len]}
                allowsCustomValue={true}
                onInputChange={(value) => {


                  let findres = selectedBedtype.find((item) =>
                    item.key === len
                  );

                  if (findres) {
                    selectedBedtype.map((item) => {
                      if (item.key === len) {
                        item.value = value
                      }
                    });
                    setSelectedBedtype(selectedBedtype)
                  } else {
                    selectedBedtype.push({ key: len, value: value });
                    setSelectedBedtype(selectedBedtype)
                  }
                }}
              >
                {Array.isArray(bedType) &&
                  [...new Set(bedType.map((item) => item.property_bedtype))].map((item) => (
                    <AutocompleteItem key={item} value={item}>
                      {item}
                    </AutocompleteItem>
                  ))}
              </Autocomplete>

            </div>
            <div className="" style={{ margin: "10px 0px 0 30px", width: "20px" }}><p>x</p></div>
            <div className="" style={{ padding: "0" }}>
              <Autocomplete
                isRequired
                key=""
                labelPlacement="outside"
                placeholder="Select...."

                variant="bordered"
                size="md"
                className="max-w-xs"
                defaultSelectedKey={actionType === "edit" ? selectedNum[len] : ''}
                value={selectedNum[len]}
                allowsCustomValue={true}
                onInputChange={(value) => {

                  let findres = selectedNum.find((item) =>
                    item.key === len
                  );

                  if (findres) {
                    selectedNum.map((item) => {
                      if (item.key === len) {
                        item.value = value
                      }
                    });
                    setSelectedNum(selectedNum)
                  } else {
                    selectedNum.push({ key: len, value: value });
                    setSelectedNum(selectedNum)
                  }

                  console.log("findres: ", findres)


                  // selectedNum.push({key:len,value:value}); 
                  // setSelectedNum(selectedNum)
                }}
              >
                {Array.isArray(num) && num.map((item) => (
                  <AutocompleteItem value={item} key={item}>{item}</AutocompleteItem>
                ))}
              </Autocomplete>
            </div>
            <div className="" style={{ padding: "0 0 0 12px" }}>
              <Autocomplete
                isRequired
                key=""
                labelPlacement="outside"
                placeholder="Select...."
                label=""
                variant="bordered"
                className=""
                style={{}}
                defaultSelectedKey={actionType === "edit" ? selectedBedSize[len] : ''}
                value={selectedBedSize[len]}
                allowsCustomValue={true}
                onInputChange={(value) => {

                  let findres = selectedBedSize.find((item) =>
                    item.key === len
                  );

                  if (findres) {
                    selectedBedSize.map((item) => {
                      if (item.key === len) {
                        item.value = value
                      }
                    });
                    setSelectedBedSize(selectedBedSize)
                  } else {
                    selectedBedSize.push({ key: len, value: value });
                    setSelectedBedSize(selectedBedSize)
                  }

                  console.log("findres: ", findres)

                  // selectedBedSize.push({key:len,value:value}); 
                  // setSelectedBedSize(selectedBedSize)
                }}
              >
                {Array.isArray(bedSize) && bedSize.map((item) => (
                  <AutocompleteItem value={item} key={item}>{item}</AutocompleteItem>
                ))}
              </Autocomplete>
            </div>
            <div className="" style={{ margin: "5px 0px 0px 0px" }}>
              <Button style={{
                height: "30px",
                width: "107px",
                background: "transparent"
              }} onClick={(e) => handleRemoveBed(e, len)}><Trash2 /> Remove</Button></div>
          </div>
        )
      }])





    }

  }



  useEffect(() => {
    console.log("Result0000000000: ", selectedBedtype,
      selectedNum, selectedBedSize)
  }, [selectedBedtype, selectedNum, selectedBedSize])

  return (
    isLoading
      ? <div className="flex items-center justify-center h-full z-50">
        <Spinner />
      </div>
      :
      <>
        <Toaster
          position="top-right"
          reverseOrder={false} />
        <div className='bg-background-800 h-fit rounded-xl m-4 p-4 shadow-xl'>
          <div className='w-full h-fit flex gap-4 justify-between'>
            <h1 className='text-3xl text-foreground-500 font-semibold'>Room Details</h1>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl" className='h-[90%] overflow-y-scroll'>
              <ModalContent >
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">Rooms Details</ModalHeader>
                    <ModalBody>
                      <div className="p-4 grid grid-cols-3 gap-4">
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
                              isVirtualized
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
                              {Array.isArray(roomtype) &&
                                [...new Set(roomtype.map((item) => item.property_roomname))]
                                  .filter((uniqueItem) => uniqueItem.toLowerCase().includes(selectedRoomtype.toLowerCase()))
                                  .slice(0, 100)
                                  .map((uniqueItem) => (
                                    <AutocompleteItem key={uniqueItem} value={uniqueItem}>
                                      {uniqueItem}
                                    </AutocompleteItem>
                                  ))}

                            </Autocomplete>
                            <Input
                              isRequired
                              key=""
                              type="text"
                              label="Room Rate 3 Hours"
                              labelPlacement="outside"
                              placeholder="Enter Room Rate"
                              variant="bordered"
                              size="md"
                              className="max-w-xs"
                              value={roomRate3Hrs}
                              onChange={(e) => setRoomRate3Hrs(e.target.value)}
                            />
                            <Input
                              isRequired
                              key=""
                              type="text"
                              label="Room Rate"
                              labelPlacement="outside"
                              placeholder="Enter Room Rate 6 Hours"
                              variant="bordered"
                              size="md"
                              className="max-w-xs"
                              value={roomRate6Hrs}
                              onChange={(e) => setRoomRate6Hrs(e.target.value)}
                            />
                            <Input
                              isRequired
                              key=""
                              type="text"
                              label="Room Rate"
                              labelPlacement="outside"
                              placeholder="Enter Room Rate 12 Hours"
                              variant="bordered"
                              size="md"
                              className="max-w-xs"
                              value={roomRate12Hrs}
                              onChange={(e) => setRoomRate12Hrs(e.target.value)}
                            />
                            <Input
                              isRequired
                              key=""
                              type="text"
                              label="Room Rate"
                              labelPlacement="outside"
                              placeholder="Enter Room Rate 24 Hours"
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
                              className="max-w-xs"
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
                              className="max-w-xs"
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
                                className="max-w-xs"
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
                                <AutocompleteItem value="sq ft" key="sq ft">sq ft</AutocompleteItem>
                                <AutocompleteItem value="sq m" key="sq m">sq m</AutocompleteItem>
                              </Autocomplete>
                            </div>
                          </>}
                      </div>



                      <div className="p-4 grid grid-cols-2 gap-2">



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
                          <AutocompleteItem value="Active" key="Active">Active</AutocompleteItem>
                          <AutocompleteItem value="Inactive" key="Inactive">Inactive</AutocompleteItem>
                        </Autocomplete>

                      </div>

                      {actionType === "editmany" ? '' :
                        <>
                          <div className='mt-2 ml-4 w-full'>
                            <h1 className='text-lg text-foreground-500'>Bed Options</h1>
                            <p style={{ fontSize: "14px" }}>All fields required</p>
                            <div className="mt-2 w-full" style={{ backgroundColor: "whitesmoke", padding: "0 0 20px 0" }}>
                              <div style={{ padding: "0 20px 0px 20px" }}>
                                <p style={{
                                  fontSize: "15px",
                                  color: "blueviolet",
                                  fontWeight: "600", padding: "10px 0 0 0"
                                }}>Standard Arrangement</p>

                                <div className="flex flex-row justify-evenly" style={{ padding: "0 0 12px 0" }}>

                                  <div className="">
                                    <Autocomplete
                                      isRequired
                                      key={actionType === "edit" && selectedBedtype[0] ? selectedBedtype[0].value : ''}
                                      labelPlacement="outside"
                                      placeholder="Select...."
                                      variant="bordered"
                                      size="md"
                                      defaultSelectedKey={actionType === "edit" && selectedBedtype[0] ? selectedBedtype[0].value : ''}
                                      value={selectedBedtype && selectedBedtype[0] ? selectedBedtype[0].value : ''}
                                      allowsCustomValue={true}
                                      onInputChange={(value) => {

                                        let findres = selectedBedtype.find((item) =>
                                          item.key === 0
                                        );

                                        if (findres) {
                                          selectedBedtype.map((item) => {
                                            if (item.key === 0) {
                                              item.value = value
                                            }
                                          });
                                          setSelectedBedtype(selectedBedtype)
                                        } else {
                                          selectedBedtype.push({ key: 0, value: value });
                                          setSelectedBedtype(selectedBedtype)
                                        }

                                        console.log("findres: ", findres)


                                      }}
                                    >
                                      {Array.isArray(bedType) &&
                                        [...new Set(bedType.map((item) => item.property_bedtype))].map((uniqueItem) => (
                                          <AutocompleteItem key={uniqueItem} value={uniqueItem}>
                                            {uniqueItem}
                                          </AutocompleteItem>
                                        ))}

                                    </Autocomplete>
                                  </div>
                                  <div className="" style={{ margin: "10px 0px 0 30px", width: "20px" }}><p>x</p></div>
                                  <div className="" style={{ padding: "0" }}>
                                    <Autocomplete
                                      isRequired
                                      key={actionType === "edit" && selectedNum[0] ? selectedNum[0].value : ''}
                                      labelPlacement="outside"
                                      placeholder="Select...."

                                      variant="bordered"
                                      size="md"
                                      className="max-w-xs"
                                      defaultSelectedKey={actionType === "edit" && selectedNum[0] ? selectedNum[0].value : ''}
                                      value={actionType === "edit" && selectedNum[0] ? selectedNum[0].value : ''}
                                      allowsCustomValue={true}
                                      onInputChange={(value) => {

                                        let findres = selectedNum.find((item) =>
                                          item.key === 0
                                        );

                                        if (findres) {
                                          selectedNum.map((item) => {
                                            if (item.key === 0) {
                                              item.value = value
                                            }
                                          });
                                          setSelectedNum(selectedNum)
                                        } else {
                                          selectedNum.push({ key: 0, value: value });
                                          setSelectedNum(selectedNum)
                                        }

                                        console.log("findres: ", findres)

                                        // selectedNum.push({key: 0, value:value}); 
                                        // setSelectedNum(selectedNum)
                                      }}
                                    >
                                      {Array.isArray(num) && num.map((item) => (
                                        <AutocompleteItem value={item} key={item}>{item}</AutocompleteItem>
                                      ))}
                                    </Autocomplete>
                                  </div>
                                  <div className="" style={{ padding: "0 0 0 12px" }}>
                                    <Autocomplete
                                      isRequired
                                      key={actionType === "edit" && selectedBedSize[0] ? selectedBedSize[0].value : ''}
                                      labelPlacement="outside"
                                      placeholder="Select...."
                                      label=""
                                      variant="bordered"
                                      className=""
                                      style={{}}
                                      defaultSelectedKey={actionType === "edit" && selectedBedSize[0] ? selectedBedSize[0].value : ''}
                                      value={actionType === "edit" && selectedBedSize[0] ? selectedBedSize[0].value : ''}
                                      allowsCustomValue={true}
                                      onInputChange={(value) => {

                                        let findres = selectedBedSize.find((item) =>
                                          item.key === 0
                                        );

                                        if (findres) {
                                          selectedBedSize.map((item) => {
                                            if (item.key === 0) {
                                              item.value = value
                                            }
                                          });
                                          setSelectedBedSize(selectedBedSize)
                                        } else {
                                          selectedBedSize.push({ key: 0, value: value });
                                          setSelectedBedSize(selectedBedSize)
                                        }

                                        console.log("findres: ", findres)

                                        // selectedBedSize.push({key: 0, value:value}); 
                                        // setSelectedBedSize(selectedBedSize)
                                      }}
                                    >
                                      {Array.isArray(bedSize) && bedSize.map((item) => (
                                        <AutocompleteItem value={item} key={item}>{item}</AutocompleteItem>
                                      ))}
                                    </Autocomplete>
                                  </div>
                                  <div className="" style={{ margin: "5px 0px 0px 0px" }}>

                                  </div>
                                </div>

                                {addBed && addBed.map((item, index) => {
                                  console.log("item", item, index, selectedBedtype, selectedNum, selectedBedSize)
                                  return (
                                    item.value
                                  )
                                }
                                )}

                                <div>
                                  <Button style={{ width: "fit-content" }} onClick={(e) => handleAddBed(e)}><svg style={{ height: "17px" }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" class="lucide lucide-circle-plus"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /><path d="M12 8v8" /></svg> Add another bed</Button>
                                </div>

                              </div>

                            </div>
                          </div></>
                      }



                      <div className='mt-2 ml-4'>
                        {actionType === "editmany" ? '' :
                          <>
                            <h1 className='text-lg text-foreground-500'>Room Occupancy</h1>
                            <div className="p-4 grid grid-cols-3 gap-6">
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
                            </div>



                          </>}
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