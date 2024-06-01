import React from 'react'
import { Divider } from '@nextui-org/react'
import EmailNotificationModal from '@/app/(booking)/(userprofile)/settings/emailnotification/EmailNotificationModal'

const EmailNotificationpage = () => {
  return (
    <div>
      <h1 className='text-4xl text-gray-500 font-semibold'>Email Notification</h1>
      <h5 className='text-sm text-gray-500 mt-2'>Choose what you want to be notified about</h5>
      <Divider className='w-full mt-4' />
      <div className='flex justify-between mt-2 items-center'>
        <h3 className='text-base text-gray-500'>Email Prefernce</h3>
        <h5 className='text-sm text-gray-500 '>test@test.com</h5>
        <EmailNotificationModal />
      </div>
        <h5 className='text-sm text-gray-500 text-center'>This is the email you use to sign in, It's also the email where we send your booking confirmations</h5>
      <Divider className='w-full mt-4' />
    </div>
  )
}

export default EmailNotificationpage;