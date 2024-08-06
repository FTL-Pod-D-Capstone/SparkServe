import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, useLoadScript, Marker, Autocomplete, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';
import { Button, Paper, Typography, Box, useMediaQuery, useTheme } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import "./Map.css";

const LIBRARIES = ["places"];
const baseUrl = import.meta.env.VITE_BACKEND_URL;
const API_URL = `${baseUrl}/opps/locations`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(51, 102, 204, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(51, 102, 204, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(51, 102, 204, 0);
  }
`;

const MapContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  paddingTop: '120px',
  position: 'relative',
  height: 'calc(100vh - 120px)',
  [theme.breakpoints.down('sm')]: {
    paddingTop: '100px',
    height: 'calc(100vh - 100px)',
  },
}));

const SearchInput = styled('input')(({ theme }) => ({
  boxSizing: 'border-box',
  border: 'none',
  width: '80%',
  maxWidth: '450px',
  height: '50px',
  padding: '0 20px',
  borderRadius: '25px',
  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
  fontSize: '16px',
  outline: 'none',
  transition: 'all 0.3s ease',
  position: 'absolute',
  top: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 10,
  backgroundColor: 'white',
  '&:focus': {
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
    animation: `${pulse} 1.5s infinite`,
  },
  '&::placeholder': {
    color: '#aaa',
  },
  [theme.breakpoints.down('sm')]: {
    width: '90%',
    fontSize: '14px',
    height: '40px',
  },
}));

const StyledInfoWindow = styled(Paper)(({ theme }) => ({
  padding: '15px',
  maxWidth: '250px',
  borderRadius: '10px',
  boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
  [theme.breakpoints.down('sm')]: {
    padding: '10px',
    maxWidth: '200px',
  },
}));

const mapStyles = [
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#a6cbe3" }]
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ color: "#e8f0f7" }]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }]
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#d1e6cc" }]
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#f2f2f2" }]
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#ffffff" }]
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#3366cc" }]
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [{ color: "#3366cc" }]
  },
  {
    featureType: "road.arterial",
    elementType: "geometry.fill",
    stylers: [{ color: "#e6f0ff" }]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [{ color: "#c2d9ff" }]
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [{ color: "#b8e0c1" }]
  }
];

const ReactGoogleMapComponent = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
  });

  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const mapRef = useRef(null);
  const autocompleteRef = useRef(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(API_URL);
        const addresses = response.data;

        const newMarkers = await Promise.all(addresses.map(async (address) => {
          if (!address.address) {
            //console.error('Skipping empty address:', address);
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

        const authStatus = localStorage.getItem('isUserAuthenticated') === 'true';
        setIsAuthenticated(authStatus);

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

  const handleSignUp = (marker) => {
    if (!isAuthenticated) {
      console.log('User needs to log in');
      return;
    }

    if (marker.opportunityUrl) {
      window.open(marker.opportunityUrl, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = `/opportunity/${marker.opportunityId}`;
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <MapContainer>
      <Autocomplete onLoad={onAutocompleteLoad} onPlaceChanged={onPlaceChanged}>
        <SearchInput
          type="text"
          placeholder="Search a location"
        />
      </Autocomplete>

      <GoogleMap
        mapContainerClassName="google-map"
        center={{ lat: 37.7749, lng: -122.4194 }}
        zoom={12}
        onLoad={(map) => {
          mapRef.current = map;
        }}
        options={{
          styles: mapStyles,
          disableDefaultUI: true,
          zoomControl: true,
          fullscreenControl: true,
          mapTypeControl: true,
        }}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => handleMarkerClick(marker)}
            icon={{
              url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
              scaledSize: new window.google.maps.Size(
                isMobile ? 30 : isTablet ? 35 : 40,
                isMobile ? 30 : isTablet ? 35 : 40
              ),
            }}
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={handleInfoWindowClose}
          >
            <StyledInfoWindow>
              <Typography 
                variant={isMobile ? "subtitle1" : isTablet ? "h6" : "h5"} 
                gutterBottom 
                sx={{ color: '#3366cc', fontWeight: 'bold' }}
              >
                {selectedMarker.title}
              </Typography>
              <Typography 
                variant={isMobile ? "body2" : "body1"} 
                paragraph 
                sx={{ color: '#555' }}
              >
                {selectedMarker.address}
              </Typography>
              <Button 
                sx={{
                  backgroundColor: '#3366cc',
                  '&:hover': {
                    backgroundColor: '#254e99'
                  },
                  borderRadius: '20px',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                  fontSize: isMobile ? '12px' : isTablet ? '13px' : '14px',
                  padding: isMobile ? '6px 12px' : isTablet ? '7px 14px' : '8px 16px',
                }}
                variant="contained"
                onClick={() => handleSignUp(selectedMarker)}
                fullWidth
              >
                Sign Up Here
              </Button>
            </StyledInfoWindow>
          </InfoWindow>
        )}
      </GoogleMap>
    </MapContainer>
  );
};

export default ReactGoogleMapComponent;
