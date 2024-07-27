"use client";
import { ArrowLeftRight, Calendar, ChevronDown, ChevronLeft, ChevronUp, Clock } from "lucide-react";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { parse, format } from 'date-fns';

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const formatTime = (date) => {
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; 
  return `${hours}:${minutes} ${ampm}`;
};

const parseDate = (dateString) => {
  const [day, month, year] = dateString.split('/');
  return new Date(`${year}-${month}-${day}`);
};

const parseTime = (timeString) => {
  const [time, modifier] = timeString.split(' ');
  let [hours, minutes] = time.split(':');
  if (modifier === 'PM' && hours < 12) {
    hours = parseInt(hours, 10) + 12;
  }
  if (modifier === 'AM' && hours === '12') {
    hours = 0;
  }
  return new Date(0, 0, 0, hours, minutes);
};

// Function to get the next day's date
const getNextDay = (date) => {
  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + 1);
  return nextDay;
};


const Newreservation = () => {
  const currentDate = new Date();

  const [checkInDate, setCheckInDate] = useState(formatDate(currentDate));
  console.log(checkInDate, "checkInDate");

  const [checkInTime, setCheckInTime] = useState(formatTime(currentDate));
  console.log(checkInTime, "checkInTime");

  const [checkOutDate, setCheckOutDate] = useState(formatDate(getNextDay(currentDate)));
  console.log(checkOutDate, "checkOutDate");

  const [checkOutTime, setCheckOutTime] = useState(formatTime(currentDate));
  console.log(checkOutTime, "checkOutTime")

  const [dayscount, setdayscount] = useState(1);
  console.log(dayscount, "dayscount");

  const [number, setnumber] = useState(1);
  console.log(number, "number");

  const [reservationtype, setreservationtype] = useState('');
  console.log(reservationtype, "reservationtype");

  const [bookingsource, setbookingsource] = useState('');
  console.log(bookingsource, "bookingsource");

  const [businesssource, setbusinesssource] = useState('');
  console.log(businesssource, "businesssource");

  const [room, setroom] = useState([{ roomtype: "", adultcount: 1, childcount: 0, rate: "" }]);
  console.log(room, "room");

  const [state, setstate] = useState('');
  console.log(state, "state");

  const [city, setcity] = useState('');
  console.log(city, "city");

  const [inputdata, setinputdata] = useState({ name: "", number: "", email: "", address: "", country: "India", zipcode: "" });
  console.log(inputdata, "inputdata");

  const [fetchstate, setfetchstate] = useState([]);
  console.log(fetchstate, "fetchstate");

  const [fetchcity, setfetchcity] = useState([]);
  console.log(fetchcity, "fetchcity");

  const [fetchroom, setfetchroom] = useState([]);
  console.log(fetchroom, "fetchroom");

  const [fetchrate, setfetchrate] = useState([]);
  console.log(fetchrate, "fetchrate");

  // const [fetchzipcode, setfetchzipcode] = useState([]);
  // console.log(fetchzipcode, "fetchzipcode")

  const filterTimePass = (time) => {
    const selectedDate = new Date(checkInDate.split('/').reverse().join('-'));
    const selectedTime = new Date(selectedDate.setHours(time.getHours(), time.getMinutes()));
    return selectedTime.getTime() > currentDate.getTime();
  };


  useEffect(() => {
    if (checkInDate && checkOutDate) {
      // Convert 'dd/MM/yyyy' format to Date objects
      const parseDate = (dateStr) => {
        const [day, month, year] = dateStr.split('/').map(Number);
        return new Date(year, month - 1, day);
      };

      const checkIn = parseDate(checkInDate);
      const checkOut = parseDate(checkOutDate);

      // Calculate the difference in time and convert to days
      const timeDiff = checkOut.getTime() - checkIn.getTime();
      const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (dayDiff > 0) {
        setdayscount(dayDiff);
      } else {
        setdayscount(0);
      }
    }
  }, [checkInDate, checkOutDate]);

  const handleCheckInDate = (date) => {
    setCheckInDate(formatDate(date));
    setCheckOutDate(formatDate(getNextDay(date)));
  };

  const handleCheckInTime = (time) => {
    setCheckInTime(formatTime(time));
  };

  const handleCheckOutDate = (date) => {
    setCheckOutDate(formatDate(date));
  };

  const handleCheckOutTime = (time) => {
    setCheckOutTime(formatTime(time));
  };

  const handleAutocompleteChange = (value) => {
    setreservationtype(value)
  }

  const handlestate = (value) => {
    setstate(value);
  }

  const handlecity = (value) => {
    setcity(value);
  }

  const handlebooking = (value) => {
    setbookingsource(value);
  }

  const handlebusiness = (value) => {
    setbusinesssource(value)
  }

  const handleroom = () => {
    setroom([...room, { roomtype: "", rate: "", adultcount: 1, childcount: "0" }])
  }

  const handleform = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setinputdata({ ...inputdata, [name]: value })
  }

  const handleInputChange = (index, field, value) => {
    const updatedRooms = [...room];
    updatedRooms[index][field] = value;
    setroom(updatedRooms);
  }

  const handleIncrement = (index, field) => {
    const updatedRooms = [...room];
    updatedRooms[index][field] += 1;
    setroom(updatedRooms);
  }

  const handleDecrement = (index, field) => {
    const updatedRooms = [...room];
    if (field === 'adultcount') {
      // Ensure adult count does not go below 1
      if (updatedRooms[index][field] > 1) {
        updatedRooms[index][field] -= 1;
      }
    } else {
      // For children, ensure count does not go below 0
      if (updatedRooms[index][field] > 0) {
        updatedRooms[index][field] -= 1;
      }
    }
    setroom(updatedRooms);
  }

  const increment = () => {
    setnumber((prev) => prev + 1)
  }

  const decrement = () => {
    setnumber((prev) => (prev > 1 ? prev - 1 : 1))
  }

  const data = [

    { value: 'hourly', label: 'hourly' },
    { value: '24 hourly', label: '24 hourly' },

  ]

  useEffect(() => {
    async function getData() {
      const response = await axios.post("/api/pms/booking/newreservation", {
        operation: "fetchstate",
      })
      console.log(response.data.showstate, "response check---");
      setfetchstate(response.data.showstate)
    }
    getData()
  }, []);

  useEffect(() => {
    async function getcity() {
      if (fetchstate && fetchstate.length > 0) {
        const selectedState = fetchstate[0].state;
        console.log(selectedState, "selectedState");

        const response = await axios.post("/api/pms/booking/newreservation", {
          operation: "fetchcityrespectedtostate",
          state: selectedState
        })

        console.log(response.data.fetchcity, "city check--");
        setfetchcity(response.data.fetchcity)
      }
    }
    getcity()
  }, [fetchstate])

  const formatDateroom = (date) => {
    // Parse the date string from "dd/MM/yyyy" to a Date object
    const parsedDate = parse(date, 'dd/MM/yyyy', new Date());
    // Format the Date object to the desired format "EEE dd MMM"
    return format(parsedDate, 'EEE dd MMM');
  };

  const formattedCheckInDate = formatDateroom(checkInDate);
  console.log(formattedCheckInDate, "formattedCheckInDate");

  useEffect(() => {
    if (formattedCheckInDate) {
      async function getroom() {
        const response = await axios.post("/api/pms/booking/newreservation", {
          operation: "fetchroom",
          booking_date: formattedCheckInDate
        })
        console.log(response.data.findFetchRoom, "check room");
        setfetchroom(response.data.findFetchRoom);
      }
      getroom()
    }
  }, [formattedCheckInDate]);

  const roomtype = room[0].roomtype;
  console.log(roomtype, "roomtype");

  useEffect(() => {

    console.log(formattedCheckInDate, "useffect formattedCheckInDate");
    console.log(roomtype, "useffect roomtype")

    if (formattedCheckInDate && roomtype) {
      async function getrate() {
        const response = await axios.post("/api/pms/booking/newreservation", {
          operation: "fetchrate",
          booking_date: formattedCheckInDate,
          room_type: roomtype
        });
        console.log(response.data.formattedRates, "check rate");
        setfetchrate(response.data.formattedRates)
        // handle the fetched rate data here
      }
      getrate();
    }

  }, [roomtype, formattedCheckInDate]);

  // useEffect(() => {
  //   async function getzipcode() {
  //     if (fetchcity && fetchcity.length > 0) {
  //       const selectedcity = fetchcity[0].city;
  //       console.log(selectedcity, "selectedcity");

  //       const response = await axios.post("/api/pms/booking/newreservation", {
  //         operation: "fetchziprespectedtocity",
  //         city: selectedcity
  //       })
  //       console.log(response.data.fetchzipcode, "check zipcode");
  //       setfetchzipcode(response.data.fetchzipcode);
  //     }
  //   } getzipcode()
  // }, [fetchcity])


  const handlecheckin = async (e) => {
    e.preventDefault();

    const response = await axios.post("/api/pms/booking/newreservation",
      {
        operation: "addbooking",
        checkindate: checkInDate,
        checkintime: checkInTime,
        checkoutdate: checkOutDate,
        checkouttime: checkOutTime,
        dayscount: dayscount,
        roomcount: number,
        reservationtype: reservationtype,
        bookingsource: bookingsource,
        businessource: businesssource,
        room: room,
        guestname: inputdata.name,
        guestnumber: inputdata.number,
        guestemail: inputdata.email,
        guestaddress: inputdata.address,
        guestcountry: inputdata.country,
        guestzipcode: inputdata.zipcode,
        gueststate: state,
        guestcity: city,
      }
    );
    console.log(response.data, "chekc heree")
    if (response.data.status === 200) {
      alert(response.data.message)
      setCheckInDate(formatDate(currentDate));
      setCheckInTime(formatTime(currentDate));
      setCheckOutDate(formatDate(getNextDay(currentDate)));
      setCheckOutTime(formatTime(currentDate));
      setdayscount('');
      setnumber('1');
      setreservationtype('');
      setbookingsource('');
      setbusinesssource('');
      setroom([{ roomtype: "", ratetype: "", adultcount: 1, childcount: 0, rate: "" }]);
      setstate('');
      setcity('');
      setinputdata({ name: "", number: "", email: "", address: "", country: "India", zipcode: "" });
    }
  }

  return (
    <div className="pt-12">
      <div className="border bg-black/10 w-full p-2 flex justify-between">
        <div className="border rounded-lg border-black/40 w-full bg-white">
          <div className="pt-4 w-[95%] m-auto">
            <div className="flex gap-4">
              <div className="w-[45%]">
                <label>Check-In</label>
                <div className="border border-black/40 w-full flex rounded-lg ">
                  <div className="w-[55%] flex justify-evenly items-center pt-1 pb-1">
                    <DatePicker
                      selected={parseDate(checkInDate)}
                      onChange={handleCheckInDate}
                      className="border-none outline-none text-center w-full"
                      // minDate={currentDate}
                      dateFormat="dd/MM/yyyy"
                    />
                    <Calendar className="w-[30%]" />
                  </div>
                  <div className="border border-l-black/40 w-[45%] flex justify-evenly items-center pt-1 pb-1">
                    <DatePicker
                      selected={parseTime(checkInTime)}
                      onChange={handleCheckInTime}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                      minDate={currentDate}
                      filterTime={filterTimePass}
                      className="time-picker border-none outline-none w-full text-center"
                    />
                    <Clock className="w-[30%]" />
                  </div>
                </div>
              </div>

              <div className="w-[10%]">
                <div className="h-[24px]"></div>
                <div className=" rounded-lg h-[36px] text-white font-semibold bg-blue-500 text-xs flex flex-col items-center">
                  <p>{dayscount}</p>
                  <p>{dayscount !== 1 ? 'Days' : 'Days'}</p>
                </div>
              </div>

              <div className="w-[45%]">
                <label>Check-Out</label>
                <div className=" rounded-lg border border-black/40 w-full flex">
                  <div className="w-[55%] flex justify-evenly items-center py-2 ">
                    <DatePicker
                      selected={parseDate(checkOutDate)}
                      onChange={handleCheckOutDate}
                      className="border-none outline-none w-full text-center"
                      minDate={getNextDay(parseDate(checkInDate))}
                      dateFormat="dd/MM/yyyy"
                    />
                    <Calendar className="w-[30%]" />
                  </div>
                  <div className="border border-l-black/40 w-[45%] flex justify-evenly items-center pt-1 pb-1 ">
                    <DatePicker
                      selected={parseTime(checkOutTime)}
                      onChange={handleCheckOutTime}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                      className="time-picker border-none outline-none w-full text-center"
                    />
                    <Clock className="w-[30%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-between">
              <div className="w-[13%]">
                <div className="h-[24px]">
                  <p>Room(s)</p>
                </div>
                <div className="h-[36px] flex rounded-lg ">
                  <div className="border rounded-lg border-black/40 w-[60%] h-[34px] flex justify-center item-center">
                    <p className="flex justify-center items-center text-center">
                      {number}
                    </p>
                  </div>
                  <div className="border rounded-lg border-r-black/40 border-t-black/40 border-b-black/40 w-[40%] h-[34px] flex flex-col">
                    <div
                      onClick={decrement}
                      className="w-[100%] border border-b-black/40 h-[16px] flex justify-center item-center cursor-pointer"
                    >
                      <ChevronUp className="w-[15px] h-[15px]" />
                    </div>
                    <div
                      onClick={increment}
                      className="w-[100%] h-[16px] flex justify-center item-center cursor-pointer"
                    >
                      <ChevronDown className="w-[15px] h-[15px]" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-[42%]">
                <div className="h-[24px]">
                  <p>Reservation Type</p>
                </div>
                <div className="h-[36px] flex">
                  <Autocomplete
                    onInputChange={handleAutocompleteChange}
                    value={reservationtype}
                    className=""
                    variant="bordered"
                    radius="sm"
                    size="sm"
                  >
                    {data.map((animal) => (
                      <AutocompleteItem key={animal.value} value={animal.value}>
                        {animal.label}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                </div>
              </div>

              <div className=" w-[42%]">
                <div className="h-[24px]">
                  <p>Booking Source</p>
                </div>
                <div className=" h-[36px] flex">
                  <Autocomplete
                    onInputChange={handlebooking}
                    value={bookingsource}
                    className=""
                    variant="bordered"
                    radius="sm"
                    size="sm"
                  >
                    {data.map((animal) => (
                      <AutocompleteItem key={animal.value} value={animal.value}>
                        {animal.label}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                </div>
              </div>
            </div>

            <div className="mt-4 flex">
              <div className="w-[42%]">
                <div className="h-[24px]">
                  <p>Business Source</p>
                </div>
                <div className=" h-[36px] flex">
                  <Autocomplete
                    value={businesssource}
                    onInputChange={handlebusiness}
                    variant="bordered"
                    radius="sm"
                    size="sm"
                  >
                    {data.map((animal) => (
                      <AutocompleteItem key={animal.value} value={animal.value}>
                        {animal.label}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                </div>
              </div>
            </div>

            {room && room.map((room, index) => (
              <div className="w-full mt-10">
                <div className="mt-4 flex justify-between">
                  <div className="w-[48%]">
                    <div className="h-[24px]">
                      <p>Room Name</p>
                    </div>
                    <div className=" h-[36px] flex">
                      <Autocomplete
                        // label="Select an type"
                        variant="bordered"
                        radius="sm"
                        size="sm"
                        value={room.roomtype}
                        onInputChange={(value) => handleInputChange(index, 'roomtype', value)}
                      >
                        {fetchroom.map((e) => (
                          <AutocompleteItem
                            key={e.room_type}
                            value={e.room_type}
                          >
                            {e.room_type}
                          </AutocompleteItem>
                        ))}
                      </Autocomplete>
                    </div>
                  </div>

                  <div className="w-[48%]">
                    <div className="h-[24px]">
                      <p>Rate(RS) (Tax Inc.)</p>
                    </div>
                    <div className=" h-[36px] flex">
                      {console.log(room.rate, "string")}
                      <Autocomplete

                        // label="Select an type"
                        variant="bordered"
                        radius="sm"
                        size="sm"
                        value={room.rate}
                        onInputChange={(value) => handleInputChange(index, 'rate', value)}
                      >
                        {fetchrate.map((e) => (
                          <AutocompleteItem
                            key={e.rate_24hr}
                            value={e.rate_24hr}
                          >
                            {e.rate_24hr}
                          </AutocompleteItem>
                        ))}
                      </Autocomplete>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex ">
                  <div className="w-[13%]">
                    <div className="h-[24px]">
                      <p>Adult</p>
                    </div>
                    <div className="border rounded-lg border-black/40 h-[36px] flex">
                      <div className="w-[60%] h-[34px] text-center flex justify-center items-center">
                        <p>{room.adultcount}</p>
                      </div>
                      <div className="w-[40%] flex flex-col h-[34px] border border-l-black/40">
                        <div
                          onClick={() => handleDecrement(index, 'adultcount')}
                          className="border-b w-[100%] h-[16px] flex justify-center item-center cursor-pointer"
                        >
                          <ChevronUp className="w-[15px] h-[15px]" />
                        </div>
                        <div
                          onClick={() => handleIncrement(index, 'adultcount')}
                          className="w-[100%] h-[16px] flex justify-center item-center cursor-pointer"
                        >
                          <ChevronDown className="w-[15px] h-[15px]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-[13%] ml-3">
                    <div className="h-[24px]">
                      <p>child</p>
                    </div>
                    <div className="border rounded-lg border-black/40 h-[36px] flex">
                      <div className="w-[60%] h-[34px] text-center flex justify-center items-center">
                        <p>{room.childcount}</p>
                      </div>
                      <div className="border border-l-black/40 w-[40%] h-[36px] flex flex-col">
                        <div
                          onClick={() => handleDecrement(index, 'childcount')}
                          className="border-b w-[100%] h-[16px] flex justify-center item-center cursor-pointer"
                        >
                          <ChevronUp className="w-[15px] h-[15px]" />
                        </div>
                        <div
                          onClick={() => handleIncrement(index, 'childcount')}
                          className="w-[100%] h-[16px] flex justify-center item-center cursor-pointer"
                        >
                          <ChevronDown className="w-[15px] h-[15px]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="w-[32%] ml-3">
                    <div className="h-[24px]">
                      <p>Rate(RS) (Tax Inc.)</p>
                    </div>
                    <div className=" h-[36px] flex">
                      <Input
                        type="text"
                        placeholder="0.00"
                        startContent={"₹"}
                        value={room.rate}
                        onChange={(e) => handleInputChange(index, 'rate', e.target.value)}
                        classNames={{
                          label: "text-black/50 dark:text-white/90",
                          innerWrapper: "bg-transparent, pb-0 ",
                          mainwrapper: "h-0",
                          inputWrapper: [
                            "pt-0",
                            "pb-0",
                            "h-full",
                            "bg-white",
                            "border",
                            "border-foreground-300",
                            "rounded-lg",
                            "text-xs",
                            "min-h-0",
                          ],
                        }}
                      />
                    </div>
                  </div> */}
                </div>
              </div>
            ))}

            <div className="mt-4 w-[15%]">
              <Button color="primary" variant="solid" radius="sm" onClick={handleroom}>
                Add Room
              </Button>
            </div>


            <div className="w-full mt-10">
              <p>GUEST INFORMATION</p>

              <div className="w-full flex justify-between flex-wrap mt-5">
                <div className="w-[48%]">
                  <label>Guest Name</label>
                  <div>
                    <Input
                      type="text"
                      placeholder="Enter Your Name"
                      name="name"
                      value={inputdata.name}
                      onChange={handleform}
                      radius="sm"
                      variant="bordered"
                    />
                  </div>
                </div>

                <div className=" w-[48%]">
                  <label>Mobile</label>
                  <div>
                    <Input
                      type="text"
                      placeholder="Enter the Mobile No."
                      name="number"
                      value={inputdata.number}
                      onChange={handleform}
                      variant="bordered"
                      radius="sm"
                    />
                  </div>
                </div>

                <div className=" w-[48%] mt-3">
                  <label>Email</label>
                  <div>
                    <Input
                      type="text"
                      placeholder="Enter the Email"
                      name="email"
                      value={inputdata.email}
                      onChange={handleform}
                      variant="bordered"
                      radius="sm"
                    />
                  </div>
                </div>

                <div className=" w-[48%] mt-3">
                  <label>Address</label>
                  <div>
                    <Input
                      type="text"
                      placeholder="Enter the Address"
                      name="address"
                      value={inputdata.address}
                      onChange={handleform}
                      variant="bordered"
                      radius="sm"
                    />
                  </div>
                </div>

                <div className=" w-[48%] mt-3">
                  <label>Country</label>
                  <div className="h-[40px] border shadow flex justify-start items-center pl-[0.75rem] rounded-lg">
                    <p>{inputdata.country}</p>
                  </div>
                </div>

                <div className="w-[48%] mt-3">
                  <label>State</label>
                  <Autocomplete
                    label="Select an State"
                    onInputChange={handlestate}
                    value={state}
                    variant="bordered"
                    radius="sm"
                    size="sm"
                  >
                    {fetchstate.map((e) => (
                      <AutocompleteItem key={e.state} value={e.state}>
                        {e.state}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                </div>

                <div className="w-[48%] mt-3">
                  <label>City</label>
                  <Autocomplete
                    label="Select the city"
                    onInputChange={handlecity}
                    value={city}
                    className=""
                    variant="bordered"
                    radius="sm"
                    size="sm"
                  >
                    {fetchcity.map((e) => (
                      <AutocompleteItem key={e.city} value={e.city}>
                        {e.city}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                </div>

                <div className="w-[48%] mt-3">
                  <label>Zip</label>
                  <div>
                    <Input
                      type="text"
                      placeholder="Enter Zipcode"
                      name="zipcode"
                      value={inputdata.zipcode}
                      onChange={handleform}
                      variant="bordered"
                      radius="sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[100%] flex my-10 justify-between">
              <div className="w-[45%]"></div>
              <div className="w-[45%] flex justify-between">
                <div>
                  <Button color="primary" variant="solid" radius="sm">
                    Cancel
                  </Button>
                </div>
                <div >
                  <Button color="primary" variant="solid" radius="sm" onClick={(e) => handlecheckin(e)}>
                    Check In
                  </Button>
                </div>
                <div >
                  <Button color="primary" variant="solid" radius="sm">
                    Reserve
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newreservation;