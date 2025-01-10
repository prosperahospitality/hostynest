'use client'
import React from "react";
import {Divider, Link} from "@nextui-org/react";
import { Undo2 } from "lucide-react"
import Steps from "@/_components/layout/company/onboardingform/Steps";
import StepForm from "@/_components/layout/company/onboardingform/StepForm";

    const steps = [
      {
        number: 1,
        title: "Property Type",
      },
      {
        number: 2,
        title: "Place Type",
      },
      {
        number: 3,
        title: "Location Info",
      },
      {
        number: 4,
        title: "Amenities",
      },
      {
        number: 5,
        title: "House Rules",
      },
      {
        number: 6,
        title: "Confirm Page",
      },
    ];

const OnboardingPage = () => {


    return (
   <>
   <div className='mt-2 ml-8'>
   <Link
    href="/admin/dashboard"
    className="font-lite text-sm text-gray-300 gap-2 hover:text-black"
    >
    <Undo2 className="size-4"/> Back to Dashboard
    </Link>
   </div>
    <Divider className="my-1" />
    <div className="absolute h-full w-80">

    <Steps steps={steps} />
    
    </div>

    <div className='ml-80 h-full overflow-y-scroll'>    
    <div className="mainSection">
      <StepForm />
    </div>
    </div>
   </>
  )
}

export default OnboardingPage;