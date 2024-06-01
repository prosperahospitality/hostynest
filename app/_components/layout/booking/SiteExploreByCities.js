'use client'
import Image from 'next/image';
import { IMAGES } from '@/public/index';
import { Card, CardBody, Button } from '@nextui-org/react';


export default function Explorebycities() {

  const cities = [
    {
      title: "Mumbai",
      img: IMAGES.Mumbai,
    },
    {
      title: "Delhi",
      img: IMAGES.Delhi,

    },
    {
      title: "Kolkata",
      img: IMAGES.Kolkata,

    },
    {
      title: "Bangalore",
      img: IMAGES.Bangalore,

    },
    {
      title: "Hyderabad",
      img: IMAGES.Hyderabad,

    },
    {
      title: "Chennai",
      img: IMAGES.Chennai,

    },
    {
      title: "Noida",
      img: IMAGES.Noida,

    },
    {
      title: "Gurgaon",
      img: IMAGES.Gurgaon,

    },
    {
      title: "Pune",
      img: IMAGES.Pune,

    },
    {
      title: "All Cities",
      img: IMAGES.Allcities,

    },
  ];


  return (
    <div className='w-full static -z-10'>
      <div className="px-6 py-10 sm:px-6 sm:py-24  lg:px-8 bg-background text-foreground">
        <h1 className="text-5xl pb-10 pl-5">Trending destinations</h1>
        <div className=" gap-4 grid grid-cols-2 sm:grid-cols-6">
        </div>
        <div className="mx-auto grid w-fit items-center space-y-4 px-2 py-6 md:grid-cols-2 md:gap-6 md:space-y-2 lg:grid-cols-10">

          {cities.map((citie, index) => (
            <Card shadow="sm" key={index} isPressable >
              <CardBody className="p-0">
                <Image
                  width={200}
                  height={200}
                  alt="Logo"
                  src={citie.img}
                />
                <div className="text-sm justify-between bg-background text-foreground text-center">
                  <b>{citie.title}</b>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
      <div className="px-2 py-4 sm:px-6 sm:py-4  lg:px-8 bg-background text-foreground">
        <h1 className="text-5xl pb-10 pl-5">Quick and easy trip planner</h1>
        <h3 className="text-xl pl-5">Pick a vibe and explore the top destinations in India</h3>
        <div className=" gap-4 grid grid-cols-2 sm:grid-cols-6">

          <div className="mx-auto grid w-fit items-center space-y-4 px-2 py-6 md:grid-cols-2 md:gap-6 md:space-y-2 lg:grid-cols-10">


            <div className="flex absolute mt-2 w-fit gap-4 pl-2 pr-2 pt-2 pb-2 rounded-xl  justify-center items-center shadow-lg  border-gray-200 m-auto h-auto transition-all duration-200 delay-200 ease-in-out text-black">


            </div>
          </div>


        </div>
      </div>
    </div>
  )
}
