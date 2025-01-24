import React, { useState, useEffect } from 'react'
import {
    Autocomplete, AutocompleteItem, Button, CheckboxGroup, Checkbox, Modal,
    ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Tabs, Tab,
    Card, CardBody, RadioGroup, Radio, Input
} from "@nextui-org/react";

import { CiCalendar } from "react-icons/ci";

import { DateRange } from 'react-date-range';

import { cn } from "@/_lib/utils";

import { Save, Zap, CalendarRange } from 'lucide-react';

import { format, addDays, isBefore } from "date-fns";

import { useSelector, useDispatch } from "react-redux";

import {
    handleUpdateBulkProperty,
    handleFormattedDateUpdateProperty,
    handleSelectedBulkRadio,
    handleSelectedRoomUpdatePropertyKey,
    handleSelectedChecksUpdateProp,
    handleSelectedBulkUpdateTab,
    handleInventoryTable,

    handleFormattedDateUpdateRate,
    handleSelectedRoomUpdateRateKey,
    handleEnteredBulkUpdateRate
} from "@/app/redux/slices/rateandinventorySlice";

const BulkUpdateModal = ({ hotel_id, result, selectedRoomKey }) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const dispatch = useDispatch();

    const [selected, setSelected] = useState("updateStatus");

    const inventoryTable = useSelector((state) => state.rateandinventory.inventoryTable);

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

    const [selectedRoomUpdateProperty, setSelectedRoomUpdateProperty] = useState();
    const [selectedRoomUpdateRooms, setSelectedRoomUpdateRooms] = useState();
    const [selectedRoomUpdateRate, setSelectedRoomUpdateRate] = useState();

    const [selectedRoomUpdatePropertyKey, setSelectedRoomUpdatePropertyKey] = useState(selectedRoomKey);
    const [selectedRoomUpdateRoomsKey, setSelectedRoomUpdateRoomsKey] = useState(selectedRoomKey);
    const [selectedRoomUpdateRateKey, setSelectedRoomUpdateRateKey] = useState(selectedRoomKey);

    const [formattedDateUpdateProperty, setFormattedDateUpdateProperty] = useState();
    const [formattedDateUpdateRoom, setFormattedDateUpdateRoom] = useState();
    const [formattedDateUpdateRate, setFormattedDateUpdateRate] = useState();

    const [popoverOpen, setPopoverOpen] = useState(false);
    const [popoverOpenUpdateRoom, setPopoverOpenUpdateRoom] = useState(false);
    const [popoverOpenUpdateRate, setPopoverOpenUpdateRate] = useState(false);

    const [selectedChecksUpdateProp, setSelectedChecksUpdateProp] = useState();
    const [selectedRadio, setSelectedRadio] = React.useState();


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

    const [value24HourRate, setValue24HourRate] = React.useState("");
    const validateAmount24Hour = (value24HourRate) => /^[0-9]+$/.test(value24HourRate);

    const isInvalid24Hour = React.useMemo(() => {
        if (value24HourRate === '') return false;

        return validateAmount24Hour(value24HourRate) ? false : true;
    }, [value24HourRate]);

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

    const handleRoom = () => {
        if (selectedRoomKey !== undefined && selected === "updateStatus") {
            setSelectedRoomUpdateProperty(result?.find((item) => item._id === selectedRoomKey)?.room_name)
            setSelectedRoomUpdatePropertyKey(selectedRoomKey)
        }

        if (selectedRoomKey !== undefined && selected === "updateRooms") {
            setSelectedRoomUpdateProperty(result?.find((item) => item._id === selectedRoomKey)?.room_name)
            setSelectedRoomUpdatePropertyKey(selectedRoomKey)
        }

        if (selectedRoomKey !== undefined && selected === "updateRate") {
            setSelectedRoomUpdateRate(result?.find((item) => item._id === selectedRoomKey)?.room_name)
            setSelectedRoomUpdateRateKey(selectedRoomKey)
        }



    }

    useEffect(() => {
        handleRoom()
    }, [selectedRoomKey])


    const handleSave = () => {
        if (selected === "updateStatus") {

            dispatch(handleUpdateBulkProperty(true));
            dispatch(handleFormattedDateUpdateProperty(formattedDateUpdateProperty))
            dispatch(handleSelectedBulkRadio(selectedRadio))
            dispatch(handleSelectedRoomUpdatePropertyKey(selectedRoomUpdatePropertyKey))
            dispatch(handleSelectedChecksUpdateProp(selectedChecksUpdateProp))
            dispatch(handleSelectedBulkUpdateTab(selected))

            if (selectedRadio === undefined) {

            } else {

                if (selectedRoomUpdatePropertyKey === "all") {

                    const arrRoomKey = result?.map((item) => { return item._id })

                    const resultQuick = inventoryTable?.map((item) => {

                        const bookingDay = item.booking_date.split(' ')[0].toLowerCase();

                        if (formattedDateUpdateProperty.dateTwo.includes(item.booking_dateF) && arrRoomKey.includes(item.room_id) && selectedChecksUpdateProp.includes(bookingDay)) {
                            return {
                                ...item,
                                status: selectedRadio,
                                bulk_action: selectedRadio === "bookable" ? "updated to bookable" : "updated to soldout"
                            }
                        } else {
                            return { ...item }
                        }
                    })

                    dispatch(handleInventoryTable(resultQuick))

                } else {

                    const resultQuick = inventoryTable?.map((item) => {

                        const bookingDay = item.booking_date.split(' ')[0].toLowerCase();

                        if (formattedDateUpdateProperty.dateTwo.includes(item.booking_dateF) && item.room_id === selectedRoomUpdatePropertyKey && selectedChecksUpdateProp.includes(bookingDay)) {
                            return {
                                ...item,
                                status: selectedRadio,
                                bulk_action: selectedRadio === "bookable" ? "updated to bookable" : "updated to soldout"
                            }
                        } else {
                            return { ...item }
                        }
                    })

                    console.log("resultQuick:::::::::::>", resultQuick)

                    dispatch(handleInventoryTable(resultQuick))

                    setSelectedRadio()

                    handleRoom()

                }
            }


        }



        if (selected === "updateRate") {

            const roomkey = selectedRoomUpdateRateKey === undefined ? selectedRoomKey : selectedRoomUpdateRateKey

            dispatch(handleUpdateBulkProperty(true));
            dispatch(handleSelectedBulkUpdateTab(selected))

            dispatch(handleFormattedDateUpdateRate(formattedDateUpdateRate))
            dispatch(handleSelectedRoomUpdateRateKey(roomkey))
            dispatch(handleEnteredBulkUpdateRate({
                value3HourRate: value3HourRate,
                value6HourRate: value6HourRate,
                value12HourRate: value12HourRate,
                value24HourRate: value24HourRate,
                valueBaseRate: valueBaseRate,
                valueChildRate: valueChildRate,
                valueExtraPersonRate: valueExtraPersonRate,
            }))

            if (roomkey === "all") {

                const arrRoomKey = result?.map((item) => { return item._id })

                const resultQuick = inventoryTable?.filter((item) => item !== undefined)?.map((item) => {

                    if (formattedDateUpdateRate.dateTwo.includes(item.booking_dateF) && arrRoomKey.includes(item.room_id)) {
                        return {
                            ...item,
                            rate_3hr: value3HourRate === "" ? item.rate_3hr : parseInt(value3HourRate),
                            rate_6hr: value6HourRate === "" ? item.rate_6hr : parseInt(value6HourRate),
                            rate_12hr: value12HourRate === "" ? item.rate_12hr : parseInt(value12HourRate),
                            rate_24hr: value24HourRate === "" ? item.rate_24hr : parseInt(value24HourRate),
                            bulk_action: "updated rate"
                        }
                    } else {
                        return { ...item }
                    }
                })
    
                dispatch(handleInventoryTable(resultQuick))

            }else {

                const resultQuick = inventoryTable?.filter((item) => item !== undefined)?.map((item) => {

                    if (formattedDateUpdateRate.dateTwo.includes(item.booking_dateF) && item.room_id === roomkey) {
                        return {
                            ...item,
                            rate_3hr: value3HourRate === "" ? item.rate_3hr : parseInt(value3HourRate),
                            rate_6hr: value6HourRate === "" ? item.rate_6hr : parseInt(value6HourRate),
                            rate_12hr: value12HourRate === "" ? item.rate_12hr : parseInt(value12HourRate),
                            rate_24hr: value24HourRate === "" ? item.rate_24hr : parseInt(value24HourRate),
                            bulk_action: "updated rate"
                        }
                    } else {
                        return { ...item }
                    }
                })
    
                dispatch(handleInventoryTable(resultQuick))

            }


        }

        if(selected === "updateRoom") {



        }
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

    useEffect(() => {
        if (dateUpdateProperty) {
            const dates = [];
            let currentDate = dateUpdateProperty[0].startDate;
            const endDate = dateUpdateProperty[0].endDate;

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

            setFormattedDateUpdateProperty(data)
        }
    }, [dateUpdateProperty]);

    useEffect(() => {
        if (dateUpdateRoom) {
            const dates = [];
            let currentDate = dateUpdateRoom[0].startDate;
            const endDate = dateUpdateRoom[0].endDate;

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

            setFormattedDateUpdateRoom(data)
        }
    }, [dateUpdateRoom]);

    useEffect(() => {
        if (dateUpdateRate) {
            const dates = [];
            let currentDate = dateUpdateRate[0].startDate;
            const endDate = dateUpdateRate[0].endDate;

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

            setFormattedDateUpdateRate(data)
        }
    }, [dateUpdateRate]);

    return (
        <div>
            <Button color='default' variant='ghost' className='text-foreground-500' size='sm' onPress={onOpen} startContent={<CalendarRange />}>Bulk Update</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='5xl'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Bulk Update</ModalHeader>
                            <ModalBody>
                                <Tabs aria-label="Options" selectedKey={selected} onSelectionChange={setSelected}>
                                    <Tab key="updateStatus" title="Bulk Update Property">
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
                                                    {/* <Autocomplete
                                                        key={selectedRoomUpdatePropertyKey}
                                                        size="sm"
                                                        variant="bordered"
                                                        defaultSelectedKey={selectedRoomUpdatePropertyKey}
                                                        className="w-44"
                                                        aria-label="Select a Room"
                                                        value={selectedRoomUpdateProperty}
                                                        allowsCustomValue={true}
                                                        onInputChange={(value) => setSelectedRoomUpdateProperty(value)}
                                                        onSelectionChange={(key) => {
                                                            const selectedRoomName = result.find((Room) => Room._id === key)?.room_name || "";
                                                            setSelectedRoomUpdatePropertyKey(key);
                                                            setSelectedRoomUpdateProperty(selectedRoomName);
                                                        }}
                                                    >
                                                        {result?.map((Room) => (
                                                            <AutocompleteItem key={Room._id} value={Room.room_name}>
                                                                {Room.room_name}
                                                            </AutocompleteItem>
                                                        ))}
                                                    </Autocomplete> */}



                                                    <Autocomplete
                                                        key={selectedRoomUpdatePropertyKey}
                                                        size="sm"
                                                        variant="bordered"
                                                        defaultSelectedKey={selectedRoomUpdatePropertyKey !== undefined ? selectedRoomUpdatePropertyKey : selectedRoomKey}
                                                        className="w-64 mt-4"
                                                        aria-label="Select a Room"
                                                        value={selectedRoomUpdateProperty}
                                                        allowsCustomValue={true}
                                                        onInputChange={(value) => setSelectedRoomUpdateProperty(value)}
                                                        onSelectionChange={(key) => {
                                                            if (key !== "all") {
                                                                const selectedRoomName = result?.find((Room) => Room._id === key)?.room_name || "";
                                                                setSelectedRoomUpdatePropertyKey(key);
                                                                setSelectedRoomUpdateProperty(selectedRoomName);
                                                            } else {
                                                                setSelectedRoomUpdatePropertyKey(key);
                                                                setSelectedRoomUpdateProperty("All");
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
                                    <Tab key="updateRooms" title="Bulk Update Rooms">
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
                                                        key={selectedRoomUpdateRoomsKey}
                                                        size="sm"
                                                        variant="bordered"
                                                        defaultSelectedKey={selectedRoomUpdateRoomsKey !== undefined ? selectedRoomUpdateRoomsKey : selectedRoomKey}
                                                        className="w-64 mt-4"
                                                        aria-label="Select a Room"
                                                        value={selectedRoomUpdateRooms}
                                                        allowsCustomValue={true}
                                                        onInputChange={(value) => setSelectedRoomUpdateRooms(value)}
                                                        onSelectionChange={(key) => {
                                                            if (key !== "all") {
                                                                const selectedRoomName = result?.find((Room) => Room._id === key)?.room_name || "";
                                                                setSelectedRoomUpdateRoomsKey(key);
                                                                setSelectedRoomUpdateRooms(selectedRoomName);
                                                            } else {
                                                                setSelectedRoomUpdateRoomsKey(key);
                                                                setSelectedRoomUpdateRooms("All");
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
                                    <Tab key="updateRate" title="Bulk Update Rate Plans">
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
                                                        key={selectedRoomUpdateRateKey}
                                                        size="sm"
                                                        variant="bordered"
                                                        defaultSelectedKey={selectedRoomUpdateRateKey !== undefined ? selectedRoomUpdateRateKey : selectedRoomKey}
                                                        className="w-64 mt-4"
                                                        aria-label="Select a Room"
                                                        value={selectedRoomUpdateRate}
                                                        allowsCustomValue={true}
                                                        onInputChange={(value) => setSelectedRoomUpdateRate(value)}
                                                        onSelectionChange={(key) => {
                                                            if (key !== "all") {
                                                                const selectedRoomName = result?.find((Room) => Room._id === key)?.room_name || "";
                                                                setSelectedRoomUpdateRateKey(key);
                                                                setSelectedRoomUpdateRate(selectedRoomName);
                                                            } else {
                                                                setSelectedRoomUpdateRateKey(key);
                                                                setSelectedRoomUpdateRate("All");
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
                                                </div>

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
                                                <div className='flex items-center'>
                                                    <h4 className='text-sm w-56'>Rate for 24 Hours</h4>
                                                    <Input type="text" placeholder='0.00' variant='bordered' startContent={`₹`}
                                                        classNames={{
                                                            inputWrapper: [
                                                                "h-4 w-36"
                                                            ],
                                                        }}
                                                        isInvalid={isInvalid24Hour}
                                                        color={isInvalid24Hour ? "danger" : "success"}
                                                        errorMessage={isInvalid24Hour && "Please enter a valid number"}
                                                        onValueChange={setValue24HourRate}
                                                    />
                                                </div>
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
        </div>
    )
}

export default BulkUpdateModal