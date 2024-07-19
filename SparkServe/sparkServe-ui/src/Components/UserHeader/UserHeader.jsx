import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const Header = () => {
  const navigate = useNavigate();

  const handleMapClick = () => {
    navigate('/Map');
  };

  return (
    <header>
      <Button variant="contained" color="primary" sx={{ marginBottom: 2 }} onClick={handleMapClick}>
        Search by Map
      </Button>
    </header>
  );
};

export default Header;