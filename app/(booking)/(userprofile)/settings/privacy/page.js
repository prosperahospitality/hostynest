import React from 'react'
import { Divider, CheckboxGroup, Checkbox, Input, Button } from '@nextui-org/react'


const Privacypage = () => {
  return (
    <div>
      <h1 className='text-4xl text-gray-500 font-semibold'>Privacy</h1>
      <h5 className='text-sm text-gray-500 mt-2'>Take Control of your privacy</h5>
      <Divider className='w-full mt-4' />

       <CheckboxGroup
    >
      <Checkbox value="righttobeforgotten">Right to be forgotten<h6 className='text-sm text-gray-500'>Erase Your personal data from our database.</h6></Checkbox>
      <Checkbox value="unsubscribeemailmarketing">Unsubscribe from email marketing<h6 className='text-sm text-gray-500'>Manage your subsriptions to your mailing list</h6></Checkbox>
      <Checkbox value="righttodataaccess">Right to Data Access<h6 className='text-sm text-gray-500'>Access to personal data, including booking history, profiles, and communication preferences.</h6></Checkbox>
      <Checkbox value="righttoconsent">Right to Consent<h6 className='text-sm text-gray-500'>Permission for use of personal data and right to withdraw consent</h6></Checkbox>
    </CheckboxGroup> 
      <Divider className='w-full mt-4' />
      <div className='mt-10 w-[40%] space-y-10 flex flex-col justify-between items-center'>
      <Input type="text" label="Mobile Number" variant='bordered' size='md' radius='md' defaultValue='123456789' labelPlacement='outside' startContent={'+91'} placeholder='Mobile Number' />
      <Input type="text" label="OTP" variant='bordered' size='md' radius='md' labelPlacement='outside'  endContent={<Button color='' variant='light' className='text-primary'>Resend</Button>} placeholder='Enter the OTP' />
      <Button color='success' variant='shadow' className='text-white'>Submit</Button>
      </div>
    </div>
  )
}

export default Privacypage;