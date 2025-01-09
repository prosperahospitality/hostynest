import React from "react";
import Step from "./Step";

export default function Steps({ steps }) {
  return (
    <div className="flex flex-col justify-between mt-10 ml-8 gap-6">
      {steps.map((step, i) => {
        return <Step key={i} step={step} />;
      })}
    </div>
  );
}