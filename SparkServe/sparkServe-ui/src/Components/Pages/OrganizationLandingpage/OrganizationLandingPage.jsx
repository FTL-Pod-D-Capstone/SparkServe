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
          background: 'linear-gradient(to bottom, #ff66c4, white)',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Container>
          <UpcomingEvents events={events} />
        </Container>
      </Box>
      <Footer />
    </>
  );
}

export default OrgLandingPage;


