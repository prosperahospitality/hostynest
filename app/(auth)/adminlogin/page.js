'use client'
import React, {useState,useEffect} from "react";
import Image from 'next/image';
import { IMAGES } from '@/public/index';
import { Input, Autocomplete, AutocompleteItem, Button, Checkbox } from "@nextui-org/react";
import { EyeSlashFilledIcon, EyeFilledIcon, CompanyLogiLogo } from '@/app/_components/icon'
import { SessionProvider, useSession, getSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation';



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
    console.log("Session at admin page: ",session)
    if(session && session?.user?.user_role === "guest" || session?.user?.user_role === "partner") {
      setSession(null)
    }
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
      //window.location.reload()
    }

    console.log("Result::::>",result)

  }

  return (
    <div className="w-screen h-screen">

      <Image
        src={IMAGES.Adminloginbg}
        fill
        alt="Loginbg"
        sizes="100%"
        style={{
          objectFit: 'cover'
        }}
        className=""
      />
      <div className="bg-black/20 absolute mx-auto w-screen h-screen flex justify-center items-center">
        <div className="flex flex-col items-center justify-center bg-transparent/60 pl-16 pr-16 pb-10 rounded-xl">
          <CompanyLogiLogo size={120} fill={'#fff'} />
          <Autocomplete
            label="Select an Position"
            className="text-white"
            variant="bordered"
            color="primary"
            // defaultSelectedKey={selectedRoom}
            value={selectedRole}
            allowsCustomValue={true}
            onInputChange={(value) =>  setSelectedRole(value)}
          >
            {roles.map((role) => (
              <AutocompleteItem key={role.value} value={role.value}>
                {role.label}
              </AutocompleteItem>
            ))}
          </Autocomplete>
          <Input 
            type="text" 
            label="UserName/UserID" 
            color="primary" 
            variant="bordered" 
            className="text-white mt-6"
            onChange={(e) => setUserID(e.target.value)}
          />
          <Input
            label="Password"
            variant="bordered"
            color="primary"
            placeholder="Enter your password"
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
            className="text-white mt-6"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex gap-16">
          <Checkbox size="sm" color="primary" ><span className="text-white">Remember me</span></Checkbox>
          <Button size="md" radius="lg" className="bg-transparent text-primary left-16" >Forgot password?</Button>
        </div>
          <Button variant="shadow" color="primary" size="md" radius="lg" className="mt-4" onClick={handleLoginAction}>Login</Button>
        </div>
      </div>
    </div>
  )
};