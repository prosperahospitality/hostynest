'use client'
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/_components/ui/Tabs';
import HourlyBooking from '@/_components/ui/HourlyBooking';
import DayBooking from '@/_components/ui/DayBooking';


export default function Bookingselctor() {

  return (
    <Tabs
      defaultValue="hourlybooking">
      <div >
        <TabsList className="bg-white w-fit m-auto rounded-xl rounded-b-none z-10">
          <TabsTrigger className="rounded-lg text-black" value="hourlybooking">
            Hourly Booking
          </TabsTrigger>
          <TabsTrigger className="rounded-lg text-black" value="fulldaybooking">
            Full Day Booking
          </TabsTrigger>
        </TabsList>
      </div>
      <div className="flex">
        <TabsContent value="hourlybooking" className="text-center w-fit rounded-tr-xl rounded-b-xl bg-white shadow-xl -mt-2">
          <HourlyBooking searchCity={undefined} />
        </TabsContent>
        <TabsContent value="fulldaybooking" className="text-center w-fit rounded-tr-xl rounded-b-xl bg-white shadow-xl -mt-2">
          <DayBooking />
        </TabsContent>
      </div>
    </Tabs>
  );
}