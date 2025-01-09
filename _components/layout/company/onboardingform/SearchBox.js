import React, { useState, useEffect } from "react";
import { Input, Button, Listbox, ListboxItem, Divider } from "@nextui-org/react";
import { handleSetSelectPosition } from "@/app/redux/slices/searchSlice";
import {useDispatch} from "react-redux";
import { useSelector } from "react-redux";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
const params = {
  q: "",
  format: "json",
  addressdetails: "addressdetails",
};

export default function SearchBox({previousSearchBox}) {

  const [ selectPosition, setSelectPosition ] = useState("");
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);
  const dispatch = useDispatch();
  const pinnedLoc = useSelector((data) => data.search.pinnedLoc);  

  const searchDispatch = (item) => {
  
    dispatch(handleSetSelectPosition(item));

  }

  useEffect(() => {

    console.log("Search Text: ",searchText);

  }, [searchText])

  useEffect(() => {

    console.log("previousSearchBox Text: ",previousSearchBox);
    

  }, [])


    useEffect(() => {

      setSearchText(pinnedLoc);
    
    }, [pinnedLoc])


  useEffect(() => {

    console.log("List Place: ",listPlace);

  }, [listPlace])



  useEffect(() => {

    console.log("Selected Position: ",selectPosition);

  }, [selectPosition])
  

  return (

    <div style={{ display: "flex", flexDirection: "column" }}>

      <div style={{ display: "flex" }}>

        <div style={{ flex: 1 }}>

          <Input
            style={{ width: "100%" }}
            value={searchText ? searchText : previousSearchBox}
            placeholder="Enter search text"
            onChange={(event) => {

              setSearchText(event.target.value);

              const params = {

                q: event.target.value,
                format: "json",
                addressdetails: 1,
                polygon_geojson: 0,
                countrycodes: "in",

              };
              const queryString = new URLSearchParams(params).toString();
              const requestOptions = {

                method: "GET",
                redirect: "follow",

              };

              fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
                .then((response) => response.text())
                .then((result) => {
                  console.log(JSON.parse(result));
                  setListPlace(JSON.parse(result));
                })
                .catch((err) => console.log("err: ", err));

            }}

          />
        </div>

        <div
          style={{ display: "flex", alignItems: "center", padding: "0px 20px" }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => {

              searchDispatch(selectPosition);

            }}
          >
            Search
          </Button>
        </div>
      </div>

      <div>
        <Listbox component="nav" aria-label="main mailbox folders">
          {listPlace?.map((item,index) => {
            return (
              <ListboxItem
                button
                key={index}
                onClick={() => {

                  setSelectPosition(item)
                  setSearchText(item?.display_name)

                }}
              >
                <p>
                  <img
                  src="./../img/placeholder.png"
                  alt="Placeholder"
                  style={{ width: 30, height: 30 }}
                  />
                  {item?.display_name}
                </p> 
              </ListboxItem>
            );
          })}
        </Listbox>
      </div>
      
    </div>
  );
}