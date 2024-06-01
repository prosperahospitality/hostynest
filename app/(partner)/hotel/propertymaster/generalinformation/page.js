'use client'
import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from 'next/image'
import Keralafarm from "@/public/img/Heroimages/Keralafarm.jpg"
import { Card, Button, Chip, Progress } from "@nextui-org/react";
import { ShieldCheck, ShieldX, Link2, Link2Off, Star } from "lucide-react"
import EditContentFormModal from "@/app/(partner)/hotel/EditContentFormModal"
import { HiOutlineLightBulb } from "react-icons/hi";
import EditReviewsFormModal from '@/app/(partner)/hotel/propertymaster/generalinformation/EditReviewsFormModal'
import BankGstDetailsModal from '@/app/(partner)/hotel/propertymaster/generalinformation/BankGstDetailsModal';
import { useSearchParams } from 'next/navigation'
import Link from 'next/link';

const GeneralInformation = () => {
    const searchParams = useSearchParams();
    const hotel_id = searchParams.get('hotel_id');
    const [ result, setResult ] = useState({});
    const [ bankResult, setBankResult ] = useState({});

    useEffect(() => {
        initialFxn()
    }, [])
  
    const initialFxn = async () => {
        try {
            const response = await fetch("/api/hotels/hotel_info/hotel_by_id", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "hotelId" : hotel_id })
            });
            const result = await response.json();
            console.log("Data:", result);
            setResult(result.data);

            const responseBank = await fetch("/api/hotels/bank_details", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "hotelId" : hotel_id, operation : "bankByID" })
            });
            const resultBank = await responseBank.json();
            console.log("Data of Bank:", resultBank);
            setBankResult(resultBank.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

  const handleDataPass = (data,operation) => {
    console.log("handleDataPass ",data)
    if(operation === "editContact"){
        setResult(data);
    }else if(operation === "editExpiryDate"){
        setResult(data);
    }else{
        setBankResult(data)
    }
     
  }


    return (
        <>
            <div className='bg-foreground-50 h-40 rounded-xl m-4 shadow-xl'>
                <div className='w-fit h-36 ml-4 pt-2 flex gap-4'>
                    <Card
                        radius="lg"
                        className="border-none h-32 m-2 shadow-none"
                    >
                        <Image
                            alt="Hotel Hero Image"
                            className="object-cover"
                            height={200}
                            src={'/img/' + [result?.Hotel_name?.toString().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join("")] + '/1.jpg'}
                            width={200}
                        />
                    </Card>
                    <div>
                        <div className='flex' >
                            <h4 className='text-2xl mt-2 text-foreground-300'>{result.Hotel_Id} - {result.Hotel_name}</h4>
                            {result.status === "Active" 
                                ? <Chip color="success" variant="shadow" size='sm' className='mt-3 ml-8 text-white' startContent={<ShieldCheck className='size-4' />}>Active</Chip>
                                : <Chip color="warning" variant="shadow" size='sm' className='mt-3 ml-8 text-white' startContent={<ShieldX className='size-4' />}>Deactive</Chip>
                            }
                            
                        </div>
                        <p className='text-foreground-500 mt-2 mb-2'>Your hotel&apos;s Details, Bank Information, reviews and staff Details</p>
                        <Button variant='light' color='' size='sm' className="text-foreground-300 font-semibold" onClick={(e) => {window.open(`/bookings/hourlybooking/hotels/${result.Hotel_name}?hotelName=${result.Hotel_name}&hotelId=${result.Hotel_Id}`, '_blank')}}>View Your Hotel</Button>
                        <Button variant='shadow' color='primary' size='sm' className='ml-4'>Download Agreement</Button>
                    </div>
                    <Image
                        alt="Woman listing to music"
                        className="object-cover ml-40"
                        height={80}
                        src="https://www.svgrepo.com/show/509004/avatar-thinking-7.svg"
                        width={120}
                    />
                </div>
            </div>
            <div className='w-full flex'>
                <div className='bg-foreground-50 h-fit w-1/2 rounded-xl m-4 p-4 shadow-xl'>
                    <div className=''>
                        <div className='flex justify-between items-end '>
                            <h4 className='text-foreground-400 m-2'>Hotel Contact and Address</h4>
                            < EditContentFormModal operation = "edit_contactdetails" hotel_id = {hotel_id} onDataPass={handleDataPass} result={result}/>
                        </div>
                        <div className='grid grid-cols-2 m-2 gap-1'>
                            <h4 className='text-foreground-500'>Hotel Contact:</h4>
                            <h4 className='text-foreground-300'>{result.Phone_Number}</h4>
                            <h4 className='text-foreground-500'>Reception Contact:</h4>
                            <h4 className='text-foreground-300'>{result.reception_number}</h4>
                            <h4 className='text-foreground-500'>Hotel Email:</h4>
                            <h4 className='text-foreground-300'>{result.Email}</h4>
                            <h4 className='text-foreground-500'>Hotel Secondary Email:</h4>
                            <h4 className='text-foreground-300'>{result.secondary_email}</h4>
                            <h4 className='text-foreground-500'>Hotel Address:</h4>
                            <h4 className='text-foreground-300'>{result.Address}</h4>
                        </div>
                    </div>
                </div>
                <div className='w-1/2'>
                    <div className='bg-foreground-50 h-fit rounded-xl m-4 p-4 shadow-xl'>
                        <div className=''>
                            <div className='flex justify-between'>
                                <h4 className='text-foreground-400 mt-2'>Bank & GST Details</h4>
                                {bankResult.status === "linked" 
                                    ? <Chip color="success" variant="shadow" size='sm' className='ml-2 mt-2 text-white' startContent={<Link2 className='size-4 m-1' />}>Linked</Chip>
                                    : <Chip color="danger" variant="shadow" size='sm' className='ml-2 mt-2 text-white' startContent={<Link2Off className='size-4 m-1' />}>UnLinked</Chip>
                                }
                                
                                <BankGstDetailsModal />
                                <div className="flex flex-wrap gap-3 ml-12">
                                    < EditContentFormModal operation = "edit_bankdetails" hotel_id = {hotel_id} onDataPass={handleDataPass} bankResult={bankResult}/>
                                </div>
                            </div>
                            <div className='grid grid-cols-2 m-2 gap-1'>
                                <h4 className='text-foreground-500'>Bank Name:</h4>
                                <h4 className='text-foreground-300'>{bankResult && bankResult.bank_name}</h4>
                                <h4 className='text-foreground-500'>Acount Holder Name:</h4>
                                <h4 className='text-foreground-300'>{bankResult && bankResult.account_holder_name}</h4>
                                <h4 className='text-foreground-500'>Account Number:</h4>
                                <h4 className='text-foreground-300'>{bankResult && bankResult.account_number}</h4>
                                <h4 className='text-foreground-500'>IFSC Code:</h4>
                                <h4 className='text-foreground-300'>{bankResult && bankResult.ifsc_number}</h4>
                                <h4 className='text-foreground-500'>PAN Code:</h4>
                                <h4 className='text-foreground-300'>{bankResult && bankResult.pan_number}</h4>
                            </div>
                        </div>
                    </div>
                    <div className='bg-foreground-50 h-fit rounded-lg m-4 p-2 shadow-xl'>
                        <div className='grid grid-cols-3 justify-items-end'>
                            <h4 className='text-foreground-500 mt-2 mr-3'>Lease Expiry Date:</h4>
                            <h4 className='text-foreground-300 mt-2'>{result.lease_expiry_date}</h4>
                            < EditContentFormModal operation = "edit_expirydate" hotel_id = {hotel_id} result = {result} onDataPass={handleDataPass}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-foreground-50 h-fit rounded-xl m-4 p-4 shadow-xl'>
                <div className=''>
                    <div className='flex justify-between items-end'>
                        <h4 className='text-foreground-400 m-4 text-lg'>Hotel Reviews</h4>
                        <EditReviewsFormModal />
                    </div>
                    <div className='m-2 flex'>
                        <Star className="sixe-6" fill="#FCB332" strokeWidth={0} />
                        <h4 className='text-foreground-400'>{result.rating} rating based on {result.user_review_count} customer reviews</h4>
                    </div>
                    <div className='grid grid-cols-6 ml-6'>
                        <h4 className='text-foreground-400'>Smooth Check-in</h4>
                        <Progress aria-label="Loading..." color="warning" value={((result?.smooth_check_in - 1) * (100 - 1) / (5 - 1))} className="max-w-md mt-2" />
                        <h5 className='text-foreground-500 text-sm m-1'>{result.smooth_check_in}</h5>
                        <h4 className='text-foreground-400 ml-4'>Room Quality</h4>
                        <Progress aria-label="Loading..." color="warning" value={((result?.room_quality - 1) * (100 - 1) / (5 - 1))} className="max-w-md mt-2" />
                        <h5 className='text-foreground-500 text-sm m-1'>{result.room_quality}</h5>
                    </div>
                    <div className='grid grid-cols-6 ml-6 mt-4'>
                        <h4 className='text-foreground-400'>Staff Behaviour</h4>
                        <Progress aria-label="Loading..." color="warning"  value={((result?.staff_behaviour - 1) * (100 - 1) / (5 - 1))} className="max-w-md mt-2" />
                        <h5 className='text-foreground-500 text-sm m-1'>{result.staff_behaviour}</h5>
                        <h4 className='text-foreground-400 ml-4'>Hotel Surroundings</h4>
                        <Progress aria-label="Loading..." color="warning"  value={((result?.hotel_surroundings - 1) * (100 - 1) / (5 - 1))} className="max-w-md mt-2" />
                        <h5 className='text-foreground-500 text-sm m-1'>{result.hotel_surroundings}</h5>
                    </div>
                    <div className='bg-primary-200 m-6 h-fit rounded-xl'>
                        <div className='bg-primary-100 rounded-t-xl flex p-2 text-primary justify-center'>
                            <HiOutlineLightBulb className='size-6 ml-4' />
                            <h4 className='ml-2 text-primary'>Tips For Better Reviews</h4>
                        </div>
                        <p className='text-primary m-4 p-2'>
                            It is always advised to greet customer when they arrive or they leave. Make sure you accomodate them to their room and prepare heamenities such as AC, WIFI, Fridge, Water etc. Keep their check-in hassle free with multiple payment options and document verification. Offer them hot food and keep the rooms perfectly cleaned. most customers love when their bath water is pre heated in winters and cold in summers. And most important keep and everuthing fresh, your room should smell really nice and always be ready for them if they need anything.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GeneralInformation;