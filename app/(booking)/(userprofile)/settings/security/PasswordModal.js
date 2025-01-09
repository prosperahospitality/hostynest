'use client'
import React, { useState, useEffect, useMemo } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { EyeSlashFilledIcon, EyeFilledIcon } from '@/_components/icon'
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { auth } from '@/app/config';
import bcrypt from 'bcryptjs';
import { signIn } from "next-auth/react";
import Swal from 'sweetalert2'

const BASE_URL = process.env.BASE_URL;

console.log("Base Url: ",BASE_URL)

export default function PasswordModal({session}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [size, setSize] = React.useState('')
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [resendTimer, setResendTimer] = useState(30);
    const [otp_number, setOtpNumber] = useState('');
    const [submitFlag, setSubmitFlag] = useState(false);
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const handleOpen = (size) => {
        setSize(size)
        onOpen();
    }

    useEffect(() => {

        let interval;
    
        if (resendTimer > 0) {
    
          interval = setInterval(() => {
    
            setResendTimer((prevTimer) => prevTimer - 1);
    
          }, 1000);
        }

        return () => clearInterval(interval);
    
      }, [resendTimer]);

      const handleOTPChange = (e) => {
        setOtpNumber(e.target.value)
      }

    function onCaptchaVerify() {
    try {
    if (!window.recaptchaVerifier) {

        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {

        'size': 'invisible',

        'callback': (response) => {

            handleSaveClick();

        },

        'expired-callback': () => {

        }

        });

    }
    } catch (error) {
    console.error("An error occurred while verifying reCAPTCHA:", error);
    }

    }

      
  const handleResendOTPClick = async (e, session) => {

    setResendTimer(30);
    setSubmitFlag(true)
    onCaptchaVerify();

    const appVerifier = window.recaptchaVerifier;

    const ph = '+91' + session?.user?.mobile_number;

    signInWithPhoneNumber(auth, ph, appVerifier)

      .then((confirmationResult) => {

        setConfirmationResult(confirmationResult);

        window.confirmationResult = confirmationResult;

        alert('OTP has been sent');
      })
  };


  const handleSaveClick = async(e,session) => {

    if(newPassword === confirmPassword) {
        setShowOtpInput(true)
        setSubmitFlag(true)
    
        try {
    
            const res = await fetch("/api/userApi/findUser", {
              method: 'POST',
              body: JSON.stringify({ "mobile_number": session?.user?.mobile_number }),
              headers: { "Content-Type": "application/json" }
            })
            const use = await res.json()
            const user = use.result;
      
            if (res.ok && user) {
    
              onCaptchaVerify();
      
              const appVerifier = window.recaptchaVerifier;
      
              const ph = '+91' + session?.user?.mobile_number;
      
              signInWithPhoneNumber(auth, ph, appVerifier)
      
                .then((confirmationResult) => {
      
                  setConfirmationResult(confirmationResult);
      
                  window.confirmationResult = confirmationResult;
      
                  alert('OTP has been sent on the registered mobile number!');
                })
      
            } else {
      
      
            }
      
          } catch (error) {
      
            console.error(error);
      
          }
    }else{
        alert('Password does not match with confirm password!')
    }

    
  }

  const handleGetOTPClick = async (e, otp_number) => {

    try {
      console.log("Entered OTP::::>", otp_number)

        window.confirmationResult

          .confirm(otp_number)

          .then(async (result) => {

            console.log('Login Success:::::::::>', newPassword, confirmPassword);


                const hashPassword = await bcrypt.hash(newPassword, 10);
                console.log("Hashed Password:::::>", hashPassword);
      
                let results = await fetch(BASE_URL + "api/userApi",{
      
                method:"POST",
      
                body:JSON.stringify({user_id : session?.user?.user_id,
                  mobile_number: session?.user?.mobile_number, password : hashPassword,
                  operation: "update"})
              });
              results = await results.json();
              console.log("Results: ",results)
              onClose()
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: "Password changed successfully!"
              });

          }).catch((error) => {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            });
            Toast.fire({
              icon: "warning",
              title: "Incorrect otp entered"
            });
          });

    } catch (error) {

      console.error('Error checking mobile number:', error);

    }
  };

    return (
        <>
            <div className="flex flex-wrap gap-3">
                <Button color="" size="md" variant="light" onPress={() => handleOpen()} className="italic text-primary" >Reset</Button>
            </div>
            <Modal
                size='sm'
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Reset Password</ModalHeader>
                            <ModalBody>

                                <Input
                                    label="Password"
                                    variant="bordered"
                                    placeholder="Enter New password"
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
                                    className="max-w-xs"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <Input
                                    label="Confirm Password"
                                    variant="bordered"
                                    placeholder="Confirm New password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                                    className="max-w-xs mt-4"
                                />
                                {showOtpInput && (
                                <>
                                    <div className="flex items-center justify-between">
                                    <label htmlFor="" className="text-base font-medium text-foreground">
                                        Enter OTP
                                    </label>
                                    </div>
                                    <div className="mt-2 text-end">

                                    <Input
                                        className="inline-flex w-full"
                                        type="text"
                                        placeholder="OTP"
                                        variant="bordered"
                                        value={otp_number}
                                        onChange={(e) => handleOTPChange(e)}
                                    />
                                    <a
                                        href="#"
                                        title=""
                                        className="text-sm font-semibold text-foreground hover:underline"
                                        onClick={(e) => handleResendOTPClick(e, session)}
                                        disabled={resendTimer > 0}
                                    >
                                        Resend OTP
                                        {resendTimer > 0 && (
                                        <span className="ml-2 text-sm text-text-foreground">{`(${resendTimer}s)`}</span>
                                        )}
                                    </a>
                                    </div>
                                </>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                {submitFlag 
                                ? <Button color="primary" onPress={(e) => handleGetOTPClick(e, otp_number)}>
                                        Submit
                                    </Button>
                                : <Button color="primary" onPress={(e) => handleSaveClick(e,session)}>
                                        Save
                                    </Button>
                            }
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <div id="recaptcha-container"></div>
        </>
    );
}
