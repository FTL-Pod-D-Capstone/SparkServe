import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuItem, IconButton, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

function OrganizationAccountPopover({ profileType }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/OrganizationWelcomePage');
    window.location.reload(); // Force a reload to update the nav bar
  };

  return (
    <div>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenuOpen}
        sx={{ color: 'black' }} // Change the icon color to black
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{ // Custom styles for the menu
          '& .MuiPaper-root': {
            bgcolor: 'black',
            color: 'white',
          },
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          <Typography textAlign="center" sx={{ color: 'white' }}>{profileType}</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Typography sx={{ color: 'white' }}>Logout</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default OrganizationAccountPopover;
