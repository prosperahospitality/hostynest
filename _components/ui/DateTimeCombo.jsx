"use client"
import React, { useState } from 'react';
import Datepicker from "@/_components/ui/DatePicker";
import TimePickerSlot from '@/_components/ui/TimePickerSlot';

const DateTimeCombo = ({onDateChange, onTimeChange}) => {
    const [selectedDate, setSelectedDate] = useState(new Date()); // Initialize with current date
    const [selectedTime, setSelectedTime] = useState("");
    const [showTimePicker, setShowTimePicker] = useState(false);
  
    const handleDateChange = (date) => {
      console.log("Date: ",date)
      setSelectedDate(date);
      setShowTimePicker(true);
      onDateChange(date);
    };
  
    const toggleTimePicker = () => {
      setShowTimePicker(prevState => !prevState); // Toggle time picker visibility
    };
  
    const handleSelectedTime = (time) => {
      console.log("Time: ",time)
      setSelectedTime(time);
      onTimeChange(time)
    };


  return (
    <div className='flex'>
        <Datepicker
              selected={selectedDate}
              onDateChange={handleDateChange}
              toggleTimePicker={toggleTimePicker}
        />
        <TimePickerSlot selectedDate={selectedDate}
              handleTimeSelection={handleSelectedTime}
              showTimePicker={showTimePicker}
              toggleTimePicker={toggleTimePicker}
        />
    </div>
  )
}

export default DateTimeCombo