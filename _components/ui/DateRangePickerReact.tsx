'use client'
import React, { useState, useEffect, useCallback, useRef } from "react";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { cn } from "@/_lib/utils";
import { addDays, format } from "date-fns"
import  { Button } from "@/_components/ui/Button";
import { CiCalendar } from "react-icons/ci";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/_components/ui/Popover"

export default function Daterangepickerreact({
    className,
    initialDate,
    onDateValue,
  }: {
    className?: string;
    initialDate: DateRange;
    onDateValue: (dateRange: any) => void;
  }) {
    const [popoverOpen, setPopoverOpen] = React.useState(false);
    const [date, setDate] = useState(() => {
        if (initialDate) {
            return (
                [
                    {
                        startDate: new Date(),
                        endDate: addDays(new Date(), 6),
                        key: 'selection'
                    } as any 
                ]
            )
        }else{
            return (
                [
                    {
                        startDate: new Date(),
                        endDate: null,
                        key: 'selection'
                    } as any 
                ]
            )
        }
    });

    const handleSelect = (item : any) => {
        console.log("New Date: ",item)
        setDate([item.selection])
    }

    useEffect(() => {
        if (date) {
          onDateValue(date);
        }
      }, [date, onDateValue]);

    return (

        <><div className={cn("grid gap-2", className)}>
            <Popover open={popoverOpen} onOpenChange={(newState) => setPopoverOpen(newState)}>
                <PopoverTrigger asChild className="text-black bg-white">
                <Button
            id="date"
            variant={"destructive"}
            className={cn(
              "w-[250px] justify-center text-center font-normal",
              !date && "text-black bg-white"
            )}
          >
            <CiCalendar className="mr-2 size-4" />
            {date[0]?.startDate ? (
             date[0]?.endDate ? (
                <>
                  {format(date[0]?.startDate, "LLL dd, y")} : {format(date[0]?.endDate, "LLL dd, y")}
                </>
              ) : (
                format(date[0]?.startDate, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
                     </PopoverTrigger>
        <PopoverContent className="w-auto p-0 text-black bg-white" align="start">
        <DateRange
                className='bg-white rounded-lg border-2 border-gray-300 h-90 w-66 overflow-hidden'
                editableDateInputs={true}
                onChange={(item: any) => handleSelect(item)}
                moveRangeOnFirstSelection={false}
                ranges={date}
                months={2}
                direction="horizontal"
                minDate={new Date()}  />

                </PopoverContent>
            </Popover>

        </div></>

    );
}
