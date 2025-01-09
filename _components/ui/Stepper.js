'use client'
import React, { useState } from 'react'
import './styles/Stepper.css'
import { Button } from "@nextui-org/react";
import { TiTick } from "react-icons/ti";
import { useSelector, useDispatch } from 'react-redux'




const Stepper = () => {
    const count = useSelector((state) => state.counter.value)
    const steps = ["Property Details", "Rooms", "Photos", "Final Steps"];

    const [currentStep, setCurrentStep] = useState(1);
    const [complete, setComplete] = useState(false);


  return (
    <>
    <div className='flex flex-col justify-between'>
    {
        steps?.map((step, i)=>(
            <div key={i} className={`stepitem ${currentStep === i + 1 && "active"} ${(i + 1 < currentStep || complete) && "complete"}`}>
                <div className="step">
                {
                    (i + 1 < currentStep || complete ) ? <TiTick size={24} /> : "" 
                }
                </div>
                <p className='text-gray-300 text-sm'>{step}</p>
            </div>
        ))
    }
    </div>
    {count}

    <div className='mt-2'>
    {
        !complete && 
        <Button color="primary" onClick={() => {
            currentStep === steps.length
            ? setComplete(true)
            : setCurrentStep((prev) => prev + 1);
            }}>
              {currentStep === steps.length ? "Finish" : "Next"}
        </Button>
    }
    {
        currentStep > 1 &&
        <Button color="primary" onClick={() => {setCurrentStep(prev => prev - 1);}}>
            Back
        </Button>
    }
    </div>
    </>
  )
}

export default Stepper