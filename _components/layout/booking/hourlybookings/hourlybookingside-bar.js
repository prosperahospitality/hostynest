'use client'
import React, { useState } from 'react'
import { Search, Wifi, AirVent, Tv, Milk, ChevronsLeft } from 'lucide-react'
import { Breadcrumbs, BreadcrumbItem, Input, Checkbox, Tabs, Tab, Card, CardBody, CardHeader, Slider, RadioGroup, Radio, Button, Autocomplete, AutocompleteItem, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { button as buttonStyles } from "@nextui-org/theme";
import Link from 'next/link';


export default function HourlyBookingSideBar({ searchCity, onSelectCheck, onRatingsCheck, onPriceCheck, onCategoryCheck, onFacilityCheck, onHourChange, onPriceChange }) {
    const [disabledButton, setDisabledButton] = useState(null);
    const [selectedColor, setSelectedColor] = React.useState("default");
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));


    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", "),
        [selectedKeys]
    );


    var [areafilter, setAreaFilter] = React.useState([]);
    var [prevLoc, setPrevLoc] = React.useState('');
    const [selectedCheckboxes, setSelectedCheckboxes] = React.useState({});
    const [cityCheckReset, setCityCheckReset] = React.useState(false);
    const [checkboxRatingsValues, setCheckboxRatingsValues] = React.useState({
        popularity: false,
        ratings4_5Above: false,
        ratings4Above: false,
        ratings3Above: false,
        ratings2Above: false
    });
    const [categoryState, setCategoryState] = React.useState({
        premium: false,
        luxury: false
    });
    const [sortBy, setSortBy] = React.useState('');
    const [facilityState, setFacilityState] = React.useState({
        coupleFriendly: false,
        payAtHotel: false,
        localIdAccepted: false,
    });
    const [priceRange, setPriceRange] = useState([100, 5000]);
    //////////////////////////City Checkboxes////////////////////////////   


    async function search_hotels(curr_val) {

        const results = await fetch("/api/search_cities", {
            method: "POST",
            body: JSON.stringify({ curr_val })
        })
            .then(response => response.json())
            .then(async data => {

                if (data.final_res[0].location === searchCity || data.final_res[0].location === curr_val) {
                    setAreaFilter(data.final_res);
                } else {
                    setPrevLoc(data.final_res[0].location);

                    if (Object.keys(selectedCheckboxes).length === 0 && areafilter.length > 0) {
                        const defaultCity = searchCity; // Choose the first city as default
                        console.log("defaultCity:::::>", defaultCity);
                        setSelectedCheckboxes(prevState => ({
                            ...prevState,
                            [defaultCity]: true
                        }));
                    }
                }

            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });

    }

    React.useEffect(() => {
        search_hotels(searchCity)

        if (prevLoc === "") {
            console.log("IF:::::>", prevLoc);
        } else {
            search_hotels(prevLoc)
        }
    }, [prevLoc]);

    //   React.useEffect(() => {
    //     search_hotels(searchCity)
    //     console.log("sEasdfsadf:::::>",searchCity);
    //   }, [searchCity]);

    //   React.useEffect(() => {

    //     search_hotels(searchCity)

    // }, [areafilter]);

    const handleCheckboxChange = (city) => {
        console.log("Inside Change");
        setSelectedCheckboxes({
            ...selectedCheckboxes,
            [city]: !selectedCheckboxes[city]
        });
    }


    React.useEffect(() => {
        console.log("Selected Checkboxes:::::>", selectedCheckboxes);
        onSelectCheck(selectedCheckboxes);
    }, [selectedCheckboxes]);

    //////////////Ratings Checkboxes//////////////////////////
    const handleCheckboxRatingsChange = (event) => {
        const { name, checked } = event.target;
        setCheckboxRatingsValues(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    const handleReset = () => {
        setCheckboxRatingsValues({
            popularity: false,
            ratings4_5Above: false,
            ratings4Above: false,
            ratings3Above: false,
            ratings2Above: false
        });
    };

    React.useEffect(() => {
        onRatingsCheck(checkboxRatingsValues);
    }, [checkboxRatingsValues]);

    const handleCityReset = () => {

        setSelectedCheckboxes({});
        setCityCheckReset(true);

    };


    //////////////Low to High, High to Low Sort////////////////////////

    const handleSortCheckboxChange = (event) => {
        setSortBy(event.target.value);
        onPriceCheck(event.target.value)
    };

    //   React.useEffect(() => {
    //     console.log("Price::::::>",sortBy);
    //   }, [sortBy]);

    //////////////////////////Hotel Category Checkboxes//////////////////////////// 
    const handleCheckboxCategoryChange = (checkbox) => {
        setCategoryState(prevState => ({
            ...prevState,
            [checkbox]: !prevState[checkbox]
        }));


    };

    React.useEffect(() => {
        onCategoryCheck(categoryState)
    }, [categoryState]);

    //////////////////////////Hotel Facility Checkboxes////////////////////////////
    const handleFacilityChange = (event) => {
        const { name, checked } = event.target;
        setFacilityState(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };
    React.useEffect(() => {
        console.log("Facility Change::::::::::>", facilityState);
        onFacilityCheck(facilityState)
    }, [facilityState]);

    /////////////////////Hour Change///////////////////////////////// 

    function handleHourChange(hour) {
        if (hour === 'reset') {
            setDisabledButton(null);
            onHourChange(0);
            
            
        } else {
            setDisabledButton(hour);

            if (hour === 3) {
                onHourChange(3)
            }

            if (hour === 6) {
                onHourChange(6)
            }

            if (hour === 12) {
                onHourChange(12)
            }

        }
    }

    const handleClearAll = () => {
        handleCityReset();
        handleHourChange('reset');
        setFacilityState({
            coupleFriendly: false,
            payAtHotel: false,
            localIdAccepted: false,
        });
        setCheckboxRatingsValues({popularity: false,
            ratings4_5Above: false,
            ratings4Above: false,
            ratings3Above: false,
            ratings2Above: false
        });
        setCategoryState({
                premium: false,
                luxury: false
        });
    }

    const handlePriceRangeChange = (newPriceRange) => {
        setPriceRange(newPriceRange);
      };

      
      React.useEffect(() => {
        console.log("Price Change::::::::::>", priceRange);
        onPriceChange(priceRange)
    }, [priceRange]);

    return (
        <aside className="flex overflow-y-scroll h-[210vh] w-[95%] flex-col mx-auto">
            <div>
            <Link href="/" className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })} ><ChevronsLeft />Back Home</Link>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className="flex px-12 space-x-12 ">
                    <div className="w-80">
                        <div className="sticky-outer-wrapper w-72">
                            <div className="sticky-inner-wrapper">
                                <div className="flex pt-4 w-72 justify-between">
                                    <p className="text-black text-lg">Select Filters</p>
                                    <Button
                                    color='primary'
                                    size='md'
                                    radius='full'
                                    variant='light'
                                    onClick={handleClearAll}
                                    >
                                        Clear All
                                    </Button>
                                </div>
                                <div
                                    className="bg-primary/50 mt-3 pb-4 w-72 h-fit rounded-3xl shadow-xl">
                                    <span className="flex px-4 pt-3 items-center justify-between">
                                        <p className="text-white text-lg">Area Filter</p>
                                        <Button
                                        color=''
                                        size='sm'
                                        radius='full'
                                        variant='light'
                                        onClick={handleCityReset}
                                        className='text-black'
                                        >
                                            Reset
                                        </Button>
                                    </span>
                                    <div className="flex flex-col gap-3 h-44 overflow-y-scroll">
                                        <Table
                                            removeWrapper
                                            color="primary"
                                            selectionMode="single"
                                            aria-labelledby="cities-table-label"
                                        >
                                            <TableHeader>
                                                <TableColumn className='bg-primary shadow-2xl' ><Checkbox checked={selectedCheckboxes["Select All"]} onChange={() => alert("Select All")}>Select All</Checkbox></TableColumn>
                                            </TableHeader>
                                            <TableBody>
                                                {areafilter.map((area, index) => (
                                                    index != 0 ?
                                                        <TableRow key={area.city}>
                                                            <TableCell><Checkbox
                                                                // checked={Object.keys(selectedCheckboxes).length !== 0 ? selectedCheckboxes && selectedCheckboxes[area.city] : ""}
                                                                isSelected = {selectedCheckboxes && selectedCheckboxes[area.city] ? true : false}
                                                                onChange={() => handleCheckboxChange(area.city)}
                                                                defaultSelected={!cityCheckReset ?
                                                                    area.city === searchCity ? (search_hotels(searchCity), area.city === searchCity) : "" : ""
                                                                }
                                                                >
                                                                {area.city}
                                                                </Checkbox></TableCell>
                                                        </TableRow> : ""
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                                <div className="bg-primary/50 w-72 h-fit mt-6 px-1 pb-3 rounded-3xl shadow-xl">
                                    <span className="flex items-center justify-between pt-3 px-4">
                                        <p className="text-lg text-foreground font-poppinsmedium">Your Budget</p>
                                        <Button
                                            onClick={() => handleHourChange('reset')}
                                            disabled={disabledButton === null}
                                            color=''
                                        size='sm'
                                        radius='full'
                                        variant='light'
                                        className='text-black'
                                        >
                                            Reset
                                        </Button>
                                    </span>
                                    <div className="flex mt-5 items-center justify-between px-1 space-x-4 ">
                                        <Button
                                            onClick={() => handleHourChange(3)}
                                            isDisabled={disabledButton === 3}
                                            className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
                                        >
                                            3 Hours
                                        </Button>
                                        <Button
                                            onClick={() => handleHourChange(6)}
                                            isDisabled={disabledButton === 6}
                                            className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
                                        >
                                            6 Hours
                                        </Button>
                                        <Button
                                            onClick={() => handleHourChange(12)}
                                            isDisabled={disabledButton === 12}
                                            className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
                                        >
                                            12 Hours
                                        </Button>
                                    </div>
                                    <div className="mt-6 text-sm font-poppins text-foreground px-3">
                                        <Slider
                                            label="Price Range"
                                            step={100}
                                            maxValue={10000}
                                            minValue={100}
                                            defaultValue={[100, 5000]}
                                            size='sm'
                                            showTooltip={true}
                                            showOutline={true}
                                            disableThumbScale={true}
                                            formatOptions={{ style: "currency", currency: "IND" }}
                                            tooltipValueFormatOptions={{ style: "currency", currency: "IND", maximumFractionDigits: 0 }}
                                            classNames={{
                                                base: "max-w-md",
                                                filler: "bg-white",
                                                labelWrapper: "mb-2",
                                                label: "font-medium text-white text-medium",
                                                value: "font-medium text-white text-small",
                                                thumb: [
                                                    "transition-size",
                                                    "bg-white",
                                                    "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
                                                    "data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6"
                                                ],
                                                step: "data-[in-range=true]:bg-black/30 dark:data-[in-range=true]:bg-white/50"
                                            }}
                                            tooltipProps={{
                                                offset: 10,
                                                placement: "bottom",
                                                classNames: {
                                                    base: [
                                                        // arrow color
                                                        "before:bg-gradient-to-r before:from-primary-500 before:to-primary-500",
                                                    ],
                                                    content: [
                                                        "py-2 shadow-xl",
                                                        "text-white bg-gradient-to-r from-primary-500 to-primary-500",
                                                    ],
                                                },
                                            }}
                                            onChange={handlePriceRangeChange}
                                        />
                                    </div>
                                    <div className="mt-6 text-sm font-poppins text-foreground px-3">
                                        <span className="text-sm">Sort By Price</span>
                                        <div className="mt-4 flex items-center justify-between">
                                            <RadioGroup
                                                orientation="horizontal"
                                            >
                                                <Radio value="lowToHigh" isSelected={sortBy === 'lowToHigh' ? true : false} onChange={handleSortCheckboxChange}>Low to High</Radio>
                                                <Radio value="highToLow" isSelected={sortBy === 'highToLow' ? true : false} onChange={handleSortCheckboxChange}>High to Low</Radio>
                                            </RadioGroup>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-primary/50 mt-3 pb-4 w-72 h-fit rounded-3xl shadow-xl">
                                    <span className="flex items-center justify-between pt-3 px-4">
                                        <p className="text-white  text-lg">Categories</p>
                                        <Button
                                            color=''
                                        size='sm'
                                        radius='full'
                                        variant='light'
                                        className='text-black'
                                            onClick={(e) => {setFacilityState({
                                                coupleFriendly: false,
                                                payAtHotel: false,
                                                localIdAccepted: false,
                                            })}}
                                        >
                                            Reset
                                        </Button>
                                    </span>
                                    <div className=" mt-3 text-[1.125rem] font-poppins text-black space-y-5 px-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-6">
                                                <Checkbox
                                                    name="coupleFriendly"
                                                    isSelected={facilityState.coupleFriendly ? true : false}
                                                    onChange={handleFacilityChange}>Couple Friendly
                                                </Checkbox>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-6">
                                                <Checkbox
                                                    name="payAtHotel"
                                                    isSelected={facilityState.payAtHotel ? true : false}
                                                    onChange={handleFacilityChange}>Pay At Hotel
                                                </Checkbox>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-6">
                                                <Checkbox
                                                    name="localIdAccepted"
                                                    isSelected={facilityState.localIdAccepted ? true : false}
                                                    onChange={handleFacilityChange}>Local ID Accepted
                                                </Checkbox>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-primary/50 mt-3 pb-4 w-72 h-fit rounded-3xl shadow-xl">
                                    <span className="flex pt-3 px-4 items-center justify-between">
                                        <p className="text-lg font-poppinsmedium text-foreground">Sort By</p>
                                        <Button
                                            color=''
                                        size='sm'
                                        radius='full'
                                        variant='light'
                                        className='text-black'
                                            onClick={(e) => {
                                                setCheckboxRatingsValues({popularity: false,
                                                    ratings4_5Above: false,
                                                    ratings4Above: false,
                                                    ratings3Above: false,
                                                    ratings2Above: false})
                                            }}
                                        >
                                            Reset
                                        </Button>
                                    </span>
                                    <div className=" mt-4 font-poppins text-black space-y-5 px-4">
                                        <div className="flex items-center space-x-5">
                                            <Checkbox name="popularity" isSelected={checkboxRatingsValues.popularity ? true : false} onChange={handleCheckboxRatingsChange}>Popularity</Checkbox>
                                        </div>
                                        <div className="flex items-center space-x-5">
                                            <Checkbox name="ratings4_5Above" isSelected={checkboxRatingsValues.ratings4_5Above ? true : false} onChange={handleCheckboxRatingsChange}>Ratings 4.5 and Above</Checkbox>
                                        </div>
                                        <div className="flex items-center space-x-5">
                                            <Checkbox name="ratings4Above" isSelected={checkboxRatingsValues.ratings4Above ? true : false} onChange={handleCheckboxRatingsChange}>Ratings 4 and Above</Checkbox>
                                        </div>
                                        <div className="flex items-center space-x-5">
                                            <Checkbox name="ratings3Above" isSelected={checkboxRatingsValues.ratings3Above ? true : false} onChange={handleCheckboxRatingsChange}>Ratings 3 and Above</Checkbox>
                                        </div>
                                        <div className="flex items-center space-x-5">
                                            <Checkbox name="ratings2Above" isSelected={checkboxRatingsValues.ratings2Above ? true : false} onChange={handleCheckboxRatingsChange}>Ratings 2 and Above</Checkbox>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-primary/50 mt-3 pb-4 w-72 h-fit rounded-3xl shadow-xl">
                                    <span className="flex items-center justify-between pt-3 px-4">
                                        <p className="text-lg font-poppinsmedium text-foreground">Hotel Type</p>
                                        <Button
                                            color=''
                                        size='sm'
                                        radius='full'
                                        variant='light'
                                        className='text-black'
                                            onClick={(e) => setCategoryState({
                                                premium: false,
                                                luxury: false
                                            })}
                                        >
                                            Reset
                                        </Button>
                                    </span>
                                    <div className="mt-4 font-poppins px-4">
                                        <div className="flex items-center">
                                            <Checkbox id="premiumCheckbox"
                                                isSelected={categoryState.premium ? true : false}
                                                onChange={() => handleCheckboxCategoryChange('premium')}>Premium
                                            </Checkbox>
                                        </div>
                                        <p className="px-8 text-sm font-poppins text-white/80">
                                            Hotels with superior facilities and prime location, created for your comfort
                                        </p>
                                        <div className="flex items-center">
                                            <Checkbox id="luxuryCheckbox"
                                                isSelected={categoryState.luxury ? true : false}
                                                onChange={() => handleCheckboxCategoryChange('luxury')}>Luxury
                                            </Checkbox>
                                        </div>
                                        <p className="px-8 text-sm font-poppins text-white/80">
                                            Impeccable accomodation and elegant experience in renowned hotel brands.
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-6 pb-4 w-80 h-fit">
                                    <ul className="px-4 text-sm font-poppins text-primary/80 justify-normal space-y-2 ">
                                        <li>
                                            Prices Shown are inclusive of GST, For Detailed invoice contact the hotel reception once the booking
                                            is confirmed.
                                        </li>
                                        <li>
                                            We provide flexible check in/check out.
                                        </li>
                                        <li>
                                            Following are the list of standard amenities we provide to each of our guests after booking
                                        </li>
                                    </ul>
                                    <div className="flex items-center space-x-16 mt-3">
                                        <Wifi className="text-primary/80" />
                                        <AirVent className="text-primary/80" />
                                        <Tv className="text-primary/80" />
                                        <Milk className="text-primary/80" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}
