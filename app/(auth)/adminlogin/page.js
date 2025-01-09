'use client'
import React, { useState, useEffect } from "react";
import Image from 'next/image';
import { IMAGES } from '@/public/index';
import { Input, Autocomplete, AutocompleteItem, Button, Checkbox } from "@nextui-org/react";
import { SessionProvider, useSession, getSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";


export default function AdminloginPage() {

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  let router = useRouter();

  const [selectedRole, setSelectedRole] = useState();
  const [userID, setUserID] = useState();
  const [password, setPassword] = useState();

  const [session, setSession] = useState({});
  useEffect(() => {
    const getSessionInfo = async () => {
      const session = await getSession();
      setSession(session);
    };
    getSessionInfo();
  }, [])

  useEffect(() => {
    console.log("Session at admin page: ", session)
  }, [session])

  const roles = [
    { label: "Admin", value: "admin" },
    { label: "Collection Team", value: "collectionteam" },
    { label: "Listing Team", value: "listingteam" },
    { label: "Sales Team", value: "salesteam" },
  ]

  const handleLoginAction = async () => {
    console.log("Admin Login", selectedRole, userID, password)

    const result = await signIn("credentials", {

      userID: userID,

      password: password,

      user_role: selectedRole.toLowerCase(),

      redirect: false,

      callbackUrl: "/admin/dashboard",

      session: { favorites: ["item1", "item2"] }

    }).catch((error) => {

    });

    if(result.ok === true) {
      router.push("/admin/dashboard")
    }else if(result.ok === false){
      alert("Username or password is incorrect!")
      window.location.reload()
    }

    console.log("Result::::>",result)

  }

  return (
    <div className="w-screen h-screen">

      <Image
        src={'/img/loginbg.jpg'}
        fill
        alt="Loginbg"
        sizes="100%"
        style={{
          objectFit: 'fill'
        }}
        className=""
      />
      <div className="bg-transparent absolute mx-auto w-screen h-screen flex justify-center items-center">
        <div className="flex flex-col items-center justify-center bg-transparent/60 pl-16 pr-16 pb-10 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" style={{
            margin: "35px 0 20px 0"
          }} className="text-gray-300 mt-4" width="8em" height="8em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 23C6.443 21.765 2 16.522 2 11V5l10-4l10 4v6c0 5.524-4.443 10.765-10 12M4 6v5a10.58 10.58 0 0 0 8 10a10.58 10.58 0 0 0 8-10V6l-8-3Z"></path><circle cx={12} cy={8.5} r={2.5} fill="currentColor"></circle><path fill="currentColor" d="M7 15a5.78 5.78 0 0 0 5 3a5.78 5.78 0 0 0 5-3c-.025-1.896-3.342-3-5-3c-1.667 0-4.975 1.104-5 3"></path></svg>
          <Autocomplete
            label="Select an Position"
            className="text-white"
            // defaultSelectedKey={selectedRoom}
            variant="bordered"
            color="primary"
            value={selectedRole}
            allowsCustomValue={true}
            onInputChange={(value) => setSelectedRole(value)}
          >
            {roles?.map((role) => (
              <AutocompleteItem key={role.value} value={role.value}>
                {role.label}
              </AutocompleteItem>
            ))}
          </Autocomplete>
          <Input
            type="text"
            label="UserName/UserID"
            className="text-white mt-6"
            variant="bordered"
            color="primary"
            onChange={(e) => setUserID(e.target.value)}
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            endContent={
              <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off text-2xl text-default-400 pointer-events-none"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" /><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" /><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" /><path d="m2 2 20 20" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye text-2xl text-default-400 pointer-events-none"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /><circle cx="12" cy="12" r="3" /></svg>
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            className="text-white mt-6"
            variant="bordered"
            color="primary"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex gap-16">
            <Checkbox size="sm" color="primary" ><span className="text-white">Remember me</span></Checkbox>
            <Button size="md" radius="lg" className="bg-transparent text-primary left-0" >Forgot password?</Button>
          </div>

          <motion.div className="mt-4"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <button className="py-2 px-6 rounded-xl bg-gray-400 text-[#800000]" onClick={handleLoginAction}>Login</button>
          </motion.div>

        </div>
      </div>
    </div>
  )
};