import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import logo2 from '../../assets/logo2.png';
import MovingComponent from 'react-moving-text';

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
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/UserLandingPage');
  };

  const handleCreateClick = () => {
    navigate('/OrganizationWelcomePage');
  };

  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'row',
        minHeight: 'calc(100vh - 400px)',
        paddingTop: '10px',
      }}
    >
      <Card
        sx={{
          maxHeight: 1000,
          maxWidth: 700,
          height: '100%',
          width: '700px',
          bgcolor: 'white',
          boxShadow: 3,
          zIndex: 99,
        }}
      >
        <CardContent sx={cardStyle}>
          <img src={logo2} style={logoStyle} alt="Logo" />
          <Typography
            variant="h5"
            component="div"
            gutterBottom
            sx={{
              color: (theme) => theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            Welcome
            <MovingComponent
              type="effect3D"
              duration="700ms"
              delay="0s"
              direction="normal"
              timing="ease"
              iteration="infinite"
              fillMode="none"
              style={{ margin: '0 4px' }}
            >
              Users
            </MovingComponent>
            to Our Platform
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              color: (theme) => theme.palette.mode === 'light' ? 'text.secondary' : 'text.primary',
            }}
          >
            Connecting your passion to purpose.
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              sx={buttonStyle}
              onClick={handleExploreClick}
            >
              Explore Opportunities
            </Button>
            <Button
              variant="outlined"
              color="primary"
              sx={buttonStyle}
              onClick={handleCreateClick}
            >
              Create Your Own
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default WelcomeCard;