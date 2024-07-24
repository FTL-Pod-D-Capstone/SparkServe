import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import logo2 from '../../assets/logo2.png';
import AccountPopover from '../AccountPopover/AccountPopover';
import UserSignIn from '../UserSignIn/UserSignIn';

const logoStyle = {
  width: '140px',
  height: 'auto',
  cursor: 'pointer',
};

function UserNavBar() {
  const [open, setOpen] = useState(false);
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const location = useLocation();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleSignInClick = () => {
    setSignInModalOpen(true);
  };

  const handleSignInClose = () => {
    setSignInModalOpen(false);
  };

  const renderButtons = () => {
    if (location.pathname === '/' || location.pathname === '/signup') {
      return (
        <>
          <Button color="primary" variant="text" size="small" onClick={handleSignInClick}>
            Sign in
          </Button>
          <Button color="primary" variant="contained" size="small" href="/UserSignUpPage">
            Sign up
          </Button>
        </>
      );
    } else {
      return <AccountPopover profileType="User Profile" />;
    }
  };

  return (
    <>
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
              <img src={logo2} style={logoStyle} alt="Logo" />
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
              <Button color="primary" variant="text" size="small" href="/">
                Home
              </Button>
              <Button color="primary" variant="text" size="small" href="/UserLandingPage">
                Opportunities
              </Button>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
              {renderButtons()}
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton color="primary" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 250, p: 2 }}>
                  {location.pathname === '/' || location.pathname === '/signup' ? (
                    <>
                      <MenuItem>
                        <Button color="primary" variant="contained" href="/UserSignUpPage" sx={{ width: '100%' }}>
                          Sign up
                        </Button>
                      </MenuItem>
                      <MenuItem>
                        <Button color="primary" variant="outlined" onClick={handleSignInClick} sx={{ width: '100%' }}>
                          Sign in
                        </Button>
                      </MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem>
                        <Button color="primary" variant="text" size="small" href="/" sx={{ width: '100%' }}>
                          Home
                        </Button>
                      </MenuItem>
                      <MenuItem>
                        <Button color="primary" variant="text" size="small" href="/UserLandingPage" sx={{ width: '100%' }}>
                          Opportunities
                        </Button>
                      </MenuItem>
                      <AccountPopover profileType="User Profile" />
                    </>
                  )}
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <UserSignIn open={signInModalOpen} handleClose={handleSignInClose} />
    </>
  );
}

export default UserNavBar;
