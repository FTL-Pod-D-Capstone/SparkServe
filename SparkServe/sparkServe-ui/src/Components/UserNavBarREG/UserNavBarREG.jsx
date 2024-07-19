import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import { AccountCircle, Notifications } from '@mui/icons-material';
import logo2 from '../../assets/logo2.png';
import { Link } from 'react-router-dom';


    const logoStyle = {
        width: '140px',
        height: 'auto',
        cursor: 'pointer',
    };

function UserNavBarREG() {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);

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
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
                {/* Notification Button */}
                <IconButton
                    color="primary"
                    onClick={(event) => setNotificationAnchorEl(event.currentTarget)}
                >
                    <Badge badgeContent={3} color="secondary">
                        <Notifications />
                    </Badge>
                </IconButton>

                {/* Account Icon */}
                <IconButton
                    color="primary"
                    onClick={(event) => setAnchorEl(event.currentTarget)}
                >
                    <AccountCircle />
                </IconButton>

                {/* Account Menu */}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                >
                    <MenuItem component={Link} to={`/ProfilePage`}>Profile</MenuItem>
                    <MenuItem onClick={() => {handleTheClick}}>Logout</MenuItem>
                </Menu>

                {/* Notification Modal */}
                <Menu
                    anchorEl={notificationAnchorEl}
                    open={Boolean(notificationAnchorEl)}
                    onClose={() => setNotificationAnchorEl(null)}
                >
                    <MenuItem>Notification 1</MenuItem>
                    <MenuItem>Notification 2</MenuItem>
                    <MenuItem>Notification 3</MenuItem>
                </Menu>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <Button variant="text" color="primary" onClick={toggleDrawer(true)}>
                <MenuIcon />
                </Button>
                <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 250, p: 2 }}>
                    <MenuItem>
                    <Button color="primary" variant="contained" onClick={() => {/* Handle sign up */}} sx={{ width: '100%' }}>
                        Sign up
                    </Button>
                    </MenuItem>
                    <MenuItem>
                    <Button color="primary" variant="outlined" onClick={() => {/* Handle sign in */}} sx={{ width: '100%' }}>
                        Sign in
                    </Button>
                    </MenuItem>
                </Box>
                </Drawer>
            </Box>
            </Toolbar>
        </Container>
        </AppBar>
    );
}

export default UserNavBarREG;