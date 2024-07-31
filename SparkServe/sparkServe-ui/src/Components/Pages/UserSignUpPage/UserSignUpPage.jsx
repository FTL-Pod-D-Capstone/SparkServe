import React from 'react';
import UserSignUp from '../../UserSignUp/UserSignUp';
import { IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';



const UserSignUpPage = () => {

  const handleGoBack = () => {
    navigate(-1);
  };

  const navigate = useNavigate();


  return (
    <>
    
    <IconButton onClick={handleGoBack} aria-label="go back" sx={{ mt: 8, ml: 8 }}>
      <ArrowBack />
    </IconButton>
    <UserSignUp />

    </>
  );
};

export default UserSignUpPage;
