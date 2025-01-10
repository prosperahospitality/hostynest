'use client'
import React, { useState, useEffect, useCallback, useRef } from "react";
import { EditIcon } from "@/_components/icon"
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Tooltip, Input } from "@nextui-org/react";
import Swal from 'sweetalert2'
import toast, { Toaster } from 'react-hot-toast';

const EditContentFormModal = ({operation, hotel_id, onDataPass, bankResult, result}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [hotelContact, setHotelContact] = useState('');
  const [receptionContact, setReceptionContact] = useState('');
  const [hotelEmail, setHotelEmail] = useState('');
  const [secondaryEmail, setSecondaryEmail] = useState('');
  const [address, setAddress] = useState('');

  const [bankName, setBankName] = useState('');
  const [accountHolderName, setAccountHolderName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [panNumber, setPanNumber] = useState('');
  
  const [leaseExpiryDate, setLeaseExpiryDate] = useState('');

  const [lastID, setLastID] = useState(0);

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

  // if(operation === "edit_bankdetails") {
  //   const generateUniqueID = () => {
  //     console.log("Last IF:",lastID)
  //   const newID = `BANK${String(lastID + 1).padStart(5, '0')}`;
  //   setLastID(lastID + 1);
  //   return newID;
  //   };
  // }else if(operation === "edit_contactdetails") {
  //   const generateUniqueID = () => {
  //     console.log("Last IF:",lastID)
  //   const newID = `CONT${String(lastID + 1).padStart(5, '0')}`;
  //   setLastID(lastID + 1);
  //   return newID;
  //   };
  // }




  const handleSubmit = async() => {
    if(operation === "edit_contactdetails") {

      try {
        const response = await fetch("/api/hotels/hotel_info", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({Hotel_Id : hotel_id,
              Phone_Number : hotelContact,
              reception_number : receptionContact,
              Email : hotelEmail,
              secondary_email : secondaryEmail,
              Address : address,
              operation: "edit_contactdetails",
            }),
        });
        const result = await response.json();
        console.log("Data:", result.data);
        onDataPass(result.data, "editContact")
        onClose()
        toast.success("Data edited!")
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    }else if(operation === "edit_bankdetails") {

      const generateUniqueID = () => {
        console.log("Last IF:",lastID)
      const newID = `BANK${String(lastID + 1).padStart(5, '0')}`;
      setLastID(lastID + 1);
      return newID;
      };

      try {
        const response = await fetch("/api/hotels/bank_details", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id : generateUniqueID(),Hotel_Id : hotel_id,
              bank_name : bankName,
              account_holder_name : accountHolderName,
              account_number : accountNumber,
              ifsc_number : ifscCode,
              pan_number : panNumber,
              created_on : getCurrentDateTime(),
              last_updated_on : getCurrentDateTime(),
            }),
        });
        const result = await response.json();
        console.log("Data:", result.data);
        onDataPass(result.data,"editBankDetails")
        onClose()
        toast.success("Data edited!")
    } catch (error) {
        console.error("Error fetching data:", error);
    }

    }else if(operation === "edit_expirydate") {
      try {
        const response = await fetch("/api/hotels/hotel_info", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({Hotel_Id : hotel_id,
             lease_expiry_date : leaseExpiryDate,
             operation: "edit_leaseexpirydate",
            }),
        });
        const result = await response.json();
        console.log("Data:", result.data);
        onDataPass(result.data,"editExpiryDate")
        onClose()
        toast.success("Data edited!")
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    }
  }




    let response = async () => { 
      onOpen();
      if(operation === "edit_bankdetails") {
        setBankName(bankResult.bank_name);
        setAccountHolderName(bankResult.account_holder_name);
        setAccountNumber(bankResult.account_number);
        setIfscCode(bankResult.ifsc_number);
        setPanNumber(bankResult.pan_number);

        const res = await fetch("/api/hotels/bank_details", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
      })
    
      const result = await res.json();
      console.log("Bank Data:", result);
    
      if (result && result.length > 0) {
            const lastElement = result[result.length - 1]; 
            const lastElementId = lastElement.id; 
            const numericPart = lastElementId.match(/(?<=BANK)0*(\d+)/); 
            const lastNumericId = numericPart ? parseInt(numericPart[1]) : null;
            console.log("Numeric ID of the last element:", lastNumericId);
            setLastID(lastNumericId);
        } else {
            console.log("No elements in the array.");
            setLastID(0);
        }
      
      }else if(operation === "edit_contactdetails") {
        setHotelContact(result.Phone_Number)
        setReceptionContact(result.reception_number)
        setHotelEmail(result.Email)
        setSecondaryEmail(result.secondary_email)
        setAddress(result.Address)
      }else if(operation === "edit_expirydate") {
        setLeaseExpiryDate(result.lease_expiry_date)
      }

}

  return (
    <><Toaster
    position="top-right"
    reverseOrder={false} />
      <div className="flex flex-wrap gap-3">
        <Tooltip content="Edit" color="primary">
          <Button isIconOnly variant='light' color='' onPress={response} startContent={<EditIcon className='size-5 text-primary' />}></Button>
        </Tooltip>
      </div>
      <Modal
        size="xl"
        isOpen={isOpen}
        onOpenChange={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Bank & GST Details</ModalHeader>
              <ModalBody>
                {operation === "edit_contactdetails" 
                  ? <div className="p-4 grid grid-cols-2 gap-2">
                  <Input
                      isRequired
                      type="text"
                      label="Hotel Contact No"
                      labelPlacement="outside"
                      placeholder="Enter Hotel Contact No"
                      variant="bordered"
                      size="md"
                      className="max-w-xs"
                      value={hotelContact}
                      onChange={(e) => setHotelContact(e.target.value)}
                  />
                  
                  <Input
                     isRequired
                     type="text"
                     label="Reception Contact No"
                     labelPlacement="outside"
                     placeholder="Enter Reception Contact No"
                     variant="bordered"
                     size="md"
                     className="max-w-xs"
                     value={receptionContact}
                     onChange={(e) => setReceptionContact(e.target.value)}
                    />
                    
                   <Input
                     isRequired
                     type="text"
                     label="Hotel Email"
                     labelPlacement="outside"
                     placeholder="Enter Hotel Email"
                     variant="bordered"
                     size="md"
                     className="max-w-xs"
                     value={hotelEmail}
                     onChange={(e) => setHotelEmail(e.target.value)}
                    />
    
                    <Input
                     isRequired
                     type="text"
                     label="Secondary Email"
                     labelPlacement="outside"
                     placeholder="Enter Secondary Email"
                     variant="bordered"
                     size="md"
                     className="max-w-xs"
                     value={secondaryEmail}
                     onChange={(e) => setSecondaryEmail(e.target.value)}
                    />
    
                    <Input
                     isRequired
                     type="text"
                     label="Address"
                     labelPlacement="outside"
                     placeholder="Enter Address"
                     variant="bordered"
                     size="md"
                     className="max-w-xs"
                     value={address}
                     onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  : operation === "edit_bankdetails" 
                    ? <div className="p-4 grid grid-cols-2 gap-2">
                        <Input
                          isRequired
                          type="text"
                          label="Bank Name"
                          labelPlacement="outside"
                          placeholder="Enter Bank Name"
                          variant="bordered"
                          size="md"
                          className="max-w-xs"
                          value={bankName}
                          onChange={(e) => setBankName(e.target.value)}
                        />
                        <Input
                              isRequired
                              type="text"
                              label="Account Holder Name"
                              labelPlacement="outside"
                              placeholder="Enter Account Holder Name"
                              variant="bordered"
                              size="md"
                              className="max-w-xs"
                              value={accountHolderName}
                              onChange={(e) => setAccountHolderName(e.target.value)}
                          />
                        <Input
                              isRequired
                              type="text"
                              label="Account Number"
                              labelPlacement="outside"
                              placeholder="Enter Account Number"
                              variant="bordered"
                              size="md"
                              className="max-w-xs"
                              value={accountNumber}
                              onChange={(e) => setAccountNumber(e.target.value)}
                          />
                        <Input
                              isRequired
                              type="text"
                              label="IFSC Code"
                              labelPlacement="outside"
                              placeholder="Enter IFSC Code"
                              variant="bordered"
                              size="md"
                              className="max-w-xs"
                              value={ifscCode}
                              onChange={(e) => setIfscCode(e.target.value)}
                          />
                        <Input
                              isRequired
                              type="text"
                              label="PAN Number"
                              labelPlacement="outside"
                              placeholder="Enter PAN Number"
                              variant="bordered"
                              size="md"
                              className="max-w-xs"
                              value={panNumber}
                              onChange={(e) => setPanNumber(e.target.value)}
                          />
                      </div>
                    : operation === "edit_expirydate" 
                      ? <Input
                        isRequired
                        type="text"
                        label="Lease Expiry Date"
                        labelPlacement="outside"
                        placeholder="Enter Lease Expiry Date"
                        variant="bordered"
                        size="md"
                        className="max-w-xs"
                        value={leaseExpiryDate}
                        onChange={(e) => setLeaseExpiryDate(e.target.value)}
                        />
                      : ""
                }
              
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={handleSubmit}>
                  Submit
                </Button>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditContentFormModal;