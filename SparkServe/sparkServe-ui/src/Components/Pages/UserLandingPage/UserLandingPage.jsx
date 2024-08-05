import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import UserNavBar from '../../UserNavBar/UserNavBar';
import { Box, Container } from '@mui/material';
import Footer from '../../Footer/Footer';
import VolunteerCardContainer from '../../VolunteerCardContainer/VolunteerCardContainer';
import Chatbot from "../../Chatbot/Chatbot";

const isUserAuthenticated = () => {
  return localStorage.getItem('isUserAuthenticated') === 'true';
};

const UserLandingPage = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
          <VolunteerCardContainer />
        </Container>
      </Box>
      {isUserAuthenticated() && <Chatbot />}
      <Footer />
    </>
  );
};

export default UserLandingPage;