import React from 'react';
import OrganizationSignUp from '../../OrganizationSignUp/OrganizationSignUp';
import { IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const OrganizationSignUpPage = () => {

  const handleGoBack = () => {
    navigate(-1);
  };

  const navigate = useNavigate();


  return (

    <>
    <IconButton onClick={handleGoBack} aria-label="go back" sx={{ mt: 8, ml: 8 }}>
      <ArrowBack />
    </IconButton>
    <OrganizationSignUp />
    </>
  );
};

export default OrganizationSignUpPage;