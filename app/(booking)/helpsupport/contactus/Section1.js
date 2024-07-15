'use client'
import React from 'react'
import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";

const Section1 = () => {
  return (
    <div className='w-screen h-screen bg-white'>
      <div className='w-full h-[75%] pt-12'>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d498.2711871149117!2d73.00323381152059!3d19.057299312118012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c150c925caaf%3A0xa9ce45497acd2b23!2sThe%20Affaires%2C%20Palm%20Beach%2C%20Sanpada%2C%20Navi%20Mumbai%2C%20Maharashtra%20400705!5e0!3m2!1sen!2sin!4v1712039846848!5m2!1sen!2sin" className='h-full w-full' style={{ objectFit: 'cover', border: '0' }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
      <div className='w-full h-[25%]'>
        <div className='w-[80%] mx-auto'>
          <div className='flex justify-between w-[80%] mx-auto absolute -mt-24'>
            <Card className="p-4 pb-10 text-center bg-white">
              <CardHeader className="pb-0 pt-2 px-4 flex-col">
                <Button color='primary' variant='shadow' radius='full' size='lg' isIconOnly startContent={<AtMailIcon height={40} width={40} />}></Button>
                <h4 className="text-2xl text-primary pt-1">Write to Us</h4>
              </CardHeader>
              <CardBody className="overflow-visible text-center">
                <h6 className='text-sm text-gray-500 w-52 mx-auto'>This is the best way to get your questions answered, write your queries at</h6>
              </CardBody>
            </Card>
            <Card className="p-4 pb-10 text-center bg-white">
              <CardHeader className="pb-0 pt-2 px-4 flex-col">
                <Button color='primary' variant='shadow' radius='full' size='lg' isIconOnly startContent={<PhoneIcon height={40} width={40} />}></Button>
                <h4 className="text-2xl text-primary pt-1">Call Us</h4>
              </CardHeader>
              <CardBody className="overflow-visible text-center">
                <h6 className='text-sm text-gray-500 w-52 mx-auto'>Our Support Team is ready 24x7 to answer you dial a call on</h6>
              </CardBody>
            </Card>
            <Card className="p-4 pb-10 text-center bg-white">
              <CardHeader className="pb-0 pt-2 px-4 flex-col">
                <Button color='primary' variant='shadow' radius='full' size='lg' isIconOnly startContent={<GPSIcon height={40} width={40} />}></Button>
                <h4 className="text-2xl text-primary pt-1">Locate Us</h4>
              </CardHeader>
              <CardBody className="overflow-visible text-center">
                <h6 className='text-sm text-gray-500 w-52 mx-auto'>Reach out to our offices and get your queries resolved in person</h6>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Section1;

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