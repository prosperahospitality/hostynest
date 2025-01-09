'use client'
import React, { useState, useEffect, useCallback, useRef } from "react";
import RIMainContTopBar from '@/app/(partner)/hotel/rateandinventory/managerateandinventory/RIMainContTopBar'
import Daterangepicker from '@/_components/ui/DateRangePicker'
import { Chip, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Tabs, Tab, Card, CardBody, Input, Slider, RadioGroup, Radio, Switch } from "@nextui-org/react";
import { Save } from 'lucide-react'
import Datepicker from '@/_components/ui/DatePicker';
import Daterangepickerreact from '@/_components/ui/DateRangePickerReact'


const EditModal = ({rowDataID, onEditResult, selectedDateRange, isSoldOut}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [initialDate, setInitialDate] = useState(6);
    const [value, setValue] = React.useState("");
    const [selectedRow, setSelectedRow] = useState();
    const [hr3Rate, sethr3Rate] = React.useState();
    const [hr6Rate, sethr6Rate] = React.useState();
    const [hr12Rate, sethr12Rate] = React.useState();
    const [hr24Rate, sethr24Rate] = React.useState();
    const [totalRooms, setTotalRooms] = React.useState();
    const [hour3Slider, setHour3Slider] = React.useState("12 AM - 11 PM");
    const [hour6Slider, setHour6Slider] = React.useState("12 AM - 11 PM");
    const [hour12Slider, setHour12Slider] = React.useState("12 AM - 11 PM");
    const [isSelected3hr, setIsSelected3hr] = React.useState(true);
    const [isSelected6hr, setIsSelected6hr] = React.useState(true);
    const [isSelected12hr, setIsSelected12hr] = React.useState(true);
    const [selectedRadio, setSelectedRadio] = React.useState("bookable");
    // console.log("Selected Radio: ", selectedRadio)
    
    const handleDateChange = (date) => {
        setSelectedDate(date);
        setShowTimePicker(true);
    };

    const validateAmount = (value) => /^[0-9]+$/.test(value);

    const isInvalid = React.useMemo(() => {
        if (value === '') return false;

        return validateAmount(value) ? false : true;
    }, [value]);

    const handleChange = (event) => {
        const newValue = event.target.value;
        // If the entered value is empty or it consists only of digits
        if (newValue === '' || /^\d+$/.test(newValue)) {
            setValue(newValue);
        }
    };

    const handleEditAction = async (rowDataID) => {
        console.log("Edit: ", rowDataID)



        const response1 = await fetch(`/api/pms/rates_and_inventory/managerateandinventory?rowDataID=${rowDataID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result1 = await response1.json();
        let selec = result1?.rowbyid;
        console.log("selec 000000: ",selec)
        setSelectedRow(result1?.rowbyid)

        sethr3Rate(selec?.rate_3hr)
        sethr6Rate(selec?.rate_6hr)
        sethr12Rate(selec?.rate_12hr)
        sethr24Rate(selec?.rate_24hr)
        setTotalRooms(selec?.total_rooms_count)

        setHour3Slider(selec?.first_checkin_last_checkout_3hr)

        console.log("Row By id: ",result1?.rowbyid)

    }

    const handleSave = async(selectedRow, hour3Slider, hour6Slider, hour12Slider, isSelected3hr,
        isSelected6hr,
        isSelected12hr) => {
        console.log("Row ID: ", hour6Slider, hour12Slider, isSelected3hr,
        isSelected6hr,
        isSelected12hr)
        if(isSelected3hr) {
            isSelected3hr = "Active"
        }else{
            isSelected3hr = "Inactive"
        }

        if(isSelected6hr) {
            isSelected6hr = "Active"
        }else{
            isSelected6hr = "Inactive"
        }

        if(isSelected12hr) {
            isSelected12hr = "Active"
        }else{
            isSelected12hr = "Inactive"
        }

        let payload = {
            rowDataID: rowDataID,
            Hotel_Id: selectedRow?.Hotel_Id,
            room_type: selectedRow?.room_type,
            hr3Rate : hr3Rate,
            hr6Rate : hr6Rate,
            hr12Rate : hr12Rate,
            hr24Rate : hr24Rate,
            totalRooms : totalRooms,
            first_checkin_last_checkout_3hr: hour3Slider,
            first_checkin_last_checkout_6hr: hour6Slider,
            first_checkin_last_checkout_12hr: hour12Slider,
            first_checkin_last_checkout_status_3hr: isSelected3hr,
            first_checkin_last_checkout_status_6hr: isSelected6hr,
            first_checkin_last_checkout_status_12hr: isSelected12hr,
            status: selectedRadio,
            operation: "edit",
        }
        const response = await fetch(`/api/pms/rates_and_inventory/managerateandinventory`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        const result = await response.json();
        console.log("Save Result: ",result.dataAll)
        onEditResult(result.dataAll, selectedDateRange, selectedRow?.id, selectedRow?.booking_date, selectedRow?.room_type, selectedRadio)
    }

    const convertTo12HourFormat = (hour) => {
        let suffix = hour >= 12 ? 'PM' : 'AM';
        let hour12 = hour % 12 || 12;
        return `${hour12} ${suffix}`;
    };

    const handleHourChange = (val, hr) => {

        let format24HrCheckIn = val[0];
        let format24HrCheckOut = val[1];

        let format12HrCheckIn = convertTo12HourFormat(format24HrCheckIn);
        let format12HrCheckOut = convertTo12HourFormat(format24HrCheckOut);

        let comb = format12HrCheckIn + "-" + format12HrCheckOut

        if(hr === "3hr"){
            setHour3Slider(comb.toString())
        }else if(hr === "6hr"){
            setHour6Slider(comb.toString())
        }else if(hr === "12hr") {
            setHour12Slider(comb.toString())
        }


        // if(selectedRadio === "bookable") {

        // }
        
    }

    function convertTo24Hour(hour) {
        const [start, end] = hour.split('-');
        
        const convertTo24 = (time) => {

          const [timePart, meridiem] = time.split(' ');
  
          let hours = parseInt(timePart.split(':')[0], 10);
          
          if (isNaN(hours)) {
            throw new Error("Invalid time format");
          }
          
          if (hours === 12 && meridiem === 'AM') {
            hours = 0;
          } else if (meridiem === 'PM' && hours !== 12) {
            hours += 12;
          }
      
          return hours;
        };
      
        const startTime = convertTo24(start.trim());
        const endTime = convertTo24(end.trim());
        
        return [startTime, endTime];
      }
      

      const handleDateSelect = (val) => {
        setSelectedDate(val)
    }

  return (
    <>
    <Button color='success' variant='shadow' size='sm' startContent={<EditIcon size={15} />} onPress={onOpen} className='text-white' onClick={(e) => handleEditAction(rowDataID)}>Edit</Button>
                                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='5xl' backdrop='opaque'>
                                        <ModalContent>
                                            {(onClose) => (
                                                <>
                                                    <ModalBody>
                                                        <Tabs aria-label="Options">
                                                            <Tab key="photos" title="Update Rate & Rooms" className={`${isSoldOut ? 'opacity-50 pointer-events-none' : ''}`}>
                                                                <Card>
                                                                    <CardBody>
                                                                        <div className='flex items-center'>
                                                                            <h4 className='text-base text-foreground-600 font-semibold'>Selected Date :</h4>
                                                                            &nbsp;<h3 className='text-base text-foreground-600 font-semibold'>{selectedRow?.booking_date}</h3>
                                                                        </div>
                                                                        <div className='flex gap-16 items-center mt-2'>
                                                                            <h4 className='text-base text-foreground-600 font-semibold'>Selected Days :</h4>
                                                                            <Button variant='flat' color='primary' size='sm'>{selectedRow?.booking_date.split(" ").slice(0, 1).join(" ")}</Button>
                                                                        </div>
                                                                        <div className='flex gap-4 items-center mt-2'>
                                                                            <h4 className='flex items-center text-base text-foreground-600 font-semibold'>Enter Rates <h5 className='text-xs text-foreground-300 ml-4'>(GST will automatically be added to the rate you provide)</h5></h4>
                                                                        </div>
                                                                        <div className='grid grid-cols-12'>
                                                                            <div className='col-span-3'>
                                                                                <div className='flex items-center'>
                                                                                    <h4 className='text-sm w-32'>3 Hrs Rate</h4>
                                                                                    <Input type="number" placeholder='0.00' variant='bordered' startContent={`₹`}
                                                                                        classNames={{
                                                                                            inputWrapper: [
                                                                                                "h-4 w-36"
                                                                                            ],
                                                                                        }}
                                                                                        isInvalid={isInvalid}
                                                                                        color={isInvalid ? "danger" : "success"}
                                                                                        errorMessage={isInvalid && "Please enter a valid number"}
                                                                                        value={hr3Rate}
                                                                                        onValueChange={(value) => sethr3Rate(value)}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className='col-span-3'>
                                                                                <div className='flex items-center'>
                                                                                    <h4 className='text-sm w-32'>6 Hrs Rate</h4>
                                                                                    <Input type="number" placeholder='0.00' variant='bordered' startContent={`₹`}
                                                                                        classNames={{
                                                                                            inputWrapper: [
                                                                                                "h-4 w-36"
                                                                                            ],
                                                                                        }}
                                                                                        isInvalid={isInvalid}
                                                                                        color={isInvalid ? "danger" : "success"}
                                                                                        errorMessage={isInvalid && "Please enter a valid number"}
                                                                                        value={hr6Rate}
                                                                                        onValueChange={(value) => sethr6Rate(value)}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className='col-span-3'>
                                                                                <div className='flex items-center'>
                                                                                    <h4 className='text-sm w-32'>12 Hrs Rate</h4>
                                                                                    <Input type="number" placeholder='0.00' variant='bordered' startContent={`₹`}
                                                                                        classNames={{
                                                                                            inputWrapper: [
                                                                                                "h-4 w-36"
                                                                                            ],
                                                                                        }}
                                                                                        isInvalid={isInvalid}
                                                                                        color={isInvalid ? "danger" : "success"}
                                                                                        errorMessage={isInvalid && "Please enter a valid number"}
                                                                                        value={hr12Rate}
                                                                                        onValueChange={(value) => sethr12Rate(value)}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className='col-span-3'>
                                                                                <div className='flex items-center'>
                                                                                    <h4 className='text-sm w-32'>24 Hrs Rate</h4>
                                                                                    <Input type="number" placeholder='0.00' variant='bordered' startContent={`₹`}
                                                                                        classNames={{
                                                                                            inputWrapper: [
                                                                                                "h-4 w-36"
                                                                                            ],
                                                                                        }}
                                                                                        isInvalid={isInvalid}
                                                                                        color={isInvalid ? "danger" : "success"}
                                                                                        errorMessage={isInvalid && "Please enter a valid number"}
                                                                                        value={hr24Rate}
                                                                                        onValueChange={(value) => sethr24Rate(value)}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className='items-center mt-4 space-y-2'>
                                                                                    <h3 className='w-96 flex items-center text-base text-foreground-600 font-semibold'>Enter No. of Rooms</h3>
                                                                                    <div className='flex w-96 items-center'>
                                                                                    <h4 className='text-sm w-32'>Total Rooms</h4>
                                                                                    <Input type="number" placeholder='0.00' variant='bordered'
                                                                                        classNames={{
                                                                                            inputWrapper: [
                                                                                                "h-4 w-20"
                                                                                            ],
                                                                                        }}
                                                                                        isInvalid={isInvalid}
                                                                                        color={isInvalid ? "danger" : "success"}
                                                                                        errorMessage={isInvalid && "Please enter a valid number"}
                                                                                        value={totalRooms}
                                                                                        onValueChange={(value) => setTotalRooms(value)}
                                                                                    />
                                                                                    </div>
                                                                                </div>
                                                                        </div>
                                                                    </CardBody>
                                                                </Card>
                                                            </Tab>
                                                            <Tab key="music" title="Update Check-In" className={`${isSoldOut ? 'opacity-50 pointer-events-none' : ''}`}>
                                                                <Card>
                                                                    <CardBody>
                                                                    <div className='flex items-center'>
                                                                            <h4 className='text-base text-foreground-600 font-semibold'>Selected Date :</h4>
                                                                            &nbsp;<h3 className='text-base text-foreground-600 font-semibold'>{selectedRow?.booking_date}</h3>
                                                                            {/* <Datepicker
                                                                                selected={selectedDate}
                                                                                onDateChange={handleDateChange}
                                                                            /> */}
                                                                        </div>
                                                                        <div className='flex gap-16 items-center mt-2'>
                                                                            <h4 className='text-base text-foreground-600 font-semibold'>Selected Days :</h4>
                                                                            <Button variant='flat' color='primary' size='sm'>{selectedRow?.booking_date.split(" ").slice(0, 1).join(" ")}</Button>
                                                                        </div>
                                                                        <div className='mt-4'>
                                                                        <h4 className='text-base text-foreground-600 font-semibold bottom-3'>Select 3 Hrs Check-in Time: </h4>
                                                                        
                                                                        <Slider 
                                                                            label={`First Check-in And Last Check-out: ${hour3Slider}`}
                                                                            step={1} 
                                                                            maxValue={23} 
                                                                            minValue={0}
                                                                            defaultValue={convertTo24Hour(hour3Slider)}
                                                                            showSteps={true}
                                                                            showTooltip={true}
                                                                            showOutline={true}
                                                                            disableThumbScale={true}
                                                                            formatOptions={{ hour: 'numeric', hour12: true }}
                                                                            tooltipValueFormatOptions={{ hour: 'numeric', hour12: true, maximumFractionDigits: 0 }}
                                                                            classNames={{
                                                                                base: "max-w-5xl pt-3",
                                                                                filler: "bg-gradient-to-r from-primary-500 to-secondary-400",
                                                                                labelWrapper: "mb-2",
                                                                                label: "font-medium text-default-700 text-small",
                                                                                value: "font-medium text-default-500 text-small",
                                                                                thumb: [
                                                                                    "transition-size",
                                                                                    "bg-gradient-to-r from-secondary-400 to-primary-500",
                                                                                    "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
                                                                                    "data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6"
                                                                                ],
                                                                                step: "data-[in-range=true]:bg-black/30 dark:data-[in-range=true]:bg-white/50"
                                                                            }}
                                                                            tooltipProps={{
                                                                                offset: 10,
                                                                                placement: "bottom",
                                                                                classNames: {
                                                                                    base: [
                                                                                       
                                                                                        "before:bg-gradient-to-r before:from-secondary-400 before:to-primary-500",
                                                                                    ],
                                                                                    content: [
                                                                                        "py-2 shadow-xl",
                                                                                        "text-white bg-gradient-to-r from-secondary-400 to-primary-500",
                                                                                    ],
                                                                                },
                                                                            }}
                                                                            onChange={(value) => handleHourChange(value,"3hr")}
                                                                        />

                                                                        </div>
                                                                        <Switch isSelected={isSelected3hr} onValueChange={setIsSelected3hr} color="success" size="sm" className="top-3">
                                                                            {isSelected3hr ? "Active" : "Inactive"}
                                                                        </Switch>  
                
                                                                        <div className='mt-4'>
                                                                        <h4 className='text-base text-foreground-600 font-semibold bottom-3'>Select 6 Hrs Check-in Time: </h4>
                                                                        
                                                                        <Slider 
                                                                            label={`First Check-in And Last Check-out: ${hour6Slider}`}
                                                                            step={1} 
                                                                            maxValue={23} // 11 PM in 12-hour format
                                                                            minValue={0}  // 12 AM in 12-hour format
                                                                            defaultValue={convertTo24Hour(hour6Slider)}
                                                                            showSteps={true}
                                                                            showTooltip={true}
                                                                            showOutline={true}
                                                                            disableThumbScale={true}
                                                                            formatOptions={{ hour: 'numeric', hour12: true }}
                                                                            tooltipValueFormatOptions={{ hour: 'numeric', hour12: true, maximumFractionDigits: 0 }}
                                                                            classNames={{
                                                                                base: "max-w-5xl pt-3",
                                                                                filler: "bg-gradient-to-r from-primary-500 to-secondary-400",
                                                                                labelWrapper: "mb-2",
                                                                                label: "font-medium text-default-700 text-medium",
                                                                                value: "font-medium text-default-500 text-small",
                                                                                thumb: [
                                                                                    "transition-size",
                                                                                    "bg-gradient-to-r from-secondary-400 to-primary-500",
                                                                                    "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
                                                                                    "data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6"
                                                                                ],
                                                                                step: "data-[in-range=true]:bg-black/30 dark:data-[in-range=true]:bg-white/50"
                                                                            }}
                                                                            tooltipProps={{
                                                                                offset: 10,
                                                                                placement: "bottom",
                                                                                classNames: {
                                                                                    base: [
                                                                                        // arrow color
                                                                                        "before:bg-gradient-to-r before:from-secondary-400 before:to-primary-500",
                                                                                    ],
                                                                                    content: [
                                                                                        "py-2 shadow-xl",
                                                                                        "text-white bg-gradient-to-r from-secondary-400 to-primary-500",
                                                                                    ],
                                                                                },
                                                                            }}
                                                                            onChange={(value) => handleHourChange(value,"6hr")}
                                                                        />

                                                                        
                                                                        
                                                                        
                                                                        
                                                                        </div>
                                                                        <Switch isSelected={isSelected6hr} onValueChange={setIsSelected6hr} color="success" size="sm" className="top-3">
                                                                            {isSelected6hr ? "Active" : "Inactive"}
                                                                        </Switch>  


                                                                        <div className='mt-4'>
                                                                        <h4 className='text-base text-foreground-600 font-semibold bottom-3'>Select 12 Hrs Check-in Time: </h4>
                                                                        
                                                                        <Slider 
                                                                            label={`First Check-in And Last Check-out: ${hour12Slider}`}
                                                                            step={1} 
                                                                            maxValue={23} // 11 PM in 12-hour format
                                                                            minValue={0}  // 12 AM in 12-hour format
                                                                            defaultValue={convertTo24Hour(hour12Slider)}
                                                                            showSteps={true}
                                                                            showTooltip={true}
                                                                            showOutline={true}
                                                                            disableThumbScale={true}
                                                                            formatOptions={{ hour: 'numeric', hour12: true }}
                                                                            tooltipValueFormatOptions={{ hour: 'numeric', hour12: true, maximumFractionDigits: 0 }}
                                                                            classNames={{
                                                                                base: "max-w-5xl pt-3",
                                                                                filler: "bg-gradient-to-r from-primary-500 to-secondary-400",
                                                                                labelWrapper: "mb-2",
                                                                                label: "font-medium text-default-700 text-medium",
                                                                                value: "font-medium text-default-500 text-small",
                                                                                thumb: [
                                                                                    "transition-size",
                                                                                    "bg-gradient-to-r from-secondary-400 to-primary-500",
                                                                                    "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
                                                                                    "data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6"
                                                                                ],
                                                                                step: "data-[in-range=true]:bg-black/30 dark:data-[in-range=true]:bg-white/50"
                                                                            }}
                                                                            tooltipProps={{
                                                                                offset: 10,
                                                                                placement: "bottom",
                                                                                classNames: {
                                                                                    base: [
                                                                                        // arrow color
                                                                                        "before:bg-gradient-to-r before:from-secondary-400 before:to-primary-500",
                                                                                    ],
                                                                                    content: [
                                                                                        "py-2 shadow-xl",
                                                                                        "text-white bg-gradient-to-r from-secondary-400 to-primary-500",
                                                                                    ],
                                                                                },
                                                                            }}
                                                                            onChange={(value) => handleHourChange(value,"12hr")}
                                                                        />

                                                                        </div>
                                                                        <Switch isSelected={isSelected12hr} onValueChange={setIsSelected12hr} color="success" size="sm" className="top-3">
                                                                            {isSelected12hr ? "Active" : "Inactive"}
                                                                        </Switch>   
                                                                        
                                                                    </CardBody>
                                                                </Card>
                                                            </Tab>
                                                            <Tab key="videos" title="Update Sold Out">
                                                                <Card>
                                                                    <CardBody>
                                                                    <div className='flex items-center'>
                                                                        <h4 className='text-base text-foreground-600 font-semibold'>Selected Date :</h4>
                                                                        &nbsp;<h3 className='text-base text-foreground-600 font-semibold'>{selectedRow?.booking_date}</h3>
                                                                        {/* <Daterangepickerreact
                                                                            className='bg-background rounded-lg border-2 border-gray-300 h-9 w-66 overflow-hidden'
                                                                            initialDate={initialDate} 
                                                                            onDateValue= {handleDateSelect}
                                                                        /> */}

                                                                    </div>
                                                                    <div className='flex gap-6 items-center mt-2'>
                                                                            <h4 className='text-base text-foreground-600 font-semibold'>Selected Days :</h4>
                                                                            <Button variant='flat' color='primary' size='sm'>{selectedRow?.booking_date.split(" ").slice(0, 1).join(" ")}</Button>
                                                                        </div>
                                                                        {/* <div className='text-center mt-8'>
                                                                            <h2 className='text-lg text-foreground-600'>Selected Time period is From Jan 23 2024 to Jan 24 2024</h2>
                                                                            <h4 className='tex-sm text-foreground-400'>To make any specific date changes, Please select a date in single update section</h4>
                                                                        </div> */}
                                                                        <div className='mt-6 flex items-center justify-center'>
                                                                        <RadioGroup
                                                                            orientation="horizontal"
                                                                            defaultValue="bookable"
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
                                                        </Tabs>
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button color="danger" variant="light" onPress={onClose}>
                                                            Close
                                                        </Button>
                                                        <Button 
                                                            color="primary" 
                                                            onPress={onClose} 
                                                            onClick={(e) => handleSave(selectedRow, hour3Slider, hour6Slider, hour12Slider, isSelected3hr,
                                                                isSelected6hr,
                                                                isSelected12hr)} 
                                                            startContent={<Save />}
                                                        >
                                                            Save
                                                        </Button>
                                                    </ModalFooter>
                                                </>
                                            )}
                                        </ModalContent>
                                    </Modal>
                                </>
  )
}

export default EditModal

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