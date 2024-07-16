import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import logo from '../../assets/logo.png'; 

const logoStyle = {
  width: '140px',
  height: 'auto',
  marginBottom: '20px',
};

const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '300px',
  padding: '20px',
  textAlign: 'center',
};

const buttonStyle = {
  margin: '10px',
};

function WelcomeCard() {
  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Card sx={{ maxHeight: 1000, maxWidth: 700, height: '100%', width: '100%', bgcolor: 'white', boxShadow: 3, zIndex: 99 }}>
        <CardContent sx={cardStyle}>
          <img src={logo} style={logoStyle} alt="Logo" />
          <Typography variant="h5" component="div" gutterBottom>
            Welcome to Our Platform
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Connecting your passion to purpose.
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Button variant="contained" color="primary" sx={buttonStyle}>
              Explore Opportunities
            </Button>
            <Button variant="outlined" color="primary" sx={buttonStyle}>
              Create Your Own
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default WelcomeCard;