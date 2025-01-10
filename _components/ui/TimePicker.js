'use client'
import React, { useState } from 'react'
import moment from 'moment';
import Button from "@nextui-org/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/_components/ui/Card";
import { Input } from "@/_components/ui/Input";
import { Label } from "@/_components/ui/Label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/_components/ui/Tabs";

import DayBooking from "@/_components/ui/DayBooking";
import HourlyBooking from "@/_components/ui/HourlyBooking";
import { CalendarCheck2, Clock } from 'lucide-react';


export default function TimePicker () {

  return (
    <div className='sticky w-fit bg-white rounded-xl  pr-2 pl-2 pb-1 -mb-32'>
        <Tabs defaultValue="hourlybooking">
          <div className="flex justify-center">
          <TabsList className="flex justify-center bg-white">
            <TabsTrigger className="rounded-lg text-black" value="hourlybooking">
              Am
            </TabsTrigger>
            <TabsTrigger className="rounded-lg text-black" value="fulldaybooking">
              Pm
            </TabsTrigger>
          </TabsList>
          </div>
          <div className="flex justify-center">
            <TabsContent value="hourlybooking" className="text-center">
              <AmTimePickerTab />
            </TabsContent>
            <TabsContent value="fulldaybooking" className="text-center">
              {/* <DayBooking /> */}
            </TabsContent>
          </div>
        </Tabs>
      </div>
  );
}



const AmTimePickerTab = () => {
  let intime = '12:00 AM';
  let outtime = '11:00 AM';
  const [result, setResult] = useState([]);
  console.log('Array', result);

  function intervals(startString, endString) {
    var start = moment(startString, 'hh:mm a');
    var end = moment(endString, 'hh:mm a');
    start.minutes(Math.ceil(start.minutes() / 60) * 60);

    var current = moment(start);

    while (current <= end) {
      if (result.includes(current.format('hh:mm a'))) {
        return null;
      } else {
        result.push(current.format('hh:mm a'));
        current.add(60, 'minutes');
      }
    }

    return result;
  }

  intervals(intime, outtime);

  return (
    <div className='grid grid-cols-4 max-w-full mx-auto gap-4'>
      {result && result.length > 0
        ? result.map((time, index) => (
            <div
              key={index}
              className='bg-white text-center rounded-md p-4 text-gray-500'
            >
              <p className='font-bold font-sans'>{time}</p>
            </div>
          ))
        : null}
    </div>
  );
};