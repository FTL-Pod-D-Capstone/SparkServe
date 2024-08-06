import * as React from 'react';
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
import logo from '../../assets/logo.png';
import OrganizationAccountPopover from '../OrganizationAccountPopover/OrganizationAccountPopover';
import { useNavigate } from 'react-router-dom';
import { useTheme, useMediaQuery } from '@mui/material';

const OrganizationNavBar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  React.useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');
  }, []);

  const logoStyle = {
    width: isMobile ? '100px' : isTablet ? '120px' : '140px',
    height: 'auto',
    cursor: 'pointer',
  };

  const navButtonStyle = {
    position: 'relative',
    overflow: 'hidden',
    color: '#ff66c4',
    fontSize: isMobile ? '0.8rem' : isTablet ? '0.9rem' : '1rem',
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

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const navItems = !isAuthenticated
    ? [{ text: 'Home', path: '/OrganizationWelcomePage' }]
    : [
        { text: 'Schedule', path: '/OrganizationLandingPage' },
        { text: 'Calendar', path: '/Calendar' },
      ];

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {navItems.map((item) => (
          <ListItem button key={item.text} onClick={() => navigate(item.path)}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

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
            <img src={logo} style={logoStyle} alt="Logo" onClick={() => navigate('/OrganizationWelcomePage')} />
          </Box>
          {isMobile ? (
            <>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
              >
                {list()}
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1, gap: isTablet ? 1 : 2 }}>
              {navItems.map((item) => (
                <Button 
                  key={item.text}
                  size="large" 
                  sx={navButtonStyle} 
                  onClick={() => navigate(item.path)}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isAuthenticated && <OrganizationAccountPopover profileType="Organization Profile" />}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default OrganizationNavBar;


