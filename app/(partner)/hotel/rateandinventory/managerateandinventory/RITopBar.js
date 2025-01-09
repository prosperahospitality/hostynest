'use client'
import React, { useState, useEffect, useCallback, useRef } from "react";
import Daterangepicker from '@/_components/ui/DateRangePicker'
import { Autocomplete, AutocompleteItem, Button, CheckboxGroup, Checkbox, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Tabs, Tab, Card, CardBody, RadioGroup, Radio, Input } from "@nextui-org/react";
import { Save, Zap, CalendarRange } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { format, addDays, isBefore } from "date-fns";
import {useDispatch} from "react-redux";
import { handleFormattedDateRange } from "@/app/redux/slices/rateandinventorySlice";
import { handleSelectedRoom } from "@/app/redux/slices/rateandinventorySlice";
import { handleUpdateBulkProperty } from "@/app/redux/slices/rateandinventorySlice";
import { handleFormattedDateUpdateProp } from "@/app/redux/slices/rateandinventorySlice";
import { handleFormattedDateUpdatePropCopy } from "@/app/redux/slices/rateandinventorySlice";
import { handleSelectedRoomUpdateProperty } from "@/app/redux/slices/rateandinventorySlice";
import { handleSelectedRadioUpdateProp } from "@/app/redux/slices/rateandinventorySlice";
import { handleUpdatePropArray } from "@/app/redux/slices/rateandinventorySlice";
import { handleUpdateRoomArray } from "@/app/redux/slices/rateandinventorySlice";
import { handleFormattedDateUpdateRoom } from "@/app/redux/slices/rateandinventorySlice";
import { handleSelectedRoomUpdateRoom } from "@/app/redux/slices/rateandinventorySlice";
import { handleValueUpdateRoom } from "@/app/redux/slices/rateandinventorySlice";

import { handleFormattedDateUpdateRate } from "@/app/redux/slices/rateandinventorySlice";
import { handleSelectedRoomUpdateRate } from "@/app/redux/slices/rateandinventorySlice";
import { handleValue3HourRate } from "@/app/redux/slices/rateandinventorySlice";
import { handleValue6HourRate } from "@/app/redux/slices/rateandinventorySlice";
import { handleValue12HourRate } from "@/app/redux/slices/rateandinventorySlice";
import { handleValueBaseRate } from "@/app/redux/slices/rateandinventorySlice";
import { handleValueChildRate } from "@/app/redux/slices/rateandinventorySlice";
import { handleValueExtraPersonRate } from "@/app/redux/slices/rateandinventorySlice";
import { handleUpdateRateArray } from "@/app/redux/slices/rateandinventorySlice";

import { handleCheckPricePerGuest } from "@/app/redux/slices/rateandinventorySlice";

import Daterangepickerreact from '@/_components/ui/DateRangePickerReact';
import QuickSoldModal from "@/app/(partner)/hotel/rateandinventory/managerateandinventory/QuickSoldModal"

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { cn } from "@/_lib/utils";
import { CiCalendar } from "react-icons/ci";



const Rooms = [
    { label: "Delux Room", value: "deluxroom" },
    { label: "Super Delux Room", value: "superdeluxroom" },
]

