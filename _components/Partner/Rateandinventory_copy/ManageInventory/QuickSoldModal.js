'use client'
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Chip, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Tabs, Tab, Card, CardBody, Input, Slider, RadioGroup, Radio } from "@nextui-org/react";
import { Save, Zap } from 'lucide-react'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { cn } from "@/_lib/utils";
import { addDays, format } from "date-fns"
import { CiCalendar } from "react-icons/ci";
import {useDispatch} from "react-redux";
import { handleQuickSold } from "@/app/redux/slices/rateandinventorySlice";
import { handleQuickSoldFormattedDate } from "@/app/redux/slices/rateandinventorySlice";
import { handleQuickSoldSelectedRadio } from "@/app/redux/slices/rateandinventorySlice";
import { handleQuickSoldFormattedDateCopy } from "@/app/redux/slices/rateandinventorySlice";
import { useSelector } from "react-redux";

    

const QuickSoldModal = ({className, hotel_id}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [popoverOpen, setPopoverOpen] = useState(false);
    const [quickSoldFlag, setQuickSoldFlag] = useState(false);
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 6),
            key: 'selection'
        }
    ]);
    const dispatch = useDispatch();
    const [selectedRadio, setSelectedRadio] = React.useState();
    let selectedRoom = useSelector((state) => state.rateandinventory.selectedRoom);

    const handleSelect = (item) => {
        console.log("New Date: ", item);
        setDate([item.selection]);
    }

    const handleSave = async() => {
        if (date && date[0].startDate && date[0].endDate) {
            const dates = [];
            let currentDate = date[0].startDate;
            const endDate = date[0].endDate;
        
            while (currentDate <= endDate) {
                dates.push(currentDate);
                currentDate = addDays(currentDate, 1);
            }
        
            // Format each date in the array
            const formattedDates = dates.map((date) => format(date, "EEE dd MMM"));
        
            console.log("Selected Date:", formattedDates, selectedRadio);


            let payload = {
                Hotel_Id: hotel_id,
                formattedDates: formattedDates,
                status: selectedRadio,
                selectedRoom: selectedRoom,
                operation: "bulkEdit",
            }
            const response = await fetch(`/api/pms/rates_and_inventory/managerateandinventory`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            const result = await response.json();
            // dispatch(handleQuickSold(result.dataAll));
            dispatch(handleQuickSoldFormattedDate(formattedDates));
            dispatch(handleQuickSoldFormattedDateCopy(formattedDates));
            dispatch(handleQuickSoldSelectedRadio(selectedRadio));

            const response2 = await fetch(`/api/pms/rates_and_inventory/managerateandinventory?hotelId=${hotel_id.toString()}&&selectedRoom=${selectedRoom}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result2 = await response2.json();
            dispatch(handleQuickSold(result2.databyid));
            setQuickSoldFlag(true)
            onClose()
            //window.location.reload()
        } else {
            console.error("Invalid selectedDate object");
        }
    }

    useEffect(() => {
  
          console.log("Selected Date: ",date)

      }, [date]);
      

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
