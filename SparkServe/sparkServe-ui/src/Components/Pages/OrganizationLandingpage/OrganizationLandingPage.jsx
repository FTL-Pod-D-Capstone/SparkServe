import React, { useState, useEffect } from 'react';
import OrganizationNavBar from '../../OrganizationNavBar/OrganizationNavBar';
import UpcomingEvents from '../../UpcomingEvents/UpcomingEvents';
import Footer from '../../Footer/Footer';
import { Box, Container } from '@mui/material';

const OrgLandingPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  return (
    <>
      <OrganizationNavBar />
      <Box
        sx={{
          backgroundImage: 'linear-gradient(rgb(255, 102, 196), rgb(255, 255, 255))',
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
          <UpcomingEvents events={events} />
        </Container>
      </Box>
      <Footer />
    </>
  );
}

export default OrgLandingPage;


