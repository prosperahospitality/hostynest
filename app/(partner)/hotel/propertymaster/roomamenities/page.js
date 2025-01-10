'use client'
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Tabs, Tab, Card, CardBody, CardHeader, Checkbox, Button } from "@nextui-org/react";
import { AirConditioner } from '@/_components/aminationsicons'
import RoomSelectionTab from "@/app/(partner)/hotel/propertymaster/roomamenities/RoomSelectionTab"
import { useSearchParams } from 'next/navigation'
import Swal from 'sweetalert2'
import toast, { Toaster } from 'react-hot-toast';

const toproomamenitiesdata = [
    {
        title: "Top Amenities",
        item: "Air conditioning",
    },
    {
        title: "Top Amenities",
        item: "Restaurant",
    },
    {
        title: "Top Amenities",
        item: "Bar",
    },
    {
        title: "Top Amenities",
        item: "Flat-screen TV",
    },
]

const roomamenitiesdata = [
    {
        title: "Room Amenities",
        item: "Cots",
    },
    {
        title: "Room Amenities",
        item: "Clothes rack",
    },
    {
        title: "Room Amenities",
        item: "Drying rack for clothing",
    },
    {
        title: "Room Amenities",
        item: "Fold-up bed",
    },
]


const RoomAmenitiesPage = () => {

    const [ result, setResult ] = useState([]);
    const [ resultOfRoomAmenities, setResultOfRoomAmenities ] = useState([]);
    const [ selectedBoxes, setSelectedBoxes ] = useState();
    const [ selectedArea, setSelectedArea ] = useState();
    const [ selectedAmenities, setSelectedAmenities ] = useState();
    const [ previousChecks, setPreviousChecks ] = useState();
    const [ selectedTabs, setSelectedTabs ] = useState();

    


    const [ initialEdit, setInitialEdit ] = useState(false);
    const searchParams = useSearchParams();
    const hotel_id = searchParams.get('hotel_id');
    const [lastID, setLastID] = useState(0);
    const initialFxnCalled = useRef(false);
    const [ arr, setArr ] = useState([]);
    const [resetFlag, setResetFlag] = useState(false);
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const initialFxn = async () => {
        try {
            const response = await fetch(`/api/property/property_amenities?hotelId=${hotel_id.toString()}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();

            console.log("Res::::::>>>>>>1111",result)
            
            setResultOfRoomAmenities(result.pms_propertymaster_roomamenities)
            let newResult = result.data;
            let newResultRoomAmen = result.pms_propertymaster_roomamenities;

            console.log("Res::::::>>>>>>2222",newResult, newResultRoomAmen, newResult.length, newResultRoomAmen.length)

            if(newResultRoomAmen.length === 0 || newResult.length > newResultRoomAmen.length) {
                if(newResultRoomAmen.length === 0) {
                    console.log("Res::::::>>>>>>If")
                    setResult(result.data)
                    initialCreateFxn(newResult)
                }else{
                    console.log("Res::::::>>>>>>Else")
                    
                    initialCreateFxn(newResult)

                    const response = await fetch(`/api/property/property_amenities?hotelId=${hotel_id.toString()}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    const result1 = await response.json();

                    setResult(result1.pms_propertymaster_roomamenities)
                }
                
            }else if(newResult.length < newResultRoomAmen.length) {
                let re = newResultRoomAmen.filter(obj1 => !newResult.some(obj2 => obj2.property_area === obj1.property_area));
                
                let re1 = newResultRoomAmen.filter(obj1 => !newResult.some(obj2 => obj2.property_area === obj1.property_area && obj2.property_amenities === obj1.property_amenities));
                console.log("Res::::::>>>>>>re", re, re1)

                if(re.length > 0) {
                    let payload;

                
                    payload = {
                        Hotel_Id: hotel_id,
                        property_area: re,
                        operation: "deleteExtraArea",
                    }
                    const response = await fetch('/api/pms/property_master/room_amenities', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(payload),
                    });
                    const result = await response.json();
                
                    setResult(result.res)
                }

                if(re1.length > 0) {
                    let payload;

                
                    payload = {
                        Hotel_Id: hotel_id,
                        property_area: re1,
                        operation: "deleteExtraAmenity",
                    }
                    const response = await fetch('/api/pms/property_master/room_amenities', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(payload),
                    });
                    const result = await response.json();

                    console.log("Res::::::>>>>>>re1result",result)
                
                    setResult(result.res)
                }
       
            }else{
                console.log("Res::::::>>>>>>Else1", result.pms_propertymaster_roomamenities)
                setResult(result.pms_propertymaster_roomamenities)
                setArr(newResultRoomAmen)
            }


        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        if (!initialFxnCalled.current) { 
            initialFxn();
            initialFxnCalled.current = true; 
        }

    }, [])

    useEffect(() => {

        console.log("Res::::::>>>>>>",result)
    }, [result])

    const generateUniqueID = () => {

      const newID = `PMSRA${String(lastID + 1).padStart(5, '0')}`;
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

      const initialCreateFxn = async (newResult) => {
        let payload = {};

            try {


                let promise = newResult?.map(async (item,index) => {
    
                        payload = {
                            id: generateUniqueID(),
                            Hotel_Id: parseInt(hotel_id),
                            property_area: item.property_area,
                            property_areaId: item.propertyarea_id,
                            property_amenities: item.property_amenities,
                            property_amenitiesId: item.amenities_id,
                            availability: ['none'],
                            creation_date: getCurrentDateTime(),
                            last_update_on: getCurrentDateTime(),
                            operation: "add",
                        }
                        
                        arr.push(payload)
    
    
                    const response = await fetch('/api/pms/property_master/room_amenities', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(payload),
                    });
                    const result = await response.json();

                    console.log("ResultMMMM:::::::>",result)

                })
            } catch (error) {
                console.error("Error fetching data:", error);
            }


    }
    


    const handleSelectedCheckBoxes = async (data, area, amenities, areaId, checkboxSelect, selected) => {
        console.log("Check Data0: ",data, area, amenities, hotel_id, checkboxSelect, selected)
       
        setSelectedBoxes(data);
        setSelectedArea(area);
        setSelectedAmenities(amenities);
        setPreviousChecks(checkboxSelect);
        setSelectedTabs(selected);
        
    }


    useEffect(() => {
        console.log("Checks: ",selectedBoxes, selectedArea, selectedAmenities,
        previousChecks,
        selectedTabs)

        arr?.map((items) => {
            if(items.property_area === selectedArea && items.property_amenities === selectedAmenities){
                items.availability = selectedBoxes;
                if(selectedTabs === "allrooms") {
                    items.availability = ['allrooms'];
                }else if(selectedTabs === "none") {
                    items.availability = ['none'];
                }
                console.log("Items:::::::>",items)
            }
        })

        console.log("Array:::::::>",arr)

    }, [selectedBoxes, selectedArea, selectedAmenities,
        previousChecks,
        selectedTabs, arr])


        // eslint-disable-next-line react-hooks/exhaustive-deps
        const handleSubmit = useCallback(async () => {
            console.log("Save Array Like: ", arr);
            let payload;
    
            payload = {
                Hotel_Id: hotel_id,
                operation: "delete",
            };
            const response = await fetch('/api/pms/property_master/room_amenities', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            const result = await response.json();
        
           
            const fetchPromises = arr?.map(async (item, index) => {
                payload = {
                    id: item.id,
                    Hotel_Id: item.Hotel_Id,
                    property_area: item.property_area,
                    property_areaId: item.property_areaId,
                    property_amenities: item.property_amenities,
                    property_amenitiesId: item.property_amenitiesId,
                    availability: item.availability,
                    creation_date: getCurrentDateTime(),
                    last_update_on: getCurrentDateTime(),
                    operation: "add",
                };
        
                const response = await fetch('/api/pms/property_master/room_amenities', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                });
                return response.json(); 
            });
        
            
            const results = await Promise.all(fetchPromises);
            
            
            const allSuccess = results.every(result => result.success === true);
        
            if (allSuccess) {
                toast.success("Data Saved");
            }else{
                toast.error("Error Occured");
            }
        });
        

        useEffect(() => {
            if (result && result.length > 0) {
                const lastElement = result[result.length - 1]; 
                const lastElementId = lastElement.id; 
                const numericPart = lastElementId.match(/(?<=PMSRA)0*(\d+)/); 
                const lastNumericId = numericPart ? parseInt(numericPart[1]) : null;
                setLastID(lastNumericId);
            } else {
                console.log("No elements in the array.");
                setLastID(0);
            }
        }, [result,handleSubmit])

        const handleReset = async () => {

            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, reset it!"
              }).then(async (result) => {
                if (result.isConfirmed) {

                    setResetFlag(!resetFlag)
           
                    let payload = {
    
                        Hotel_Id: hotel_id,
               
                        availability: ['none'],
    
                        operation: "reset",
                    }
        
        
                const response = await fetch('/api/pms/property_master/room_amenities', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                });
                const result = await response.json();

                }
              });

           
            
           
        }

    return (
        <>
        <Toaster
        position="top-right"
        reverseOrder={false} />
            <div className='m-4 p-4 flex justify-between'>
                <h1 className='text-2xl text-foreground-300 font-semibold'>Room Amenities</h1>
                <div>
                <Button className="mr-4" variant='shadow' color='primary' size='sm' onClick={handleSubmit}>Save</Button>
                <Button variant='shadow' color='primary' size='sm' onClick={handleReset}>Reset</Button>
                </div>
            </div>


            {result && Array.isArray(result) && [...new Set(result?.map(item => item.property_area))].map((property_area) => (
                // eslint-disable-next-line react/jsx-key
                <div className='bg-foreground-800 h-fit rounded-xl m-4 p-4 shadow-xl' >
                
                <h1 className='text-xl text-foreground-300 font-semibold'>{property_area} Amenities</h1>
                {property_area === "Top" 
                    ? <h4 className='text-sm text-foreground-300'>Listing your facilities can really help influence guests to book! Update the ones available at your property or on-site below.</h4> 
                    : ""
                }
                <div className='w-full grid grid-cols-2 justify-between mt-4'>
                    {result.filter((item) => item.property_area === property_area).map((items) => (
                        <>
                        <div className='flex gap-4 justify-between m-2 items-center'>
                            <h4 className='text-base text-foreground-300'>{items.property_amenities}</h4>
                            <div>
                                <RoomSelectionTab hotel_id = {hotel_id} onSelectedChecks={handleSelectedCheckBoxes} area = {items.property_area} amenity = {items.property_amenities} areaId = {items.propertyarea_id} checkboxSelect = {result.length > resultOfRoomAmenities.length ? [] : items.availability} selectedTabss = {items.availability} resetFlag = {resetFlag}/>
                            </div>
                        </div>
                        </>
                    ))}
                </div>
            </div>
            ))}

        </>
    )
}

export default RoomAmenitiesPage;