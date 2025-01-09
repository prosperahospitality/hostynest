"use client"
import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format } from "date-fns"
import { DateRange, SelectRangeEventHandler } from "react-day-picker"
import { cn } from "@/_lib/utils"
import  { Button } from "@/_components/ui/Button";
import { Calendar } from "@/_components/ui/Calendar"
import { CiCalendar } from "react-icons/ci";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/_components/ui/Popover"

export default function Daterangepicker({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 0),
  });

  const [popoverOpen, setPopoverOpen] = React.useState(false);

  const today = new Date();

  const modifiers = {
    disabled: { before: today, after: addDays(today, 365) },
  };

  // const handleSelect = (selectedDate: DateRange) => {
  //   setDate(selectedDate);

  //   // Close the popover only when both 'from' and 'to' dates are selected
  //   if (selectedDate?.from && selectedDate?.to) {
  //     setPopoverOpen(false);
  //   }
  // };

  const handleSelect: SelectRangeEventHandler = (selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
  
      // Close the popover only when both 'from' and 'to' dates are selected
      if (selectedDate.from && selectedDate.to) {
        setPopoverOpen(false);
      }
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={popoverOpen} onOpenChange={(newState) => setPopoverOpen(newState)}>
        <PopoverTrigger asChild className="text-gray-600 bg-white">
          <Button
            id="date"
            variant={"destructive"}
            className={cn(
              "w-[250px] justify-center text-center font-normal",
              !date && "text-black bg-white"
            )}
          >
            <CiCalendar className="mr-2 size-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} : {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 text-black bg-white" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
            modifiers={modifiers}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}