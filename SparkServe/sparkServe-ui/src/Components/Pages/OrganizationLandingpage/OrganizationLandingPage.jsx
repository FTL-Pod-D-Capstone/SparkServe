import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrganizationNavBar from '../../OrganizationNavBar/OrganizationNavBar';
import UpcomingEvents from '../../UpcomingEvents/UpcomingEvents';
import Footer from '../../Footer/Footer';
import { Box, Container, CircularProgress } from '@mui/material';

const baseUrl = import.meta.env.VITE_BACKEND_URL;


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
        const response = await axios.get(`${baseUrl}/opps?organizationId=${organizationId}`);
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
          {loading ? (
            <CircularProgress sx={{ color: '#ffffff' }} />
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