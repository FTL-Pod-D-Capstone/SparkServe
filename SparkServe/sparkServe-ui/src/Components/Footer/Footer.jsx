import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

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
          borderTop: '2px solid',
          borderColor: 'grey.300',
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
          <Link href="https://www.linkedin.com/company/salesforce" aria-label="LinkedIn">
            <lord-icon
              src="https://cdn.lordicon.com/mgampcwp.json"
              trigger="hover"
              colors="primary:#ffffff,secondary:#4bb3fd,tertiary:#4030e8"
              style={{ width: '50px', height: '50px' }}
            ></lord-icon>
          </Link>
        </Stack>
      </Box>
    </Container>
  );
}
