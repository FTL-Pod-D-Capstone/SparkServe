import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme, useMediaQuery, Avatar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import logo2 from "../../assets/logo2.png";
import UserAccountPopover from "../UserAccountPopover/UserAccountPopover";
import UserSignIn from "../UserSignIn/UserSignIn";
import { CombinedAuthContext } from '../CombinedAuthContext/CombinedAuthContext';
import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

const UserNavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const { userAuth, setUserAuth } = useContext(CombinedAuthContext);
  const navigate = useNavigate();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLaptop = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const logoStyle = {
    width: isMobile ? "100px" : isTablet ? "120px" : "140px",
    height: "auto",
    cursor: "pointer",
  };

  const navButtonStyle = {
    color: '#4685F6', // Changed to #4685F6
    fontSize: isMobile ? '0.9rem' : isTablet ? '1rem' : '1.1rem',
    fontWeight: 'bold',
    padding: '6px 12px',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '2px',
      backgroundColor: '#4685F6', // Changed to #4685F6
      transform: 'scaleX(0)',
      transformOrigin: 'bottom right',
      transition: 'transform 0.3s ease-out',
    },
    '&:hover::after': {
      transform: 'scaleX(1)',
      transformOrigin: 'bottom left',
    },
    '&:hover': {
      backgroundColor: 'rgba(70, 133, 246, 0.04)', // Changed to match #4685F6 with low opacity
    },
  };



  useEffect(() => {
    const checkUserAuth = async () => {
      const authStatus = localStorage.getItem("isUserAuthenticated");
      const userId = localStorage.getItem('userId');
      
      if (authStatus === "true" && userId) {
        try {
          const response = await axios.get(`${baseUrl}/users/${userId}`);
          setUserAuth({
            isAuthenticated: true,
            user: response.data,
            loading: false
          });
        } catch (err) {
          console.error(`Error getting User:`, err);
          setUserAuth(prev => ({ ...prev, loading: false, isAuthenticated: false }));
        }
      } else {
        setUserAuth(prev => ({ ...prev, loading: false, isAuthenticated: false }));
      }
    };

    checkUserAuth();
  }, [setUserAuth]);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleSignInClick = () => {
    setSignInModalOpen(true);
  };

  const handleSignInClose = () => {
    setSignInModalOpen(false);
  };

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem('isUserAuthenticated');
    localStorage.removeItem('userId');
    setLogoutDialogOpen(false);
    navigate('/');
    window.location.reload();
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  };

  const navItems = [
    { text: 'Opportunities', path: '/UserLandingPage' },
    ...(userAuth.isAuthenticated ? [{ text: 'Map', path: '/Map' }] : [])
  ];

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {userAuth.isAuthenticated && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <Avatar
            src={userAuth.user?.profilePicture}
            alt="User Avatar"
            sx={{
              width: isMobile ? 40 : isTablet ? 45 : 50,
              height: isMobile ? 40 : isTablet ? 45 : 50,
              border: '2px solid #4856f6',
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
                backgroundColor: 'rgba(72, 86, 246, 0.04)',
              },
            }}
          >
            <ListItemText
              primary={item.text}
              sx={{
                color: '#4856f6',
                '& .MuiTypography-root': {
                  fontWeight: 'bold',
                },
              }}
            />
          </ListItem>
        ))}
        {userAuth.isAuthenticated && (
          <>
            <Divider />
            <ListItem
              button
              onClick={() => navigate(`/UserProfile/${userAuth.user?.userId}`)}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(72, 86, 246, 0.04)',
                },
              }}
            >
              <ListItemText
                primary="User Profile"
                sx={{
                  color: '#4856f6',
                  '& .MuiTypography-root': {
                    fontWeight: 'bold',
                  },
                }}
              />
            </ListItem>
            <ListItem
              button
              onClick={() => navigate('/bookmarks')}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(72, 86, 246, 0.04)',
                },
              }}
            >
              <ListItemText
                primary="Favorites"
                sx={{
                  color: '#4856f6',
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
                  backgroundColor: 'rgba(72, 86, 246, 0.04)',
                },
              }}
            >
              <ListItemText
                primary="Logout"
                sx={{
                  color: '#4856f6',
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
    if (userAuth.loading) {
      return <CircularProgress size={24} />;
    }

    if (!userAuth.isAuthenticated) {
      return (
        <>
          <Button
            color="primary"
            variant="text"
            size="small"
            onClick={handleSignInClick}
            sx={{ color: '#4856f6' }}
          >
            Sign in
          </Button>
          <Button
            color="primary"
            variant="contained"
            size="small"
            component={Link}
            to="/UserSignUpPage"
            sx={{ backgroundColor: '#4856f6', '&:hover': { backgroundColor: '#3A45C4' } }}
          >
            Sign up
          </Button>
        </>
      );
    } else if (!isMobile) {
      return (
        <UserAccountPopover 
          profileType="User Profile" 
          profilePicture={userAuth.user?.profilePicture} 
        />
      );
    }
    return null;
  };

  if (userAuth.loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "white",
          backgroundImage: "none",
          zIndex: 1100,
        }}
      >
        <Container maxWidth={isDesktop ? "lg" : isLaptop ? "md" : "sm"}>
          <Toolbar
            variant="regular"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: 'space-between',
              py: isMobile ? 1.5 : 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1  }}>
              <img src={logo2} style={logoStyle} alt="Logo" onClick={() => navigate('/')} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 2 }}>
              {!isMobile && (
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
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, justifyContent: 'flex-end', marginRight: 8 }}>
              {renderButtons()}
              {isMobile && (
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="menu"
                  onClick={toggleDrawer(true)}
                  sx={{ 
                    color: '#4856f6',
                    ml: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(72, 86, 246, 0.04)',
                    },
                  }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
      <UserSignIn open={signInModalOpen} handleClose={handleSignInClose} />
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
          <Button onClick={handleLogoutCancel} sx={{ color: '#4856f6' }}>Cancel</Button>
          <Button onClick={handleLogoutConfirm} autoFocus sx={{ color: '#4856f6' }}>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UserNavBar;