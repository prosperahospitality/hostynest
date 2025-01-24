'use client';

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSession } from 'next-auth/react'

import {
    handleInventoryTable, handleQuickSold
} from "@/app/redux/slices/rateandinventorySlice";


import RIMainContTopBar from './RIMainContTopBar';
import EditModal from './EditModal';

import { Chip, Button } from "@nextui-org/react";

import { Pencil } from "lucide-react"

const RIMainCont = () => {

    const dispatch = useDispatch();
    const { data: sessionValue } = useSession()
    const [hotel_id, setHotel_id] = useState(sessionValue !== undefined ? sessionValue?.user?.Hotel_Id : 0);
    const [hotelDetails, setHotelDetails] = useState({});
    const [result, setResult] = useState([]);

    ////////////////Top Bar Date///////////////
    let selectedDateRange = useSelector((state) => state.rateandinventory.formattedDateRange);

    ////////////////Top Bar Room Select///////////////
    let selectedRoom = useSelector((state) => state.rateandinventory.selectedRoom);
    let selectedRoomKey = useSelector((state) => state.rateandinventory.selectedRoomKey);
    let selectedRoomDetails = useSelector((state) => state.rateandinventory.selectedRoomDetails);

    ////////////////Top Bar Check Box///////////////
    let checkPricePerGuest = useSelector((state) => state.rateandinventory.checkPricePerGuest);

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

    console.log("ASDFWQERQWE:::::>", {updateBulkProperty: updateBulkProperty,
        selectedBulkUpdateTab: selectedBulkUpdateTab,
        formattedDateUpdateRate: formattedDateUpdateRate,
        selectedRoomUpdateRateKey: selectedRoomUpdateRateKey,
        enteredBulkUpdateRate: enteredBulkUpdateRate})


    const inventoryTable = useSelector((state) => state.rateandinventory.inventoryTable);

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

            const response1 = await fetch(`/api/pms/property_master/room_details?hotelId=${hotel_id.toString()}&type=room`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result1 = await response1.json();

            const impData = result1.data;

            const arrRoomKey = impData?.map((item) => { return item._id })

            fxnTwo(result.data, arrRoomKey, impData);

        } catch (error) {

        }

    }

    const fxnTwo = async (hotelDetails, arrRoomKey, impData) => {

        try {

            const response = await fetch(`/api/pms/rates_and_inventory/managerateandinventory?hotelId=${hotel_id.toString()}&&selectedRoomid=${selectedRoomDetails?._id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();

            const dbData = result.data;

            const generateUniqueId = () => {
                return `MRI${Date.now()}${Math.floor(Math.random() * 1000)}`;
            };

            const payload = selectedDateRange.dateTwo.map((date, index) => ({
                id: generateUniqueId(),
                Hotel_Id: hotel_id,
                Hotel_name: hotelDetails?.Hotel_name,
                user_id: "01",
                user_name: "test",
                booking_date: selectedDateRange.dateOne[index],
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
                quick_action: "",
                bulk_action: "",
            }));

            const quickFunction = (updatedTable) => {

                if (quickSoldSelectedRadio === undefined) {

                } else {

                    if (quickSoldRoomKey === "all") {

                        const resultQuick = updatedTable?.map((item) => {
                            if (quickSoldFormattedDate.dateTwo.includes(item.booking_dateF) && arrRoomKey.includes(item.room_id)) {
                                return {
                                    ...item,
                                    status: quickSoldSelectedRadio,
                                    quick_action: quickSoldSelectedRadio === "bookable" ? "updated to bookable" : "updated to soldout"
                                }
                            } else {
                                return { ...item }
                            }
                        })

                        dispatch(handleInventoryTable(resultQuick))

                        setSelectedRadio()
                        handleRoom()

                    } else {

                        const resultQuick = updatedTable?.map((item) => {
                            if (quickSoldFormattedDate.dateTwo.includes(item.booking_dateF) && item.room_id === quickSoldRoomKey) {
                                return {
                                    ...item,
                                    status: quickSoldSelectedRadio,
                                    quick_action: quickSoldSelectedRadio === "bookable" ? "updated to bookable" : "updated to soldout"
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
            }

            const bulkFunction = (updatedTable) => {

                console.log("updatedTable::::::>", updatedTable)

                if (selectedBulkUpdateTab === "updateStatus") {

                    if (selectedBulkRadio === undefined) {

                    } else {

                        if (selectedRoomUpdatePropertyKey === "all") {

                            const resultQuick = updatedTable?.map((item) => {

                                const bookingDay = item.booking_date.split(' ')[0].toLowerCase();

                                if (formattedDateUpdateProperty.dateTwo.includes(item.booking_dateF) && arrRoomKey.includes(item.room_id) && selectedChecksUpdateProp.includes(bookingDay)) {
                                    return {
                                        ...item,
                                        status: selectedBulkRadio,
                                        bulk_action: selectedBulkRadio === "bookable" ? "updated to bookable" : "updated to soldout"
                                    }
                                } else {
                                    return { ...item }
                                }
                            })

                            console.log("resultQuick123:::::::::::>", resultQuick)

                            dispatch(handleInventoryTable(resultQuick))

                        } else {

                            const resultQuick = updatedTable?.filter((item) => item !== undefined)?.map((item) => {

                                const bookingDay = item.booking_date.split(' ')[0].toLowerCase();

                                if (formattedDateUpdateProperty.dateTwo.includes(item.booking_dateF) && item.room_id === selectedRoomUpdatePropertyKey && selectedChecksUpdateProp.includes(bookingDay)) {
                                    return {
                                        ...item,
                                        status: selectedBulkRadio,
                                        bulk_action: selectedBulkRadio === "bookable" ? "updated to bookable" : "updated to soldout"
                                    }
                                } else {
                                    return { ...item }
                                }
                            })

                            console.log("resultQuick:::::::::::>", resultQuick)

                            dispatch(handleInventoryTable(resultQuick))

                        }

                    }

                }

                if (selectedBulkUpdateTab === "updateRate") {

                    if(selectedRoomUpdateRateKey === "all") {

                        const resultQuick = updatedTable?.filter((item) => item !== undefined)?.map((item) => {

                            if (formattedDateUpdateRate.dateTwo.includes(item.booking_dateF) && arrRoomKey.includes(item.room_id)) {
                                return {
                                    ...item,
                                    rate_3hr: enteredBulkUpdateRate.value3HourRate === "" ? item.rate_3hr : enteredBulkUpdateRate.value3HourRate,
                                    rate_6hr: enteredBulkUpdateRate.value6HourRate === "" ? item.rate_6hr : enteredBulkUpdateRate.value6HourRate,
                                    rate_12hr: enteredBulkUpdateRate.value12HourRate === "" ? item.rate_12hr : enteredBulkUpdateRate.value12HourRate,
                                    rate_24hr: enteredBulkUpdateRate.value24HourRate === "" ? item.rate_24hr : enteredBulkUpdateRate.value24HourRate,
                                    bulk_action: "updated rate"
                                }
                            } else {
                                return { ...item }
                            }
                        })
    
                        dispatch(handleInventoryTable(resultQuick))

                    }else {

                        const resultQuick = updatedTable?.filter((item) => item !== undefined)?.map((item) => {

                            if (formattedDateUpdateRate.dateTwo.includes(item.booking_dateF) && item.room_id === selectedRoomUpdateRateKey) {
                                return {
                                    ...item,
                                    rate_3hr: enteredBulkUpdateRate.value3HourRate === "" ? item.rate_3hr : enteredBulkUpdateRate.value3HourRate,
                                    rate_6hr: enteredBulkUpdateRate.value6HourRate === "" ? item.rate_6hr : enteredBulkUpdateRate.value6HourRate,
                                    rate_12hr: enteredBulkUpdateRate.value12HourRate === "" ? item.rate_12hr : enteredBulkUpdateRate.value12HourRate,
                                    rate_24hr: enteredBulkUpdateRate.value24HourRate === "" ? item.rate_24hr : enteredBulkUpdateRate.value24HourRate,
                                    bulk_action: "updated rate"
                                }
                            } else {
                                return { ...item }
                            }
                        })
    
                        dispatch(handleInventoryTable(resultQuick))

                    }

                }
            }

            if (dbData.length > 0) {

                const updatedTable = payload.map((item) => {

                    const match = dbData.find(
                        (item1) =>
                            item1.Hotel_Id === item.Hotel_Id &&
                            item1.booking_dateF === item.booking_dateF &&
                            item1.room_id === item.room_id
                    );

                    return match ? match : item;
                });

                dispatch(handleInventoryTable(updatedTable))

                if (quickSold) {
                    quickFunction(updatedTable)
                }

                if (updateBulkProperty) {
                    bulkFunction(updatedTable)
                }


            } else {

                if (quickSold || updateBulkProperty) {

                    if (quickSold) {
                        quickFunction(payload)
                    }

                    if (updateBulkProperty) {
                        bulkFunction(payload)
                    }

                } else {
                    dispatch(handleInventoryTable(payload))
                }

            }

        } catch (error) {
            console.error("Error in fxnTwo:", error);
        }
    };


    useEffect(() => {
        console.log("Selected Ro0om:::::>", selectedRoomDetails)
        if (hotel_id !== 0 && selectedRoomDetails) {
            fxnOne();
        }
    }, [hotel_id, selectedRoomDetails, selectedDateRange])


    const ConvertToTitleCase = ({ word }) => {
        const titleCaseWord = word.charAt(0).toUpperCase() + word.slice(1);

        return <h1>{titleCaseWord}</h1>;
    };


    useEffect(() => {

        console.log("inventoryTable:::::::>", inventoryTable)
        setResult(inventoryTable)

    }, [inventoryTable])


    const handleUpdateTable = (val) => {
        dispatch(handleInventoryTable(val))
    }

    return (
        <>


            <div className="h-[35rem] custom-scrollbar">
                <div className="sticky top-0 z-50 w-screen bg-white">
                    <RIMainContTopBar />
                </div>
                {Array.isArray(result) && result.map((item) => {
                    const [day, date, month] = item?.booking_date ? item.booking_date.split(" ") : ["", "", ""];
                    const isSoldOut = item?.status === "soldout";

                    return (
                        <div className='mt-1 pl-2 pr-2 w-screen z-0' key={item.id}>
                            <div className='grid grid-cols-12 gap-2 border-b h-24 justify-center items-center'>
                                <div className='col-span-1 text-center flex flex-row justify-center items-center'>
                                    <div className={`w-[70%] h-14 ${isSoldOut ? 'opacity-50 pointer-events-none' : ''}`}>
                                        <h5 className='text-sm font-semibold text-foreground-400'>{day}</h5>
                                        <h5 className='text-xs font-semibold text-foreground-400'>{date}</h5>
                                        <h5 className='text-sm font-semibold text-foreground-400'>{month}</h5>
                                        <h5 className='text-sm font-semibold text-foreground-400'>{item.booking_dateF}</h5>
                                    </div>
                                    <div className={`w-[30%] flex flex-col gap-2 items-center justify-center' ${isSoldOut ? 'opacity-50 pointer-events-none' : ''}`}>
                                        <div className='border border-foreground-300 px-3 rounded-lg text-xs'>{item?.room_occupancy}</div>
                                        {checkPricePerGuest
                                            ? [...Array(item?.room_occupancy - 1)].map((_, index) => (
                                                <div key={index} className='border border-foreground-300 px-3 rounded-lg text-xs'>{item?.room_occupancy - index - 1}</div>
                                            ))
                                            : ""
                                        }

                                    </div>
                                </div>
                                <div className={`col-span-4 text-center ${isSoldOut ? 'opacity-50 pointer-events-none' : ''}`}>
                                    <div className='grid grid-cols-12 h-16 place-items-center'>
                                        <div className='col-span-3 flex flex-col gap-1 p-px'>
                                            <div className='border-1 border-foreground-300 px-4 py-px rounded-lg text-xs inline-flex cursor-pointer'>₹ {item?.rate_3hr}<Pencil className="ml-2 size-4 text-gray-700" /></div>
                                            {checkPricePerGuest
                                                ? [...Array(item?.room_occupancy - 1)].map((_, index) => (
                                                    // <div key={index} className='border border-foreground-300 px-3 rounded-lg text-xs'>{item?.room_occupancy - index - 1}</div>
                                                    <div key={index} className='border-1 border-foreground-300 px-4 py-px rounded-lg text-xs'>₹ {item?.rate_3hr}</div>
                                                ))
                                                : ""
                                            }
                                        </div>
                                        <div className='col-span-3 flex flex-col gap-1 p-px'>
                                            <div className='border-1 border-foreground-300 px-4 py-px rounded-lg text-xs inline-flex cursor-pointer'>₹ {item?.rate_6hr}<Pencil className="ml-2 size-4 text-gray-700" /></div>
                                            {checkPricePerGuest
                                                ? [...Array(item?.room_occupancy - 1)].map((_, index) => (
                                                    // <div key={index} className='border border-foreground-300 px-3 rounded-lg text-xs'>{item?.room_occupancy - index - 1}</div>
                                                    <div key={index} className='border-1 border-foreground-300 px-4 py-px rounded-lg text-xs'>₹ {item?.rate_6hr}</div>
                                                ))
                                                : ""
                                            }

                                        </div>
                                        <div className='col-span-3 flex flex-col gap-1 p-px'>
                                            <div className='border-1 border-foreground-300 px-4 py-px rounded-lg text-xs inline-flex cursor-pointer'>₹ {item?.rate_12hr}<Pencil className="ml-2 size-4 text-gray-700" /></div>
                                            {checkPricePerGuest
                                                ? [...Array(item?.room_occupancy - 1)].map((_, index) => (
                                                    // <div key={index} className='border border-foreground-300 px-3 rounded-lg text-xs'>{item?.room_occupancy - index - 1}</div>
                                                    <div key={index} className='border-1 border-foreground-300 px-4 py-px rounded-lg text-xs'>₹ {item?.rate_12hr}</div>
                                                ))
                                                : ""
                                            }

                                        </div>
                                        <div className='col-span-3 flex flex-col gap-1 p-px'>
                                            <div className='border-1 border-foreground-300 px-4 py-px rounded-lg text-xs inline-flex cursor-pointer'>₹ {item.rate_24hr}<Pencil className="ml-2 size-4 text-gray-700" /></div>
                                            {checkPricePerGuest
                                                ? [...Array(item?.room_occupancy - 1)].map((_, index) => (
                                                    // <div key={index} className='border border-foreground-300 px-3 rounded-lg text-xs'>{item?.room_occupancy - index - 1}</div>
                                                    <div key={index} className='border-1 border-foreground-300 px-4 py-px rounded-lg text-xs'>₹ {item.rate_24hr}</div>
                                                ))
                                                : ""
                                            }

                                        </div>
                                    </div>
                                </div>
                                <div className={`col-span-2 text-center ${isSoldOut ? 'opacity-50 pointer-events-none' : ''}`}>
                                    <div className='grid grid-cols-12 h-16'>
                                        <div className='col-span-6 flex justify-center items-center'>
                                            <div className='border-1 border-foreground-300 px-5 py-1 rounded-lg text-xs inline-flex cursor-pointer'>{item?.total_rooms_count}<Pencil className="ml-2 size-4 text-gray-700" /></div>
                                        </div>
                                        <div className='col-span-6 flex justify-center items-center'>
                                            <div className='border-1 border-foreground-300 px-5 py-1 rounded-lg text-xs inline-flex cursor-pointer'>{item?.booked_rooms_count}<Pencil className="ml-2 size-4 text-gray-700" /></div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-span-3 text-center'>
                                    <div className='grid grid-cols-12 h-16 place-items-center items-center justify-center'>
                                        <div className={`col-span-3 flex flex-col gap-1 p-px ${isSoldOut ? 'opacity-50 pointer-events-none' : ''}`}>
                                            <div className='border-1 border-foreground-300 px-4 py-px rounded-lg text-xs'>{item?.first_checkin_last_checkout_3hr}</div>
                                            <div className='text-center'><Chip color={item?.first_checkin_last_checkout_status_3hr === "Active" ? "success" : "danger"} variant="flat" size='sm' className={item?.first_checkin_last_checkout_status_3hr === "Active" ? 'text-success bg-success-50 border-none text-[10px]' : 'text-success bg-danger-50 border-none text-[10px]'}>{item?.first_checkin_last_checkout_status_3hr}</Chip></div>
                                        </div>
                                        <div className={`col-span-3 flex flex-col gap-1 p-px ${isSoldOut ? 'opacity-50 pointer-events-none' : ''}`}>
                                            <div className='border-1 border-foreground-300 px-4 py-px rounded-lg text-xs'>{item?.first_checkin_last_checkout_6hr}</div>
                                            <div className='text-center'><Chip color={item?.first_checkin_last_checkout_status_6hr === "Active" ? "success" : "danger"} variant="flat" size='sm' className={item?.first_checkin_last_checkout_status_6hr === "Active" ? 'text-success bg-success-50 border-none text-[10px]' : 'text-success bg-danger-50 border-none text-[10px]'}>{item?.first_checkin_last_checkout_status_6hr}</Chip></div>
                                        </div>
                                        <div className={`col-span-3 flex flex-col gap-1 p-px ${isSoldOut ? 'opacity-50 pointer-events-none' : ''}`}>
                                            <div className='border-1 border-foreground-300 px-4 py-px rounded-lg text-xs'>{item?.first_checkin_last_checkout_12hr}</div>
                                            <div className='text-center'><Chip color={item?.first_checkin_last_checkout_status_12hr === "Active" ? "success" : "danger"} variant="flat" size='sm' className={item?.first_checkin_last_checkout_status_12hr === "Active" ? 'text-success bg-success-50 border-none text-[10px]' : 'text-success bg-danger-50 border-none text-[10px]'}>{item?.first_checkin_last_checkout_status_12hr}</Chip></div>
                                        </div>
                                        <div className={`col-span-3 flex flex-col gap-1 p-px ${isSoldOut ? 'opacity-50 pointer-events-none' : ''}`}>
                                            <div className='border-1 border-foreground-300 px-4 py-px rounded-lg text-xs'>{item?.first_checkin_last_checkout_24hr}</div>
                                            <div className='text-center'><Chip color={item?.first_checkin_last_checkout_status_24hr === "Active" ? "success" : "danger"} variant="flat" size='sm' className={item?.first_checkin_last_checkout_status_24hr === "Active" ? 'text-success bg-success-50 border-none text-[10px]' : 'text-success bg-danger-50 border-none text-[10px]'}>{item?.first_checkin_last_checkout_status_24hr}</Chip></div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`col-span-1 text-center ${isSoldOut ? 'opacity-50 pointer-events-none' : ''}`}>
                                    <div className='col-span-2 flex flex-col gap-2 px-4'>
                                        <Button variant="flat" className={item.status === "bookable" ? "text-gray-800 bg-green-200" : "text-gray-800 bg-red-200"}>
                                            <ConvertToTitleCase word={item.status} />
                                        </Button>
                                    </div>
                                </div>
                                <div className='col-span-1 text-center'>
                                    <div className='col-span-2 flex flex-col gap-2 px-4'>
                                        <EditModal result={result} rowDataID={item?.id} isSoldOut={isSoldOut} onUpdateTable={handleUpdateTable} />
                                        <Button color='primary' variant='shadow' size='sm' startContent={<ViewIcon size={15} />}>View</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>


        </>
    )
}

export default RIMainCont


const ViewIcon = ({ size, height, width, fill, ...props }) => {
    return (
        <svg
            fill="currentColor"
            height={size || height}
            viewBox="0 0 256 256"
            width={size || width}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M245.48,125.57c-.34-.78-8.66-19.23-27.24-37.81C201,70.54,171.38,50,128,50S55,70.54,37.76,87.76c-18.58,18.58-26.9,37-27.24,37.81a6,6,0,0,0,0,4.88c.34.77,8.66,19.22,27.24,37.8C55,185.47,84.62,206,128,206s73-20.53,90.24-37.75c18.58-18.58,26.9-37,27.24-37.8A6,6,0,0,0,245.48,125.57ZM128,194c-31.38,0-58.78-11.42-81.45-33.93A134.77,134.77,0,0,1,22.69,128,134.56,134.56,0,0,1,46.55,95.94C69.22,73.42,96.62,62,128,62s58.78,11.42,81.45,33.94A134.56,134.56,0,0,1,233.31,128C226.94,140.21,195,194,128,194Zm0-112a46,46,0,1,0,46,46A46.06,46.06,0,0,0,128,82Zm0,80a34,34,0,1,1,34-34A34,34,0,0,1,128,162Z">
            </path>
        </svg>
    );
};