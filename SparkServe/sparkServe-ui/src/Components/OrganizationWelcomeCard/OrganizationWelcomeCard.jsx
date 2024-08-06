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
import { useTheme, useMediaQuery } from '@mui/material';

const OrganizationWelcomeCard = () => {
  const navigate = useNavigate();
  const [openSignIn, setOpenSignIn] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const logoStyle = {
    width: isMobile ? '100px' : isTablet ? '120px' : '140px',
    height: 'auto',
    marginBottom: isMobile ? '10px' : '20px',
  };

  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: isMobile ? '250px' : '300px',
    padding: isMobile ? '15px' : '20px',
    textAlign: 'center',
    backgroundColor: 'white',
    borderRadius: '20px',
    position: 'relative', // Added for positioning the back button
  };

  const buttonStyle = {
    margin: isMobile ? '5px' : '10px',
    borderRadius: '25px',
    padding: isMobile ? '8px 16px' : '10px 20px',
    transition: 'all 0.3s ease',
    fontSize: isMobile ? '0.8rem' : '1rem',
  };

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
        minHeight: '100vh',
        paddingTop: isMobile ? '10px' : '20px',
        paddingBottom: isMobile ? '10px' : '20px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Card
          sx={{
            maxHeight: isMobile ? 'auto' : isTablet ? 800 : 1000,
            maxWidth: isMobile ? '90%' : isTablet ? '80%' : 700,
            width: '100%',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            zIndex: 99,
            overflow: 'hidden',
            ...cardStyle,
          }}
        >
          <IconButton
            color="primary"
            onClick={handleBackClick}
            sx={{
              position: 'absolute',
              top: isMobile ? '8px' : '16px',
              left: isMobile ? '8px' : '16px',
              backgroundColor: 'rgba(0, 0, 255, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 255, 0.2)',
              },
              padding: isMobile ? '4px' : '8px',
            }}
          >
            <ArrowBackIosIcon sx={{ fontSize: isMobile ? '1.2rem' : '1.5rem', color: '#1976d2' }} />
          </IconButton>
          <CardContent>
            <motion.img 
              src={logo} 
              style={logoStyle} 
              alt="Logo" 
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
            <Typography
              variant={isMobile ? "h6" : isTablet ? "h5" : "h4"}
              component="div"
              gutterBottom
              sx={{
                color: 'gray',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
                fontWeight: 'bold',
                fontSize: isMobile ? '1rem' : isTablet ? '1.2rem' : '1.5rem',
                lineHeight: 1.4,
                marginBottom: isMobile ? '10px' : '20px',
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
                fontSize: isMobile ? '0.9rem' : isTablet ? '1rem' : '1.1rem',
                marginTop: isMobile ? '5px' : '10px',
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
            <Box sx={{ 
              mt: isMobile ? 2 : 3, 
              display: 'flex', 
              justifyContent: 'center',
              flexDirection: isMobile ? 'column' : 'row',
              width: '100%',
            }}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ width: isMobile ? '100%' : 'auto' }}>
                <Button
                  variant="contained"
                  sx={{ 
                    ...buttonStyle, 
                    backgroundColor: '#8c52ff', 
                    '&:hover': { backgroundColor: '#7a46e0' },
                    width: isMobile ? '100%' : 'auto',
                    marginBottom: isMobile ? '10px' : '0',
                  }}
                  onClick={handleExploreClick}
                >
                  Introduce me
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ width: isMobile ? '100%' : 'auto' }}>
                <Button
                  variant="contained"
                  sx={{ 
                    ...buttonStyle, 
                    backgroundColor: '#ff66c4', 
                    '&:hover': { backgroundColor: '#e05ab0' },
                    width: isMobile ? '100%' : 'auto',
                  }}
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