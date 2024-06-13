'use client'
import React, { useState, useEffect, useCallback, useRef } from "react";
import RIMainContTopBar from '@/app/(partner)/hotel/rateandinventory/managerateandinventory/RIMainContTopBar'
import { Chip, Button } from "@nextui-org/react";
import EditModal from '@/app/(partner)/hotel/rateandinventory/managerateandinventory/EditModal';
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from 'next/navigation'
import { removeQuickSoldFormattedDate } from "@/app/redux/slices/rateandinventorySlice";
import { handleQuickSoldFormattedDate } from "@/app/redux/slices/rateandinventorySlice";

import { handleFormattedDateUpdateProp } from "@/app/redux/slices/rateandinventorySlice";
import { handleUpdatePropArray } from "@/app/redux/slices/rateandinventorySlice";
import { useSession, getSession, signIn, signOut } from 'next-auth/react'


const arrs = [1, 2, 3, 4, 5, 6, 7]

const RIMainCont = () => {
    const searchParams = useSearchParams();
    const hotel_id = searchParams.get('hotel_id');
    const hotel_name = searchParams.get('hotel_name');
    const [result, setResult] = useState([])
    const [allResult, setAllResult] = useState([])
    const [lastID, setLastID] = useState(0);
    const dispatch = useDispatch();
    const [previousDateRange, setPreviousDateRange] = useState([])

    let selectedDateRange = useSelector((state) => state.rateandinventory.formattedDateRange);
    let selectedRoom = useSelector((state) => state.rateandinventory.selectedRoom);

    let quickSold = useSelector((state) => state.rateandinventory.quickSold);
    let quickSoldFormattedDate = useSelector((state) => state.rateandinventory.quickSoldFormattedDate);
    let quickSoldFormattedDateCopy = useSelector((state) => state.rateandinventory.quickSoldFormattedDateCopy);
    let quickSoldSelectedRadio = useSelector((state) => state.rateandinventory.quickSoldSelectedRadio);

    let updateBulkProperty = useSelector((state) => state.rateandinventory.updateBulkProperty);
    let formattedDateUpdateProp = useSelector((state) => state.rateandinventory.formattedDateUpdateProp);
    let formattedDateUpdatePropCopy = useSelector((state) => state.rateandinventory.formattedDateUpdatePropCopy);
    let selectedRoomUpdateProperty = useSelector((state) => state.rateandinventory.selectedRoomUpdateProperty);
    let selectedRadioUpdateProp = useSelector((state) => state.rateandinventory.selectedRadioUpdateProp);

    let updatePropArray = useSelector((state) => state.rateandinventory.updatePropArray);
    let updateRoomArray = useSelector((state) => state.rateandinventory.updateRoomArray);
    let updateRateArray = useSelector((state) => state.rateandinventory.updateRateArray);
    
    let formattedDateUpdateRoom = useSelector((state) => state.rateandinventory.formattedDateUpdateRoom);
    let selectedRoomUpdateRooms = useSelector((state) => state.rateandinventory.selectedRoomUpdateRooms);
    let valueTotalRoom = useSelector((state) => state.rateandinventory.valueTotalRoom);

    let checkPricePerGuest = useSelector((state) => state.rateandinventory.checkPricePerGuest);
    

    const [editableSelectedRoom, setEditableSelectedRoom] = useState([]);
    const [editableSelectedRoomCopy, setEditableSelectedRoomCopy] = useState([]);

    const [editableUpdateProp, setEditableUpdateProp] = useState([]);
    const [editableUpdatePropCopy, setEditableUpdatePropCopy] = useState([]);


    let selectedRoomUpdateRate= useSelector((state) => state.rateandinventory.selectedRoomUpdateRate);
    let formattedDateUpdateRate= useSelector((state) => state.rateandinventory.formattedDateUpdateRate);
    let value3HourRate= useSelector((state) => state.rateandinventory.value3HourRate);
    let value6HourRate= useSelector((state) => state.rateandinventory.value6HourRate);
    let value12HourRate= useSelector((state) => state.rateandinventory.value12HourRate);
    let valueBaseRate= useSelector((state) => state.rateandinventory.valueBaseRate);
    let valueChildRate= useSelector((state) => state.rateandinventory.valueChildRate);
    let valueExtraPersonRate= useSelector((state) => state.rateandinventory.valueExtraPersonRate);

    const [session, setSession] = React.useState({});

    React.useEffect(() => {
    
        const getSessionInfo = async () => {
          const session = await getSession();
          setSession(session);
        };
        getSessionInfo();
    }, [])

    React.useEffect(() => {
    
console.log("Sessionnnnn: ",session)
    }, [session])

    useEffect(() => {

        if(selectedDateRange.length !== 0) {
            setPreviousDateRange(prevDateRange => [...prevDateRange, selectedDateRange]);
        }
        


        if(selectedDateRange || selectedRoom) {
            dataFxn(selectedDateRange, selectedRoom, quickSoldFormattedDate, editableSelectedRoom)
        }

    }, [selectedDateRange, selectedRoom, editableSelectedRoom])

    useEffect(() => {

        console.log("Previous Date Range: ",previousDateRange)

    }, [previousDateRange])


    const generateUniqueID = () => {

        const newID = `MRI${String(lastID + 1).padStart(5, '0')}`;
        setLastID(lastID + 1);
        return newID;
        };

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


    const handleEditResult = (res, selectedDateRange, selectedRowID, selectedRowDate, selectedRoomtype, selectedRowStatus) => {

        if(selectedRoom === selectedRoomtype) {

            if(quickSoldSelectedRadio === "soldout") {
                if(selectedRowStatus === "bookable") {

                    let updatedDates = quickSoldFormattedDate.filter((item) => item !== selectedRowDate)
    
                    editableSelectedRoom.forEach((item) => {
             
                        if(item.roomtype === selectedRoom) {
              
                            item.updatedDates = updatedDates
                        }
                    })
    
                    setEditableSelectedRoomCopy(editableSelectedRoom)
    
                    dispatch(removeQuickSoldFormattedDate(updatedDates));
    
    
                }else{
                    editableSelectedRoom.forEach((item) => {
                    
                        if (item.roomtype === selectedRoom) {
                        
                            item.updatedDates = [...(item.updatedDates || []), selectedRowDate];
    
                            dispatch(handleQuickSoldFormattedDate(item.updatedDates));
    
                        }
                    });
    
                    setEditableSelectedRoomCopy(editableSelectedRoom)
    
                }
            }

            

        }else{
            
        }
        
        res = res?.filter((item) => {
            return selectedDateRange.includes(item.booking_date);
        });

        const sortedData = res?.sort((a, b) => a.id - b.id);
        setResult(sortedData)
        
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const dataFxn = useCallback(async (selectedDateRange, selectedRoom, quickSoldFormattedDate, editableSelectedRoom) => {
        
        try {
            const response0 = await fetch(`/api/pms/rates_and_inventory/managerateandinventory`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result0 = await response0.json();
            const resultData = result0.data.sort((a, b) => a.id - b.id);
            setAllResult(result0.data)
            let lstID;
            if (resultData && resultData.length > 0) {
                const lastElement = resultData[resultData.length - 1]; 
                const lastElementId = lastElement.id; 
                const numericPart = lastElementId.match(/(?<=MRI)0*(\d+)/); 
                const lastNumericId = numericPart ? parseInt(numericPart[1]) : null;
               
                lstID = lastNumericId;
            } else {
              
                lstID = 0;
            }

            const response = await fetch(`/api/pms/property_master/room_details?hotelId=${hotel_id.toString()}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
            let activeResults = result.dataActive;
            let filteredResults = activeResults.find((item) => item.Hotel_Id === parseInt(hotel_id) && item.room_name === selectedRoom);
           
            console.log("Rooms Selection::::::>", selectedDateRange,selectedRoom)
            await Promise.all(selectedDateRange?.map(async (item) => {
                lstID = lstID + 1;
               
                if(selectedRoom !== " " || selectedRoom !== undefined) {
                    let payload;
                    payload = {
                        id: `MRI${String(lstID).padStart(5, '0')}`,
                        Hotel_Id: hotel_id,
                        Hotel_name: hotel_name,
                        user_id: "01",
                        user_name: "test",
                        booking_date: item.toString(),
                        room_type: selectedRoom,
                        price_per_guest_flag: false,
                        room_occupancy: filteredResults?.base_adult,
                        rate_3hr: 0,
                        rate_6hr: 0,
                        rate_12hr: 0,
                        rate_24hr: filteredResults?.room_rate,
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
                        status:"bookable",
                        creation_date: getCurrentDateTime(),
                        last_update_on: getCurrentDateTime(),
                    }
        
                    const response = await fetch(`/api/pms/rates_and_inventory/managerateandinventory`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(payload),
                    });
                    const result = await response.json();
                }


            //     let payload;
            //     payload = {
            //         id: `MRI${String(lstID).padStart(5, '0')}`,
            //         Hotel_Id: hotel_id,
            //         Hotel_name: hotel_name,
            //         user_id: session ? session?.user?.user_id : "",
            //         user_name: "",
            //         booking_date: item.toString(),
            //         room_type: selectedRoom,
            //         price_per_guest_flag: false,
            //         room_occupancy: filteredResults?.base_adult,
            //         rate_3hr: 0,
            //         rate_6hr: 0,
            //         rate_12hr: 0,
            //         rate_24hr: filteredResults?.room_rate,
            //         total_rooms_count: 0,
            //         booked_rooms_count: 0,
            //         first_checkin_last_checkout_3hr: "12 AM - 11 PM",
            //         first_checkin_last_checkout_6hr: "12 AM - 11 PM",
            //         first_checkin_last_checkout_12hr: "12 AM - 11 PM",
            //         first_checkin_last_checkout_24hr: "12 AM - 11 PM",
            //         first_checkin_last_checkout_status_3hr: "Active",
            //         first_checkin_last_checkout_status_6hr: "Active",
            //         first_checkin_last_checkout_status_12hr: "Active",
            //         first_checkin_last_checkout_status_24hr: "Active",
            //         status:"bookable",
            //         creation_date: getCurrentDateTime(),
            //         last_update_on: getCurrentDateTime(),
            //     }
    
            //     const response = await fetch(`/api/pms/rates_and_inventory/managerateandinventory`, {
            //         method: "POST",
            //         headers: {
            //             "Content-Type": "application/json",
            //         },
            //         body: JSON.stringify(payload),
            //     });
            //     const result = await response.json();
               
             }));

            if(quickSoldSelectedRadio === "soldout") {
                editableSelectedRoom?.map(async (item) => {
                    
                    if(item.roomtype === selectedRoom) {
                        if(item.updatedDates.length === 0) {
                            
                            if(quickSoldFormattedDateCopy) {
                                
                          
                                    let payload = {
                                        Hotel_Id: hotel_id,
                                        formattedDates: quickSoldFormattedDateCopy,
                                        status: quickSoldSelectedRadio,
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
                                    getData();
                           
                            }
                            
                        }else{
                            
                            if(quickSoldFormattedDate) {
                        
                                let datessss = item.updatedDates;
                                const filteredQuickSoldFormattedDateCopy = quickSoldFormattedDateCopy.filter(
                                    item => !datessss.includes(item)
                                );
                                
                                    let payload = {
                                        Hotel_Id: hotel_id,
                                        formattedDates: quickSoldFormattedDate,
                                        status: quickSoldSelectedRadio,
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
                                   
    
                                    if(filteredQuickSoldFormattedDateCopy.length !== 0){
                                        let payload1 = {
                                            Hotel_Id: hotel_id,
                                            formattedDates: filteredQuickSoldFormattedDateCopy,
                                            status: "bookable",
                                            selectedRoom: selectedRoom,
                                            operation: "bulkEdit",
                                        }
                                        const response1 = await fetch(`/api/pms/rates_and_inventory/managerateandinventory`, {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                            body: JSON.stringify(payload1),
                                        });
                                        const result1 = await response1.json();
                                        getData();
                                    }
                                    
                           
                            }
                        }
                    }else{
                        console.log("Room Not Found")
                    }
                })
    
                setEditableSelectedRoomCopy(editableSelectedRoom)

                const updatedArray = updatePropArray?.map(item => ({
                    ...item,
                    updatedDates: []
                }));
                dispatch(handleUpdatePropArray(updatedArray));

            }else {
                
            }

            

            if(selectedRadioUpdateProp === "soldout") {
                if(selectedRoomUpdateProperty === selectedRoom) {
                    
                    updatePropArray?.map(async (item) => {
                        if(item.roomtype === selectedRoom) {
                           
                            let filteredUpdateProp = selectedDateRange.filter(date => item.updatedDates.includes(date))
                           
                            let payload = {
                                Hotel_Id: hotel_id,
                                formattedDates: filteredUpdateProp,
                                status: selectedRadioUpdateProp,
                                selectedRoom: selectedRoomUpdateProperty,
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
                        }
                    })
                }
            }else {
                if(selectedRoomUpdateProperty === selectedRoom) {
                   
                    updatePropArray?.map(async (item) => {
                        if(item.roomtype === selectedRoom) {
                            
                            // let filteredUpdateProp = selectedDateRange.filter(date => item.updatedDates.includes(date))
                            // console.log("Bulk Updateeeeee 2: ",filteredUpdateProp)
                            let payload = {
                                Hotel_Id: hotel_id,
                                formattedDates: item.updatedDates,
                                status: selectedRadioUpdateProp,
                                selectedRoom: selectedRoomUpdateProperty,
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
                        }
                    })
                }
            }


            if(updateRoomArray) {
       
                    
                    updateRoomArray?.map(async (item) => {
                        if(item.roomtype === selectedRoom) {

                            let previousDateRangeNew = previousDateRange[previousDateRange.length - 2]

                            console.log("previousDateRangeNew: ", previousDateRangeNew)

                            let filteredUpdateRoom = selectedDateRange.filter(date => !previousDateRangeNew?.includes(date))
                            let filteredUpdateRoomnew = filteredUpdateRoom.filter(date => item.updatedDates?.includes(date))
                            console.log("Filtered Data: ",selectedDateRange, filteredUpdateRoom,filteredUpdateRoomnew, item.updatedDates)



                            let payload = {
                                Hotel_Id: hotel_id,
                                formattedDates: filteredUpdateRoomnew,
                                selectedRoom: selectedRoom,
                                totalRooms: parseInt(item.value),
                                operation: "bulkUpdateRoom",
                            }
                            const response = await fetch(`/api/pms/rates_and_inventory/managerateandinventory`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(payload),
                            });
                            const result = await response.json();
                            getData()
                        }})
                 
            }

            if(updateRateArray) {

                console.log("updateRateArray: ",updateRateArray)
                updateRateArray?.map(async (item) => {
                    if(item.roomtype === selectedRoom) {

                        let previousDateRangeNew = previousDateRange[previousDateRange.length - 2]

                        console.log("previousDateRangeNew: ", previousDateRangeNew)

                        let filteredUpdateRoom = selectedDateRange.filter(date => !previousDateRangeNew?.includes(date))
                        let filteredUpdateRoomnew = filteredUpdateRoom.filter(date => item.updatedDates?.includes(date))

                        let payload = {
                            Hotel_Id: hotel_id,
                            formattedDates: filteredUpdateRoomnew,
                            selectedRoom: selectedRoom,
                            rate_3hr: value3HourRate,
                            rate_6hr: value6HourRate,
                            rate_12hr: value12HourRate,
                            rate_24hr: valueBaseRate,
                            rate_child: valueChildRate,
                            rate_extraperson: valueExtraPersonRate,
                            operation: "bulkUpdateRate",
                        }
                        const response = await fetch(`/api/pms/rates_and_inventory/managerateandinventory`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(payload),
                        });
                        const result = await response.json();
                        getData()
                    }})
            }
            



            const response1 = await fetch(`/api/pms/rates_and_inventory/managerateandinventory?hotelId=${hotel_id.toString()}&&selectedRoom=${selectedRoom}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result1 = await response1.json();

            let databyid = result1?.databyid;

            databyid = databyid?.filter((item) => {
                return selectedDateRange.includes(item.booking_date);
            });

            const sortedData = databyid?.sort((a, b) => a.id - b.id);

            

            setResult(sortedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    });

    const getData = async () => {
        
        const response1 = await fetch(`/api/pms/rates_and_inventory/managerateandinventory?hotelId=${hotel_id.toString()}&&selectedRoom=${selectedRoom}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result1 = await response1.json();

        let databyid = result1?.databyid;

        databyid = databyid?.filter((item) => {
            return selectedDateRange.includes(item.booking_date);
        });

        const sortedData = databyid?.sort((a, b) => a.id - b.id);

        setResult(sortedData);
    }

    useEffect(() => {
        if (allResult && allResult.length > 0) {
            const lastElement = allResult[allResult.length - 1]; 
            const lastElementId = lastElement.id; 
            const numericPart = lastElementId.match(/(?<=MRI)0*(\d+)/); 
            const lastNumericId = numericPart ? parseInt(numericPart[1]) : null;
        
            setLastID(lastNumericId);
        } else {
          
            setLastID(0);
        }
    }, [allResult,dataFxn])



    useEffect(() => {

   

        if(quickSold) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            quickSold = quickSold?.filter((item) => {
                return selectedDateRange.includes(item.booking_date);
            });
    
            const sortedData = quickSold?.sort((a, b) => a.id - b.id);
            setResult(sortedData)
        }

        if(editableSelectedRoom) {
            editableSelectedRoom?.map((item) => {
                item.updatedDates = []
            })

            setEditableSelectedRoomCopy(editableSelectedRoom)
        }

    }, [quickSold])


    useEffect(() => {

        if (selectedRoom && quickSoldFormattedDateCopy && !editableSelectedRoom.some(item => item.roomtype === selectedRoom)) {

            
            let payload = {
                roomtype: selectedRoom,
                updatedDates: [],
            };
            setEditableSelectedRoom(prevState => [...prevState, payload]);
            setEditableSelectedRoomCopy(prevState => [...prevState, payload]);
            dispatch(handleQuickSoldFormattedDate(quickSoldFormattedDateCopy));

        }
        
        if(editableSelectedRoom) {
            editableSelectedRoom?.map((item) => {
                if(item.roomtype === selectedRoom) {
                    if(item.updatedDates.length === 0) {
                        dispatch(handleQuickSoldFormattedDate(quickSoldFormattedDateCopy));
                    }else{
                        dispatch(handleQuickSoldFormattedDate(item.updatedDates));
                    }
                }
            })
        }


        // if (selectedRoom && formattedDateUpdatePropCopy && !editableUpdateProp.some(item => item.roomtype === selectedRoom)) {

        //     console.log("False Room");
        //     let payload = {
        //         roomtype: selectedRoom,
        //         updatedDates: [],
        //     };
        //     setEditableUpdateProp(prevState => [...prevState, payload]);
        //     setEditableUpdatePropCopy(prevState => [...prevState, payload]);
        //     dispatch(handleFormattedDateUpdateProp(formattedDateUpdatePropCopy));

        // }
        
        // if(editableUpdateProp) {
        //     editableUpdateProp?.map((item) => {
        //         if(item.roomtype === selectedRoom) {
        //             if(item.updatedDates.length === 0) {
        //                 dispatch(handleFormattedDateUpdateProp(formattedDateUpdatePropCopy));
        //             }else{
        //                 dispatch(handleFormattedDateUpdateProp(item.updatedDates));
        //             }
        //         }
        //     })
        // }

        

    }, [selectedRoom])


    useEffect(() => {

        if(editableSelectedRoomCopy) {
          
           editableSelectedRoomCopy?.map(async (item) => {
                if(item.roomtype === selectedRoom) {
                    if(item.updatedDates.length !== 0) {
                        let payload = {
                            Hotel_Id: hotel_id,
                            formattedDates: item.updatedDates,
                            status: "soldout",
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
                        getData()
                    }
                }
           })
           
        }

    }, [editableSelectedRoomCopy, selectedRoom])

   

    ///////////////////////////////////////////////////Bulk Bupdate Prop///////////////////////////////////////

    useEffect(() => {

   

        if(updateBulkProperty) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            updateBulkProperty = updateBulkProperty?.filter((item) => {
                return selectedDateRange.includes(item.booking_date);
            });
    
            const sortedData = updateBulkProperty?.sort((a, b) => a.id - b.id);
            setResult(sortedData)

        }

    }, [updateBulkProperty])

    useEffect(() => {

      

    }, [editableUpdatePropCopy])


    useEffect(() => {

        

    }, [updateRoomArray])

    
    return (
        <>
            <RIMainContTopBar />

            {result?.map((item) => {
                const [day, date, month] = item?.booking_date ? item.booking_date.split(" ") : ["", "", ""];
                const isSoldOut = item?.status === "soldout";

                return (
                    <div className='mt-1 pl-2 pr-2 w-screen' key="">
                <div className='grid grid-cols-12'>
                    <div className='col-span-1 text-center flex flex-row'>
                        <div className={`w-[70%] h-14 ${isSoldOut ? 'opacity-50 pointer-events-none' : ''}`}>
                            <h5 className='text-sm font-semibold text-foreground-400'>{day}</h5>
                            <h5 className='text-xs font-semibold text-foreground-400'>{date}</h5>
                            <h5 className='text-sm font-semibold text-foreground-400'>{month}</h5>
                        </div>
                        <div className={`w-[30%] flex flex-col gap-2 items-center justify-center' ${isSoldOut ? 'opacity-50 pointer-events-none' : ''}`}>
                            <div className='border border-foreground-300 px-3 rounded-lg text-xs'>{item?.room_occupancy}</div>
                            {checkPricePerGuest 
                                ?   [...Array(item?.room_occupancy - 1)].map((_, index) => (
                                    <div key={index} className='border border-foreground-300 px-3 rounded-lg text-xs'>{item?.room_occupancy - index - 1}</div>
                                ))
                                : ""
                            }
                          
                        </div>
                    </div>
                    <div className={`col-span-3 text-center ${isSoldOut ? 'opacity-50 pointer-events-none' : ''}`}>
                        <div className='grid grid-cols-12 h-16 place-items-center'>
                            <div className='col-span-3 flex flex-col gap-1 p-px'>
                                <div className='border-1 border-foreground-300 px-4 py-px rounded-lg text-xs'>₹ {item?.rate_3hr}</div>
                                {checkPricePerGuest 
                                    ?   [...Array(item?.room_occupancy - 1)].map((_, index) => (
                                        // <div key={index} className='border border-foreground-300 px-3 rounded-lg text-xs'>{item?.room_occupancy - index - 1}</div>
                                        <div key={index} className='border-1 border-foreground-300 px-4 py-px rounded-lg text-xs'>₹ {item?.rate_3hr}</div>
                                    ))
                                    : ""
                                }
                            </div>
                            <div className='col-span-3 flex flex-col gap-1 p-px'>
                                <div className='border-1 border-foreground-300 px-4 py-px rounded-lg text-xs'>₹ {item?.rate_6hr}</div>
                                {checkPricePerGuest 
                                    ?   [...Array(item?.room_occupancy - 1)].map((_, index) => (
                                        // <div key={index} className='border border-foreground-300 px-3 rounded-lg text-xs'>{item?.room_occupancy - index - 1}</div>
                                        <div key={index} className='border-1 border-foreground-300 px-4 py-px rounded-lg text-xs'>₹ {item?.rate_6hr}</div>
                                    ))
                                    : ""
                                }
                                
                            </div>
                            <div className='col-span-3 flex flex-col gap-1 p-px'>
                                <div className='border-1 border-foreground-300 px-4 py-px rounded-lg text-xs'>₹ {item?.rate_12hr}</div>
                                {checkPricePerGuest 
                                    ?   [...Array(item?.room_occupancy - 1)].map((_, index) => (
                                        // <div key={index} className='border border-foreground-300 px-3 rounded-lg text-xs'>{item?.room_occupancy - index - 1}</div>
                                        <div key={index}  className='border-1 border-foreground-300 px-4 py-px rounded-lg text-xs'>₹ {item?.rate_12hr}</div>
                                    ))
                                    : ""
                                }
                                
                            </div>
                            <div className='col-span-3 flex flex-col gap-1 p-px'>
                                <div className='border-1 border-foreground-300 px-4 py-px rounded-lg text-xs'>₹ {item.rate_24hr}</div>
                                {checkPricePerGuest 
                                    ?   [...Array(item?.room_occupancy - 1)].map((_, index) => (
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
                                <div className='border-1 border-foreground-300 px-5 py-1 rounded-lg text-xs'>{item?.total_rooms_count}</div>
                            </div>
                            <div className='col-span-6 flex justify-center items-center'>
                                <div className='border-1 border-foreground-300 px-5 py-1 rounded-lg text-xs'>{item?.booked_rooms_count}</div>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-6 text-center'>
                        <div className='grid grid-cols-12 h-16 place-items-center items-center justify-center'>
                            <div className={`col-span-2 flex flex-col gap-1 p-px ${isSoldOut ? 'opacity-50 pointer-events-none' : ''}`}>
                                <div className='border-1 border-foreground-300 px-4 py-px rounded-lg text-xs'>{item?.first_checkin_last_checkout_3hr}</div>
                                <div className='text-center'><Chip color={item?.first_checkin_last_checkout_status_3hr === "Active" ? "success" : "danger"} variant="flat" size='sm' className={item?.first_checkin_last_checkout_status_3hr === "Active" ? 'text-success bg-success-50 border-none text-[10px]' : 'text-success bg-danger-50 border-none text-[10px]'}>{item?.first_checkin_last_checkout_status_3hr}</Chip></div>
                            </div>
                            <div className={`col-span-2 flex flex-col gap-1 p-px ${isSoldOut ? 'opacity-50 pointer-events-none' : ''}`}>
                                <div className='border-1 border-foreground-300 px-4 py-px rounded-lg text-xs'>{item?.first_checkin_last_checkout_6hr}</div>
                                <div className='text-center'><Chip color={item?.first_checkin_last_checkout_status_6hr === "Active" ? "success" : "danger"} variant="flat" size='sm' className={item?.first_checkin_last_checkout_status_6hr === "Active" ? 'text-success bg-success-50 border-none text-[10px]' : 'text-success bg-danger-50 border-none text-[10px]'}>{item?.first_checkin_last_checkout_status_6hr}</Chip></div>
                            </div>
                            <div className={`col-span-2 flex flex-col gap-1 p-px ${isSoldOut ? 'opacity-50 pointer-events-none' : ''}`}>
                                <div className='border-1 border-foreground-300 px-4 py-px rounded-lg text-xs'>{item?.first_checkin_last_checkout_12hr}</div>
                                <div className='text-center'><Chip color={item?.first_checkin_last_checkout_status_12hr === "Active" ? "success" : "danger"} variant="flat" size='sm' className={item?.first_checkin_last_checkout_status_12hr === "Active" ? 'text-success bg-success-50 border-none text-[10px]' : 'text-success bg-danger-50 border-none text-[10px]'}>{item?.first_checkin_last_checkout_status_12hr}</Chip></div>
                            </div>
                            <div className={`col-span-2 flex flex-col gap-1 p-px ${isSoldOut ? 'opacity-50 pointer-events-none' : ''}`}>
                                <div className='border-1 border-foreground-300 px-4 py-px rounded-lg text-xs'>{item?.first_checkin_last_checkout_24hr}</div>
                                <div className='text-center'><Chip color={item?.first_checkin_last_checkout_status_24hr === "Active" ? "success" : "danger"} variant="flat" size='sm' className={item?.first_checkin_last_checkout_status_24hr === "Active" ? 'text-success bg-success-50 border-none text-[10px]' : 'text-success bg-danger-50 border-none text-[10px]'}>{item?.first_checkin_last_checkout_status_24hr}</Chip></div>
                            </div>
                            <div className='col-span-4 flex gap-4'>
                                <EditModal rowDataID={item?.id} onEditResult={handleEditResult} selectedDateRange={selectedDateRange} isSoldOut={isSoldOut}/>
                                <Button color='primary' variant='shadow' size='sm' startContent={<ViewIcon size={15} />}>View</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                )
            })}
           
        </>
    )
}

export default RIMainCont


const EditIcon = ({ size, height, width, fill, ...props }) => {
    return (
        <svg
            fill="currentColor"
            height={size || height}
            viewBox="0 0 256 256"
            width={size || width}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M225.91,74.79,181.22,30.1a14,14,0,0,0-19.8,0L38.1,153.41a13.94,13.94,0,0,0-4.1,9.9V208a14,14,0,0,0,14,14H216a6,6,0,0,0,0-12H110.49L225.91,94.59A14,14,0,0,0,225.91,74.79ZM93.52,210H48a2,2,0,0,1-2-2V163.31a2,2,0,0,1,.59-1.41L136,72.49,183.52,120ZM217.42,86.1,192,111.52,144.49,64,169.9,38.59a2,2,0,0,1,2.83,0l44.69,44.68A2,2,0,0,1,217.42,86.1Z">
            </path>
        </svg>
    );
};

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