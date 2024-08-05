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
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

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

const OrganizationSignIn = ({ open, handleClose }) => {
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = React.useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const credentials = {
      email: data.get('email'),
      password: data.get('password'),
    };
  
    try {
      // console.log('Sending login request with credentials:', credentials);
      const response = await axios.post(`${baseUrl}/orgs/login`, credentials);
      // console.log('Full login response:', response);
      
      if (response.status === 200 && response.data.token) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('organizationId', response.data.organizationId)
        
        if (response.data.organizationId) {
          localStorage.setItem('organizationId', response.data.organizationId.toString());
          // console.log('Stored organizationId:', response.data.organizationId.toString());
        } else {
          console.warn('No organizationId in response, attempting to extract from token');
          const decodedToken = JSON.parse(atob(response.data.token.split('.')[1]));
          if (decodedToken.id) {
            localStorage.setItem('organizationId', decodedToken.id.toString());
            console.log('Extracted and stored organizationId from token:', decodedToken.id);
          } else {
            console.error('Unable to extract organizationId from token');
          }
        }
        
        setLoginStatus('success');
        setTimeout(() => {
          navigate('/OrganizationLandingPage');
          window.location.reload();
        }, 2000);
      } else {
        console.error('Unexpected response:', response);
        setLoginStatus('error');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
      }
      setLoginStatus('error');
    }
  };
      
  const handleSignUpRedirect = () => {
    handleClose();
    navigate('/OrganizationSignUpPage');
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
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
              {loginStatus === 'success' && (
                <Alert icon={<CheckIcon fontSize="inherit" />} variant="filled" severity="success" sx={{ width: '100%', mb: 2 }}>
                  Welcome back to SparkServe, Organization!
                </Alert>
              )}
              {loginStatus === 'error' && (
                <Alert variant="filled" severity="error" sx={{ width: '100%', mb: 2 }}>
                  Incorrect email or password. Please try again.
                </Alert>
              )}
              <Avatar sx={{ m: 1, bgcolor: '#ff66c4' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Organization Log in
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Organization Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Organization Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, bgcolor: '#ff66c4', '&:hover': { bgcolor: '#ff33ab' } }}
                >
                  Log In
                </Button>
                <Grid container>
                  <Grid item>
                    <Link onClick={handleSignUpRedirect} variant="body2" style={{ cursor: 'pointer', color: '#ff66c4' }}>
                      {"Don't have an Organization account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </ThemeProvider>
      </Box>
    </Modal>
  );
};

export default OrganizationSignIn;

