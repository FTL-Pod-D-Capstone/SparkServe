import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Menu, MenuItem, IconButton, Typography, Avatar } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

function UserAccountPopover({ profileType, profilePicture }) {
  const [userId, setUserId] = React.useState("");
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

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

  const handleLogout = () => {
    localStorage.removeItem("isUserAuthenticated");
    navigate("/");
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
        sx={{ color: "black" }}
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
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{
          "& .MuiPaper-root": {
            bgcolor: "black",
            color: "white",
          },
        }}
      >
        <MenuItem component={Link} to={`/UserProfile/${userId}`}>
          <Typography textAlign="center" sx={{ color: "white" }}>
            {profileType}
          </Typography>
        </MenuItem>
        <MenuItem component={Link} to="/bookmarks">
          <Typography textAlign="center" sx={{ color: "white" }}>
            Favorites
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Typography sx={{ color: "white" }}>Logout</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default UserAccountPopover;