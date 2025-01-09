"use client";
import PropertyTypes from "@/_components/layout/company/onboardingform/forms/propertytypes";
import PlaceTypes from "@/_components/layout/company/onboardingform/forms/placetypes";
import LocationInfo from "@/_components/layout/company/onboardingform/forms/locationinfo";
import Amenities from "@/_components/layout/company/onboardingform/forms/amenities";
import HouseRules from "@/_components/layout/company/onboardingform/forms/houserules";
import ConfirmForm from "@/_components/layout/company/onboardingform/forms/confirmform";
import { useSelector } from "react-redux";

export default function StepForm() {
  const currentStep = useSelector((store) => store.onboardingform.currentStep);
  console.log(currentStep);
  function renderFormByStep(step) {
    if (step === 1) {
      return <PropertyTypes />;
    } else if (step === 2) {
      return <PlaceTypes />;
    } else if (step === 3) {
      return <LocationInfo />;
    } else if (step === 4) {
      return <Amenities />;
    } else if (step === 5) {
      return <HouseRules />;
    } else {
      return <ConfirmForm />;
    }
  }
  return <>{renderFormByStep(currentStep)}</>;
}