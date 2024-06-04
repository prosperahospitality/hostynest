'use client'
import React, { useEffect, useState } from 'react'
import { Modal } from './Modal'
import LoginFunc from "@/app/(auth)/login/LoginFunc";
import { useRouter } from "next/navigation";
import {useDispatch} from "react-redux";
import { handleLoginStatus } from "@/app/redux/slices/loginStateSlice";

const GuestLoginModal = () => {
  const router = useRouter() // useRouter hook inside the component function
  const [resultFlag, setResultFlag] = useState();
  const [rFlag, setRFlag] = useState(0);
  const dispatch = useDispatch();    

  const handleResultFlag = (value) => {
    setResultFlag(value)
  }

  useEffect(() => {
    console.log("ResultFlag: ",resultFlag)
    if(resultFlag === 1 ) {
      router.back();
      dispatch(handleLoginStatus(1));
      setResultFlag(0);
    }else{
      console.log("Error:::::::>")
    }
  }, [resultFlag]);

  return (
    <div>
      <Modal
        onClose={() => {
          router.back();
        }}
      >
        <div className="w-full grid grid-cols-2 bg-white rounded-lg">
          <div className="relative flex justify-center">
            <div className="absolute inset-0">
              <img
                className="h-full w-full rounded-md object-cover object-top"
                src="https://images.unsplash.com/photo-1468167381860-bda3c772f16b?q=80&w=1422&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
          </div>
          <div className="flex h-96 pt-10 overflow-y-scroll">
            <div className="mx-auto">
              <h2 className="text-3xl font-bold leading-tight text-black">Welcome Back</h2>
              <h5 className="text-sm font-bold text-gray-500">
                Login to unlock exclusive experience
              </h5>
              <LoginFunc onResultFlag = {handleResultFlag} rFlag = {rFlag}/>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default GuestLoginModal;