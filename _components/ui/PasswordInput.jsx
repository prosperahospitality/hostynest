'use client' 
import React from "react";
import {Input} from "@nextui-org/react";
import {EyeFilledIcon} from "@/_components/propertyicons";
import {EyeSlashFilledIcon} from "@/_components/propertyicons";

export default function PasswordInput({label, placeholder}) {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      label={label}
      variant="bordered"
      placeholder={placeholder}
      endContent={
        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
          {isVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
      className="inline-flex w-full"
    />
  );
}