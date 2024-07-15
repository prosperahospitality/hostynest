'use client'
import React from 'react'
import { Button, Input, Textarea } from "@nextui-org/react";
import Link from 'next/link';

const Section2 = () => {
  return (
    <div className='w-screen h-screen bg-white'>
      <div className='w-[80%] h-full mx-auto flex flex-col items-center justify-center'>
        <h2 className='text-4xl text-black/50 text-center'>Conatact Us</h2>
        <h5 className='text-sm text-black/50 text-center mt-4'><Link href="/" className='underline text-primary'>Need any help?</Link> Our team is here for you. Fill out the form below, and we&apos;ll take care of the rest.</h5>
        <div className='w-[60%] mx-auto mt-10 grid grid-cols-2 gap-5'>
          <Input color='primary' type="text" isRequired label="Enter Your Name" variant='bordered' labelPlacement='outside' placeholder='Your Name' />
          <Input color='primary' type="text" isRequired label="Enter Your City" variant='bordered' labelPlacement='outside' placeholder='Enter Your City' />
          <Input color='primary' type="email" isRequired label="Enter Your Email" variant='bordered' labelPlacement='outside' placeholder='Hostynest@HostyNest.com' />
          <Input color='primary' type="text" isRequired label="Enter Mobile Number" variant='bordered' labelPlacement='outside' placeholder='Enter Your Mobile Number' startContent={"+91"} />
        </div>
        <div className='w-[60%] mx-auto mt-5 items-center justify-center flex flex-col'>
          <Textarea
            label="Tell Us Your Query"
            placeholder="Share Your Query"
            isRequired
            variant='bordered'
            color='primary'
          />
          <Button color='primary' variant='shadow' className='mt-10' size='lg' >Submit</Button>
        </div>
      </div>
    </div>
  )
}

export default Section2;

export const AtMailIcon = ({
  size, height, width, ...props
}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      height={height}
      width={width}
      fill="#fff"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M128,26a102,102,0,0,0,0,204c21.13,0,43.31-6.35,59.32-17a6,6,0,0,0-6.65-10c-13.9,9.25-34.09,15-52.67,15a90,90,0,1,1,90-90c0,29.58-13.78,34-22,34s-22-4.42-22-34V88a6,6,0,0,0-12,0v9a46,46,0,1,0,4.34,56.32C171.76,166.6,182,174,196,174c21.29,0,34-17.2,34-46A102.12,102.12,0,0,0,128,26Zm0,136a34,34,0,1,1,34-34A34,34,0,0,1,128,162Z">
      </path>
    </svg>
  );
};


export const PhoneIcon = ({
  size, height, width, ...props
}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      height={height}
      width={width}
      fill="#fff"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M221.59,160.3l-47.24-21.17a14,14,0,0,0-13.28,1.22,4.81,4.81,0,0,0-.56.42l-24.69,21a1.88,1.88,0,0,1-1.68.06c-15.87-7.66-32.31-24-40-39.65a1.91,1.91,0,0,1,0-1.68l21.07-25a6.13,6.13,0,0,0,.42-.58,14,14,0,0,0,1.12-13.27L95.73,34.49a14,14,0,0,0-14.56-8.38A54.24,54.24,0,0,0,34,80c0,78.3,63.7,142,142,142a54.25,54.25,0,0,0,53.89-47.17A14,14,0,0,0,221.59,160.3ZM176,210C104.32,210,46,151.68,46,80A42.23,42.23,0,0,1,82.67,38h.23a2,2,0,0,1,1.84,1.31l21.1,47.11a2,2,0,0,1,0,1.67L84.73,113.15a4.73,4.73,0,0,0-.43.57,14,14,0,0,0-.91,13.73c8.87,18.16,27.17,36.32,45.53,45.19a14,14,0,0,0,13.77-1c.19-.13.38-.27.56-.42l24.68-21a1.92,1.92,0,0,1,1.6-.1l47.25,21.17a2,2,0,0,1,1.21,2A42.24,42.24,0,0,1,176,210Z">
      </path>
    </svg>
  );
};

export const GPSIcon = ({
  size, height, width, ...props
}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      height={height}
      width={width}
      fill="#fff"
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M240,122H213.77A86.12,86.12,0,0,0,134,42.23V16a6,6,0,0,0-12,0V42.23A86.12,86.12,0,0,0,42.23,122H16a6,6,0,0,0,0,12H42.23A86.12,86.12,0,0,0,122,213.77V240a6,6,0,0,0,12,0V213.77A86.12,86.12,0,0,0,213.77,134H240a6,6,0,0,0,0-12ZM128,202a74,74,0,1,1,74-74A74.09,74.09,0,0,1,128,202Zm0-112a38,38,0,1,0,38,38A38,38,0,0,0,128,90Zm0,64a26,26,0,1,1,26-26A26,26,0,0,1,128,154Z">
      </path>
    </svg>
  );
};