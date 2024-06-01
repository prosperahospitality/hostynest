'use client'
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Tabs, Tab, Card, CardBody, CardHeader, Checkbox, Button, CheckboxGroup } from "@nextui-org/react";

const RoomSelectionTab = ({hotel_id, onSelectedChecks, area, amenity, areaId, checkboxSelect, selectedTabss, onSelected, resetFlag}) => {
    const [selected, setSelected] = useState("none");
    const [selectedCheckBoxes, setSelectedCheckBoxes] = useState([]);
    const [ result, setResult ] = useState([]);
    const [expanded, setExpanded] = useState(false);
    useEffect(() => {
        if(selectedTabss && selectedTabss[0] === "allrooms"){
            setSelected('allrooms')
        }else if(selectedTabss && selectedTabss[0] === "none" || selectedTabss === undefined){
            setSelected('none')
        }else{
            setSelected('somerooms')
            setSelectedCheckBoxes(selectedTabss)
        }
        initialFxn()
    }, [])

    useEffect(() => {
        //console.log("Selected Checks:::::::>",selectedCheckBoxes, area, amenity, areaId, checkboxSelect, selected)
        onSelectedChecks(selectedCheckBoxes, area, amenity, areaId, checkboxSelect, selected)
    }, [selectedCheckBoxes,selected])


  
    const initialFxn = async () => {
        try {
            const response = await fetch(`/api/pms/property_master/room_details?hotelId=${hotel_id.toString()}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
           // console.log("Data:", result);
            setResult(result.dataActive)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        if (resetFlag) {
           
            console.log("Resetting in RoomSelectionTab");
            setSelected('none')
            setSelectedCheckBoxes()

        }
    }, [resetFlag]);

    useEffect(() => {
        console.log("SELECTED: ",selected)
        
    }, [selected])

    const handleSelectionChange = (value) => {
        setSelected(value)
        setExpanded(true)
    }

    const handleOK = () => {
        //console.log("Checks: ",selectedCheckBoxes)
    }

  return (
    <div>
        <Tabs 
                                aria-label="Options" 
                                variant='bordered' 
                                color='primary' 
                                size='sm'
                                selectedKey={selected}
                                onSelectionChange={(value) => handleSelectionChange(value)}
                                
                            >
                                <Tab key="allrooms" title="All Rooms">
                                </Tab>
                                <Tab key="somerooms" title="Some Rooms">
                                {expanded ? (
                                    <Card className='bg-primary-500'>
                                    <CardBody className="overflow-auto max-h-40">
                                        <div className='flex flex-col text-sm text-foreground gap-2' >
                                        <h5 >Select where this amenity is available</h5>
                                        {selectedCheckBoxes && selectedCheckBoxes.length > 0 
                                            ? <Button style={{height: "27px",
                                            position: "relative",
                                                alignSelf: "self-end"}} onClick={(e) => {setExpanded(false);handleOK()}}>OK</Button> 
                                            : ""
                                        }
                                            <CheckboxGroup
                                                
                                                color="warning"
                                                value={selectedCheckBoxes}
                                                onValueChange={setSelectedCheckBoxes}
                                            >
                                                {[...new Set(result?.map(item => item.room_name))].map((roomName, index) => (
                                                    <Checkbox key={index} value={roomName}>{roomName}</Checkbox>
                                                ))}
                                            </CheckboxGroup>
                                        {/* <Checkbox>Double Bed Room</Checkbox>
                                        <Checkbox>Triple Bed Room</Checkbox> */}
                                        </div>
                                    </CardBody>
                                </Card> 
                                ) : ""}
                                 
                                </Tab>
                                <Tab key="none" title="None">
                                </Tab>
                            </Tabs>
    </div>
  )
}

export default RoomSelectionTab