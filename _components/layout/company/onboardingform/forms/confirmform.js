"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";
import { Button } from "@nextui-org/react";
import { setCurrentStep, updateAmenities } from "@/app/redux/slices/onboardingFormSlice";
import NavButtons from '@/_components/layout/company/onboardingform/NavButtons'


export default function ConfirmForm() {
    const [loading, setLoading] = useState(false);
    // const [currId, setCurrId] = useState(0);
    let currId = 0;
    const dispatch = useDispatch();
    const currentStep = useSelector((store) => store.onboardingform.currentStep);
    const combinedData = useSelector((store) => store.onboardingform.combinedData);
    console.log(combinedData);
    let payload_facilities =  {};
    let payload = {};
    let payment_Method = {};
    let point_Of_Interest = {};
    const { register, handleSubmit, setValue, watch, control } = useForm({
        mode: "all",
    });
    async function processData(data) {
        console.log(data);
        // Increment the current step by 1 and dispatch the action
        dispatch(setCurrentStep(currentStep + 1));
        //Update the AmenitiesInfo
        dispatch(updateAmenities(data));
    }

    const generatedIds = new Set(); 

function generateUniqueHotelId() {
  let newId;
  do {
    newId = generateRandomId();
  } while (generatedIds.has(newId));
  generatedIds.add(newId);
  currId = newId;
  return newId;
}

function generateRandomId() {
  return Math.floor(10000000 + Math.random() * 90000000);
}

const initialFxn = async () => {
  try {
    
    payload = {
      Address: combinedData.searchBox,
      State: combinedData.state.toString().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
      City: (combinedData.city).toString().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
      Country: combinedData.country,
      Email: " ",
      Check_In: combinedData.checkin0,
      Check_out: combinedData.checkout0,
      Contact_Name: " ",
      Floor_Number: " ",
      Hotel_Description: " ",
      Hotel_Id: generateUniqueHotelId(),
      Hotel_Type: combinedData.typeSelected,
      Hotel_name: combinedData.propertyname,
      Official_Category: " ",
      Phone_Number: " ",
      Pin_Code: " ",
      rating: " ",
      user_review_count: 0,
      is_review_available: " ",
      hour3_display_flag: 0,
      final_display_price_for_3H: 0,
      hour6_display_flag: 0,
      final_display_price_for_6H: 0,
      hour12_display_flag: 0,
      final_display_price_for_12H: 0,
      hour24_display_flag: 0,
      final_display_price_for_24H: 0,
      Location: combinedData.divison.toString().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
      hotel_category: " ",
      facilities : [" "],
      staff_behaviour : " ",
      smooth_check_in : " ",
      room_quality : " ",
      hotel_surroundings : " ",
      policy : [" "],
      cancellation_policy : [" "],
      latitude : combinedData.mapMarker[0],
      longitude : combinedData.mapMarker[1],
      status : "close",      
      place_desc : combinedData.typeSelected,
      guest_place : combinedData.placeSelected,
      reception_number: " ",
      secondary_email: " ",
      lease_expiry_date: " ",
    }
    
    payload_facilities = {
      Hotel_Id: currId,
      Hotel_name: combinedData?.propertyname,
      reception_24_hour: true,
      security_24_hour: true,
      Air_conditioning_in_public_areas: combinedData?.offeraminations?.includes("air_conditioner") ? true : false,
      Airport_Shuttle: false,
      Babysitting_service: false,
      BBQ_facilities: false,
      Belboy_Service: false,
      Bicycle_Hire_Service: false,
      Bicycle_Storage: false,
      Bikes_available: false,
      Car_hire: true,
      Car_park: false,
      Cloakroom: false,
      Clothes_dryer: false,
      Concierge: false,
      Currency_Exchange_Facilities: false,
      Day_care_center: false,
      Dining_are: combinedData?.standoutaminations?.includes("outdoor_dining_area") ? true : false,
      Electric_Kettle: false,
      Electric_vehicle_charging_station: false,
      Fireplace: false,
      Grage: false,
      Garden: false,
      Golf_desk: false,
      Grill_BBQ: combinedData?.standoutaminations?.includes("bbq_grill") ? true : false,
      Gym: false,
      Hotel_safe: false,
      Hotels_own_bike_shop_workshop: false,
      Large_pets_allowed_over_5kg: false,
      Late_Check_Out: false,
      Launderette: false,
      Laundry_service: false,
      Library: false,
      Lift_access: false,
      Local_and_international_calls: false,
      Luggage_room: false,
      Medical_service: false,
      Mobile_phone_coverage: false,
      Multilingual_staff: false,
      Newspaper_stand: false,
      Newspapers: false,
      Oven: false,
      Partners_bike_shop_worksho: false,
      Private_beach_area: false,
      Private_Pool: false,
      Room_service: false,
      Secure_parking: false,
      Shop: false,
      Ski_storage: false,
      ski_to_door_access: false,
      Small_pets_allowed_under_5kg: false,
      smoke_detector: false,
      sun_terrace: false,
      Supermarket: false,
      Terrace: false,
      Toaster: false,
      Towels_and_bed_linen: false,
      Transfer_service: false,
      Vaiet_parking: false,
      Wheelchair_accessible: false,
      wi_fi: combinedData?.offeraminations?.includes("wifi") ? true : false,
      wired_internet: false,
      smoke_room: false,
      couple_policy:false,
      local_id_accepted : false,
      pay_at_hotel:false,
    }

    payment_Method = {
      Hotel_Id : currId,
      Hotel_name : combinedData?.propertyname, 
      Americal_Express : false,
      Diners_Club : false,
      EC : false,
      Euro_6ooo : false,
      EuroCard : false,
      JCB : false,
      Maestro : false,
      MasterCard : false,
      Visa : false,
      Visa_Electron : false,
    }

    point_Of_Interest = {
      Hotel_Id : currId,
      Hotel_name: combinedData?.propertyname,
      City_centre : "0",
      Entertainment_Area : "0",
      Golf_course : "0",
      Bus_Train_station : "0",
      Ski_slopes : "0",
      Nearest_Bus_Metro_Stop : "0",
      Beach : "0",
      Harbour : "0",
      Airport : "0",
    }

    console.log(currId, combinedData.propertyname)

    console.log("Data Pay: ",JSON.stringify({payload, payload_facilities, payment_Method, point_Of_Interest}))

      const response = await fetch("/api/hotels/hotel_info", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({payload, payload_facilities, payment_Method, point_Of_Interest}),
      });
      const result = await response.json();
      console.log("Data:", result.data);
  } catch (error) {
      console.error("Error fetching data:", error);
  }
}

  return (
    <div>
      <h2>Here is all your Data</h2>
      <code>
        <pre>{JSON.stringify(combinedData, null, 2)}</pre>
      </code>
      <NavButtons />
      <Button onClick={(e) => initialFxn()}>Submit</Button>
        <DevTool control={control} />
    </div>
  );
}