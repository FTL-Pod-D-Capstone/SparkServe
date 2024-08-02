import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, useLoadScript, Marker, Autocomplete, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';
import "./Map.css";
import Button from '@mui/material/Button';

const LIBRARIES = ["places"];
const baseUrl = import.meta.env.VITE_BACKEND_URL;

const API_URL = `${baseUrl}/opps/locations`;

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

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(API_URL);
        const addresses = response.data;

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
      // If you want to show a login modal, you'll need to implement this
      console.log('User needs to log in');
      return;
    }

    if (marker.opportunityUrl) {
      window.open(marker.opportunityUrl, '_blank', 'noopener,noreferrer');
    } else {
      // If there's no direct URL, navigate to the opportunity page
      window.location.href = `/opportunity/${marker.opportunityId}`;
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div id="map-container">
      <div id="search-container">
        <Autocomplete onLoad={onAutocompleteLoad} onPlaceChanged={onPlaceChanged}>
          <input
            type="text"
            placeholder="Search a location"
            id="place-input"
          />
        </Autocomplete>
      </div>

      <div id="google-map-container">
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
                <Button 
                  color="secondary" 
                  variant="outlined"
                  onClick={() => handleSignUp(selectedMarker)}
                >
                  Sign Up Here
                </Button>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

export default ReactGoogleMapComponent;