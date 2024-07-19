import React, { useState, useRef, useEffect } from "react";
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import {
  Marker,
  Autocomplete
} from "@react-google-maps/api";
import "./Map.css";

const LIBRARIES = ["places"];

const ReactGoogleMapComponent = () => { 
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey:import.meta.env.VITE_GOOGLE_MAPS_API_KEY ,
    libraries:LIBRARIES
  })


 const [markers, setMarkers] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat: 37.7749, lng: -122.4194 });
     const autocompleteRef = useRef(null);

   const handleMapClick = (event) => {
     setMarkers([
      ...markers,
       { lat: event.latLng.lat(), lng: event.latLng.lng() },
     ]);
};

  const onAutocompleteLoad = (autocomplete) => {
autocompleteRef.current = autocomplete
}

   const onPlaceChanged = () => {
     if (autocompleteRef.current !== null) {
       const place = autocompleteRef.current.getPlace();
const location = place.geometry.location;
      setMapCenter({ lat: location.lat(), lng: location.lng() });
setMarkers([...markers, { lat: location.lat(), lng: location.lng() }]);
}
}

  return (
    isLoaded && 
    <div>
     <Autocomplete
        onLoad={onAutocompleteLoad}
        onPlaceChanged={onPlaceChanged}
      >
        <input
          type="text"
          placeholder="Search a location"
          id="place-input"
        />
      </Autocomplete> 

        <GoogleMap
          mapContainerClassName="google-map"
          center={mapCenter}
          zoom={12}
           onClick={handleMapClick}
        >

           {markers.map((marker, index) => (
            <Marker
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
            />
          ))} 

        </GoogleMap>
        </div>

  );
};

export default ReactGoogleMapComponent;