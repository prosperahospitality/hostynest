'use client'
import { useState, useEffect } from "react";
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import { PlusCircle, MinusCircle } from 'lucide-react';
import { cn } from "@/_lib/utils";
import { PiUsersLight } from "react-icons/pi";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";

const IncDecfunc = ({ title, description, onChange, value }) => {
  function increment() {
    onChange(value + 1);
  }

  function decrement() {
    onChange(value > 0 ? value - 1 : 0);
  }

  return (
    <div className="py-2 px-4 flex grid-cols-2 gap-12">
      <div className="w-60">
        <h1 className="text-base">{title}</h1>
        <h4>{description}</h4>
      </div>

      <div className="flex gap-4 items-center text-gray-500">
        <Button isIconOnly variant="shadow" color="primary" size="sm" isDisabled={ value === 0 } onClick={decrement}><FiMinus /></Button>
        <h1 className="text-lg">{value}</h1>
        <Button isIconOnly variant="shadow" color="primary" size="sm" onClick={increment}><GoPlus /></Button>
      </div>
    </div>
  );
};

const AdultsRoomfunc = ({ title, description, onChange, value }) => {
    function increment() {
      onChange(value + 1);
    }
  
    function decrement() {
      onChange(value > 1 ? value - 1 : 1);
    }

  return (
    <div className="py-2 px-4 flex grid-cols-2 gap-12">
      <div className="w-60">
        <h1 className="text-base">{title}</h1>
        <h4>{description}</h4>
      </div>

      <div className="flex gap-4 items-center text-gray-500">
        <Button isIconOnly variant="shadow" color="primary" size="sm" isDisabled={ value === 0 } onClick={decrement}><FiMinus /></Button>
        <h1 className="text-lg">{value}</h1>
        <Button isIconOnly variant="shadow" color="primary" size="sm" onClick={increment}><GoPlus /></Button>
      </div>
    </div>
  );
};

export default function RoomsAndGuests({onAdultsSelect, onChildSelect, onInfantsSelect, onRoomsSelect, onPetsSelect}) {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [pets, setPets] = useState(0);
  const [buttonText, setButtonText] = useState("Add Guest");
  // const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleDoneClick = () => {
    setButtonText(`Adults: ${adults}, Rooms: ${rooms}`);
    // Close the popover and update the button text
    // setIsPopoverOpen(true);
  };

  useEffect(() => {
    const checkAndCallFunction = (func, arg) => {
      console.log("Function Name: ",func)
      if (typeof func === 'function') {
        func(arg);
      } else {
        console.error(`${func} is not a function.`);
      }
    };
  
    checkAndCallFunction(onAdultsSelect, adults);
    checkAndCallFunction(onChildSelect, children);
    checkAndCallFunction(onInfantsSelect, infants);
    checkAndCallFunction(onRoomsSelect, rooms);
    checkAndCallFunction(onPetsSelect, pets);
  }, [adults, children, infants, rooms, pets, onAdultsSelect, onChildSelect, onInfantsSelect, onRoomsSelect, onPetsSelect]);

  return (
    <div className="flex items-center ml-2">
      <Popover
        placement="bottom"
        onVisibleChange={(visible) => setIsPopoverOpen(visible)}
      >
        <PopoverTrigger asChild className="text-black bg-white">
          <Button
            variant="destructive"
            className={cn(
              "w-[180px] justify-center text-center font-normal"
            )}
            onClick={handleDoneClick}
          >
            <PiUsersLight className="size-6 text-gray-500" />
            <span className="font-semibold text-gray-500">{buttonText}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="bg-white">
          <AdultsRoomfunc title="Adults" description="Ages 13 or above" onChange={setAdults} value={adults} />
          <IncDecfunc title="Children" description="Ages 2–12" onChange={setChildren} value={children} />
          <IncDecfunc title="Infants" description="Under 2" onChange={setInfants} value={infants} />
          <AdultsRoomfunc title="Rooms" description="Room Count" onChange={setRooms} value={rooms} />
          <IncDecfunc title="Pets" description={<a href="/" className="hover:underline">Bringing a service animal?</a>} onChange={setPets} value={pets} />
          {/* <Button color="secondary" variant="shadow" size="md" >
            Done
          </Button> */}
        </PopoverContent>
      </Popover>
    </div>
  );
}