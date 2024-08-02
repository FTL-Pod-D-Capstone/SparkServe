import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import OrganizationSignIn from '../../Components/OrganizationSignIn/OrganizationSignIn';

const baseUrl = import.meta.env.VITE_BACKEND_URL;


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.linkedin.com/company/salesforce">
        SparkServe
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#ff66c4',
    },
  },
});

export default function OrganizationSignUp() {
  const navigate = useNavigate();
  const [openSignIn, setOpenSignIn] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState('');

  const handleOpenSignIn = () => {
    setOpenSignIn(true);
  };

  const handleCloseSignIn = () => {
    setOpenSignIn(false);
  };

  const handleBackToWelcome = () => {
    navigate('/OrganizationWelcomePage'); 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const password = data.get('password');
    const confirmPassword = data.get('confirmPassword');

    if (password !== confirmPassword) {
      setPasswordError("Passwords don't match");
      return;
    }

    setPasswordError('');

    const organization = {
      name: data.get('Name'),
      email: data.get('email'),
      phoneNumber: data.get('phone'),
      password: password,
      description: data.get('description') || '',
      address: data.get('address') || '',
      website: data.get('website') || '',
      contactEmail: data.get('contactEmail') || '',
      primaryCause: data.get('primaryCause') || '',
      pictureUrl: data.get('pictureUrl') || '',
      orgUrl: data.get('orgUrl') || '',
    };

    try {

      const response = await axios.post(`${baseUrl}/orgs/register`, organization);
      // console.log(response.data);
      handleOpenSignIn(); // Show the sign-in modal with a message to log in

    } catch (error) {
      console.error('Error registering organization:', error.response?.data || error.message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Button
            variant="outlined"
            onClick={handleBackToWelcome}
            sx={{ 
              alignSelf: 'flex-start', 
              mb: 2,
              color: '#ff66c4',
              borderColor: '#ff66c4',
              '&:hover': {
                borderColor: '#ff66c4',
                backgroundColor: 'rgba(255, 102, 196, 0.04)',
              },
            }}
          >
            Back
          </Button>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Organization Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Name"
                  label="Organization Name"
                  name="Name"
                  autoComplete="name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Organization Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  autoComplete="tel"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Organization Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                />
              </Grid>
              {passwordError && (
                <Grid item xs={12}>
                  <Typography color="error">{passwordError}</Typography>
                </Grid>
              )}
            </Grid>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: 'secondary.main', color: 'white'}}
              
            >
              Organization Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link onClick={handleOpenSignIn} variant="body2" style={{ cursor: 'pointer' }}>
                  Already have an Organization account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      <OrganizationSignIn open={openSignIn} handleClose={handleCloseSignIn} />
    </ThemeProvider>
  );
}