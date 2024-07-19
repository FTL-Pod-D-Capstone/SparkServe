// import React from 'react'
// import "../Footer/Footer.css"
// import { Box, Typography, Container} from '@mui/material';
// import { Link } from 'react-router-dom';

// const Footer = () => {
//     return (     
//     <Box component="Footer"
//             sx={{
//                 py: 3,
//                 px: 2,
//                 mt: 'auto',
//                 backgroundColor: 'primary.main',
//                 color: 'white',
//                 position: 'fixed',
//                 bottom: 0,
//                 left: 0,
//                 right: 0,
//             }}>
//                 <Container maxWidth="sm">
//             <Typography variant="body1">
//                 <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
//                 Back to Welcome
//                 </Link>
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//                 © {new Date().getFullYear()} Your Company Name. All rights reserved.
//             </Typography>
//         </Container>

//     </Box>

//     );
// }

// export default Footer

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" mt={1}>
      {'Copyright © '}
      <Link href="https://mui.com/">SparkServe&nbsp;</Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: 'center', md: 'left' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          pt: { xs: 4, sm: 8 },
          width: '100%',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Copyright />
        <Stack
          direction="row"
          justifyContent="left"
          spacing={1}
          useFlexGap
          sx={{
            color: 'text.secondary',
          }}
        >
          <IconButton
            color="inherit"
            href="https://www.linkedin.com/company/salesforce"
            aria-label="LinkedIn"
            sx={{ alignSelf: 'center' }}
          >
            <LinkedInIcon />
          </IconButton>
        </Stack>
      </Box>
    </Container>
  );
}