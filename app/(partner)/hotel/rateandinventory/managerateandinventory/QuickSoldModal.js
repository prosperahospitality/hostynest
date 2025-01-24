'use client'
import React, { useState, useEffect } from "react";
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, RadioGroup, Radio, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Save, Zap } from 'lucide-react'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { cn } from "@/_lib/utils";
import { addDays, format } from "date-fns"
import { CiCalendar } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { handleQuickSold, handleQuickSoldFormattedDate, handleQuickSoldSelectedRadio, handleQuickSoldRoomKey, handleInventoryTable } from "@/app/redux/slices/rateandinventorySlice";
import { useSelector } from "react-redux";

const QuickSoldModal = ({ hotel_id, result, selectedRoomKey, className }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const dispatch = useDispatch();

    const [popoverOpen, setPopoverOpen] = useState(false);
    const [formattedDate, setFormattedDate] = useState();
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 6),
            key: 'selection'
        }
    ]);
    const [selectedRadio, setSelectedRadio] = React.useState();
    const [selectedRoomm, setSelectedRoomm] = useState();
    const [selectedRoomKeyy, setSelectedRoomKeyy] = useState();

    const inventoryTable = useSelector((state) => state.rateandinventory.inventoryTable);

    const handleSelect = (item) => {
        setDate([item.selection]);
    }

    const handleSave = async () => {

        dispatch(handleQuickSold(true));
        dispatch(handleQuickSoldFormattedDate(formattedDate));
        dispatch(handleQuickSoldRoomKey(selectedRoomKeyy));
        dispatch(handleQuickSoldSelectedRadio(selectedRadio));

        if(selectedRadio === undefined) {

        } else {

            if(selectedRoomKeyy === "all") {

                const arrRoomKey = result?.map((item) => {return item._id})

                const resultQuick = inventoryTable?.map((item) => {
                    if (formattedDate.dateTwo.includes(item.booking_dateF) && arrRoomKey.includes(item.room_id)) {
                        return {
                            ...item,
                            status: selectedRadio,
                            quick_action: selectedRadio === "bookable" ? "updated to bookable" : "updated to soldout"
                        }
                    } else {
                        return { ...item }
                    }
                })
        
                dispatch(handleInventoryTable(resultQuick))
        
                setSelectedRadio()
                handleRoom()

            }else {

                const resultQuick = inventoryTable?.map((item) => {
                    if (formattedDate.dateTwo.includes(item.booking_dateF) && item.room_id === selectedRoomKeyy) {
                        return {
                            ...item,
                            status: selectedRadio,
                            quick_action: selectedRadio === "bookable" ? "updated to bookable" : "updated to soldout"
                        }
                    } else {
                        return { ...item }
                    }
                })
        
                dispatch(handleInventoryTable(resultQuick))
        
                setSelectedRadio()
                handleRoom()

            }

        }



        

        // if (date && date[0].startDate && date[0].endDate) {
        //     const dates = [];
        //     let currentDate = date[0].startDate;
        //     const endDate = date[0].endDate;

        //     while (currentDate <= endDate) {
        //         dates.push(currentDate);
        //         currentDate = addDays(currentDate, 1);
        //     }

        //     // Format each date in the array
        //     const formattedDates = dates.map((date) => format(date, "EEE dd MMM"));

        //     console.log("Selected Date:", formattedDates, selectedRadio);


        //     let payload = {
        //         Hotel_Id: hotel_id,
        //         formattedDates: formattedDates,
        //         status: selectedRadio,
        //         selectedRoom: selectedRoom,
        //         operation: "bulkEdit",
        //     }
        //     const response = await fetch(`/api/pms/rates_and_inventory/managerateandinventory`, {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify(payload),
        //     });
        //     const result = await response.json();
        //     // dispatch(handleQuickSold(result.dataAll));
        //     dispatch(handleQuickSoldFormattedDate(formattedDates));
        //     dispatch(handleQuickSoldFormattedDateCopy(formattedDates));
        //     dispatch(handleQuickSoldSelectedRadio(selectedRadio));

        //     const response2 = await fetch(`/api/pms/rates_and_inventory/managerateandinventory?hotelId=${hotel_id.toString()}&&selectedRoom=${selectedRoom}`, {
        //         method: "GET",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //     });
        //     const result2 = await response2.json();
        //     dispatch(handleQuickSold(result2.databyid));
        //     setQuickSoldFlag(true)
        //     onClose()
        //     //window.location.reload()
        // } else {
        //     console.error("Invalid selectedDate object");
        // }
    }

    useEffect(() => {
        if (date) {
            const dates = [];
            let currentDate = date[0].startDate;
            const endDate = date[0].endDate;

            while (currentDate <= endDate) {
                dates.push(currentDate);
                currentDate = addDays(currentDate, 1);
            }

            const formattedDates = dates.map((date) => format(date, "EEE dd MMM"));
            const formattedDatess = dates.map((date) => format(date, "dd-MM-yyyy"));

            const data = {
                dateOne: formattedDates,
                dateTwo: formattedDatess,
            }

            setFormattedDate(data)
        }
    }, [date]);

    const handleRoom = () => {
        if (selectedRoomKey !== undefined) {
            setSelectedRoomm(result?.find((item) => item._id === selectedRoomKey)?.room_name)
            setSelectedRoomKeyy(selectedRoomKey)
        }
    }

    useEffect(() => {
        handleRoom()
    }, [selectedRoomKey])

    return (
        <>
            <Button color='secondary' variant='shadow' size='sm' startContent={<Zap />} onPress={onOpen}>
                Quick Sold Out
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size='2xl' backdrop='opaque'>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Quick Sold Out</ModalHeader>
                    <ModalBody>
                        <div className='flex flex-col justify-center items-center'>
                            <div className='text-center items-center'>
                                <h4 className='text-base text-foreground-600 font-semibold'>Selected Date</h4>
                                <div className={cn("grid gap-2", className = "grid gap-2 bg-background rounded-lg border-2 border-gray-300 h-90 w-66 overflow-hidden")}>
                                    <Button
                                        id="date"
                                        variant={"destructive"}
                                        className={cn(
                                            "w-[250px] justify-center text-center font-normal",
                                            !date && "text-black bg-white"
                                        )}
                                        onClick={() => setPopoverOpen(!popoverOpen)}
                                    >
                                        <CiCalendar className="mr-2 size-4" />
                                        {date[0]?.startDate ? (
                                            date[0]?.endDate ? (
                                                <>
                                                    {format(date[0]?.startDate, "LLL dd, y")} : {format(date[0]?.endDate, "LLL dd, y")}
                                                </>
                                            ) : (
                                                format(date[0]?.startDate, "LLL dd, y")
                                            )
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                    </Button>

                                    {popoverOpen && (
                                        <div className="w-auto p-0 text-black bg-white">
                                            <DateRange
                                                className='bg-background rounded-lg border-2 border-gray-300 h-90 w-66 overflow-hidden'
                                                editableDateInputs={true}
                                                onChange={(item) => handleSelect(item)}
                                                moveRangeOnFirstSelection={false}
                                                ranges={date}
                                                months={2}
                                                direction="horizontal"
                                                minDate={new Date()}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <Autocomplete
                                key={selectedRoomKeyy}
                                size="sm"
                                variant="bordered"
                                defaultSelectedKey={selectedRoomKeyy !== undefined ? selectedRoomKeyy : selectedRoomKey}
                                className="w-64 mt-4"
                                aria-label="Select a Room"
                                value={selectedRoomm}
                                allowsCustomValue={true}
                                onInputChange={(value) => setSelectedRoomm(value)}
                                onSelectionChange={(key) => {
                                    if (key !== "all") {
                                        const selectedRoomName = result?.find((Room) => Room._id === key)?.room_name || "";
                                        setSelectedRoomKeyy(key);
                                        setSelectedRoomm(selectedRoomName);
                                    } else {
                                        setSelectedRoomKeyy(key);
                                        setSelectedRoomm("All");
                                    }
                                }}
                            >
                                <AutocompleteItem key={"all"} value={"All"}>
                                    {"All Rooms"}
                                </AutocompleteItem>
                                {result?.map((Room) => (
                                    <AutocompleteItem key={Room._id} value={Room.room_name}>
                                        {Room.room_name}
                                    </AutocompleteItem>
                                ))}
                            </Autocomplete>
                            <div className='text-center mt-8'>
                                <h2 className='text-lg text-foreground-600'>Selected Time period is From {format(date[0]?.startDate, "LLL dd, y")} to {format(date[0]?.endDate, "LLL dd, y")}</h2>
                                <h4 className='tex-sm text-foreground-400'>To make any specific date changes, Please select a date in single update section</h4>
                            </div>
                            <div className='mt-6 flex items-center justify-center'>
                                <RadioGroup
                                    orientation="horizontal"
                                    value={selectedRadio}
                                    onChange={(e) => setSelectedRadio(e.target.value)}
                                >
                                    <Radio value="soldout" size='sm' color='danger'>Mark as sold out</Radio>
                                    <Radio value="bookable" size='sm' color='success'>Mark as open Bookeble</Radio>
                                </RadioGroup>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                            Close
                        </Button>
                        <Button color="primary" onPress={onClose} startContent={<Save />} onClick={(e) => handleSave()}>
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default QuickSoldModal;
