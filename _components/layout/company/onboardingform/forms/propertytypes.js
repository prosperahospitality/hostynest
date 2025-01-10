'use client'
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStep, updatePropertyType } from "@/app/redux/slices/onboardingFormSlice";
import NavButtons from '@/_components/layout/company/onboardingform/NavButtons'
import { Hotel, House, Apartment, Tinyhomes, Farms, Lake, Barns, Bedandbreakfasts, Yurts, Campervans, SherpherdsHuts, CasaParticular } from "@/_components/propertyicons";

const typelist = [
    {
        key:"1",
        title: "Hotel",
        value: "hotel",
        icon: <Hotel className="size-12" />,
    },
    {
        key:"2",
        title: "Farms",
        value: "farms",
        icon: <Farms className="size-12" />,
    },
    {
        key:"3",
        title: "Tiny homes",
        value: "tinyhomes",
        icon: <Tinyhomes className="size-12" />,
    },
    {
        key:"4",
        title: "Home",
        value: "home",
        icon: <House className="size-10" />,
    },
    {
        key:"5",
        title: "Flat/Apartment",
        value: "flat/apartment",
        icon: <Apartment className="size-14" />,
    },
];



export default function PropertyTypes() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
    const dispatch = useDispatch();
    const currentStep = useSelector((store) => store.onboardingform.currentStep);
    const propertyType = useSelector((store) => store.onboardingform.propertyType);
    console.log(propertyType);
    const { register, handleSubmit, setValue, watch, control } = useForm({
        mode: "all",
        defaultValues: {
            ...propertyType,
        },
    });
    async function processData(data) {
        console.log(data, "process");
        // Increment the current step by 1 and dispatch the action
        dispatch(setCurrentStep(currentStep + 1));
        //Update the personalType
        dispatch(updatePropertyType(data));
    }

     const onSubmit = data => {
    console.log(data); // Handle form submission
  };

  useEffect(() => {
    initialFxn()
}, [])

const initialFxn = async () => {
    try {
        const response = await fetch("/api/property/property_type", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();
        console.log("Data:", result.data);
        setResult(result.data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

    return (
        <form onSubmit={handleSubmit(processData)}>
            <h1 className='text-base mt-10 mb-4'>Which of these best describes your Place ?</h1>

            <ul className="grid w-11/12 gap-2 grid-cols-5">
    {result?.filter(item => typelist?.some(item1 => item.property_category.toLowerCase().replace(/\s/g, '') === item1.value && item.status === "Active")).map((item, index) => (
        <li key={index}>
            <input type="radio" key={index} id={item.property_category.toLowerCase().replace(/\s/g, '')} value={item.property_category.toLowerCase().replace(/\s/g, '')} {...register("typeSelected")} className="hidden peer" />
            <label htmlFor={item.property_category.toLowerCase()} className="inline-flex items-center justify-center h-20 w-36 p-1 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                {typelist?.map(item1 => {
                    if (item.property_category.toLowerCase().replace(/\s/g, '') === item1.value) {
                        return (
                            <div className="flex flex-col items-center" key={item1.key}>
                                {item1.icon}
                                <h4 className="w-full text-base" key={item1.key}>{item.property_category}</h4>
                            </div>
                        );
                    }
                    return null;
                })}
            </label>
        </li>
    ))}
</ul>



            {/* <ul className="grid w-11/12 gap-2 grid-cols-5">
                {result?.map((item, index) => (
                    // {typelist?.map((item1,index1) => (
                        <li>
                        <input key={index} type="radio" id={item.property_category.toLowerCase()} value={item.property_category.toLowerCase()} {...register("typeSelected")} className="hidden peer" />
                        <label for={item.property_category.toLowerCase()} className="inline-flex items-center justify-center h-20 w-36 p-1 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <div className="flex flex-col items-center">
                                {item.property_category}
                                <h4 className="w-full text-base">{item.property_category}</h4>
                            </div>
                        </label>
                    </li>
                    // ))}
                   
                ))}
            </ul> */}
            <NavButtons />
            <DevTool control={control} />
        </form>
    )
};