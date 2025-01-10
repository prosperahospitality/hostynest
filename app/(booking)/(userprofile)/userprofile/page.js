'use client'
import React from 'react'
import { Avatar, Button, Chip, Input } from "@nextui-org/react";
import { EyeSlashFilledIcon, EyeFilledIcon } from '@/_components/icon'
import InfoModal from '@/app/(booking)/(userprofile)/userprofile/InfoModal'
import ProfileBookingTab from '@/app/(booking)/(userprofile)/userprofile/ProfileBookingTab'
import { SessionProvider, useSession, getSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation';

const Trophy = ({
  size,
  width,
  height,
  ...props
}) => (
  <svg
    fill="#007ebb"
    height={size || height}
    viewBox="0 0 256 256"
    width={size || width}
    {...props}
  >
    <path d="M200,56v55.1c0,39.7-31.75,72.6-71.45,72.9A72,72,0,0,1,56,112V56a8,8,0,0,1,8-8H192A8,8,0,0,1,200,56Z" opacity="0.2">
    </path>
    <path d="M232,64H208V56a16,16,0,0,0-16-16H64A16,16,0,0,0,48,56v8H24A16,16,0,0,0,8,80V96a40,40,0,0,0,40,40h3.65A80.13,80.13,0,0,0,120,191.61V216H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16H136V191.58c31.94-3.23,58.44-25.64,68.08-55.58H208a40,40,0,0,0,40-40V80A16,16,0,0,0,232,64ZM48,120A24,24,0,0,1,24,96V80H48v32q0,4,.39,8Zm144-8.9c0,35.52-28.49,64.64-63.51,64.9H128a64,64,0,0,1-64-64V56H192ZM232,96a24,24,0,0,1-24,24h-.5a81.81,81.81,0,0,0,.5-8.9V80h24Z">
    </path>
  </svg>
);

const UserProfilepagee = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [result, setResult] = React.useState([]);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const { data: session, update ,status } = useSession()
  const user_Id = session ? session?.user?.user_id : "";
  const router = useRouter();

  const handleResult = (data) => {
    setResult(data)
  }

  return (
    <div className=' w-full h-full flex items-center justify-between'>
      <div className='w-full h-[96%] pt-9 flex'>
        <div className='w-[35%] h-full p-2'>
          <div className='bg-white w-[90%] rounded-3xl shadow-xl h-full mx-auto'>
            <div className='h-[35%] w-[90%] mx-auto'>
              <div className='w-fit h-full mx-auto text-center space-y-2'>
                <Avatar
                  radius="full"
                  className='h-20 w-20 mx-auto'
                  src="https://www.svgrepo.com/show/509009/avatar-thinking-3.svg"
                />
                <h3 className='text-lg font-semibold text-gray-500'>{session ? session?.user?.firstname + " " + session?.user?.lastname : ""}</h3>
                <Chip color="primary" radius="sm" variant="flat" className="text-white" startContent={<Trophy size={25} />} >0 Reward Points</Chip>
              </div>
            </div>
            <div className='h-[65%] w-[90%] mx-auto relative'>
              <div className='w-[85%] mx-auto space-y-4 flex flex-col justify-between items-center'>
                {session
                  ? <><Input type="text" label="Name" variant='bordered' defaultValue={session ? session?.user?.firstname + " " + session?.user?.lastname : ""} size='sm' className="max-w-xs" /><Input type="text" label="Contact No" variant='bordered' defaultValue={session ? session?.user?.mobile_number : ""} size='sm' className="max-w-xs" /><Input type="email" label="Email Id" variant='bordered' defaultValue={session ? session?.user?.email : ""} size='sm' className="max-w-xs" /><Input
                  label="Password"
                  variant="bordered"
                  placeholder="Enter your password"
                  size='sm'
                  defaultValue={session ? session?.user?.password : ""}
                  className="max-w-xs"
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                /></>
                  : ""}
                
                <Button variant='shadow' color='primary' size='sm'>Save</Button>
              </div>
            </div>
          </div>
        </div>
        <div className='w-[65%] h-full'>
          <div className='w-full h-[30%] flex'>
            <div className=' w-[50%] h-full p-2'>
              <div className='bg-white shadow-xl w-full h-full rounded-3xl p-2 flex justify-between'>
                <div>
                  <h1 className='text-3xl text-primary font-semibold'>{result?.length}</h1>
                  <h4 className='text-base'>Booking</h4>
                </div>
                <InfoModal />
              </div>
            </div>
            <div className='w-[50%] h-full p-2'>
              <div className='bg-white shadow-xl w-full h-full rounded-3xl p-2 flex justify-between'>
                <div>
                  <h1 className='text-3xl text-success font-semibold'>0</h1>
                  <h4 className='text-base'>Reward Points</h4>
                </div>
                <InfoModal />
              </div>
            </div>
          </div>
          <div className='w-full h-[70%] p-2'>
            <div className='bg-white w-full shadow-xl h-full rounded-3xl p-2 text-right relative overflow-y-scroll'>
              <ProfileBookingTab onResult = {handleResult} user_Id = {user_Id}/>
              <Button color='primary' variant='light' className='relative' onClick = {(e) => router.push('bookings')}>see more</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// export default UserProfilepage;

export default function UserProfilepage() {
  return (
    <SessionProvider>
      <UserProfilepagee />
    </SessionProvider>
  );
}