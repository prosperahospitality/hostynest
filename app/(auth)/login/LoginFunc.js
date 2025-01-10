'use client'
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { useRouter } from 'next/navigation';
import { auth } from '@/app/config';
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import PasswordInput from '@/_components/ui/PasswordInput';
import bcrypt from 'bcryptjs';
import Swal from 'sweetalert2'
import { SessionProvider, useSession, getSession, signIn, signOut } from 'next-auth/react'
import { EyeSlashFilledIcon, EyeFilledIcon } from '@/_components/icon'


const LoginFunc = ({ loginFlag, loginFlagBookingsPage, onResultFlag, rFlag }) => {

  const [mobile_number, setMobileNumber] = useState('');
  const [otp_number, setOtpNumber] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [isMobileNumberRegistered, setIsMobileNumberRegistered] = useState(false);
  const [mode, setMode] = useState('Login'); 
  const [resendTimer, setResendTimer] = useState(30);
  const [isVisible, setIsVisible] = React.useState(false);
  const [lastID, setLastID] = useState(0);
  const [resultAllUser, setResultAllUser] = useState([]);

  const [isVisiblePass, setIsVisiblePass] = React.useState(false);
  const toggleVisibilityPass = () => setIsVisiblePass(!isVisiblePass);

  const [isVisibleEnterPass, setIsVisibleEnterPass] = React.useState(false);
  const toggleVisibilityEnterPass = () => setIsVisibleEnterPass(!isVisibleEnterPass);

  const [isVisibleConfirmPass, setIsVisibleConfirmPass] = React.useState(false);
  const toggleVisibilityConfirmPass = () => setIsVisibleConfirmPass(!isVisibleConfirmPass);


  const [session, setSession] = useState({});
  useEffect(() => {
    const getSessionInfo = async () => {
      const session = await getSession();
      setSession(session);
    };
    getSessionInfo();
  }, [])

  

  // useEffect(() => {
  //   console.log("User Session At Login: ",session)
  // }, [session])

  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const validateEmail = (email) => email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = useMemo(() => {

    if (email === "") return false;

    return validateEmail(email) ? false : true;

  }, [email]);

  const handleMobileChange = (event) => {

    const value = event.target.value;

    const sanitizedValue = value.replace(/\D/g, '').slice(0, 10);

    setMobileNumber(sanitizedValue);

  };

  function onCaptchaVerify() {
    try {
    if (!window.recaptchaVerifier) {

      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {

        'size': 'invisible',

        'callback': (response) => {

          handleSendOTP();

        },

        'expired-callback': () => {

        }

      });

    }
  } catch (error) {
    console.error("An error occurred while verifying reCAPTCHA:", error);
    // Handle the error gracefully here, such as showing a user-friendly message
  }

  }

  const handleOTPChange = (event) => {

    const value = event.target.value;

    const sanitizedValue = value.replace(/\D/g, '').slice(0, 6);

    setOtpNumber(sanitizedValue);

  };

  const handleSendOTP = async () => {

    try {

      const res = await fetch("/api/userApi/findUser", {
        method: 'POST',
        body: JSON.stringify({ "mobile_number": mobile_number }),
        headers: { "Content-Type": "application/json" }
      })
      const use = await res.json()
      const user = use.result;

      if (res.ok && user && user.delete_flag === 0 && user.user_role === "guest") {
        // alert("Number Already Exist");
        onCaptchaVerify();

        const appVerifier = window.recaptchaVerifier;

        const ph = '+91' + mobile_number;

        signInWithPhoneNumber(auth, ph, appVerifier)

          .then((confirmationResult) => {

            setConfirmationResult(confirmationResult);

            window.confirmationResult = confirmationResult;

            alert('OTP has been sent');
          })

        setShowOtpInput(true);
        setMode('Verify OTP');
      } else {

        onCaptchaVerify();

        const appVerifier = window.recaptchaVerifier;

        const ph = '+91' + mobile_number;

        signInWithPhoneNumber(auth, ph, appVerifier)

          .then((confirmationResult) => {

            setConfirmationResult(confirmationResult);

            window.confirmationResult = confirmationResult;

            alert('OTP has been sent');

            setShowSignupForm(true);

            setShowOtpInput(true);

            setMode('Sing Up');

          }).catch((error) => {

            console.log(error);
            // const Toast = Swal.mixin({
            //   toast: true,
            //   position: "top-end",
            //   showConfirmButton: false,
            //   timer: 3000,
            //   timerProgressBar: true,
            //   didOpen: (toast) => {
            //     toast.onmouseenter = Swal.stopTimer;
            //     toast.onmouseleave = Swal.resumeTimer;
            //   }
            // });
            // Toast.fire({
            //   icon: "warning",
            //   title: "Incorrect otp entered"
            // });
          });

      }



    } catch (error) {

      console.error(error);

    }

  };
  
  const generateUniqueID = () => {
   // console.log("Last IF:",lastID)
  const newID = `USR${String(lastID + 1).padStart(5, '0')}`;
  setLastID(lastID + 1);
  return newID;
};


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleOTPSubmit = useCallback(async () => {

    try {
      //console.log("handleOTPSubmit called:::::>");

      window.confirmationResult

        .confirm(otp_number)

        .then(async (result) => {

          //console.log('Login Success:::::::::>');

          const hashPassword = await bcrypt.hash(password, 10);
          //console.log("Hashed Password:::::>", hashPassword);



          const user = result.user;
          //console.log('Login Success:::::::::>', user);
          const user_id = generateUniqueID();
          const created_date = "123456";

          // console.log('Login Success:::::::::>', firstname,mobile_number,
          // password, lastname, email, password, confirmPassword, hashPassword, user_id,
          //   created_date);

          //  let results = await fetch("http://localhost:3000/api/userApi",{
          //     method:"POST",
          //     body:JSON.stringify({user_id,firstname,lastname,email,mobile_number,hashPassword,created_date})
          // });
          // results = await results.json();
          // console.log("REsults::::::::>",results);
          alert("User Sign UP Successfully!");

          // router.push(`/?firstname=${firstname}&lastname=${lastname}`)

          const resultt = await signIn("credentials", {

            user_id: user_id,

            mobile_number: mobile_number,

            password: password,

            hashPassword: hashPassword,

            firstname: firstname,

            lastname: lastname,

            email: email,

            delete_flag: 0,

            created_date: created_date,

            user_role: "guest",

            redirect: true,

            callbackUrl: "/"

          })

        }).catch((error) => {

        });

    } catch (error) {

      console.error(error)

    }

  });


  useEffect(() => {
    //console.log("ResultAll:::::>",resultAllUser)
    async function dat() {
        const response = await fetch("/api/userApi", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const resultt = await response.json();
        //console.log("REsulttttttttttttt::::::::>",resultt.result)
        let result_All = resultt.result;
         if (result_All && result_All.length > 0) {
        const lastElement = result_All[result_All.length - 1];
        //console.log("REsulttttttttttttt::::::::>",lastElement)
        const lastElementId = lastElement.user_id; 
        //console.log("REsulttttttttttttt::::::::>",lastElementId)
        const numericPart = lastElementId ? lastElementId.match(/(?<=USR)0*(\d+)/) : null; 
        const lastNumericId = numericPart ? parseInt(numericPart[1]) : null;
        //console.log("Numeric ID of the last element:", lastNumericId);
        setLastID(lastNumericId);
    } else {
        //console.log("No elements in the array.");
        setLastID(0);
    }
    }
  
    dat()
  
   
  
  }, [resultAllUser,handleOTPSubmit]);

  useEffect(() => {

    let interval;

    if (resendTimer > 0) {

      interval = setInterval(() => {

        setResendTimer((prevTimer) => prevTimer - 1);

      }, 1000);
    }



    return () => clearInterval(interval);

  }, [resendTimer]);


  // useEffect(() => {

  //   console.log("Login Flag:", loginFlag);

  // }, [loginFlag]);



  const handleResendOTPClick = async () => {

    setResendTimer(30);
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


  const handleGetOTPClick = async () => {

    try {
      //console.log("Entered OTP::::>", otp_number)

      if (loginFlag === false || loginFlagBookingsPage === false) {
        window.confirmationResult

          .confirm(otp_number)

          .then(async (result) => {

            //console.log('Login Success:::::::::>');

            //console.log("Verify Pass::::::>", mobile_number, password);

            const resultt = await signIn("credentials", {

              mob_num: mobile_number,

              // redirect : true,

              // callbackUrl : "/"

            })

            // onResultFlag(1)

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
      } else {
        window.confirmationResult

          .confirm(otp_number)

          .then(async (result) => {

            // console.log('Login Success:::::::::>');

            // console.log("Verify Pass::::::>", mobile_number, password);

            const resultt = await signIn("credentials", {

              mob_num: mobile_number,

              // redirect: true,

              // callbackUrl: "/"

            })

            onResultFlag(1)

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

          
      }



      // const response = await fetch(`/api/mobilenumber?mobileNumber=${mobile_number}`);

      // const data = await response.json();

      // if (data.isRegistered) {

      //   setIsMobileNumberRegistered(false);

      //   setShowOtpInput(true);

      // } else {

      //   setShowSignupForm(true);

      //   setShowOtpInput(true);

      //   setMode('Sing Up');

      // }
    } catch (error) {

      console.error('Error checking mobile number:', error);

    }
  };

  const handleLoginError = () => {
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
      title: "Incorrect password entered"
    });
    //console.log("Incorrect password entered");
  };

  const handleLoginAction = async () => {

    const res = await fetch("/api/userApi", {
      method: 'GET',
      headers: { "Content-Type": "application/json" }
    })
    const use = await res.json()
    console.log("User:::::::::::::>",use)
    let ch = use.result;
    setResultAllUser(use.result)
    let fi = ch.find((item) => item.mobile_number === mobile_number && item.delete_flag === 0 && item.user_role === "guest");
    //console.log("Fi", fi)

    let fi1 = ch.filter((item) => item.mobile_number === mobile_number && item.delete_flag === 1 && item.user_role === "guest");

    if(fi1 === undefined) {
      fi1 = false
    }

    //console.log("Fi1: ",fi1)

    if(fi1) {
      let matchRes = false;
      fi1?.map(async(item) => {
        let match = await bcrypt.compare(password, item.hashPassword);
        if(match && fi?.delete_flag === 1) {
          matchRes = true;
          alert("Username or password is incorrect!")
        }
      })
      
      if(matchRes) {
        //console.log("Match is true")
        alert("Username or password is incorrect!")
      }else{
       // console.log("Match is false")
        if(fi?.delete_flag === 0){
          try {
           // console.log("Verify Pass::::::>", mobile_number, password);
      
            if (loginFlag === false || loginFlagBookingsPage === false) {
      
              const result = await signIn("credentials", {
      
                mobilenumber: mobile_number,
      
                password: password,
      
                // redirect : true,
      
                // callbackUrl : "/"
      
              }).catch((error) => {
               // handleLoginError
              });
      
             // console.log("Login Result If: ", result);
            } else {
              
              //const callbackUrl = process.env.NODE_ENV === 'production' ? "/" : process.env.NEXTAUTH_URL;
      
              const result = await signIn("credentials", {
      
                mobilenumber: mobile_number,
      
                password: password,
      
                // redirect: true,
      
                // callbackUrl: "/"
      
              }).catch((error) => {
               //handleLoginError()
              });
              
      
                onResultFlag(1)
      
          
      
              //console.log("Login Result Else: ", result);
              
            }
      
      
      
          } catch (error) {
            //handleLoginError()
            console.log(error);
          }
        }else{
          alert("Username or password is incorrect!")
        }
    
      }
    }else{
      try {
        //console.log("Verify Pass::::::>", mobile_number, password);
  
        if (loginFlag === false || loginFlagBookingsPage === false) {
  
          const result = await signIn("credentials", {
  
            mobilenumber: mobile_number,
  
            password: password,
  
            // redirect : true,
  
            // callbackUrl : "/"
  
          }).catch((error) => {
           // handleLoginError
          });
  
          //console.log("Login Result If: ", result);
        } else {
          
          //const callbackUrl = process.env.NODE_ENV === 'production' ? "/" : process.env.NEXTAUTH_URL;
  
          const result = await signIn("credentials", {
  
            mobilenumber: mobile_number,
  
            password: password,
  
            // redirect: true,
  
            // callbackUrl: "/"
  
          }).catch((error) => {
           //handleLoginError()
          });
          
  
            onResultFlag(1)
  
      
  
          //console.log("Login Result Else: ", result);
          
        }
  
  
  
      } catch (error) {
        //handleLoginError()
        console.log(error);
      }
    }


      

  };

  const handleUsePasswordClick = () => {

    setShowOtpInput(false);

    setShowPasswordInput(true);

    setMode('Verify Password');

  };

  const handleBackButtonClick = () => {

    setShowOtpInput(false);

    setShowPasswordInput(false);

    setShowSignupForm(false);

    setMode('Login');

  };

  return (
    <>
      <form action="#" method="POST" className="mt-8">
        <div className="space-y-5 items-center">
          <div>
            <label htmlFor="" className="text-base font-medium text-black/50">
              Enter Mobile Number
            </label>
            <div className="mt-2">
              {/* <input
                        className="flex h-10 w-full rounded-md border text-foreground border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="Mobile No"
                        value={mobile_number}
                        onChange={handleMobileChange}
                        disabled={showSignupForm || showOtpInput || showPasswordInput}
                      /> */}
              <Input
                className="inline-flex w-full"
                type="text"
                placeholder="Mobile No"
                variant="bordered"
                color='primary'
                value={mobile_number}
                onChange={handleMobileChange}
                disabled={showSignupForm || showOtpInput}
              />
            </div>
          </div>
          <div>

            {showSignupForm && (
              <>
                <div className="mt-2">
                  <label htmlFor="" className="text-base font-medium text-foreground">
                    Enter Your First Name
                  </label>
                  <div className="mt-2">
                    {/* <input
                                className="flex h-10 w-full rounded-md border text-foreground border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                type="text"
                                placeholder="First Name"
                                onChange={(e) => setFirstName(e.target.value)}
                              ></input> */}
                    <Input
                      className="inline-flex w-full"
                      type="text"
                      placeholder="First Name"
                      variant="bordered"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-2">
                  <label htmlFor="" className="text-base font-medium text-foreground">
                    Enter Your Last Name
                  </label>
                  <div className="mt-2">
                    {/* <input
                                className="flex h-10 w-full rounded-md border text-foreground border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                type="text"
                                placeholder="Last Name"
                                onChange={(e) => setLastName(e.target.value)}
                              ></input> */}
                    <Input
                      className="inline-flex w-full"
                      type="text"
                      placeholder="Last Name"
                      variant="bordered"
                      onChange={(e) => setLastName(e.target.value)}
                    />

                  </div>
                </div>

                <div className="mt-2">
                  <label htmlFor="" className="text-base font-medium text-foreground">
                    Enter your Email
                  </label>
                  <div className="mt-2">
                    {/* <input
                                className="flex h-10 w-full rounded-md border text-foreground border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                type="text"
                                placeholder="E-mail"
                                onChange={(e) => setEmail(e.target.value)}
                              ></input> */}

                    <Input
                      isRequired
                      className="inline-flex w-full"
                      type="email"
                      label="Email"
                      placeholder="jondeo@gmail.com"
                      description="We'll never share your email with anyone else."
                      variant="bordered"
                      // onChange={(e) => setEmail(e.target.value)}
                      onValueChange={setEmail}
                      value={email}
                      isInvalid={isInvalid}
                      color={isInvalid ? "danger" : "success"}
                      errorMessage={isInvalid && "Please enter a valid email"}
                    />


                  </div>
                </div>


                <div className="mt-2">
                  <label htmlFor="" className="text-base font-medium text-foreground">
                    Enter Password
                  </label>
                  <div className="mt-2">
                    {<Input
                      //className="flex h-10 w-full rounded-md border text-foreground border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                     
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibilityEnterPass}>
                            {isVisibleEnterPass ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </button>
                    }
                    type={isVisibleEnterPass ? "text" : "password"}
                    ></Input>}

                    {/* <PasswordInput
                              className="inline-flex w-full"
                              placeholder="Set password"
                              onChange={(e) => setPassword(e.target.value)}
                              /> */}
                  </div>
                </div>


                <div className="mt-2">
                  <label htmlFor="" className="text-base font-medium text-foreground">
                    Confirm Password
                  </label>
                  <div className="mt-2">
                    {<Input
                      //className="flex h-10 w-full rounded-md border text-foreground border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                
                      placeholder="Confirm Password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibilityConfirmPass}>
                            {isVisibleConfirmPass ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </button>
                    }
                    type={isVisibleConfirmPass ? "text" : "password"}
                    ></Input>}

                    {/* <PasswordInput
                              className="inline-flex w-full"
                              placeholder="Confirm Password"
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              /> */}

                  </div>
                </div>
              </>
            )}


            {showOtpInput && (
              <>
                <div className="flex items-center justify-between">
                  <label htmlFor="" className="text-base font-medium text-black/50">
                    Enter OTP
                  </label>
                </div>
                <div className="mt-2 text-end">
                  {/* <input
                            className="flex h-10 w-full rounded-md border text-foreground border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                            type="text"
                            placeholder="OTP"
                            onChange={handleOTPChange}
                          ></input> */}

                  <Input
                    className="inline-flex w-full"
                    type="text"
                    color='primary'
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
                      <span className="ml-2 text-sm text-text-foreground">{`(${resendTimer}s)`}</span>
                    )}
                  </a>
                </div>
              </>
            )}


            {showPasswordInput && (
              <>
                <div className="flex items-center justify-between">
                  <label htmlFor="" className="text-base font-medium text-foreground">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  {/* <PasswordInput label="Password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)}/> */}
                  {<Input
                      //className="flex h-10 w-full rounded-md border text-foreground border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibilityPass}>
                            {isVisiblePass ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </button>
                      }
                      type={isVisiblePass ? "text" : "password"}
                  ></Input>}
                </div>
              </>
            )}
          </div>


          <div>

            {/* 1st page */}

            {mode === 'Login' && (
              <>
                <div className='pb-2'>
                  {/* <button
                            type="button"
                            onClick={handleSendOTP}
                            className="inline-flex w-full items-center justify-center rounded-md bg-purple-600 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-purple-900/80"
                          >
                            Get OTP
                          </button> */}
                  <Button
                    color="primary"
                    variant="shadow"
                    className="inline-flex w-full"
                    onClick={handleSendOTP}
                  >
                    Get OTP
                  </Button>
                </div>

                <div className='pt-2'>
                  {/* <button
                            type="button"
                            onClick={handleUsePasswordClick}
                            className="inline-flex w-full items-center justify-center rounded-md bg-purple-600 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-purple-900/80"
                          >
                            Use Password
                          </button> */}
                  <Button
                    color="primary"
                    variant="shadow"
                    className="inline-flex w-full"
                    onClick={handleUsePasswordClick}
                  >
                    Use Password
                  </Button>
                </div>
              </>
            )}


            {/* {mode === 'Use Password' && (
                      <button
                        type="button"
                        onClick={handleUsePasswordClick}
                        className="inline-flex w-full items-center justify-center rounded-md bg-purple-600 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-purple-900/80"
                      >
                        Use Password
                      </button>
                    )} */}

            {(mode === 'Verify OTP' || mode === 'Verify Password' || mode === 'Sing Up') && (
              <>
                {mode === 'Verify OTP' && (
                  <>
                    <div className='pb-2'>
                      <Button
                        color='primary'
                        variant='shadow'
                        className='w-full'
                        onClick={handleGetOTPClick} // This will be replace with api call function
                      >
                        Verify OTP
                      </Button>
                    </div>


                  </>

                )}



                {mode === 'Verify Password' && (
                  <>
                    <div className='pb-2'>
                      <Button
                        color='primary'
                        variant='shadow'
                        onClick={(e) => {handleLoginAction()}}
                        className='w-full'
                      >
                        Log In
                      </Button>
                    </div>
                  </>

                )}


                {mode === 'Sing Up' && (
                  <>
                    <div className='pb-2'>
                      <Button
                        color='primary'
                        variant='shadow'
                        onClick={handleOTPSubmit} // This will be replace with api call function
                        className='w-full'
                      >
                        Sign Up
                      </Button>
                    </div>
                  </>

                )}




                {/* <button
                          type="button"
                          onClick={handleBackButtonClick}
                          className="inline-flex w-full items-center justify-center rounded-md bg-purple-600 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-purple-900/80"
                        >
                          Back
                        </button> */}
                <Button
                  color="primary"
                  variant="shadow"
                  className="inline-flex w-full"
                  onClick={handleBackButtonClick}
                >
                  Back
                </Button>
              </>
            )}

          </div>
        </div>
      </form>
      <div id="recaptcha-container"></div>

    </>
  )
}

export default LoginFunc;