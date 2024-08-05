import React, { useEffect } from 'react';
import { Typography, Box, Grid, Paper, CircularProgress, useTheme, useMediaQuery } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import PushPinIcon from '@mui/icons-material/PushPin';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const subtlePulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.7; }
  100% { opacity: 1; }
`;

const NotebookPaper = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  backgroundImage: 'linear-gradient(#e1e1e1 1px, transparent 1px)',
  backgroundSize: '100% 1.2em',
  borderRadius: '20px',
  padding: '50px 70px',
  boxShadow: '0 20px 40px rgba(0,0,0,0.1), 0 0 100px rgba(0,0,0,0.05) inset',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '40px',
    height: '100%',
    width: '2px',
    background: 'linear-gradient(to bottom, transparent, #ff9999, transparent)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '30px 20px',
  },
}));

const CalendarPoster = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: '20px',
  padding: '0',
  boxShadow: '0 25px 50px rgba(0,0,0,0.2), 0 10px 20px rgba(0,0,0,0.1)',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)',
  '&:hover': {
    transform: 'translateY(-15px) scale(1.03)',
    boxShadow: '0 35px 60px rgba(0,0,0,0.3), 0 15px 30px rgba(0,0,0,0.2)',
  },
  height: '500px',
  display: 'flex',
  flexDirection: 'column',
  animation: `${float} 6s ease-in-out infinite`,
  [theme.breakpoints.down('sm')]: {
    height: '400px',
  },
}));

const CalendarTop = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #ff66c4 0%, #ff0080 100%)',
  color: '#fff',
  padding: '25px',
  textAlign: 'center',
  borderTopLeftRadius: '20px',
  borderTopRightRadius: '20px',
  boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
  position: 'relative',
  overflow: 'hidden',
  animation: `${subtlePulse} 3s ease-in-out infinite`,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '180px',
  [theme.breakpoints.down('sm')]: {
    height: '140px',
    padding: '15px',
  },
}));

const MonthYear = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '24px',
  textTransform: 'uppercase',
  letterSpacing: '3px',
  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
  marginBottom: '10px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '18px',
  },
}));

const DateNumber = styled(Typography)(({ theme }) => ({
  fontSize: '72px',
  fontWeight: 'bold',
  lineHeight: 1,
  textShadow: '4px 4px 6px rgba(0,0,0,0.3)',
  [theme.breakpoints.down('sm')]: {
    fontSize: '56px',
  },
}));

const EventContent = styled(Box)(({ theme }) => ({
  padding: '30px',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  background: 'linear-gradient(0deg, #f5f5f5 0%, #ffffff 100%)',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '15px',
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.05), transparent)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '20px',
  },
}));

const EventTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: '#333',
  fontSize: '24px',
  marginBottom: '15px',
  borderBottom: '4px solid #ff66c4',
  paddingBottom: '10px',
  textShadow: '2px 2px 3px rgba(0,0,0,0.1)',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  [theme.breakpoints.down('sm')]: {
    fontSize: '20px',
    marginBottom: '10px',
  },
}));

const EventDetails = styled(Typography)(({ theme }) => ({
  color: '#555',
  fontSize: '16px',
  marginBottom: '12px',
  display: 'flex',
  alignItems: 'center',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateX(5px)',
  },
  '& svg, & span': {
    marginRight: '12px',
    color: '#ff66c4',
    fontSize: '24px',
    filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.2))',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
    marginBottom: '8px',
    '& svg, & span': {
      fontSize: '20px',
    },
  },
}));

const PinIcon = styled(PushPinIcon)(({ theme }) => ({
  position: 'absolute',
  top: '-40px',
  left: '50%',
  transform: 'translateX(-50%) rotateZ(0deg)',
  fontSize: '70px',
  color: '#ff4d6d',
  zIndex: 1,
  filter: 'drop-shadow(4px 4px 4px rgba(0,0,0,0.5))',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateX(-50%) rotateZ(10deg) scale(1.1)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '50px',
    top: '-30px',
  },
}));

const TitleContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '40px',
  marginTop: '-30px',
});

const UpcomingEvents = ({ events, loading }) => {
  const sortedEvents = events ? events.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime)) : [];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.lordicon.com/lordicon.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <NotebookPaper>
      <TitleContainer>
        <Typography variant="h2" sx={{ 
          color: '#333', 
          fontWeight: 'bold', 
          textShadow: '3px 3px 6px rgba(0,0,0,0.2)', 
          letterSpacing: '3px',
          fontSize: isMobile ? '2.5rem' : '3.75rem',
          marginRight: '20px',
          textAlign: 'center',
        }}>
          Upcoming Events
        </Typography>
      </TitleContainer>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
          <CircularProgress sx={{ color: '#ff66c4' }} size={isMobile ? 60 : 80} thickness={6} />
        </Box>
      ) : sortedEvents.length === 0 ? (
        <Typography variant="h4" sx={{ textAlign: 'center', color: '#666', fontStyle: 'italic', animation: `${float} 3s ease-in-out infinite` }}>No upcoming events</Typography>
      ) : (
        <Grid container spacing={isMobile ? 4 : 8}>
          {sortedEvents.map((event, index) => {
            const eventDate = new Date(event.dateTime);
            return (
              <Grid item xs={12} sm={6} md={4} key={event.opportunityId}>
                <Box sx={{ position: 'relative', transform: `rotate(${index % 2 === 0 ? '-2deg' : '2deg'})`, transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'rotate(0deg) scale(1.05)' } }}>
                  <PinIcon />
                  <CalendarPoster elevation={5}>
                    <CalendarTop>
                      <MonthYear>
                        {eventDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                      </MonthYear>
                      <DateNumber>
                        {eventDate.getDate().toString().padStart(2, '0')}
                      </DateNumber>
                    </CalendarTop>
                    <EventContent>
                      <Box>
                        <EventTitle variant="h5" title={event.title}>{event.title}</EventTitle>
                        <EventDetails>
                          <span role="img" aria-label="time">⏰</span>
                          {eventDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </EventDetails>
                        <EventDetails>
                          <span role="img" aria-label="location">📍</span>
                          {event.address}
                        </EventDetails>
                        <EventDetails>
                          <span role="img" aria-label="description">📝</span>
                          {event.description}
                        </EventDetails>
                      </Box>
                      <Box>
                        <EventDetails>
                          <span role="img" aria-label="cause">🎗️</span>
                          Related Cause: {event.relatedCause}
                        </EventDetails>
                        <EventDetails>
                          <span role="img" aria-label="spots">👥</span>
                          Spots Available: {event.spotsAvailable}
                        </EventDetails>
                      </Box>
                    </EventContent>
                  </CalendarPoster>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      )}
    </NotebookPaper>
  );
};

export default UpcomingEvents;