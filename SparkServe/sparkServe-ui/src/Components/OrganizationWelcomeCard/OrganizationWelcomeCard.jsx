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
import logo from '../../assets/logo.png';
import MovingComponent from 'react-moving-text';
import { motion } from 'framer-motion';

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
  backgroundColor: 'white',
  borderRadius: '20px',
};

const buttonStyle = {
  margin: '10px',
  borderRadius: '25px',
  padding: '10px 20px',
  transition: 'all 0.3s ease',
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
        paddingTop: '10px',
      }}
    >
      <Box sx={{ alignSelf: 'flex-start', marginBottom: 2 }}>
        <IconButton color="primary" onClick={handleBackClick}>
          <ArrowBackIosIcon />
        </IconButton>
      </Box>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Card
          sx={{
            maxHeight: 1000,
            maxWidth: 700,
            height: '100%',
            width: '700px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            zIndex: 99,
            overflow: 'hidden',
            ...cardStyle,
          }}
        >
          <CardContent>
            <motion.img 
              src={logo} 
              style={logoStyle} 
              alt="Logo" 
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
            <Typography
              variant="h5"
              component="div"
              gutterBottom
              sx={{
                color: 'gray',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
                fontWeight: 'bold',
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
                style={{ margin: '0 4px', color: '#ff66c4' }}
              >
                Organizations
              </MovingComponent>
              to Our Platform
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                fontSize: '1.1rem',
                marginTop: '10px',
              }}
            >
              Connecting your{' '}
              <Typography component="span" sx={{ color: '#ff66c4' }}>
                purpose
              </Typography>{' '}
              to{' '}
              <Typography component="span" sx={{ color: '#ff66c4' }}>
                passion
              </Typography>.
            </Typography>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="contained"
                  sx={{ ...buttonStyle, backgroundColor: '#8c52ff', '&:hover': { backgroundColor: '#7a46e0' } }}
                  onClick={handleExploreClick}
                >
                  Introduce me
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="contained"
                  sx={{ ...buttonStyle, backgroundColor: '#ff66c4', '&:hover': { backgroundColor: '#e05ab0' } }}
                  onClick={handleWelcomeClick}
                >
                  Welcome Back
                </Button>
              </motion.div>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
      <OrganizationSignIn open={openSignIn} handleClose={handleCloseSignIn} />
    </Container>
  );
}

export default OrganizationWelcomeCard;