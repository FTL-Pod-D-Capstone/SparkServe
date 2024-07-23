import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import OrganizationSignIn from '../../Components/OrganizationSignIn/OrganizationSignIn'; 
import OrganizationSignUp from '../../Components/OrganizationSignUp/OrganizationSignUp'; // Import OrganizationSignUp
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

function OrganizationWelcomeCard() {
  const navigate = useNavigate();
  const [openSignIn, setOpenSignIn] = useState(false);

  const handleExploreClick = () => {
    navigate('/OrganizationSignUpPage');
  };

  const handleWelcomeClick = () => {
    setOpenSignIn(true);
  };

  const handleCloseSignIn = () => {
    setOpenSignIn(false);
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 400px)',
        paddingTop: '80px',
      }}
    >
      <Box sx={{ alignSelf: 'flex-start', marginBottom: 2 }}>
        <IconButton color="primary" onClick={handleBackClick}>
          <ArrowBackIosIcon />
        </IconButton>
      </Box>
      <Card sx={{ maxHeight: 1000, maxWidth: 700, height: '100%', width: '700px', bgcolor: 'white', boxShadow: 3, zIndex: 99 }}>
        <CardContent sx={cardStyle}>
          <img src={logo} style={logoStyle} alt="Logo" />
          <Typography variant="h5" component="div" gutterBottom>
            Welcome to Our Platform
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Connecting your{' '}
            <Typography component="span" sx={{ color: '#ff66c4' }}>
              purpose
            </Typography>{' '}
            to{' '}
            <Typography component="span" sx={{ color: '#ff66c4' }}>
              passion
            </Typography>.
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Button variant="contained" color="primary" sx={buttonStyle} onClick={handleExploreClick}>
              Introduce me
            </Button>
            <Button variant="contained" color="primary" sx={buttonStyle} onClick={handleWelcomeClick}>
              Welcome Back
            </Button>
          </Box>
        </CardContent>
      </Card>
      <OrganizationSignIn open={openSignIn} handleClose={handleCloseSignIn} />
    </Container>
  );
}

export default OrganizationWelcomeCard;
