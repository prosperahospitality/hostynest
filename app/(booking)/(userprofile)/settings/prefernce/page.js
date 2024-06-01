'use client'
import React, {useState} from 'react'
import { Divider, Autocomplete, AutocompleteItem } from '@nextui-org/react'

const currencys = [
  { label: "INR", value: "inr" },
  { label: "USD", value: "usd" },
]

const languages = [
  { label: "ENG", value: "eng" },
  { label: "FR", value: "fr" },
]

const Preferncepage = () => {
  const [currency, setCurrency] = useState("inr");
  const [language, setLanguage] = useState("eng");

  return (
    <div>
      <h1 className='text-4xl text-gray-500 font-semibold'>Prefernce</h1>
      <h5 className='text-sm text-gray-500'>Change your Language & Currency</h5>
      <Divider className='w-full mt-4' />
      <div className='flex justify-between mt-2 items-center'>
        <h3 className='text-base text-gray-500'>Currency</h3>
        <Autocomplete
          label="Select Currency"
          className="max-w-xs"
          size='sm'
          radius='md'
          variant='bordered'
          selectedKey={currency}
          onSelectionChange={(value) => setCurrency(value)}
        >
          {currencys.map((currency, index) => (
            <AutocompleteItem key={index} value={currency.value}>
              {currency.label}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      </div>
      <Divider className='w-full mt-4' />
      <div className='flex justify-between mt-2 items-center'>
        <h3 className='text-base text-gray-500'>Language</h3>
        <Autocomplete
          label="Select Language"
          className="max-w-xs"
          size='sm'
          radius='md'
          variant='bordered'
          selectedKey={language}
          onSelectionChange={(value) => setLanguage(value)}
        >
          {languages.map((language, index) => (
            <AutocompleteItem key={index} value={language.value}>
              {language.label}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      </div>
      <Divider className='w-full mt-4' />
    </div>
  )
}

export default Preferncepage;
