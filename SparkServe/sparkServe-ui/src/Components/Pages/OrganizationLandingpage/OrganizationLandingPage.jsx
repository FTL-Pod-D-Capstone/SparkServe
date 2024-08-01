import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrganizationNavBar from '../../OrganizationNavBar/OrganizationNavBar';
import UpcomingEvents from '../../UpcomingEvents/UpcomingEvents';
import Footer from '../../Footer/Footer';
import { Box, Container, CircularProgress } from '@mui/material';

const OrgLandingPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const organizationId = localStorage.getItem('organizationId');
      if (!organizationId) {
        console.error('No organization ID found');
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`https://project-1-uljs.onrender.com/opps?organizationId=${organizationId}`);
        const filteredEvents = response.data.filter(event => event.organizationId === parseInt(organizationId));
        setEvents(filteredEvents);
        // Update localStorage to ensure consistency with the Calendar component
        localStorage.setItem('events', JSON.stringify(filteredEvents));
      } catch (error) {
        console.error('Error fetching opportunities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      <OrganizationNavBar />
      <Box
        sx={{
          backgroundImage: 'linear-gradient(#ffc8dd, #ffffff)',
          backgroundSize: '100% 100%',
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
          {loading ? (
            <CircularProgress sx={{ color: '#ffc8dd' }} />
          ) : (
            <UpcomingEvents events={events} />
          )}
        </Container>
      </Box>
      <Footer />
    </>
  );
}

export default OrgLandingPage;