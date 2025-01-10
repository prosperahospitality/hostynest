import React, { useState } from 'react';
import Select from 'react-select';

export default function CitySelector() {
  const [selectedCity, setSelectedCity] = useState(null);
  console.log(selectedCity);

  const cities = [
    { label: 'Mumbai', value: 'Top Cities', group: 'Top Cities' },
    { label: 'Delhi', value: 'Top Cities', group: 'Top Cities' },
    { label: 'Kolkata', value: 'Top Cities', group: 'Top Cities' },
    { label: 'Bangalore', value: 'Top Cities', group: 'Top Cities' },
    { label: 'Hyderabad', value: 'Other Cities', group: 'Top Cities' },
    { label: 'Chennai', value: 'chennai', group: 'Top Cities' },
    { label: 'Noida', value: 'noida', group: 'Top Cities' },
    { label: 'Gurgaon', value: 'gurgaon', group: 'Top Cities' },
    { label: 'Pune', value: 'pune', group: 'Top Cities' },
    // Other cities...
    { label: 'Other City 1', value: 'Other Cities', group: 'Other Cities' },
    { label: 'Other City 2', value: 'other2', group: 'Other Cities' },
    // Other cities...
  ];

  const groupedOptions = cities.reduce((acc, city) => {
    acc[city.group] = acc[city.group] || [];
    acc[city.group].push(city);
    return acc;
  }, {});

  const groupedCityOptions = Object.keys(groupedOptions).map((group) => ({
    label: group,
    options: groupedOptions[group],
  }));

  const getOptionLabel = (option) => {
    if (option.group) {
      return option.label; // Return city label for groups
    }
    return option.label; // Return city label for individual cities
  };

  const handleChange = (selectedOption) => {
    setSelectedCity(selectedOption);
  };

  return (
    <div style={{ width: '300px' }}>
      <Select
        options={groupedCityOptions}
        value={selectedCity}
        onChange={handleChange}
        isSearchable
        getOptionLabel={getOptionLabel}
        placeholder="Select a city"
      />
    </div>
  );
}
