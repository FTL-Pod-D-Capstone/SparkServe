import React from 'react';
import UserSignUp from '../../UserSignUp/UserSignUp';
import { Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserSignUpPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        backgroundImage: 'linear-gradient(rgb(180, 200, 255), rgb(255, 255, 255))',
        backgroundSize: '100% 50%',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'white',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: '8vh',
        position: 'relative',
      }}
    >
      <IconButton
        onClick={handleGoBack}
        aria-label="go back"
        sx={{
          position: 'absolute',
          top: 32,
          left: 32,
        }}
      >
      </IconButton>
      <UserSignUp />
    </Box>
  );
};

export default UserSignUpPage;