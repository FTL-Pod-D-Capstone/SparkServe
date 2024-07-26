import React from 'react';
import UserNavBar from '../../UserNavBar/UserNavBar';
import { Box, Container } from '@mui/material';
import Footer from '../../Footer/Footer';
import VolunteerCardContainer from '../../VolunteerCardContainer/VolunteerCardContainer';
import Chatbot from "../../Chatbot/Chatbot";

const isUserAuthenticated = () => {
  return localStorage.getItem('isUserAuthenticated') === 'true';
};

const UserLandingPage = () => {
  return (
    <>
      <UserNavBar />
      <Box
        sx={{
          backgroundImage: 'linear-gradient(rgb(135, 175, 255), rgb(255, 255, 255))',
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
          <VolunteerCardContainer />
        </Container>
      </Box>
      {isUserAuthenticated() && <Chatbot />}
      <Footer />
    </>
  );
};

export default UserLandingPage;