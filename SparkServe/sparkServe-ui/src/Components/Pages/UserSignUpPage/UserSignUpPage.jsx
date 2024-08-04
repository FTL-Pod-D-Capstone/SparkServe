import React from 'react';
import UserSignUp from '../../UserSignUp/UserSignUp';
import { Box } from '@mui/material';

const UserSignUpPage = () => {
  return (
<>
    <Box
    sx={{
      backgroundImage: 'linear-gradient(rgb(180, 200, 255), rgb(255, 255, 255))',
      backgroundSize: '100% 50%',
      backgroundRepeat: 'no-repeat',
      backgroundColor: 'white',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    }}
  >
    <UserSignUp />
  </Box>


    
    <IconButton onClick={handleGoBack} aria-label="go back" sx={{ mt: 8, ml: 8 }}>
      <ArrowBack />
    </IconButton>
    <UserSignUp />

    </>

  );
};

export default UserSignUpPage;