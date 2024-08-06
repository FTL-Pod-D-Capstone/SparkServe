import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import useMediaQuery from '@mui/material/useMediaQuery';
import logo2 from "../../assets/logo2.png";
import UserAccountPopover from "../UserAccountPopover/UserAccountPopover";
import UserSignIn from "../UserSignIn/UserSignIn";
import { CombinedAuthContext } from '../CombinedAuthContext/CombinedAuthContext';
import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

const logoStyle = {
  width: "140px",
  height: "auto",
  cursor: "pointer",
};

const navButtonStyle = {
  position: "relative",
  overflow: "hidden",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "2px",
    backgroundColor: "primary.main",
    transform: "scaleX(0)",
    transformOrigin: "bottom right",
    transition: "transform 0.3s ease-out",
  },
  "&:hover::after": {
    transform: "scaleX(1)",
    transformOrigin: "bottom left",
  },
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
};

function UserNavBar() {
  const [open, setOpen] = React.useState(false);
  const [signInModalOpen, setSignInModalOpen] = React.useState(false);
  const { userAuth, setUserAuth } = useContext(CombinedAuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const isMobileS = useMediaQuery('(min-width:320px)');
  const isMobileM = useMediaQuery('(min-width:375px)');
  const isMobileL = useMediaQuery('(min-width:425px)');
  const isTablet = useMediaQuery('(min-width:768px)');
  const isLaptop = useMediaQuery('(min-width:1024px)');
  const isLaptopL = useMediaQuery('(min-width:1440px)');
  const isDesktop = useMediaQuery('(min-width:2560px)');

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
          >
            Sign in
          </Button>
          <Button
            color="primary"
            variant="contained"
            size="small"
            component={Link}
            to="/UserSignUpPage"
          >
            Sign up
          </Button>
        </>
      );
    } else {
      return (
        <UserAccountPopover 
          profileType="User Profile" 
          profilePicture={userAuth.user.profilePicture} 
        />
      );
    }
  };

  const responsiveNavButtonStyle = {
    ...navButtonStyle,
    display: { xs: "none", md: "inline-flex" },
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
        <Container maxWidth={isDesktop ? "xl" : isLaptopL ? "lg" : "md"}>
          <Toolbar
            variant="regular"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              py: isTablet ? 1 : 0.5,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: isTablet ? 0 : 1 }}>
              <img
                src={logo2}
                style={{...logoStyle, width: isTablet ? "140px" : "100px"}}
                alt="Logo"
                onClick={() => navigate("/")}
              />
            </Box>
            <Box sx={{ 
              display: { xs: "none", md: "flex" }, 
              flexGrow: 1, 
              justifyContent: "center",
              gap: isLaptop ? 4 : 2
            }}>
              <Button
                color="primary"
                variant="text"
                size={isLaptop ? "large" : "medium"}
                component={Link}
                to="/"
                sx={responsiveNavButtonStyle}
              >
                Home
              </Button>
              <Button
                color="primary"
                variant="text"
                size={isLaptop ? "large" : "medium"}
                component={Link}
                to="/UserLandingPage"
                sx={responsiveNavButtonStyle}
              >
                Opportunities
              </Button>
              {userAuth.isAuthenticated && (
                <Button
                  color="primary"
                  variant="text"
                  size={isLaptop ? "large" : "medium"}
                  component={Link}
                  to="/Map"
                  sx={responsiveNavButtonStyle}
                >
                  Map
                </Button>
              )}
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 1,
                alignItems: "center",
              }}
            >
              {renderButtons()}
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton color="primary" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 250, p: 2 }}>
                  {location.pathname === "/" ||
                  location.pathname === "/signup" ? (
                    <>
                      <MenuItem>
                        <Button
                          color="primary"
                          variant="contained"
                          component={Link}
                          to="/UserSignUpPage"
                          sx={{ width: "100%" }}
                        >
                          Sign up
                        </Button>
                      </MenuItem>
                      <MenuItem>
                        <Button
                          color="primary"
                          variant="outlined"
                          onClick={handleSignInClick}
                          sx={{ width: "100%" }}
                        >
                          Sign in
                        </Button>
                      </MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem>
                        <Button
                          color="primary"
                          variant="text"
                          size="small"
                          component={Link}
                          to="/"
                          sx={{ width: "100%", ...navButtonStyle }}
                        >
                          Home
                        </Button>
                      </MenuItem>
                      <MenuItem>
                        <Button
                          color="primary"
                          variant="text"
                          size="small"
                          component={Link}
                          to="/UserLandingPage"
                          sx={{ width: "100%", ...navButtonStyle }}
                        >
                          Opportunities
                        </Button>
                      </MenuItem>
                      {userAuth.isAuthenticated && (
                        <MenuItem>
                          <Button
                            color="primary"
                            variant="text"
                            size="small"
                            component={Link}
                            to="/Map"
                            sx={{ width: "100%", ...navButtonStyle }}
                          >
                            Map
                          </Button>
                        </MenuItem>
                      )}
                      {userAuth.isAuthenticated && (
                        <MenuItem>
                          <UserAccountPopover 
                            profileType="User Profile" 
                            profilePicture={userAuth.user?.profilePicture} 
                          />
                        </MenuItem>
                      )}
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