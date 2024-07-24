import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserNavBar from '../../UserNavBar/UserNavBar';
import { Container, Box, IconButton } from '@mui/material';
import Footer from '../../Footer/Footer';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import VolunteerCardContainer from '../../VolunteerCardContainer/VolunteerCardContainer';

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
            {/* <IconButton
              color="white"
              onClick={handleBackClick}
            >
              <ArrowBackIosIcon />
            </IconButton> */}
          </Box>
          <VolunteerCardContainer />
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default UserLandingPage;


