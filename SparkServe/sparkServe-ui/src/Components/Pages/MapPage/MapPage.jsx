import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserNavBar from '../../UserNavBar/UserNavBar';
import ReactGoogleMapComponent from '../../Map/Map';
import Footer from '../../Footer/Footer';
import { Box, IconButton } from '@mui/material';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const MapPage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/UserLandingPage');
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(to bottom, #4685f6, white)',
        minHeight: '100vh', 
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <UserNavBar />
      <Box
        id="map-container"
        sx={{
          mt:'60px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '100px', 
        }}
      >
        <input id="place-input" type="text" placeholder="Search for a place" />
        <ReactGoogleMapComponent className="google-map" />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        {/* <IconButton
          color="primary"
          onClick={handleBackClick}
        >
          <ArrowBackIosIcon />
        </IconButton> */}
      </Box>
      <Footer />
    </Box>
  );
};

export default MapPage;



// import React, { useState, useEffect } from "react";
// import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
// import "./Map.css";

// const LIBRARIES = ["places"];

// const ReactGoogleMapComponent = () => {
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
//     libraries: LIBRARIES
//   });

//   const [markers, setMarkers] = useState([{ lat: 37.7749, lng: -122.4194 }]);
//   const [mapCenter, setMapCenter] = useState({ lat: 37.7749, lng: -122.4194 });

//   useEffect(() => {
//     console.log('Markers state:', markers);
//   }, [markers]);

//   if (!isLoaded) return <div>Loading...</div>;
//   if (loadError) return <div>Error loading maps</div>;

//   return (
//     <div>
//       <GoogleMap
//         mapContainerClassName="google-map"
//         center={mapCenter}
//         zoom={12}
//       >
//         {markers.map((marker, index) => (
//           <Marker
//             key={index}
//             position={{ lat: marker.lat, lng: marker.lng }}
//           />
//         ))}
//       </GoogleMap>
//     </div>
//   );
// };

// export default ReactGoogleMapComponent;
