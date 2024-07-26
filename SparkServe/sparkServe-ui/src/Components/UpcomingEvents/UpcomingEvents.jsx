import React from 'react';
import { Box, Typography, Paper, Card, CardContent } from '@mui/material';

const UpcomingEvents = ({ events }) => {
  const sortedEvents = events.sort((a, b) => new Date(a.date + 'T' + a.time) - new Date(b.date + 'T' + b.time));

  return (
    <Card sx={{ mt: 10, p: 3, backgroundColor: 'pink', borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h4" sx={{ mb: 4 }}>Upcoming Events</Typography>
        {sortedEvents.length === 0 ? (
          <Typography>No upcoming events</Typography>
        ) : (
          sortedEvents.map((event, index) => (
            <Paper key={index} sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6" sx={{ color: '#ff66c4' }}>{event.name}</Typography>
              <Typography sx={{ color: '#ff66c4' }}>{`${new Date(event.date).toLocaleDateString()} at ${event.time}`}</Typography>
              <Typography sx={{ color: '#ff66c4' }}>{event.location}</Typography>
              <Typography sx={{ color: '#ff66c4' }}>{event.text}</Typography>
              <Typography sx={{ color: '#ff66c4' }}>{`Related Cause: ${event.relatedCause}`}</Typography>
            </Paper>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;






