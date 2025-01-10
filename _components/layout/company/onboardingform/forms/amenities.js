'use client'
import React, { useState } from 'react';
import NavButtons from '@/_components/layout/company/onboardingform/NavButtons'
import { useForm } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStep, updateAmenities } from "@/app/redux/slices/onboardingFormSlice";
import { Wifi, SunSnow, Monitor, Microwave, WashingMachine, ParkingSquare, ParkingMeter, Computer, Piano, Dumbbell, ShowerHead } from "lucide-react"
import { FaSwimmingPool, FaHotTub, FaSkiing } from "react-icons/fa";
import { GiBarbecue, GiFireBowl, GiFireplace } from "react-icons/gi";
import { MdDining } from "react-icons/md";
import { TbBeach } from "react-icons/tb";
import { Lakearea } from "@/_components/icon";

const aminations = [
    {
        key: "wifi",
        title: "Wifi",
        value: "wifi",
        icon: <Wifi />,
    },
    {
        key: "tv",
        title: "Tv",
        value: "tv",
        icon: <Monitor />,
    },
    {
        key: "air-conditioner",
        title: "Air Conditioner",
        value: "air-conditioner",
        icon: <SunSnow />,
    },
    {
        key: "kitchen",
        title: "Kitchen",
        value: "kitchen",
        icon: <Microwave />,
    },
    {
        key: "washing-machine",
        title: "Washing Machine",
        value: "washing-machine",
        icon: <WashingMachine />,
    },
    {
        key: "free-parking-on-premises",
        title: "Free Parking on Premises",
        value: "free-parking-on-premises",
        icon: <ParkingSquare />,
    },
    {
        key: "paid-parking-on-premises",
        title: "Paid Parking on Premises",
        value: "paid-parking-on-premises",
        icon: <ParkingMeter />,
    },
    {
        key: "dedicated-workspace",
        title: "Dedicated Workspace",
        value: "dedicated-workspace",
        icon: <Computer />,
    },
];

const standoutamenities = [
    {
        key: "pool",
        title: "Pool",
        value: "pool",
        icon: <FaSwimmingPool />,
    },
    {
        key: "hot-tub",
        title: "Hot tub",
        value: "hot-tub",
        icon: <FaHotTub />,
    },
    {
        key: "bbq-grill",
        title: "BBQ grill",
        value: "bbq-grill",
        icon: <GiBarbecue />,
    },
    {
        key: "outdoor-dining-area",
        title: "Outdoor dining area",
        value: "outdoor-dining-area",
        icon: <MdDining />,
    },
    {
        key: "fire-pit",
        title: "Fire pit",
        value: "fire-pit",
        icon: <GiFireBowl />,
    },
    {
        key: "indoor-fireplace",
        title: "Indoor fireplace",
        value: "indoor-fireplace",
        icon: <GiFireplace />,
    },
    {
        key: "piano",
        title: "Piano",
        value: "piano",
        icon: <Piano />,
    },
    {
        key: "exercise-equipnent",
        title: "Exercise equipment",
        value: "exercise-equipnent",
        icon: <Dumbbell />,
    },
    {
        key: "lake-access",
        title: "Lake access",
        value: "lake-access",
        icon: <Lakearea className="size-10" />,
    },
    {
        key: "beach-access",
        title: "Beach access",
        value: "beach-access",
        icon: <TbBeach />,
    },
    {
        key: "ski-in-ski-out",
        title: "Ski-in/Ski-out",
        value: "ski-in-ski-out",
        icon: <FaSkiing />,
    },
    {
        key: "outdoor-shower",
        title: "Outdoor shower",
        value: "outdoor-shower",
        icon: <ShowerHead />,
    },
];

export default function Amenities() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const currentStep = useSelector((store) => store.onboardingform.currentStep);
    const amenitiesInfo = useSelector((store) => store.onboardingform.amenitiesInfo);
    console.log(amenitiesInfo);
    const { register, handleSubmit, setValue, watch, control } = useForm({
        mode: "all",
        defaultValues: {
            ...amenitiesInfo,
        },
    });
    async function processData(data) {
        console.log(data);
        // Increment the current step by 1 and dispatch the action
        dispatch(setCurrentStep(currentStep + 1));
        //Update the AmenitiesInfo
        dispatch(updateAmenities(data));
    }

    return (
        <form onSubmit={handleSubmit(processData)}>

            <h1 className='mt-10 mb-4'>Tell guests what your place has to offer</h1>
            <ul className="grid w-11/12 gap-2 md:grid-cols-5">
                {aminations.map((item, index) => (
                    <li key={item.key}>
                        <input key={item.key} type="checkbox" id={item.value} name="hosting" value={item.value} {...register("offeraminations")} className="hidden peer" />
                        <label for={item.value} className="inline-flex items-center text-center justify-center w-40 h-20 p-6 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <div className="block">
                                <label className="w-full text-base">{item.icon}{item.title}</label>
                            </div>
                        </label>
                    </li>
                ))}
            </ul>
            <h1 className='mt-10 mb-4'>Do you have any standout amenities ?</h1>
            <ul className="grid w-11/12 gap-2 md:grid-cols-5">
                {standoutamenities.map((item, index) => (
                    <li key={item.key}>
                        <input key={item.key} type="checkbox" id={item.value} name="hosting" value={item.value} {...register("standoutaminations")} className="hidden peer" />
                        <label for={item.value} className="inline-flex items-center text-center justify-center w-40 h-20 p-6 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <div className="block">
                                <label className="w-full text-base">{item.icon}{item.title}</label>
                            </div>
                        </label>
                    </li>
                ))}
            </ul>
            <NavButtons />
            <DevTool control={control} />
        </form>
    )
}