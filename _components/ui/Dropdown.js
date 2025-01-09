"use client"
import React, { useState } from 'react';

const Dropdown = ({options, onSelect, children}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (action) => {
    console.log(`Clicked on ${action}`);
    setIsOpen(false);
  };



  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
      >
        {/* Open Menu */}
      {/* {selectedOption ? selectedOption.label : 'Select an option'} */}
      {children}
      </button>
      {isOpen && (
        <div className="sticky mt-2 p-2 w-48 items-center bg-white border border-gray-300 rounded-3xl shadow-md">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className="cursor-pointer py-1 px-2 hover:bg-gray-100"
            >
              {option.label}
            </div>
          ))}          
          
          
          {/* <div
            onClick={() => handleItemClick('New file')}
            className="cursor-pointer py-1 px-2 hover:bg-gray-100"
          >
            New file
          </div>
          <div
            onClick={() => handleItemClick('Copy link')}
            className="cursor-pointer py-1 px-2 hover:bg-gray-100"
          >
            Copy link
          </div>
          <div
            onClick={() => handleItemClick('Edit file')}
            className="cursor-pointer py-1 px-2 hover:bg-gray-100"
          >
            Edit file
          </div>
          <div
            onClick={() => handleItemClick('Delete file')}
            className="cursor-pointer py-1 px-2 hover:bg-gray-100 text-danger"
          >
            Delete file
          </div> */}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
