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


import React, { useEffect, useRef } from "react";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import "./Map.css";

const LIBRARIES = ["places"];



const ReactGoogleMapComponent = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES
  });

  const mapRef = useRef(null);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (isLoaded) {
      const myLatLng = { lat: 37.7749, lng: -122.4194 };
      mapRef.current = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: myLatLng,
      });

      new window.google.maps.Marker({
        position: myLatLng,
        map: mapRef.current,
        title: "Hello World!",

      });
    }
  }, [isLoaded]);

  const onAutocompleteLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      const location = place.geometry.location;
      mapRef.current.setCenter({ lat: location.lat(), lng: location.lng() });
      
      new window.google.maps.Marker({
        position: { lat: location.lat(), lng: location.lng() },
        map: mapRef.current,
        title: place.name, // Title for the new marker
        icon: customMarkerIcon, // Set the custom marker icon here
      });
    }
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

      <div id="map" className="google-map" />
    </div>
  );
};

export default ReactGoogleMapComponent;
