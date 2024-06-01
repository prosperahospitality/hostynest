'use client'
import React from 'react'
import { Accordion, AccordionItem, Chip } from "@nextui-org/react";


const HostyNestData = () => {
  return (
    <>
    <div className='space-y-2'>
    <h6>One should never miss on services offered by HostyNest because:</h6>
    <Chip color='' variant="light" startContent={<DotIcon height={40} width={40}/>} >HostyNest offers unique hotel booking services, focusing on short stays <br/> that are both beautiful and affordable</Chip>
    <Chip color='' variant="light" startContent={<DotIcon height={40} width={40}/>} >We provide couple-friendly rooms on an hourly basis, eliminating <br/> the need for lengthy booking processes.</Chip>
    <Chip color='' variant="light" startContent={<DotIcon height={40} width={40}/>} >Pay only for the duration of your stay with us, ensuring <br/> cost-effectiveness.</Chip>
    <Chip color='' variant="light" startContent={<DotIcon height={40} width={40}/>} >Enjoy the coziest accommodations at unbeatable prices.</Chip>
    <Chip color='' variant="light" startContent={<DotIcon height={40} width={40}/>} >We welcome everyone, including local and unmarried guests, to<br/>experience luxury stays with us without discrimination</Chip>
    </div>
    </>
  )
};

const PopularqnsData = [
  {
    title: 'Why should we book rooms with HostyNest?',
    content: <HostyNestData />
  },
  {
    title: 'In which all cities it is possible to get HostyNest?',
    content: "If you re headed to Delhi, Noida, Ghaziabad, Gurgaon, Mumbai, Chennai, Kolkata, Bangalore, Mysore, Hyderabad, Jaipur, Lucknow, Pune, Haridwar, Neemrana, or Chandigarh for a short stay, we've got you covered with our services."
  },
  {
    title: 'Can below 18 Age couples can book a room?',
    content: 'No. As per govt policy only adults i.e. 18+ age can book couple friendly room with us as a couple.'
  },
  {
    title: "Are Local ID’s accepted on HostyNest?",
    content: 'Absolutely! Most of our partnered hotels welcome guests with local IDs. Look for the Local ID Accepted tag on hotels that allow couples with local IDs.'
  },
  {
    title: 'Are unmarried couples allowed to check in?',
    content: 'Without hesitation, unmarried couples are welcome to book our hourly hotel rooms. Simply find us online and proceed with your bookings. We ll ensure your stay with us becomes an unforgettable experience for both of you.'
  },
  
]


const Section3 = () => {



  return (
    <div className='w-screen h-fit'>
      <div className='w-[90%] h-fit mx-auto'>
        <h2 className='text-4xl text-gray-500 text-center'>Popular Questions</h2>
        <h5 className='text-sm text-gray-300 text-center mt-4'>Most frequently asked questions by our guests</h5>
        <div className='w-full mx-auto mt-10 grid grid-cols-2 gap-5'>

        {PopularqnsData.map((PopularqnData) => 
          // eslint-disable-next-line react/jsx-key
          <Accordion>
            <AccordionItem title={PopularqnData.title}>
              {PopularqnData.content}
            </AccordionItem>
          </Accordion>

)}

        </div>
      </div>
    </div>
  )
}

export default Section3;

export const DotIcon = ({
  size, height, width, ...props
}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      height={height}
      width={width}
      fill="#000"
      viewBox="0 0 256 256"
      {...props}
    >
        <path d="M156,128a28,28,0,1,1-28-28A28,28,0,0,1,156,128Z">
        </path>
        </svg>
  );
};
