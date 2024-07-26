// import React, { useState, useRef, useEffect } from "react";
// import { GoogleMap, useLoadScript } from '@react-google-maps/api';
// import {
//   Marker,
//   Autocomplete
// } from "@react-google-maps/api";
// import "./Map.css";

// const LIBRARIES = ["places"];

// const ReactGoogleMapComponent = () => { 
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey:import.meta.env.VITE_GOOGLE_MAPS_API_KEY ,
//     libraries:LIBRARIES
//   })


//  const [markers, setMarkers] = useState([]);
// //  setMarkers([{lat: 37.7749, lng: -122.4194}])

// useEffect(()=> {
//   // console.log("here")
//   setMarkers([{lat: 37.7749, lng: -122.4194}])
// }, [])


//   const [mapCenter, setMapCenter] = useState({lat: 37.7749, lng: -122.4194 });
//      const autocompleteRef = useRef(null);

//    const handleMapClick = (event) => {
//      setMarkers([
//       ...markers,
//        { lat: event.latLng.lat(), lng: event.latLng.lng() },
//      ]);
// };

//   const onAutocompleteLoad = (autocomplete) => {
// autocompleteRef.current = autocomplete
// }

//    const onPlaceChanged = () => {
//      if (autocompleteRef.current !== null) {
//        const place = autocompleteRef.current.getPlace();
// const location = place.geometry.location;
//       setMapCenter({ lat: location.lat(), lng: location.lng() });
// setMarkers([...markers, { lat: location.lat(), lng: location.lng() }]);
// }
// }

//   return (
//     isLoaded && 
//     <div>
//      <Autocomplete
//         onLoad={onAutocompleteLoad}
//         onPlaceChanged={onPlaceChanged}
//       >
//         <input
//           type="text"
//           placeholder="Search a location"
//           id="place-input"
//         />
//       </Autocomplete> 

//         <GoogleMap
//           mapContainerClassName="google-map"
//           center={mapCenter}
//           zoom={12}
//            onClick={handleMapClick}
//         >

//            {markers.map((marker, index) => (
//             <Marker
//               key={index}
//               position={{ lat: marker.lat, lng: marker.lng }}
//             />
//           ))} 

//         </GoogleMap>
//         </div>

//   );
// };

// export default ReactGoogleMapComponent;


import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, useLoadScript, Marker, Autocomplete, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';
import "./Map.css";

const LIBRARIES = ["places"];
const API_URL = 'http://localhost:3000/opps/locations';

const ReactGoogleMapComponent = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
  });

  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const mapRef = useRef(null);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(API_URL);
        const addresses = response.data;

        console.log('Fetched addresses:', addresses);

        const newMarkers = await Promise.all(addresses.map(async (address) => {
          if (!address.address) {
            console.error('Skipping empty address:', address);
            return null;
          }

          try {
            const coords = await geocodeAddress(address.address);
            return { ...coords, ...address };
          } catch (error) {
            console.error(`Error geocoding address: ${address.address}`, error);
            return null;
          }
        }));

        setMarkers(newMarkers.filter(marker => marker !== null));
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    if (isLoaded) {
      fetchAddresses();
    }
  }, [isLoaded]);

  const geocodeAddress = async (address) => {
    const geocoder = new window.google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      console.log('Geocoding address:', address);
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK") {
          resolve({
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          });
        } else {
          reject(`Geocode was not successful for the following reason: ${status}`);
        }
      });
    });
  };

  const onAutocompleteLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry && place.geometry.location) {
        const newLocation = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        
        // Center the map on the new location and zoom in
        mapRef.current.panTo(newLocation);
        mapRef.current.setZoom(14);
      }
    }
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div>
      <Autocomplete onLoad={onAutocompleteLoad} onPlaceChanged={onPlaceChanged}>
        <input
          type="text"
          placeholder="Search a location"
          id="place-input"
        />
      </Autocomplete>

      <GoogleMap
        mapContainerClassName="google-map"
        center={{ lat: 37.7749, lng: -122.4194 }}
        zoom={12}
        onLoad={(map) => {
          mapRef.current = map;
        }}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => handleMarkerClick(marker)}
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={handleInfoWindowClose}
          >
            <div>
              <h3>{selectedMarker.title}</h3>
              <p>{selectedMarker.address}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default ReactGoogleMapComponent;
