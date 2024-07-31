import React from 'react';
import { Typography, Paper, Card, CardContent } from '@mui/material';

const UpcomingEvents = ({ events }) => {
  const sortedEvents = events.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

  return (
    <Card sx={{ mt: 10, p: 3, backgroundColor: 'pink', borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h4" sx={{ mb: 4 }}>Upcoming Events</Typography>
        {sortedEvents.length === 0 ? (
          <Typography>No upcoming events</Typography>
        ) : (
          sortedEvents.map((event) => (
            <Paper key={event.opportunityId} sx={{ p: 2, mb: 2, position: 'relative' }}>
              <Typography variant="h6" sx={{ color: '#ff66c4' }}>{event.title}</Typography>
              <Typography sx={{ color: '#ff66c4' }}>
                {`${new Date(event.dateTime).toLocaleDateString()} at ${new Date(event.dateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`}
              </Typography>
              <Typography sx={{ color: '#ff66c4' }}>{event.address}</Typography>
              <Typography sx={{ color: '#ff66c4' }}>{event.description}</Typography>
              <Typography sx={{ color: '#ff66c4' }}>{`Related Cause: ${event.relatedCause}`}</Typography>
              <Typography sx={{ color: '#ff66c4' }}>{`Spots Available: ${event.spotsAvailable}`}</Typography>
            </Paper>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;