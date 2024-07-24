import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

const account = {
  displayName: 'John Doe',
  email: 'johndoe@example.com',
  photoURL: 'https://via.placeholder.com/150',
};

export default function AccountPopover({ profileType, isSignedIn }) {
  const [open, setOpen] = React.useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleClose();
  };

  const renderMenuOptions = () => {
    if (!isSignedIn) {
      return (
        <>
          <MenuItem onClick={() => handleNavigation('/UserLogInPage')}>Sign in</MenuItem>
          <MenuItem onClick={() => handleNavigation('/UserSignUpPage')}>Sign up</MenuItem>
        </>
      );
    } else {
      if (location.pathname === '/OrganizationWelcomePage' || location.pathname === '/Calendar') {
        return (
          <>
            <MenuItem onClick={() => handleNavigation('/notifications')}>Notifications</MenuItem>
          </>
        );
      }
      return (
        <>
          <MenuItem
            disableRipple
            disableTouchRipple
            onClick={() => handleNavigation(`/${profileType.toLowerCase().replace(' ', '-')}`)}
            sx={{ typography: 'body2', py: 1.5 }}
          >
            {profileType}
          </MenuItem>
          <MenuItem
            disableRipple
            disableTouchRipple
            onClick={handleClose}
            sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
          >
            Logout
          </MenuItem>
        </>
      );
    }
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        {isSignedIn ? (
          <Avatar
            src={account.photoURL}
            alt={account.displayName}
            sx={{
              width: 36,
              height: 36,
              border: (theme) => `solid 2px ${theme.palette.background.default}`,
            }}
          >
            {account.displayName.charAt(0).toUpperCase()}
          </Avatar>
        ) : (
          <Avatar
            sx={{
              width: 36,
              height: 36,
              border: (theme) => `solid 2px ${theme.palette.background.default}`,
            }}
          >
            A
          </Avatar>
        )}
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        {isSignedIn && (
          <Box sx={{ my: 1.5, px: 2 }}>
            <Typography variant="subtitle2" noWrap>
              {account.displayName}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
              {account.email}
            </Typography>
          </Box>
        )}

        {isSignedIn && <Divider sx={{ borderStyle: 'dashed' }} />}

        {renderMenuOptions()}

        {isSignedIn && <Divider sx={{ borderStyle: 'dashed', m: 0 }} />}
      </Popover>
    </>
  );
}
