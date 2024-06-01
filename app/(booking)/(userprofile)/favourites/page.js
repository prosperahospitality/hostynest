'use client'
import React from 'react'
import {Tabs, Tab, Card, CardBody, CardHeader} from "@nextui-org/react";
import HourlyStay from '@/app/(booking)/(userprofile)/favourites/HourlyStay'
import FullDayStay from '@/app/(booking)/(userprofile)/favourites/FullDayStay'


const Favoritespage = () => {
    const [selected, setSelected] = React.useState("hourlystay");


  return (
    <div className=' w-full h-full'>
    <div className='w-full h-[95%] pt-16 p-2 space-y-2 overflow-y-scroll'>
      <Tabs 
        aria-label="Options"         
        selectedKey={selected}
        onSelectionChange={setSelected}
      >
        <Tab key="hourlystay" title="Hourly Stay">
          <Card className='shadow-none'>
            <CardBody >
                <HourlyStay />  
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="fulldaystay" title="Full Day Stay">
          <Card className='shadow-none'>
            <CardBody>
                <FullDayStay />  
            </CardBody>
          </Card>  
        </Tab>
      </Tabs>
    </div>
    </div>
  )
}

export default Favoritespage;