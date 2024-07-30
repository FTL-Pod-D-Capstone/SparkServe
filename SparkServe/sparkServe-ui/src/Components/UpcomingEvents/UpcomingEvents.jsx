import React from 'react';
import { Box, Typography, Paper, Card, CardContent, Button } from '@mui/material';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';

const UpcomingEvents = ({ events, onEditEvent, onDeleteEvent }) => {
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
              {/* <Button 
                onClick={() => onDeleteEvent(event.opportunityId)} 
                sx={{ position: 'absolute', top: 5, right: 5 }}
              >
                <CloseSharpIcon />
              </Button> */}
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






