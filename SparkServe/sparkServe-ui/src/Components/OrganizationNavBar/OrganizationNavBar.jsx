import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import logo from '../../assets/logo.png';
import OrganizationAccountPopover from '../OrganizationAccountPopover/OrganizationAccountPopover'; // Update the import
import { useNavigate } from 'react-router-dom';

const logoStyle = {
  width: '140px',
  height: 'auto',
  cursor: 'pointer',
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
              <Button size="large" sx={{ color: '#ff66c4' }} onClick={() => navigate('/OrganizationWelcomePage')}>Home</Button>
            )}
            {isAuthenticated && (
              <>
                <Button size="large" sx={{ color: '#ff66c4' }} onClick={() => navigate('/OrganizationLandingPage')}>Schedule</Button>
                <Button size="large" sx={{ color: '#ff66c4' }} onClick={() => navigate('/Calendar')}>Calendar</Button>
              </>
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isAuthenticated && <OrganizationAccountPopover profileType="Organization Profile" />} {/* Conditionally render the popover */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default OrganizationNavBar;



