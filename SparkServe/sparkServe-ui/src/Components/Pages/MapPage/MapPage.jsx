import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import UserNavBar from '../../UserNavBar/UserNavBar';
import ReactGoogleMapComponent from '../../Map/Map';
import { useLocation} from 'react-router-dom';
import Footer from '../../Footer/Footer';
import { Box, Container } from '@mui/material';

const MapPage = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleBackClick = () => {
    navigate('/UserLandingPage');
  };

  return (
    <>
      <UserNavBar />
      <Box
        sx={{
          backgroundImage: 'linear-gradient(rgb(180, 200, 255), rgb(255, 255, 255))',
          backgroundSize: '100% 50%',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'white',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          mt: 1,
          width: '100%',
        }}
      >
        <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4, mt: 8 }}>
          <Box
            id="map-container"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: 'calc(100vh - 200px)', // Adjust this value as needed
            }}
          >
            <ReactGoogleMapComponent className="google-map" />
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
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
