'use client'
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Button, Checkbox, CheckboxGroup } from "@nextui-org/react";
import { AirConditioner } from '@/app/_components/aminationsicons'
import { useSearchParams } from 'next/navigation'
import Swal from 'sweetalert2'
import toast, { Toaster } from 'react-hot-toast';

const FacilitiesAndServicesPage = () => {

    const searchParams = useSearchParams();
    const hotel_id = searchParams.get('hotel_id');
    const [result, setResult] = useState([]);
    const [roomfands, setRoomfands] = useState([]);
    const [ arr, setArr ] = useState([]);
    const initialFxnCalled = useRef(false);
    const [lastID, setLastID] = useState(0);
    const [selectedCheckBoxes, setSelectedCheckBoxes] = useState();

    const initialFxn = async () => {
        try {
            const response = await fetch(`/api/fands/fands_combs?hotelId=${hotel_id.toString()}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
            console.log("Data:", result);

            setRoomfands(result.pms_propertymaster_roomfands)
            let res_fandscomb = result.data_active;
            let res_roomfands = result.pms_propertymaster_roomfands;

            console.log("Main Data:::::>",res_fandscomb,
            res_roomfands)

            if(res_roomfands === 0 || res_fandscomb.length > res_roomfands.length) {
                if(res_roomfands.length === 0) {
                    console.log("Inside If")
                    //setResult(result.data_active)
                    initialCreateFxn(res_fandscomb)

                    const response = await fetch(`/api/pms/property_master/room_fands?hotelId=${hotel_id.toString()}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    const result = await response.json();
                    setResult(result.data_by_id)
                }else{
                    setResult(result.pms_propertymaster_roomfands)
                    initialCreateFxn(res_fandscomb)
                }
                
            }else if(res_fandscomb.length < res_roomfands.length) {
                let re = res_roomfands.filter(obj1 => !res_fandscomb.some(obj2 => obj2.fands_category === obj1.fands_category));
        
                let payload;
                re.map(async (items) => {
                    payload = {
                        Hotel_Id: hotel_id,
                        fands_category: items.fands_category,
                        operation: "deleteExtra",
                    }
                    const response = await fetch('/api/pms/property_master/room_fands', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(payload),
                    });
                    const result = await response.json();
                })
                
                
                setResult(result.pms_propertymaster_roomfands)
            }else{
                console.log("Inside Else")
                setResult(result.pms_propertymaster_roomfands)
                setArr(result.pms_propertymaster_roomfands)
                let res = result.pms_propertymaster_roomfands;
                let init = [];
                res?.map((item) => {
                    if(item.availability === true) {
                        init.push(item.fands_itemid)
                    }
                })
                setSelectedCheckBoxes(init)
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



    const generateUniqueID = () => {

        const newID = `PMSFS${String(lastID + 1).padStart(5, '0')}`;
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

    const initialCreateFxn = async (res_fandscomb) => {
        let payload = {};

            try {


                {res_fandscomb?.map(async (item,index) => {
    
                        payload = {
                            id: generateUniqueID(),
                            Hotel_Id: parseInt(hotel_id),
                            fands_category: item.fands_category,
                            fands_categoryid: item.fands_categoryid,
                            fands_item: item.fands_item,
                            fands_itemid: item.fands_itemid,
                            availability: false,
                            creation_date: getCurrentDateTime(),
                            last_update_on: getCurrentDateTime(),
                            operation: "add",
                        }
                        
                        arr.push(payload)
    
    
                    const response = await fetch('/api/pms/property_master/room_fands', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(payload),
                    });
                    const result = await response.json();

                })}
            } catch (error) {
                console.error("Error fetching data:", error);
            }


    }

    useEffect(() => {

        console.log("Selected Checks::::::>",selectedCheckBoxes, arr)

        arr?.forEach((item) => {

            const isAvailable = selectedCheckBoxes?.some(
                (selectedId) => selectedId === item.fands_itemid
            );
            item.availability = isAvailable;
        });
       

        console.log("Array:::::::>",arr)
        
    }, [selectedCheckBoxes])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleSubmit = useCallback(async () => {

        console.log("Save Array Like: ",arr)
        let payload;
        payload = {
            Hotel_Id: hotel_id,
            operation: "delete",
        }
        const response = await fetch('/api/pms/property_master/room_fands', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        const result = await response.json();

        const fetchPromises = arr?.map(async (item,index) => {

                payload = {
                    id: generateUniqueID(),
                    Hotel_Id: parseInt(hotel_id),
                    fands_category: item.fands_category,
                    fands_categoryid: item.fands_categoryid,
                    fands_item: item.fands_item,
                    fands_itemid: item.fands_itemid,
                    availability: item.availability,
                    creation_date: getCurrentDateTime(),
                    last_update_on: getCurrentDateTime(),
                    operation: "add",
                }


        const response = await fetch('/api/pms/property_master/room_fands', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        return response.json(); 

    })
    const results = await Promise.all(fetchPromises);
            
            
            const allSuccess = results.every(result => result.success === true);
        
            if (allSuccess) {
                toast.success("Data Saved");
            }else{
                toast.error("Error Occured");
            }

    })

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

                setSelectedCheckBoxes([])

        
                let payload = {
        
                    Hotel_Id: hotel_id,
           
                    availability: false,
        
                    operation: "reset",
                }
        
                const response = await fetch('/api/pms/property_master/room_fands', {
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
                <div>
                <h1 className='text-2xl text-foreground-300 font-semibold'>rvices</h1>
                <h4 className='text-sm text-foreground-300'>Listing your facilities can really help influence guests to book! Update the ones available at your property or on-site below.</h4>
                </div>
            <Button variant='shadow' color='primary' onClick={handleSubmit}>Save</Button>
            <Button variant='shadow' color='primary' onClick={handleReset}>Reset</Button>
            </div>

            {/* Top facilities */}
            {result && Array.isArray(result) && [...new Set(result?.map(item => item.fands_category))].map((fands_category) => (
                // eslint-disable-next-line react/jsx-key
                <div className='bg-foreground-800 h-fit rounded-xl m-4 p-4 shadow-xl'>
                <h1 className='text-xl text-foreground-300 font-semibold'>{fands_category}</h1>
                
                {fands_category === "Top facilities" 
                
                    ? <CheckboxGroup                  
                        color="warning"
                        value={selectedCheckBoxes}
                        onValueChange={setSelectedCheckBoxes}
                    >
                            <div className='w-full flex justify-between'>
                            
                            {result.filter((item) => item.fands_category === fands_category).map((items) => (
                                // eslint-disable-next-line react/jsx-key
                                <div className='flex gap-4 justify-between mt-2'>
                                    <AirConditioner className="size-8" />
                                    <h4 className='text-base text-foreground-300'>{items.fands_item}</h4>
                                    <Checkbox key={items.fands_item} value={items.fands_itemid}></Checkbox>
                                </div>
                                ))}
                            </div>
                        </CheckboxGroup>
                    : <div className='w-full flex flex-col'>
                        <CheckboxGroup        
                            color="warning"
                            value={selectedCheckBoxes}
                            onValueChange={setSelectedCheckBoxes}
                        >
                        {result.filter((item) => item.fands_category === fands_category).map((items) => (   
                            <div key = "" className='flex gap-4 justify-between mt-2'>
                                <h4 className='text-base text-foreground-300'>{items.fands_item}</h4>
                                <Checkbox key={items.fands_item} value={items.fands_itemid}></Checkbox>
                            </div>
                        ))}
                        </CheckboxGroup>
                      </div>
                }
            </div>
            ))}
            

            {/* Safety features */}
          


        </>
    )
}

export default FacilitiesAndServicesPage;