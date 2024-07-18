import React, { useState, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete
} from "@react-google-maps/api";
// import "./index.css";

const LIBRARIES = ["places"];

const ReactGoogleMapComponent = () => {
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
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={LIBRARIES}
    >

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
    </LoadScript>
  );
};

export default ReactGoogleMapComponent;