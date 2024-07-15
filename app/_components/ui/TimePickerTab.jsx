'use client'
import { Button } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';

const TimePickerTab = ({ selectedDate, handleTimeSelection, showTimePicker, toggleTimePicker }) => {
    const [isAM, setIsAM] = useState(true);
    const [isPM, setIsPM] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }));
    const [selectedTime, setSelectedTime] = useState("");

    useEffect(() => {
        const currentHour = new Date().getHours();
        setIsAM(currentHour < 12);
        setIsPM(currentHour >= 12);
    }, []);

    useEffect(() => {
        setCurrentTime(selectedTime ? selectedTime : new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }));
    }, [selectedTime]);

    const toggleAM = () => {
        setIsAM(true);
        setIsPM(false);
    };

    const togglePM = () => {
        setIsAM(false);
        setIsPM(true);
    };

    const handleTimeSlotSelection = (hour, disabled) => {
        if (!disabled) {
            let formattedHour = hour;
            if (hour === 0 || hour === 12) {
                formattedHour = 12;
            } else if (hour > 12) {
                formattedHour -= 12;
            }
            const newTime = `${formattedHour.toString().padStart(2, '0')}:00 ${isAM ? 'AM' : 'PM'}`;
            setCurrentTime(newTime);
            setSelectedTime(newTime);
            handleTimeSelection(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), hour + (isPM ? 12 : 0), 0));
            toggleTimePicker(false); // Toggle showTimePicker to false after selecting a time slot
        }
    };

    const renderTimeSlots = () => {
        const currentHour = new Date().getHours();
        const hours = [...Array(12).keys()];
        const displayTime = hour => {
            const formattedHour = hour === 0 || hour === 12 ? 12 : hour > 12 ? hour - 12 : hour;
            return formattedHour.toString().padStart(2, '0') + ':00';
        };

        return (
            <div className="grid grid-cols-4 text-center gap-5 text-black">
                {hours.map(hour => {
                    const displayHour = displayTime(hour + (isPM ? 12 : 0));
                    const disabled = selectedDate.toDateString() === new Date().toDateString() && currentHour >= hour + (isPM ? 12 : 0);
                    return (
                        <div
                            key={hour}
                            className={`rounded-[5px] justify-self-center flex justify-center text-black items-center h-[3.162rem] shrink-0 ${disabled ? 'opacity-50 cursor-not-allowed line-through' : 'bg-white hover:bg-primary text-primary w-5/6 hover:text-white'
                                }`}
                            onClick={() => handleTimeSlotSelection(hour, disabled)}
                        >
                            {displayHour}
                            <sup className="text-[0.813rem] leading-[1.25rem] ">{isAM ? 'AM' : 'PM'}</sup>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div>
            <input
                type="text" placeholder='select the time' className="text-center rounded-xl border-none outline-none text-gray-500 bg-white font-semibold mt-2 cursor-pointer"
                value={showTimePicker ? currentTime : selectedTime ? selectedTime : new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}
                readOnly
                onClick={() => toggleTimePicker(true)} // Toggle showTimePicker to true on input field click
            />
            {showTimePicker && (
                <div className="w-[45%] right-48 z-50 rounded-2xl mt-6 text-black cursor-pointer absolute text-left bg-white opacity-100" id="headlessui-popover-panel-:ru:" tabIndex="-1" data-headlessui-state="open">
                    <div className="w-full px-4 rounded-2xl shadow-[rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;]">
                        <div className="rounded-[5px] pb-7 text-base text-black">
                            <div className="rounded-[5px] w-[190px] text-[#333333]  mt-4 flex m-auto items-center justify-between text-center">
                                <Button
                                    variant='shadow'
                                    className={` rounded-[5px] w-14 leading-[2.25rem] flex items-center justify-center bg-white text-black ${isAM ? 'bg-primary text-white' : ''} `}
                                    onClick={toggleAM}
                                >
                                    AM
                                </Button>
                                <Button
                                    variant='shadow'
                                    className={`rounded-[5px] w-14 leading-[2.25rem] flex items-center justify-center bg-white text-black ${isPM ? 'bg-primary text-white' : ''} `}
                                    onClick={togglePM}
                                >
                                    PM
                                </Button>

                            </div>
                            {renderTimeSlots()}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TimePickerTab;
