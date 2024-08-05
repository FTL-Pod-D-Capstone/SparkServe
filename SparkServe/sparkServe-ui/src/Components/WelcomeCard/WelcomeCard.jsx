import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { motion } from 'framer-motion';
import useMediaQuery from '@mui/material/useMediaQuery';
import logo2 from '../../assets/logo2.png';
import MovingComponent from 'react-moving-text';

const WelcomeCard = () => {
  const navigate = useNavigate();
  const isMobileS = useMediaQuery('(min-width:320px)');
  const isMobileM = useMediaQuery('(min-width:375px)');
  const isMobileL = useMediaQuery('(min-width:425px)');
  const isTablet = useMediaQuery('(min-width:768px)');
  const isLaptop = useMediaQuery('(min-width:1024px)');
  const isLaptopL = useMediaQuery('(min-width:1440px)');
  const isDesktop = useMediaQuery('(min-width:2560px)');

  const logoStyle = {
    width: isTablet ? '140px' : '100px',
    height: 'auto',
    marginBottom: '20px',
  };

  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: isTablet ? '300px' : '250px',
    padding: isTablet ? '20px' : '15px',
    textAlign: 'center',
    backgroundColor: 'white',
    borderRadius: '20px',
  };

  const buttonStyle = {
    margin: isTablet ? '10px' : '5px',
    borderRadius: '25px',
    padding: isTablet ? '10px 20px' : '8px 16px',
    transition: 'all 0.3s ease',
    fontSize: isTablet ? '1rem' : '0.875rem',
  };

  const handleExploreClick = () => {
    navigate('/UserLandingPage');
  };

  const handleCreateClick = () => {
    navigate('/OrganizationWelcomePage');
  };

  return (
    <Container
      maxWidth={isDesktop ? "xl" : isLaptopL ? "lg" : "md"}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        minHeight: 'calc(100vh - 400px)',
        paddingTop: '10px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Card
          sx={{
            maxHeight: isTablet ? 1000 : 800,
            maxWidth: isTablet ? 700 : '95%',
            height: '100%',
            width: isTablet ? '700px' : '100%',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            zIndex: 99,
            overflow: 'hidden',
            ...cardStyle,
          }}
        >
          <CardContent>
            <motion.img
              src={logo2}
              style={logoStyle}
              alt="Logo"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
            <Typography
              variant={isTablet ? "h5" : "h6"}
              component="div"
              gutterBottom
              sx={{
                color: 'primary.main',
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
                style={{ margin: '0 4px' }}
              >
                Users
              </MovingComponent>
              to Our Platform
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                fontSize: isTablet ? '1.1rem' : '1rem',
                marginTop: '10px',
              }}
            >
              Connecting your passion to purpose.
            </Typography>
            <Box sx={{ 
              mt: 3, 
              display: 'flex', 
              justifyContent: 'center',
              flexDirection: isTablet ? 'row' : 'column',
              alignItems: 'center',
            }}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={buttonStyle}
                  onClick={handleExploreClick}
                >
                  Explore Opportunities
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={buttonStyle}
                  onClick={handleCreateClick}
                >
                  Create Your Own
                </Button>
              </motion.div>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
}

export default WelcomeCard;