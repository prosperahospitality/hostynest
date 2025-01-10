'use client'
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { IMAGES } from '@/public/index';
import { useRouter } from 'next/navigation';
import siteConfig from '@/config/site';
import PasswordInput from '@/_components/ui/PasswordInput';
import { Input } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { auth } from '@/app/config';
import Swal from 'sweetalert2'

export default function Partners() {
  const [hotelname, setHotelName] = useState('');
  const [email, setEmail] = useState('');
  const [personname, setPersonName] = useState('');
  const [mobile_number, setMobileNumber] = useState('');
  const [otp_number, setOtpNumber] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [hotelAddress, setHotelAddress] = React.useState();
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [submitFlag, setSubmitFlag] = useState(false);
  const [resultAll, setResultAll] = useState(false);
  const [lastID, setLastID] = useState(0);
  const [confirmationResult, setConfirmationResult] = useState(null);

  const validateEmail = (email) => email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  const isInvalid = useMemo(() => {
    if (email === '') return false;
    return validateEmail(email) ? false : true;
  }, [email]);

  const handleMobileChange = (event) => {
    const value = event.target.value;
    const sanitizedValue = value.replace(/\D/g, '').slice(0, 10);
    setMobileNumber(sanitizedValue);
  };

  const handleOTPChange = (event) => {
    const value = event.target.value;
    const sanitizedValue = value.replace(/\D/g, '').slice(0, 6);
    setOtpNumber(sanitizedValue);
  };

  useEffect(() => {
    let interval;

    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleResendOTPClick = async () => {
    setResendTimer(30);
    setSubmitFlag(true)
    onCaptchaVerify();

    const appVerifier = window.recaptchaVerifier;

    const ph = '+91' + mobile_number;

    signInWithPhoneNumber(auth, ph, appVerifier)

      .then((confirmationResult) => {

        setConfirmationResult(confirmationResult);

        window.confirmationResult = confirmationResult;

        alert('OTP has been sent');
      })
  };

  const items = [
    { id: 1, name: 'Increase Your Revenue per room available' },
    { id: 2, name: 'Grow with a Large base of Customers' },
    { id: 3, name: 'Simple & Online Registration process' },
    { id: 4, name: 'Excellent Policies for your Business' },
  ];

  const initialFxn = async () => {
    try {
      const response = await fetch("/api/userApi/list_hotel", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
      });
      const resultt = await response.json();
      setResultAll(resultt.data)

    } catch (error) {
        console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {

          initialFxn();

  }, [])

  const handleSubmit = async () => {

    setShowOtpInput(true)
    setSubmitFlag(true)

    console.log("Data::::::>",hotelname,
    email,
    personname,
    mobile_number,
    otp_number,
    hotelAddress)

    try {
    
      // const res = await fetch("/api/userApi/findUser", {
      //   method: 'POST',
      //   body: JSON.stringify({ "mobile_number": session?.user?.mobile_number }),
      //   headers: { "Content-Type": "application/json" }
      // })
      // const use = await res.json()
      // const user = use.result;

      // if (res.ok && user) {

        onCaptchaVerify();

        const appVerifier = window.recaptchaVerifier;

        const ph = '+91' + mobile_number;

        signInWithPhoneNumber(auth, ph, appVerifier)

          .then((confirmationResult) => {

            setConfirmationResult(confirmationResult);

            window.confirmationResult = confirmationResult;

            alert('OTP has been sent on the registered mobile number!');
          })

      // } else {


      // }

    } catch (error) {

      console.error(error);

    }
  }

  const generateUniqueID = () => {
    // console.log("Last IF:",lastID)
   const newID = `LH${String(lastID + 1).padStart(5, '0')}`;
   setLastID(lastID + 1);
   return newID;
 };

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

 function getCurrentDateTime() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const hours = String(today.getHours()).padStart(2, '0');
  const minutes = String(today.getMinutes()).padStart(2, '0');
  const seconds = String(today.getSeconds()).padStart(2, '0');
  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleRegister = useCallback(async () => {
    console.log("Data Register::::::>",hotelname,
    email,
    personname,
    mobile_number,
    otp_number,
    hotelAddress)


    window.confirmationResult

    .confirm(otp_number)

    .then(async (result) => {

      console.log("Enterred Otp is Correct", otp_number, result)

      const payload = {
        id: generateUniqueID(),
          Hotel_name: hotelname,
          Hotel_email: email,
          contact_name: personname,
          contact_number: mobile_number,
          Hotel_address: hotelAddress,
          status: "",
          created_date: getCurrentDateTime(),
          last_update_on: getCurrentDateTime()
      }
  
      const res = await fetch("/api/userApi/list_hotel", {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" }
      })
      const use = await res.json()
  
      console.log("use:::::>",use)
  
      setResultAll(use.resultAll)
      if(use.success === true) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
          didClose: () => {
            window.location.reload();
          }
        });
        Toast.fire({
          icon: "success",
          title: "Hotel registered successfully!"
        });

      }else{
        console.log("False")
      }

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

  })

  useEffect(() => {
    async function dat() {

         if (resultAll && resultAll.length > 0) {
        const lastElement = resultAll[resultAll.length - 1];
        //console.log("REsulttttttttttttt::::::::>",lastElement)
        const lastElementId = lastElement.id; 
        //console.log("REsulttttttttttttt::::::::>",lastElementId)
        const numericPart = lastElementId ? lastElementId.match(/(?<=LH)0*(\d+)/) : null; 
        const lastNumericId = numericPart ? parseInt(numericPart[1]) : null;
        //console.log("Numeric ID of the last element:", lastNumericId);
        setLastID(lastNumericId);
    } else {
        //console.log("No elements in the array.");
        setLastID(0);
    }
    }
  
    dat()
  
   
  
  }, [resultAll,handleRegister]);

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
  

  return (
    <main className="flex h-fit w-screen flex-col items-center justify-between bg-white p-2 pt-14">
    <div className="relative w-full bg-background flex flex-col h-full">
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 h-full bg-white">
            <div className="relative flex h-screen items-end px-4 pb-10 pt-60 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24">
              <div className="absolute inset-0">
                <Image src={IMAGES.Loginbg} alt="Loginbg" width={500} height={500} className="h-full w-full rounded-xl object-cover " />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t rounded-xl from-black/50 to-transparent"></div>
              <div className="relative">
                <div className="w-full max-w-xl xl:mx-auto xl:w-full xl:max-w-xl xl:pr-24">
                  <h3 className="text-4xl font-bold text-white">Join {siteConfig.name} And Sell Your Rooms</h3>
                  <h4 className="text-xl font-bold text-white pt-2">What’s in for your Hotel ?</h4>
                  <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                    {items.map((item) => (
                      <li key={item.id} className="flex items-center space-x-3">
                        <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                          <svg
                            className="h-3.5 w-3.5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <span className="text-lg font-medium text-white"> {item.name} </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-6">
              <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                <h2 className="text-3xl font-extralight leading-tight text-black sm:text-4xl">Register Your hotel</h2>
                <p className="mt-2 text-sm text-black">
                  <a href="#" title="" className="font-semibold text-black/50 transition-all duration-200">
                    Fill Out the Form below and our representative will connect with you
                  </a>
                </p>
                <form action="#" method="POST" className="mt-8">
                  <div className="space-y-5 items-center">
                    <div className="mt-2">
                      <label htmlFor="" className="text-base font-medium text-black/50">
                        Enter Your Hotel Name
                      </label>
                      <div className="mt-2">
                        <Input
                          className="inline-flex w-full"
                          type="text"
                          placeholder="Hotel Name"
                          variant="bordered"
                          color='primary'
                          onChange={(e) => setHotelName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mt-2">
                      <label htmlFor="" className="text-base font-medium text-black/50">
                        Enter your Hotel Email
                      </label>
                      <div className="mt-2">
                        <Input
                          isRequired
                          className="inline-flex w-full"
                          type="email"
                          label="Email"
                          placeholder="jondeo@hotel.com"
                          description="We'll never share your email with anyone else."
                          variant="bordered"
                          onValueChange={setEmail}
                          value={email}
                          isInvalid={isInvalid}
                          color={isInvalid ? "danger" : "success"}
                          errorMessage={isInvalid && "Please enter a valid email"}
                        />
                      </div>
                    </div>
                    <div className="mt-2">
                      <label htmlFor="" className="text-base font-medium text-black/50">
                        Enter Contact Person Name
                      </label>
                      <div className="mt-2">
                        <Input
                          className="inline-flex w-full"
                          type="text"
                          placeholder="Enter Contact Person Name"
                          variant="bordered"
                          color='primary'
                          onChange={(e) => setPersonName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mt-2">
                      <label htmlFor="" className="text-base font-medium text-black/50">
                        Enter Hotel Address
                      </label>
                      <div className="mt-2">
                        <Input
                          className="inline-flex w-full"
                          type="text"
                          placeholder="Enter Hotel Address"
                          variant="bordered"
                          color='primary'
                          onChange={(e) => setHotelAddress(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="" className="text-base font-medium text-black/50">
                        Enter Mobile Number
                      </label>
                      <div className="mt-2">
                        <Input
                          className="inline-flex w-full"
                          type="text"
                          placeholder="Mobile No"
                          variant="bordered"
                          color='primary'
                          value={mobile_number}
                          onChange={handleMobileChange}
                        />
                      </div>
                    </div>
                    <div>
                    {showOtpInput && (
                      <>
                                          <label htmlFor="" className="text-base font-medium text-foreground">
                        Enter OTP
                      </label>
                      <div className="mt-2">
                        <Input
                          className="inline-flex w-full"
                          type="text"
                          placeholder="OTP"
                          variant="bordered"
                          value={otp_number}
                          onChange={handleOTPChange}
                        />
                        <a
                          href="#"
                          title=""
                          className="text-sm font-semibold text-foreground hover:underline"
                          onClick={handleResendOTPClick}
                          disabled={resendTimer > 0}
                        >
                          Resend OTP
                          {resendTimer > 0 && (
                            <span className="ml-2 text-sm text-text-foreground">Resend OTP In {`(${resendTimer}s)`}</span>
                          )}
                        </a>
                      </div>
                      </>
                    )}
                    </div>
                    <div className="pb-2">
                      {submitFlag 
                        ? <Button color="secondary" variant="shadow" className="inline-flex w-full" onClick={handleRegister}>
                            Register Your Hotel
                          </Button>
                        : <Button color="secondary" variant="shadow" className="inline-flex w-full" onClick={handleSubmit}>
                            Submit
                          </Button>
                       }
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
      {/* <Explorebycities /> */}
        </section>
    </div>
    <div id="recaptcha-container"></div>
    </main>
  );
}
