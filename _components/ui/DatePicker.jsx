'use client'
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "@/_components/ui/styles/datepicker.css";

const Datepicker = ({ selected, onDateChange, toggleTimePicker }) => {

    const handleDateChange = (date) => {
        onDateChange(date);
        toggleTimePicker(false); // Set showTimePicker to false when date is selected
    };

    return (
        <div>
            <DatePicker 
                selected={selected}
                onChange={handleDateChange}
                placeholderText='Select the date'
                minDate={new Date()}
                dateFormat="MMMM d, yyyy"
                className="text-center rounded-xl border-none outline-none text-gray-500 bg-white font-semibold mt-2 cursor-pointer"
            />
        </div>
    );
};

export default Datepicker;