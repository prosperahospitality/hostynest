'use client'
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Tabs, Tab, Card, CardBody, CardHeader, Select, SelectItem, Chip, Button, Divider } from "@nextui-org/react";
import { CiCircleCheck } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { VscHistory } from "react-icons/vsc";

const filtersvalue = [
    { label: "All", value: "all" },
    { label: "Last Month", value: "lastmonth" },
    { label: "Last 3 Month", value: "last3month" },
];

export default function BookingTab ({onResult, user_Id, onItemSelected, deleteFlag, deletedBooking}) {
    const [selected, setSelected] = React.useState("photos");
    const [result, setResult] = React.useState([]);
    const [selectedFilter, setSelectedFilter] = React.useState("all");
    
  const initialFxn = async (user_Id) => {
        try {
            const response = await fetch(`/api/userApi/bookings?user_Id=${user_Id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
            setResult(result.data)
            onResult(result.data)

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {

            initialFxn(user_Id);

    }, [user_Id])

    useEffect(() => {

        console.log("Deleted Booking: ",deletedBooking)

        if(deleteFlag) {
            setResult(deletedBooking)
        }

}, [deleteFlag, deletedBooking])

    const formatDate = (dateString) => {
        if (!dateString) return { day: null, month: null };

        const [day, monthIndex] = dateString.split("-").map((part, index) => index === 0 ? parseInt(part, 10) : parseInt(part, 10) - 1);
        const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const month = months[monthIndex];
        return { day, month };
    };

    const handleItemClick = (item) => {
        onItemSelected(item)
    }

    const handleSelectionChange = (e) => {
        setSelectedFilter(e.target.value);
      };

      const filterResults = () => {
        if (selectedFilter === "all") {
            return result;
        } else if (selectedFilter === "lastmonth") {

            const today = new Date();

            const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);

            const firstDayOfPreviousMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);

            const lastDayOfPreviousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        
            return result.filter(item => {

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
        
            return result.filter(item => {

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
                <Tab key="mybookings" title="My Bookings">
                    <Card className="overflow-y-scroll shadow-none">
                        <CardBody >
                            <Select
                                size="sm"
                                className="w-40"
                                variant="bordered"
                                defaultSelectedKeys={["all"]}
                                onChange={handleSelectionChange}
                            >
                                {filtersvalue?.map((filtervalue) => (
                                    <SelectItem key={filtervalue.value} value={filtervalue.value}>
                                        {filtervalue.label}
                                    </SelectItem>
                                ))}
                            </Select>
                            {filteredResults && filteredResults?.map((item) => (
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
                                        {item.status === "inprocess" && item.refund_flag === 0
                                                ? <Chip color="primary" variant="flat" className="bg-primary-50" startContent={<VscHistory size={20} />}>in Process</Chip>
                                                : item.status === "cancelled" || item.refund_flag === 1
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
                                            <Button color="primary" variant="light" onClick={(e) => {console.log("Clicked",item.pflag0)}} disabled={item.pflag0 === 1} style={item.pflag0 === 1 ? { opacity: 0.6, pointerEvents: 'none' } : {}}>Download Receipt</Button>
                                        </div>
                                    </div>
                                </div><Divider className="w-full" /></>
                            ))}
                           
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="confirmed" title="Confirmed">
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
                            {filteredResults && filteredResults?.map((item) => (
                                item.status === "booked" 
                                ? <><div className="mt-4 p-1" onClick={(e) => handleItemClick(item)}>
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
                                            <Chip color="success" variant="flat" className="bg-success-50" startContent={<CiCircleCheck size={21} />}>Booked</Chip>
                                        </div>
                                        <div className="flex flex-col justify-between items-center">
                                            <h1 className="text-lg font-semibold text-gray-400">₹ {item.price}</h1>
                                            <h4 className="text-sm text-gray-400">Per Night</h4>
                                        </div>
                                        <div className="justify-between items-center flex">
                                            <Button color="primary" variant="light">Download Receipt</Button>
                                        </div>
                                    </div>
                                </div><Divider className="w-full" /></>
                                : ""
                            ))}
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="inprocess" title="In Process">
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
                            {filteredResults && filteredResults?.map((item) => (
                                item.status === "inprocess" 
                                ?     <><div className="mt-4 p-1" onClick={(e) => handleItemClick(item)}>
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
                                            <Chip color="primary" variant="flat" className="bg-primary-50" startContent={<VscHistory size={20} />}>in Process</Chip>
                                            </div>
                                            <div className="flex flex-col justify-between items-center">
                                                <h1 className="text-lg font-semibold text-gray-400">₹ {item.price}</h1>
                                                <h4 className="text-sm text-gray-400">Per Night</h4>
                                            </div>
                                            <div className="justify-between items-center flex">
                                                <Button color="primary" variant="light">Download Receipt</Button>
                                            </div>
                                        </div>
                                    </div><Divider className="w-full" /></>
                            : ""
                            ))}
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="cancelled" title="Cancelled">
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
                            {filteredResults && filteredResults?.map((item) => (
                                item.status === "cancelled" 
                                ?     <><div className="mt-4 p-1" onClick={(e) => handleItemClick(item)}>
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
                                                <Chip color="danger" variant="flat" className="bg-danger-50" startContent={<IoIosCloseCircleOutline size={21} />}>Cancelled</Chip>
                                            </div>
                                            <div className="flex flex-col justify-between items-center">
                                                <h1 className="text-lg font-semibold text-gray-400">₹ {item.price}</h1>
                                                <h4 className="text-sm text-gray-400">Per Night</h4>
                                            </div>
                                            <div className="justify-between items-center flex">
                                                <Button color="primary" variant="light">Download Receipt</Button>
                                            </div>
                                        </div>
                                    </div><Divider className="w-full" /></>
                            : ""
                            ))}
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </div>
    );
};