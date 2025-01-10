'use client'
import * as React from "react"
import { Card, CardContent } from "@/_components/ui/Card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/_components/ui/Carousel"
import { School, Plane, Home, TentTree, TrainFront, BusFront, CarTaxiFront } from 'lucide-react';

export default function PropertyCarousel() {

  const destinations = [
    {
      title: "Amazing views",
      icon: <School />,
    },
    {
      title: "Tiny homes",
      icon: <Plane />,
    },
    {
      title: "Farms",
      icon: <Home />,
    },
    {
      title: "OMG!",
      icon: <TentTree />,
    },
    {
      title: "Tropical",
      icon: <TrainFront />,
    },
    {
      title: "Bed & breakfasts",
      icon: <BusFront />,
    },
    {
      title: "Rooms",
      icon: <CarTaxiFront />,
    },
    {
      title: "National parks",
      icon: <BusFront />,
    },
    {
      title: "Earth homesCabins",
      icon: <BusFront />,
    },
    {
      title: "Beachfront",
      icon: <BusFront />,
    },
    {
      title: "Amazing pools",
      icon: <BusFront />,
    },
    {
      title: "Vineyards",
      icon: <BusFront />,
    },
    {
      title: "Mansions",
      icon: <BusFront />,
    },
    {
      title: "Creative spaces",
      icon: <BusFront />,
    },
    {
      title: "Top of the world",
      icon: <BusFront />,
    },
    {
      title: "Historical homes",
      icon: <BusFront />,
    },
    {
      title: "Skiing",
      icon: <BusFront />,
    },
    {
      title: "Lakefront",
      icon: <BusFront />,
    },
    {
      title: "Containers",
      icon: <BusFront />,
    },
    {
      title: "Iconic cities",
      icon: <BusFront />,
    },
    {
      title: "New",
      icon: <BusFront />,
    },
    {
      title: "Lake",
      icon: <BusFront />,
    },
    {
      title: "Castles",
      icon: <BusFront />,
    },
    {
      title: "Countryside",
      icon: <BusFront />,
    },
    {
      title: "Caves",
      icon: <BusFront />,
    },
    {
      title: "Design",
      icon: <BusFront />,
    },
    {
      title: "Treehouses",
      icon: <BusFront />,
    },
    {
      title: "Arctic",
      icon: <BusFront />,
    },
    {
      title: "Trending",
      icon: <BusFront />,
    },
    {
      title: "Camper vans",
      icon: <BusFront />,
    },
    {
      title: "Islands",
      icon: <BusFront />,
    },
    {
      title: "Camping",
      icon: <BusFront />,
    },
    {
      title: "Surfing",
      icon: <BusFront />,
    },
    {
      title: "A-frames",
      icon: <BusFront />,
    },
    {
      title: "Golfing",
      icon: <BusFront />,
    },
    {
      title: "Hanoks",
      icon: <BusFront />,
    },
    {
      title: "Luxe",
      icon: <BusFront />,
    },
    {
      title: "Cycladic homes",
      icon: <BusFront />,
    },
    {
      title: "Chef's kitchens",
      icon: <BusFront />,
    },
    {
      title: "Play",
      icon: <BusFront />,
    },
    {
      title: "Minsus",
      icon: <BusFront />,
    },
    {
      title: "Windmills",
      icon: <BusFront />,
    },
    {
      title: "Shepherd's huts",
      icon: <BusFront />,
    },
    {
      title: "Off-the-grid",
      icon: <BusFront />,
    },
    {
      title: "Ryokans",
      icon: <BusFront />,
    },
    {
      title: "Casas particulares",
      icon: <BusFront />,
    },
    {
      title: "Desert",
      icon: <BusFront />,
    },
    {
      title: "Domes",
      icon: <BusFront />,
    },
    {
      title: "Yurts",
      icon: <BusFront />,
    },
    {
      title: "Towers",
      icon: <BusFront />,
    },
    {
      title: "Barns",
      icon: <BusFront />,
    },
    {
      title: "Ski-in/out",
      icon: <BusFront />,
    },
    {
      title: "Adapted",
      icon: <BusFront />,
    },
    {
      title: "Houseboats",
      icon: <BusFront />,
    },
    {
      title: "Boats",
      icon: <BusFront />,
    },
    {
      title: "Grand pianos",
      icon: <BusFront />,
    },
    {
      title: "Dammusi",
      icon: <BusFront />,
    },
    {
      title: "Trulli",
      icon: <BusFront />,
    },
    {
      title: "Riads",
      icon: <BusFront />,
    },
    {
      title: "Beach",
      icon: <BusFront />,
    },
  ];


  return (
    <Carousel
  opts={{
    align: "start",
  }}
  className="w-full max-w-5xl z-10"
>
      <CarouselContent className="">
        {destinations.map((destination, index) => (
          <CarouselItem key={index} className="w-fit text-wrap overflow-hidden lg:basis-1/12 text-center">
            <Card className="border-0 h-14 hover:bg-purple-400">
              <CardContent className="flex flex-col items-center justify-center p-0">
                <span className="text-purple-500">{destination.icon}</span>
                <span className=" text-black text-wrap text-xs font-semibold">{destination.title}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious variant="destructive" className="text-black hover:text-purple-500" />
      <CarouselNext variant="destructive" className="text-black hover:text-purple-500" />
    </Carousel>
  )
}
