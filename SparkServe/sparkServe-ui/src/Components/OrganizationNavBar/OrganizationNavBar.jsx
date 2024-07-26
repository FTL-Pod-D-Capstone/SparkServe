import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import logo from '../../assets/logo.png';
import OrganizationAccountPopover from '../OrganizationAccountPopover/OrganizationAccountPopover';
import { useNavigate } from 'react-router-dom';

const logoStyle = {
  width: '140px',
  height: 'auto',
  cursor: 'pointer',
};

const navButtonStyle = {
  position: 'relative',
  overflow: 'hidden',
  color: '#ff66c4',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '2px',
    backgroundColor: '#ff66c4',
    transform: 'scaleX(0)',
    transformOrigin: 'bottom right',
    transition: 'transform 0.3s ease-out',
  },
  '&:hover::after': {
    transform: 'scaleX(1)',
    transformOrigin: 'bottom left',
  },
  '&:hover': {
    backgroundColor: 'rgba(255, 102, 196, 0.04)',
  },
};

function OrganizationNavBar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: 'white',
        backgroundImage: 'none',
        zIndex: 1100,
      }}
    >
      <Container>
        <Toolbar
          variant="regular"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} style={logoStyle} alt="Logo" onClick={() => navigate('/')} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1, gap: 2 }}>
            {!isAuthenticated && (
              <Button 
                size="large" 
                sx={navButtonStyle} 
                onClick={() => navigate('/OrganizationWelcomePage')}
              >
                Home
              </Button>
            )}
            {isAuthenticated && (
              <>
                <Button 
                  size="large" 
                  sx={navButtonStyle} 
                  onClick={() => navigate('/OrganizationLandingPage')}
                >
                  Schedule
                </Button>
                <Button 
                  size="large" 
                  sx={navButtonStyle} 
                  onClick={() => navigate('/Calendar')}
                >
                  Calendar
                </Button>
              </>
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isAuthenticated && <OrganizationAccountPopover profileType="Organization Profile" />}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default OrganizationNavBar;



