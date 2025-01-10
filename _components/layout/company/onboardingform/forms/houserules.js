'use client'
import React, { useState } from 'react';
import NavButtons from '@/_components/layout/company/onboardingform/NavButtons'
import { useForm } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStep, updateHouseRules } from "@/app/redux/slices/onboardingFormSlice";


const houserule = [
  {
    key: "1",
    title: "Smoking Allowed",
    value: "smoking-allowed"
  },
  {
    key: "2",
    title: "Pets Allowed",
    value: "pets-allowed"
  },
  {
    key: "3",
    title: "Children Allowed",
    value: "children-allowed"
  },
  {
    key: "4",
    title: "Parties/Events Allowed",
    value: "parties-events-allowed"
  },
];


export default function HouseRules() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const currentStep = useSelector((store) => store.onboardingform.currentStep);
  const houserules = useSelector((store) => store.onboardingform.houserules);
  console.log(houserules);
  const { register, handleSubmit, setValue, watch, control } = useForm({
    mode: "all",
    defaultValues: {
      ...houserules,
    },
  });
  async function processData(data) {
    console.log(data);
    // Increment the current step by 1 and dispatch the action
    dispatch(setCurrentStep(currentStep + 1));
    //Update the houserules
    dispatch(updateHouseRules(data));
  }


  return (
    <form onSubmit={handleSubmit(processData)}>

      <div className='flex flex-col mt-10'>
        <h1 className='text-base mb-3'>House Rules</h1>
        <ul className="flex flex-col w-96 gap-2">
          {
            houserule?.map((rule, i) => (
              <li className='space-x-2' key={rule.key}>
                <input type="checkbox" value={rule.value} {...register("houserules")} />
                <label key={rule.key}>
                  {rule.title}
                </label>
              </li>
            ))}
        </ul>
      </div>

      <label className='flex mt-10 mb-4'>Check In</label>
      <div className='space-x-8'>
        <select {...register("checkin0")} className='text-center border-1 rounded-lg py-2 mt-2 border-primary'>
          <option value="12am">12:00 AM</option>
          <option value="3am">3:00 AM</option>
          <option value="6am">6:00 AM</option>
          <option value="9am">9:00 AM</option>
          <option value="12pm">12:00 PM</option>
          <option value="3pm">3:00 PM</option>
          <option value="6pm">6:00 PM</option>
          <option value="9pm">9:00 PM</option>
        </select>

        <select {...register("checkin1")} className='text-center border-1 rounded-lg py-2 mt-2 border-primary'>
          <option value="12am">12:00 AM</option>
          <option value="3am">3:00 AM</option>
          <option value="6am">6:00 AM</option>
          <option value="9am">9:00 AM</option>
          <option value="12pm">12:00 PM</option>
          <option value="3pm">3:00 PM</option>
          <option value="6pm">6:00 PM</option>
          <option value="9pm">9:00 PM</option>
        </select>
      </div>

      <label className='flex mt-2'>Check Out</label>
      <div className='space-x-8'>
        <select {...register("checkout0")} className='text-center border-1 rounded-lg py-2 mt-2 border-primary'>
          <option value="12am">12:00 AM</option>
          <option value="3am">3:00 AM</option>
          <option value="6am">6:00 AM</option>
          <option value="9am">9:00 AM</option>
          <option value="12pm">12:00 PM</option>
          <option value="3pm">3:00 PM</option>
          <option value="6pm">6:00 PM</option>
          <option value="9pm">9:00 PM</option>
        </select>

        <select {...register("checkout1")} className='text-center border-1 rounded-lg py-2 mt-2 border-primary'>
          <option value="12am">12:00 AM</option>
          <option value="3am">3:00 AM</option>
          <option value="6am">6:00 AM</option>
          <option value="9am">9:00 AM</option>
          <option value="12pm">12:00 PM</option>
          <option value="3pm">3:00 PM</option>
          <option value="6pm">6:00 PM</option>
          <option value="9pm">9:00 PM</option>
        </select>
      </div>
      <NavButtons />
      <DevTool control={control} />
    </form>
  );
};