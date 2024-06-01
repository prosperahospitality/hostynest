'use client'
import React from 'react'
import { CardContainer } from '@/app/(booking)/(userprofile)/wallet/CardContainer'
import { Tabs, Tab, Card, CardBody, Chip, Button, Select, SelectItem, Avatar } from "@nextui-org/react";
import { Orbitron } from 'next/font/google'
import { CiCircleCheck } from "react-icons/ci";
import { VscHistory } from "react-icons/vsc";
import InfoModal from '@/app/(booking)/(userprofile)/wallet/InfoModal'
import UsePolicyModal from '@/app/(booking)/(userprofile)/wallet/UsePolicyModal'
import Image from 'next/image'
import { IMAGES } from '@/public/index'

const Orbitron400 = Orbitron({
  weight: '400',
  subsets: ['latin'],
})

const filtersvalue = [
  { label: "All", value: "all" },
  { label: "Last Month", value: "lastmonth" },
  { label: "Last 3 Month", value: "last3month" },
];



const Walletpage = () => {
  return (
    <div className=' w-full h-full flex items-center justify-between'>
      <div className='w-full h-full pt-16'>
        <div className='w-full h-fit p-2 flex gap-6'>
          <div className='w-[65%] h-60 rounded-3xl shadow-xl flex p-4 gap-6'>
            <div className='w-[30%] text-center'>
              <Avatar
                radius="full"
                className='h-20 w-20 mx-auto'
                src="https://www.svgrepo.com/show/509009/avatar-thinking-3.svg"
              />
              <h3 className='text-lg font-semibold text-gray-500'>Rohit Gawade</h3>
              <Chip color="" radius="sm" variant="flat" className="text-[#FFDF00] bg-yellow-100" startContent={<GoldMedal size={25} />} >Gold Membership</Chip>
            </div>
            <div className='w-[70%]'>
              <div className='flex justify-between'>
                <h2 className='text-xl text-gray-500'>How to Use ?</h2>
                <InfoModal />
              </div>
              <div className='flex text-center gap-2'>
                <Asterisk size={20} />
                <h6 className='text-xs'>Check Your Reward Points</h6>
              </div>
              <div className='flex text-center gap-2'>
                <Asterisk size={20} />
                <h6 className='text-xs'>Select the Time, Date & Destination of your choice</h6>
              </div>
              <div className='flex text-center gap-2'>
                <Asterisk size={20} />
                <h6 className='text-xs'>Select the Type of room & Duration of your stay</h6>
              </div>
              <div className='flex text-center gap-2'>
                <Asterisk size={20} />
                <h6 className='text-xs'>Proceed to payment & Check the use my points box</h6>
              </div>
              <div className='flex text-center gap-2'>
                <Asterisk size={20} />
                <h6 className='text-xs'>Reward point can be used to get discount on your stay or to upgrade your stay</h6>
              </div>
              <div className='mt-4 flex gap-4'>
                <Button color='primary' variant='shadow' >Redeem Points</Button>
                <UsePolicyModal />
              </div>
            </div>
          </div>
          <div className='w-[35%] h-full rounded-3xl'>
            <div className="h-60 w-full flex items-center justify-center relative">
              <CardContainer
                title="Rohit Gawade"
                rewardpoints="1600"
              >
                <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 w-96 h-60 ">
                  <div className="w-full rounded-lg" >
                    <h1 className={`${Orbitron400.className} text-3xl text-white font-semibold tracking-wider`}>Rohit Gawade</h1>
                    <div className='mt-4'>
                      <div className='flex justify-between'>
                        <div className={Orbitron400.className}>
                          <h4 className='text-xs'>Reward Points</h4>
                          <div className='flex gap-2'>
                            <h2 className='text-xl text-white'>1600</h2>
                            <h6 className='text-xs mt-2'>pts</h6>
                          </div>
                        </div>
                        <ChipIcon className="mt-4 mr-4" height={45} width={45} fill='#FFDF00' />
                      </div>
                      <span className={`${Orbitron400.className} mt-4 w-full tracking-widest`}>1234 5678 9012 3456</span>
                      <h4 className={`${Orbitron400.className} mt-2 w-full tracking-widest shadow-inherit text-[#ffe344]`}>Gold Membership</h4>
                      <div className={`${Orbitron400.className} mt-6 flex justify-between`}>
                        <h6 className='tracking-widest text-sm'>Valid till</h6>
                        <h6 className='tracking-widest text-sm'>01/2099</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContainer>
            </div>
          </div>
        </div>
        <div className='w-full h-16 p-2 shadow-xl rounded-xl flex'>
          <div className='w-[50%]'>
            <h4 className='text-lg ml-4 text-gray-500'>Refer your friends and get <span className='text-4xl text-primary font-semibold'>250 reward points</span></h4>
          </div>
          <div className='w-[50%] relative'>
            <Image
              src={IMAGES.Rewardssectionreferral}
              alt="Rewardssectionreferral"
              quality={100}
              fill
              sizes="100%"
              style={{
                objectFit: 'cover',
              }}
              className='rounded-lg'
            />
          </div>
        </div>
        <div className='w-full h-[45%] p-4 mt-4 shadow-xl rounded-xl  overflow-y-scroll'>
          <Tabs aria-label="Options" variant='underlined' color='primary'>
            <Tab key="myreward" title="My Reward">
              <Card className='shadow-none'>
                <CardBody>
                  <Select
                    size="sm"
                    className="w-40"
                    variant="bordered"
                    defaultSelectedKeys={["all"]}
                  >
                    {filtersvalue.map((filtervalue) => (
                      <SelectItem key={filtervalue.value} value={filtervalue.value}>
                        {filtervalue.label}
                      </SelectItem>
                    ))}
                  </Select>
                  <div className="mt-4 p-1">
                    <div className="grid grid-cols-5">
                      <div>
                        <h1 className="text-lg font-bold text-gray-400">07</h1>
                        <h4 className="text-[10px] text-gray-400">March</h4>
                      </div>
                      <div>
                        <h1 className="text-lg font-bold text-gray-400">Tulip</h1>
                        <h4 className="text-sm text-gray-400">9:00 am to 3:00 pm</h4>
                      </div>
                      <div className="flex flex-col justify-between items-center">
                        <h1 className="text-lg font-semibold text-gray-400">₹ 4299</h1>
                        <h4 className="text-sm text-gray-400">Per Night</h4>
                      </div>
                      <div className="flex flex-col justify-between items-center">
                        <h1 className="text-xl font-semibold text-success-500">+ 76</h1>
                        <h4 className="text-sm text-gray-400">Reward Points</h4>
                      </div>
                      <div className="flex justify-between items-center">
                        <Chip color="success" variant="flat" className="bg-success-50" startContent={<CiCircleCheck size={21} />} >Credited</Chip>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 p-1">
                    <div className="grid grid-cols-5">
                      <div>
                        <h1 className="text-lg font-bold text-gray-400">07</h1>
                        <h4 className="text-[10px] text-gray-400">March</h4>
                      </div>
                      <div>
                        <h1 className="text-lg font-bold text-gray-400">Tulip</h1>
                        <h4 className="text-sm text-gray-400">9:00 am to 3:00 pm</h4>
                      </div>
                      <div className="flex flex-col justify-between items-center">
                        <h1 className="text-lg font-semibold text-gray-400">₹ 4299</h1>
                        <h4 className="text-sm text-gray-400">Per Night</h4>
                      </div>
                      <div className="flex flex-col justify-between items-center">
                        <h1 className="text-xl font-semibold text-success-500">+ 76</h1>
                        <h4 className="text-sm text-gray-400">Reward Points</h4>
                      </div>
                      <div className="flex justify-between items-center">
                        <Chip color="success" variant="flat" className="bg-success-50" startContent={<CiCircleCheck size={21} />} >Credited</Chip>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="inprocess" title="In Process">
              <Card className='shadow-none'>
                <CardBody>
                  <Select
                    size="sm"
                    className="w-40"
                    variant="bordered"
                    defaultSelectedKeys={["all"]}
                  >
                    {filtersvalue.map((filtervalue) => (
                      <SelectItem key={filtervalue.value} value={filtervalue.value}>
                        {filtervalue.label}
                      </SelectItem>
                    ))}
                  </Select>
                  <div className="mt-4 p-1">
                    <div className="grid grid-cols-5">
                      <div>
                        <h1 className="text-lg font-bold text-gray-400">07</h1>
                        <h4 className="text-[10px] text-gray-400">March</h4>
                      </div>
                      <div>
                        <h1 className="text-lg font-bold text-gray-400">Tulip</h1>
                        <h4 className="text-sm text-gray-400">9:00 am to 3:00 pm</h4>
                      </div>
                      <div className="flex flex-col justify-between items-center">
                        <h1 className="text-lg font-semibold text-gray-400">₹ 4299</h1>
                        <h4 className="text-sm text-gray-400">Per Night</h4>
                      </div>
                      <div className="flex flex-col justify-between items-center">
                        <h1 className="text-xl font-semibold text-success-500">+ 76</h1>
                        <h4 className="text-sm text-gray-400">Reward Points</h4>
                      </div>
                      <div className="flex justify-between items-center">
                        <Chip color="danger" variant="flat" className="bg-danger-50" startContent={<VscHistory size={21} />} >In Process</Chip>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default Walletpage;


const ChipIcon = ({
  size, height, width, ...props
}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      height={height}
      width={width}
      fill="none"
      viewBox="0 0 800 618"
      {...props}
    >
      <rect x="5" y="5" width="790" height="608" rx="95" stroke="black" stroke-width="10" />
      <path d="M0 163H234C245.046 163 254 171.954 254 183V435C254 446.046 245.046 455 234 455H0" stroke="black" stroke-width="10" />
      <path d="M800 163H566C554.954 163 546 171.954 546 183V435C546 446.046 554.954 455 566 455H800" stroke="black" stroke-width="10" />
      <path d="M0 309L250 309" stroke="black" stroke-width="10" />
      <path d="M800 309L546 309" stroke="black" stroke-width="10" />
      <path d="M20 49H254V5H542V49H780" stroke="black" stroke-width="10" />
      <path d="M18.5 570H250.539V613H540.434V570H780" stroke="black" stroke-width="10" />
      <path d="M252.5 572L397 473L544 572" stroke="black" stroke-width="10" />
      <path d="M251.5 49L399 136L546 49" stroke="black" stroke-width="10" />
      <path d="M257 427H543" stroke="black" stroke-width="10" />
      <path d="M400 179H544" stroke="black" stroke-width="10" />
      <path d="M398 476V428" stroke="black" stroke-width="10" />
      <path d="M400 184V136" stroke="black" stroke-width="10" />
    </svg>
  );
};

const GoldMedal = ({
  size,
  width,
  height,
  ...props
}) => (
  <svg
    fill="#FFDF00"
    height={size || height}
    viewBox="0 0 256 256"
    width={size || width}
    {...props}
  >
    <path d="M168,192a40,40,0,1,1-40-40A40,40,0,0,1,168,192ZM207,48H168v85.82l42.72-19.42a9,9,0,0,0,5.28-8.2V57A9,9,0,0,0,207,48ZM88,48H49a9,9,0,0,0-9,9v49.2a9,9,0,0,0,5.28,8.2L88,133.82Z" opacity="0.2">
    </path>
    <path d="M207,40H49A17,17,0,0,0,32,57v49.21a17,17,0,0,0,10,15.47l62.6,28.45a48,48,0,1,0,46.88,0L214,121.68a17,17,0,0,0,10-15.47V57A17,17,0,0,0,207,40ZM160,56v72.67l-32,14.54L96,128.67V56ZM48,106.21V57a1,1,0,0,1,1-1H80v65.39L48.59,107.12A1,1,0,0,1,48,106.21ZM128,224a32,32,0,1,1,32-32A32,32,0,0,1,128,224Zm80-117.79a1,1,0,0,1-.59.91L176,121.39V56h31a1,1,0,0,1,1,1Z">
    </path>
  </svg>
);


const Asterisk = ({
  size,
  width,
  height,
  ...props
}) => (
  <svg
    fill="#0972d3"
    height={size || height}
    viewBox="0 0 256 256"
    width={size || width}
    {...props}
  >
    <path d="M213.14,179.09a6,6,0,0,1-8.23,2.06L134,138.6V216a6,6,0,0,1-12,0V138.6L51.09,181.15A6.07,6.07,0,0,1,48,182a6,6,0,0,1-3.1-11.15L116.34,128,44.91,85.15a6,6,0,0,1,6.18-10.3L122,117.4V40a6,6,0,0,1,12,0v77.4l70.91-42.55a6,6,0,0,1,6.18,10.3L139.66,128l71.43,42.85A6,6,0,0,1,213.14,179.09Z">
    </path>
  </svg>
);