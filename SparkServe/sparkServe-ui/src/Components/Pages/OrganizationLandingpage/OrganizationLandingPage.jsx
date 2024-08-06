import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrganizationNavBar from '../../OrganizationNavBar/OrganizationNavBar';
import UpcomingEvents from '../../UpcomingEvents/UpcomingEvents';
import Footer from '../../Footer/Footer';
import { useLocation } from 'react-router-dom';
import { Box, Container, CircularProgress, useTheme, useMediaQuery } from '@mui/material';

const baseUrl = import.meta.env.VITE_BACKEND_URL;

const OrgLandingPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
        <Container 
          maxWidth={isMobile ? 'xs' : isTablet ? 'sm' : 'lg'} 
          sx={{ 
            flexGrow: 1, 
            py: isMobile ? 2 : isTablet ? 3 : 4, 
            mt: isMobile ? 6 : isTablet ? 7 : 8,
            px: isMobile ? 2 : 3
          }}
        >
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
              <CircularProgress sx={{ color: '#8B5CF6' }} />
            </Box>
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