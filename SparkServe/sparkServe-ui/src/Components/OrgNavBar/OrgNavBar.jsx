import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import logo from '../../assets/logo.png';
import AccountPopover from '../AccountPopover/AccountPopover'; 

const logoStyle = {
  width: '140px',
  height: 'auto',
  cursor: 'pointer',
};

function OrgNavBar() {
  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'white',
          backgroundImage: 'none',
          mt: 2,
          width: "100%",
          backgroundColor: "inherit",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor: 'white',
              backdropFilter: 'blur(24px)',
              maxHeight: '70px',
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: '0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)',
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <img
                src={logo}
                style={logoStyle}
                alt="Logo"
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <AccountPopover />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default OrgNavBar;
