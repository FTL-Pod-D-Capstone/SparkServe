import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Menu, MenuItem, IconButton, Typography, Avatar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { styled } from '@mui/material/styles';

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
    color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
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
        backgroundColor: '#4856f6',
      },
    },
  },
}));

function UserAccountPopover({ profileType, profilePicture }) {
  const [userId, setUserId] = React.useState("");
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.getItem("userId")) {
      setUserId(localStorage.getItem("userId"));
    }
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
    handleMenuClose();
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem("isUserAuthenticated");
    localStorage.removeItem("userId");
    setLogoutDialogOpen(false);
    navigate("/");
    window.location.reload();
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  };

  return (
    <div>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenuOpen}
        sx={{ color: "#4856f6" }}
      >
        {profilePicture ? (
          <Avatar
            src={profilePicture}
            alt="User Avatar"
            sx={{ width: 30, height: 30 }}
          />
        ) : (
          <AccountCircle sx={{ fontSize: 30 }} />
        )}
      </IconButton>
      <StyledMenu
        id="menu-appbar"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem component={Link} to={`/UserProfile/${userId}`} onClick={handleMenuClose}>
          <Typography textAlign="center">
            {profileType}
          </Typography>
        </MenuItem>
        <MenuItem component={Link} to="/bookmarks" onClick={handleMenuClose}>
          <Typography textAlign="center">
            Favorites
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleLogoutClick}>
          <Typography>Logout</Typography>
        </MenuItem>
      </StyledMenu>
      <Dialog
        open={logoutDialogOpen}
        onClose={handleLogoutCancel}
        PaperProps={{
          style: {
            backgroundColor: 'white',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" style={{ color: '#4856f6' }}>{"Confirm Logout"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} style={{ color: '#4856f6' }}>Cancel</Button>
          <Button onClick={handleLogoutConfirm} autoFocus style={{ backgroundColor: '#4856f6', color: 'white' }}>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UserAccountPopover;