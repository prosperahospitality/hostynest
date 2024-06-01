'use client'
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Divider } from '@nextui-org/react'
import PasswordModal from '@/app/(booking)/(userprofile)/settings/security/PasswordModal'
import SignOutModal from '@/app/(booking)/(userprofile)/settings/security/SignOutModal'
import DeleteAccountModal from '@/app/(booking)/(userprofile)/settings/security/DeleteAccountModal'
import { SessionProvider, useSession, getSession, signIn, signOut } from 'next-auth/react'

function Securitypagee() {
  const { data: session, update ,status } = useSession()

  console.log("Session:>:>:>:>",session)

  const handleSignOut = (val) => {
    if(val === true) {
      signOut()
    }
    
  }

  return (
    <div>
      <h1 className='text-4xl text-gray-500 font-semibold'>Security</h1>
      <h5 className='text-sm text-gray-500 mt-2'>Empowering security: Customize, verify or delete account</h5>
      <Divider className='w-full mt-4' />
      <div className='flex justify-between mt-2 items-center'>
        <h3 className='text-base text-gray-500'>Password</h3>
        <h5 className='text-sm text-gray-500 '>Reset your password periodically to keep your account secure</h5>
        <PasswordModal session = {session}/>
      </div>
      <Divider className='w-full mt-4' />
      <div className='flex justify-between mt-2 items-center'>
        <h3 className='text-base text-gray-500'>Sign-Out</h3>
        <h5 className='text-sm text-gray-500'>Selecting Sign-out will sign you out from all devices except this one</h5>
        <SignOutModal onSignOutFlag = {handleSignOut} />
      </div>
      <Divider className='w-full mt-4' />
      <div className='flex justify-between mt-2 items-center'>
        <h3 className='text-base text-gray-500'>Delete Account</h3>
        <h5 className='text-sm text-gray-500'>Permanently delete your HostyNest Account</h5>
        <DeleteAccountModal session = {session}/>
      </div>
      <Divider className='w-full mt-4' />
    </div>
  )
}

// export default Securitypage

export default function Securitypage() {
  return (
      <SessionProvider>
          <Securitypagee />
      </SessionProvider>
  );
}