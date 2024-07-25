import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserNavBar from '../../UserNavBar/UserNavBar';
import { Container, Box } from '@mui/material';
import Footer from '../../Footer/Footer';
import VolunteerCardContainer from '../../VolunteerCardContainer/VolunteerCardContainer';
import Chatbot from "../../Chatbot/Chatbot";

const isUserAuthenticated = () => {
  return localStorage.getItem('isUserAuthenticated') === 'true';
};

const UserLandingPage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <>
      <UserNavBar />
      <Box
        sx={{
          background: 'linear-gradient(to bottom, #4685f6, white)',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Container>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: 10,
              marginBottom: 2,
            }}
          >
            {/* Back button code can be added here if needed */}
          </Box>
          <VolunteerCardContainer />
        </Container>
      </Box>
      {isUserAuthenticated() && <Chatbot />}
      <Footer />
    </>
  );
};

export default UserLandingPage;