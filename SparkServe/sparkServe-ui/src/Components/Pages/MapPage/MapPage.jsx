import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserNavBar from '../../UserNavBar/UserNavBar';
import ReactGoogleMapComponent from '../../Map/Map';
import Footer from '../../Footer/Footer';
import { Box, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

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
        <IconButton
          color="primary"
          onClick={handleBackClick}
        >
          <ArrowBackIosIcon />
        </IconButton>
      </Box>
      <Footer />
    </Box>
  );
};

export default MapPage;



