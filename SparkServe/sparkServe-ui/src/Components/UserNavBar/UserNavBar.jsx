import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import MenuItem from '@mui/material/MenuItem';
import logo2 from '../../assets/logo2.png';
import UserRegistration from "../Pages/UserRegistration/UserRegistration";
 
const logoStyle = {
  width: '140px',
  height: 'auto',
  cursor: 'pointer',
};

function UserNavBar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: 'white',
        backgroundImage: 'none',
        zIndex: 1100, // Ensure navbar is on top
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
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
            <UserRegistration />
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <Button variant="text" color="primary" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </Button>
            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
              <Box sx={{ width: 250, p: 2 }}>
                <MenuItem>
                  <UserRegistration />
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default UserNavBar;
