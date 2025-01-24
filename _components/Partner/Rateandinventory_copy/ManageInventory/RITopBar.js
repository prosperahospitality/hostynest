'use client';
import React, { useState, useEffect } from "react";
import {
    Autocomplete, AutocompleteItem, Button, CheckboxGroup, Checkbox, Modal,
    ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Tabs, Tab,
    Card, CardBody, RadioGroup, Radio, Input
} from "@nextui-org/react";
import { Save, Zap, CalendarRange } from 'lucide-react';

// CSS
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

// Components
import Daterangepickerreact from '@/_components/Partner/Rateandinventory_copy/ManageInventory/DateRangePickerReact';
import QuickSoldModal from "@/_components/Partner/Rateandinventory_copy/ManageInventory/QuickSoldModal";

import { useSession } from 'next-auth/react'

import BulkUpdateModal from "@/_components/Partner/Rateandinventory_copy/ManageInventory/BulkUpdateModal";


const RITopBar = () => {

    const [isLoading, setIsLoading] = useState(false);
    const { data: sessionValue } = useSession()
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [hotel_id, setHotel_id] = useState(sessionValue !== undefined ? sessionValue?.user?.Hotel_Id : 0);
    const [result, setResult] = useState([]);
    const [hotelDetails, setHotelDetails] = useState({});
    const [roomDetails, setRoomDetails] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState();
    const [selectedRoomKey, setSelectedRoomKey] = useState();
    const [isChecked, setIsChecked] = useState(false);
    const [selectedDate, setSelectedDate] = useState();

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    useEffect(() => {
        if (sessionValue !== undefined) {
            setHotel_id(sessionValue?.user?.Hotel_Id)
        }
    }, [sessionValue])

    const fxnOne = async () => {

        try {

            const payload = {
                hotelId: hotel_id
            }

            const response = await fetch(`/api/hotels_copy/hotel_info/hotel_by_id`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            });
            const result = await response.json();

            setHotelDetails(result.data)

        } catch (error) {

        }

    }

    const fxnTwo = async () => {

        try {

            const response = await fetch(`/api/pms/property_master/room_details?hotelId=${hotel_id.toString()}&type=room`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();

            setRoomDetails(result.data)
            setSelectedRoom(result.data[0].room_name)
            setSelectedRoomKey(result.data[0]._id)

        } catch (error) {

        }

    }

    useEffect(() => {
        try {

            if (hotel_id !== 0) {
                fxnOne();
                fxnTwo();
            }

        } catch (error) {

        } finally {

        }
    }, [hotel_id])

    const handleDateSelect = (val) => {
        setSelectedDate(val)
    }
    
    return (
        <div className='bg-foreground-50 rounded-xl w-full p-2'>
            <div className='flex justify-between'>
                <div className='flex items-center justify-center space-x-2'>
                    {/* <Daterangepicker className='bg-background rounded-lg border-2 border-gray-300 h-9 w-66 overflow-hidden' initialDate={initialDate} onDateValue= {handleDateSelect}/> */}

                    <Daterangepickerreact
                        className='bg-background rounded-lg border-2 border-gray-300 h-9 w-66 overflow-hidden'
                        onDateValue={handleDateSelect}
                    />
                    <Autocomplete
                        key={selectedRoomKey}
                        size="sm"
                        variant="bordered"
                        defaultSelectedKey={selectedRoomKey}
                        className="w-44"
                        labelPlacement="outside-left"
                        value={selectedRoom}
                        allowsCustomValue={true}
                        onInputChange={(value) => setSelectedRoom(value)}
                        onSelectionChange={(key) => {
                            const selectedRoomName = roomDetails.find((Room) => Room._id === key)?.room_name || "";
                            setSelectedRoomKey(key);
                            setSelectedRoom(selectedRoomName);
                        }}
                    >
                        {roomDetails?.map((Room) => (
                            <AutocompleteItem key={Room._id} value={Room.room_name}>
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
                    <BulkUpdateModal />
                    <Button color='success' variant='shadow' className='text-white' size='sm' startContent={<Save />}>Save</Button>
                </div>
            </div>
        </div>
    )
}

export default RITopBar