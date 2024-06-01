import React, { useEffect, useState, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useSelector } from "react-redux";
import {useDispatch} from "react-redux";
import { pinnedLocation } from "@/app/redux/slices/searchSlice";
import { pinnedCoordinates} from "@/app/redux/slices/searchSlice";

const MapWithMarker = ({previousMapMarker}) => {

  const [address, setAddress] = useState('');
  const [currentLatLon, setCurrentLatLon] = useState([0, 0]);
  const searchData = useSelector((data) => data.search.selectedPosition);  
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const dispatch = useDispatch();
  const icons = L.icon({
    iconUrl: "./../img/placeholder.png",
    iconSize: [38, 38]
  });

  let lat = parseFloat(searchData?.lat);
  let lon = parseFloat(searchData?.lon);

  useEffect(() => {

    if (typeof window !== 'undefined') {
      const map = mapRef.current;

      if (!isNaN(lat) && !isNaN(lon) && map) {
  
        const newLatLng = L.latLng(lat, lon);
  
        setCurrentLatLon([lat, lon]);
  
        map.setView(newLatLng, map.getZoom(), { animate: true });
        
        if (markerRef.current) {
  
          map.removeLayer(markerRef.current);
  
        }
  
        const marker = L.marker(newLatLng, {
  
          icon: icons,
  
          draggable: true
  
        });
  
        marker.bindPopup("This is Live").openPopup();
  
        marker.addTo(map);
  
  
        markerRef.current = marker;
  
        fetchAddress(lat, lon);
      }
  
    }else{
      console.log("Error")
    }


  }, [searchData]);

  const fetchAddress = async (latitude, longitude) => {
    if (typeof window !== 'undefined') {
      try {

        const response = await fetch(
  
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
  
        );
  
        if (response.ok) {
  
          const data = await response.json();
  
          setAddress(data.display_name);
  
        } else {
  
          console.error('Failed to fetch address:', response.statusText);
  
        }
      } catch (error) {
  
        console.error('Error fetching address:', error);
  
      }
    }else{
      console.log("Errr")
    }



  };

  useEffect(() => {

    dispatch(pinnedLocation(address));

  }, [address]);

  useEffect(() => {

    console.log("Current Lat Lon: ",currentLatLon);
    dispatch(pinnedCoordinates(currentLatLon));

  }, [currentLatLon]);

  useEffect(() => {

    if (typeof window !== 'undefined') {
      navigator.geolocation.getCurrentPosition(position => {

        const { latitude, longitude } = position.coords;

        console.log("latitude, longitude: ",latitude, longitude)
  
        let userLoc = previousMapMarker || [0, 0];
  
        if(previousMapMarker) {
          console.log("Inside If: ",previousMapMarker[0], previousMapMarker[1])
          if(previousMapMarker[0] === undefined && previousMapMarker[1] === undefined){
            userLoc = [latitude,longitude]
          }
          userLoc = [previousMapMarker[0], previousMapMarker[1]]
        }else{
          console.log("Inside Else: ",[latitude, longitude])
          userLoc = [latitude, longitude];
        }
  
        setCurrentLatLon(userLoc);
  
        if (!mapRef.current) {
          if(userLoc[0] === undefined && userLoc[1] === undefined){
            userLoc = [latitude,longitude]
          }
          const map = L.map("map").setView(userLoc, 10);
    
          const layer = new L.TileLayer(
            "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          );
    
          map.addLayer(layer);
          mapRef.current = map;
  
  
          if (markerRef.current) {
  
            map.removeLayer(markerRef.current);
    
          }
    
          if (mapRef.current) {
    
            const marker = L.marker(userLoc, {
    
              icon: icons,
    
              draggable: true
    
            });
    
            marker.on('dragend', function(event){
    
              var markerLatLng = event.target.getLatLng();
  
              setCurrentLatLon([markerLatLng.lat, markerLatLng.lng]);
    
              fetchAddress(markerLatLng.lat, markerLatLng.lng);
    
            });
    
            marker.bindPopup("This is Live").openPopup();
    
            marker.addTo(mapRef.current);
    
            markerRef.current = marker;
    
          }
          map.on("click", event => {
    
            if (markerRef.current) {
      
              map.removeLayer(markerRef.current);
      
            }
      
            if (mapRef.current) {
  
              setCurrentLatLon([event.latlng.lat, event.latlng.lng]);
      
              const marker = L.marker([event.latlng.lat, event.latlng.lng], {
      
                icon: icons,
      
                draggable: true
      
              });
      
              marker.on('dragend', function(event){
      
                var markerLatLng = event.target.getLatLng();
  
                setCurrentLatLon([markerLatLng.lat, markerLatLng.lng]);
      
                fetchAddress(markerLatLng.lat, markerLatLng.lng);
      
              });
      
              marker.bindPopup("This is Live").openPopup();
      
              marker.addTo(mapRef.current);
      
              markerRef.current = marker;
             
            }
      
            fetchAddress(event.latlng.lat, event.latlng.lng)
          })
    
          return () => {
    
            map.remove();
      
          };
        }else{
          console.log("Error")
        }
  
  
  
       
      });
    }









  }, []);

  return (
    <>
      <div id="map" style={{ height: "400px" }}></div>
    </>
  );
};

export default MapWithMarker;
