import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, MenuItem, IconButton, Typography, Avatar, useTheme, useMediaQuery } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

function OrganizationAccountPopover({ profileType, profilePicture }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [organizationId, setOrganizationId] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  useEffect(() => {
    const storedOrgId = localStorage.getItem("organizationId");
    if (storedOrgId) {
      setOrganizationId(storedOrgId);
    }
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('isOrgAuthenticated');
    localStorage.removeItem('organizationId');
    navigate('/OrganizationWelcomePage');
    window.location.reload();
  };

  const getSize = () => {
    if (isMobile) return 40;
    if (isTablet) return 45;
    return 50;
  };

  const size = getSize();

  return (
    <div>
      <IconButton
        edge="end"
        aria-label="account of current organization"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenuOpen}
        sx={{ 
          color: '#8B5CF6', 
          padding: 0,
          '&:hover': {
            backgroundColor: 'rgba(139, 92, 246, 0.04)',
          },
        }}
      >
        {profilePicture ? (
          <Avatar
            src={profilePicture}
            alt="Organization Avatar"
            sx={{ 
              width: size, 
              height: size,
              border: '2px solid #8B5CF6',
            }}
          />
        ) : (
          <AccountCircle sx={{ fontSize: size + 10 }} />
        )}
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{
          '& .MuiPaper-root': {
            bgcolor: 'white',
            color: '#8B5CF6',
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <MenuItem 
          component={Link} 
          to={`/OrganizationProfile/${organizationId}`} 
          onClick={handleMenuClose}
          sx={{
            '&:hover': {
              backgroundColor: 'rgba(139, 92, 246, 0.04)',
            },
          }}
        >
          <Typography textAlign="center">{profileType}</Typography>
        </MenuItem>
        <MenuItem 
          onClick={handleLogout}
          sx={{
            '&:hover': {
              backgroundColor: 'rgba(139, 92, 246, 0.04)',
            },
          }}
        >
          <Typography>Logout</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default OrganizationAccountPopover;