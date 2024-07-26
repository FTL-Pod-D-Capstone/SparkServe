import * as React from 'react';
import { Box, Typography } from '@mui/material';

const LinearGradientLoading = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '10px',
        background: 'linear-gradient(90deg, rgba(70,133,246,1) 0%, rgba(135,206,250,1) 50%, rgba(70,133,246,1) 100%)',
        animation: 'loading 1.5s infinite',
        '@keyframes loading': {
          '0%': {
            backgroundPosition: '0% 50%',
          },
          '100%': {
            backgroundPosition: '100% 50%',
          },
        },
        backgroundSize: '200% 100%',
      }}
    />
  );
};

export default LinearGradientLoading;