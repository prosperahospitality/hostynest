'use client';
import React, { useState, useEffect } from "react";
import { Autocomplete, AutocompleteItem, Button, Checkbox } from "@nextui-org/react";
import { Save } from 'lucide-react';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import Daterangepickerreact from './DateRangePickerReact';
import QuickSoldModal from "./QuickSoldModal";

import { useSession } from 'next-auth/react'

import { useDispatch, useSelector } from "react-redux";

import BulkUpdateModal from "./BulkUpdateModal";

import { handleSelectedRoom, handleSelectedRoomKey, handleSelectedRoomDetails, handleQuickSold, handleUpdateBulkProperty } from "@/app/redux/slices/rateandinventorySlice";

const RITopBar = () => {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const { data: sessionValue } = useSession()
    const [hotel_id, setHotel_id] = useState(sessionValue !== undefined ? sessionValue?.user?.Hotel_Id : 0);
    const [hotelDetails, setHotelDetails] = useState({});
    const [result, setResult] = useState([]);
    const [roomDetails, setRoomDetails] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState();
    const [selectedRoomKey, setSelectedRoomKey] = useState();
    const [isChecked, setIsChecked] = useState(false);

    let inventoryTable = useSelector((state) => state.rateandinventory.inventoryTable);

    ////////////////Top Bar Quick Sold Out///////////////
    let quickSold = useSelector((state) => state.rateandinventory.quickSold);
    let quickSoldFormattedDate = useSelector((state) => state.rateandinventory.quickSoldFormattedDate);
    let quickSoldRoomKey = useSelector((state) => state.rateandinventory.quickSoldRoomKey);
    let quickSoldSelectedRadio = useSelector((state) => state.rateandinventory.quickSoldSelectedRadio);

    //////////////////////////////////////Top Bar Bulk Update//////////////////////////////////////////

    let updateBulkProperty = useSelector((state) => state.rateandinventory.updateBulkProperty);
    let formattedDateUpdateProperty = useSelector((state) => state.rateandinventory.formattedDateUpdateProperty);
    let selectedBulkRadio = useSelector((state) => state.rateandinventory.selectedBulkRadio);
    let selectedRoomUpdatePropertyKey = useSelector((state) => state.rateandinventory.selectedRoomUpdatePropertyKey);
    let selectedChecksUpdateProp = useSelector((state) => state.rateandinventory.selectedChecksUpdateProp);
    let selectedBulkUpdateTab = useSelector((state) => state.rateandinventory.selectedBulkUpdateTab);

    let formattedDateUpdateRate = useSelector((state) => state.rateandinventory.formattedDateUpdateRate);
    let selectedRoomUpdateRateKey = useSelector((state) => state.rateandinventory.selectedRoomUpdateRateKey);
    let enteredBulkUpdateRate = useSelector((state) => state.rateandinventory.enteredBulkUpdateRate);

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

    useEffect(() => {

        if (selectedRoom && selectedRoomKey) {

            dispatch(handleSelectedRoom(selectedRoom));
            dispatch(handleSelectedRoomKey(selectedRoomKey));
            dispatch(handleSelectedRoomDetails(roomDetails.find((item) => item._id === selectedRoomKey)));
        }

    }, [selectedRoom, selectedRoomKey])

    // const fxnTwoooooo = async () => {

    //     try {

    //         const response = await fetch(`/api/pms/rates_and_inventory/managerateandinventory?hotelId=${hotel_id.toString()}&&type=allrooms`, {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //         });
    //         const result = await response.json();

    //         const dbData = result.dataAll;

    //         const generateUniqueId = () => {
    //             return `MRI${Date.now()}${Math.floor(Math.random() * 1000)}`;
    //         };

    //         const payload = roomDetails.flatMap((selectedRoomDetails) =>
    //             quickSoldFormattedDate.dateTwo.map((date, index) => ({
    //                 id: generateUniqueId(),
    //                 Hotel_Id: hotel_id,
    //                 Hotel_name: hotelDetails?.Hotel_name,
    //                 user_id: "01",
    //                 user_name: "test",
    //                 booking_date: quickSoldFormattedDate.dateOne[index],
    //                 booking_dateF: date,
    //                 room_type: selectedRoomDetails?.room_type,
    //                 room_id: selectedRoomDetails?._id,
    //                 room_name: selectedRoomDetails?.room_name,
    //                 price_per_guest_flag: false,
    //                 room_occupancy: 5,
    //                 rate_3hr: 150,
    //                 rate_6hr: 250,
    //                 rate_12hr: 350,
    //                 rate_24hr: parseInt(selectedRoomDetails?.room_rate),
    //                 total_rooms_count: 0,
    //                 booked_rooms_count: 0,
    //                 first_checkin_last_checkout_3hr: "12 AM - 11 PM",
    //                 first_checkin_last_checkout_6hr: "12 AM - 11 PM",
    //                 first_checkin_last_checkout_12hr: "12 AM - 11 PM",
    //                 first_checkin_last_checkout_24hr: "12 AM - 11 PM",
    //                 first_checkin_last_checkout_status_3hr: "Active",
    //                 first_checkin_last_checkout_status_6hr: "Active",
    //                 first_checkin_last_checkout_status_12hr: "Active",
    //                 first_checkin_last_checkout_status_24hr: "Active",
    //                 status: quickSoldSelectedRadio,
    //                 action: "",
    //                 quick_action: "",
    //                 bulk_action: "",
    //             }))
    //         );

    //         if (dbData.length > 0) {

    //             const updatedTable = payload.map((item) => {

    //                 const match = dbData.find(
    //                     (item1) =>
    //                         item1.Hotel_Id === item.Hotel_Id &&
    //                         item1.booking_dateF === item.booking_dateF &&
    //                         item1.room_id === item.room_id
    //                 );

    //                 if(match) {
    //                     return {
    //                         ...match,
    //                         quick_action: quickSoldSelectedRadio === "bookable" ? "updated to bookable" : "updated to soldout",
    //                         status: quickSoldSelectedRadio, 
    //                     }
    //                 } else {
    //                     return item
    //                 }

    //             });

    //             console.log("updatedTable::::::::>", updatedTable)

    //             const response = await fetch(`/api/pms/rates_and_inventory/managerateandinventory`, {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify(updatedTable),
    //             });
    //             const queryResult = await response.json();

    //             dispatch(handleQuickSold(false));


    //         } else {

    //             const response = await fetch(`/api/pms/rates_and_inventory/managerateandinventory`, {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify(payload),
    //             });
    //             const queryResult = await response.json();

    //             dispatch(handleQuickSold(false));

    //         }

    //     } catch (error) {
    //         console.error("Error in fxnTwo:", error);
    //     }
    // };






    const fxnTwoooooo = async () => {

        try {

            const response = await fetch(`/api/pms/rates_and_inventory/managerateandinventory?hotelId=${hotel_id.toString()}&&type=allrooms`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();

            const dbData = result.dataAll;

            const generateUniqueId = () => {
                return `MRI${Date.now()}${Math.floor(Math.random() * 1000)}`;
            };

            const payload = roomDetails?.flatMap((selectedRoomDetails) => {


                if (quickSoldRoomKey === "all") {
                    return quickSoldFormattedDate.dateTwo.map((date, index) => ({
                        id: generateUniqueId(),
                        Hotel_Id: hotel_id,
                        Hotel_name: hotelDetails?.Hotel_name,
                        user_id: "01",
                        user_name: "test",
                        booking_date: quickSoldFormattedDate.dateOne[index],
                        booking_dateF: date,
                        room_type: selectedRoomDetails?.room_type,
                        room_id: selectedRoomDetails?._id,
                        room_name: selectedRoomDetails?.room_name,
                        price_per_guest_flag: false,
                        room_occupancy: 5,
                        rate_3hr: parseInt(selectedRoomDetails?.room_rate3hrs),
                        rate_6hr: parseInt(selectedRoomDetails?.room_rate6hrs),
                        rate_12hr: parseInt(selectedRoomDetails?.room_rate12hrs),
                        rate_24hr: parseInt(selectedRoomDetails?.room_rate),
                        total_rooms_count: 0,
                        booked_rooms_count: 0,
                        first_checkin_last_checkout_3hr: "12 AM - 11 PM",
                        first_checkin_last_checkout_6hr: "12 AM - 11 PM",
                        first_checkin_last_checkout_12hr: "12 AM - 11 PM",
                        first_checkin_last_checkout_24hr: "12 AM - 11 PM",
                        first_checkin_last_checkout_status_3hr: "Active",
                        first_checkin_last_checkout_status_6hr: "Active",
                        first_checkin_last_checkout_status_12hr: "Active",
                        first_checkin_last_checkout_status_24hr: "Active",
                        status: quickSoldSelectedRadio,
                        action: "",
                        quick_action: quickSoldSelectedRadio === "bookable" ? "updated to bookable" : "updated to soldout",
                        bulk_action: "",
                    }))
                } else {

                    if (selectedRoomDetails?._id === quickSoldRoomKey) {
                        return quickSoldFormattedDate.dateTwo.map((date, index) => ({
                            id: generateUniqueId(),
                            Hotel_Id: hotel_id,
                            Hotel_name: hotelDetails?.Hotel_name,
                            user_id: "01",
                            user_name: "test",
                            booking_date: quickSoldFormattedDate.dateOne[index],
                            booking_dateF: date,
                            room_type: selectedRoomDetails?.room_type,
                            room_id: selectedRoomDetails?._id,
                            room_name: selectedRoomDetails?.room_name,
                            price_per_guest_flag: false,
                            room_occupancy: 5,
                            rate_3hr: parseInt(selectedRoomDetails?.room_rate3hrs),
                            rate_6hr: parseInt(selectedRoomDetails?.room_rate6hrs),
                            rate_12hr: parseInt(selectedRoomDetails?.room_rate12hrs),
                            rate_24hr: parseInt(selectedRoomDetails?.room_rate),
                            total_rooms_count: 0,
                            booked_rooms_count: 0,
                            first_checkin_last_checkout_3hr: "12 AM - 11 PM",
                            first_checkin_last_checkout_6hr: "12 AM - 11 PM",
                            first_checkin_last_checkout_12hr: "12 AM - 11 PM",
                            first_checkin_last_checkout_24hr: "12 AM - 11 PM",
                            first_checkin_last_checkout_status_3hr: "Active",
                            first_checkin_last_checkout_status_6hr: "Active",
                            first_checkin_last_checkout_status_12hr: "Active",
                            first_checkin_last_checkout_status_24hr: "Active",
                            status: quickSoldSelectedRadio,
                            action: "",
                            quick_action: quickSoldSelectedRadio === "bookable" ? "updated to bookable" : "updated to soldout",
                            bulk_action: "",
                        }))
                    }

                }
            }
            );

            console.log("Payload:::::::::::>", payload, quickSoldFormattedDate)
            if (dbData.length > 0) {

                const updatedTable = payload?.filter((item) => item !== undefined)?.map((item) => {

                    const match = dbData.find(
                        (item1) =>
                            item1.Hotel_Id === item.Hotel_Id &&
                            item1.booking_dateF === item.booking_dateF &&
                            item1.room_id === item.room_id
                    );

                    if (match) {
                        return {
                            ...match,
                            quick_action: quickSoldSelectedRadio === "bookable" ? "updated to bookable" : "updated to soldout",
                            status: quickSoldSelectedRadio,
                        }
                    } else {
                        return item
                    }

                });

                console.log("updatedTable::::::::>", updatedTable)

                const response = await fetch(`/api/pms/rates_and_inventory/managerateandinventory`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedTable),
                });
                const queryResult = await response.json();

                dispatch(handleQuickSold(false));


            } else {

                const response = await fetch(`/api/pms/rates_and_inventory/managerateandinventory`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                });
                const queryResult = await response.json();

                dispatch(handleQuickSold(false));

            }

        } catch (error) {
            console.error("Error in fxnTwo:", error);
        }
    };


    const handleBulkUpdateFxn = async () => {

        if (selectedBulkUpdateTab === "updateStatus") {

            try {

                const response = await fetch(`/api/pms/rates_and_inventory/managerateandinventory?hotelId=${hotel_id.toString()}&&type=allrooms`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const result = await response.json();

                const dbData = result.dataAll;

                const generateUniqueId = () => {
                    return `MRI${Date.now()}${Math.floor(Math.random() * 1000)}`;
                };

                const payloadd = roomDetails?.flatMap((selectedRoomDetails) => {

                    if (selectedRoomUpdatePropertyKey === "all") {
                        return formattedDateUpdateProperty.dateTwo.map((date, index) => ({
                            id: generateUniqueId(),
                            Hotel_Id: hotel_id,
                            Hotel_name: hotelDetails?.Hotel_name,
                            user_id: "01",
                            user_name: "test",
                            booking_date: formattedDateUpdateProperty.dateOne[index],
                            booking_dateF: date,
                            room_type: selectedRoomDetails?.room_type,
                            room_id: selectedRoomDetails?._id,
                            room_name: selectedRoomDetails?.room_name,
                            price_per_guest_flag: false,
                            room_occupancy: 5,
                            rate_3hr: parseInt(selectedRoomDetails?.room_rate3hrs),
                            rate_6hr: parseInt(selectedRoomDetails?.room_rate6hrs),
                            rate_12hr: parseInt(selectedRoomDetails?.room_rate12hrs),
                            rate_24hr: parseInt(selectedRoomDetails?.room_rate),
                            total_rooms_count: 0,
                            booked_rooms_count: 0,
                            first_checkin_last_checkout_3hr: "12 AM - 11 PM",
                            first_checkin_last_checkout_6hr: "12 AM - 11 PM",
                            first_checkin_last_checkout_12hr: "12 AM - 11 PM",
                            first_checkin_last_checkout_24hr: "12 AM - 11 PM",
                            first_checkin_last_checkout_status_3hr: "Active",
                            first_checkin_last_checkout_status_6hr: "Active",
                            first_checkin_last_checkout_status_12hr: "Active",
                            first_checkin_last_checkout_status_24hr: "Active",
                            status: "bookable",
                            action: "",
                            bulk_action: "",
                            quick_action: "",
                        }))
                    }

                    if (selectedRoomDetails?._id === selectedRoomUpdatePropertyKey) {
                        return formattedDateUpdateProperty.dateTwo.map((date, index) => ({
                            id: generateUniqueId(),
                            Hotel_Id: hotel_id,
                            Hotel_name: hotelDetails?.Hotel_name,
                            user_id: "01",
                            user_name: "test",
                            booking_date: formattedDateUpdateProperty.dateOne[index],
                            booking_dateF: date,
                            room_type: selectedRoomDetails?.room_type,
                            room_id: selectedRoomDetails?._id,
                            room_name: selectedRoomDetails?.room_name,
                            price_per_guest_flag: false,
                            room_occupancy: 5,
                            rate_3hr: parseInt(selectedRoomDetails?.room_rate3hrs),
                            rate_6hr: parseInt(selectedRoomDetails?.room_rate6hrs),
                            rate_12hr: parseInt(selectedRoomDetails?.room_rate12hrs),
                            rate_24hr: parseInt(selectedRoomDetails?.room_rate),
                            total_rooms_count: 0,
                            booked_rooms_count: 0,
                            first_checkin_last_checkout_3hr: "12 AM - 11 PM",
                            first_checkin_last_checkout_6hr: "12 AM - 11 PM",
                            first_checkin_last_checkout_12hr: "12 AM - 11 PM",
                            first_checkin_last_checkout_24hr: "12 AM - 11 PM",
                            first_checkin_last_checkout_status_3hr: "Active",
                            first_checkin_last_checkout_status_6hr: "Active",
                            first_checkin_last_checkout_status_12hr: "Active",
                            first_checkin_last_checkout_status_24hr: "Active",
                            status: "bookable",
                            action: "",
                            bulk_action: "",
                            quick_action: "",
                        }))
                    }
                }
                );

                console.log("Payload:::::::::::>", payloadd)

                const payload = payloadd?.filter((item) => item !== undefined)?.map((item) => {

                    const bookingDay = item.booking_date.split(' ')[0].toLowerCase();


                    //     return {
                    //         ...item,
                    //         status: selectedBulkRadio,
                    //         bulk_action: selectedBulkRadio === "bookable" ? "updated to bookable" : "updated to soldout"
                    //     }

                    if (selectedChecksUpdateProp.includes(bookingDay)) {
                        return {
                            ...item,
                            status: selectedBulkRadio,
                            bulk_action: selectedBulkRadio === "bookable" ? "updated to bookable" : "updated to soldout"
                        }
                    } else {
                        return { ...item }
                    }
                })

                if (dbData.length > 0) {

                    const updatedTable = payload?.filter((item) => item !== undefined)?.map((item) => {

                        const bookingDay = item.booking_date.split(' ')[0].toLowerCase();

                        const match = dbData.find(
                            (item1) =>
                                item1.Hotel_Id === item.Hotel_Id &&
                                item1.booking_dateF === item.booking_dateF &&
                                item1.room_id === item.room_id
                        );

                        if (match && selectedChecksUpdateProp.includes(bookingDay)) {
                            return {
                                ...match,
                                bulk_action: selectedBulkRadio === "bookable" ? "updated to bookable" : "updated to soldout",
                                status: selectedBulkRadio,
                            }
                        } else {
                            return item
                        }

                    });

                    const response = await fetch(`/api/pms/rates_and_inventory/managerateandinventory`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(updatedTable),
                    });
                    const queryResult = await response.json();

                    dispatch(handleUpdateBulkProperty(false));


                } else {

                    const response = await fetch(`/api/pms/rates_and_inventory/managerateandinventory`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(payload),
                    });
                    const queryResult = await response.json();

                    dispatch(handleUpdateBulkProperty(false));

                }

            } catch (error) {

            }

        }


        if (selectedBulkUpdateTab === "updateRate") {

            try {

                console.log("dataaaaa:::::>", formattedDateUpdateRate,
                    selectedRoomUpdateRateKey,
                    enteredBulkUpdateRate)

                const response = await fetch(`/api/pms/rates_and_inventory/managerateandinventory?hotelId=${hotel_id.toString()}&&type=allrooms`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const result = await response.json();

                const dbData = result.dataAll;

                const generateUniqueId = () => {
                    return `MRI${Date.now()}${Math.floor(Math.random() * 1000)}`;
                };

                const payloadd = roomDetails?.flatMap((selectedRoomDetails) => {

                    if (selectedRoomUpdateRateKey === "all") {
                        return formattedDateUpdateRate.dateTwo.map((date, index) => ({
                            id: generateUniqueId(),
                            Hotel_Id: hotel_id,
                            Hotel_name: hotelDetails?.Hotel_name,
                            user_id: "01",
                            user_name: "test",
                            booking_date: formattedDateUpdateRate.dateOne[index],
                            booking_dateF: date,
                            room_type: selectedRoomDetails?.room_type,
                            room_id: selectedRoomDetails?._id,
                            room_name: selectedRoomDetails?.room_name,
                            price_per_guest_flag: false,
                            room_occupancy: 5,
                            rate_3hr: enteredBulkUpdateRate?.value3HourRate === "" ? parseInt(selectedRoomDetails?.room_rate3hrs) : parseInt(enteredBulkUpdateRate?.value3HourRate),
                            rate_6hr: enteredBulkUpdateRate?.value6HourRate === "" ? parseInt(selectedRoomDetails?.room_rate6hrs) : parseInt(enteredBulkUpdateRate?.value6HourRate),
                            rate_12hr: enteredBulkUpdateRate?.value12HourRate === "" ? parseInt(selectedRoomDetails?.room_rate12hrs) : parseInt(enteredBulkUpdateRate?.value12HourRate),
                            rate_24hr: enteredBulkUpdateRate?.value24HourRate === "" ? parseInt(selectedRoomDetails?.room_rate) : parseInt(enteredBulkUpdateRate?.value24HourRate),
                            total_rooms_count: 0,
                            booked_rooms_count: 0,
                            first_checkin_last_checkout_3hr: "12 AM - 11 PM",
                            first_checkin_last_checkout_6hr: "12 AM - 11 PM",
                            first_checkin_last_checkout_12hr: "12 AM - 11 PM",
                            first_checkin_last_checkout_24hr: "12 AM - 11 PM",
                            first_checkin_last_checkout_status_3hr: "Active",
                            first_checkin_last_checkout_status_6hr: "Active",
                            first_checkin_last_checkout_status_12hr: "Active",
                            first_checkin_last_checkout_status_24hr: "Active",
                            status: "bookable",
                            action: "",
                            bulk_action: "updated rate",
                            quick_action: "",
                        }))
                    }

                    if (selectedRoomDetails?._id === selectedRoomUpdateRateKey) {
                        return formattedDateUpdateRate.dateTwo.map((date, index) => ({
                            id: generateUniqueId(),
                            Hotel_Id: hotel_id,
                            Hotel_name: hotelDetails?.Hotel_name,
                            user_id: "01",
                            user_name: "test",
                            booking_date: formattedDateUpdateRate.dateOne[index],
                            booking_dateF: date,
                            room_type: selectedRoomDetails?.room_type,
                            room_id: selectedRoomDetails?._id,
                            room_name: selectedRoomDetails?.room_name,
                            price_per_guest_flag: false,
                            room_occupancy: 5,
                            rate_3hr: enteredBulkUpdateRate?.value3HourRate === "" ? parseInt(selectedRoomDetails?.room_rate3hrs) : parseInt(enteredBulkUpdateRate?.value3HourRate),
                            rate_6hr: enteredBulkUpdateRate?.value6HourRate === "" ? parseInt(selectedRoomDetails?.room_rate6hrs) : parseInt(enteredBulkUpdateRate?.value6HourRate),
                            rate_12hr: enteredBulkUpdateRate?.value12HourRate === "" ? parseInt(selectedRoomDetails?.room_rate12hrs) : parseInt(enteredBulkUpdateRate?.value12HourRate),
                            rate_24hr: enteredBulkUpdateRate?.value24HourRate === "" ? parseInt(selectedRoomDetails?.room_rate) : parseInt(enteredBulkUpdateRate?.value24HourRate),
                            total_rooms_count: 0,
                            booked_rooms_count: 0,
                            first_checkin_last_checkout_3hr: "12 AM - 11 PM",
                            first_checkin_last_checkout_6hr: "12 AM - 11 PM",
                            first_checkin_last_checkout_12hr: "12 AM - 11 PM",
                            first_checkin_last_checkout_24hr: "12 AM - 11 PM",
                            first_checkin_last_checkout_status_3hr: "Active",
                            first_checkin_last_checkout_status_6hr: "Active",
                            first_checkin_last_checkout_status_12hr: "Active",
                            first_checkin_last_checkout_status_24hr: "Active",
                            status: "bookable",
                            action: "",
                            bulk_action: "updated rate",
                            quick_action: "",
                        }))
                    }
                }
                );

                console.log("Payload:::::::::::>", payloadd)

                if (dbData.length > 0) {

                    const updatedTable = payloadd?.filter((item) => item !== undefined)?.map((item) => {

                        const match = dbData.find(
                            (item1) =>
                                item1.Hotel_Id === item.Hotel_Id &&
                                item1.booking_dateF === item.booking_dateF &&
                                item1.room_id === item.room_id
                        );

                        if (match) {
                            return {
                                ...match,
                                rate_3hr: enteredBulkUpdateRate?.value3HourRate === "" || match.action === "updated" ? parseInt(match?.rate_3hr) : parseInt(enteredBulkUpdateRate?.value3HourRate),
                                rate_6hr: enteredBulkUpdateRate?.value6HourRate === "" || match.action === "updated" ? parseInt(match?.rate_6hr) : parseInt(enteredBulkUpdateRate?.value6HourRate),
                                rate_12hr: enteredBulkUpdateRate?.value12HourRate === "" || match.action === "updated" ? parseInt(match?.rate_12hr) : parseInt(enteredBulkUpdateRate?.value12HourRate),
                                rate_24hr: enteredBulkUpdateRate?.value24HourRate === "" || match.action === "updated" ? parseInt(match?.rate_24hr) : parseInt(enteredBulkUpdateRate?.value24HourRate),
                                bulk_action: "updated rate",
                            }
                        } else {
                            return item
                        }

                    });


                    const response = await fetch(`/api/pms/rates_and_inventory/managerateandinventory`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(updatedTable),
                    });
                    const queryResult = await response.json();

                    dispatch(handleUpdateBulkProperty(false));


                } else {

                    const response = await fetch(`/api/pms/rates_and_inventory/managerateandinventory`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(payloadd),
                    });
                    const queryResult = await response.json();

                    dispatch(handleUpdateBulkProperty(false));

                }

            } catch (error) {

            }

        }

    }

    const handleSave = () => {

        const saveFxn = async () => {

            try {

                const payload = {
                    hotelId: hotel_id,
                    action: "deleteConditionally"
                }

                const response = await fetch(`/api/pms/rates_and_inventory/managerateandinventory`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                });
                const queryResult = await response.json();

                try {
                    let payload = inventoryTable.filter((item) => item.action === "updated");

                    if (quickSoldSelectedRadio === "bookable" && selectedRoomKey === quickSoldRoomKey) {

                        payload = inventoryTable.filter((item) => item.quick_action === "updated to bookable" || item.action === "updated");

                    } else if (quickSoldSelectedRadio === "soldout" && selectedRoomKey === quickSoldRoomKey) {

                        payload = inventoryTable.filter((item) => item.quick_action === "updated to soldout" || item.action === "updated");

                    }

                    const response = await fetch(`/api/pms/rates_and_inventory/managerateandinventory`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(payload),
                    });
                    const queryResult = await response.json();

                    // console.log("queryResult::::::>", queryResult)

                    // dispatch(handleQuickSold(false));

                    if (quickSoldRoomKey) {

                        fxnTwoooooo()

                    }

                    if (updateBulkProperty) {

                        handleBulkUpdateFxn()

                    }

                } catch (error) {

                }

            } catch (error) {

            }

        }

        saveFxn()
    }


    return (
        <div className='bg-foreground-50 rounded-xl w-full p-2'>
            <div className='flex justify-between'>
                <div className='flex items-center justify-center space-x-2'>
                    {/* <Daterangepicker className='bg-background rounded-lg border-2 border-gray-300 h-9 w-66 overflow-hidden' initialDate={initialDate} onDateValue= {handleDateSelect}/> */}

                    <Daterangepickerreact
                        className='bg-background rounded-lg border-2 border-gray-300 h-9 w-66 overflow-hidden'
                    />

                    <Autocomplete
                        key={selectedRoomKey}
                        size="sm"
                        variant="bordered"
                        defaultSelectedKey={selectedRoomKey}
                        className="w-44"
                        aria-label="Select a Room"
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
                        result={roomDetails}
                        selectedRoomKey={selectedRoomKey}
                    />
                    <BulkUpdateModal hotel_id={hotel_id} result={roomDetails} selectedRoomKey={selectedRoomKey} />
                    <Button color='success' variant='shadow' className='text-white' size='sm' startContent={<Save />} onClick={handleSave}>Save</Button>
                </div>
            </div>
        </div>
    )
}

export default RITopBar