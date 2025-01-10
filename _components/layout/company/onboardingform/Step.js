"use client";
import React from "react";
import { useSelector } from "react-redux";

export default function Step({ step }) {
  const { number, title } = step;
  const currentStep = useSelector((store) => store.onboardingform.currentStep);
  console.log("step",currentStep);
  return (
    <div className="flex items-center gap-2">
      <div
        className={`size-8 text-black border border-black rounded-full flex flex-col items-center justify-center  ${
          number === currentStep ? "ring-sky-500 ring-inset ring-8 border-0" : ""
        }`}
      >
      </div>
      <div className="flex-col flex items-center justify-center">
        <h3 className="text-base text-black">
          {title}
        </h3>
      </div>
    </div>
  );
}