const RITopBar = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [initialDate, setInitialDate] = useState(6);
    const searchParams = useSearchParams();
    const hotel_id = searchParams.get('hotel_id');
    const [result, setResult] = useState([]);
    const [ selectedRoom, setSelectedRoom ] = useState();
    const [ selectedRoomUpdateProperty, setSelectedRoomUpdateProperty ] = useState();
    const [ selectedRoomUpdateRooms, setSelectedRoomUpdateRooms ] = useState();
    const [ selectedRoomUpdateRate, setSelectedRoomUpdateRate ] = useState();
    
    const [ selectedDate, setSelectedDate ] = useState();
    const [ formattedDateRange, setFormattedDateRange ] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [popoverOpenUpdateRoom, setPopoverOpenUpdateRoom] = useState(false);
    const [popoverOpenUpdateRate, setPopoverOpenUpdateRate] = useState(false);

    const [saveFlag, setSaveFlag] = useState(false);

    const [ selectedChecksUpdateProp, setSelectedChecksUpdateProp ] = useState();
    const [selectedRadio, setSelectedRadio] = React.useState();
    const [selectedRadioRoom, setSelectedRadioRoom] = React.useState();

    const [formattedDateUpdateProp, setFormattedDateUpdateProp] = React.useState([]);
    const [formattedDateUpdateRoom, setFormattedDateUpdateRoom] = React.useState([]);
    const [formattedDateUpdateRate, setFormattedDateUpdateRate] = React.useState([]);


    const [updatePropArray, setUpdatePropArray] = React.useState([]);
    const [updateRoomArray, setUpdateRoomArray] = React.useState([]);
    const [updateRateArray, setUpdateRateArray] = React.useState([]);

    const [isChecked, setIsChecked] = useState(false);



    // const [date, setDate] = useState([
    //     {
    //         startDate: new Date(),
    //         endDate: addDays(new Date(), 6),
    //         key: 'selection'
    //     }
    // ]);

    const [dateUpdateProperty, setDateUpdateProperty] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 6),
            key: 'selection'
        }
    ]);
    const [dateUpdateRoom, setDateUpdateRoom] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 6),
            key: 'selection'
        }
    ]);
    const [dateUpdateRate, setDateUpdateRate] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 6),
            key: 'selection'
        }
    ]);
    const dispatch = useDispatch();

    useEffect(() => {
        
            dispatch(handleCheckPricePerGuest(isChecked));

    }, [isChecked])

    const [state, setState] = useState([
        {
          startDate: new Date(),
          endDate: null,
          key: 'selection'
        }
      ]);

    // const [value, setValue] = React.useState("");
    // const validateAmount = (value) => /^[0-9]+$/.test(value);
    
    // const isInvalid = React.useMemo(() => {
    //     if (value === '') return false;

    //     return validateAmount(value) ? false : true;
    // }, [value]);

    const [valueTotalRoom, setValueTotalRoom] = React.useState("");
    const validateAmount1 = (valueTotalRoom) => /^[0-9]+$/.test(valueTotalRoom);
    
    const isInvalid1 = React.useMemo(() => {
        if (valueTotalRoom === '') return false;

        return validateAmount1(valueTotalRoom) ? false : true;
    }, [valueTotalRoom]);


    const [value3HourRate, setValue3HourRate] = React.useState("");
    const validateAmount3Hour = (value3HourRate) => /^[0-9]+$/.test(value3HourRate);
    
    const isInvalid3Hour = React.useMemo(() => {
        if (value3HourRate === '') return false;

        return validateAmount3Hour(value3HourRate) ? false : true;
    }, [value3HourRate]);

    const [value6HourRate, setValue6HourRate] = React.useState("");
    const validateAmount6Hour = (value6HourRate) => /^[0-9]+$/.test(value6HourRate);
    
    const isInvalid6Hour = React.useMemo(() => {
        if (value6HourRate === '') return false;

        return validateAmount6Hour(value6HourRate) ? false : true;
    }, [value6HourRate]);

    const [value12HourRate, setValue12HourRate] = React.useState("");
    const validateAmount12Hour = (value12HourRate) => /^[0-9]+$/.test(value12HourRate);
    
    const isInvalid12Hour = React.useMemo(() => {
        if (value12HourRate === '') return false;

        return validateAmount12Hour(value12HourRate) ? false : true;
    }, [value12HourRate]);

    const [valueBaseRate, setValueBaseRate] = React.useState("");
    const validateAmountBase = (valueBaseRate) => /^[0-9]+$/.test(valueBaseRate);
    
    const isInvalidBase = React.useMemo(() => {
        if (valueBaseRate === '') return false;

        return validateAmountBase(valueBaseRate) ? false : true;
    }, [valueBaseRate]);

    
    const [valueChildRate, setValueChildRate] = React.useState("");
    const validateAmountChild = (valueChildRate) => /^[0-9]+$/.test(valueChildRate);
    
    const isInvalidChild = React.useMemo(() => {
        if (valueChildRate === '') return false;

        return validateAmountChild(valueChildRate) ? false : true;
    }, [valueChildRate]);


    const [valueExtraPersonRate, setValueExtraPersonRate] = React.useState("");
    const validateAmountExtraPerson = (valueExtraPersonRate) => /^[0-9]+$/.test(valueExtraPersonRate);
    
    const isInvalidExtraPerson = React.useMemo(() => {
        if (valueExtraPersonRate === '') return false;

        return validateAmountExtraPerson(valueExtraPersonRate) ? false : true;
    }, [valueExtraPersonRate]);



    const initialFxn = async () => {
        try {
            const response = await fetch(`/api/pms/property_master/room_details?hotelId=${hotel_id.toString()}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
            
            setResult(result.dataActive)

            if (result.dataActive.length > 0 && !selectedRoom) {
                setSelectedRoom(result.dataActive[0].room_name);
                setSelectedRoomUpdateProperty(result.dataActive[0].room_name);
                setSelectedRoomUpdateRooms(result.dataActive[0].room_name);
                setSelectedRoomUpdateRate(result.dataActive[0].room_name);
            }

        } catch (error) {
            console.error("Error fetching data:", error);
        }   finally {
            setIsLoading(false); 
          }
    }

    useEffect(() => {

        initialFxn()
        setSelectedChecksUpdateProp(["mon","tue","wed","thu","fri","sat","sun"])
    }, [])

    useEffect(() => {



        if (selectedDate && selectedDate[0].startDate && selectedDate[0].endDate) {
            const dates = [];
            let currentDate = selectedDate[0].startDate;
            const endDate = selectedDate[0].endDate;
        
            while (currentDate <= endDate) {
                dates.push(currentDate);
                currentDate = addDays(currentDate, 1);
            }
        
            // Format each date in the array
            const formattedDates = dates.map((date) => format(date, "EEE dd MMM"));
        
            
           setFormattedDateRange(formattedDates);
        } else {
            console.error("Invalid selectedDate object");
        }
        

        // if (selectedDate) {

        //     if(selectedDate.from && selectedDate.to) {
        //         const dates = [];
        //         let currentDate = selectedDate.from;
                
        //         while (isBefore(currentDate, selectedDate.to) || currentDate.toDateString() === selectedDate.to.toDateString()) {
        //           dates.push(currentDate);
        //           currentDate = addDays(currentDate, 1);
        //         }
                
        //         // Format each date in the array
        //         const formattedDates = dates.map((date) => format(date, "EEE dd MMM"));
                
        //         console.log("Selected Date:", formattedDates);
        //         setFormattedDateRange(formattedDates);
        //     }
           
        //   } else {
        //     console.error("Invalid selectedDate object");
        //   }

    }, [selectedDate])

    useEffect(() => {

        dispatch(handleFormattedDateRange(formattedDateRange));

    }, [formattedDateRange])

    useEffect(() => {

        dispatch(handleSelectedRoom(selectedRoom));

    }, [selectedRoom])

    ///////////////////////////////////////////Update Bulk//////////////////////////////////////////////////////

    useEffect(() => {

        

        if (dateUpdateProperty && dateUpdateProperty[0].startDate && dateUpdateProperty[0].endDate) {
            const dates = [];
            let currentDate = dateUpdateProperty[0].startDate;
            const endDate = dateUpdateProperty[0].endDate;
        
            while (currentDate <= endDate) {
                dates.push(currentDate);
                currentDate = addDays(currentDate, 1);
            }

            const formattedDates = dates.map((date) => format(date, "EEE dd MMM"));
        

           // Ensure selectedChecksUpdateProp is defined and is an array before using some()
        if (Array.isArray(selectedChecksUpdateProp)) {
            const filteredDates = formattedDates.filter(date => {
                const lowercaseDate = date.toLowerCase();
                return selectedChecksUpdateProp.some(day => lowercaseDate.includes(day));
            });

         
            setFormattedDateUpdateProp(filteredDates)
        } else {
           
        }

        }

    }, [dateUpdateProperty, selectedChecksUpdateProp, selectedRoomUpdateProperty, selectedRadio])



    useEffect(() => {

        if (dateUpdateRoom && dateUpdateRoom[0].startDate && dateUpdateRoom[0].endDate) {
            const dates = [];
            let currentDate = dateUpdateRoom[0].startDate;
            const endDate = dateUpdateRoom[0].endDate;
        
            while (currentDate <= endDate) {
                dates.push(currentDate);
                currentDate = addDays(currentDate, 1);
            }

            const formattedDates = dates.map((date) => format(date, "EEE dd MMM"));
          
            setFormattedDateUpdateRoom(formattedDates);

        }

    }, [dateUpdateRoom, selectedRoomUpdateRooms, selectedRadioRoom, valueTotalRoom])


    useEffect(() => {

       

        if (dateUpdateRate && dateUpdateRate[0].startDate && dateUpdateRate[0].endDate) {
            const dates = [];
            let currentDate = dateUpdateRate[0].startDate;
            const endDate = dateUpdateRate[0].endDate;
        
            while (currentDate <= endDate) {
                dates.push(currentDate);
                currentDate = addDays(currentDate, 1);
            }

            const formattedDates = dates.map((date) => format(date, "EEE dd MMM"));
        
            setFormattedDateUpdateRate(formattedDates);

        }

    }, [dateUpdateRate, selectedRoomUpdateRate, value3HourRate,
        value6HourRate,
        value12HourRate,
        valueBaseRate,
        valueChildRate,
        valueExtraPersonRate])


    const handleSave = async () => {
       

        let payload1 = {
            Hotel_Id: hotel_id,
            formattedDates: formattedDateUpdateProp,
            status: selectedRadio,
            selectedRoom: selectedRoomUpdateProperty,
            operation: "bulkUpdateProp",
        }
        const response1 = await fetch(`/api/pms/rates_and_inventory/managerateandinventory`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload1),
        });
        const result1 = await response1.json();

        if (!updatePropArray.some(item => item.roomtype === selectedRoomUpdateProperty)) {

            let payload = {
                roomtype: selectedRoomUpdateProperty,
                updatedDates: formattedDateUpdateProp,
            };
            setUpdatePropArray(prevState => [...prevState, payload]);
        } else {

            const updatedArray = updatePropArray.map(item => {
                if (item.roomtype === selectedRoomUpdateProperty) {
                    return { ...item, updatedDates: formattedDateUpdateProp };
                }
                return item;
            });
            setUpdatePropArray(updatedArray);
        }


        if(valueTotalRoom) {
            let payload3 = {
                Hotel_Id: hotel_id,
                formattedDates: formattedDateUpdateRoom,
                status: selectedRadioRoom,
                selectedRoom: selectedRoomUpdateRooms,
                totalRooms: valueTotalRoom,
                operation: "bulkUpdateRoom",
            }
            const response3 = await fetch(`/api/pms/rates_and_inventory/managerateandinventory`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload3),
            });
            const result3 = await response3.json();

            if (!updateRoomArray.some(item => item.roomtype === selectedRoomUpdateRooms)) {
                console.log("If: ",formattedDateUpdateRoom)
                let payload = {
                    roomtype: selectedRoomUpdateRooms,
                    updatedDates: formattedDateUpdateRoom,
                    value: valueTotalRoom,
                };
                setUpdateRoomArray(prevState => [...prevState, payload]);
            } else {
                console.log("Else: ",formattedDateUpdateRoom)
                const updatedArray = updateRoomArray.map(item => {
                    if (item.roomtype === selectedRoomUpdateRooms) {
                        return { ...item, updatedDates: formattedDateUpdateRoom, value: valueTotalRoom};
                    }
                    return item;
                });
                setUpdateRoomArray(updatedArray);
            }
        }else{

        }


        if(value3HourRate ||
            value6HourRate ||
            value12HourRate ||
            valueBaseRate ||
            valueChildRate ||
            valueExtraPersonRate) {
                let payload4 = {
                    Hotel_Id: hotel_id,
                    formattedDates: formattedDateUpdateRate,
                    selectedRoom: selectedRoomUpdateRate,
                    rate_3hr: value3HourRate,
                    rate_6hr: value6HourRate,
                    rate_12hr: value12HourRate,
                    rate_24hr: valueBaseRate,
                    rate_child: valueChildRate,
                    rate_extraperson: valueExtraPersonRate,
                    operation: "bulkUpdateRate",
                }
                const response4 = await fetch(`/api/pms/rates_and_inventory/managerateandinventory`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload4),
                });
                const result4 = await response4.json();

                if (!updateRateArray.some(item => item.roomtype === selectedRoomUpdateRate)) {
                    console.log("If updateRateArray: ",formattedDateUpdateRate)
                    let payload = {
                        roomtype: selectedRoomUpdateRate,
                        updatedDates: formattedDateUpdateRate,
                        rate_3hr: value3HourRate,
                        rate_6hr: value6HourRate,
                        rate_12hr: value12HourRate,
                        rate_24hr: valueBaseRate,
                        rate_child: valueChildRate,
                        rate_extraperson: valueExtraPersonRate,
                    };
                    setUpdateRateArray(prevState => [...prevState, payload]);
                } else {
                    console.log("Else updateRateArray: ",formattedDateUpdateRate)
                    const updatedArray = updateRateArray.map(item => {
                        if (item.roomtype === selectedRoomUpdateRate) {
                            return { ...item, updatedDates: formattedDateUpdateRate, rate_3hr: value3HourRate,
                                rate_6hr: value6HourRate,
                                rate_12hr: value12HourRate,
                                rate_24hr: valueBaseRate,
                                rate_child: valueChildRate,
                                rate_extraperson: valueExtraPersonRate};
                        }
                        return item;
                    });
                    setUpdateRateArray(updatedArray);
                }
      
        }

        const response2 = await fetch(`/api/pms/rates_and_inventory/managerateandinventory?hotelId=${hotel_id.toString()}&&selectedRoom=${selectedRoom}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result2 = await response2.json();
        dispatch(handleUpdateBulkProperty(result2.databyid));
        dispatch(handleFormattedDateUpdateProp(formattedDateUpdateProp));
        dispatch(handleFormattedDateUpdatePropCopy(formattedDateUpdateProp));
        dispatch(handleSelectedRoomUpdateProperty(selectedRoomUpdateProperty));
        dispatch(handleSelectedRadioUpdateProp(selectedRadio));

        dispatch(handleFormattedDateUpdateRoom(formattedDateUpdateRoom));
        dispatch(handleSelectedRoomUpdateRoom(selectedRoomUpdateRooms));
        dispatch(handleValueUpdateRoom(valueTotalRoom));

        dispatch(handleFormattedDateUpdateRate(selectedRoomUpdateRate));
        dispatch(handleSelectedRoomUpdateRate(formattedDateUpdateRate));
        dispatch(handleValue3HourRate(value3HourRate));
        dispatch(handleValue6HourRate(value6HourRate));
        dispatch(handleValue12HourRate(value12HourRate));
        dispatch(handleValueBaseRate(valueBaseRate));
        dispatch(handleValueChildRate(valueChildRate));
        dispatch(handleValueExtraPersonRate(valueExtraPersonRate));
        
        
        
 
    }

    useEffect(() => {

        dispatch(handleUpdatePropArray(updatePropArray));

    }, [updatePropArray])

    useEffect(() => {

        dispatch(handleUpdateRoomArray(updateRoomArray));

    }, [updateRoomArray])

    useEffect(() => {

        dispatch(handleUpdateRateArray(updateRateArray));

    }, [updateRateArray])
    

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleDateSelect = (val) => {
        setSelectedDate(val)
    }

    const handleSelect = (item) => {
       
        setDateUpdateProperty([item.selection]);
    }

    const handleSelectUpdateRoom = (item) => {

        setDateUpdateRoom([item.selection]);
    }

    const handleSelectUpdateRate = (item) => {

        setDateUpdateRate([item.selection]);
    }

    const handleCheckboxChange = () => {
      setIsChecked(!isChecked); 
    };

    return (
        <div className='bg-foreground-50 rounded-xl w-full p-2'>
            <div className='flex justify-between'>
                <div className='flex items-center justify-center space-x-2'>
                    {/* <Daterangepicker className='bg-background rounded-lg border-2 border-gray-300 h-9 w-66 overflow-hidden' initialDate={initialDate} onDateValue= {handleDateSelect}/> */}

                    <Daterangepickerreact
                        className='bg-background rounded-lg border-2 border-gray-300 h-9 w-66 overflow-hidden'
                        initialDate={initialDate} 
                        onDateValue= {handleDateSelect}
                    />
                    <Autocomplete
                        size='sm'
                        variant='bordered'
                        defaultSelectedKey={selectedRoom}
                        className='w-44'
                        labelPlacement='outside-left'
                        value={selectedRoom}
                        allowsCustomValue={true}
                        onInputChange={(value) =>  setSelectedRoom(value)}
                    >
                        {result?.map((Room) => (
                            <AutocompleteItem key={Room.room_name} value={Room.room_name}>
                                {Room.room_name}
                            </AutocompleteItem>
                        ))}
                    </Autocomplete>

                <Checkbox 
                    size='sm' 
                    checked={isChecked} 
                    onChange={handleCheckboxChange}
                >
                    Price per guest
                </Checkbox>
                </div>
                <div className='space-x-2 flex items-center justify-center'>
                    <QuickSoldModal 
                        className='bg-background rounded-lg border-2 border-gray-300 h-9 w-66 overflow-hidden'
                        hotel_id={hotel_id}
                    />
                    <Button color='default' variant='ghost' className='text-foreground-500' size='sm' onPress={onOpen} startContent={<CalendarRange />}>Bulk Update</Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='5xl'>
                        <ModalContent>
                        {(onClose) => (
                            <>
                            <ModalHeader className="flex flex-col gap-1">Bulk Update</ModalHeader>
                            <ModalBody>
                            <Tabs aria-label="Options">
                                        <Tab key="buld_update_property" title="Bulk Update Property">
                                        <Card>
                                            <CardBody>
                                                        <div className='flex items-center'>
                                                            <h4 className='text-base text-foreground-600 font-semibold'>Selected Date :</h4>
                                                            <div className={cn("grid gap-2", { 
  "bg-background rounded-lg border-2 border-gray-300 h-90 w-66 overflow-hidden": true 
})}>

                                    <Button
                                        id="dateUpdateProperty"
                                        variant={"destructive"}
                                        className={cn(
                                            "w-[250px] justify-center text-center font-normal",
                                            !dateUpdateProperty && "text-black bg-white"
                                        )}
                                        onClick={() => setPopoverOpen(!popoverOpen)}
                                    >
                                        <CiCalendar className="mr-2 size-4" />
                                        {dateUpdateProperty[0]?.startDate ? (
                                            dateUpdateProperty[0]?.endDate ? (
                                                <>
                                                    {format(dateUpdateProperty[0]?.startDate, "LLL dd, y")} : {format(dateUpdateProperty[0]?.endDate, "LLL dd, y")}
                                                </>
                                            ) : (
                                                format(dateUpdateProperty[0]?.startDate, "LLL dd, y")
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
                                                                ranges={dateUpdateProperty}
                                                                months={2}
                                                                direction="horizontal"
                                                                minDate={new Date()} 
                                                            />
                                        </div>
                                    )}
                                </div>
                                                        </div>
                                                        <div className='flex gap-6 items-center mt-2'>
                                                                            <h4 className='text-base text-foreground-600 font-semibold'>Selected Days :</h4>
                                                                            <CheckboxGroup
                                                                                defaultValue={selectedChecksUpdateProp}
                                                                                orientation="horizontal"
                                                                                value={selectedChecksUpdateProp}
                                                                                onValueChange={setSelectedChecksUpdateProp}
                                                                            >
                                                                                <Checkbox value="mon">Mon</Checkbox>
                                                                                <Checkbox value="tue">Tue</Checkbox>
                                                                                <Checkbox value="wed">Wed</Checkbox>
                                                                                <Checkbox value="thu">Thu</Checkbox>
                                                                                <Checkbox value="fri">Fri</Checkbox>
                                                                                <Checkbox value="sat">Sat</Checkbox>
                                                                                <Checkbox value="sun">Sun</Checkbox>
                                                                            </CheckboxGroup>
                                                                        </div>
                                                        <div className='flex items-center mt-4'>
                                                            <h4 className='text-base text-foreground-600 font-semibold'>Selected Room :</h4>
                                                            <Autocomplete
                                                                size='sm'
                                                                variant='bordered'
                                                                defaultSelectedKey={selectedRoomUpdateProperty}
                                                                className='w-44'
                                                                labelPlacement='outside-left'
                                                                value={selectedRoomUpdateProperty}
                                                                allowsCustomValue={true}
                                                                onInputChange={(value) =>  setSelectedRoomUpdateProperty(value)}
                                                            >
                                                                {result?.map((Room) => (
                                                                    <AutocompleteItem key={Room.room_name} value={Room.room_name}>
                                                                        {Room.room_name}
                                                                    </AutocompleteItem>
                                                                ))}
                                                            </Autocomplete>
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
                                            </CardBody>
                                        </Card>  
                                        </Tab>
                                        <Tab key="bulk_update_rooms" title="Bulk Update Rooms">
                                        <Card>
                                            <CardBody>
                                            <div className='flex items-center'>
                                                            <h4 className='text-base text-foreground-600 font-semibold'>Selected Date :</h4>
                                                            <div className={cn("grid gap-2", { 
  "bg-background rounded-lg border-2 border-gray-300 h-90 w-66 overflow-hidden": true 
})}>
                                    <Button
                                        id="dateUpdateRoom"
                                        variant={"destructive"}
                                        className={cn(
                                            "w-[250px] justify-center text-center font-normal",
                                            !dateUpdateRoom && "text-black bg-white"
                                        )}
                                        onClick={() => setPopoverOpenUpdateRoom(!popoverOpenUpdateRoom)}
                                    >
                                        <CiCalendar className="mr-2 size-4" />
                                        {dateUpdateRoom[0]?.startDate ? (
                                            dateUpdateRoom[0]?.endDate ? (
                                                <>
                                                    {format(dateUpdateRoom[0]?.startDate, "LLL dd, y")} : {format(dateUpdateRoom[0]?.endDate, "LLL dd, y")}
                                                </>
                                            ) : (
                                                format(dateUpdateRoom[0]?.startDate, "LLL dd, y")
                                            )
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                    </Button>
                                    {popoverOpenUpdateRoom && (
                                        <div className="w-auto p-0 text-black bg-white">
                                           <DateRange
                                                                className='bg-background rounded-lg border-2 border-gray-300 h-90 w-66 overflow-hidden'
                                                                editableDateInputs={true}
                                                                onChange={(item) => handleSelectUpdateRoom(item)}
                                                                moveRangeOnFirstSelection={false}
                                                                ranges={dateUpdateRoom}
                                                                months={2}
                                                                direction="horizontal"
                                                                minDate={new Date()} 
                                                            />
                                        </div>
                                    )}
                                </div>
                                                        </div>
                                                        <div className='flex items-center mt-4'>
                                                            <h4 className='text-base text-foreground-600 font-semibold'>Selected Room :</h4>
                                                            <Autocomplete
                                                                size='sm'
                                                                variant='bordered'
                                                                defaultSelectedKey={selectedRoomUpdateRooms}
                                                                className='w-44'
                                                                labelPlacement='outside-left'
                                                                value={selectedRoomUpdateRooms}
                                                                allowsCustomValue={true}
                                                                onInputChange={(value) =>  setSelectedRoomUpdateRooms(value)}
                                                            >
                                                                {result?.map((Room) => (
                                                                    <AutocompleteItem key={Room.room_name} value={Room.room_name}>
                                                                        {Room.room_name}
                                                                    </AutocompleteItem>
                                                                ))}
                                                            </Autocomplete>
                                                        </div>
                                                        <div className='flex items-center mt-4'>
                                                            <h4 className='text-base text-foreground-600 font-semibold w-40'>Total Room :</h4>
                                                                                    <Input type="text" placeholder='0.00' variant='bordered'
                                                                                        classNames={{
                                                                                            inputWrapper: [
                                                                                                "h-4 w-20"
                                                                                            ],
                                                                                        }}
                                                                                        isInvalid={isInvalid1}
                                                                                        color={isInvalid1 ? "danger" : "success"}
                                                                                        errorMessage={isInvalid1 && "Please enter a valid number"}
                                                                                        onValueChange={setValueTotalRoom}
                                                                                    />
                                                                                    </div>
                                                        {/* <div className='mt-6 flex items-center justify-center'>
                                                            <RadioGroup
                                                                orientation="horizontal"
                                                                value={selectedRadioRoom}
                                                                onChange={(e) => setSelectedRadioRoom(e.target.value)}
                                                            >
                                                                <Radio value="soldout" size='sm' color='danger'>Mark as sold out</Radio>
                                                                <Radio value="bookable" size='sm' color='success'>Mark as open Bookable</Radio>
                                                            </RadioGroup>
                                                        </div> */}
                                            </CardBody>
                                        </Card>  
                                        </Tab>
                                        <Tab key="bulk_update_rate_plans" title="Bulk Update Rate Plans">
                                        <Card>
                                            <CardBody>
                                            <div className='flex items-center'>
                                                            <h4 className='text-base text-foreground-600 font-semibold'>Selected Date :</h4>
                                                            <div className={cn("grid gap-2", { 
                                            "bg-background rounded-lg border-2 border-gray-300 h-90 w-66 overflow-hidden": true 
                                            })}>
                                    <Button
                                        id="dateUpdateRate"
                                        variant={"destructive"}
                                        className={cn(
                                            "w-[250px] justify-center text-center font-normal",
                                            !dateUpdateRate && "text-black bg-white"
                                        )}
                                        onClick={() => setPopoverOpenUpdateRate(!popoverOpenUpdateRate)}
                                    >
                                        <CiCalendar className="mr-2 size-4" />
                                        {dateUpdateRate[0]?.startDate ? (
                                            dateUpdateRate[0]?.endDate ? (
                                                <>
                                                    {format(dateUpdateRate[0]?.startDate, "LLL dd, y")} : {format(dateUpdateRate[0]?.endDate, "LLL dd, y")}
                                                </>
                                            ) : (
                                                format(dateUpdateRate[0]?.startDate, "LLL dd, y")
                                            )
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                    </Button>
                                    {popoverOpenUpdateRate && (
                                        <div className="w-auto p-0 text-black bg-white">
                                            <DateRange
                                                                className='bg-background rounded-lg border-2 border-gray-300 h-90 w-66 overflow-hidden'
                                                                editableDateInputs={true}
                                                                onChange={(item) => handleSelectUpdateRate(item)}
                                                                moveRangeOnFirstSelection={false}
                                                                ranges={dateUpdateRate}
                                                                months={2}
                                                                direction="horizontal"
                                                                minDate={new Date()} 
                                                            />
                                        </div>
                                    )}
                                </div>
                                                        </div>
                                                        <div className='flex items-center mt-4'>
                                                            <h4 className='text-base text-foreground-600 font-semibold'>Selected Room :</h4>
                                                            <Autocomplete
                                                                size='sm'
                                                                variant='bordered'
                                                                defaultSelectedKey={selectedRoomUpdateRate}
                                                                className='w-44'
                                                                labelPlacement='outside-left'
                                                                value={selectedRoomUpdateRate}
                                                                allowsCustomValue={true}
                                                                onInputChange={(value) =>  setSelectedRoomUpdateRate(value)}
                                                            >
                                                                {result?.map((Room) => (
                                                                    <AutocompleteItem key={Room.room_name} value={Room.room_name}>
                                                                        {Room.room_name}
                                                                    </AutocompleteItem>
                                                                ))}
                                                            </Autocomplete>
                                                        </div>
                                                        {/* <div className='flex items-center mt-4'>
                                                            <h4 className='text-base text-foreground-600 font-semibold'>Selected Rate plan :</h4>
                                                            <h4 className='text-base text-red-600 border border-red-500 font-semibold'>Rate plan selection dropdown</h4>
                                                        </div> */}

                                                        <div className='flex gap-4 items-center mt-2'>
                                                                            <h4 className='flex items-center text-base text-foreground-600 font-semibold'>Enter Rates <h5 className='text-xs text-foreground-300 ml-4'>(GST will automatically be added to the rate you provide)</h5></h4>
                                                                        </div>
                                                                        
                                                                        <div className='grid grid-cols-12'>
                                                                        <div className='col-span-4'>
                                                                                <div className='flex items-center'>
                                                                                    <h4 className='text-sm w-56'>Rate for 3 Hours</h4>
                                                                                    <Input type="text" placeholder='0.00' variant='bordered' startContent={`₹`}
                                                                                        classNames={{
                                                                                            inputWrapper: [
                                                                                                "h-4 w-36"
                                                                                            ],
                                                                                        }}
                                                                                        isInvalid={isInvalid3Hour}
                                                                                        color={isInvalid3Hour ? "danger" : "success"}
                                                                                        errorMessage={isInvalid3Hour && "Please enter a valid number"}
                                                                                        onValueChange={setValue3HourRate}
                                                                                    />
                                                                                </div>
                                                                            </div>

                                                                            <div className='col-span-4'>
                                                                                <div className='flex items-center'>
                                                                                    <h4 className='text-sm w-56'>Rate for 6 Hours</h4>
                                                                                    <Input type="text" placeholder='0.00' variant='bordered' startContent={`₹`}
                                                                                        classNames={{
                                                                                            inputWrapper: [
                                                                                                "h-4 w-36"
                                                                                            ],
                                                                                        }}
                                                                                        isInvalid={isInvalid6Hour}
                                                                                        color={isInvalid6Hour ? "danger" : "success"}
                                                                                        errorMessage={isInvalid6Hour && "Please enter a valid number"}
                                                                                        onValueChange={setValue6HourRate}
                                                                                    />
                                                                                </div>
                                                                            </div>

                                                                            <div className='col-span-4'>
                                                                                <div className='flex items-center'>
                                                                                    <h4 className='text-sm w-56'>Rate for 12 Hours</h4>
                                                                                    <Input type="text" placeholder='0.00' variant='bordered' startContent={`₹`}
                                                                                        classNames={{
                                                                                            inputWrapper: [
                                                                                                "h-4 w-36"
                                                                                            ],
                                                                                        }}
                                                                                        isInvalid={isInvalid12Hour}
                                                                                        color={isInvalid12Hour ? "danger" : "success"}
                                                                                        errorMessage={isInvalid12Hour && "Please enter a valid number"}
                                                                                        onValueChange={setValue12HourRate}
                                                                                    />
                                                                                </div>
                                                                            </div>

                                                                            <div className='col-span-4'>
                                                                                <div className='flex items-center'>
                                                                                    <h4 className='text-sm w-32'>Base Rate</h4>
                                                                                    <Input type="text" placeholder='0.00' variant='bordered' startContent={`₹`}
                                                                                        classNames={{
                                                                                            inputWrapper: [
                                                                                                "h-4 w-36"
                                                                                            ],
                                                                                        }}
                                                                                        isInvalid={isInvalidBase}
                                                                                        color={isInvalidBase ? "danger" : "success"}
                                                                                        errorMessage={isInvalidBase && "Please enter a valid number"}
                                                                                        onValueChange={setValueBaseRate}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className='col-span-4'>
                                                                                <div className='flex items-center'>
                                                                                    <h4 className='text-sm w-32'>Child Rate</h4>
                                                                                    <Input type="text" placeholder='0.00' variant='bordered' startContent={`₹`}
                                                                                        classNames={{
                                                                                            inputWrapper: [
                                                                                                "h-4 w-36"
                                                                                            ],
                                                                                        }}
                                                                                        isInvalid={isInvalidChild}
                                                                                        color={isInvalidChild ? "danger" : "success"}
                                                                                        errorMessage={isInvalidChild && "Please enter a valid number"}
                                                                                        onValueChange={setValueChildRate}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className='col-span-4'>
                                                                                <div className='flex items-center'>
                                                                                    <h4 className='text-sm w-56'>Extra Person Rate</h4>
                                                                                    <Input type="text" placeholder='0.00' variant='bordered' startContent={`₹`}
                                                                                        classNames={{
                                                                                            inputWrapper: [
                                                                                                "h-4 w-36"
                                                                                            ],
                                                                                        }}
                                                                                        isInvalid={isInvalidExtraPerson}
                                                                                        color={isInvalidExtraPerson ? "danger" : "success"}
                                                                                        errorMessage={isInvalidExtraPerson && "Please enter a valid number"}
                                                                                        onValueChange={setValueExtraPersonRate}
                                                                                    />
                                                                                </div>
                                                                            </div>

                                                                            
                                                                            </div>
                                                        {/* <div className='mt-6 flex items-center justify-center'>
                                                            <RadioGroup
                                                                orientation="horizontal"
                                                            >
                                                                <Radio value="mark-as-sold-out" size='sm' color='danger'>Mark as sold out</Radio>
                                                                <Radio value="mark-as-open-bookeble" size='sm' color='success'>Mark as open Bookeble</Radio>
                                                            </RadioGroup>
                                                        </div> */}
                                            </CardBody>
                                        </Card>  
                                        </Tab>
                                    </Tabs>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                Close
                                </Button>
                                <Button color="primary" onPress={onClose} startContent={<Save />} onClick={(e) => handleSave()}>
                                Save
                                </Button>
                            </ModalFooter>
                            </>
                        )}
                        </ModalContent>
                    </Modal>
                    <Button color='success' variant='shadow' className='text-white' size='sm' startContent={<Save />}>Save</Button>
                </div>
            </div>
        </div>
    )
}

export default RITopBar