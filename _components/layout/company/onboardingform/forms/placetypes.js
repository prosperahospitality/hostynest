'use client'
import React, { useState } from 'react';
import NavButtons from '@/_components/layout/company/onboardingform/NavButtons'
import { useForm } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";
import { useDispatch, useSelector } from "react-redux";
import { Home, DoorOpen, Users } from "lucide-react"
import { setCurrentStep, updatePlaceType } from "@/app/redux/slices/onboardingFormSlice";

const typeplace = [
  {
    key:"1",
    title: "An Entire Place",
    value: "anentireplace",
    icon: <Home />,
  },
  {
    key:"2",
    title: "A Room",
    value: "aroom",
    icon: <DoorOpen />,
  },
  {
    key:"3",
    title: "A Shared Room",
    value: "asharedroom",
    icon: <Users />,
  },
];


export default function PlaceTypes() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const currentStep = useSelector((store) => store.onboardingform.currentStep);
  const placeType = useSelector((store) => store.onboardingform.placeType);
  console.log(placeType);
  const { register, handleSubmit, setValue, watch, control } = useForm({
    mode: "all",
    defaultValues: {
      ...placeType,
    },
  });
  async function processData(data) {
    console.log(data);
    // Increment the current step by 1 and dispatch the action
    dispatch(setCurrentStep(currentStep + 1));
    //Update the personalInfo
    dispatch(updatePlaceType(data));
  }

  return (
    <form onSubmit={handleSubmit(processData)}>
      <h1 className='text-base mt-10 mb-4'>What types of place will guests have ?</h1>
      <ul className="flex flex-col w-80 gap-3">
        {typeplace?.map((item, index) => (
          <li key={item.key}>
            <input key={item.key} type="radio" id={item.value} value={item.value} {...register("placeSelected")} className="hidden peer" />
            <label for={item.value} className="inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
              <div className="flex flex-row gap-2">
                <div className='text-left'>{item.icon}</div>
                <h4 className="w-full text-base">{item.title}</h4>
              </div>
            </label>
          </li>
        ))}
      </ul>
      <NavButtons />
      <DevTool control={control} />
    </form>
  )
};