'use client'
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Tabs, Tab, Card, CardBody, CardHeader, Select, SelectItem, Chip, Button, Divider } from "@nextui-org/react";
import { CiCircleCheck } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { VscHistory } from "react-icons/vsc";
import InfoModal from "@/app/(booking)/(userprofile)/refund/InfoModal"
import Stepper from "@/app/(booking)/(userprofile)/refund/Stepper"
import {useDispatch} from "react-redux";
import { handleRefundSelect } from "@/app/redux/slices/refundSlice";
import { handleRefundBooking } from "@/app/redux/slices/refundSlice";


const filtersvalue = [
    { label: "All", value: "all" },
    { label: "Last Month", value: "lastmonth" },
    { label: "Last 3 Month", value: "last3month" },
];

export default function RefundTabb({onResult, onResultBooking, user_Id}) {
    const [selected, setSelected] = React.useState("photos");
    const [currentStep, setCurrentStep] = useState(2);
    const [ resultById, setResultById ] = useState([]);
    const [ refundDataAll, setRefundDataAll ] =useState([]);
    const [selectedFilter, setSelectedFilter] = useState("all");

    const dispatch = useDispatch();   
    

    const initialFxn = async (user_Id) => {

        try {
            const response1 = await fetch(`/api/userApi/bookings?user_Id=${user_Id}`, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
              },
            });
            const result1 = await response1.json();

            console.log("result1: ",result1)

            if(result1.data_refund) {
                setResultById(result1.data_refund)
                onResultBooking(result1.data_refund)
            }

            // if(result1.data_by_id) {
            //   update({ favourites: result1.data_by_id.favourites });
            //   fav = session?.user?.favourites;
            //   search_facilities(fav)
            // }
    
    
            const response = await fetch(`/api/userApi/refund?user_Id=${user_Id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
              });
              const result = await response.json();
              setRefundDataAll(result.data_All)
              onResult(result.data_All)
    
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    
      useEffect(() => {
    
              initialFxn(user_Id);
    
      }, [user_Id])

    const steps = [
        {
            title: 'Request Raised',
            initializing: 'Wating...',
            pending: 'Wating for Confirmation...',
            done: '24 March 2024 09:00 am',
        },
        {
            title: 'Claim Processed',
            initializing: 'Wating...',
            pending: 'Processing Claim...',
            done: '24 March 2024 09:00 am',
        },
        {
            title: 'Credited in account',
            initializing: 'Wating...',
            pending: 'Wating for Confirmation...',
            done: '24 March 2024 09:00 am',
        },
    ];

    const formatDate = (dateString) => {
        if (!dateString) return { day: null, month: null };

        const [day, monthIndex] = dateString.split("-").map((part, index) => index === 0 ? parseInt(part, 10) : parseInt(part, 10) - 1);
        const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const month = months[monthIndex];
        return { day, month };
    };

    useEffect(() => {

        // if(refundDataAll) {
    
        //   if(refundDataAll?.pflag0 === 1){
        //     setCurrentStep(0)
        //   }else if(refundDataAll?.pflag1 === 1){
        //     setCurrentStep(1)
        //   }else if(refundDataAll?.pflag2 === 1){
        //     setCurrentStep(2)
        //   }else if(refundDataAll?.pflag3 === 1){
        //     setCurrentStep(3)
        //   }
        // }else{
    
        //   if(result[0]?.pflag0 === 1){
        //     setCurrentStep(0)
        //   }else if(result[0]?.pflag1 === 1){
        //     setCurrentStep(1)
        //   }else if(result[0]?.pflag2 === 1){
        //     setCurrentStep(2)
        //   }else if(result[0]?.pflag3 === 1){
        //     setCurrentStep(3)
        //   }
        // }
    
        // if(selectedItem?.hour3_display_flag === 1) {
        //   setHour("3")
        // }else if(selectedItem?.hour6_display_flag === 1) {
        //   setHour("6")
        // }else if(selectedItem?.hour12_display_flag === 1) {
        //   setHour("12")
        // }else if(selectedItem?.hour24_display_flag === 1) {
        //   setHour("24")
        // }
    
    
      }, [refundDataAll])

      const handleItemClick = async (item) => {

        dispatch(handleRefundSelect(item));
        const response1 = await fetch(`/api/userApi/refund?user_Id=${user_Id}&booking_id=${item.booking_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
          });
          const result1 = await response1.json();
          console.log("Booking Result: ",result1.data_refund_booking)
        dispatch(handleRefundBooking(result1.data_refund_booking));
    }
    

    const handleSelectionChange = (e) => {
        setSelectedFilter(e.target.value);
      };

      const filterResults = () => {
        if (selectedFilter === "all") {
            return resultById;
        } else if (selectedFilter === "lastmonth") {

            const today = new Date();

            const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);

            const firstDayOfPreviousMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);

            const lastDayOfPreviousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        
            return resultById.filter(item => {

                const bookingDateParts = item.booking_date.split('-');
                const bookingDate = new Date(bookingDateParts[2], bookingDateParts[1] - 1, bookingDateParts[0]);

                if (isNaN(bookingDate.getTime())) {
                    console.log("Invalid booking date:", item.booking_date);
                    return false;
                }

                return bookingDate >= firstDayOfPreviousMonth && bookingDate <= lastDayOfPreviousMonth;
            });
        }else if (selectedFilter === "last3month") {

            const today = new Date();

            const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);

            const firstDayOfPrevious3Months = new Date(today.getFullYear(), today.getMonth() - 3, 1);

            const lastDayOfPreviousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        
            return resultById.filter(item => {

                const bookingDateParts = item.booking_date.split('-');
                const bookingDate = new Date(bookingDateParts[2], bookingDateParts[1] - 1, bookingDateParts[0]);

                if (isNaN(bookingDate.getTime())) {
                    console.log("Invalid booking date:", item.booking_date);
                    return false;
                }

                return bookingDate >= firstDayOfPrevious3Months && bookingDate <= lastDayOfPreviousMonth;
            });
        }
        
    };
    
    const filteredResults = filterResults();

    return (
        <div className="flex w-full h-full flex-col relative overflow-y-scroll">
            <Tabs
                aria-label="Options"
                selectedKey={selected}
                onSelectionChange={setSelected}
                variant="underlined"
                color="primary"
            >
                <Tab key="myrefund" title="My Refund">
                {resultById?.map((item) => (
                    // eslint-disable-next-line react/jsx-key
                    <Card className="overflow-y-scroll shadow-none">
                        <CardBody>
                            <div className="mt-4 p-1" onClick={(e) => handleItemClick(item)}>
                                <div className="grid grid-cols-5">
                                    <div>
                                        <h1 className="text-lg font-bold text-gray-400">{formatDate(item.booking_date).day}</h1>
                                        <h4 className="text-[10px] text-gray-400">{formatDate(item.booking_date).month}</h4>
                                    </div>
                                    <div>
                                        <h1 className="text-lg font-bold text-gray-400">{item.Hotel_name}</h1>
                                        <h4 className="text-sm text-gray-400">{item.booking_time}</h4>
                                    </div>
                                    <div className="flex justify-between items-center">
                                    {item.status === "inprocess" 
                                        ? <Chip color="primary" variant="flat" className="bg-primary-50" startContent={<VscHistory size={20} />}>in Process</Chip>
                                        : item.status === "cancelled" 
                                        ? <Chip color="danger" variant="flat" className="bg-danger-50" startContent={<IoIosCloseCircleOutline size={21} />} >Cancelled</Chip>
                                        : item.status === "booked" 
                                        ? <Chip color="success" variant="flat" className="bg-success-50" startContent={<CiCircleCheck size={21} />} >Booked</Chip>
                                        : ""}
                                    </div>
                                    <div className="flex flex-col justify-between items-center">
                                        <h1 className="text-lg font-semibold text-gray-400">₹ {item.price}</h1>
                                        <h4 className="text-sm text-gray-400">Per Night</h4>
                                    </div>
                                    <div className="justify-between items-center flex">
                                        
                            {refundDataAll.map((item1) => (
                                // eslint-disable-next-line react/jsx-key
                                item.booking_id === item1.booking_id 
                                    ? <Button key= "" color="primary" variant="light" onClick={(e) => {console.log("Clickedddd",item1.rFlag0)}} disabled={item1.rFlag0 === 1} style={item1.rFlag0 === 1 ? { opacity: 0.6, pointerEvents: 'none' } : {}}>Download Receipt</Button>
                                    : ""

                            ))}
                                            
                                        </div>
                                </div>
                            </div>
                            <Divider className="w-full" />
                            <div className="flex justify-between">
                                <h5>Your refund request for refund amount of ₹ {item.price} is been processed</h5>
                                <div className="flex">
                                    <Button color="primary" variant="light" size="sm">How dose it work ?</Button>
                                    <InfoModal />
                                </div>
                            </div>
                            <div className="w-[60%]">
                            {refundDataAll.map((item1) => (
                                // eslint-disable-next-line react/jsx-key
                                item.booking_id === item1.booking_id 
                                    ? item1.rFlag0 === 1 
                                        // eslint-disable-next-line react/jsx-key
                                        ? <Stepper steps={steps} currentStep={0} /> 
                                        : item1.rFlag1 === 1 
                                            ? <Stepper steps={steps} currentStep={1} />
                                            : item1.rFlag2 === 1
                                                ? <Stepper steps={steps} currentStep={2} />
                                                : item1.rFlag3 === 1 
                                                    ? <Stepper steps={steps} currentStep={3} />
                                                    : <Stepper steps={steps} currentStep={0}/>
                                    : ""
                               
                                
                            ))}
                               
                            </div>
                            <div className="flex gap-2">
                                <CiCircleCheck size={25} className="text-primary" />
                                <h5 className="text-sm text-gray-500"> ₹ {item.price} has been processed in UPI, refund with RRN number 55360306539 has been processed to your account.</h5>
                            </div>
                            <Chip color="" variant="flat" size="sm" className="bg-warning-100 text-warning mt-2 ml-6" >It take 5-6 working days for refund to reflect in UPI account</Chip>
                        </CardBody>
                    </Card>
                ))}
                    
                </Tab>
                <Tab key="history" title="History">
                
                    <Card className="overflow-y-scroll shadow-none">
                        <CardBody>
                        <Select
                                size="sm"
                                className="w-40"
                                variant="bordered"
                                defaultSelectedKeys={["all"]}
                                onChange={handleSelectionChange}
                            >
                                {filtersvalue.map((filtervalue) => (
                                    <SelectItem key={filtervalue.value} value={filtervalue.value}>
                                        {filtervalue.label}
                                    </SelectItem>
                                ))}
                            </Select>
                            {filteredResults?.map((item) => (
                            <><div className="mt-4 p-1" onClick={(e) => handleItemClick(item)}>
                                    <div className="grid grid-cols-5">
                                        <div>
                                            <h1 className="text-lg font-bold text-gray-400">{formatDate(item.booking_date).day}</h1>
                                            <h4 className="text-[10px] text-gray-400">{formatDate(item.booking_date).month}</h4>
                                        </div>
                                        <div>
                                            <h1 className="text-lg font-bold text-gray-400">{item.Hotel_name}</h1>
                                            <h4 className="text-sm text-gray-400">{item.booking_time}</h4>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            {item.status === "inprocess"
                                                ? <Chip color="primary" variant="flat" className="bg-primary-50" startContent={<VscHistory size={20} />}>in Process</Chip>
                                                : item.status === "cancelled"
                                                    ? <Chip color="danger" variant="flat" className="bg-danger-50" startContent={<IoIosCloseCircleOutline size={21} />}>Cancelled</Chip>
                                                    : item.status === "booked"
                                                        ? <Chip color="success" variant="flat" className="bg-success-50" startContent={<CiCircleCheck size={21} />}>Booked</Chip>
                                                        : ""}
                                        </div>
                                        <div className="flex flex-col justify-between items-center">
                                            <h1 className="text-lg font-semibold text-gray-400">₹ {item.price}</h1>
                                            <h4 className="text-sm text-gray-400">Per Night</h4>
                                        </div>
                                        <div className="justify-between items-center flex">

                                            {refundDataAll.map((item1) => (
                                                // eslint-disable-next-line react/jsx-key
                                                item.booking_id === item1.booking_id
                                                    ? <Button key="" color="primary" variant="light" onClick={(e) => { console.log("Clickedddd", item1.rFlag0); } } disabled={item1.rFlag0 === 1} style={item1.rFlag0 === 1 ? { opacity: 0.6, pointerEvents: 'none' } : {}}>Download Receipt</Button>
                                                    : ""

                                            ))}

                                        </div>
                                    </div>
                                </div><Divider className="w-full" /><div className="flex justify-between">
                                        <h5>Your refund request for refund amount of ₹ {item.price} is been processed</h5>
                                        <div className="flex">
                                            <Button color="primary" variant="light" size="sm">How dose it work ?</Button>
                                            <InfoModal />
                                        </div>
                                    </div><div className="w-[60%]">
                                        {refundDataAll.map((item1) => (
                                            // eslint-disable-next-line react/jsx-key
                                            item.booking_id === item1.booking_id
                                                ? item1.rFlag0 === 1
                                                    // eslint-disable-next-line react/jsx-key
                                                    ? <Stepper steps={steps} currentStep={0} />
                                                    : item1.rFlag1 === 1
                                                        ? <Stepper steps={steps} currentStep={1} />
                                                        : item1.rFlag2 === 1
                                                            ? <Stepper steps={steps} currentStep={2} />
                                                            : item1.rFlag3 === 1
                                                                ? <Stepper steps={steps} currentStep={3} />
                                                                : <Stepper steps={steps} currentStep={0} />
                                                : ""


                                        ))}

                                    </div><div className="flex gap-2">
                                        <CiCircleCheck size={25} className="text-primary" />
                                        <h5 className="text-sm text-gray-500"> ₹ {item.price} has been processed in UPI, refund with RRN number 55360306539 has been processed to your account.</h5>
                                    </div><Chip color="" variant="flat" size="sm" className="bg-warning-100 text-warning mt-2 ml-6">It take 5-6 working days for refund to reflect in UPI account</Chip></>
                        ))}
                            </CardBody>
                    </Card>
                
                    {/* <Card className="overflow-y-scroll shadow-none">
                        <CardBody >
                            <Select
                                size="sm"
                                className="w-40"
                                variant="bordered"
                                defaultSelectedKeys={["all"]}
                            >
                                {filtersvalue.map((filtervalue) => (
                                    <SelectItem key={filtervalue.value} value={filtervalue.value}>
                                        {filtervalue.label}
                                    </SelectItem>
                                ))}
                            </Select>
                            <div className="mt-4 p-1">
                                <div className="grid grid-cols-5">
                                    <div>
                                        <h1 className="text-lg font-bold text-gray-400">21</h1>
                                        <h4 className="text-[10px] text-gray-400">March</h4>
                                    </div>
                                    <div>
                                        <h1 className="text-lg font-bold text-gray-400">Renaissance</h1>
                                        <h4 className="text-sm text-gray-400">9:00 am to 3:00 pm</h4>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <Chip color="" variant="flat" className="bg-orange-100 text-orange-500" startContent={<VscHistory size={20} />} >in Process</Chip>
                                    </div>
                                    <div className="flex flex-col justify-between items-center">
                                        <h1 className="text-lg font-semibold text-gray-400">₹ 7600</h1>
                                        <h4 className="text-sm text-gray-400">Per Night</h4>
                                    </div>
                                    <div className="justify-between items-center flex">
                                        <Button color="primary" variant="light" >Download Receipt</Button>
                                    </div>
                                </div>
                            </div>
                            <Divider className="w-full" />
                            <div className="mt-4 p-1">
                                <div className="grid grid-cols-5">
                                    <div>
                                        <h1 className="text-lg font-bold text-gray-400">16</h1>
                                        <h4 className="text-[10px] text-gray-400">March</h4>
                                    </div>
                                    <div>
                                        <h1 className="text-lg font-bold text-gray-400">Om Palace</h1>
                                        <h4 className="text-sm text-gray-400">9:00 am to 3:00 pm</h4>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <Chip color="success" variant="flat" className="bg-success-50" startContent={<CiCircleCheck size={21} />} >Processed</Chip>
                                    </div>
                                    <div className="flex flex-col justify-between items-center">
                                        <h1 className="text-lg font-semibold text-gray-400">₹ 1254</h1>
                                        <h4 className="text-sm text-gray-400">Per Night</h4>
                                    </div>
                                    <div className="justify-between items-center flex">
                                        <Button color="primary" variant="light" >Download Receipt</Button>
                                    </div>
                                </div>
                            </div>
                            <Divider className="w-full" />
                            <div className="mt-4 p-1">
                                <div className="grid grid-cols-5">
                                    <div>
                                        <h1 className="text-lg font-bold text-gray-400">07</h1>
                                        <h4 className="text-[10px] text-gray-400">March</h4>
                                    </div>
                                    <div>
                                        <h1 className="text-lg font-bold text-gray-400">Tulip</h1>
                                        <h4 className="text-sm text-gray-400">9:00 am to 3:00 pm</h4>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <Chip color="success" variant="flat" className="bg-success-50" startContent={<CiCircleCheck size={21} />} >Processed</Chip>
                                    </div>
                                    <div className="flex flex-col justify-between items-center">
                                        <h1 className="text-lg font-semibold text-gray-400">₹ 4299</h1>
                                        <h4 className="text-sm text-gray-400">Per Night</h4>
                                    </div>
                                    <div className="justify-between items-center flex">
                                        <Button color="primary" variant="light" >Download Receipt</Button>
                                    </div>
                                </div>
                            </div>
                            <Button color='' variant='light' className='relative text-primary' >see more</Button>
                        </CardBody>
                    </Card> */}
                </Tab>
            </Tabs>
        </div>
    );
};