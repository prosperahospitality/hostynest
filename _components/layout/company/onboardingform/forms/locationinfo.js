'use client'
import React, { useState, useEffect } from 'react';
import NavButtons from '@/_components/layout/company/onboardingform/NavButtons'
import { useForm } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStep, updateLocationInfo } from "@/app/redux/slices/onboardingFormSlice";
// import MapWithMarker from "@/_components/layout/company/onboardingform/mapwithmarker"
import SearchBox from "@/_components/layout/company/onboardingform/SearchBox"
import dynamic from 'next/dynamic'
const DynamicMapWithMarker = dynamic(() => import("@/_components/layout/company/onboardingform/mapwithmarker"), {
  ssr: false,
});

export default function LocationInfo() {
  
  const [result, setResult] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [filteredCountry, setFilteredCountry] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [filteredState, setFilteredState] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [filteredDistrict, setFilteredDistrict] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [filteredCity, setFilteredCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  
  const dispatch = useDispatch();
  const currentStep = useSelector((store) => store.onboardingform.currentStep);
  const locationInfo = useSelector((store) => store.onboardingform.locationInfo);

  console.log("Loication Info::::::::>",locationInfo);
  const { register, handleSubmit, setValue, watch, control, getValues } = useForm({
    mode: "all",
    defaultValues: {
      ...locationInfo,
    },
  });
  const pinnedLoc = useSelector((data) => data.search.pinnedLoc);  

  const pinnedCoords = useSelector((data) => data.search.pinnedCoords);

  
  async function processData(data) {
    console.log("Process Data: ",data);
    // Increment the current step by 1 and dispatch the action
    dispatch(setCurrentStep(currentStep + 1));
    //Update the locationInfo
    dispatch(updateLocationInfo(data));
  }

  
  useEffect(() => {

    if (locationInfo) {
      setSelectedRegion(locationInfo.region)
setSelectedCountry(locationInfo.country)
setSelectedState(locationInfo.state)
setSelectedDistrict(locationInfo.district)
setSelectedCity(locationInfo.city)
    }
  }, [locationInfo]); 


  useEffect(() => {

    if (pinnedLoc) {
      setValue("searchBox", pinnedLoc);
    }
  }, [pinnedLoc]); 

  useEffect(() => {

    if (pinnedCoords) {
      setValue("mapMarker", pinnedCoords);
    }
  }, [pinnedCoords]); 

  const previousSearchBox = getValues("searchBox");
  const previousMapMarker = getValues("mapMarker");

  useEffect(() => {
    initialFxn()
}, [])

const initialFxn = async () => {
    try {
        const response = await fetch("/api/locationmaster/locationmaster_alllocation", {
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

useEffect(() => {

  console.log("Distinct Regions:", result.filter((item) =>  item.state === selectedState))
  setFilteredCountry(result.filter((item) => item.region === selectedRegion))
  setFilteredState(result.filter((item) => item.region === selectedRegion && item.country === selectedCountry))
  setFilteredDistrict(result.filter((item) => item.region === selectedRegion && item.country === selectedCountry && item.state === selectedState))
  setFilteredCity(result.filter((item) => item.region === selectedRegion && item.country === selectedCountry && item.state === selectedState && item.district === selectedDistrict))
}, [result, selectedRegion, selectedCountry, selectedDistrict, selectedState])

  return (
    <form onSubmit={handleSubmit(processData)}>
      <h1 className='mt-10 mb-2'>Now let&apos;s give your hotel a title</h1>
      <input {...register("propertyname")} type="text" placeholder="Property Name" className='w-96 border-1 rounded-lg py-2 border-primary' />

      <div className='mt-6'>
        <h1 className='text-base'>Where&apos;s your place Located ?</h1>
        {/* <input {...register("address")} type="text" placeholder='Address' className='w-96 mt-4 border-1 rounded-lg py-2 border-primary'/> */}
        <SearchBox previousSearchBox = {previousSearchBox} {...register("searchBox")}/>
        <div className='h-96 w-11/12 mt-2 rounded-xl'>
          <DynamicMapWithMarker previousMapMarker = {previousMapMarker} {...register("mapMarker")}/>
        </div>


        <div className='grid mt-4 gap-1 w-11/12 grid-cols-4'>

        <div className='space-x-2'>
  <label>Region :</label>
  <select {...register("region")} className='text-center border-1 rounded-lg py-2 border-primary' value={selectedRegion} onChange={(e) => {setSelectedRegion(e.target.value); setSelectedCountry(""); setSelectedState(""), setSelectedDistrict(""), setSelectedCity("")}}>
    <option value="" disabled selected>Select...</option>
    {[...new Set(result?.map(item => item.region))].map((region) => (
      <option key={region} value={region}>{region}</option>
    ))}
  </select>
</div>

<div className='space-x-2'>
  <label>Country :</label>
  <select {...register("country")} className={`text-center border-1 rounded-lg py-2 border-primary ${selectedRegion ? '' : 'disabled'}`} disabled={!selectedRegion} value={selectedCountry} onChange={(e) => {setSelectedCountry(e.target.value); setSelectedState("")}}>
    <option value="" disabled>Select...</option>
    {[...new Set(filteredCountry?.map(item => item.country))].map((country) => (
      <option key={country} value={country}>{country}</option>
    ))}
  </select>
</div>



          <div className='space-x-2'>
            <label>State :</label>
            <select {...register("state")} className={`text-center border-1 rounded-lg py-2 border-primary ${selectedCountry ? '' : 'disabled'}`} disabled={!selectedCountry} value={selectedState} onChange={(e) => {setSelectedState(e.target.value); setSelectedDistrict("")}}>
              <option value="" disabled>Select...</option>
            {[...new Set(filteredState?.map(item => item.state))].map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
            </select>
          </div>

          <div className='space-x-2'>
            <label>District :</label>
            <select {...register("district")} className={`text-center border-1 rounded-lg py-2 border-primary ${selectedState ? '' : 'disabled'}`} value={selectedDistrict} disabled={!selectedState} onChange={(e) => {setSelectedDistrict(e.target.value); setSelectedCity("")}}>
            <option value="" disabled>Select...</option>
            {[...new Set(filteredDistrict?.map(item => item.district))].map((district) => (
              <option key={district} value={district}>{district}</option>
            ))}
            </select>
          </div>

          <div className='space-x-2'>
            <label>City :</label>
            <select {...register("city")} className={`text-center border-1 rounded-lg py-2 border-primary ${selectedDistrict ? '' : 'disabled'}`} value={selectedCity} disabled={!selectedDistrict} onChange={(e) => {setSelectedCity(e.target.value)}}>
            <option value="" disabled>Select...</option>
            {[...new Set(filteredCity?.map(item => item.city))].map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
            </select>
          </div>
        </div>
      </div>
      <NavButtons />
      <DevTool control={control} />
    </form>
  )
}