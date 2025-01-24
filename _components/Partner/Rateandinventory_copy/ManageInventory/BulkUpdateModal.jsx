import React, { useState, useEffect } from 'react'
import {
    Autocomplete, AutocompleteItem, Button, CheckboxGroup, Checkbox, Modal,
    ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Tabs, Tab,
    Card, CardBody, RadioGroup, Radio, Input
} from "@nextui-org/react";

import { CiCalendar } from "react-icons/ci";

import { DateRange } from 'react-date-range';

import { cn } from "@/_lib/utils";

import { Save, Zap, CalendarRange } from 'lucide-react';

import { format, addDays, isBefore } from "date-fns";



const BulkUpdateModal = () => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [dateUpdateProperty, setDateUpdateProperty] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 6),
            key: 'selection'
        }
    ]);
    const [dateUpdateRoom, setDateUpdateRoom] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 6),
            key: 'selection'
        }
    ]);
    const [dateUpdateRate, setDateUpdateRate] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 6),
            key: 'selection'
        }
    ]);

    return (
        <div>
            <Button color='default' variant='ghost' className='text-foreground-500' size='sm' onPress={onOpen} startContent={<CalendarRange />}>Bulk Update</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='5xl'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Bulk Update</ModalHeader>
                            <ModalBody>
                                <Tabs aria-label="Options">
                                    <Tab key="buld_update_property" title="Bulk Update Property">
                                        <Card>
                                            <CardBody>
                                                <div className='flex items-center'>
                                                    <h4 className='text-base text-foreground-600 font-semibold'>Selected Date :</h4>
                                                    <div className={cn("grid gap-2", {
                                                        "bg-background rounded-lg border-2 border-gray-300 h-90 w-66 overflow-hidden": true
                                                    })}>

                                                        <Button
                                                            id="dateUpdateProperty"
                                                            variant={"destructive"}
                                                            className={cn(
                                                                "w-[250px] justify-center text-center font-normal",
                                                                !dateUpdateProperty && "text-black bg-white"
                                                            )}
                                                            onClick={() => setPopoverOpen(!popoverOpen)}
                                                        >
                                                            <CiCalendar className="mr-2 size-4" />
                                                            {dateUpdateProperty[0]?.startDate ? (
                                                                dateUpdateProperty[0]?.endDate ? (
                                                                    <>
                                                                        {format(dateUpdateProperty[0]?.startDate, "LLL dd, y")} : {format(dateUpdateProperty[0]?.endDate, "LLL dd, y")}
                                                                    </>
                                                                ) : (
                                                                    format(dateUpdateProperty[0]?.startDate, "LLL dd, y")
                                                                )
                                                            ) : (
                                                                <span>Pick a date</span>
                                                            )}
                                                        </Button>
                                                        {popoverOpen && (
                                                            <div className="w-auto p-0 text-black bg-white">
                                                                <DateRange
                                                                    className='bg-background rounded-lg border-2 border-gray-300 h-90 w-66 overflow-hidden'
                                                                    editableDateInputs={true}
                                                                    onChange={(item) => handleSelect(item)}
                                                                    moveRangeOnFirstSelection={false}
                                                                    ranges={dateUpdateProperty}
                                                                    months={2}
                                                                    direction="horizontal"
                                                                    minDate={new Date()}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className='flex gap-6 items-center mt-2'>
                                                    <h4 className='text-base text-foreground-600 font-semibold'>Selected Days :</h4>
                                                    <CheckboxGroup
                                                        defaultValue={selectedChecksUpdateProp}
                                                        orientation="horizontal"
                                                        value={selectedChecksUpdateProp}
                                                        onValueChange={setSelectedChecksUpdateProp}
                                                    >
                                                        <Checkbox value="mon">Mon</Checkbox>
                                                        <Checkbox value="tue">Tue</Checkbox>
                                                        <Checkbox value="wed">Wed</Checkbox>
                                                        <Checkbox value="thu">Thu</Checkbox>
                                                        <Checkbox value="fri">Fri</Checkbox>
                                                        <Checkbox value="sat">Sat</Checkbox>
                                                        <Checkbox value="sun">Sun</Checkbox>
                                                    </CheckboxGroup>
                                                </div>
                                                <div className='flex items-center mt-4'>
                                                    <h4 className='text-base text-foreground-600 font-semibold'>Selected Room :</h4>
                                                    <Autocomplete
                                                        size='sm'
                                                        variant='bordered'
                                                        defaultSelectedKey={selectedRoomUpdateProperty}
                                                        className='w-44'
                                                        labelPlacement='outside-left'
                                                        value={selectedRoomUpdateProperty}
                                                        allowsCustomValue={true}
                                                        onInputChange={(value) => setSelectedRoomUpdateProperty(value)}
                                                    >
                                                        {result?.map((Room) => (
                                                            <AutocompleteItem key={Room.room_name} value={Room.room_name}>
                                                                {Room.room_name}
                                                            </AutocompleteItem>
                                                        ))}
                                                    </Autocomplete>
                                                </div>
                                                <div className='mt-6 flex items-center justify-center'>
                                                    <RadioGroup
                                                        orientation="horizontal"
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
                                    <Tab key="bulk_update_rooms" title="Bulk Update Rooms">
                                        <Card>
                                            <CardBody>
                                                <div className='flex items-center'>
                                                    <h4 className='text-base text-foreground-600 font-semibold'>Selected Date :</h4>
                                                    <div className={cn("grid gap-2", {
                                                        "bg-background rounded-lg border-2 border-gray-300 h-90 w-66 overflow-hidden": true
                                                    })}>
                                                        <Button
                                                            id="dateUpdateRoom"
                                                            variant={"destructive"}
                                                            className={cn(
                                                                "w-[250px] justify-center text-center font-normal",
                                                                !dateUpdateRoom && "text-black bg-white"
                                                            )}
                                                            onClick={() => setPopoverOpenUpdateRoom(!popoverOpenUpdateRoom)}
                                                        >
                                                            <CiCalendar className="mr-2 size-4" />
                                                            {dateUpdateRoom[0]?.startDate ? (
                                                                dateUpdateRoom[0]?.endDate ? (
                                                                    <>
                                                                        {format(dateUpdateRoom[0]?.startDate, "LLL dd, y")} : {format(dateUpdateRoom[0]?.endDate, "LLL dd, y")}
                                                                    </>
                                                                ) : (
                                                                    format(dateUpdateRoom[0]?.startDate, "LLL dd, y")
                                                                )
                                                            ) : (
                                                                <span>Pick a date</span>
                                                            )}
                                                        </Button>
                                                        {popoverOpenUpdateRoom && (
                                                            <div className="w-auto p-0 text-black bg-white">
                                                                <DateRange
                                                                    className='bg-background rounded-lg border-2 border-gray-300 h-90 w-66 overflow-hidden'
                                                                    editableDateInputs={true}
                                                                    onChange={(item) => handleSelectUpdateRoom(item)}
                                                                    moveRangeOnFirstSelection={false}
                                                                    ranges={dateUpdateRoom}
                                                                    months={2}
                                                                    direction="horizontal"
                                                                    minDate={new Date()}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className='flex items-center mt-4'>
                                                    <h4 className='text-base text-foreground-600 font-semibold'>Selected Room :</h4>
                                                    <Autocomplete
                                                        size='sm'
                                                        variant='bordered'
                                                        defaultSelectedKey={selectedRoomUpdateRooms}
                                                        className='w-44'
                                                        labelPlacement='outside-left'
                                                        value={selectedRoomUpdateRooms}
                                                        allowsCustomValue={true}
                                                        onInputChange={(value) => setSelectedRoomUpdateRooms(value)}
                                                    >
                                                        {result?.map((Room) => (
                                                            <AutocompleteItem key={Room.room_name} value={Room.room_name}>
                                                                {Room.room_name}
                                                            </AutocompleteItem>
                                                        ))}
                                                    </Autocomplete>
                                                </div>
                                                <div className='flex items-center mt-4'>
                                                    <h4 className='text-base text-foreground-600 font-semibold w-40'>Total Room :</h4>
                                                    <Input type="text" placeholder='0.00' variant='bordered'
                                                        classNames={{
                                                            inputWrapper: [
                                                                "h-4 w-20"
                                                            ],
                                                        }}
                                                        isInvalid={isInvalid1}
                                                        color={isInvalid1 ? "danger" : "success"}
                                                        errorMessage={isInvalid1 && "Please enter a valid number"}
                                                        onValueChange={setValueTotalRoom}
                                                    />
                                                </div>
                                                {/* <div className='mt-6 flex items-center justify-center'>
                                                            <RadioGroup
                                                                orientation="horizontal"
                                                                value={selectedRadioRoom}
                                                                onChange={(e) => setSelectedRadioRoom(e.target.value)}
                                                            >
                                                                <Radio value="soldout" size='sm' color='danger'>Mark as sold out</Radio>
                                                                <Radio value="bookable" size='sm' color='success'>Mark as open Bookable</Radio>
                                                            </RadioGroup>
                                                        </div> */}
                                            </CardBody>
                                        </Card>
                                    </Tab>
                                    <Tab key="bulk_update_rate_plans" title="Bulk Update Rate Plans">
                                        <Card>
                                            <CardBody>
                                                <div className='flex items-center'>
                                                    <h4 className='text-base text-foreground-600 font-semibold'>Selected Date :</h4>
                                                    <div className={cn("grid gap-2", {
                                                        "bg-background rounded-lg border-2 border-gray-300 h-90 w-66 overflow-hidden": true
                                                    })}>
                                                        <Button
                                                            id="dateUpdateRate"
                                                            variant={"destructive"}
                                                            className={cn(
                                                                "w-[250px] justify-center text-center font-normal",
                                                                !dateUpdateRate && "text-black bg-white"
                                                            )}
                                                            onClick={() => setPopoverOpenUpdateRate(!popoverOpenUpdateRate)}
                                                        >
                                                            <CiCalendar className="mr-2 size-4" />
                                                            {dateUpdateRate[0]?.startDate ? (
                                                                dateUpdateRate[0]?.endDate ? (
                                                                    <>
                                                                        {format(dateUpdateRate[0]?.startDate, "LLL dd, y")} : {format(dateUpdateRate[0]?.endDate, "LLL dd, y")}
                                                                    </>
                                                                ) : (
                                                                    format(dateUpdateRate[0]?.startDate, "LLL dd, y")
                                                                )
                                                            ) : (
                                                                <span>Pick a date</span>
                                                            )}
                                                        </Button>
                                                        {popoverOpenUpdateRate && (
                                                            <div className="w-auto p-0 text-black bg-white">
                                                                <DateRange
                                                                    className='bg-background rounded-lg border-2 border-gray-300 h-90 w-66 overflow-hidden'
                                                                    editableDateInputs={true}
                                                                    onChange={(item) => handleSelectUpdateRate(item)}
                                                                    moveRangeOnFirstSelection={false}
                                                                    ranges={dateUpdateRate}
                                                                    months={2}
                                                                    direction="horizontal"
                                                                    minDate={new Date()}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className='flex items-center mt-4'>
                                                    <h4 className='text-base text-foreground-600 font-semibold'>Selected Room :</h4>
                                                    <Autocomplete
                                                        size='sm'
                                                        variant='bordered'
                                                        defaultSelectedKey={selectedRoomUpdateRate}
                                                        className='w-44'
                                                        labelPlacement='outside-left'
                                                        value={selectedRoomUpdateRate}
                                                        allowsCustomValue={true}
                                                        onInputChange={(value) => setSelectedRoomUpdateRate(value)}
                                                    >
                                                        {result?.map((Room) => (
                                                            <AutocompleteItem key={Room.room_name} value={Room.room_name}>
                                                                {Room.room_name}
                                                            </AutocompleteItem>
                                                        ))}
                                                    </Autocomplete>
                                                </div>
                                                {/* <div className='flex items-center mt-4'>
                                                            <h4 className='text-base text-foreground-600 font-semibold'>Selected Rate plan :</h4>
                                                            <h4 className='text-base text-red-600 border border-red-500 font-semibold'>Rate plan selection dropdown</h4>
                                                        </div> */}

                                                <div className='flex gap-4 items-center mt-2'>
                                                    <h4 className='flex items-center text-base text-foreground-600 font-semibold'>Enter Rates <h5 className='text-xs text-foreground-300 ml-4'>(GST will automatically be added to the rate you provide)</h5></h4>
                                                </div>

                                                <div className='grid grid-cols-12'>
                                                    <div className='col-span-4'>
                                                        <div className='flex items-center'>
                                                            <h4 className='text-sm w-56'>Rate for 3 Hours</h4>
                                                            <Input type="text" placeholder='0.00' variant='bordered' startContent={`₹`}
                                                                classNames={{
                                                                    inputWrapper: [
                                                                        "h-4 w-36"
                                                                    ],
                                                                }}
                                                                isInvalid={isInvalid3Hour}
                                                                color={isInvalid3Hour ? "danger" : "success"}
                                                                errorMessage={isInvalid3Hour && "Please enter a valid number"}
                                                                onValueChange={setValue3HourRate}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className='col-span-4'>
                                                        <div className='flex items-center'>
                                                            <h4 className='text-sm w-56'>Rate for 6 Hours</h4>
                                                            <Input type="text" placeholder='0.00' variant='bordered' startContent={`₹`}
                                                                classNames={{
                                                                    inputWrapper: [
                                                                        "h-4 w-36"
                                                                    ],
                                                                }}
                                                                isInvalid={isInvalid6Hour}
                                                                color={isInvalid6Hour ? "danger" : "success"}
                                                                errorMessage={isInvalid6Hour && "Please enter a valid number"}
                                                                onValueChange={setValue6HourRate}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className='col-span-4'>
                                                        <div className='flex items-center'>
                                                            <h4 className='text-sm w-56'>Rate for 12 Hours</h4>
                                                            <Input type="text" placeholder='0.00' variant='bordered' startContent={`₹`}
                                                                classNames={{
                                                                    inputWrapper: [
                                                                        "h-4 w-36"
                                                                    ],
                                                                }}
                                                                isInvalid={isInvalid12Hour}
                                                                color={isInvalid12Hour ? "danger" : "success"}
                                                                errorMessage={isInvalid12Hour && "Please enter a valid number"}
                                                                onValueChange={setValue12HourRate}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className='col-span-4'>
                                                        <div className='flex items-center'>
                                                            <h4 className='text-sm w-32'>Base Rate</h4>
                                                            <Input type="text" placeholder='0.00' variant='bordered' startContent={`₹`}
                                                                classNames={{
                                                                    inputWrapper: [
                                                                        "h-4 w-36"
                                                                    ],
                                                                }}
                                                                isInvalid={isInvalidBase}
                                                                color={isInvalidBase ? "danger" : "success"}
                                                                errorMessage={isInvalidBase && "Please enter a valid number"}
                                                                onValueChange={setValueBaseRate}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='col-span-4'>
                                                        <div className='flex items-center'>
                                                            <h4 className='text-sm w-32'>Child Rate</h4>
                                                            <Input type="text" placeholder='0.00' variant='bordered' startContent={`₹`}
                                                                classNames={{
                                                                    inputWrapper: [
                                                                        "h-4 w-36"
                                                                    ],
                                                                }}
                                                                isInvalid={isInvalidChild}
                                                                color={isInvalidChild ? "danger" : "success"}
                                                                errorMessage={isInvalidChild && "Please enter a valid number"}
                                                                onValueChange={setValueChildRate}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='col-span-4'>
                                                        <div className='flex items-center'>
                                                            <h4 className='text-sm w-56'>Extra Person Rate</h4>
                                                            <Input type="text" placeholder='0.00' variant='bordered' startContent={`₹`}
                                                                classNames={{
                                                                    inputWrapper: [
                                                                        "h-4 w-36"
                                                                    ],
                                                                }}
                                                                isInvalid={isInvalidExtraPerson}
                                                                color={isInvalidExtraPerson ? "danger" : "success"}
                                                                errorMessage={isInvalidExtraPerson && "Please enter a valid number"}
                                                                onValueChange={setValueExtraPersonRate}
                                                            />
                                                        </div>
                                                    </div>
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
                                <Button color="primary" onPress={onClose} startContent={<Save />} onClick={(e) => handleSave()}>
                                    Save
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default BulkUpdateModal