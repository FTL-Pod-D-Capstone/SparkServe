import React from 'react';
import OrganizationSignUp from '../../OrganizationSignUp/OrganizationSignUp';
import {Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const OrganizationSignUpPage = () => {

  const handleGoBack = () => {
    navigate(-1);
  };

  const navigate = useNavigate();


  return (
    <Box
      sx={{
        backgroundImage: 'linear-gradient(#ffc8dd, #ffffff)',
        backgroundSize: '100% 50%',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'white',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: '3vh',
        position: 'relative',
      }}
    >
    <IconButton onClick={handleGoBack} aria-label="go back" sx={{ mt: 8, ml: 8 }}>
    </IconButton>
    <OrganizationSignUp />
    </Box>
  );
};

export default OrganizationSignUpPage;