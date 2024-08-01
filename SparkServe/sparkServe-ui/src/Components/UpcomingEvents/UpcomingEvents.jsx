import React from 'react';
import { Typography, Box, Grid, Paper, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import PushPinIcon from '@mui/icons-material/PushPin';

const NotebookPaper = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  backgroundImage: 'linear-gradient(#eee .1em, transparent .1em)',
  backgroundSize: '100% 1.2em',
  borderRadius: '10px',
  padding: '40px 60px',
  boxShadow: '0 0 20px rgba(0,0,0,0.1)',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '40px',
    height: '100%',
    width: '2px',
    background: '#ff9999',
  }
}));

const CalendarPoster = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: '10px',
  padding: '0',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05)',
  position: 'relative',
  overflow: 'hidden',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px) rotate(1deg)',
    boxShadow: '0 12px 20px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)',
  },
  height: '450px',
  display: 'flex',
  flexDirection: 'column',
}));

const CalendarTop = styled(Box)(({ theme }) => ({
  backgroundColor: '#ff66c4',
  color: '#fff',
  padding: '10px',
  textAlign: 'center',
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
}));

const MonthYear = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '18px',
  textTransform: 'uppercase',
  letterSpacing: '1px',
}));

const DateNumber = styled(Typography)(({ theme }) => ({
  fontSize: '48px',
  fontWeight: 'bold',
  lineHeight: 1,
  marginTop: '5px',
}));

const DayName = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  marginTop: '5px',
}));

const EventContent = styled(Box)(({ theme }) => ({
  padding: '20px',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  background: 'linear-gradient(0deg, #f9f9f9 0%, #ffffff 100%)',
}));

const EventTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: '#333',
  fontSize: '22px',
  marginBottom: '15px',
  borderBottom: '2px solid #ff66c4',
  paddingBottom: '10px',
}));

const EventDetails = styled(Typography)(({ theme }) => ({
  color: '#555',
  fontSize: '14px',
  marginBottom: '8px',
  display: 'flex',
  alignItems: 'center',
  '& svg': {
    marginRight: '8px',
    color: '#ff66c4',
  },
}));

const PinIcon = styled(PushPinIcon)(({ theme }) => ({
  position: 'absolute',
  top: '-32px',
  left: '50%',
  transform: 'translateX(-50%)',
  fontSize: '50px',
  color: '#ff4d6d',
  zIndex: 1,
  filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.3))',
}));

const UpcomingEvents = ({ events, loading }) => {
  const sortedEvents = events ? events.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime)) : [];

  return (
    <NotebookPaper>
      <Typography variant="h4" sx={{ mb: 4, mt: -2, color: '#333', textAlign: 'center', fontWeight: 'bold', textShadow: '1px 1px 2px rgba(0,0,0,0.1)', position: 'relative', zIndex: 1 }}>Upcoming Events</Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress sx={{ color: '#ff66c4' }} />
        </Box>
      ) : sortedEvents.length === 0 ? (
        <Typography>No upcoming events</Typography>
      ) : (
        <Grid container spacing={4}>
          {sortedEvents.map((event) => {
            const eventDate = new Date(event.dateTime);
            return (
              <Grid item xs={12} sm={6} md={4} key={event.opportunityId}>
                <Box sx={{ position: 'relative', transform: 'rotate(-2deg)', transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'rotate(0deg)' } }}>
                  <PinIcon />
                  <CalendarPoster elevation={3}>
                    <CalendarTop>
                      <MonthYear>
                        {eventDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                      </MonthYear>
                      <DateNumber>
                        {eventDate.getDate()}
                      </DateNumber>
                      <DayName>
                        {eventDate.toLocaleDateString(undefined, { weekday: 'long' })}
                      </DayName>
                    </CalendarTop>
                    <EventContent>
                      <Box>
                        <EventTitle variant="h6">{event.title}</EventTitle>
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