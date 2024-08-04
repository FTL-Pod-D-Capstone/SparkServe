import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { motion } from 'framer-motion';
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
  backgroundColor: 'white',
  borderRadius: '20px',
};

const buttonStyle = {
  margin: '10px',
  borderRadius: '25px',
  padding: '10px 20px',
  transition: 'all 0.3s ease',
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
              src={logo2}
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
                fontSize: '1.1rem',
                marginTop: '10px',
              }}
            >
              Connecting your passion to purpose.
            </Typography>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
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