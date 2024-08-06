import React, { useContext, useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import logo from '../../assets/logo.png';
import OrganizationSignIn from '../OrganizationSignIn/OrganizationSignIn';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme, useMediaQuery, Avatar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Menu, MenuItem } from '@mui/material';
import { CombinedAuthContext } from '../CombinedAuthContext/CombinedAuthContext';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: '#8B5CF6',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: '#8B5CF6',
        color: theme.palette.common.white,
      },
      '&:hover': {
        backgroundColor: 'rgba(139, 92, 246, 0.08)',
      },
    },
  },
}));

const OrganizationNavBar = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const { orgAuth, setOrgAuth } = useContext(CombinedAuthContext);

  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const checkOrgAuth = async () => {
      const authStatus = localStorage.getItem("isOrgAuthenticated");
      const organizationId = localStorage.getItem('organizationId');
      
      if (authStatus === "true" && organizationId) {
        try {
          const response = await axios.get(`${baseUrl}/orgs/${organizationId}`);
          setOrgAuth({
            isAuthenticated: true,
            org: response.data,
            loading: false
          });
        } catch (err) {
          console.error(`Error getting Organization:`, err);
          setOrgAuth(prev => ({ ...prev, loading: false, isAuthenticated: false }));
        }
      } else {
        setOrgAuth(prev => ({ ...prev, loading: false, isAuthenticated: false }));
      }
    };

    checkOrgAuth();
  }, [setOrgAuth, baseUrl]);

  const logoStyle = {
    width: isMobile ? "100px" : isTablet ? "120px" : "140px",
    height: 'auto',
    cursor: 'pointer',
  };

  const navButtonStyle = {
    color: '#8B5CF6',
    fontSize: isMobile ? '0.8rem' : isTablet ? '0.9rem' : '1rem',
    fontWeight: 'bold',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '2px',
      backgroundColor: '#8B5CF6',
      transform: 'scaleX(0)',
      transformOrigin: 'bottom right',
      transition: 'transform 0.3s ease-out',
    },
    '&:hover::after': {
      transform: 'scaleX(1)',
      transformOrigin: 'bottom left',
    },
    '&:hover': {
      backgroundColor: 'rgba(139, 92, 246, 0.04)',
    },
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    if (!orgAuth.isAuthenticated && open) {
      navigate('/OrganizationSignUpPage');
    } else {
      setDrawerOpen(open);
    }
  };

  const handleSignInClick = () => {
    setSignInModalOpen(true);
  };

  const handleSignInClose = () => {
    setSignInModalOpen(false);
  };

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
    setAnchorEl(null);
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem('isOrgAuthenticated');
    localStorage.removeItem('organizationId');
    setLogoutDialogOpen(false);
    navigate('/OrganizationWelcomePage');
    window.location.reload();
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navItems = orgAuth.isAuthenticated
    ? [
        { text: 'Schedule', path: '/OrganizationLandingPage' },
        { text: 'Calendar', path: '/Calendar' }
      ]
    : [];

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {orgAuth.isAuthenticated && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <Avatar
            src={orgAuth.org?.pictureUrl}
            alt="Organization Avatar"
            sx={{
              width: isMobile ? 40 : isTablet ? 45 : 50,
              height: isMobile ? 40 : isTablet ? 45 : 50,
              border: '2px solid #8B5CF6',
            }}
          />
        </Box>
      )}
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(139, 92, 246, 0.04)',
              },
            }}
          >
            <ListItemText
              primary={item.text}
              sx={{
                color: '#8B5CF6',
                '& .MuiTypography-root': {
                  fontWeight: 'bold',
                },
              }}
            />
          </ListItem>
        ))}
        {orgAuth.isAuthenticated && (
          <>
            <Divider />
            <ListItem
              button
              onClick={() => navigate(`/OrganizationProfile/${orgAuth.org?.organizationId}`)}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(139, 92, 246, 0.04)',
                },
              }}
            >
              <ListItemText
                primary="Organization Profile"
                sx={{
                  color: '#8B5CF6',
                  '& .MuiTypography-root': {
                    fontWeight: 'bold',
                  },
                }}
              />
            </ListItem>
            <ListItem
              button
              onClick={handleLogoutClick}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(139, 92, 246, 0.04)',
                },
              }}
            >
              <ListItemText
                primary="Logout"
                sx={{
                  color: '#8B5CF6',
                  '& .MuiTypography-root': {
                    fontWeight: 'bold',
                  },
                }}
              />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  const renderButtons = () => {
    if (orgAuth.loading) {
      return null;
    }

    if (!orgAuth.isAuthenticated) {
      return (
        <>
          <Button
            color="primary"
            variant="text"
            size="small"
            onClick={handleSignInClick}
            sx={{ color: '#8B5CF6' }}
          >
            Sign in
          </Button>
          <Button
            color="primary"
            variant="contained"
            size="small"
            component={Link}
            to="/OrganizationSignUpPage"
            sx={{ backgroundColor: '#8B5CF6', '&:hover': { backgroundColor: '#7C3AED' } }}
          >
            Sign up
          </Button>
        </>
      );
    } else if (!isMobile) {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            size="large"
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
            <Avatar
              src={orgAuth.org?.pictureUrl}
              alt="Organization Avatar"
              sx={{
                width: isMobile ? 40 : isTablet ? 45 : 50,
                height: isMobile ? 40 : isTablet ? 45 : 50,
                border: '2px solid #8B5CF6',
              }}
            />
          </IconButton>
          <StyledMenu
            id="menu-appbar"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => { handleMenuClose(); navigate(`/OrganizationProfile/${orgAuth.org?.organizationId}`); }}>
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
          </StyledMenu>
        </Box>
      );
    }
    return null;
  };

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
      <Container maxWidth={isMobile ? 'xs' : isTablet ? 'sm' : 'lg'}>
        <Toolbar
          variant="regular"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: 'space-between',
            py: isMobile ? 1 : 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img src={logo} style={logoStyle} alt="Logo" onClick={() => navigate('/OrganizationWelcomePage')} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1, justifyContent: 'center' }}>
            {!isMobile && orgAuth.isAuthenticated && (
              navItems.map((item) => (
                <Button 
                  key={item.text}
                  size="large" 
                  sx={navButtonStyle} 
                  onClick={() => navigate(item.path)}
                >
                  {item.text}
                </Button>
              ))
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderButtons()}
            {(isMobile || !orgAuth.isAuthenticated) && (
              <IconButton
                size="large"
                edge="end"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ 
                  color: '#8B5CF6',
                  ml: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(139, 92, 246, 0.04)',
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </Container>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
      <OrganizationSignIn open={signInModalOpen} handleClose={handleSignInClose} />
      <Dialog
        open={logoutDialogOpen}
        onClose={handleLogoutCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Logout"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} sx={{ color: '#8B5CF6' }}>Cancel</Button>
          <Button onClick={handleLogoutConfirm} autoFocus sx={{ color: '#8B5CF6' }}>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
}

export default OrganizationNavBar;